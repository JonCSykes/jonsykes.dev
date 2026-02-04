# Development Status

## 2026-02-04

- Added Cloudflare Pages Wrangler config (`wrangler.jsonc`) for `jonsykes-web`.
- Switched Astro adapter to `@astrojs/cloudflare` for Cloudflare deployment.
- Removed `astro:assets` usage in `GreatImage` to avoid Sharp on Cloudflare.
- Added `wrangler` as a dev dependency for Pages deploys.

## 2026-02-03

- Added new skill `build-astro-websties` under `~/.codex/skills/`.
- Stored the full Astro LLM documentation in the skill reference file.
- Generated UI metadata at `agents/openai.yaml`.
 - Renamed skill to `build-astro-websites`.
- Added a root `AGENTS.md` with project guidance for agents.
- Replaced navbar text logo with SVG logo component.
- Increased navbar logo size by ~30%.
- Increased navbar title size and added padding for logo/text spacing.
- Updated GreatImage to support local assets and swapped biography portrait.
- Replaced career/skills sections with a projects list component.
- Updated README branding and setup details for jonsykes.dev.
- Updated footer social links and added Lucide icons.
- Added primary/secondary CTAs on the home page (Blog + Projects).
- Brightened the secondary text color.
- Brightened the secondary text color further.
- Added a latest blog post teaser to the home page.
- Updated Weavemind guide frontmatter to match the Astro schema.
- Translated non-English UI strings in components to English.
- Added extra spacing around the latest post section on the home page.
