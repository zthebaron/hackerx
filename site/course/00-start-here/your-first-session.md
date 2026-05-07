# Your first session (10 minutes)

Don't read the rest of the course yet. Do this first. It will make everything that follows make sense.

## Step 1 — Pick a real screen (1 min)

Open your real product. Pick **one screen** that bothers you. A dashboard. A settings page. A form. Anything you've thought "this could be better" about.

Don't pick a hypothetical screen. Pick a real one.

## Step 2 — Open Claude Code in the repo (1 min)

```bash
cd ~/your-real-project
claude
```

## Step 3 — Paste this prompt (5 min for Claude to think)

```
You are my senior product designer, UX strategist, and front-end architect.

Inspect the file(s) for the [SCREEN NAME] screen in this repo. Then:

1. Diagnose the current UI: layout, navigation model, component system, user tasks.
2. Identify the top 3 problems with this screen.
3. Give me 3 design directions:
   - Safe and familiar
   - Modern SaaS/dashboard
   - Premium/power-user
4. For each, explain: what changes, why it helps, what components/patterns it uses, implementation difficulty, risks.
5. Use correct UI/UX vocabulary so I learn the names.
6. Do NOT code yet. Wait for me to pick a direction.
```

## Step 4 — Read the response carefully (3 min)

Notice what just happened:

- Claude read your actual code, not your imagination.
- It proposed **three** different directions — not one.
- It used real UI vocabulary: probably words like "split-pane," "faceted filters," "command palette," "drill-down," "skeleton loader," "drawer."
- It told you the **tradeoffs**, not just the upsides.

## Step 5 — Notice the new vocabulary

Write down 3 words from the response that you didn't fully know.

Those words are the curriculum. The rest of this course is about turning those words into reflexes.

## What you just experienced

You just did the **explore → diagnose → 3 options** loop the entire course is built around. You did it before learning anything.

The rest of the course is about making this loop *your default* — no master prompt required, because the patterns are in your head.

Now go to [01-foundations](../01-foundations/README.md).
