# Vercel AI Elements

A component library built on shadcn/ui for AI-native applications. Components for prompt input, streaming responses, tool-call display, message actions, citations, and the rest of the chat-UI surface.

## What's in it

- **Prompt input** — autosizing textarea with submit
- **Conversation** — message list with proper spacing and alignment
- **Message** — assistant/user message bubble with avatar and metadata
- **Streaming response** — render-as-it-arrives text
- **Tool call display** — show what tools the model is using, with status
- **Reasoning display** — show extended-thinking output (collapsed by default)
- **Citations** — link back to sources with hover previews
- **Code block** — syntax-highlighted with copy
- **Empty state** — for "no conversation yet"
- **Loading / streaming / error states** — properly handled

Built on `ai-sdk` for streaming, status states, and type safety.

## When to use it

- Building an AI assistant interface.
- Adding a chat panel to an existing dashboard.
- Adding "ask this page" features.

## When to skip it

- You already have a chat UI and the Vercel AI Elements would be a regression.
- A non-chat AI feature (e.g., AI summaries inline in cards) — those don't need a chat surface.

## The AI Elements prompt

```
Add an AI assistant panel using AI-native UI patterns.

Components:
- Prompt input (autosizing, submit on Enter, shift-Enter for newline)
- Streaming response area
- Tool call display (show which tools, status: pending/running/done)
- Reasoning display (collapsed by default)
- Message actions (copy, regenerate, thumbs up/down)
- Citations with hover previews
- Empty state (suggest 3 example prompts)
- Loading state during initial connect
- Error state with retry

Use Vercel AI Elements where they fit. Use ai-sdk for streaming.
Place the assistant in a right-side drawer that can be toggled open/closed and
persists state across pages.
```

## A note on AI UI

AI surfaces have a distinct UX vocabulary that traditional UI guides don't cover:

- **Tool call timeline** — show the user *what the model is doing* as it does it.
- **Confidence display** — show how certain the model is (when applicable).
- **Source display** — every claim should be traceable.
- **Human approval step** — for any action that touches the world.
- **Prompt history** — let users go back to previous turns.
- **Model selector** — when multiple models are available.

These map to the AI Add-Ons in [06-add-ons/ai.md](../06-add-ons/ai.md).
