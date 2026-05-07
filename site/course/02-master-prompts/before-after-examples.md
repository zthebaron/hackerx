# Before / After: Real prompt upgrades

Three real patterns. Same intent. Different output quality.

---

## Example 1 — The settings page

**Weak prompt:**

> Add an accordion.

**What you get:** A generic accordion, often with the wrong groupings, sometimes a new component when you already had one.

**Better prompt:**

> This settings page feels too dense. Recommend whether accordion sections, tabs, a right-side drawer, or progressive disclosure would make it easier to use. Explain the tradeoffs, then implement the best option.

**What you get:** A diagnosis, three pattern options with tradeoffs, a recommendation, and an implementation that uses your existing primitives.

**Why the second works:**
- Names the **outcome** ("feels too dense") instead of the **component**.
- Lists **rival patterns** so Claude has to differentiate.
- Asks for the **tradeoff** before the implementation.

---

## Example 2 — The toolbar

**Weak prompt:**

> Add a menu.

**What you get:** A dropdown menu with whatever actions Claude guesses are relevant. Half the time it's a `<select>` — not a menu at all.

**Better prompt:**

> This page has too many visible actions. Recommend the best action organization pattern: dropdown menu, toolbar, split button, context menu, or command palette. Explain which actions should stay visible and which should move into the menu.

**What you get:** A pattern recommendation, an audit of which actions are primary vs. secondary, and an implementation that respects the difference.

**Why the second works:**
- Lists the **rival patterns** by name — so you learn the words.
- Asks Claude to **decide visibility** for each action, not just dump them in a menu.
- Acknowledges the real problem: *too many visible actions*, not *no menu*.

---

## Example 3 — The dashboard

**Weak prompt:**

> Make the dashboard better.

**What you get:** Padding tweaks, a slight font change, maybe a new color. You ship and it still feels like a prototype.

**Better prompt:**

> Improve this dashboard for a user who needs to understand performance quickly and take action. Focus on metric hierarchy, filters, drill-downs, table actions, empty states, loading states, and responsive layout. Give me 3 design options before coding.

**What you get:** A real product proposal. Probably KPI cards with trend indicators, a date range picker, faceted filters, a drill-down side panel, skeleton loaders. Three of them, with tradeoffs.

**Why the second works:**
- Names a **target user** ("needs to understand performance quickly and take action").
- Lists **specific concerns** (hierarchy, filters, drill-downs, states, responsive).
- Demands **3 options**.

---

## The pattern behind the pattern

| Weak prompts say | Better prompts say |
|---|---|
| Add a component | Recommend a pattern |
| Make it better | Recommend an outcome for a specific user |
| Use a thing | Compare 3 candidate patterns and pick |
| Just do it | Explain tradeoffs, then implement |

The trick: **describe the user problem and the rival patterns, not the component.**

Claude is a much better designer when you give it a design problem. It's a mediocre designer when you give it a component request.
