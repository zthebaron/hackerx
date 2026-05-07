# Workshop 03 — Implement and Verify

**Time:** 90 minutes solo, 2 hours for a pair.

**Goal:** Take the recommendation from Workshop 02 and ship it. End with a real PR or branch you'd be willing to merge, plus a verification checklist that's all checked.

## Setup (5 min)

You should have a written recommendation from Workshop 02. Check out a fresh branch:

```bash
git checkout -b workshop-03/<feature-name>
```

## Step 1 — Get the implementation plan (15 min)

In Claude Code, paste:

```
Take this recommendation [paste your recommendation from workshop 02] and create a detailed implementation plan.

Include:
- Files to modify (full paths)
- New components to create (with one-sentence purpose each)
- Existing components to reuse (with paths)
- Existing components to extend (with what to add)
- Dependencies to avoid adding
- Responsive behavior for mobile / tablet / desktop
- Accessibility requirements (keyboard, focus, contrast, ARIA)
- Verification steps after each commit

Do not code yet. Show me the plan.
```

Read the plan. Question it. Push back on anything that:

- Adds a dependency you don't need.
- Creates a component your repo already has.
- Skips a state (empty/loading/error/long-content).
- Doesn't say what verification looks like.

## Step 2 — Implement in small commits (45 min)

Use:

```
Implement the plan in small commits. Reuse existing components where possible.
After each major change, run the relevant checks and tell me what changed.
```

Aim for 3-6 commits. Each commit should:

1. Do one thing.
2. Have a message that's accurate.
3. Pass typecheck and lint before you move on.

If a commit fails verification, **don't move on**. Fix it in the same commit or revert.

## Step 3 — Run the full QA prompt (15 min)

Paste [Prompt 10 — QA and Verification](../05-prompt-library/10-qa-verification.md).

Wait for the report. Read every line.

For each "fail" or "needs human review" item:

- Decide: fix now, or note as a follow-up?
- Don't ship anything in the "fail" category. Fix or revert.

## Step 4 — Manual verification (10 min)

Run a final pass yourself:

- [ ] Open the feature in your dev environment.
- [ ] Mobile (375px), tablet (768px), desktop (1280px).
- [ ] Tab through every interactive element. Focus visible everywhere?
- [ ] Esc closes any modal/drawer. Focus returns to trigger?
- [ ] Empty state visible by clearing data or signing in fresh?
- [ ] Loading state visible by throttling network in DevTools?
- [ ] Error state visible by killing the API?
- [ ] Screen reader test: turn on VoiceOver/NVDA, navigate the feature.

Anything that fails: fix or note. Don't ship with known regressions.

## Step 5 — Write the PR description and ship it (10 min)

```markdown
## What
[One sentence]

## Why
[The user problem this solves]

## Pattern
[Which pattern from the cheat sheet]

## Reused components
[List with paths]

## New components
[List with one-line purpose]

## Verification
- [x] typecheck
- [x] lint
- [x] tests
- [x] responsive (375 / 768 / 1280)
- [x] keyboard nav
- [x] focus states
- [x] empty / loading / error states
- [x] screen reader pass

## Known follow-ups
[Anything you noted but didn't fix]
```

Open the PR. Self-review it once. Ship.

---

## Self-grading rubric

- **Plan adherence.** Did you implement what you planned, or scope-creep into something else? (10 = matched the plan; 0 = rewrote it three times)
- **Commit hygiene.** Are commits small, single-purpose, and accurately messaged? (10 = clean; 0 = one giant commit)
- **Verification completeness.** Did you actually run all 8 manual verification steps, or did you check 3 boxes? (10 = all 8; 0 = checked from memory)
- **Honest residuals.** Did you list real follow-ups, or claim "all done"? (10 = honest; 0 = pretended)
- **Reuse.** Did you reuse the components your plan said you would? (10 = yes; 0 = invented duplicates)

35/50 = a real PR. 45/50 = a PR that doesn't need followups.

---

## Common failure modes

- **Skipping the plan because "it's small."** No plan, no review, no quality control. Even small features deserve a 5-minute plan.
- **One huge commit.** Untestable, un-reviewable, hides the failure points.
- **Claiming verification you didn't run.** This is the cardinal sin. Either do the check or admit you didn't.
- **Hiding follow-ups.** Every shipped feature has known gaps. Naming them is honest. Hiding them is debt.
- **Inventing components your repo already has.** This shows you skipped the reuse audit. Run it.
