# Prompt 09 — Mobile UX

**When to use:** A page works on desktop and "responsively shrinks" but feels broken on a phone.

```
Make this page work well on mobile.

Do not just shrink the desktop layout.

Recommend:
- mobile navigation (bottom nav, drawer, hamburger — pick the right one)
- stacking order (what stacks first, what stacks last)
- sticky actions (primary action pinned where the thumb can reach it)
- collapsible filters (filters as a drawer or sheet, not always-visible)
- table alternative (cards on mobile? horizontal scroll? collapsed columns?)
- touch-friendly controls (min 44x44 targets, generous spacing)
- empty / loading / error states for mobile width
- keyboard behavior (avoid hover-only interactions)

Show me a mobile-first proposal, then explain how it scales up to tablet and desktop.

Implement the mobile-first improvements.

Verify with screenshots at 375px (iPhone), 768px (tablet), 1280px (desktop).
```

## Why "mobile-first," not "make it responsive"

Mobile-first is a *design* choice. Responsive is a *layout* choice. You can have a responsive layout that's still bad on mobile because the underlying design assumes desktop affordances (hover, large click targets, side-by-side panels).

Mobile-first asks: *if this page only existed on a phone, how would I design it?* Then desktop adds — sidebars, multi-column, more density.

## Common mobile-specific patterns

| Desktop pattern | Mobile equivalent |
|---|---|
| Sidebar nav | Drawer (hamburger) or bottom nav |
| Data table | Cards stacked vertically; or horizontal scroll if data is comparable |
| Always-visible filters | Filter button → drawer/sheet |
| Hover tooltips | Tap-to-show or visible by default |
| Multi-column form | Single column, with grouping |
| Right-side detail panel | Full-screen detail with back button |

## What "verify" catches

- Tap targets too small (under 44px).
- Sticky elements covering content.
- Horizontal scroll on accidentally-overflowing content.
- Forms where the keyboard hides the submit button.
- Hover-only interactions that don't work on touch.
