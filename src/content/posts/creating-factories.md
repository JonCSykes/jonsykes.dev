---
title: "Creating Factories"
author: "Jon Sykes"
cover: "/images/posts/creating-factories/cover.jpg"
thumbnail: "/images/posts/creating-factories/thumb.jpg"
summary: "Coding agents and business agents are converging on the same architecture. Five capabilities, two worked examples, and the design decisions that come with building one."
aiUsage: "AI was used for structural editing and reference checking against a brief I wrote. The five-capability model, the opinions, and the architecture described here are my own."
date: "2026-07-29"
isDraft: false
---

## TL;DR

- The software factory is an old organizational idea. Hitachi opened its Software Works in 1969, and Michael Cusumano documented the Japanese factory programs in 1991.
- The current crop of agent products, on both the coding side and the business side, keep arriving at the same shape without coordinating on it.
- Five capabilities make a factory: work intake, knowledge retrieval, agent orchestration, isolated execution, and versioning and governance.
- Two examples carry the article: a token refresh bug through a software factory, and a July board pack through a business factory.

## Software factories have been here before

Software factories are older than most of the people working in software. Hitachi opened its Software Works in 1969. The idea has resurfaced every decade or so since, usually with a new set of tools and the same stubborn question underneath: how do you make software delivery repeatable without pretending software is an assembly line?

Michael Cusumano's _Japan's Software Factories_ is still the best account of what those programs were actually doing. He looked at System Development Corporation in the United States and at Hitachi, Toshiba, NEC and Fujitsu in Japan, and found organizations taking the unglamorous parts of the job seriously: they standardized process, built libraries of reusable components, measured quality properly, and ran training pipelines that could turn a new hire into a productive contributor on a known schedule. Their estimates meant something, which is more than a lot of teams can claim now. Nobody involved thought code came off a conveyor belt. The claim was narrower: that the work around the code could be made predictable.

The history also carries a warning worth holding onto. Those programs got real results on the things they measured: defect rates came down and delivery got more predictable. None of that told a company whether it was building the right product. Process discipline is orthogonal to product judgment, and a factory that reliably ships the wrong thing has an expensive problem that no amount of measurement will surface.

So why is this coming back now? Not because anyone had a better idea about process. The economics changed. Every previous version of the software factory needed people to maintain the component library, run the reviews, apply the standards and keep the pipeline fed. That labor was the cost center, and it's the reason most of these programs eventually collapsed back into ordinary team structure. The worker is now cheap, tireless, available in parallel, and genuinely bad at judgment. That's a different set of trade-offs, and it earns the old idea another look. It does not make it a new idea.

## The idea is visible in products people can use

On the software side, Codex in the ChatGPT desktop app, Claude Code, GitHub Copilot's coding agent, Google Jules, Cursor's background agents and Devin all implement a recognizable version of the same path. They accept a unit of work, prepare an execution environment with the repository in it, change the code, run something that verifies the change, and hand back a branch or a pull request. The interfaces differ a lot, the isolation models differ more, and the products disagree about how much the agent should do before a human sees anything. The path is the same path.

A second group is doing the equivalent work on outputs that aren't code. Claude Cowork, Manus and Replit Agent all produce documents, reports, presentations, applications and research using machinery that looks structurally similar: work comes in, a controlled environment gets prepared, tools run, an artifact comes out. Manus has written publicly about its sandbox design, which is the clearest sign that this group ran into the same isolation problems the coding tools did.

A third group is working on persistence. OpenClaw and Hermes Agent are exploring agents that stay connected to communication channels, hold memory, and stay reachable after the session that created them has ended.

I'm not ranking these, and I'm not claiming any of them is a complete factory. Several are deliberately one layer of the stack and say so. The interesting part is that these teams aren't coordinating and the same boxes keep appearing anyway. In my experience that usually means the boxes are load-bearing. Fashion does not converge like that.

What follows is the 5 capabilities that all of these harnesses have to solve for in one form or another, and two examples that show how they work together. The first example is a software factory that takes a Sentry alert through to a pull request. The second is a business factory that takes a calendar schedule through to an approved board pack.

## The five capabilities

![Two horizontal paths through the same five capabilities. The software factory runs from a Sentry alert to a reviewed pull request. The business factory runs from a calendar schedule to an approved board pack.](/images/posts/creating-factories/factory-paths.webp)

**1. Work Intake.** Work arrives, gets an identity and a priority, and stays owned until it's finished, canceled or deliberately deferred. A Linear issue and a scheduled board pack are the same construct wearing different clothes.

The failure this prevents is work that exists only inside a conversation. No queue means no way to answer what's in flight, what's stuck, what got dropped, or how long anything takes.

For engineers: the queue doesn't have to be a table you own. It can be projected from Linear, the CRM, Slack, email, schedules and workflows, and for most organizations that projection is the right call because the work already lives there and nobody wants a second backlog. What you do own is identity and idempotency. The same Sentry alert firing forty times should enrich one work item, not spawn forty runs.

**2. Knowledge Retrieval.** The factory can find the code, documents, data, policies, history and definitions the job needs.

Skip this and you get confident output built on a stale source, an unauthorized source, or an undefined term. Both examples below turn on it: a fix needs the history of the last incident that looked like this, and a board pack needs to know what "active customer" means this month.

For engineers: retrieval has to carry provenance all the way down to a location in a source, not just a document name, or nobody can audit the claim. And definitions belong in the knowledge layer as first-class content with their own history. A metric definition sitting in a paragraph of a Notion page isn't something a factory can reason about, and you can't diff it when it changes.

**3. Agent Orchestration.** Something schedules the work, delegates it, tracks state, handles retries, enforces policy and records what happened.

Without it, work dies quietly. An agent that crashes in step four of seven, with no record of steps one through three, has cost you more than doing nothing.

For engineers: the distinction that earns its keep is run, step and attempt. A run is one observable execution. A step is one semantic operation inside it. Retrying a step creates another attempt of that step rather than another node in the graph, which keeps the execution history readable when something has been retried five times. Alongside that, one ordered event journal per run so state changes, output and diagnostics share a single timeline. And "waiting" needs to be a real state with a structured reason attached, distinct from "failed", because a run blocked on human approval isn't an error and shouldn't page anyone.

**4. Isolated Execution.** Agents need a controlled place to run code, tools, browsers and data operations without inheriting every credential and permission in the host environment.

The obvious risk is an agent holding your whole keychain. The quieter one is two jobs sharing a filesystem and contaminating each other's results.

For engineers: broker credentials rather than injecting them. The execution environment should hold a handle it can exchange for an operation, not the token itself, so that a prompt injection in a scraped page yields a useless string. Scope the grant to the run, set an egress policy, and remember the sandbox is a tenancy boundary before it is a convenience. This is the capability with the widest gap between products right now, and it's the one I have the most to say about.

**5. Versioning and Governance.** The result has a stable identity, a history, evidence, and a clear point where an accountable person accepts, rejects or revises it.

What goes wrong without it is an artifact nobody signed. The pull request already solves this for code. The board pack, the policy, the forecast and the operating report need the same properties, and mostly don't have them today.

For engineers: approval should be a state transition on the artifact, recorded with an actor and a timestamp, rather than a thumbs-up in a Slack thread that nobody can find in November. Diff matters as much as version. "What changed since the last one" is the question every reviewer actually asks, and it's the only thing that makes reviewing a regenerated 40-page deck tractable.

## Follow the authentication bug

A release goes out. Within an hour, users start getting logged out when their access token refreshes. Sentry lights up with a spike in 401s from the refresh endpoint, and support tickets start arriving that all say roughly the same thing in different words.

Those two signals converge on a single Linear issue. That issue is the thing that matters, and it's worth being precise about why: the issue has an identity, a state, an owner and a priority, and it survives everything that happens next. If the work instead lives in a chat session, then the session is the work, and when the session ends or the context window fills, the work is gone with no record that it existed.

The factory then goes and gets context. Not just the repository, but the recent changes to the authentication path, the runbook for token rotation, the two incidents from last year that looked like this, and the conversation on the issue itself. This is the capability people most often skip, because it feels like it should come free with a good model. It doesn't. Context and model intelligence are different problems. A very capable model with no access to your refresh implementation and no memory of the last time this broke will write you a confident, plausible fix for a different bug.

Work gets scheduled and delegated: investigate, reproduce, implement, review. In a small setup one agent does all four in sequence. In a larger one those are separate steps with their own state, and some of them run in parallel. Either way something has to own the sequencing, notice when the reproduction step fails for the third time, and know the difference between "this failed" and "this is waiting on a human." Work that takes forty minutes and touches four systems fails in ways that work taking forty seconds does not.

The actual execution happens somewhere contained: a workspace with the repository, the build toolchain, the test runner, and only the credentials that this job needs. The obvious reason is that you don't want an agent running arbitrary generated code against your laptop's keychain. The less obvious reason is tenancy. If your factory runs work for more than one team, the boundary between jobs is a boundary you're now responsible for.

Inside that workspace, the agent reproduces the logout, writes a failing test that captures it, fixes the clock-skew check that was rejecting freshly issued tokens, and runs the repository's checks until they pass.

What comes out is a branch and a pull request. This part we've all internalized so thoroughly that it's easy to miss how much it's doing. The pull request has a stable identity, a diff against a known base, a full history of revisions, the CI evidence attached, and a named human who either approves it or does not. Twenty years of engineering practice built a review surface with versioning, evidence and accountability baked in, and it's the reason the software path was the first one to work with agents. The handoff point already existed.

## Follow the board pack

Now the same architecture, pointed at work that has no pull request waiting at the end of it.

It's the last week of July and the board meets in eight days. The pack needs to cover revenue against plan, pipeline coverage and forecast risk, churn and expansion, product adoption, the major customer and support situations, hiring against operating capacity, and the decisions or risks that need discussion in the room.

A calendar schedule opens the work, or the CEO asks for it directly, and it gets a due date and an owner. Same construct as the Linear issue. The pack has an identity before anyone starts on it, so the sections still missing on Thursday register as gaps instead of silence.

Then the factory gathers context, and this is where the business path is harder than the software path. Pipeline and account activity come from the CRM; revenue from Stripe, the ERP or the finance warehouse, depending on how the company grew up; product usage from an analytics tool, support patterns from the ticketing system, and delivery and incident activity from the engineering tracker. I'm naming categories here, not promising integrations, and every company's list is different. On top of that sits the material that lives in no system of record: the operating plan, the metric definitions, the last three board packs, and the leadership notes explaining why Q2 looked the way it did. A repository is one thing with one history. This is nine things that disagree.

Work gets delegated by subject, with the dependencies tracked, because the churn section and the revenue section have to land on the same number. Something has to hold the order, notice that the pipeline analysis is blocked on a warehouse job that hasn't finished, and reconcile two answers when they conflict.

Execution happens in sandboxes: SQL against the warehouse, spreadsheets, chart generation, and browser-driven work for the tools that have no API. Raw credentials stay outside the execution environment wherever possible. The run also needs an explicit answer to whose data it can see, because the compensation detail behind the hiring section is visible to the CEO and not to the analyst who normally assembles the pack. A scheduled run has no user to inherit that from.

Inside those sandboxes the agents pull the current numbers, build the supporting tables, generate the charts, and draft each section against the structure the board already recognizes from last month.

What comes out is a new version of the deck, with the data cited back to its source, the supporting tables attached, and a record of what changed since June. The CEO and CFO read it, send back revisions, and approve the version that gets distributed.

## Building one of these

I didn't arrive at those five capabilities by designing them. They're the list of things that kept breaking, in projects I've built and in the work we've done at Weave Labs, until each one had somewhere proper to live. A few of the decisions were worth the argument they caused.

The first is that the durable thing is a run, not a session. A run is one observable execution with its own steps, and retrying a step creates another attempt of that step rather than a new node in the graph. Everything lands in one ordered event journal, so state changes, output and diagnostics keep a single timeline. That sounds like bookkeeping right up until an agent dies forty minutes into something and you need to know what it had already done. Chat still starts work, and it should. A chat is a conversation container, not a run, and when a message invokes an agent, the reply points back at the run that produced it. The conversation can end without the work ending with it.

The second is that a run carries its own authority, and that authority is granted rather than inherited. A run executes with the credentials and permissions somebody deliberately assigned to it, either the person who started it or the owner of the scheduled workflow it belongs to, and that person stays attached as audit attribution. What I want to avoid is a run quietly picking up everything the initiating user happens to be able to reach, because then the blast radius becomes a property of whoever clicked the button instead of the job.

Granting is the part that has to stay deliberate, and the one I'd fight hardest for. Plenty of agents need deep access to be useful at all, and pretending otherwise just produces agents that fail halfway through the work. So the person building the agent or the workflow decides what it can reach, at the granularity of the task, and that grant is visible and reviewable afterwards. This is the honest answer to the question the board pack raised. The compensation data behind the hiring section is either something that workflow was granted or it isn't, and somebody made that call on the record, instead of it falling out of whose session happened to fire the run.

Credentials themselves stay outside the model's context. A run can be authorized to use a connection without the agent ever seeing the secret behind it: protected values live in a server-owned vault, and what reaches the model is an opaque handle that only resolves inside its own tokenization scope. The agent works with the handle, so a prompt injection in a scraped page gets a useless string.

Knowledge needs its gate in front of retrieval, not behind it. Documents become threads that keep a link back to their source, down to the location in the original, and a thread isn't retrievable until a person approves it. That single rule is what makes citation mean anything: an agent can only search approved knowledge, it cites what it used, and there's never ambiguity between a pending suggestion and accepted company fact.

None of this is unique to us. I keep finding the same concerns in other people's architecture write-ups, usually under different names, and that's most of why I think the model generalizes beyond one team's habits.

## What the next articles cover

Go back to either example and ask what you could actually audit afterwards:

- The original request and who made it.
- What authority the agent held while it ran.
- What it executed, in what order, and what failed.
- Every version of the output and what changed between them.
- The name of the person who approved the one that shipped.

Answer those five for a piece of real work and you have a factory. Miss them and you have a demo that happened to work once.

The rest of the series takes one capability each: work intake, knowledge retrieval, agent orchestration, isolated execution, and versioning and governance.

## References

- Michael A. Cusumano, _Japan's Software Factories_, Oxford University Press: <https://academic.oup.com/book/52424>
- Codex in the ChatGPT desktop app: <https://learn.chatgpt.com/docs/app>
- Claude Code architecture: <https://code.claude.com/docs/en/how-claude-code-works>
- GitHub Copilot agents: <https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview>
- Google Jules: <https://jules.google/docs/>
- Cursor background agents: <https://docs.cursor.com/background-agent>
- Devin: <https://docs.devin.ai/get-started/devin-intro>
- Claude Cowork: <https://www.anthropic.com/product/claude-cowork>
- Manus sandbox: <https://manus.im/blog/manus-sandbox>
- Replit Agent project editor: <https://docs.replit.com/learn/projects-and-artifacts/project-editor>
- OpenClaw: <https://github.com/openclaw/openclaw>
- Hermes Agent: <https://github.com/NousResearch/hermes-agent>
