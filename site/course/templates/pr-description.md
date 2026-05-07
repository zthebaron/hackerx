# Default PR Description

Drop this in `.github/PULL_REQUEST_TEMPLATE.md` of your real repo.

```markdown
## What
<!-- One sentence describing the change -->

## Why
<!-- The user problem this solves. Not the engineering excuse — the user value. -->

## Pattern
<!-- Which UI/UX pattern this implements. Link to the cheat sheet entry if you have one. -->

## How
<!-- 2-3 bullets on the implementation approach -->

## Reused components
<!-- List existing components you reused, with paths -->

## New components
<!-- List new components, each with a one-line purpose -->

## Verification
- [ ] typecheck
- [ ] lint
- [ ] tests
- [ ] mobile (375px)
- [ ] tablet (768px)
- [ ] desktop (1280px)
- [ ] keyboard nav (Tab, Esc, Enter)
- [ ] focus states visible
- [ ] empty / loading / error states
- [ ] screen reader pass (VoiceOver / NVDA)

## Screenshots
<!-- Mobile + desktop, before/after -->

## Known follow-ups (not blocking)
<!-- Anything you noticed but punted. Honest disclosure beats hidden debt. -->
```

## A note on screenshots

Screenshots aren't optional for UI PRs. Reviewers should be able to compare before/after without checking out the branch.

For animations, record a short screen capture (Cleanshot, Loom, Quicktime) and drop it in.
