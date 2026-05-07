# Prompt 02 — Give Me Options

**When to use:** You know what to improve but want real alternatives, not the first idea Claude has.

```
Give me 5 UI/UX options for improving this screen.

Make them meaningfully different:
1. Minimal cleanup
2. Modern SaaS
3. Dense power-user dashboard
4. Mobile-first
5. Premium executive view

For each option:
- describe the layout
- list components used
- describe navigation
- explain tradeoffs
- estimate effort
- recommend who it is best for

Do not code yet.
```

## Why 5, not 3

Three is the minimum to force differentiation. Five is the right number when the screen is *load-bearing* in your product — a primary dashboard, a key form, the first-run experience. The extra two options are usually mobile-first and premium, both of which expose blind spots.

## What you get back

Five distinct product proposals. Each is a real product you could ship. The recommendation paragraph at the end tells you which fits your audience.

## How to read the output

- Cross out the ones whose audience isn't yours.
- For the remaining 2-3, look at "components used" — the cheaper one (more reuse, fewer new patterns) is usually the right starting point.
- Pick one. Move to implementation.
