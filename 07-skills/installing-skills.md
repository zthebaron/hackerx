# Installing the UI Pattern Picker skill

Two install locations — pick one.

## Project-scoped install (recommended)

Installs the skill into a single repo. Your team gets it when they pull.

```bash
cd ~/path/to/your/project
mkdir -p .claude/skills/ui-pattern-picker
cp "/path/to/Vibe Coder 100x/07-skills/ui-pattern-picker/SKILL.md" .claude/skills/ui-pattern-picker/SKILL.md
```

Commit it:

```bash
git add .claude/skills/ui-pattern-picker/SKILL.md
git commit -m "Add ui-pattern-picker Claude skill"
```

## Personal / global install

Installs the skill at your user level. Available in any Claude Code session you run.

```bash
mkdir -p ~/.claude/skills/ui-pattern-picker
cp "/path/to/Vibe Coder 100x/07-skills/ui-pattern-picker/SKILL.md" ~/.claude/skills/ui-pattern-picker/SKILL.md
```

## Verifying it loaded

Open Claude Code in the project (or anywhere, if you installed globally). At the start of a session, the available-skills list should include `ui-pattern-picker`.

In a session, type:

```
/ui-pattern-picker
```

…and Claude should follow the skill's instructions on the next ambiguous UI request.

## Triggering the skill

Once installed, you don't have to invoke it manually. The skill description is matched against the user's request. When you say something like:

> "this dashboard feels cluttered"

…Claude should activate the skill automatically. If it doesn't, you can force it:

> "Use the ui-pattern-picker skill on this request."

## Customizing for your team

The shipped skill is a starting point. Edit `SKILL.md` to:

- Add product-specific mappings (your domain's vague requests → your domain's named patterns).
- Reference your repo's component paths in the "Components to reuse" output.
- Bias the recommendation toward your product's user base (power-user vs. casual).

The skill is a markdown file. Edit fearlessly.
