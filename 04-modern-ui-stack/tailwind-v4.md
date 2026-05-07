# Tailwind CSS v4

Utility-first CSS. v4 introduced a new engine, simpler setup, automatic content detection, CSS-first configuration, and faster builds.

## What changed in v4

- **CSS-first config** — `@theme` blocks in CSS instead of `tailwind.config.js`.
- **Automatic content detection** — no more glob lists.
- **New engine** — meaningfully faster builds.
- **Native CSS variables for tokens** — your design tokens are real CSS variables.

If your project is on v3, plan an upgrade — most v4 features assume the new engine.

## What it gives you

- Utility classes for spacing, color, typography, layout, responsive design, dark mode, animations.
- Design tokens in CSS variables (so you can theme without rebuilding).
- Container queries.
- The `@apply` directive when you need a reusable class.

## When to use it

- 99% of the time, for new web apps.
- Especially when you're using shadcn/ui (which assumes Tailwind).

## When NOT to use it

- A team or codebase where utility CSS is an active culture mismatch.
- Email templates (use inline styles).

## The Tailwind prompt

```
Use Tailwind CSS utility classes consistently.

Standards:
- Use our design tokens (defined in @theme) for color, spacing, typography
- Use the responsive prefixes (sm: md: lg: xl:) — not custom breakpoints
- Use semantic color tokens (primary, muted, destructive) — not raw hex
- Group utilities in a consistent order: layout → spacing → typography → color → state
- For reusable patterns, use a component, not @apply soup
- Use focus-visible: not focus: for keyboard-only focus states
```

## Common pitfalls Claude makes

- **Inline raw colors.** "bg-[#3b82f6]" instead of "bg-primary." Push back.
- **One-off arbitrary values.** "w-[127px]" instead of using the spacing scale. Push back.
- **Repeating long class strings.** If the same 8 utilities appear 20 times, extract a component.
- **Skipping responsive.** "Looks fine on desktop" — verify mobile.

## Quick wins from v4

- **Container queries.** Style based on container width, not viewport. Great for sidebar layouts where the same component renders at different widths.
- **3D transforms.** For micro-interactions and card flips.
- **Color mixing.** Native `oklch()` and `color-mix()` support.
