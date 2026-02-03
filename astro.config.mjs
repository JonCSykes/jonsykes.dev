import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export const config = {
  runtime: "nodejs"
};

export default defineConfig({
  site: "https://jonsykes.dev",
  integrations: [sitemap()],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});