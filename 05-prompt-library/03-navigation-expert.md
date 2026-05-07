# Prompt 03 — Navigation Expert

**When to use:** Users complain it's hard to find things. The app has grown organically.

```
Act as an information architect.

Analyze our app routes, page hierarchy, and user tasks.

Recommend the best navigation system:
- sidebar
- top nav
- tabs
- breadcrumbs
- command palette
- nested menu
- mobile nav

Create:
1. Current navigation diagnosis
2. Proposed navigation map
3. Label improvements (rename anything that's unclear)
4. Which pages should be grouped
5. Which actions should be global (always reachable)
6. Which actions should be page-specific
7. Implementation plan with files to modify

Do not code yet. Ask me only the most important question.
```

## What you get back

An IA audit, not a styling change. This is one of the highest-leverage prompts in the library because navigation issues compound — every screen inside a bad navigation system feels worse than it is.

## What to look for

- **Label improvements.** Claude often catches that "Settings" should be "Account," or that "Reports" and "Analytics" are confusingly different.
- **Grouped pages.** If you have 12 sidebar items, 4 of them probably belong in a group like "Admin" or "Workflows."
- **Global vs. page-specific actions.** "New" and "Search" should be global. Item-specific actions belong on the item.

## Common follow-up

> "Recommend keyboard shortcuts that match this navigation. Include a help modal that shows them all."
