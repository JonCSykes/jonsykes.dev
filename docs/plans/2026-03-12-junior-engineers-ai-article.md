# Junior engineers AI article Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Draft and validate the new blog post "How Junior Engineers Stand Out When Everyone Has AI" as a reviewable Astro content draft.

**Architecture:** This is a content-only change. Add a new markdown post under `src/content/posts`, follow the existing frontmatter schema, mirror the approved roadmap structure, then run a humanizer pass and validate the repo with the normal content checks.

**Tech Stack:** Astro 5 content collections, Markdown, pnpm, Prettier, ESLint

---

### Task 1: Create the draft post shell

**Files:**
- Create: `src/content/posts/junior-engineers-ai.md`
- Test: `src/content.config.ts`

**Step 1: Add the post file with valid frontmatter**

Include:
- `title`
- `cover`
- `thumbnail`
- `summary`
- `aiUsage`
- `date`
- `isDraft`

**Step 2: Add a `TL;DR` and the approved section headings**

Required headings:
- `Everyone has AI. That is not your edge.`
- `Application architecture`
- `Distributed systems`
- `Software delivery`
- `Communication and judgment`
- `What I would focus on if I were starting now`

**Step 3: Run build to verify the content schema**

Run: `pnpm run build`
Expected: PASS with no content collection schema errors

**Step 4: Commit**

```bash
git add src/content/posts/junior-engineers-ai.md
git commit -m "docs(blog): add junior engineers AI draft"
```

### Task 2: Draft the article body

**Files:**
- Modify: `src/content/posts/junior-engineers-ai.md`

**Step 1: Write the intro from the hiring-manager angle**

Cover:
- ten years of hiring and leading architecture-heavy teams
- why code generation is no longer the differentiator
- why engineering judgment still is

**Step 2: Draft each roadmap section**

For each pillar, include:
- the concept
- what juniors usually over-focus on
- what stands out to a hiring manager
- one small AI-assisted workflow example

**Step 3: Draft the closing section**

Tie the argument back to the core claim:
- AI lowered the value of raw code generation
- strong engineers still separate themselves through systems thinking, delivery discipline, and clear judgment

**Step 4: Commit**

```bash
git add src/content/posts/junior-engineers-ai.md
git commit -m "docs(blog): draft junior engineers AI article"
```

### Task 3: Humanize the draft

**Files:**
- Modify: `src/content/posts/junior-engineers-ai.md`

**Step 1: Audit for AI-writing tells**

Check for:
- overly tidy rhythm
- slogan-like conclusions
- repeated phrasing
- promotional or inflated language
- mechanical list structure

**Step 2: Rewrite the draft in the author's voice**

Keep:
- the opinionated tone
- the firsthand perspective
- the practical examples

Remove:
- generic business-speak
- canned contrasts
- obvious chatbot phrasing

**Step 3: Read the article aloud**

Expected: the draft sounds like a real engineer talking, not a generated essay

**Step 4: Commit**

```bash
git add src/content/posts/junior-engineers-ai.md
git commit -m "docs(blog): humanize junior engineers AI draft"
```

### Task 4: Update project docs and validate

**Files:**
- Modify: `docs/DEVELOPMENT_STATUS.md`

**Step 1: Add a development status entry**

Note:
- new design doc
- implementation plan
- draft article

**Step 2: Run quality gates**

Run:
- `pnpm run format`
- `pnpm run lint`
- `pnpm run build`

Expected: PASS

**Step 3: Review git diff**

Run: `git diff -- docs/plans/2026-03-12-junior-engineers-ai-design.md docs/plans/2026-03-12-junior-engineers-ai-article.md docs/DEVELOPMENT_STATUS.md src/content/posts/junior-engineers-ai.md`
Expected: only the planned content changes appear

**Step 4: Commit**

```bash
git add docs/plans/2026-03-12-junior-engineers-ai-design.md docs/plans/2026-03-12-junior-engineers-ai-article.md docs/DEVELOPMENT_STATUS.md src/content/posts/junior-engineers-ai.md
git commit -m "docs(blog): add junior engineers article plan"
```
