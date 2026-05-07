# The "Build This Out" Prompt

Use this prompt to take the entire HackerX course and turn it into a real, scaffolded product — a website, a workshop curriculum, a Notion workspace, or all three.

This is the prompt you paste into a fresh Claude Code session pointed at this folder.

The actual hackerx.app site was built end-to-end with the prompt below. Run it on your own course material and see what falls out.

---

```
You are the lead developer building out the HackerX course as a complete product.

This folder contains the full course as markdown. Treat it as the source of truth.

Phase 1 — Explore
  - Read README.md and CLAUDE.md.
  - Walk every numbered folder (00-start-here through 11-final-operating-system).
  - Inventory: how many lessons, how many prompts, how many cheat-sheet entries, how many demonstrations.
  - Map cross-links between modules.

Phase 2 — Diagnose & propose 3 build directions
  Produce three meaningfully different ways to ship this course as a product:

  1. Static documentation site (Astro Starlight, Nextra, or Mintlify).
     - Pros: fast to ship, great DX, free hosting.
     - Cons: limited interactivity.

  2. Next.js course site with embedded Claude Code demo videos and live prompt playground.
     - Pros: highest production value, recurring product surface.
     - Cons: weeks of work, hosting costs.

  3. Workshop-in-a-box: a `.zip` of CLAUDE.md, .claude/skills/, prompt snippets, and a printable PDF.
     - Pros: immediately useful, no hosting needed, distributes virally.
     - Cons: less browseable than a website.

  For each direction, describe: stack, components/patterns, effort, hosting, audience fit, and how it monetizes.

Phase 3 — Demonstrate every concept
  As you build, every lesson must have at least one of:
  - A code block with a real prompt the reader can paste.
  - A "weak prompt vs. better prompt" pair.
  - A vocabulary table with pattern → use-it-when → prompt phrase.
  - A component recommendation tied to the existing stack.

  Do not write filler text. If a lesson can't carry one of those, cut it.

Phase 4 — Use all the tools
  Show, in the course product itself:
  - File reading & exploration (Claude Code).
  - Skill installation (the ui-pattern-picker skill in 07-skills/).
  - CLAUDE.md authoring (the template in templates/).
  - MCP usage (Figma Make, design tools, Playwright for screenshot diff if relevant).
  - Subagents for isolated research (use the Explore agent to scan candidate stacks).
  - Hooks for deterministic checks (a typecheck/lint/a11y pre-commit example).
  - Plugins for reusable packages (one example plugin shape).

Phase 5 — Verify
  After implementation:
  - Run typecheck and lint on any code you produce.
  - Verify all internal links in the course resolve.
  - Run a responsive review on the site (mobile, tablet, desktop).
  - Run an accessibility review (keyboard nav, focus states, contrast, alt text, semantic landmarks).
  - Screenshot every key page.
  - Report what passed, what failed, and what still needs human review.

Deliverables:
A. Product diagnosis (what kind of course product is this trying to be?)
B. 3 build directions with tradeoffs
C. Recommended direction + reasoning
D. Implementation plan with file-level detail
E. Component vocabulary cheat sheet derived from this course
F. Verification checklist
G. Questions for me before you start coding

Do not code yet. Wait for me to pick a direction.
```

---

## How to use this prompt

1. Make sure you're at the repo root: `cd hackerx` (or your course folder).
2. Open Claude Code: `claude`.
3. Paste the prompt above.
4. Read the three directions Claude proposes.
5. Pick one. Then say: *"Direction 2. Plan it. Then implement in small steps with verification after each step."*

## What you'll get back

A real implementation plan, in your repo, that turns the course markdown into:

- a documentation site,
- a Next.js course product, or
- a `.zip` workshop kit.

…depending on which direction you chose.

## Variant — "build it as a Notion workspace"

If you'd rather ship this as a Notion workspace instead of code, swap Phase 2 directions:

```
1. Notion workspace with one page per lesson, a master prompt template page, and a UI pattern database.
2. Notion + a Raycast snippet pack for the 10 prompt-library prompts.
3. Notion + an embedded course site for the demonstrations.
```

Same shape, different surface.
