# Development Status

## 2026-07-29

- Refreshed the intro and Qwen 3 Coder Next cover illustrations so Jon's
  caricature matches his current appearance while retaining the established
  blueprint artwork style.
- Added an optimized, versioned Qwen cover and updated the post frontmatter to
  use it; the existing square thumbnail remains unchanged.
- Added blueprint-style cover and thumbnail artwork for both current draft
  posts and replaced their temporary manifest-icon placeholders.
- Simplified the junior-engineer cover by removing the robot and background
  clutter, giving the student a book, and cleaning up the table diagram.
- Refined the Creating Factories cover with a forward-looking Jon, a central
  robot-status screen, and a cleaner floor without the gopher or grass marks.
- Published "Creating Factories" with its supporting factory-path diagram,
  production cover, and square thumbnail.

## 2026-03-12

- Added a new blog post design doc and implementation plan under `docs/plans/` for "How Junior Engineers Stand Out When Everyone Has AI", covering the hiring-manager angle, roadmap structure, section goals, and validation plan.
- Drafted `src/content/posts/junior-engineers-ai.md` as a new blog post in draft mode, with a `TL;DR`, four roadmap sections, and AI-workflow examples for architecture, distributed systems, software delivery, and communication/judgment.

## 2026-02-20

- Fixed mobile horizontal overflow in `src/components/layouts/wrapper.astro` by clipping page-level horizontal overflow (`overflow-x-hidden` on `html` and `body`) and changing the decorative rotated blur from full-height geometry to a fixed-height shape with a viewport-based cap (`max-w-[100vw]`), preventing the background effect from inflating document width.

## 2026-02-17

- Fixed page rendering regression caused by the PostHog rollout: removed the temporary `PostHogLayout` page wrapper usage that dropped page content, and injected PostHog globally through the existing document head in `src/components/layouts/metadata.astro` via `src/components/posthog.astro`.
- Updated PostHog browser init in `src/components/posthog.astro` to explicitly enable page navigation tracking (`capture_pageview: "history_change"`) and `$pageleave` emission (`capture_pageleave: "if_capture_pageview"`), and added blog-post-only scroll depth tracking in `src/pages/blog/[...slug].astro` with threshold events at 25/50/75/90/100%.
- Removed hardcoded PostHog credentials from source by switching `src/components/posthog.astro` to read `PUBLIC_POSTHOG_KEY` (and optional `PUBLIC_POSTHOG_HOST`) from environment variables; updated `.env.example` with the new analytics variables.

## 2026-02-16

- Fixed social preview metadata in `src/components/layouts/metadata.astro` by switching OG/Twitter title/description tags to use fallback-safe values, normalizing URLs to canonical absolute URLs, and pointing the default social image to an existing asset (`/web-app-manifest-512x512.png`).
- Fixed blog post social preview image selection in `src/pages/blog/[...slug].astro` to use frontmatter image paths (`thumbnail` fallback to `cover`) instead of a hardcoded `.jpg` path that failed on non-JPG posts.
- Updated `src/content/posts/qwen3-coder-next-lms.md` to clarify that elevated prompt-processing overhead may be partly driven by an LM Studio/MLX cache-efficiency bug, and added direct references to the related issue threads (`lmstudio-ai/lmstudio-bug-tracker#1319`, `ml-explore/mlx-lm#480`).
- Updated `src/components/layouts/wrapper.astro` to use viewport-height minimum sizing (`min-h-screen`, `min-h-dvh`), made the page content region grow (`flex-1`) so the footer stays pinned to the bottom on short pages, and expanded the decorative blur layer to span the wrapper height.
- Refined the wrapper decorative blur in `src/components/layouts/wrapper.astro` to be subtler and top-anchored (reduced opacity/blur strength, fixed top region height) instead of spanning the full wrapper.
- Adjusted the wrapper blur again in `src/components/layouts/wrapper.astro` to keep the subtle look while extending through the full wrapper height, removing the visible unblurred band above the footer on shorter pages like `/blog` and `/projects`.

## 2026-02-15

- Filtered draft posts (`isDraft: true`) out of `/blog` and homepage latest-post listings by applying the shared content-collection draft exclusion pattern in `src/features/blog/components/content-list.astro` and `src/features/blog/components/latest-post.astro`, while keeping direct slug routes available.
- Added a prominent conditional `DRAFT` badge at the top of individual blog posts in `src/pages/blog/[...slug].astro` when `post.data.isDraft` is true.
- Added author metadata support to blog post frontmatter schema (`author`, default `Jon Sykes`) and rendered author in every post header in `src/pages/blog/[...slug].astro`.

## 2026-02-14

- Added global table styling in `src/styles/globals.css` with improved spacing, borders, readable header/body typography, zebra-striping for alternating rows, hover state, mobile horizontal scroll, and light-mode (`prefers-color-scheme`) color overrides.
- Reduced global table vertical margins to exactly `10px` top and bottom in `src/styles/globals.css`.
- Added clickable blog post content images that open a full-size modal with keyboard support, backdrop close, and caption support in `src/pages/blog/[...slug].astro` and `src/styles/content.css`.
- Upgraded blog image modal to use native image sources with fit-to-viewport baseline zoom, explicit zoom in/out/reset controls, keyboard zoom shortcuts (`+`, `-`, `0`), and mouse drag panning when zoomed in.
- Updated blog image modal layout to fill the full screen and use all remaining vertical space for the zoom/pan viewport.
- Fixed fullscreen modal visibility regression by applying flex layout only when the dialog has `[open]`, restoring hidden-by-default behavior and functional Close actions.
- Fixed initial modal zoom so images open at the computed fit scale (`minScale`) to fully fit within the modal viewport.
- Updated blog post header publish date format to U.S. `MM/DD/YYYY` and fixed the `<time datetime>` value to use each post's actual ISO date.
- Fixed blog list/home latest post date rendering to use a UTC-stable `D Mon YYYY` formatter so dates no longer shift by one day in U.S. time zones.
- Added a `TL;DR` section near the top of `qwen3-coder-next-lms` with quick outcome/performance guidance for readers.

## 2026-02-12

- Fixed favicon metadata links in `src/components/layouts/metadata.astro` to use the proper icon set (`favicon.ico`, `favicon.svg`, `favicon-96x96.png`, Apple touch icon, and manifest) instead of a mis-declared PNG link.

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
