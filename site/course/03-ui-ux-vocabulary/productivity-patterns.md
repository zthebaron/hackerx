# Productivity Patterns

Patterns that help power users get more done in less time.

## Global search

A single search bar that finds anything in the app — pages, records, actions, settings.

- **Use when:** App has 5+ resource types or 20+ pages.
- **Best practice:** Pair with a command palette (Cmd+K).
- **Prompt:** "Add global search across pages, records, and actions. Group results by type. Trigger with Cmd+K."

## Bulk actions

Selecting many rows and applying an action to all of them.

- **Required:** Checkbox column, "select all," "select all on this page," count of selected, action bar that appears when selection is non-empty.
- **Common actions:** Archive, delete, export, change status, assign owner.
- **Prompt:** "Add checkbox row selection with bulk actions: Archive, Change status, Assign owner, Export. Show a sticky action bar when items are selected."

## Inline edit

Changing a field value directly in a table or list, without opening a separate edit page.

- **Use when:** The field has a small set of valid values (status, owner, priority).
- **Don't use when:** The edit needs validation across multiple fields.
- **Prompt:** "Allow inline editing for status and owner in the data table. Save on blur or Enter. Show a brief saving state."

## Keyboard shortcuts

Global hotkeys for common actions.

- **Common shortcuts:** Cmd+K (command palette), N (new), / (focus search), G→D (go to dashboard), ? (shortcut help).
- **Required:** A help modal listing all shortcuts. Don't make users guess.
- **Don't:** Override standard browser shortcuts (Cmd+S for save is fine; Cmd+W for close is not).
- **Prompt:** "Add keyboard shortcuts for new, search, and navigation. Show a help modal triggered by '?'."

## Activity feed

A chronological list of changes, who made them, and when.

- **Use when:** Users need to know what's changed recently.
- **Granularity:** "Sarah changed status from Open to In Progress · 2h ago"
- **Prompt:** "Add an activity feed in the right panel showing recent changes with timestamps and actors. Group by day."

## Notification center

A bell icon with a badge count and a dropdown of unread notifications.

- **Required:** Unread state, mark-as-read, link to the related item.
- **Don't:** Push every system event — users will turn it off mentally.
- **Prompt:** "Add a notification center with unread state, mark-as-read, and links to related items."

## Audit log

A complete, filterable record of all important changes — for compliance, debugging, and accountability.

- **Different from activity feed:** Audit logs are exhaustive and filterable; activity feeds are summarized.
- **Filter by:** Actor, resource, action type, date range.
- **Prompt:** "Add an audit log accessible from settings. Show actor, action, resource, and timestamp. Filterable and exportable."

## Comments

Threaded discussion attached to a record.

- **Required:** @mentions, edit, delete, timestamps, optional file/image attachments.
- **Important:** Decide upfront whether comments are public, internal-only, or both.
- **Prompt:** "Add comments on records with @mentions and edit/delete. Notify the mentioned user."

---

## When to layer these in

Don't add all of these at once. Order them by impact:

1. **Global search** — biggest single productivity win.
2. **Bulk actions** — second-biggest, especially in tables.
3. **Inline edit** — third, removes painful round-trips.
4. **Keyboard shortcuts** — power users will ask. Casual users won't notice their absence.
5. **Comments / activity feed** — when collaboration becomes a stated need.
6. **Audit log** — when compliance or trust becomes a requirement.
