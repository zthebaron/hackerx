# Picking your stack

You don't need every tool. Here's how to choose.

## The minimum viable stack

For 90% of new SaaS / dashboard / internal tool projects:

- **Tailwind CSS v4** — styling
- **shadcn/ui** — components (which uses Radix underneath)
- **react-hook-form + zod** — forms (shadcn includes wrappers)

That's it. Ship.

## When to add Storybook

- Your team is 3+ engineers touching the same components.
- You've been burned by missing empty/loading states more than twice.
- You have a stated design-system goal.

## When to add Vercel AI Elements

- You're building an AI assistant or chat panel.
- You're using `ai-sdk` already.

## When to add Figma Make

- Stakeholders want to see something before code.
- You're proposing major redesigns and need visual buy-in.

## When to use Radix directly (skip shadcn)

- You're building a fully custom design system.
- You want primitives without shadcn's styling defaults.
- A pattern you need isn't in shadcn yet.

## The wrong reason to add a tool

- "We want to be modern."
- "Everyone else is using it."
- "It came up in a Hacker News thread."

The right reason: a real, named pain point that this tool solves and nothing in your current stack does.

## Stack-decision prompt

When you're not sure what to add, ask Claude:

```
Audit our current stack against this project's needs.

Current stack: [list — react version, styling, component lib, forms, state, AI SDK if any].

Goal: [describe what you're trying to ship].

Recommend:
1. What in our stack is well-suited and we should lean into.
2. What's missing for this goal.
3. Whether to add: Storybook, Figma Make, AI Elements, or anything else.
4. What NOT to add (so we don't pile dependencies).

Justify each recommendation against this project's specific needs, not general advice.
```
