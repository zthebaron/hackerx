/**
 * GET /api/auth/google — Google OAuth entry stub for v2 progress tracking.
 *
 * Disabled by default. Set GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET (and supply Supabase keys)
 * to enable. Until then, returns 503 so the build doesn't depend on configured secrets.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const clientId = import.meta.env.GOOGLE_CLIENT_ID;
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;

  if (!clientId || !supabaseUrl) {
    return new Response(
      JSON.stringify({
        error: 'auth_not_configured',
        hint: 'Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY in Vercel env to enable.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Defer to Supabase Auth's own Google provider redirect once enabled.
  // Configure in Supabase: Auth → Providers → Google.
  const redirectTo = encodeURIComponent(`${url.origin}/api/auth/callback/`);
  const supabaseAuthUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;
  return redirect(supabaseAuthUrl, 302);
};
