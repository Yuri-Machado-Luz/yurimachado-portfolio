// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [],
      title: "My Docs",
      defaultLocale: "pt-BR",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Test",
          link: "/batata",
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
