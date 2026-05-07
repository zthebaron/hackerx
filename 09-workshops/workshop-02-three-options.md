# Workshop 02 — Three Options

**Time:** 60 minutes solo, 90 minutes for a pair.

**Goal:** Take the #1 candidate from Workshop 01 and force three real implementation directions. End with a written rationale for which one wins.

## Setup (5 min)

You should have a candidate from Workshop 01. If not, do that one first.

## Step 1 — Run "give me options" (15 min)

Paste [Prompt 02 — Give Me Options](../05-prompt-library/02-give-me-options.md), with your candidate as the target. Specify *5* options for this workshop (you'll use the extra 2 to expose blind spots).

## Step 2 — Audit each option (15 min)

For each of the 5 options, fill in:

| Option | Layout | Components | Effort | Audience | Tradeoff |
|---|---|---|---|---|---|
| 1. | | | | | |
| 2. | | | | | |
| 3. | | | | | |
| 4. | | | | | |
| 5. | | | | | |

If Claude's response didn't give you enough to fill in any cell, ask a follow-up:

> "For option 3, what specific components would we use, and which exist in our stack?"

## Step 3 — Eliminate (5 min)

Cross out the options whose audience isn't your audience.

You'll usually be left with 2-3.

## Step 4 — Write the recommendation (15 min)

Write a 1-page recommendation that includes:

1. **Recommended option.** Which one, and one sentence on why.
2. **Why not the others.** Two sentences each on why the rivals were rejected.
3. **What the recommended option requires.** Components new vs. reused. Estimated effort.
4. **What this *doesn't* include.** Be explicit about scope cuts ("This does not include direction 5's customizable widgets").
5. **Verification plan.** What checks will determine "done"?

Time-box this to 15 minutes.

## Step 5 — Defend it (5 min, in pairs)

If you're working in a pair, swap recommendations. Each person plays the skeptic for 2 minutes.

The skeptic asks:
- "Why didn't you pick option X?"
- "What if our user base changes — does this still work?"
- "What components are you inventing that we already have?"
- "What happens on mobile / at low data / on slow networks?"

If you can defend the recommendation under 2 minutes of skeptic questions, ship it.

---

## Self-grading rubric

- **Differentiation.** Are your 5 options *meaningfully* different, or are 3 of them slight variations? (10 = clearly different; 0 = palette swaps)
- **Audience clarity.** Did you cross out options whose audience isn't yours? Could you name the audience? (10 = explicit; 0 = vague)
- **Reuse.** Does the recommended option specify components that exist in your stack? (10 = yes, with paths; 0 = invented from scratch)
- **Scope cuts.** Did you write down what this *doesn't* include? (10 = yes; 0 = no)
- **Defendability.** Could you survive 2 minutes of skepticism without backpedaling? (10 = yes; 0 = collapsed under questioning)

35/50 = you can ship. 45/50 = you can lead this workshop.

---

## Common failure modes

- **Five options that are all slight variations.** Force differentiation. Make them disagree on the *user model*, not just the layout.
- **Picking option 1 because it's the cheapest.** Cheapest isn't always right. The right test is: "what does this product need to be in 12 months?" If option 1 plateaus and option 2 scales, pick 2.
- **Skipping scope cuts.** This is where most projects fail. Write down what you're NOT building, and don't quietly slip it back in.
- **Not naming the audience.** "Power users" isn't an audience. "Field technicians on phones in trucks with intermittent signal" is.
