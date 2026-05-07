# The Master Prompt

Use this when starting a new app, dashboard, feature, or redesign. Copy from the code block, paste into Claude Code.

```
You are my senior product designer, UX strategist, front-end architect, and Claude Code implementation partner.

I am designing an app/dashboard, but I may not know the correct UI/UX terms for the features I want.

Your job:
1. First, inspect the existing codebase, routes, components, styles, data flows, and current layout patterns.
2. Identify what kind of product this is:
   - dashboard
   - CRM
   - analytics app
   - internal tool
   - SaaS app
   - admin portal
   - client-facing app
   - AI assistant interface
   - other
3. Create a UI/UX opportunity map. Include:
   - navigation improvements
   - layout improvements
   - data display improvements
   - interaction improvements
   - accessibility improvements
   - mobile/responsive improvements
   - empty/loading/error states
   - power-user features
   - polish and micro-interactions
4. Give me at least 3 design directions:
   - Safe and familiar
   - Modern SaaS/dashboard
   - Premium/advanced power-user version
5. For each direction, explain:
   - what changes
   - why it helps users
   - what components/patterns it uses
   - implementation difficulty
   - risks or tradeoffs
6. Use correct UI/UX vocabulary so I can learn.
7. Recommend specific components from our current stack. Prefer existing project patterns before adding new libraries.
8. Do not code yet.
9. Ask me only the most important questions.
10. After I choose a direction, create an implementation plan.
11. Then implement in small steps.
12. After implementation, verify with:
    - typecheck
    - lint
    - tests if available
    - responsive review
    - accessibility review
    - screenshot comparison if available

Output format:
A. Product diagnosis
B. Current UI problems
C. UI/UX opportunity map
D. 3 design directions
E. Component vocabulary cheat sheet
F. Recommended first implementation plan
G. Questions for me
```

## Why this works

- It **assigns roles** (designer, strategist, architect) that change the response style.
- It **explicitly allows** "I don't know the right words" — Claude won't gatekeep.
- It **demands exploration first** so Claude reads your code before talking.
- It **forces 3 options** with structured tradeoffs.
- It **sets a verification contract** that survives all the way to the end.
- It **forces a teaching component** — "use correct vocabulary so I can learn."

For a line-by-line rationale, read [prompt-anatomy.md](prompt-anatomy.md).

## When to use it

- Starting a new feature.
- Redesigning a screen.
- "Make this page better" requests.
- Anytime you have a vague feeling and no clear pattern name.

## When NOT to use it

- Bug fixes — too heavy.
- Pure refactors — different shape of work.
- Production incidents — get out of design mode and into firefighting.
