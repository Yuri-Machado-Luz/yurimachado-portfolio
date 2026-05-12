import { getCollection } from "astro:content";

import type {
  SidebarBadge,
  SidebarEntry,
  SidebarGroup,
  SidebarLink,
} from "../../types";

type CollectionEntry = Awaited<ReturnType<typeof getCollection>>[number];

/**
 * Metadados extraídos do frontmatter para construir a navegação lateral.
 */
type SidebarConfig = {
  order?: number;
  label?: string;
  hidden?: boolean;
  badge?: unknown;
  attrs?: Record<string, string | boolean>;
  collapsed?: boolean;
};

/**
 * Estrutura de entrada para links customizados de sidebar.
 */
export type SidebarCustomLinkInput = {
  type: "link";
  label: string;
  href: string;
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
};

/**
 * Estrutura de entrada para grupos customizados (suporte a aninhamento).
 */
export type SidebarCustomGroupInput = {
  type: "group";
  label: string;
  entries: SidebarCustomItemInput[];
  collapsed?: boolean;
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
};

export type SidebarCustomItemInput =
  | SidebarCustomLinkInput
  | SidebarCustomGroupInput;

/**
 * Opções de personalização no estilo Starlight:
 * - renomear itens por id
 * - ajustar metadados de grupos por caminho
 * - adicionar links/grupos customizados
 */
export type SidebarCollectionOptions = {
  itemOverrides?: Record<string, Partial<SidebarConfig>>;
  groupOverrides?: Record<string, Partial<SidebarConfig>>;
  customItems?: SidebarCustomItemInput[];
  customItemsPosition?: "prepend" | "append";
  includeCollectionItems?: boolean;
};

/**
 * Normaliza badge vindo de string ou objeto para o contrato de renderização.
 */
function toSidebarBadge(badge: any): SidebarBadge | undefined {
  if (!badge) return undefined;
  if (typeof badge === "string")
    return { text: badge, variant: "default" as const };
  return badge as SidebarBadge;
}

/**
 * Converte nomes de pasta/slug para um rótulo legível.
 */
function formatSidebarLabel(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Lê os metadados de sidebar de um item da collection.
 */
function getSidebarConfig(
  entry: CollectionEntry,
  options?: SidebarCollectionOptions,
): SidebarConfig {
  const sidebar = (entry.data as any)?.sidebar as SidebarConfig | undefined;
  const override =
    (options?.itemOverrides?.[entry.id] as
      | Partial<SidebarConfig>
      | undefined) ?? {};
  const entryData = entry.data as any;

  return {
    order: override.order ?? sidebar?.order ?? entryData?.order ?? 9999,
    label: override.label ?? sidebar?.label,
    hidden: override.hidden ?? sidebar?.hidden ?? false,
    badge: override.badge ?? sidebar?.badge ?? entryData?.badge,
    attrs: override.attrs ?? sidebar?.attrs,
    collapsed: override.collapsed ?? sidebar?.collapsed,
  };
}

/**
 * Retorna a ordenação efetiva de um item da collection.
 */
function getSidebarOrder(
  entry: CollectionEntry,
  options?: SidebarCollectionOptions,
) {
  return getSidebarConfig(entry, options).order ?? 9999;
}

/**
 * Gera href padrão para itens de collection.
 */
function buildHref(collectionName: string, id: string) {
  return `/${collectionName}/${id}`;
}

/**
 * Ordena itens de collection por order e fallback por label/título.
 */
function sortEntries(
  entries: CollectionEntry[],
  options?: SidebarCollectionOptions,
) {
  return entries.slice().sort((left, right) => {
    const leftOrder = getSidebarOrder(left, options);
    const rightOrder = getSidebarOrder(right, options);
    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    const leftLabel =
      getSidebarConfig(left, options).label || left.data?.title || left.id;
    const rightLabel =
      getSidebarConfig(right, options).label || right.data?.title || right.id;
    return leftLabel.localeCompare(rightLabel);
  });
}

function createLink(
  collectionName: string,
  entry: CollectionEntry,
  options?: SidebarCollectionOptions,
): SidebarLink {
  const config = getSidebarConfig(entry, options);
  return {
    type: "link",
    label:
      config.label ||
      entry.data?.title ||
      formatSidebarLabel(entry.id.split("/").at(-1) || entry.id),
    href: buildHref(collectionName, entry.id),
    badge: toSidebarBadge(config.badge),
    attrs: config.attrs,
  };
}

/**
 * Converte estruturas customizadas para SidebarEntry com suporte a aninhamento.
 */
function normalizeCustomItems(items: SidebarCustomItemInput[]): SidebarEntry[] {
  return items.map((item) => {
    if (item.type === "link") {
      return {
        type: "link",
        label: item.label,
        href: item.href,
        badge: item.badge,
        attrs: item.attrs,
      } satisfies SidebarLink;
    }

    return {
      type: "group",
      label: item.label,
      collapsed: item.collapsed,
      badge: item.badge,
      attrs: item.attrs,
      entries: normalizeCustomItems(item.entries),
    } satisfies SidebarGroup;
  });
}

function groupEntries(
  collectionName: string,
  entries: CollectionEntry[],
  prefix: string[] = [],
  options?: SidebarCollectionOptions,
): SidebarEntry[] {
  const matching = entries.filter((entry) => {
    const parts = entry.id.split("/");
    return prefix.every((segment, index) => parts[index] === segment);
  });

  const directLinks = matching.filter(
    (entry) => entry.id.split("/").length === prefix.length + 1,
  );
  const deeperEntries = matching.filter(
    (entry) => entry.id.split("/").length > prefix.length + 1,
  );

  const groups = new Map<string, CollectionEntry[]>();

  for (const entry of deeperEntries) {
    const parts = entry.id.split("/");
    const groupKey = parts[prefix.length];
    const current = groups.get(groupKey) || [];
    current.push(entry);
    groups.set(groupKey, current);
  }

  const items: SidebarEntry[] = [];

  for (const entry of sortEntries(directLinks)) {
    if (getSidebarConfig(entry, options).hidden) continue;
    items.push(createLink(collectionName, entry, options));
  }

  for (const [groupKey, groupMembers] of Array.from(groups.entries()).sort(
    ([leftKey, leftMembers], [rightKey, rightMembers]) => {
      const leftOrder = Math.min(
        ...leftMembers.map((entry) => getSidebarOrder(entry, options)),
      );
      const rightOrder = Math.min(
        ...rightMembers.map((entry) => getSidebarOrder(entry, options)),
      );
      if (leftOrder !== rightOrder) return leftOrder - rightOrder;

      return formatSidebarLabel(leftKey).localeCompare(
        formatSidebarLabel(rightKey),
      );
    },
  )) {
    const groupPath = [...prefix, groupKey].join("/");
    const groupBaseMeta = getSidebarConfig(groupMembers[0], options);
    const groupOverride = options?.groupOverrides?.[groupPath] ?? {};
    const groupLabel =
      groupOverride.label ||
      groupBaseMeta.label ||
      formatSidebarLabel(groupKey);
    const groupCollapsed =
      groupOverride.collapsed ?? groupBaseMeta.collapsed ?? false;

    items.push({
      type: "group",
      label: groupLabel,
      collapsed: groupCollapsed,
      badge: toSidebarBadge(groupOverride.badge ?? groupBaseMeta.badge),
      attrs: (groupOverride.attrs ?? groupBaseMeta.attrs) as
        | Record<string, string | boolean>
        | undefined,
      entries: groupEntries(
        collectionName,
        groupMembers,
        [...prefix, groupKey],
        options,
      ),
    } satisfies SidebarGroup);
  }

  return items;
}

/**
 * Monta a sidebar de uma collection com suporte a overrides e links customizados.
 */
export async function buildSidebarFromCollection(
  collectionName: string,
  options?: SidebarCollectionOptions,
) {
  const entries = await getCollection(collectionName as any);
  const visible = entries.filter(
    (entry: any) => !entry.data?.draft && !entry.data?.sidebar?.hidden,
  ) as CollectionEntry[];

  const includeCollectionItems = options?.includeCollectionItems ?? true;
  const collectionItems = includeCollectionItems
    ? groupEntries(collectionName, sortEntries(visible, options), [], options)
    : [];
  const customItems = options?.customItems
    ? normalizeCustomItems(options.customItems)
    : [];

  if (!customItems.length) return collectionItems;

  return options?.customItemsPosition === "prepend"
    ? [...customItems, ...collectionItems]
    : [...collectionItems, ...customItems];
}
