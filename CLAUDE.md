# HackerX — Project Conventions

This is the working directory for the HackerX product (formerly Vibe Coder 100x). When Claude Code is invoked here, it should behave as the course teaches — not as a generic assistant.

The product surface is **[hackerx.app](https://hackerx.app)**. This monorepo contains:

- **Course markdown** (`00-start-here/` … `11-final-operating-system/`, `templates/`) — the canonical source of truth.
- **`site/`** — the Astro Starlight site that powers hackerx.app. Reads from `site/course/` (a build-time copy of the canonical content).
- **`cli/`** — the `hackerx` npm CLI + Claude Code plugin.
- **`scripts/sync-course-to-site.sh`** — copies the canonical course modules into `site/course/` after edits.

When you change course markdown at the repo root, also run `scripts/sync-course-to-site.sh` so the site rebuild picks up the change.

## Behavior rules

- This repo contains **course content**, not a deployable app. Do not scaffold React/Vite/Next unless explicitly asked.
- All content lives in markdown. Prefer editing existing files over creating new ones.
- Numbered folder prefixes (`00-`, `01-`, ...) are intentional — preserve them so the course stays ordered.
- Cross-link aggressively. Every module's `README.md` should link to its siblings.
- When adding a new lesson, also add it to the top-level [README.md](README.md) course map.

## Voice and tone

- Punchy, second-person ("you do this, then you do that").
- No corporate hedging. Direct over diplomatic.
- Show prompts as code blocks so they're copy-pasteable.
- Every "weak prompt" should have a "better prompt" right next to it.
- No emojis unless explicitly requested.

## Structure rules for lessons

Every lesson should answer:

1. **What's the problem this solves?** (one sentence)
2. **What's the pattern / prompt / vocabulary?** (the actual content)
3. **When do you use it?** (decision criteria)
4. **What's a weak vs. better prompt?** (concrete example)
5. **What does Claude Code verify?** (typecheck, lint, responsive, a11y, screenshot)

## Verification loop (taught in the course, applied to the course)

When you change course content:

- Check internal links resolve (`grep -r "](.*\.md)"` and verify each path).
- Keep the master prompt in [02-master-prompts/master-prompt.md](02-master-prompts/master-prompt.md) as the single source of truth — other modules quote it, they don't fork it.
- Vocabulary additions go in [03-ui-ux-vocabulary/full-cheat-sheet.md](03-ui-ux-vocabulary/full-cheat-sheet.md) first, then surface in the relevant sub-page.

## Do not

- Don't introduce new design language inside `course/` markdown. The product brand (HackerX colors, type, lockup) lives in `site/` and stays out of the lesson source.
- Don't bloat with hypothetical examples. Every example should be one a real builder would use.
- Don't write generic "what is React" intros. Assume the reader has shipped before; they're here for the language of UI.
- Don't add a "Conclusion" section at the end of every lesson. The lesson ends when the lesson ends.
