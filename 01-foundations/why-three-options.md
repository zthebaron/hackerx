# Why three options beats one

Every prompt in this course asks Claude for **3 directions**, not one. This isn't padding. It's a forcing function.

## What happens with one option

Claude gives you its best guess. You get one direction. You either accept it (probably suboptimal) or reject it ("no, not like that") and re-prompt blindly.

Re-prompting blindly is where most teams burn hours.

## What happens with three options

Claude has to **differentiate** them. Differentiation forces it to name the tradeoffs explicitly:

> **Option 1 — Safe and familiar.** Sidebar nav, single-column dashboard, standard data table. Low risk, low ceiling. Best for: users who already know the product.
>
> **Option 2 — Modern SaaS.** Sidebar + command palette, KPI cards with sparklines, faceted filters, drill-down side panels. Medium effort, high ceiling. Best for: power users who run the dashboard daily.
>
> **Option 3 — Premium executive view.** Master-detail layout, real-time updates, AI-summary banner per metric. High effort, requires design polish. Best for: a leadership audience.

Now you're not picking between "good" and "bad." You're picking between **three legitimate products** with different audiences. That's the work of a designer, not an autocomplete.

## The standard three-direction frame

Use these labels until you have your own:

1. **Safe and familiar** — minimal departure from current patterns
2. **Modern SaaS / dashboard** — pattern-matched to current best-in-class apps
3. **Premium / power-user / advanced** — high ceiling, more components, more polish

For each, demand:
- What changes
- Why it helps users
- What components/patterns it uses
- Implementation difficulty (low / medium / high)
- Risks or tradeoffs

## When to break the rule

- **Tiny changes.** "Rename this button" doesn't need 3 options.
- **Pure bug fixes.** Don't ask for 3 ways to fix the same bug.
- **Production fires.** "Site is down" is not a design exercise.

For everything else — every layout decision, every navigation question, every "this feels off" — three options.

## The deeper reason

When you pick option 2 of 3, you implicitly understand why you didn't pick 1 or 3. That understanding is the vocabulary of UI/UX. You're not just shipping a product — you're learning the craft.

That's the 100x.
