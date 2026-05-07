# Navigation Patterns

How users move through your app.

If users can't find what they need in <2 clicks, the problem is your navigation, not your features.

## Sidebar navigation

A persistent vertical column of links, usually on the left.

- **Use when:** Many sections, dashboard products, internal tools, admin panels.
- **Don't use when:** A simple marketing site or a 3-page app.
- **Variants:** Collapsible, grouped, nested.
- **Prompt:** "Add a collapsible sidebar with grouped navigation. Reuse our existing nav components."

## Top navigation

A horizontal bar at the top with primary links and account actions.

- **Use when:** Few major areas (≤7), client-facing apps, marketing surfaces.
- **Don't use when:** You have 15+ destinations — they won't fit.
- **Variants:** Centered, left-aligned brand + right-aligned account.
- **Prompt:** "Create a top nav with primary links on the left and account actions on the right."

## Breadcrumbs

A trail showing where the user is in a nested hierarchy.

- **Use when:** Pages are nested 2+ levels deep.
- **Don't use when:** Your information architecture is flat.
- **Accessibility:** Use `<nav aria-label="Breadcrumb">` and an ordered list. Last item should have `aria-current="page"`.
- **Prompt:** "Add breadcrumbs so users know where they are. The last item should reflect the current page and not be clickable."

## Tabs

Switch between related views *on the same page*.

- **Use when:** 2-6 related views (Overview / Activity / Settings / History).
- **Don't use when:** Views are unrelated — that's a navigation problem, not a tabs problem.
- **Don't use when:** You have 8+ tabs — use a sidebar or sub-nav instead.
- **Prompt:** "Use tabs for Overview, Activity, Settings, and History. Tab labels should be 1-2 words. Default to Overview."

## Segmented control

A small horizontal group of 2-4 mutually exclusive view modes.

- **Use when:** "Show me this in a different view" — List / Board / Calendar.
- **Don't use when:** The choice changes filters or scope (use tabs).
- **Prompt:** "Add a segmented control for List, Board, and Calendar views. Persist the user's last choice."

## Stepper

A numbered progress indicator for a multi-step flow.

- **Use when:** Onboarding, checkout, multi-step forms.
- **Don't use when:** A single form fits on one screen.
- **Variants:** Linear (must complete in order), Non-linear (jumpable).
- **Prompt:** "Use a stepper for Setup → Review → Launch. Show the current step prominently and allow going back."

## Command palette

A keyboard-triggered modal for search, navigation, and actions. Cmd+K is the de facto standard.

- **Use when:** Power-user products. Many destinations. Many actions.
- **Don't use when:** Casual user products where keyboard isn't a primary input.
- **Prompt:** "Add a command palette triggered by Cmd+K. Include navigation, search, and quick actions. Use fuzzy matching."

## Mega menu

A grouped, multi-column dropdown from the top nav.

- **Use when:** A category contains 10+ destinations that benefit from visual grouping.
- **Don't use when:** A simple dropdown will do.
- **Prompt:** "Create a mega menu for the Products category, grouped by use case with descriptions."

## Drawer / sheet

A temporary panel that slides in from a side.

- **Use when:** You need to show details without losing the user's place on the current page.
- **Right drawer:** Detail of a selected item.
- **Bottom drawer:** Mobile actions, filters.
- **Prompt:** "Open details in a right-side sheet instead of a new page. Close on Esc and on overlay click. Trap focus while open."

## Bottom navigation

A horizontal bar at the bottom of mobile screens with 3-5 core destinations.

- **Use when:** Mobile-first app. iOS/Android pattern parity.
- **Don't use when:** Desktop-first product.
- **Prompt:** "Use bottom navigation on mobile with up to 5 core sections. Persist across screens."

---

## Choosing between them

When in doubt, ask Claude:

```
This app needs a navigation upgrade. The current navigation is [describe].
Recommend the best pattern from: sidebar, top nav, breadcrumbs, tabs,
segmented control, command palette, drawer, bottom nav. Explain tradeoffs
based on our routes and likely user tasks. Then propose 3 directions before coding.
```
