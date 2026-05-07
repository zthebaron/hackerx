# Anatomy of the Master Prompt

Why each line is there. Edit any of them at your own risk.

## Line 1 — Role assignment

> "You are my senior product designer, UX strategist, front-end architect, and Claude Code implementation partner."

**Why:** Roles change response style. "Senior product designer" produces different output than "code assistant." Stacking four roles forces Claude to operate at the intersection — design *and* engineering *and* strategy.

## Line 2 — Permission to be vague

> "I am designing an app/dashboard, but I may not know the correct UI/UX terms for the features I want."

**Why:** Without this, Claude assumes you're using terms precisely. With it, Claude knows to translate "I want a thing on the side" into "you're describing a sidebar / drawer / split-pane — here's the difference."

## Step 1 — Inspect first

> "First, inspect the existing codebase, routes, components, styles, data flows, and current layout patterns."

**Why:** This is the **explore** phase. Without it, Claude proposes a sidebar even though you already have one. With it, Claude proposes upgrades to your sidebar.

## Step 2 — Classify the product

> "Identify what kind of product this is: dashboard / CRM / analytics app / internal tool / SaaS app / admin portal / client-facing / AI assistant / other."

**Why:** Pattern advice differs by product type. A CRM wants saved views and bulk actions. An analytics app wants drill-downs and date pickers. An AI assistant wants a streaming response area and a tool-call timeline. Forcing classification gets the right pattern set.

## Step 3 — UI/UX opportunity map

> "Create a UI/UX opportunity map. Include: navigation, layout, data display, interaction, accessibility, mobile/responsive, empty/loading/error states, power-user features, polish."

**Why:** This is a *checklist that prevents tunnel vision*. Without it, Claude proposes one navigation tweak and stops. With it, Claude has to find improvements in 9 categories.

## Step 4 — Three directions

> "Give me at least 3 design directions: Safe and familiar / Modern SaaS/dashboard / Premium/advanced power-user version."

**Why:** Forcing differentiation. See [why-three-options.md](../01-foundations/why-three-options.md).

## Step 5 — Per-direction structure

> "For each direction, explain: what changes, why it helps users, what components/patterns it uses, implementation difficulty, risks or tradeoffs."

**Why:** Otherwise you get three names without substance. This makes each option a real proposal you could greenlight.

## Step 6 — Vocabulary teaching

> "Use correct UI/UX vocabulary so I can learn."

**Why:** Compounds across sessions. Every prompt teaches you 2-3 new pattern names. After 20 sessions you're speaking the language.

## Step 7 — Reuse before invent

> "Recommend specific components from our current stack. Prefer existing project patterns before adding new libraries."

**Why:** The single most common Claude failure is reinventing components you already have. This line stops it.

## Step 8 — No coding yet

> "Do not code yet."

**Why:** Without this, Claude will helpfully start coding direction 2 and you'll spend hours undoing work you didn't approve.

## Step 9 — One round of questions

> "Ask me only the most important questions."

**Why:** Caps the back-and-forth. Without it, Claude asks 12 questions. With it, it asks 2-3.

## Steps 10-12 — The implementation contract

> "After I choose a direction, create an implementation plan. Then implement in small steps. After implementation, verify with: typecheck, lint, tests, responsive, accessibility, screenshot comparison."

**Why:** This is the **plan → implement → verify** spine. The verification list is the difference between "compiled" and "shipped."

## Output format A-G

> "A. Product diagnosis. B. Current UI problems. C. UI/UX opportunity map. D. 3 design directions. E. Component vocabulary cheat sheet. F. Recommended first implementation plan. G. Questions for me."

**Why:** Without a format, Claude writes a 4-paragraph essay. With this format, you get scannable sections you can navigate by header.

## What to customize

- Add product-specific role: *"You are also our compliance reviewer — flag any HIPAA risks."*
- Add stack constraints: *"We use Next 14 app router, Tailwind v4, shadcn/ui, and React Server Components. Don't suggest alternatives."*
- Add audience: *"Our users are field technicians on phones. Bias toward mobile-first and large touch targets."*

What NOT to remove:

- "Inspect first" (step 1)
- "Three directions" (step 4)
- "Use correct vocabulary" (step 6)
- "Do not code yet" (step 8)
- The verification list (step 12)

Those five are load-bearing.
