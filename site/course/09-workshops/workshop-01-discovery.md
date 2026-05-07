# Workshop 01 — Discovery

**Time:** 60 minutes solo, 90 minutes for a pair.

**Goal:** Run a real discovery pass on a real screen. End with a categorized opportunity map you'd be willing to put in a PR description.

## Setup (5 min)

1. Open your real product. Pick one non-trivial screen — a dashboard, a settings page, a primary list view. Don't pick a marketing page.
2. Open Claude Code in the repo: `cd ~/your-project && claude`.
3. Have [03-ui-ux-vocabulary/full-cheat-sheet.md](../03-ui-ux-vocabulary/full-cheat-sheet.md) open in another window.

## Step 1 — Run pattern discovery (15 min)

Paste [Prompt 01 — UI Pattern Discovery](../05-prompt-library/01-pattern-discovery.md) into Claude Code, with your screen as the target.

Read the entire response. Don't skim.

## Step 2 — Categorize and triage (15 min)

For each suggestion in the response, write next to it:

- **Impact:** High / Medium / Low (how much does this help users?)
- **Effort:** Low / Medium / High (how long to ship?)
- **Risk:** Low / Medium / High (chance of regression / wasted work?)

Then sort by impact-per-effort.

## Step 3 — Pick 3 to pursue (10 min)

The top 3 impact-per-effort items are your candidates. Write them up:

```
## Top 3 candidates from discovery

1. [Pattern name] — [why it helps users] — [effort estimate]
2. [Pattern name] — [why it helps users] — [effort estimate]
3. [Pattern name] — [why it helps users] — [effort estimate]
```

## Step 4 — Vocabulary check (10 min)

Look at the 3 patterns you picked. For each, can you:

- [ ] Name the pattern in one sentence?
- [ ] Name 2 alternative patterns and why they're worse for this use case?
- [ ] Name a real component in your stack you'd use to implement it?

If any answer is "no," open the relevant page in [03-ui-ux-vocabulary](../03-ui-ux-vocabulary/README.md) and read until you can answer all three.

## Step 5 — Write the PR description (5 min)

Pretend you're filing a PR for the #1 candidate. Write the description:

```markdown
## What
[1-2 sentences: the change]

## Why
[1-2 sentences: the user problem]

## Pattern
[Pattern name and link to the cheat-sheet entry]

## Components reused
[Specific files in the repo]

## Verification
[typecheck / lint / responsive / a11y / screenshots]
```

Time-box this to 5 minutes. The act of writing is the exercise.

---

## Self-grading rubric

Score yourself out of 10 on each:

- **Pattern naming.** Can you name every pattern in the response, or are some still unfamiliar? (10 = all named; 5 = half; 0 = couldn't repeat any)
- **Triage discipline.** Did you actually score impact/effort/risk for every item, or did you skim and pick what felt good? (10 = all scored; 0 = picked from gut)
- **Tradeoff articulation.** For your #1 pick, can you explain in one paragraph why two alternatives are worse? (10 = clear; 0 = couldn't)
- **Reuse vs. invent.** Did you identify which components in your repo would be reused? (10 = yes; 0 = no)
- **PR-readiness.** Could a teammate read your PR description and approve it without followups? (10 = yes; 0 = vague)

A score of 35/50 means you're functional. 45/50 means you're ready to pair-teach this.

---

## Common failure modes

- **You skimmed the response.** The response is the exercise. Read it slowly.
- **You picked by gut instead of triaging.** Force yourself through the impact/effort/risk grid even when the answer feels obvious. The discipline is the value.
- **You couldn't name alternatives.** That's a vocabulary gap. Mark it. Read the relevant cheat sheet entry.
- **You skipped the PR description.** Writing what you'd do is the difference between a workshop and a daydream.
