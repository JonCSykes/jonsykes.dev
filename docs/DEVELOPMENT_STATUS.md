# Development Status

## 2026-02-11

- Styled blog post blockquotes as thought bubbles in `src/styles/content.css`.
- Added explicit top and bottom spacing for blockquotes in blog content.
- Added `remark-gemoji` and configured Astro markdown plugins to render `:emoji:` shortcodes in posts.
- Styled markdown horizontal rules to match blockquote border color with larger vertical spacing.
- Moved blockquote thought-bubble tail circles lower and closer to the bottom-left corner.
- Removed blockquote thought-bubble tail circles and kept the rounded quote card style.
- Added a line-numbered Shiki code viewer style for markdown code fences in blog posts.
- Hardened code-viewer selectors to target Astro fenced blocks (`pre.astro-code`) consistently.
- Added runtime normalization so block-like `<code>` output is promoted/enhanced into code-viewer blocks.
- Added ordered-list (`ol`) content styles so markdown numbering renders correctly in blog posts.
- Increased blog-content `h3` top and bottom margins for better section spacing.
- Reduced paragraph top spacing, added matching bottom spacing, and brightened paragraph text color.
- Added required `aiUsage` frontmatter for posts and rendered it under each post description in the blog header.
- Updated blog post header description to support full-width layout by overriding `PageHeader` description max-width/wrapping classes.
- Removed blog "Summarize with AI" feature, including UI, client behavior, API route, and AI/cache dependencies.
- Added required `thumbnail` frontmatter and rendered thumbnails in all blog post list cards via shared `ContentItem`.
- Made `thumbnail` and `aiUsage` backward-compatible (optional) so older posts still render; list cards fall back to `cover`.
- Added post `summary` text to shared blog list items so descriptions show in `/blog` and homepage latest-post card.

## 2026-02-04

- Added Cloudflare Pages Wrangler config (`wrangler.jsonc`) for `jonsykes-web`.
- Switched Astro adapter to `@astrojs/cloudflare` for Cloudflare deployment.
- Removed `astro:assets` usage in `GreatImage` to avoid Sharp on Cloudflare.
- Added `wrangler` as a dev dependency for Pages deploys.
- Added a randomized typed quip next to the navbar logo.
- Updated quip selection to use a time-based seed including seconds.

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
