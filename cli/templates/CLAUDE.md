# [PROJECT NAME] — UI/UX Development Rules

> Drop this file at the root of your project. Edit the bracketed placeholders to match your stack.

## Product Design Behavior

- Before coding large UI changes, **explore the current app structure first**.
- For unclear UI requests, **propose 3 options before implementation**.
- Use **correct UI/UX vocabulary** and teach the user the pattern names.
- Prefer **existing components and patterns** before adding dependencies.
- Keep dashboards **scannable, responsive, and accessible**.

## The 8-step Operating System

For every UI change, follow this:

1. Name the UI/UX pattern options.
2. Explain the tradeoffs.
3. Recommend the best pattern.
4. Show where it belongs in the app.
5. Reuse existing components.
6. Implement the smallest useful version.
7. Verify the result.
8. Teach the vocabulary as you go.

Do not skip steps. The order matters.

## Design System

- Use our existing **design tokens, spacing, typography, and component conventions**.
- Prefer **shadcn/ui-style components** when available.
- Prefer **Radix primitives** for interactive behavior.
- Use **Tailwind utilities** consistently.
- **Do not create duplicate** button, card, dialog, table, or form components.

## Component reuse policy

Before creating any of these, reuse the existing version:

- Buttons: `[src/components/ui/button.tsx]`
- Cards: `[src/components/ui/card.tsx]`
- Dialogs: `[src/components/ui/dialog.tsx]`
- Forms: `[src/components/forms/Form.tsx]`
- Tables: `[src/components/data-table/DataTable.tsx]`
- Drawers/sheets: `[src/components/ui/sheet.tsx]`

To extend an existing component, add a variant or prop. Only create a new component when the existing one cannot reasonably be extended.

## UI Quality Bar

Every new UI feature should include:

- Loading state (skeleton matching the layout)
- Empty state (with a next-best action)
- Error state (with a retry)
- Disabled state where relevant
- Responsive behavior at 375px / 768px / 1280px
- Keyboard support (Tab, Esc, arrow keys where expected)
- Visible focus state (use `focus-visible:` not raw `focus:`)
- Accessible labels (every input has a label; icon-only buttons have `aria-label`)
- Accessible form errors (`aria-invalid`, `aria-describedby` to the message)

## Dashboard Rules

Dashboards should include:

- Clear page title
- Primary action visible
- KPI hierarchy (3-5 most important up top)
- Filter / search controls where useful
- Useful table actions (sort, filter, row actions, bulk actions)
- Drill-down path where useful
- **No chart without a clear user decision attached**

## Verification

After UI changes:

- Run `[pnpm typecheck]` (or your equivalent)
- Run `[pnpm lint]`
- Run `[pnpm test]` if available
- Verify responsive layout at 375px / 768px / 1280px
- Check keyboard navigation
- Report what changed and what was verified

Do not mark complete if any of the above fails. Fix the underlying issue, do not silence the warning.

## Behaviors to avoid

- Don't add features beyond what the task requires.
- Don't add error handling for scenarios that can't happen.
- Don't write generic comments. Only document the *why* when non-obvious.
- Don't introduce new design language without explicit approval.
- Don't create duplicate components when an existing one fits.
- Don't claim "done" when typecheck or lint is failing.
