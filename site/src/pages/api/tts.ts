/**
 * POST /api/tts — proxy to ElevenLabs text-to-speech, returning audio/mpeg.
 *
 * Body: { text: string, voice?: string }
 * Env:
 *   API_ELEVENLABS         (required) — ElevenLabs API key
 *   ELEVENLABS_VOICE_ID    (optional) — override the default voice ID. If unset,
 *                                       resolves "Emily" via the voices list.
 *
 * Returns 503 if API_ELEVENLABS is unset, 400 on invalid body, 502 on upstream error.
 */

import type { APIRoute } from 'astro';
import { guard } from '../../lib/guard';

export const prerender = false;

const MAX_TEXT_LEN = 1500;
const DEFAULT_VOICE_NAME = 'Lucy';
const DEFAULT_MODEL = 'eleven_turbo_v2_5';

let cachedVoiceId: string | null = null;
let cachedVoiceLookupAt = 0;
const VOICE_CACHE_MS = 60 * 60 * 1000;

interface ElevenVoice {
  voice_id: string;
  name: string;
  category?: string;
}

// Fallback voice IDs from ElevenLabs' standard library, used if neither the user's
// personal voices nor the shared library returns a hit. Update if ElevenLabs renames.
const KNOWN_VOICES: Record<string, string> = {
  lucy: 'lcMyyd2HUfFzxdCaC4Ta',
  emily: 'LcfcDJNUP1GQjkzn1xUU',
  rachel: '21m00Tcm4TlvDq8ikWAM',
  bella: 'EXAVITQu4vr4xnSDxMaL',
  antoni: 'ErXwobaYiN019PkySvjV',
  elli: 'MF3mGyEYCl7XYWbV9V6O',
  adam: 'pNInz6obpgDQGcFmaJgB',
  arnold: 'VR6AewLTigWG4xSOukaG',
  domi: 'AZnzlk1XvdvUeBnXmlld',
  josh: 'TxGEqnHWrfWFTfGW9XjX',
  sam: 'yoZ06aMxZJJ28mfd3POQ',
};

async function resolveVoiceId(apiKey: string, requested?: string): Promise<string | null> {
  if (requested && /^[A-Za-z0-9]{12,}$/.test(requested)) {
    return requested;
  }

  const targetName = (requested || DEFAULT_VOICE_NAME).toLowerCase();

  // 1. Explicit override via env var wins for the default voice.
  const fromEnv = import.meta.env.ELEVENLABS_VOICE_ID;
  if (fromEnv && targetName === DEFAULT_VOICE_NAME.toLowerCase()) {
    return fromEnv;
  }

  // 2. Hardcoded KNOWN_VOICES wins next — this lets us pin a specific voice ID by
  //    name even when the same name exists in the user's personal library with a
  //    different ID (e.g. cloned voices that happen to share a name).
  const known = KNOWN_VOICES[targetName];
  if (known) {
    if (targetName === DEFAULT_VOICE_NAME.toLowerCase()) {
      cachedVoiceId = known;
      cachedVoiceLookupAt = Date.now();
    }
    return known;
  }

  if (cachedVoiceId && targetName === DEFAULT_VOICE_NAME.toLowerCase() && Date.now() - cachedVoiceLookupAt < VOICE_CACHE_MS) {
    return cachedVoiceId;
  }

  // 3. Try the user's personal voice library.
  try {
    const res = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': apiKey, Accept: 'application/json' },
    });
    if (res.ok) {
      const data = (await res.json()) as { voices?: ElevenVoice[] };
      const match = (data.voices ?? []).find((v) => v.name.toLowerCase() === targetName);
      if (match) {
        if (targetName === DEFAULT_VOICE_NAME.toLowerCase()) {
          cachedVoiceId = match.voice_id;
          cachedVoiceLookupAt = Date.now();
        }
        return match.voice_id;
      }
    }
  } catch (err) {
    console.error('personal voices lookup failed', err);
  }

  // 4. Last resort: shared (public) voice library.
  try {
    const url = new URL('https://api.elevenlabs.io/v1/shared-voices');
    url.searchParams.set('search', targetName);
    url.searchParams.set('page_size', '20');
    const res = await fetch(url.toString(), {
      headers: { 'xi-api-key': apiKey, Accept: 'application/json' },
    });
    if (res.ok) {
      const data = (await res.json()) as { voices?: ElevenVoice[] };
      const match = (data.voices ?? []).find((v) => v.name.toLowerCase() === targetName);
      if (match) {
        if (targetName === DEFAULT_VOICE_NAME.toLowerCase()) {
          cachedVoiceId = match.voice_id;
          cachedVoiceLookupAt = Date.now();
        }
        return match.voice_id;
      }
    }
  } catch (err) {
    console.error('shared voices lookup failed', err);
  }

  return null;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const refused = guard(request, 'tts', clientAddress);
  if (refused) return refused;

  const apiKey = import.meta.env.API_ELEVENLABS;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'tts_not_configured' }), {
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

  const text = typeof (body as { text?: unknown }).text === 'string' ? ((body as { text: string }).text as string).trim() : '';
  const voice = typeof (body as { voice?: unknown }).voice === 'string' ? ((body as { voice: string }).voice as string).trim() : undefined;

  if (!text) {
    return new Response(JSON.stringify({ error: 'invalid_text' }), { status: 400 });
  }

  // Strip markdown fences and links so the spoken voice doesn't read code/URLs aloud.
  const spoken = text
    .replace(/```[\s\S]*?```/g, ' code block omitted ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TEXT_LEN);

  if (!spoken) {
    return new Response(JSON.stringify({ error: 'empty_after_strip' }), { status: 400 });
  }

  const voiceId = await resolveVoiceId(apiKey, voice);
  if (!voiceId) {
    return new Response(JSON.stringify({ error: 'voice_not_found', hint: `No ElevenLabs voice named "${voice ?? DEFAULT_VOICE_NAME}" found. Set ELEVENLABS_VOICE_ID env var to override.` }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: spoken,
      model_id: DEFAULT_MODEL,
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.75,
        style: 0.15,
        use_speaker_boost: true,
      },
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    console.error('elevenlabs upstream', upstream.status, detail);
    return new Response(JSON.stringify({ error: 'upstream_error', status: upstream.status }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=300',
      'X-Voice-Id': voiceId,
    },
  });
};
