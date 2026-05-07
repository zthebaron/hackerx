# Prompt 04 — Simplify Without Removing

**When to use:** A page is "too dense" but you can't remove functionality.

```
I want this page to feel simpler, but I do not want to remove functionality.

Find sections that should become:
- accordion
- collapsible panel
- tabs
- popover
- drawer
- advanced settings area

For each section, tell me:
1. The current state (what's there now)
2. The proposed pattern (which of the above)
3. Why this pattern fits this section
4. What stays primary (always visible)
5. What goes secondary (in the disclosure)

Then implement the best version using accessible components from our existing stack.

Verify after implementing:
- typecheck and lint pass
- keyboard navigation works (Tab, Esc)
- focus states are visible
- screen reader can navigate the disclosure
```

## What this prompt does

Forces *progressive disclosure*. The page's information is unchanged; the *visibility* of it is restructured by user need.

## The trick

Most "make it simpler" prompts produce visual cleanup. This one produces *behavioral* cleanup — what's primary stays, what's secondary collapses.

## Common pattern by section type

| Section | Often becomes |
|---|---|
| Advanced settings | Accordion or "Show advanced" disclosure |
| Filters | Collapsible panel (expanded on desktop, collapsed on mobile) |
| Help / examples | Popover or hover card |
| Detail / preview | Drawer / sheet |
| Multiple related views | Tabs |
| Multi-step task | Wizard with stepper |

## What "verify" catches

- Accordion buttons that aren't keyboard-accessible.
- Drawers that don't trap focus or close on Esc.
- Disclosure widgets without `aria-expanded`.
- Hidden content that screen readers still announce when collapsed.
