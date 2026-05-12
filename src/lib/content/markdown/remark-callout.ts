import { directiveToMarkdown } from "mdast-util-directive";
import { toMarkdown } from "mdast-util-to-markdown";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

import { calloutRegistry, getCalloutDefinition } from "../callouts";

type NodeLike = {
  type: string;
  data?: Record<string, any>;
  children?: any[];
  name?: string;
  attributes?: Record<string, any>;
};

function mdastNode(
  tagName: string,
  properties: Record<string, any> = {},
  children: any[] = [],
) {
  // Mantém saída em mdast compatível com renderização html do Astro.
  return {
    type: "paragraph",
    data: { hName: tagName, hProperties: properties },
    children,
  };
}

function restoreUnhandledDirective(
  node: NodeLike,
  index: number,
  parent: { children: any[] },
) {
  // Se a diretiva não estiver processada, preserva o markdown original.
  let markdown = toMarkdown(node as any, {
    extensions: [directiveToMarkdown()],
  });
  if (markdown.at(-1) === "\n") markdown = markdown.slice(0, -1);
  const textNode = { type: "text", value: markdown };
  parent.children[index] =
    node.type === "textDirective"
      ? textNode
      : { type: "paragraph", children: [textNode] };
}

export default function remarkCallout() {
  return function transformer(tree: any) {
    // Percorre diretivas e converte somente blocos reconhecidos em callout.
    visit(
      tree,
      (
        node: NodeLike,
        index: number | undefined,
        parent: { children: any[] } | undefined,
      ) => {
        if (!parent || index === undefined) return;

        if (
          (node.type === "textDirective" || node.type === "leafDirective") &&
          node.data === undefined
        ) {
          restoreUnhandledDirective(node, index, parent);
          return;
        }

        if (node.type !== "containerDirective") return;

        const explicitType =
          node.name === "callout" ? node.attributes?.type : undefined;
        const variant =
          explicitType ||
          (node.name && node.name in calloutRegistry ? node.name : undefined);
        if (!variant) return;

        const definition = getCalloutDefinition(String(variant));
        let title = definition.label;
        let titleChildren: any[] = [{ type: "text", value: title }];

        const firstChild = node.children?.[0];
        if (
          firstChild?.type === "paragraph" &&
          firstChild.data &&
          "directiveLabel" in firstChild.data &&
          firstChild.children.length > 0
        ) {
          titleChildren = firstChild.children;
          title = toString(firstChild.children);
          node.children && node.children.splice(0, 1);
        } else if (
          typeof node.attributes?.title === "string" &&
          node.attributes.title.trim()
        ) {
          title = node.attributes.title;
          titleChildren = [{ type: "text", value: title }];
        }

        parent.children[index] = mdastNode(
          "aside",
          {
            class: `callout callout--${String(variant)}`,
            "data-callout": String(variant),
            "aria-label": title,
          },
          [
            mdastNode("p", { class: "callout__title", "aria-hidden": "true" }, [
              mdastNode("i", {
                class: `callout__icon ${definition.iconClass}`,
                "aria-hidden": "true",
              }),
              ...titleChildren,
            ]),
            mdastNode(
              "div",
              { class: "callout__content" },
              node.children ?? [],
            ),
          ],
        );
      },
    );
  };
}
