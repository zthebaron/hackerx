# hackerx

> Drop the HackerX rules and skills into any project. Open Claude Code. Watch the next vague UI request get three options instead of one.

## Install

One-shot, no install:

```bash
npx hackerx init
```

Or install globally so you can run `hackerx` anywhere:

```bash
pnpm add -g hackerx        # or: npm i -g hackerx
hackerx init
```

## What `hackerx init` does

Drops three files into the current project (skip ones that already exist; pass `--force` to overwrite):

| File | What it does |
|---|---|
| `CLAUDE.md` | Project conventions for Claude Code: explore first, three options, reuse before invent, verify before "done". |
| `.claude/skills/ui-pattern-picker/SKILL.md` | Activates on vague UI requests ("this feels cluttered") and returns three pattern options with tradeoffs. |
| `.github/PULL_REQUEST_TEMPLATE.md` | The verification checklist pasted into every PR description. |

## Other commands

```bash
hackerx audit                    # run typecheck + lint + tests; print manual review checklist
hackerx snippet                  # list bundled prompts
hackerx snippet pattern-discovery | pbcopy
                                 # pipe a specific prompt to your clipboard
hackerx --version
```

## Flags

```
hackerx init [--skill <name>] [--scope project|user] [--force]

  --skill <name>      which skill to install (default: ui-pattern-picker)
  --scope project     install into ./.claude/skills/ (default)
  --scope user        install into ~/.claude/skills/ (available in every project)
  --force             overwrite existing files
```

## Read the course

Everything this CLI ships comes from the HackerX course at [hackerx.app](https://hackerx.app). The CLI is a shortcut. The course is the depth.

## License

MIT. Built by [DBAI](https://digitalboutique.ai). Architect [Tim De Vallee](https://digitalboutique.ai).
