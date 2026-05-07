---
name: ui-pattern-picker
description: Helps choose the right UI/UX pattern when the user describes a vague design need. Triggers on phrases like "make this easier to navigate," "hide advanced settings," "make this dashboard better," "add menus," "make this feel more professional," or "I don't know what component I need."
---

# UI Pattern Picker

When the user describes a vague UI/UX need, do not jump to code. Translate the vague need into named UI patterns, propose options, and only build after they've picked.

## When this skill activates

The user says things like:

- "make this easier to navigate"
- "hide advanced settings"
- "make this dashboard better"
- "add menus"
- "add accordions"
- "make this feel more professional"
- "I don't know what component I need"
- "this feels cluttered"
- "users can't find anything"
- "too many buttons"

## What this skill does

1. **Diagnose the user goal.** What is the user actually trying to accomplish?
2. **Map the vague request to real UI/UX patterns.** Use the mapping table below.
3. **Offer 3 options.** Force differentiation with safe / modern / power-user variants.
4. **Explain tradeoffs.** What changes, why it helps, components used, difficulty, risks.
5. **Recommend one.** Pick the one that fits this product's audience and stack.
6. **Ask for approval before coding** unless the user already explicitly asked to implement.

## Common mappings

| User says | Likely patterns |
|---|---|
| "too cluttered" | accordion, tabs, progressive disclosure, drawer / sheet |
| "hard to move around" | sidebar, breadcrumbs, command palette, grouped nav |
| "too many actions" | dropdown menu, toolbar, context menu, command palette |
| "hard to compare data" | split-pane, master-detail, data table with pinned columns, chart cards |
| "hard to filter" | faceted filters, filter drawer, saved views, date range with presets |
| "needs to feel modern" | dashboard shell (sidebar + topbar), card grid, type hierarchy, responsive |
| "needs AI" | assistant drawer, prompt input, streaming response, citations, tool-call timeline |
| "users get lost" | breadcrumbs, page titles, recently viewed, command palette |
| "too dense" | progressive disclosure, accordion, drawer for details, density toggle |
| "looks like a prototype" | spacing audit, type hierarchy, card structure, button placement, contrast |
| "feels slow" | skeleton loaders, optimistic updates, route prefetching |
| "I want power features" | command palette, keyboard shortcuts, bulk actions, saved views, inline edit |

## Required output structure

When this skill activates, structure the response as:

```
## Diagnosis
[1-2 sentences. What is the user actually trying to solve?]

## Pattern options

### Option 1 — [name] (Safe)
- What changes:
- Why it helps:
- Components used:
- Difficulty: low / medium / high
- Risks:

### Option 2 — [name] (Modern SaaS)
[same shape]

### Option 3 — [name] (Power-user)
[same shape]

## Recommendation
[Which option, and why for this specific product/audience.]

## Components to reuse
[Specific paths in this repo.]

## One question for you
[Only the most important blocker. Skip if there isn't one.]
```

## What this skill must NOT do

- Do not start coding. Code only after the user picks an option.
- Do not propose only one pattern. Always 3+.
- Do not invent components when the repo has them. Always check first.
- Do not skip the recommendation. Picking is the value.

## When the user has already picked

If the user's request is "implement option 2 from the previous response" or similarly explicit, skip the 3 options and go straight to:

1. Implementation plan (files to modify, components to extend, components to create)
2. Implement in small commits
3. Verify (typecheck, lint, responsive review, accessibility review)
4. Report what changed and what was verified

## Examples

### Example 1
User: "this settings page feels cluttered"

Response:
- Diagnose: too many fields visible at once, no visual grouping.
- Options: (1) Accordion sections by category. (2) Tabs for major areas + accordion within. (3) Right-side drawer for advanced fields.
- Recommend option 1 if users hit all fields equally; option 2 if they hit one tab much more than others; option 3 if "advanced" is rarely used.

### Example 2
User: "we need a way to see what changed"

Response:
- Diagnose: users want a history of changes for trust and debugging.
- Options: (1) Activity feed in a side panel (lightweight). (2) Audit log on a dedicated page (heavier, exportable, filterable). (3) Per-record version history (most granular).
- Recommend option 1 for most products; option 2 if compliance is involved; option 3 if records are document-like.

### Example 3
User: "the table feels weak"

Response:
- Diagnose: missing power-user features for data work.
- Options: (1) Lightweight upgrade — sorting, filtering, row actions. (2) Full data grid — saved views, bulk actions, column visibility, density. (3) Dual mode — table + kanban view switcher.
- Recommend option 2 for most teams; option 1 if usage is occasional; option 3 if items have a strong status pipeline.
