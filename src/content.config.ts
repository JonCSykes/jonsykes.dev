import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = { posts };
