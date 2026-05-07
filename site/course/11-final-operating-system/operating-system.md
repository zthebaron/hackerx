# The Final Operating System

Use this every time. It's the entire course in 8 steps.

---

```
Do not just implement my request literally.

First, infer the user problem behind the request.

Then:
1. Name the UI/UX pattern options.
2. Explain the tradeoffs.
3. Recommend the best pattern.
4. Show where it belongs in the app.
5. Reuse existing components.
6. Implement the smallest useful version.
7. Verify the result.
8. Teach me the vocabulary as you go.
```

---

## Why these 8 steps in this order

1. **Name the pattern options.** Without rivals, there's no real choice. Without choice, you ship the first thing.
2. **Explain the tradeoffs.** Without tradeoffs, the recommendation is just opinion. Tradeoffs make it defensible.
3. **Recommend the best pattern.** Without a recommendation, the user has to do the picking. The recommendation is the value-add.
4. **Show where it belongs.** Without placement, the pattern is abstract. Placement makes it real.
5. **Reuse existing components.** Without reuse, every feature creates parallel components. Reuse is what keeps a codebase coherent over time.
6. **Implement the smallest useful version.** Without smallness, you can't ship today. Smallness is what creates the verification loop.
7. **Verify the result.** Without verification, "done" means "compiled." Verification means "shipped."
8. **Teach me the vocabulary.** Without teaching, you don't get the compound effect. Vocabulary is what makes the next session faster.

Skip any step and you lose the property each step provides. The order matters.

---

## How to install this in your team

### In your repo's CLAUDE.md

Add the OS as a quoted block at the top:

```
# Project workflow rules

For every UI change, follow this 8-step OS:

1. Name the UI/UX pattern options.
2. Explain the tradeoffs.
3. Recommend the best pattern.
4. Show where it belongs in the app.
5. Reuse existing components.
6. Implement the smallest useful version.
7. Verify the result.
8. Teach the vocabulary as you go.

Do not skip steps. The order matters.
```

That's it. With this in CLAUDE.md, every Claude Code session in the repo follows the OS by default.

### In your prompt library

Add the OS as the prefix on every UI prompt:

```
[OS quoted here]

Now: <your specific request>
```

### In your team's onboarding doc

Make the 8 steps the first thing every new engineer reads about working with Claude Code in your stack.

---

## The single sentence version

> Don't just code my request. Diagnose, propose options, recommend, place, reuse, build small, verify, teach.

That's vibe coding done right.

That's the 100x.

That's the course.

You're done. Go ship something.
