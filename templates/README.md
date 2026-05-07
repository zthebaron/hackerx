# Templates

Drop-in files you copy into your real project.

## Files

- [CLAUDE.md](CLAUDE.md) — paste this at the root of your real repo
- [verification-checklist.md](verification-checklist.md) — paste at the bottom of every PR description
- [pr-description.md](pr-description.md) — your default PR template

## How to use

```bash
# After cloning hackerx
cp hackerx/templates/CLAUDE.md ~/your-project/CLAUDE.md
cp hackerx/templates/verification-checklist.md ~/your-project/.github/PULL_REQUEST_TEMPLATE.md
```

Or use the CLI to drop everything in at once:

```bash
npx hackerx init
```

Edit each one to match your stack — the templates are starting points, not finished docs.
