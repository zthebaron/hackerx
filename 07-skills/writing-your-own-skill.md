# Writing your own skill

Skills are markdown. A skill is just a `SKILL.md` file with frontmatter and instructions. Anything that's a *recurring playbook* is a candidate.

## Skill anatomy

```markdown
---
name: skill-name
description: One-sentence trigger description. The matching is done against this — be specific about when to activate.
---

# Skill name

## When this skill activates
[Phrases or situations that should trigger it]

## What this skill does
[Numbered steps Claude should follow]

## Required output structure
[Template the response should follow]

## What this skill must NOT do
[Common failures to prevent]

## Examples
[2-3 worked examples]
```

## Skill ideas worth shipping for any team

### `pre-pr-review`

Activates on: "before I push," "ready to merge," "review this PR."

Does: Run typecheck, lint, tests. Check changed files for component-reuse opportunities. Check for missing empty/loading/error states. Check for accessibility regressions. Output a triaged list.

### `add-empty-loading-error`

Activates on: "add empty state," "loading state," "this needs error handling."

Does: Inspect the component. Add empty state with next-best action. Add skeleton loader matching the layout. Add error state with retry. Verify all three render correctly.

### `accessibility-audit`

Activates on: "a11y check," "accessibility review," "screen reader."

Does: Run through the keyboard nav, focus states, contrast, ARIA, labels, touch targets. Output a Critical / Major / Minor triaged list with file paths.

### `onboarding-flow`

Activates on: "user onboarding," "first-run experience," "empty workspace."

Does: Propose 3 onboarding patterns (linear wizard / progressive disclosure / sample data). Recommend one. Build the empty workspace state with the next-best actions inline.

### `mobile-pass`

Activates on: "make this mobile-friendly," "mobile broken," "responsive."

Does: Audit at 375px / 768px / 1280px. Identify desktop-only assumptions. Propose mobile-first restructure. Implement with verification at all three widths.

## How to scope a skill well

Bad scope: "make UI better." Too broad to act on.

Good scope: "translate vague UI requests into named patterns and 3 options." Specific enough to write step-by-step instructions.

When you're not sure, ask: *what is the deterministic procedure I want Claude to follow when this skill activates?* If you can write it down, it's a good skill. If you can't, the skill needs more thinking before you write it.

## Iteration

Skills aren't one-shot. Use them, notice failures, edit the SKILL.md, use them again. Within 2-3 weeks of real use, a skill will earn its keep — or you'll delete it because it didn't.
