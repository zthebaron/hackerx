# The better way to work with Claude Code

Three short prompts. Use them in order. They're the practical shape of the master prompt — broken into the three things you actually do in a session.

## 1) Don't start coding. Explore.

Do not start with:

> Make this dashboard look better.

Start with:

```
Explore the current dashboard first. Identify the layout structure, navigation
model, component system, and user tasks. Then propose 3 UI/UX improvement
directions before coding.
```

This forces the explore phase. Claude reads your actual code before suggesting anything.

## 2) Pick a direction. Get a real plan.

```
Turn direction 2 into a detailed implementation plan. Include files to modify,
components to create, dependencies to avoid, responsive behavior, accessibility
requirements, and verification steps.
```

This forces the plan phase. You get a real diff plan before any code is written.

## 3) Implement small. Verify each step.

```
Implement the plan in small commits. Reuse existing components where possible.
After each major change, run the relevant checks and tell me what changed.
```

This forces the implement-and-verify phase. You don't end up with a 700-line untestable diff.

---

## That's the whole loop

```
Explore  →  Plan  →  Implement  →  Verify
   ↑                                  ↓
   └─────────  next session  ─────────┘
```

Anthropic recommends this exact pattern. The course just wraps it in real prompts you can paste.

## Where the supporting tools come in

For repeatable team workflows, Anthropic recommends:

- **CLAUDE.md** — persistent project conventions ([template](../templates/CLAUDE.md))
- **Skills** — reusable playbooks ([ui-pattern-picker](../07-skills/ui-pattern-picker/SKILL.md))
- **MCP** — external tools like Figma or databases
- **Subagents** — isolated research without polluting main context
- **Hooks** — deterministic checks (lint/typecheck/a11y on save or commit)
- **Plugins** — packageable bundles of the above

The course covers the first two heavily. The other four are referenced where they fit.
