# AGENTS.md

## Project Overview
This repository is the source for https://jonsykes.dev, an Astro site for sharing work and writing about modern interfaces. It uses Astro Content Collections for blog posts and Tailwind for styling.

## Tech Stack
- Astro 5 (TypeScript, ESM)
- TailwindCSS v4 via Vite plugin
- Content Collections (`src/content.config.ts`)
- Vercel adapter (`@astrojs/vercel`), Node runtime
- Tooling: ESLint, Prettier, Husky

## Repo Layout
- `src/pages/` Astro routes
- `src/components/` reusable UI components
- `src/content/` content collections (blog posts live in `src/content/posts/`)
- `src/content.config.ts` collection definitions and schemas
- `src/styles/` global styles
- `public/` static assets
- `docs/` project notes and development status

## Local Development
- `pnpm install`
- `pnpm run dev` (local dev server)
- `pnpm run build` (production build)
- `pnpm run preview` (serve build output locally)
- `pnpm run lint` (ESLint with auto-fix)
- `pnpm run format` (Prettier)
- `pnpm run astro sync` (sync content collections types)

## Environment Variables
See `.env.example`. Do not commit `.env`.
- No required environment variables for core site/blog rendering.

## Content Authoring
Blog posts live under `src/content/posts/` and are validated by `src/content.config.ts`.
Required frontmatter fields:
- `title` (string)
- `cover` (string)
- `thumbnail` (string, optional; falls back to `cover` in list cards)
- `summary` (string)
- `aiUsage` (string, optional)
- `date` (date)
- `isDraft` (boolean, default false)

## Quality Gates
There are no automated tests currently. For code changes, run:
- `pnpm run lint`
- `pnpm run format`
- `pnpm run build`

## Deployment
The site uses the Vercel adapter with Node runtime. The canonical site URL is set in `astro.config.mjs` under `site`.

## Contribution Notes
- Keep changes consistent with existing structure and conventions.
- Avoid adding dependencies without explicit approval.
- Update `docs/DEVELOPMENT_STATUS.md` with a brief entry describing meaningful changes.
