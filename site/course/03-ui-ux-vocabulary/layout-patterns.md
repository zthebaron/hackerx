# Layout Patterns

The structural shape of a screen.

When a screen "feels off" but you can't say why, it's almost always the layout pattern is wrong for the user's task.

## Split pane

A two-column layout where the left side shows a list and the right side shows the selected item.

- **Use when:** Users browse a list and inspect items frequently — email, settings, file managers.
- **Don't use when:** Items are rarely selected or always opened in full.
- **Variants:** Three-pane (Outlook style), resizable.
- **Prompt:** "Use a split-pane layout with the list on the left and the selected item's detail on the right. Resizable divider. Persist the user's pane width."

## Master-detail

Functionally similar to split pane but conceptually broader — a list that "owns" a detail view, possibly on another route.

- **Use when:** Users select an item and dive deep into it.
- **Variants:**
  - Same screen split-pane (mobile-unfriendly).
  - List → drawer (mobile-friendly).
  - List → separate detail page (best for very deep details).
- **Prompt:** "Create a master-detail workflow. On desktop, show list and detail side-by-side. On mobile, list is the primary screen and tapping an item opens a full-screen detail."

## Card grid

A responsive grid of cards.

- **Use when:** Items are visual or scannable — projects, products, team members.
- **Don't use when:** Items are dense data — use a table instead.
- **Required:** Responsive (3 columns desktop → 2 tablet → 1 mobile typically).
- **Prompt:** "Use a responsive card grid. 3 columns on desktop, 2 on tablet, 1 on mobile. Each card has a thumbnail, title, secondary metadata, and a primary action."

## Kanban board

Columns of cards grouped by status. Drag cards between columns.

- **Use when:** Items move through a defined pipeline — tickets, leads, tasks.
- **Don't use when:** Items don't have a stage or aren't sortable.
- **Required:** Drag-and-drop, column counts, swimlanes if the data warrants.
- **Prompt:** "Add a kanban board grouped by status. Allow dragging cards between columns to update status. Show count per column."

## Timeline

A vertical or horizontal sequence of events with timestamps.

- **Use when:** Order and time matter — order history, conversation history, project milestones.
- **Vertical** for activity feeds. **Horizontal** for project timelines / Gantt-lite.
- **Prompt:** "Show events in a vertical timeline grouped by day. Each entry has a timestamp, actor, and a one-line description."

## Wizard

A guided multi-step flow with a stepper.

- **Use when:** Setup is complex enough that asking everything at once would overwhelm.
- **Don't use when:** A single form fits on one screen.
- **Required:** A stepper showing progress, back navigation, ability to save and resume.
- **Prompt:** "Turn this setup flow into a guided wizard with steps: Connect → Configure → Review → Launch. Allow back navigation and save-and-resume."

## Dashboard shell

The whole-app skeleton: sidebar, top bar, content area, mobile responsive nav.

- **Use when:** Building any non-trivial app. This is the foundation.
- **Required:** Persistent sidebar (collapsible on desktop, drawer on mobile), top bar with breadcrumbs and account menu, main content area with consistent padding, page title.
- **Prompt:** "Create an app shell: collapsible sidebar, top bar with breadcrumbs and account menu, content area with consistent padding. On mobile, sidebar becomes a drawer. Use shadcn/ui patterns."

---

## Layout decision flow

```
  Is this an app or a marketing surface?
     ├── app → dashboard shell (sidebar + top bar + content)
     └── marketing → top nav + sections + footer

  Is the user picking and inspecting items?
     ├── yes, lots of items, scannable → card grid
     ├── yes, dense data → data table
     ├── yes, detail-heavy → master-detail / split-pane
     └── yes, items move through stages → kanban / timeline

  Is the user setting up something complex?
     ├── yes → wizard
     └── no → single form

  Is the user comparing items?
     └── split-pane (or master-detail with multi-select)
```
