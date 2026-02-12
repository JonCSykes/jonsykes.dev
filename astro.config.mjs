import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import remarkGemoji from "remark-gemoji";

export default defineConfig({
  site: "https://jonsykes.dev",
  integrations: [sitemap()],
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkGemoji],
    syntaxHighlight: "shiki",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
