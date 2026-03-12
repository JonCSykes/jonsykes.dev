# How junior engineers stand out when everyone has AI design

## Goal

Draft a new blog post for `jonsykes.dev` that helps new grads and junior engineers understand what to focus on when AI makes code generation easier and engineering judgment more valuable.

## Audience

- New grads entering software engineering roles
- Junior engineers trying to stand out in interviews and on the job

## Core thesis

AI should not replace learning fundamentals, and framework knowledge alone is not enough to stand out. The junior engineers who separate themselves are the ones who understand how software is structured, how it fails, how it gets shipped safely, and how to communicate trade-offs clearly.

## Voice and angle

- Voice: hiring manager with firsthand experience leading architecture-heavy and development teams over the last decade
- Tone: practical, opinionated, direct, and useful
- Positioning: pro-AI, but strongly against outsourcing engineering judgment to AI tools

## Title

`How Junior Engineers Stand Out When Everyone Has AI`

## Article shape

- `TL;DR`
- Intro from the hiring-manager lens
- `Application architecture`
- `Distributed systems`
- `Software delivery`
- `Communication and judgment`
- Closing section on what actually stands out

## Section pattern

Each pillar should cover:

1. What the concept actually is
2. What juniors usually get wrong
3. What stands out to the author as a hiring manager
4. One small example tied to a common AI-assisted workflow

## Pillar goals

### Application architecture

Teach placement and boundaries: where logic belongs, what owns state, and how data moves through the app. Show that AI can generate code that works but still damages the system when it lands in the wrong layer.

### Distributed systems

Teach failure-aware thinking: retries, timeouts, duplicate delivery, stale state, and partial failure. Keep the section high level and practical, not academic.

### Software delivery

Teach that engineering is not just writing code. Requirements clarity, testing, rollout, observability, and ownership matter as much as implementation.

### Communication and judgment

Teach that clear questions, explicit trade-offs, and honest uncertainty are engineering strengths. Show how AI can support those habits without replacing them.

## Anecdote strategy

- Open with direct hiring-manager experience instead of generic AI commentary
- Use one short anecdotal anchor in the intro
- Add brief firsthand observations inside each pillar
- Keep anecdotes short so the article stays useful as a roadmap instead of becoming autobiographical

## Content constraints

- Keep the article software-development focused while touching the broader SDLC
- Avoid sounding anti-AI
- Avoid turning the post into a giant syllabus or academic explainer
- Keep the AI examples concrete and familiar to working engineers
- Mark the post as a draft until the content and cover assets are finalized

## Verification

The finished draft should:

- Establish the hiring-manager lens early
- Stay roadmap-led rather than rant-led
- Give each pillar enough substance to feel actionable
- Push back on shallow AI usage and shallow framework-centric learning
- Use firsthand anecdotes to add authority without overwhelming the post
- End with a clear statement of what stands out when everyone has access to AI
- Pass the Astro content checks and project build
