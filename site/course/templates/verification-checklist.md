# Verification Checklist

Paste at the bottom of every PR description. Check each box honestly. If a box can't be checked, explain why.

```markdown
## Verification

- [ ] `typecheck` passes
- [ ] `lint` passes
- [ ] `tests` pass (or N/A — explain)
- [ ] Build succeeds (if applicable)
- [ ] Mobile (375px) — layout verified
- [ ] Tablet (768px) — layout verified
- [ ] Desktop (1280px+) — layout verified
- [ ] Keyboard navigation — Tab, Shift+Tab, Esc, Enter all behave correctly
- [ ] Focus states — visible on every interactive element
- [ ] Color contrast — WCAG AA on all text and meaningful UI
- [ ] Empty state — implemented and tested
- [ ] Loading state — skeleton matches the final layout
- [ ] Error state — recoverable with a retry
- [ ] Reused components — listed below

### Reused components
- `[path/to/component.tsx]`
- ...

### New components
- `[path/to/new.tsx]` — [one-line purpose]
- ...

### Known follow-ups (not blocking this PR)
- ...
```

## How to use it

- Don't check a box you didn't actually verify.
- "N/A" with an explanation is fine. "I forgot" is not.
- "Known follow-ups" is the honesty section. List anything you noticed but punted.

## When to skip the checklist

For:
- Trivial typo fixes
- Internal tooling that has no UI
- Pure refactors that touch no rendered output

For everything else, run the checklist.
