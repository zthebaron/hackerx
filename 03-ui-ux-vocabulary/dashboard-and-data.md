# Dashboard and Data Patterns

How dashboards become decision tools instead of static reports.

A dashboard exists to help users **make a decision** or **take an action**. If a chart doesn't lead to either, it doesn't belong on the dashboard.

## KPI cards

Small cards showing a single key metric, often with a trend indicator.

- **What goes on it:** Big number. Label. Trend arrow / sparkline. Comparison-period delta.
- **Don't:** Show 12 KPIs. Pick 3-5 the user actually decides on.
- **Don't:** Show absolute numbers without comparison context.
- **Prompt:** "Add a row of KPI cards for Revenue, Active Users, Conversion Rate, and Churn. Each shows the value, week-over-week delta, and a sparkline."

## Data table

A sortable, filterable, paginated grid of records.

- **Required:** sorting, filtering, row actions.
- **Strong defaults:** pagination (or virtualized infinite scroll), column visibility, sticky header, density toggle.
- **Power features:** saved views, bulk actions, inline edit, export.
- **Prompt:** "Use a data table with sorting, filtering, pagination, row actions, and bulk select. Sticky header. Empty/loading/error states."

## Saved views

Named bundles of filters, sort, and column visibility that the user can recall.

- **Use when:** Users repeatedly apply the same filter set.
- **Examples:** "My Open Tickets," "High-Priority Last 7 Days," "Stale Deals."
- **Prompt:** "Add saved views to the data table. Let users save current filters, sort, and column visibility under a name."

## Faceted filters

Multiple filter controls, usually in a sidebar or top bar, for narrowing data by attributes.

- **Examples:** Status (Active/Paused/Failed), Owner, Date range, Type.
- **Show counts:** "Active (124), Paused (8), Failed (2)" — counts massively help.
- **Prompt:** "Add faceted filters for status, owner, date range, and type. Show counts next to each option."

## Date range picker

A control that lets users pick a date range, with presets.

- **Required presets:** Today, Yesterday, Last 7 days, Last 30 days, Last quarter, Year to date, Custom.
- **Prompt:** "Add a date range picker with presets. Default to Last 30 days. Persist the user's choice."

## Chart cards

Cards containing a visualization — line, bar, area, donut, etc.

- **Required:** A clear question the chart answers ("Where is revenue going?"). A clear time scale. A legend if needed. An empty/loading/error state.
- **Don't:** Mix metrics with different units in the same chart.
- **Don't:** Use a pie chart with more than 5 slices.
- **Prompt:** "Create chart cards for revenue, activity, and conversion. Each has a title, time scale, and a clear question it answers."

## Drill-down panel

A side panel or modal that opens with the details behind a metric or row.

- **Use when:** A user clicks a KPI or chart and wants the underlying data.
- **Don't:** Navigate to a new page — keep the user's place on the dashboard.
- **Prompt:** "Clicking a KPI should open a right-side drill-down panel showing the breakdown by segment. Close on Esc."

## Empty state

What the user sees before there's any data.

- **Required:** A clear message. A next-best action. An illustration is optional but helps.
- **Don't:** Show a blank screen with no guidance.
- **Examples:** "No invoices yet — Create your first invoice."
- **Prompt:** "Design an empty state for when no data exists. Include the next-best action as a button."

## Skeleton loader

A grey placeholder that mimics the shape of the content while data loads.

- **Use when:** Loads take >300ms. Otherwise just show the data.
- **Don't:** Use a generic spinner — skeleton loaders feel faster.
- **Prompt:** "Use skeleton loaders that match the final layout for the KPI row, chart cards, and table."

## Error state

What the user sees when data fails to load.

- **Required:** A clear message. A retry button. Don't blame the user.
- **Don't:** Show "An error occurred" with no detail or recovery.
- **Prompt:** "Add a recoverable error state with a clear message and a retry button."

---

## Dashboard upgrade prompt

When you have a dashboard that "feels static," paste this:

```
Turn this dashboard into a useful analytics workspace.

Add:
- KPI hierarchy (3-5 most important at the top)
- Comparison-period toggle (vs. last week, last month, custom)
- Date range picker with presets
- Faceted filters for the most common slices
- At least one drill-down path from a KPI to its details
- Empty / loading / error states for every data area
- Responsive layout (stacked on mobile, multi-column on desktop)

Propose 3 directions before coding:
1. Simple
2. Balanced
3. Advanced

Then recommend the best one for our user base.
```
