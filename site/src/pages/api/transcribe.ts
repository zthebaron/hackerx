/**
 * POST /api/transcribe — speech-to-text via ElevenLabs Scribe.
 *
 * Accepts multipart/form-data with field `audio` (or any audio blob in `file`).
 * Returns { text: string } on success.
 *
 * Reuses API_ELEVENLABS so one key powers both TTS (/api/tts) and STT (/api/transcribe).
 * Returns 503 if API_ELEVENLABS unset; 400 on missing audio; 502 on upstream error.
 *
 * Hard limits: ~25MB body / ~3 minutes audio (Vercel function caps + ElevenLabs limits).
 */

import type { APIRoute } from 'astro';

export const prerender = false;

const STT_MODEL = 'scribe_v1';
const MAX_AUDIO_BYTES = 24 * 1024 * 1024; // 24 MB ceiling

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.API_ELEVENLABS;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'transcribe_not_configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_form' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const blob =
    (form.get('audio') as Blob | null) ??
    (form.get('file') as Blob | null);

  if (!blob || !(blob instanceof Blob) || blob.size === 0) {
    return new Response(JSON.stringify({ error: 'no_audio' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (blob.size > MAX_AUDIO_BYTES) {
    return new Response(JSON.stringify({ error: 'audio_too_large', maxBytes: MAX_AUDIO_BYTES }), {
      status: 413,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ElevenLabs accepts the same multipart shape we received, but they want the
  // field named `file` plus a `model_id` field. Repack to be explicit.
  const upstream = new FormData();
  upstream.set('file', blob, 'audio.webm');
  upstream.set('model_id', STT_MODEL);

  const optionalLanguage = form.get('language');
  if (typeof optionalLanguage === 'string' && optionalLanguage.length === 2) {
    upstream.set('language_code', optionalLanguage);
  }

  let res: Response;
  try {
    res = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: { 'xi-api-key': apiKey },
      body: upstream,
    });
  } catch (err) {
    console.error('transcribe upstream fetch failed', err);
    return new Response(JSON.stringify({ error: 'upstream_unreachable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('transcribe upstream', res.status, detail);
    return new Response(JSON.stringify({ error: 'upstream_error', status: res.status }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let data: { text?: unknown; language_code?: unknown };
  try {
    data = await res.json();
  } catch (err) {
    console.error('transcribe parse', err);
    return new Response(JSON.stringify({ error: 'invalid_upstream_json' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = typeof data.text === 'string' ? data.text.trim() : '';
  return new Response(
    JSON.stringify({
      text,
      language: typeof data.language_code === 'string' ? data.language_code : undefined,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    }
  );
};
