# Trust and Feedback Patterns

How users know what just happened, what's about to happen, and whether they can trust the app to not lose their work.

These patterns are the difference between a UI that *feels solid* and one that *feels flaky*. They cost almost nothing to add and matter enormously.

## Toast

A small, dismissible message that appears briefly to confirm an action.

- **Use when:** Saving, archiving, copying, completing small actions.
- **Don't use when:** The information is critical and the user might miss it — use an alert banner or inline state instead.
- **Required:** Auto-dismiss (4-6s), manual close, accessible (use a live region with `role="status"` for non-urgent toasts or `role="alert"` for urgent ones).
- **Prompt:** "Show a toast after saving. Auto-dismiss after 5s. Include an Undo action where appropriate."

## Alert banner

A persistent, full-width message at the top of a page or section.

- **Use when:** System-level information the user must see — billing issue, maintenance window, account warning.
- **Variants:** Info / Warning / Error / Success.
- **Required:** Clear actionable text. A primary action ("Update billing"). Optional dismiss.
- **Prompt:** "Add an alert banner at the top of the dashboard for account issues. Persistent until resolved. Include a primary action."

## Confirmation dialog

A modal that requires explicit confirmation before a risky action.

- **Use when:** Destructive actions — delete, archive permanently, send, publish.
- **Required:** Clear consequence ("This will permanently delete 14 records and cannot be undone"), distinct destructive button styling, easy cancel.
- **Don't:** Use confirmation dialogs for safe actions — it trains users to click through them.
- **Prompt:** "Require confirmation before deleting. Show how many items will be deleted and that it can't be undone."

## Undo action

A toast with an "Undo" button after an action.

- **Use when:** The action is reversible and the user might regret it — archive, delete, move.
- **Window:** 5-10 seconds is standard.
- **Don't:** Use undo as a substitute for confirmation on truly destructive actions.
- **Prompt:** "Show an undo toast after archive/delete. Give the user 7 seconds to undo."

## Progress indicator

A bar, percentage, or step count for long-running tasks.

- **Use when:** A task takes >2s and the user is waiting on it.
- **Determinate:** Show actual progress (file uploads, imports).
- **Indeterminate:** Show motion (spinner, indeterminate bar) when you can't measure progress.
- **Prompt:** "Show a determinate progress bar while importing data. Include estimated time remaining if available."

## Status badge

A colored chip showing the state of an item.

- **Use when:** Status matters at a glance — Active, Paused, Failed, Draft.
- **Required:** Color + text, never color alone (accessibility).
- **Don't:** Use 8 different statuses with 8 colors — it stops communicating anything.
- **Prompt:** "Add badges for Active (green), Paused (yellow), Failed (red), Draft (grey). Use icon + text, not color alone."

## Validation message

Inline feedback on a form field.

- **Use when:** A form input can fail validation.
- **Required:** Plain language ("Email must include an @"), placement directly below the field, accessible (`aria-invalid`, `aria-describedby` to the error).
- **Don't:** Validate on every keystroke — wait for blur or submit.
- **Prompt:** "Add inline validation with helpful messages. Validate on blur and on submit. Use aria-invalid and aria-describedby."

---

## The trust budget

Every UI has an unspoken trust budget. It's spent by:

- Silent failures
- Lost work
- Vague error messages
- Surprise destructive actions
- "Are you sure?" dialogs that are too easy to click through

It's earned by:

- Toasts confirming every save
- Undo on risky-but-reversible actions
- Confirmation dialogs only when truly needed
- Inline validation that catches issues before submit
- Status that changes visibly when things change

Add these patterns even when nobody asked. They're free trust.
