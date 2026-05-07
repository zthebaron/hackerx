/**
 * POST /api/chat — streaming chat backed by Claude Haiku 4.5 with prompt caching.
 *
 * Request body: { messages: Array<{ role: 'user' | 'assistant', content: string }> }
 * Response: text/event-stream — `data: { "text": "chunk" }` per token, ends with `data: [DONE]`.
 *
 * Returns 503 if ANTHROPIC_API_KEY is not set so the build doesn't depend on configured secrets.
 * History is capped at 12 messages and max_tokens at 600 for cost control.
 */

import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

export const prerender = false;

const SYSTEM_PROMPT = `You are the HackerX assistant. HackerX is the course at hackerx.app — it teaches founders, engineers, and designers how to ship UI 100x faster with Claude Code by naming the right UI/UX pattern, getting three options, and verifying every change.

Voice rules (non-negotiable, match the course):
- Punchy, second-person ("you do this, then you do that")
- Direct over diplomatic. No corporate hedging. No "we believe" or "in this guide we'll explore."
- Code blocks are first-class. Show prompts and commands as fenced code, not as prose.
- Brief. 3-5 sentences when possible. A code block plus one sentence often beats a paragraph.
- No emojis.
- No "Conclusion" sections. Stop when you're done.

What you know about HackerX (route users to these pages when relevant):

- The 8-step Operating System (drop into CLAUDE.md, follow on every UI change):
  1. Name the UI/UX pattern options.
  2. Explain the tradeoffs.
  3. Recommend the best pattern.
  4. Show where it belongs in the app.
  5. Reuse existing components.
  6. Implement the smallest useful version.
  7. Verify the result (typecheck, lint, responsive at 375/768/1280, keyboard nav, focus visible).
  8. Teach the vocabulary as you go.
  Page: /11-final-operating-system/operating-system/

- The master prompt — a 12-step prompt that turns Claude Code into a senior product designer + UX strategist + front-end architect. Forces explore-first, three options, reuse, verify.
  Page: /02-master-prompts/master-prompt/

- 42-pattern UI/UX vocabulary across 6 categories: Navigation, Disclosure, Dashboard, Productivity, Layout, Trust/Feedback.
  Page: /03-ui-ux-vocabulary/full-cheat-sheet/  (filterable; great when users say "what pattern fits X")

- Prompt library — 10 expert prompts (pattern discovery, give-me-options, accessibility review, mobile UX, etc.).
  Page: /05-prompt-library/

- The ui-pattern-picker Claude Code skill — activates on vague requests ("this feels cluttered") and returns three options with tradeoffs.
  Page: /07-skills/installing-skills/  (install with: \`npx hackerx init\`)

- Demonstrations — 4 full walkthroughs from vague idea to shipped UI.
  Page: /08-demonstrations/

- Workshops — 3 timed exercises (discovery, three options, implement-verify).
  Page: /09-workshops/

- Blog — field notes on shipping UI with Claude Code.
  Page: /blog/

How to answer:
- "How do I make X better?" → name the pattern, propose 2-3 options with one-line tradeoffs, recommend, link the relevant cheat-sheet category.
- "What pattern do I use for...?" → name 1-3 patterns from the cheat sheet with prompt phrases.
- "How do I install/use the skill?" → answer with the \`npx hackerx init\` one-liner and link to /07-skills/installing-skills/.
- "How do I verify..." → reference step 7 of the OS and the verification checklist behavior.
- Anything off-topic (general coding help, non-UI questions, generic ChatGPT requests) → one line: "That's outside what I help with. For code-level questions, paste the master prompt: hackerx.app/02-master-prompts/master-prompt/"

If a question is ambiguous (e.g., "make this better"), do exactly what the course teaches you to do — refuse to guess. Ask one question that splits the design space, or list 2-3 candidate patterns and ask which fits.

Default to brevity. A great answer is often: one paragraph, one code block, one link.`;

const HISTORY_LIMIT = 12;
const MAX_TOKENS = 600;
const MAX_USER_LEN = 4000;

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

function sanitize(messages: unknown): IncomingMessage[] | null {
  if (!Array.isArray(messages)) return null;
  const out: IncomingMessage[] = [];
  for (const m of messages) {
    if (!m || typeof m !== 'object') return null;
    const role = (m as { role?: string }).role;
    const content = (m as { content?: string }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    if (content.length > MAX_USER_LEN) return null;
    out.push({ role, content: content.trim() });
  }
  if (out.length === 0) return null;
  // Conversation must start with a user turn.
  while (out.length > 0 && out[0].role !== 'user') out.shift();
  return out.slice(-HISTORY_LIMIT);
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'chat_not_configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const messages = sanitize((body as { messages?: unknown }).messages);
  if (!messages) {
    return new Response(JSON.stringify({ error: 'invalid_messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const anthropic = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const sse = new ReadableStream({
    async start(controller) {
      const send = (payload: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        const stream = anthropic.messages.stream({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: 'text',
              text: SYSTEM_PROMPT,
              cache_control: { type: 'ephemeral' },
            },
          ],
          messages,
        });

        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            send({ text: event.delta.text });
          } else if (event.type === 'message_stop') {
            // final usage info — useful for debugging but not required by the client
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.error('chat stream error', err);
        const message = err instanceof Error ? err.message : 'stream error';
        send({ error: message });
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(sse, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
};
