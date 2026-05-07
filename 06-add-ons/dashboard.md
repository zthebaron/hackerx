# Dashboard Add-Ons

Use these when the dashboard looks like a static report.

## The menu

- KPI cards with trend arrows
- Comparison period toggle
- Date range picker
- Saved dashboard views
- Chart cards
- Drill-down panels
- Data table with row actions
- Export CSV / PDF
- Filter bar
- Faceted filters
- Search within table
- View switcher (table, cards, kanban, chart)
- Customizable widgets
- Drag-and-drop dashboard layout
- Alerts based on metric thresholds

## The prompt

```
Turn this dashboard into a more useful analytics workspace.

Add (in order of priority):
1. KPI hierarchy — 3-5 most important metrics, each with a trend indicator
2. Filters — faceted by status, owner, date range, type
3. Chart cards — each chart should answer one clear question
4. Drill-down panel — clicking a KPI opens a detail breakdown
5. Saved views — let users save filter combinations under a name

Keep the first version simple and production-ready.

Required states:
- Empty (no data) → empty state with a next-best action
- Loading → skeleton loaders matching the final layout
- Error → recoverable error with a retry button

Responsive:
- Desktop: multi-column with sidebar
- Tablet: 2-column
- Mobile: single column, KPIs stacked, filters in a drawer

Before coding, propose 3 directions and recommend one.
```

## A note on widgets

"Customizable widgets with drag-and-drop" is tempting but expensive. Most dashboards don't need it. Add it only if your users are sophisticated analysts who genuinely want different layouts.

If you do add it, build the *non-customizable* version first. Validate the layout works for 80% of users before letting them rearrange.
