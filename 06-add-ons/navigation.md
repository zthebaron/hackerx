# Navigation Add-Ons

Use these when the app feels hard to move through.

## The menu

- Collapsible sidebar
- Sidebar groups
- Nested nav
- Top nav
- Breadcrumbs
- Recently viewed pages
- Favorites / pinned pages
- Command palette
- Global search
- Mobile bottom nav
- Route-level loading states
- Page title bar with actions
- User / account menu
- Workspace switcher
- Organization switcher

## The prompt

```
Review the app navigation.

Recommend the best navigation model for this product. Consider:
- sidebar (collapsible, grouped, nested)
- top nav (with or without mega menu)
- breadcrumbs
- command palette (Cmd+K)
- mobile nav (drawer or bottom nav)
- workspace / org switching

Explain the tradeoffs before coding.

For the recommended model, describe:
- the sidebar/top-nav structure (full label list)
- where favorites and recently viewed live
- whether a command palette is needed (and what's in it)
- whether breadcrumbs add value (and where)
- what changes for mobile
- what loading states the navigation needs

Then propose 3 directions:
- minimal (lowest change)
- modern SaaS (recommended for most teams)
- power-user (command palette + favorites + advanced shortcuts)
```

## Sequencing the work

Don't do all 15 at once. A typical sequence:

1. **Sidebar with groups** — base structure.
2. **Breadcrumbs** — instant orientation win for nested pages.
3. **Command palette** — Cmd+K for power users.
4. **Mobile drawer or bottom nav** — when phone usage matters.
5. **Recently viewed / favorites** — once nav has settled.
6. **Workspace / org switcher** — only if multi-tenant is real.
