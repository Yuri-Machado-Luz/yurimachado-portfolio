import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

// // ===

// function projectsCollection() {
//   return z.object({
//     title: z.string(),
//     description: z.string(),
//     lastModified: z.date(),
//     status: z.enum(["Ativo", "Arquivado", "Em desenvolvimento"]),
//     repository: z.string().optional(),
//     category: z.enum(["Pessoal", "Trabalho", "Open Source"]).optional(),
//   });
// }

// // ===

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({}),
  }),
};
