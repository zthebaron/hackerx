# Table Add-Ons

Use these when users manage records and the table is the primary work surface.

## The menu

- Sorting
- Filtering
- Pagination
- Column visibility
- Column resizing
- Row selection
- Bulk actions
- Inline edit
- Row detail drawer
- Status badges
- Sticky header
- Empty state
- Export
- Saved views
- Density toggle
- Audit trail

## The prompt

```
Upgrade this table into a power-user data grid.

Add:
- Sorting (multi-column if our use case warrants)
- Filters (per-column for the most-used columns; faceted in a sidebar for global filters)
- Saved views (user-named filter combinations)
- Row actions (Edit / Duplicate / Archive / Delete in a dropdown menu)
- Bulk actions (checkbox selection, sticky action bar when items are selected)
- Column visibility toggle
- Column resizing
- Density toggle (Comfortable / Compact)
- Row click → right-side detail drawer (don't navigate away from the table)
- Status badges (color + text, never color alone)
- Sticky header
- Pagination OR virtualized infinite scroll (pick based on dataset size)
- Empty / loading / error states

Responsive:
- Desktop: full table with all columns
- Tablet: hide secondary columns
- Mobile: stack rows as cards, OR horizontal scroll for comparable data

Before coding, propose 2 directions:
1. Lightweight (sorting, filtering, row actions, saved views)
2. Full power-user grid (everything above)

Recommend based on our user base.

Use shadcn/ui Data Table block as the starting point if available in our stack.
```

## When to skip the table entirely

If your users mostly look at one record at a time, a card list with search beats a 14-column table. The "data table" pattern is for *comparison and bulk action* — if neither is happening, simpler patterns win.

## Mobile tables — pick one

Tables on mobile have three solutions, none perfect:

1. **Cards.** Stack each row as a card with the most important fields. Best when users browse rows.
2. **Horizontal scroll.** Keep the table layout but allow swipe. Best when users compare rows by exact value.
3. **Collapsed columns.** Show 2-3 fields by default, tap to expand. Compromise option.

Pick based on the dominant mobile task, not by trying to please everyone.
