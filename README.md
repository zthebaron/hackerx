# HackerX

> Ship UI 100x faster with Claude Code as your design partner. Stop asking it to "make it better." Name the pattern, get three options, ship the right one.

Most people get stuck with AI coding tools because they know a screen feels cluttered, they know users need "some kind of menu thing," but they don't know whether to ask for a sidebar, command palette, accordion, drawer, tabs, popover, or split-pane layout.

HackerX teaches you the language of modern UI/UX so you can prompt Claude Code with **outcomes**, not vague component names — and ship 100x faster.

Live: **[hackerx.app](https://hackerx.app)**

## Install in 10 seconds

```bash
npx hackerx init
```

Drops `CLAUDE.md`, `.claude/skills/ui-pattern-picker/`, and a PR template into your repo. Open Claude Code. Watch the next vague UI request return three options instead of one mediocre one.

## What's in this repo

```
hackerx/
├── 00-start-here/ ... 11-final-operating-system/, templates/   # course markdown (canonical)
├── site/         Astro Starlight site that powers hackerx.app
│   └── course/   build-time copy of the course (regenerate with scripts/sync-course-to-site.sh)
├── cli/          npm package: `hackerx` CLI + Claude Code plugin
└── scripts/      sync-course-to-site.sh
```

The course markdown is the source of truth. The site reads from `site/course/` (a copy) so Vercel's build can see it. Run `scripts/sync-course-to-site.sh` after editing course content at the repo root.

---

## The 100x Workflow

```
Explore  →  Diagnose  →  Generate options  →  Pick a direction
   →  Plan  →  Implement small  →  Verify  →  Teach yourself the vocabulary
```

You don't ask Claude Code to "make the dashboard better."
You ask it to act like a product designer, UX strategist, front-end engineer, accessibility reviewer, and QA tester — all in one workflow.

---

## Course Map

| # | Module | What you learn |
|---|--------|----------------|
| 00 | [Start Here](00-start-here/README.md) | Welcome, prerequisites, how to use this course |
| 01 | [Foundations](01-foundations/README.md) | What vibe coding is, why explore→plan→implement→verify wins |
| 02 | [Master Prompts](02-master-prompts/README.md) | The copy-paste master prompt + anatomy of a great prompt |
| 03 | [UI/UX Vocabulary](03-ui-ux-vocabulary/README.md) | Navigation, disclosure, dashboard, layout, feedback patterns |
| 04 | [Modern UI Stack](04-modern-ui-stack/README.md) | shadcn/ui, Radix, Tailwind v4, Storybook, Figma Make, AI Elements |
| 05 | [Prompt Library](05-prompt-library/README.md) | 10 expert prompts you can paste tonight |
| 06 | [Add-Ons](06-add-ons/README.md) | Navigation, dashboard, form, table, AI, collaboration upgrades |
| 07 | [Skills](07-skills/README.md) | The UI Pattern Picker Skill — install and run |
| 08 | [Demonstrations](08-demonstrations/README.md) | Four full walkthroughs from vague idea → shipped UI |
| 09 | [Workshops](09-workshops/README.md) | Hands-on exercises with rubrics |
| 10 | [Philosophy](10-philosophy/README.md) | "Ask for outcomes, not components" |
| 11 | [Final Operating System](11-final-operating-system/README.md) | The single rule set that ties it all together |
| — | [Templates](templates/README.md) | CLAUDE.md, prompt scaffolds, verification checklists |

---

## Who this is for

- **Founders** designing apps without a designer on staff
- **Engineers** who want to ship UI that doesn't look like a prototype
- **Designers** who want to move 10x faster by directing Claude Code
- **PMs** who want to learn the actual language of UI/UX
- **Anyone** stuck saying "make it better" instead of naming the pattern

## Who this is NOT for

- People who want a UI library to copy without understanding why each pattern exists
- Teams looking for a code generator — this is a *direction* generator first

---

## How to use this course

1. Read [00-start-here](00-start-here/README.md) (5 minutes)
2. Skim [01-foundations](01-foundations/README.md) (10 minutes)
3. Copy the [master prompt](02-master-prompts/master-prompt.md) into your real project
4. Use the [vocabulary cheat sheet](03-ui-ux-vocabulary/full-cheat-sheet.md) as a reference while you work
5. Run a [demonstration](08-demonstrations/README.md) end-to-end on your own app
6. Install the [UI Pattern Picker skill](07-skills/ui-pattern-picker/SKILL.md) into `.claude/skills/`

---

## The promise

After this course, you will:

- Stop asking Claude Code to "make it better"
- Know the name of every UI pattern you've been pointing at vaguely
- Get **3 design directions** for every screen instead of one mediocre one
- Have a verification loop (typecheck, lint, responsive, a11y) that runs every time
- Reuse components instead of letting Claude invent new ones
- Teach yourself the vocabulary as you ship

That's the difference between **vibe coding** and **product-level AI development**.

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)

HackerX is released under the [MIT License](LICENSE) — copy it, fork it, ship it. Attribution is appreciated but not required.

Copyright © 2026 Tim de Vallée at [DigitalBoutique.ai (DBAI)](https://digitalboutique.ai).

---

Built by [DBAI](https://digitalboutique.ai) · Architect [Tim De Vallee](https://digitalboutique.ai). Last updated 2026-05-07.
