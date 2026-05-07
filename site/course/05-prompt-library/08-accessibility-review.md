# Prompt 08 — Accessibility Review

**When to use:** Before merging any UI change. Or weekly across the app.

```
Review this UI for accessibility.

Check:
- keyboard navigation (Tab, Shift+Tab, Esc, Enter, arrow keys where expected)
- focus states (visible, never outline:none without a replacement)
- color contrast (WCAG AA: 4.5:1 for normal text, 3:1 for large text)
- labels (every input has a label, icon-only buttons have aria-label)
- ARIA usage (correct roles, aria-expanded, aria-controls, aria-current)
- modal behavior (focus trap, Esc closes, focus returns to trigger)
- menu behavior (arrow keys move, Esc closes, typeahead works)
- form errors (announced, programmatically associated with the field)
- touch target size (minimum 44x44 on mobile)
- screen reader clarity (run through with VoiceOver or NVDA in your head)

Give me a prioritized fix list:
- Critical (blocks users)
- Major (significantly degrades experience)
- Minor (small improvements)

Then implement the high-impact fixes.

Verify after by running through the keyboard navigation again and checking
focus is visible at every step.
```

## What this catches

The accessibility issues that ship to production are almost always:

- `outline: none` without a focus-visible replacement.
- Modals that don't trap focus.
- Icon-only buttons with no `aria-label`.
- Form errors not announced.
- Touch targets smaller than 44px.
- Color-only state (red badge without an icon or word).

Fix these first. Most are 1-line changes.

## A note on Radix

If your app uses Radix (or shadcn, which uses Radix), most of these are handled by default. The audit then focuses on:

- Custom components that aren't using Radix.
- Where Radix's defaults were overridden incorrectly.
- Whether `focus-visible:` styling is applied consistently.

## Quarterly audit pattern

Schedule this prompt to run quarterly across the whole app:

```
Audit accessibility across the entire app, not just this page.

Output a triaged list:
- Critical issues with file paths
- Major issues with file paths
- Minor issues with file paths

Then propose a plan to fix Critical and Major in this sprint.
Minor issues can be queued for ongoing work.
```
