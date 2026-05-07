# Figma Make

Figma's AI prototyping surface. Take a design or a prompt and get an interactive prototype. Useful for proposing 3 directions visually before any code is written.

## What it does

- Generate functional prototypes from a prompt.
- Refine appearance and styling.
- Apply a Figma library's styling context to keep prototypes on-brand.
- Edit AI outputs and iterate.
- Connect to Supabase for real-data app prototypes.

## When to use it

- Before writing code, when you want to see 3 directions visually.
- Stakeholder reviews where code is too low-resolution.
- Exploring patterns you don't have in your component library yet.

## When to skip it

- You already know the pattern and just need to ship it.
- The pattern is trivial (a single button, a renamed label).

## The Figma Make prompt

```
Create 3 prototype directions for this dashboard:

1. Minimal — clean, low data density, focused on a single primary action
2. Premium SaaS — KPI cards, faceted filters, drill-down side panel, command palette
3. Power-user analytics — dense data table with saved views, multiple chart cards, custom layouts

For each, focus on:
- Navigation model
- Data density (how much fits on screen)
- Interaction flow (what tasks the user can accomplish without clicking through)

Apply our Figma library styling context where available.
```

## How this fits the workflow

```
Figma Make (3 visual directions)
         ↓
You pick one
         ↓
Claude Code (master prompt with the chosen direction as constraint)
         ↓
shadcn/ui + Radix + Tailwind implementation
         ↓
Storybook for state coverage
         ↓
Verification loop
```

You don't need Figma Make. But if you have it, the visual round-trip dramatically improves stakeholder buy-in before code lands.
