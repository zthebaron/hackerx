# What is vibe coding?

> "Vibe coding" originally meant: ship features by feel, with an AI in the loop, without rigorous specs. It's how a lot of solo founders move fast.

The trap: when "by feel" means "I don't know the right words," your AI gives you mediocre output and you accept it because you can't articulate why it's wrong.

## The vibe coding trap

You feel: *this dashboard looks crowded.*
You type: *make this dashboard cleaner.*
Claude: *adds 30% more whitespace and reorders three cards.*
You feel: *...still not it.*

You weren't asking for whitespace. You were asking for **progressive disclosure** — collapsing advanced settings, putting secondary metrics behind a drill-down, replacing a 14-column table with a master-detail layout. But you didn't have those words.

So Claude shipped the literal interpretation of "cleaner" and you got a marginal improvement.

## The 100x upgrade

Vibe coding becomes 100x leverage when your *vibe* gets translated into the **right pattern name** before any code is written.

You feel: *this dashboard looks crowded.*
You type the master prompt.
Claude: *diagnoses 4 specific UX problems, names 3 directions (progressive disclosure, master-detail layout, dense power-user view), explains tradeoffs, recommends one.*
You: *pick the master-detail layout.*
Claude: *plans the file changes, implements, runs typecheck/lint/responsive review.*

Same starting feel. 100x better destination.

## What "100x" actually means

Not "100x more code per minute." That's autocomplete.

100x means:

- **100x fewer wrong directions.** Three options before code, not one mediocre output.
- **100x less rework.** Claude verifies before claiming done.
- **100x faster vocabulary growth.** Every session teaches you 2-3 new pattern names.
- **100x more reusable artifacts.** A CLAUDE.md and a few skills compound across every future session.

The course is about installing the workflow that gets you there.

## What you stop doing

- Stop saying "make it better."
- Stop accepting the first output.
- Stop letting Claude invent components when you already have them.
- Stop skipping verification.
- Stop staying vague when there's a real word for what you want.
