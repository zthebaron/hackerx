# Radix UI

Unstyled, accessible React primitives. The behavior layer — accessibility and interaction — without imposing visual design.

## Why teams use it

- Accessibility done right out of the box (WAI-ARIA APG compliant).
- Focus management, keyboard navigation, typeahead, screen reader support.
- Composable: small pieces you assemble.
- Works underneath shadcn/ui — if you're using shadcn, you're using Radix.

## What it includes (selected)

- **Accordion** — stacked headings revealing content
- **Dialog** — modal with focus trap and Esc handling
- **Dropdown Menu** — submenus, grouped items, typeahead
- **Hover Card** — preview content on hover
- **Navigation Menu** — accessible top-nav and mega menus
- **Popover** — anchored small content
- **Tabs** — keyboard-navigable tab panels
- **Tooltip** — on hover and focus, with delays
- **Toast** — accessible notifications
- **Toolbar** — grouped controls with arrow-key navigation
- **Toggle Group** — segmented controls
- **Switch / Checkbox / Radio Group** — accessible form controls

## When to reach for Radix directly (not via shadcn)

- You're building a fully custom design system and want primitives without shadcn's styling.
- A component you need isn't in shadcn yet (e.g., Toolbar).
- You want to compose new patterns Radix supports but shadcn doesn't expose.

## The Radix prompt

```
Use Radix primitives for interactive components — accordion, dropdown menu,
dialog, popover, tabs, tooltip, navigation menu. Keep styling aligned with our
design system.

Requirements:
- Preserve Radix's focus management — don't override unless you understand the consequences
- Use Radix's keyboard handling (Esc to close, arrow keys to navigate)
- Add visible focus states (Tailwind: focus-visible:ring-2)
- Don't replace Radix with hand-rolled primitives unless the constraints require it
```

## Why this matters

The single biggest source of inaccessible UI is hand-rolled menus, modals, and dropdowns. Radix solves the hard parts (focus trapping, keyboard nav, screen reader announcements) so you focus on styling.

If Claude proposes a custom dialog when Radix exists in your repo, push back:

> "We already use Radix. Use Radix Dialog instead of writing a custom modal. Preserve focus trap and Esc handling."
