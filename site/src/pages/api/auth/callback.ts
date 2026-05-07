/**
 * GET /api/auth/callback — Supabase Auth callback stub.
 *
 * Supabase exchanges the OAuth code for a session and redirects here.
 * For v1 we just return the user to the home page. v2 wires session cookies + progress.
 */

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ redirect }) => {
  return redirect('/', 302);
};
