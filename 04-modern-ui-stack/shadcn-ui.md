# shadcn/ui

Open-source building blocks you copy into your React app. Not a package — a code-mod-style component library where the code lives *in your repo* so you fully own and customize it.

## Why teams use it

- Production-ready out of the box.
- Accessibility from Radix primitives underneath.
- Tailwind-styled, easy to retheme.
- No dependency lock-in — components live in your repo.
- Has a "blocks" library: full dashboards, login pages, sidebars, data tables you can copy.

## What it includes

- Buttons, inputs, selects, checkboxes, switches.
- Dialogs, drawers, popovers, tooltips, hover cards.
- Accordion, tabs, navigation menu.
- Data table (with sorting, filtering, pagination).
- Sidebar component.
- Charts.
- Toaster.
- Form abstractions over react-hook-form + zod.
- Pre-built blocks: dashboards, sidebar layouts, login pages, command palettes.

## When to use it

- New SaaS dashboard.
- Internal tool, admin panel.
- Anywhere you'd otherwise reach for Material UI or Chakra.

## When NOT to use it

- Pure marketing sites — overkill.
- A design language that diverges heavily from "neutral SaaS" — you'll fight it.

## The shadcn prompt

```
Use shadcn/ui patterns where possible. Build a dashboard shell with sidebar,
chart cards, data table, filters, and responsive layout. Keep the design
clean, neutral, and production-ready.

Specifically:
- Use shadcn's Sidebar component with grouped navigation
- Use shadcn's Data Table block for the records list
- Use shadcn's Card component for KPI cards
- Use shadcn's Sheet (drawer) for detail panels
- Reuse our existing tokens for colors, spacing, typography
- Don't reinvent components — pull from shadcn's blocks library where they exist

Before coding, propose 3 directions and recommend one.
```

## Common Claude failure with shadcn/ui

Claude sometimes installs shadcn primitives one at a time when a *block* exists for the whole pattern. Counter it explicitly:

> "Before installing individual components, check if shadcn/ui has a block for this pattern (dashboard-01, sidebar-07, data-table, etc.) and use the block as a starting point."
