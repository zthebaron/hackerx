# Prompt 06 — Make It Look Professional

**When to use:** The product logic is right but it looks like a prototype.

```
Improve the visual design of this page without changing the product logic.

Focus on:
- spacing (consistent with our scale, generous around primary content)
- alignment (everything on a grid)
- typography (clear hierarchy, no more than 3-4 type sizes)
- hierarchy (eye knows where to look first)
- card structure (consistent padding, border radius, shadow if applicable)
- button placement (primary action on the right, secondary on the left)
- icon usage (consistent style; never decorative without meaning)
- contrast (WCAG AA minimum; test in light and dark mode)
- responsive layout (mobile, tablet, desktop)
- empty / loading / error states

Keep the style consistent with the existing app.
Do not introduce a new design language unless I ask.

Verify with screenshots at mobile / tablet / desktop and a brief diff write-up.
```

## What this is *not*

It's not a redesign. It's not adding new features. It's tightening the screws.

## What this catches

- Inconsistent spacing (some sections at 16px, others at 24px, no rule).
- Misaligned columns (close-but-not-on-the-grid).
- Type chaos (5 font sizes used inconsistently).
- Buttons floating without a clear primary.
- Icons in 3 different stroke weights.
- Contrast failures in muted text.

## When to use this *vs.* a redesign

- This prompt: "the structure is right, the polish is wrong."
- A redesign prompt: "the structure is wrong."

If you're not sure, run [Prompt 01 — Pattern Discovery](01-pattern-discovery.md) first to see whether the issues are polish or structure.
