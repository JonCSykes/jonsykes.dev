import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://jonsykes.dev",
  integrations: [sitemap()],
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
