# Prompt 05 — Dashboard Upgrade

**When to use:** Your dashboard feels like a static report. Numbers without decisions.

```
Improve this dashboard as a working decision-making tool.

Focus on:
- metric hierarchy (the 3-5 most important up top)
- scanability (someone glancing at this for 3 seconds knows what's up)
- filters (most-common slices: status, owner, date range)
- time comparison (vs. last week / month / custom)
- chart clarity (each chart answers a clear question)
- drill-down behavior (clicking a metric reveals the why)
- table usefulness (sorting, filtering, row actions, bulk actions)
- empty / loading / error states for every data area
- mobile layout (stacked, prioritized)

Before coding, propose 3 layouts:
- Simple (least change, fastest to ship)
- Balanced (recommended starting point for most teams)
- Advanced (highest ceiling, more components, more polish)

Then recommend the best one for our user base. Use correct UI/UX vocabulary.
```

## What you get back

A real product proposal for the dashboard. Not "add some polish" but "here's what a decision-making dashboard looks like for your audience."

## What "scanability" catches

Most dashboards put 12 KPIs at the top with equal weight. The fix:

- 3-5 KPIs — the ones tied to a decision the user makes weekly.
- Trend indicator on each (vs. last period).
- Sparkline if it fits.
- Visual hierarchy: bigger numbers = bigger metrics. Don't make the user squint.

## What "drill-down behavior" catches

A KPI with no path to its detail is a static number. Every KPI should let the user click and see *why*.

## Follow-up prompt

After picking a direction:

```
Take direction 2 and create a detailed implementation plan.

Include:
- Files to modify
- New components to create (only if our stack doesn't have them)
- Existing components to extend (preferred)
- Responsive behavior for mobile / tablet / desktop
- Accessibility requirements (keyboard, focus, contrast, ARIA)
- Verification steps

Then implement in small commits, verifying after each.
```
