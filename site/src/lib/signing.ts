/**
 * HMAC signatures for assistant turns.
 *
 * The chat client keeps conversation history in sessionStorage and replays it on
 * every request, so the server cannot trust that an `assistant` turn is something
 * it actually said — a caller can fabricate one to put words in the model's mouth.
 * Each assistant turn is therefore signed when it is emitted and verified when it
 * comes back; unsigned or altered turns are dropped in /api/chat.
 *
 * Key material: CHAT_SIGNING_SECRET if set, otherwise ANTHROPIC_API_KEY (already
 * required for chat to work at all, and never leaves the server). Rotating either
 * one invalidates in-flight histories, which degrades to "loses prior context",
 * not an error.
 */

const encoder = new TextEncoder();
let cachedKey: CryptoKey | null = null;
let cachedSecret: string | null = null;

function secret(): string | null {
  const configured = import.meta.env.CHAT_SIGNING_SECRET;
  if (typeof configured === 'string' && configured.trim()) return configured.trim();
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  return typeof apiKey === 'string' && apiKey ? apiKey : null;
}

async function key(): Promise<CryptoKey | null> {
  const s = secret();
  if (!s) return null;
  if (cachedKey && cachedSecret === s) return cachedKey;
  cachedKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(s),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  cachedSecret = s;
  return cachedKey;
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Returns a hex HMAC-SHA256 of `text`, or null when no key material is configured. */
export async function sign(text: string): Promise<string | null> {
  const k = await key();
  if (!k) return null;
  return toHex(await crypto.subtle.sign('HMAC', k, encoder.encode(text)));
}

/** Constant-time-ish comparison — length-independent early exit is avoided. */
function equals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verify(text: string, signature: unknown): Promise<boolean> {
  if (typeof signature !== 'string' || !signature) return false;
  const expected = await sign(text);
  if (!expected) return false;
  return equals(expected, signature);
}
