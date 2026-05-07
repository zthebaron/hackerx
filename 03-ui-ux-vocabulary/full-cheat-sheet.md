# UI/UX Vocabulary — Full Cheat Sheet

The full reference. Use these words when you know the idea but not the term.

The accessibility behaviors below align with the WAI-ARIA Authoring Practices Guide (accordions, breadcrumbs, dialogs, disclosure widgets, grids, menus, tabs, toolbars, tooltips, tree views) and WCAG 2.2 (visible focus, contrast, name/role/value).

---

## Navigation Patterns

| Pattern | Use it when | Prompt phrase |
|---|---|---|
| Sidebar navigation | Many sections or dashboard pages | "Add a collapsible sidebar with grouped navigation." |
| Top navigation | Simple app with few major areas | "Create a top nav with primary links and account actions." |
| Breadcrumbs | Users move through nested pages | "Add breadcrumbs so users know where they are." |
| Tabs | Users switch between related views on the same page | "Use tabs for Overview, Activity, Settings, and History." |
| Segmented control | Users switch between 2–4 view modes | "Add a segmented control for List, Board, and Calendar views." |
| Stepper | Users complete a multi-step flow | "Use a stepper for setup, review, and launch." |
| Command palette | Power users need fast keyboard navigation | "Add a command palette for search, navigation, and actions." |
| Mega menu | Many grouped destinations need visual organization | "Create a grouped mega menu for product sections." |
| Drawer / sheet | Temporary panel from the side | "Open details in a right-side sheet instead of a new page." |
| Bottom nav | Mobile app with 3–5 core sections | "Use bottom navigation on mobile." |

---

## Disclosure and Menus

| Pattern | Use it when | Prompt phrase |
|---|---|---|
| Accordion | Expandable stacked sections | "Use accordions to reveal advanced settings." |
| Collapsible panel | One section needs show/hide | "Make this filter area collapsible." |
| Dropdown menu | A button has multiple actions | "Add a dropdown menu for row actions." |
| Context menu | Right-click or item-specific actions | "Add a context menu for table rows." |
| Popover | Small temporary content near a trigger | "Use a popover for quick filters." |
| Tooltip | A control needs a short explanation | "Add tooltips for unclear icons." |
| Hover card | Preview information without navigation | "Show a hover card with user details." |

Radix UI provides accessible primitives for all of these — accordion, dropdown menu, dialog, popover, tabs, tooltip, hover card — with managed focus, keyboard nav, and typeahead.

---

## Dashboard and Data Patterns

| Pattern | Use it when | Prompt phrase |
|---|---|---|
| KPI cards | Users need fast summary metrics | "Add KPI cards with trend indicators." |
| Data table | Users scan, sort, filter, compare records | "Use a data table with sorting, filtering, pagination, and row actions." |
| Saved views | Users reuse filters | "Add saved views for common dashboard filters." |
| Faceted filters | Users narrow data by attributes | "Add faceted filters for status, owner, date, and type." |
| Date range picker | Time matters | "Add a date range picker with presets." |
| Chart cards | Metrics need visualization | "Create chart cards for revenue, activity, and conversion." |
| Drill-down panel | Users need details behind a metric | "Clicking a KPI should open a drill-down side panel." |
| Empty state | No data exists yet | "Design an empty state with next-best action." |
| Skeleton loader | Data is loading | "Use skeleton loaders that match the final layout." |
| Error state | Data failed to load | "Add a recoverable error state with retry." |

---

## Productivity Patterns

| Pattern | Use it when | Prompt phrase |
|---|---|---|
| Global search | Users need to find anything fast | "Add global search across pages, records, and actions." |
| Bulk actions | Users select many rows | "Add checkbox selection and bulk actions." |
| Inline edit | Small edits should not require a new page | "Allow inline editing for status and owner." |
| Keyboard shortcuts | Power users repeat actions | "Add keyboard shortcuts and a shortcut help modal." |
| Activity feed | Users need history of changes | "Add an activity feed with timestamps and actors." |
| Notification center | Users need updates | "Add a notification center with unread state." |
| Audit log | Teams need accountability | "Add an audit log for important changes." |
| Comments | Collaboration matters | "Add comments on records with mentions." |

---

## Layout Patterns

| Pattern | Use it when | Prompt phrase |
|---|---|---|
| Split pane | Users compare list and detail | "Use a split-pane layout with list on the left and detail on the right." |
| Master-detail | Users select an item and inspect it | "Create a master-detail workflow." |
| Card grid | Items are visual or scannable | "Use a responsive card grid." |
| Kanban board | Items move through statuses | "Add a kanban board grouped by status." |
| Timeline | Sequence matters | "Show events in a timeline." |
| Wizard | Setup needs guidance | "Turn this into a guided wizard." |
| Dashboard shell | Whole app needs structure | "Create an app shell with sidebar, top bar, content area, and responsive mobile nav." |

---

## Trust and Feedback Patterns

| Pattern | Use it when | Prompt phrase |
|---|---|---|
| Toast | Small action feedback | "Show a toast after saving." |
| Alert banner | Important system message | "Add an alert banner for account issues." |
| Confirmation dialog | Risky action | "Require confirmation before deleting." |
| Undo action | Mistakes are likely | "Show an undo toast after archive/delete." |
| Progress indicator | Long task | "Show progress while importing data." |
| Status badge | State at a glance | "Add badges for Active, Paused, Failed, Draft." |
| Validation message | Form input can fail | "Add inline validation with helpful messages." |

---

## How to read this cheat sheet

Each row is a sentence stem you can drop into a Claude Code prompt. The trick is **never typing the prompt phrase alone.** Always put it inside a master prompt that asks Claude to:

1. Confirm the pattern fits the problem.
2. Suggest 2 alternatives in case it doesn't.
3. Reuse existing components.
4. Verify after implementing.

That's how the cheat sheet turns into product-quality work.
