/**
 * Shared request guard for the paid-API proxy routes (/api/chat, /api/tts, /api/transcribe).
 *
 * Two layers, deliberately cheap and dependency-free:
 *
 *   1. Origin allowlist — browsers always send `Origin` on POST, so the site's own
 *      fetches pass and naive scripted abuse (curl with no Origin) is rejected.
 *      An attacker can spoof the header; this is a speed bump, not the control.
 *   2. Per-IP sliding-window rate limit — the actual ceiling on cost.
 *
 * LIMITATION: the rate-limit counters live in module scope, so they are per warm
 * function instance, not global. Fluid Compute reuses instances, which makes this
 * effective against a single abusive client but not against a distributed one.
 * The durable layer is a Vercel Firewall rate-limit rule on /api/* plus hard spend
 * caps in the Anthropic and ElevenLabs dashboards — see site/.env.example.
 */

export interface RateLimitRule {
  /** Max requests allowed per IP inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

const WINDOW_5_MIN = 5 * 60 * 1000;

/** Per-route budgets, tuned to upstream cost: STT is priciest, TTS cheapest. */
export const LIMITS: Record<'chat' | 'tts' | 'transcribe', RateLimitRule> = {
  chat: { limit: 20, windowMs: WINDOW_5_MIN },
  tts: { limit: 30, windowMs: WINDOW_5_MIN },
  transcribe: { limit: 10, windowMs: WINDOW_5_MIN },
};

/** bucket key (`route:ip`) → hit timestamps inside the current window. */
const hits = new Map<string, number[]>();
/** Cap on tracked buckets so a spray of spoofed IPs can't grow the map unbounded. */
const MAX_BUCKETS = 5000;

function allowedOrigins(): string[] {
  const configured = import.meta.env.ALLOWED_ORIGINS;
  if (typeof configured === 'string' && configured.trim()) {
    return configured
      .split(',')
      .map((o: string) => o.trim().replace(/\/$/, ''))
      .filter(Boolean);
  }
  const site = import.meta.env.SITE_URL ?? 'https://hackerx.app';
  const origins = ['http://localhost:4321', 'http://127.0.0.1:4321'];
  try {
    origins.push(new URL(site).origin);
  } catch {
    origins.push('https://hackerx.app');
  }
  return origins;
}

function originAllowed(request: Request): boolean {
  const origin = request.headers.get('origin');
  // Browsers send Origin on every POST, including same-origin ones. A missing
  // Origin means the caller is not the site — reject.
  if (!origin) return false;

  const normalized = origin.replace(/\/$/, '');
  if (allowedOrigins().includes(normalized)) return true;

  // Vercel preview deployments for this project.
  try {
    const host = new URL(origin).hostname;
    return host.endsWith('.vercel.app') && host.includes('hackerx');
  } catch {
    return false;
  }
}

/** Best-effort client IP. On Vercel, x-forwarded-for's first entry is the real client. */
export function clientIp(request: Request, fallback?: string): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') ?? fallback ?? 'unknown';
}

/**
 * Records a hit and reports whether the caller is still inside its budget.
 * Returns the seconds to wait when the budget is exhausted.
 */
export function rateLimit(key: string, rule: RateLimitRule): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const cutoff = now - rule.windowMs;

  if (hits.size > MAX_BUCKETS) hits.clear();

  const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);
  if (recent.length >= rule.limit) {
    const oldest = recent[0] ?? now;
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.max(1, Math.ceil((oldest + rule.windowMs - now) / 1000)) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true, retryAfter: 0 };
}

function json(body: object, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

/**
 * Runs both guard layers. Returns a Response to send back when the request is
 * refused, or null when it should proceed.
 */
export function guard(
  request: Request,
  route: keyof typeof LIMITS,
  fallbackIp?: string
): Response | null {
  if (!originAllowed(request)) {
    return json({ error: 'forbidden_origin' }, 403);
  }

  const { ok, retryAfter } = rateLimit(`${route}:${clientIp(request, fallbackIp)}`, LIMITS[route]);
  if (!ok) {
    return json({ error: 'rate_limited', retryAfter }, 429, { 'Retry-After': String(retryAfter) });
  }

  return null;
}
