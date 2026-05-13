import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const sidebarBadgeSchema = z.union([
  z.string(),
  z.object({
    text: z.string(),
    variant: z
      .enum([
        "development",
        "note",
        "tip",
        "caution",
        "danger",
        "success",
        "default",
      ])
      .default("default"),
    class: z.string().optional(),
  }),
]);

const sidebarSchema = z.object({
  order: z.number().optional(),
  label: z.string().optional(),
  hidden: z.boolean().default(false),
  badge: sidebarBadgeSchema.optional(),
  attrs: z.record(z.string(), z.union([z.string(), z.boolean()])).optional(),
  collapsed: z.boolean().optional(),
});

const notas = defineCollection({
  loader: glob({
    base: "./src/content/articles/notas",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    sidebar: sidebarSchema.optional(),
  }),
});

const docs = defineCollection({
  loader: glob({
    base: "./src/content/articles/docs",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    sidebar: sidebarSchema.optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(["ativo", "dev", "arquivado", "beta"]).optional(),
    github: z.url().optional(),
    live: z.url().optional(),
    featured: z.boolean().default(false),
    longDesc: z.string().optional(),
  }),
});

export const collections = { docs, notas };
