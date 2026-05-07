# Ask for Outcomes, Not Components

The single most important rule in this course.

## The rule

When you prompt Claude Code, describe the **user outcome** you want, not the **component** you think will deliver it.

Components are conclusions. Outcomes are problems. Claude is much better at picking the right component when it understands the problem.

---

## Three pairs

### Pair 1

**Weak prompt:**
> Add an accordion.

**Better prompt:**
> This settings page feels too dense. Recommend whether accordion sections, tabs, a right-side drawer, or progressive disclosure would make it easier to use. Explain the tradeoffs, then implement the best option.

The first asks for a thing. The second asks for an outcome.

### Pair 2

**Weak prompt:**
> Add a menu.

**Better prompt:**
> This page has too many visible actions. Recommend the best action organization pattern: dropdown menu, toolbar, split button, context menu, or command palette. Explain which actions should stay visible and which should move into the menu.

The first asks for a component. The second asks for *behavior change* and lists rivals.

### Pair 3

**Weak prompt:**
> Make the dashboard better.

**Better prompt:**
> Improve this dashboard for a user who needs to understand performance quickly and take action. Focus on metric hierarchy, filters, drill-downs, table actions, empty states, loading states, and responsive layout. Give me 3 design options before coding.

The first asks for "better." The second asks for "better *for whom* doing *what*."

---

## Why this rule beats every shortcut

- **Specificity beats generality.** "Better" is unmeasurable. "Easier to scan in 3 seconds" is.
- **User-first beats component-first.** The right component changes when the user changes. Lock in the user, let the component follow.
- **Rivals beat singletons.** Naming three rival patterns forces Claude to pick — and to defend the pick.
- **Tradeoffs beat assertions.** "Implement the best option" without "explain the tradeoffs" lets Claude stop thinking. The phrase forces analysis.

---

## A four-part formula

Every UI prompt fits this template:

```
[The user problem in 1 sentence].

Recommend the best pattern from: [3-5 rival patterns by name].

Explain the tradeoffs, then implement the best option.

Verify with [typecheck / lint / responsive / a11y].
```

Memorize this template. Run it on every UI request. After two weeks, you'll do it without thinking.

---

## What this rule unlocks

- **Compound vocabulary.** Every prompt teaches you 2-3 new pattern names.
- **Compound reuse.** Every "rivals" list reminds Claude what your stack has.
- **Compound discipline.** Every "explain the tradeoffs" stops Claude from skipping straight to code.
- **Compound trust.** Every "verify with" stops "done" from meaning "compiled."

Four compounds × every UI session × every day = 100x.

That's the rule. That's the course.
