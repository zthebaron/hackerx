# Demo 03 — Adding an AI Assistant to an Analytics Product

**Setting:** A SaaS analytics product with rich dashboards. Users keep emailing support to ask things like "why did our conversion drop last week?" — questions the dashboard data could answer if they knew where to look.

**Stack:** Next.js, Tailwind v4, shadcn/ui, Vercel AI SDK already installed.

**What this demo shows:** Designing the AI surface *first*, then implementing the smallest useful version.

---

## Turn 1 — User asks for it the wrong way

> **User:** Add an AI chatbot.

## Turn 2 — Claude pushes back (because of the master prompt baked into CLAUDE.md)

> **Claude:** Before I build a chatbot, let me make sure that's the right shape.
>
> "Chatbot" usually means a floating bubble in the bottom-right with a chat window. That's a generic pattern. For an analytics product, there are 3 meaningfully different AI directions:
>
> ### Direction 1 — Floating chatbot (Generic)
> - Bubble in the corner, opens a chat. Context-free.
> - Pros: Familiar, easy to ship.
> - Cons: Doesn't know what the user is looking at. Users have to re-explain context. Becomes a glorified search box.
>
> ### Direction 2 — Right-side context-aware drawer (Recommended)
> - Drawer that toggles open. Knows the current page, current filters, currently visible data.
> - Empty state: 3 example prompts derived from what's on screen ("Why is conversion down? / Summarize this view / What changed week-over-week?").
> - Streaming response with citations and tool-call timeline.
> - Components: Vercel AI Elements (`PromptInput`, `Conversation`, `Message`, `ToolCall`, `Citation`).
> - Pros: Genuinely useful — the assistant can answer "why" questions because it sees the data.
> - Cons: Requires plumbing the page context into the prompt. ~3 days of work.
>
> ### Direction 3 — Inline AI everywhere (Premium)
> - Direction 2 + inline AI affordances on every chart and KPI ("Explain this metric" / "Why is this trending?").
> - Auto-summary banner at the top of every dashboard with the day's takeaways.
> - Pros: Highest perceived value. AI feels woven into the product.
> - Cons: ~2 weeks. Easy to over-promise. Auto-summary banner has to be very good or it becomes noise.
>
> ### Recommendation
>
> Direction 2 first. Direction 3 is a 90-day sequel after you see what users actually ask in direction 2.
>
> ### One question
>
> Does your analytics data have an existing query layer with named queries, or do you generate SQL on the fly? This determines whether the AI can use a "tool" to query data (named queries) or has to be more constrained (no SQL gen on the fly — security risk).

## Turn 3 — User answers and picks

> **User:** We have a query layer with named queries. Direction 2. Plan it.

## Turn 4 — Claude plans

> **Claude:**
>
> ### Implementation plan
>
> **The AI surface (~6 components):**
>
> - `components/ai/AssistantDrawer.tsx` — toggleable, persists open/closed state and conversation across pages.
> - `components/ai/ConversationView.tsx` — message list using AI Elements.
> - `components/ai/PromptInput.tsx` — autosizing textarea, submit on Enter.
> - `components/ai/ToolCallTimeline.tsx` — shows which named queries the model is running, with status (pending/running/done).
> - `components/ai/Citation.tsx` — link back to the data row that informed the answer, with hover preview.
> - `components/ai/EmptyState.tsx` — 3 dynamic example prompts based on `useContext(PageContext)`.
>
> **Page context plumbing:**
>
> - `lib/ai/PageContext.tsx` — provider that exposes `{ route, filters, visibleData }` to the assistant.
> - Wrap the dashboard route with `<PageContextProvider>` and emit context updates as the user filters.
>
> **Backend route:**
>
> - `app/api/ai/chat/route.ts` — streams responses using `ai-sdk`'s `streamText`. Tools: a `runNamedQuery` tool exposed to the model, which calls your existing query layer. The model cannot generate raw SQL.
>
> **Persistence:**
>
> - Conversation persists in `localStorage` (per-user, per-workspace). Server-side persistence is a follow-up.
>
> **Required states:**
>
> - Empty state with 3 dynamic example prompts.
> - Streaming state with proper announcement (`aria-live="polite"`).
> - Error state with retry.
> - "AI couldn't answer" state — when the tool returns no data, suggest reformulating.
> - Tool-running indicator while named queries are executing.
>
> **Approval step:**
>
> Direction 2 doesn't take actions; it only answers questions. So no approval flow is needed yet. (When you add direction 3 — "create a saved view based on this conversation" — we'll add an approval step.)
>
> **Verification:**
>
> - typecheck + lint
> - Streaming works on slow networks (test throttled at "Slow 3G")
> - Esc closes the drawer, focus returns to trigger
> - Tab cycles: trigger → drawer content → input
> - Screen reader: streaming responses announced via `aria-live="polite"`
> - Mobile (<768px): drawer becomes full-screen modal
>
> ### One question
>
> Should the assistant be available on every page, or only on dashboard pages? My recommendation: every page, but the empty state's example prompts adapt to the page type (dashboard prompts on dashboards, record prompts on individual records).

## Turn 5 — User picks every page

> **User:** Every page. Build the smallest version that works on the dashboard route. We'll expand later.

## Turn 6 — Claude implements

> **Claude:** Implementing in 6 commits.
>
> Commit 1: `PageContextProvider` and route wrapper.
> Commit 2: `AssistantDrawer` shell + toggle button in the top bar.
> Commit 3: `PromptInput` + `ConversationView` using Vercel AI Elements.
> Commit 4: `app/api/ai/chat/route.ts` with `streamText` and the `runNamedQuery` tool.
> Commit 5: `ToolCallTimeline` + `Citation` (cards-with-hover) wired to the streamed events.
> Commit 6: Dynamic `EmptyState` (reads `PageContext`, generates 3 prompts).
>
> Verifying:
>
> - typecheck: ✅
> - lint: ✅
> - Streaming verified at "Slow 3G" — text streams smoothly, tool-call timeline updates as queries run ✅
> - Esc closes drawer, focus returns to trigger button ✅
> - `aria-live="polite"` on the streaming response container — VoiceOver announces incrementally ✅
> - Mobile 375px: drawer becomes full-screen modal ✅
> - Empty state on dashboard route shows: ("Summarize this dashboard", "Why is [top KPI] trending [direction]?", "Compare this period vs. last period") — all generated from `PageContext` ✅
> - Citation hover card previews the source data row ✅
>
> Known gaps for follow-up:
>
> 1. Server-side conversation persistence (currently localStorage).
> 2. The empty state on non-dashboard pages still uses dashboard prompts — needs per-route prompt templates. I left a `// TODO` flagging this.
> 3. No per-message thumbs up/down feedback yet.

---

## What this demo illustrates

- **Pushback before code.** "Add a chatbot" was the wrong scope. Claude proposed three meaningfully different AI surfaces and the user picked the one that actually solves the problem.
- **Tools, not free-form SQL.** The AI uses *named queries* through a tool, not generated SQL. That's a security and accuracy decision baked into the design.
- **The smallest useful version.** Direction 2 minimum implementation, with direction 3 (inline AI everywhere) explicitly punted to a later sprint.
- **Explicit residual gaps.** Persistence, per-route prompts, feedback — Claude flagged them rather than pretending they were done.
