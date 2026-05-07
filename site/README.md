# site/

The HackerX site at [hackerx.app](https://hackerx.app). Astro 6 + Starlight 0.39 + Tailwind v4.

## Local dev

```bash
pnpm install
pnpm dev          # localhost:4321
pnpm build        # static output → dist/
pnpm preview      # serve dist/
```

`pnpm dev` and `pnpm build` both run `pnpm sync` first — that copies course markdown from `../*` into `src/content/docs/` with Starlight frontmatter injected.

## How the content sync works

The course markdown lives at the repo root (`../00-start-here/`, `../01-foundations/`, etc.). The site never edits those files directly. Instead, `scripts/build-content.ts`:

1. Walks each `../<module>/`.
2. For every `.md`, derives a title from the first H1 and a description from the first paragraph.
3. Renames `README.md` → `index.md` so each module renders at `/<module>/`.
4. Rewrites cross-module links (`(../foo/README.md)` → `(/foo/)`) and same-module links.
5. Preserves existing frontmatter (e.g. `SKILL.md`).
6. Writes the result into `src/content/docs/<module>/`.

Output paths are gitignored. Source of truth = the course root.

## Custom components

- `PromptCard` — code block with copy button + line count + weak/better variants.
- `PatternTable` — filterable view over the 42 vocabulary patterns.
- `Demo` — turn-by-turn dialogue blocks for the demonstrations.
- `VerifyChecklist` — opinionated "what done means" checklist.
- `SkillInstaller` — `npx hackerx init` install card.

## API routes

- `/api/newsletter` — Resend signup. 503 if `RESEND_API_KEY` unset.
- `/api/auth/google` — Supabase + Google stub for v2 progress tracking. 503 if unset.
- `/api/auth/callback` — Supabase auth callback.

All API routes use server-rendering (`prerender = false`). Build still succeeds with no env keys set.

## Deploy

Vercel:

```bash
pnpm install -g vercel
vercel link
vercel deploy --prod
```

Set the env vars from `.env.example` in the Vercel dashboard. The site builds without any of them — they enable optional features.
