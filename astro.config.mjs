// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import { default as react } from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkCallout from "./src/lib/content/markdown/remark-callout.ts";
const markdownRemarkPlugins = [remarkDirective, remarkCallout];
const markdownRehypePlugins = [rehypeSlug];

export default defineConfig({
  // Site Metadata
  site: "https://yurimachado.dev.br",

  markdown: {
    remarkPlugins: markdownRemarkPlugins,
    rehypePlugins: markdownRehypePlugins,
  },

  // Integrations and Adapter
  integrations: [react(), mdx({ extendMarkdownConfig: true })],
  adapter: vercel(),

  vite: {
    plugins: /** @type {any} */ ([tailwindcss()]),
    resolve: {
      alias: {
        "@meta": fileURLToPath(
          new URL("./src/components/meta", import.meta.url),
        ),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        // Lib aliases for organized content utilities
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
      },
    },
  },

  server: {
    open: true,
    port: 5000,
  },

  devToolbar: {
    enabled: false,
  },
});
