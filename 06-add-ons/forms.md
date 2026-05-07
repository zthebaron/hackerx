# Form Add-Ons

Use these when users enter or edit data and the flow feels painful.

## The menu

- Multi-step wizard
- Inline validation
- Field descriptions
- Tooltips
- Smart defaults
- Autosave
- Draft state
- Review step
- Confirmation dialog
- Success state
- Error recovery
- Conditional fields
- File upload
- Progress indicator

## The prompt

```
Improve this form UX.

Add:
- Clear grouping (related fields together, with section headers if needed)
- Inline validation (validate on blur and on submit, not on every keystroke)
- Helper text for any non-obvious field
- Smart defaults (pre-fill what we can infer)
- Required-field indication (asterisk + aria-required, not color alone)
- Loading state on submit (disable button + spinner + status announcement)
- Error state with field-level errors and a summary at the top
- Success feedback (toast or success page, with the next-best action)

Recommend whether this should be:
1. One page (default for simple forms)
2. Accordion sections (when the form is long but related)
3. Multi-step wizard with stepper (when the form is complex and benefits from chunking)

Explain the tradeoffs before coding.

Use react-hook-form + zod for validation. Reuse our existing form components.
```

## When to use a wizard

- Form has 3+ logical sections.
- Some fields depend on earlier ones (conditional logic).
- The user benefits from progress indication (long task, fear of losing work).

## When NOT to use a wizard

- Form fits comfortably on one screen.
- All fields are independent.
- Power users will resent the extra clicks.

## Autosave vs. explicit save

- **Autosave** when the data is record-like (notes, settings) and "save" feels like a chore.
- **Explicit save** when the action has a clear commit moment (Submit, Publish, Send).

Don't mix. Pick one and apply it consistently.
