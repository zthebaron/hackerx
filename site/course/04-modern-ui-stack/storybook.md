# Storybook

A frontend workshop for building UI components and pages in isolation. The single best tool for catching empty/loading/error/long-content states before they ship.

## Why teams use it

- Develop components without running the whole app.
- See every state of a component at once: default, loading, empty, error, mobile, long content.
- Document for designers and PMs.
- Visual regression testing.
- Interaction testing (Storybook + Vitest, Playwright).
- Accessibility testing (a11y addon catches many issues).

## When to use it

- A team big enough that components are shared.
- A design system that needs documentation.
- A QA budget for state-completeness.
- Anywhere "it works on my machine, with my data" has burned you.

## When to skip it

- A solo project moving very fast.
- A pure marketing site with little component reuse.

## The Storybook prompt

```
Create Storybook stories for the new components.

For each component, include:
- Default state
- Loading state (skeleton)
- Empty state
- Error state
- Mobile viewport (use the viewport addon)
- Long-content state (truncation, wrapping, overflow)
- Disabled state if applicable
- Hover and focus states (use the interactions addon)

Run the a11y addon and fix any violations before marking done.
```

## State coverage as a discipline

The dirty secret of UI: most bugs are in the *non-default* states. Empty states, error states, long names, no images, slow networks. Storybook turns "I'll handle that later" into a real artifact you have to write.

The rule on this team should be: **a component without stories for empty / loading / error is not complete.**
