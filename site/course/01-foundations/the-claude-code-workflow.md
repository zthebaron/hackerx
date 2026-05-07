# The Claude Code workflow

Anthropic's own guidance: the highest-leverage move with Claude Code is giving it a way to **verify** work — tests, screenshots, expected outputs, lint, build commands. The recommended loop is:

```
Explore → Plan → Implement → Verify
```

This is the spine of vibe coding done right.

## Phase 1 — Explore

Claude reads your code before it changes anything.

**Bad:** "Add a sidebar."
**Good:** "Inspect the current navigation structure, the routes, and the existing layout components. Then propose how a sidebar would integrate."

Why this matters: Claude won't recommend reinventing what your repo already has. It can't reuse your `<NavItem>` component if it doesn't know it exists.

What to ask Claude to explore:
- Routes / page hierarchy
- Existing layout components (shells, headers, sidebars)
- The component library you already use (shadcn/ui, custom, mixed)
- Styling approach (Tailwind, CSS modules, styled-components)
- Data flow (server components, client fetch, state libs)
- Current loading/empty/error patterns

## Phase 2 — Plan

Claude proposes 3 directions. You pick. *Then* Claude makes a plan.

The plan should include:
- Files to modify
- Components to create
- Components to extend (vs. create new)
- Dependencies to avoid adding
- Responsive behavior
- Accessibility requirements
- Verification steps

Don't skip this. The plan is what lets you stop a wrong direction in 30 seconds instead of 3 hours.

## Phase 3 — Implement

Implement in **small steps**, one commit at a time. After each major change, Claude reports what changed and what was verified.

Why small steps: a 500-line diff that "looks right" is not reviewable. A 50-line diff with a typecheck pass is.

## Phase 4 — Verify

This is the move that separates demo-quality from product-quality.

Run, every time:

- `typecheck` (tsc --noEmit)
- `lint` (eslint, biome, etc.)
- `tests` if you have them
- `build` if it's safe (catches things lint won't)
- Responsive review (mobile, tablet, desktop)
- Accessibility review (keyboard nav, focus states, contrast, labels)
- Screenshot comparison if available

## Why this beats "just code it"

Without the loop:
- Claude invents new components when yours exist.
- You ship an inaccessible modal you didn't notice.
- The mobile view breaks and nobody catches it for a week.
- Claude says "done" when typecheck is failing.

With the loop:
- Claude reuses your components.
- Accessibility is checked before merge.
- Responsive review is part of the definition of done.
- "Done" means verified, not "compiled."

## The one-liner

> Don't ask Claude to code. Ask Claude to **explore, propose, plan, build small, verify** — and only then call it done.

That's the whole workflow. The rest of the course is filling in *what* to ask at each phase.
