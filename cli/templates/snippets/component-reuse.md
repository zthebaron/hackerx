# Prompt 07 — Component Reuse Audit

**When to use:** Before any UI feature. Stops Claude from inventing duplicates.

```
Before building anything new, inspect the existing components in this codebase.

Find reusable components for:
- layout (shells, grids, containers)
- buttons (primary, secondary, destructive, ghost, link)
- forms (inputs, selects, checkboxes, switches, form abstractions)
- cards
- tables
- dialogs
- menus (dropdown, context, command palette)
- tabs
- notifications (toast, alert banner)

Then tell me:
1. What to reuse — components that already match the need
2. What to extend — components that almost match (note what props/variants to add)
3. What to create new — only when nothing in the repo matches
4. What to avoid duplicating — components that exist but Claude might have missed

Show me the file paths for the reusable ones.

Do not code yet.
```

## Why this prompt is high-leverage

The single most common Claude failure: it doesn't know your component library exists, or knows it but ignores it. The result: a parallel system of slightly different components.

This prompt forces an audit before any building. It catches the duplication risk before it ships.

## What you do with the output

- Bookmark or pin the file paths Claude returns.
- When the next session asks Claude to build something, paste those paths into the prompt as constraints: *"Reuse `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, ..."*.

## Bake it into CLAUDE.md

Once you've done this audit once, add the result to your project's [CLAUDE.md](../templates/CLAUDE.md):

```
## Component reuse policy

Before creating any of these, reuse the existing version:
- Buttons: src/components/ui/button.tsx
- Cards: src/components/ui/card.tsx
- Dialogs: src/components/ui/dialog.tsx
- Forms: src/components/forms/Form.tsx
- Tables: src/components/data-table/DataTable.tsx
...

To extend an existing component, add a variant or prop.
Only create a new component when the existing one cannot reasonably be extended.
```

After that, every future Claude Code session in this repo will respect the policy automatically.
