# Prompt 10 — QA and Verification

**When to use:** End of every UI session. Non-negotiable.

```
Verify the UI work just completed.

Run:
- typecheck (tsc --noEmit or equivalent)
- lint (eslint, biome — whatever this repo uses)
- tests if available
- build if it's safe and fast (catches things lint won't)
- responsive review (manually verify mobile, tablet, desktop)
- accessibility review (keyboard nav, focus visible, contrast, ARIA)

Then report:
- What passed
- What failed (with the exact error)
- What you fixed automatically
- What still needs human review

Do not mark this task complete until typecheck and lint pass.

If a check fails:
- Fix the underlying issue, do not silence the warning
- If you can't fix it in this session, surface it explicitly
```

## What this prompt enforces

The bar between "code that compiles" and "code that ships."

Without this prompt, Claude will say "done" when typecheck is failing because it's optimistic about its own output. This prompt holds the line.

## What "do not silence the warning" catches

The path of least resistance, when a check fails, is to suppress it: `// @ts-ignore`, `eslint-disable-next-line`, removing the test. This prompt explicitly forbids that — fix the underlying issue.

## Hooks make this automatic

If your team uses Claude Code hooks, you can run the verification on every save or every commit, removing the need to remember this prompt. See [02-master-prompts/the-better-way.md](../02-master-prompts/the-better-way.md) for the brief on hooks.

## Variant — daily / weekly app-wide check

```
Run a full QA pass across the entire app, not just my recent change.

Checks:
- typecheck across the whole codebase
- lint across the whole codebase
- run all tests
- build the production bundle
- responsive review of the 5 most-used pages
- accessibility audit on those same 5 pages

Output a triaged list of issues. Fix anything trivial. For non-trivial issues,
propose a plan and ask which to do first.
```
