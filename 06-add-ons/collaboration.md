# Collaboration Add-Ons

Use these when teams share work.

## The menu

- Comments
- @Mentions
- Assignments
- Activity feed
- Shared saved views
- Notification center
- Approval workflow
- Change history
- Version history
- Internal notes
- Role-based visibility

## The prompt

```
Add collaboration features to this workflow.

Recommend where each of these should live without cluttering the interface:
- Comments (with @mentions, edit, delete)
- Activity feed (who changed what, when)
- Ownership / assignment (who owns this record)
- Notifications (in-app and optionally email)
- Approval workflow (if this product needs it)
- Internal notes (visible only to the team, not to clients)

For each feature, propose:
- Where it lives in the UI (inline, drawer, dedicated tab, page)
- Whether it's primary or secondary (always visible vs. collapsed)
- How notifications are triggered
- Whether it requires backend changes (and if so, what)

Don't add all of these. Pick the 2-3 that match this product's actual collaboration pattern.
```

## The collaboration sequencing rule

In every product, collaboration should be added in this order:

1. **Ownership.** Each record has an owner. Visible at a glance.
2. **Comments.** Threaded discussion attached to a record.
3. **@Mentions.** Notify a specific person from inside a comment.
4. **Activity feed.** Chronological list of changes, who made them, when.
5. **Notifications.** In-app first, email as opt-in.
6. **Approvals / change history.** Only if compliance or audit requires it.
7. **Roles and permissions.** Last, when sharing pain becomes real.

Skipping early steps to add later ones (notifications without comments, approvals without ownership) creates collaboration debt.

## The "internal notes" pattern

If your product is client-facing (CRM, support tool, agency tool), separate **public-facing comments** from **internal notes** at the schema level. Visually distinguish them so the team never accidentally writes a public message thinking it's internal.
