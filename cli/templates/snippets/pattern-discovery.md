# Prompt 01 — UI Pattern Discovery

**When to use:** You feel something is wrong with a screen but don't have the vocabulary.

```
I do not know the right UI terms for what this screen needs.

Inspect this page and tell me which UI patterns could improve it.

Group your answer by:
- navigation
- layout
- data display
- filtering/search
- actions
- feedback states
- accessibility
- mobile behavior
- power-user features

For each idea, include:
- pattern name
- what it does
- where it would go
- why it helps
- implementation difficulty
- whether we already have components for it

Do not code yet.
```

## What you get back

A categorized opportunity map, with named patterns. Each one is something you can choose to pursue or discard. Crucially: each one has a *name* you can use in future prompts.

## What to do with the output

1. Read the whole map.
2. Pick the 3 patterns that would have the biggest impact.
3. For each, run [Prompt 02 — Give Me Options](02-give-me-options.md) to get 3 implementation directions.
4. Pick one. Implement.

## Common follow-ups

> "Of those, which would I do first if I had a single afternoon?"
>
> "Which ones depend on patterns we don't have components for?"
>
> "Group these by user impact — high / medium / low."
