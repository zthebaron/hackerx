# Demo 01 — Building a Sales Dashboard

**Setting:** A small B2B SaaS team. They have a working CRM but no dashboard. The CEO asks: "We need a dashboard so I can see how sales is doing."

**Stack:** Next.js 14 (app router), Tailwind v4, shadcn/ui, Supabase.

**What this demo shows:** The full master-prompt loop on a green-field UI surface.

---

## Turn 1 — The user pastes the master prompt

> **User:** [Pastes [the master prompt](../02-master-prompts/master-prompt.md), then adds:]
>
> "I need a sales dashboard. The data lives in Supabase. We have deals, contacts, activities, and reps. I don't really know what should be on it."

## Turn 2 — Claude explores

> **Claude:** Let me inspect your repo first.

[reads `app/`, `lib/supabase/`, `components/ui/`]

> **Claude:**
>
> ## A. Product diagnosis
>
> You have a B2B SaaS CRM. Routes for `/deals`, `/contacts`, `/activities`. shadcn/ui components installed. Supabase client in `lib/supabase`. No `/dashboard` route yet.
>
> ## B. Current UI problems
>
> There's no current dashboard, so this is greenfield. The constraint: the dashboard must reuse your existing components (Card, DataTable, Sidebar from shadcn/ui) and Supabase data layer.
>
> ## C. UI/UX opportunity map
>
> - **Navigation:** Add `/dashboard` as the new default route. Move the sidebar's "Dashboard" link to the top.
> - **Layout:** Dashboard shell pattern — sidebar (already exists) + top bar + content area.
> - **Data display:** KPI hierarchy + chart cards + activity feed.
> - **Filtering:** Date range picker + faceted filter for "rep."
> - **Drill-down:** Click a KPI → drill-down side panel.
> - **Empty/loading/error states** for every data area.
> - **Responsive:** Stack KPIs and charts on mobile.
>
> ## D. Three design directions
>
> ### Direction 1 — Safe and familiar (Simple)
> - Single column. 4 KPI cards at the top. One chart card (revenue over time). One data table (recent deals).
> - Components: `Card`, existing `DataTable`, `LineChart`.
> - Difficulty: Low.
> - Risks: Plateaus quickly — if the team grows, this dashboard won't keep up.
>
> ### Direction 2 — Modern SaaS (Recommended)
> - 4 KPI cards (Revenue, Pipeline, Win Rate, Activities) with trend deltas vs. last period.
> - Date range picker (Last 7d / 30d / Quarter / Custom).
> - 2 chart cards: Revenue over time, Pipeline by stage (kanban-feel bar chart).
> - Data table: Recent deals with status badges, sortable, with row drawer for detail.
> - Faceted filter: by rep.
> - Drill-down side panel from each KPI.
> - Components: existing `Card`, `Sheet` (drawer), `DataTable`, plus new `Sparkline` and `KpiCard` (small, ~40 LOC each).
> - Difficulty: Medium.
> - Risks: Requires `KpiCard` and date range picker; budget ~1 day.
>
> ### Direction 3 — Power-user analytics (Advanced)
> - Customizable widget grid (drag-and-drop).
> - Saved views.
> - Comparison-period overlay on charts.
> - AI summary banner ("Revenue is up 12% week-over-week, driven mostly by enterprise deals from rep@company.com.").
> - Components: react-grid-layout, Vercel AI Elements for summary.
> - Difficulty: High.
> - Risks: 1-2 weeks of work; the team is 4 people, the customizable grid is overkill.
>
> ## E. Component vocabulary cheat sheet
>
> - **KPI cards** — small summary cards with a value, label, and trend.
> - **Faceted filters** — a filter UI that narrows by attribute (here: by rep).
> - **Drill-down panel** — a side panel that opens with the breakdown behind a metric.
> - **Master-detail** — list of records on the left, selected detail on the right.
>
> ## F. Recommended first implementation plan
>
> Direction 2. Start with the simplest version of it:
>
> 1. New route `app/dashboard/page.tsx`.
> 2. New components: `KpiCard.tsx`, `Sparkline.tsx`, `DateRangePicker.tsx` (using react-day-picker which is already a shadcn dependency).
> 3. Reuse: `Card`, `Sheet`, `DataTable`, `Badge`.
> 4. Server-side data fetch from Supabase.
> 5. Loading state with skeleton, empty state with "Create your first deal" CTA, error state with retry.
> 6. Responsive: stacked on mobile, 4-col KPIs / 2-col charts on desktop.
>
> ## G. One question for me
>
> Should "Activities" be a chart card or a table on the dashboard? Activities are dense; a table feels right but takes vertical space. Which matters more — visual summary or actionable list?

## Turn 3 — User picks and answers

> **User:** Go with direction 2. Activities should be a side activity feed in a right rail, not a chart or table on the main grid. Plan and implement.

## Turn 4 — Claude plans

> **Claude:**
>
> ## Implementation plan
>
> **Files to create:**
> - `app/dashboard/page.tsx` (server component, fetches data)
> - `app/dashboard/loading.tsx` (skeleton matching the layout)
> - `app/dashboard/error.tsx` (error boundary with retry)
> - `components/dashboard/KpiCard.tsx` (small reusable, ~40 LOC)
> - `components/dashboard/Sparkline.tsx` (recharts wrapper)
> - `components/dashboard/RevenueChart.tsx`
> - `components/dashboard/PipelineByStageChart.tsx`
> - `components/dashboard/ActivityFeed.tsx`
> - `components/dashboard/DateRangePicker.tsx`
> - `components/dashboard/RepFilter.tsx`
> - `lib/queries/dashboard.ts` (Supabase queries)
>
> **Files to modify:**
> - `components/Sidebar.tsx` (add Dashboard link, move to top)
>
> **Reused components:**
> - `components/ui/card.tsx`
> - `components/ui/sheet.tsx`
> - `components/ui/badge.tsx`
> - `components/ui/data-table.tsx`
>
> **Dependencies to add:**
> - `recharts` for charts (or pull from shadcn's chart component if available)
>
> **Verification at each commit:**
> - `pnpm typecheck`
> - `pnpm lint`
> - Loading / empty / error states render correctly (Storybook stories or visual check)
> - Responsive: 375px, 768px, 1280px
> - Keyboard nav: Tab through filters, focus visible
>
> Implementing now in 5 commits.

## Turn 5 — Claude implements (excerpt)

> **Claude:**
>
> Commit 1: scaffold route + Sidebar update.
> Commit 2: KpiCard + Sparkline + 4 KPIs wired to dummy data.
> Commit 3: RevenueChart + PipelineByStageChart wired.
> Commit 4: DataTable + ActivityFeed in right rail.
> Commit 5: Loading / empty / error states + responsive review.
>
> Verifying...
>
> - typecheck: ✅
> - lint: ✅ (1 unused import auto-fixed)
> - Loading state renders skeleton ✅
> - Empty state ("Create your first deal") renders when zero deals ✅
> - Error state renders on Supabase failure with retry button ✅
> - 375px: KPIs stack 1-col, charts stack ✅
> - 768px: KPIs 2-col, charts stack ✅
> - 1280px: KPIs 4-col, charts 2-col ✅
> - Keyboard nav: Tab cycles Filter → Date Range → first KPI → ... focus visible ✅
> - Color contrast: trend deltas use icon + text + color, not color alone ✅
>
> One thing for human review: the AI-summary direction (option 3) wasn't built but might be worth a follow-up sprint. The infrastructure (Supabase queries) is now ready for it.

---

## What this demo illustrates

- **Explore first.** Claude read the repo before talking.
- **Three options, real tradeoffs.** Direction 2 won because direction 1 plateaus and direction 3 is overkill for a 4-person team.
- **Reuse before invent.** Existing Card, Sheet, DataTable, Badge all reused.
- **Verification is part of done.** typecheck, lint, responsive, accessibility — all checked before claiming complete.
- **Honest residual.** Claude flagged the AI-summary as a follow-up, not as something snuck in.

This is what every UI session should look like. The rest of the course makes that the default.
