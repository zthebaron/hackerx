# AI Add-Ons

Use these when the app can guide, summarize, or automate.

## The menu

- AI assistant drawer
- Ask-this-page chat
- Explain this metric
- Summarize selected rows
- Generate report
- Recommend next action
- Natural language filters
- AI search
- Prompt history
- AI-generated chart insight
- Tool call timeline
- Confidence or source display
- Human approval step

## The prompt

```
Add an AI assistant experience to this dashboard.

The assistant should:
- Understand the current page context (route, visible data, current filters)
- Summarize visible data on demand ("summarize this view")
- Explain a metric in plain language ("why did revenue drop?")
- Suggest next actions tied to what's on screen
- Let users ask follow-up questions in a conversation
- Show its work via a tool-call timeline (which queries it ran, which sources it used)
- Cite sources for any claim, with hover preview
- Require human approval before taking an action that touches the world

UI requirements:
- Right-side drawer that toggles open/closed
- Persists across pages (assistant remembers context within a session)
- Empty state with 3 example prompts based on the current page
- Streaming response area with proper status indication
- Message actions: copy, regenerate, thumbs up/down

Use Vercel AI Elements where they fit. Use ai-sdk for streaming.

Design the UI first, then implement the smallest useful version. Verify
streaming works on slow connections (test with throttled network).
```

## The dual-mode assistant pattern

Most great AI surfaces have two modes:

1. **Inline AI.** Subtle, embedded in the existing UI. "Explain this metric" links on KPIs. Auto-summary banners. Smart defaults.
2. **Conversational AI.** A chat panel where the user can dig deeper.

The inline version is the daily driver. The chat version is the escape hatch.

## What "human approval step" means

Anytime the AI is about to *do* something — send an email, run a refund, change a setting — show what it's about to do and require explicit approval.

Pattern:

```
"I'm about to [send this email / refund $X / publish this draft]. Continue? [Approve] [Cancel]"
```

This is a security pattern as much as a UX one. The AI should never act on its own interpretation of the user's intent without confirmation for non-trivial actions.

## When NOT to add AI

- Your data isn't worth summarizing (dashboards with 3 metrics).
- Users explicitly don't want it (regulated industries, audit trails).
- You can't ground the AI in reliable data (it'll hallucinate).

If your data is messy or sparse, fix that first. AI on bad data multiplies the problem.
