import { useCallback, useRef, useState } from 'react';

let sharedCtx: AudioContext | null = null;

// C major pentatonic across two octaves: C4 D4 E4 G4 A4 C5 D5 E5 G5 A5
const PENTATONIC = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3, 784.0, 880.0];

function rowFreq(row: number): number {
  const base = PENTATONIC[row % PENTATONIC.length];
  // ±2% random detune so repeated taps on the same row never feel identical
  return base * (1 + (Math.random() - 0.5) * 0.04);
}

async function getReadyCtx(): Promise<AudioContext> {
  if (!sharedCtx) sharedCtx = new AudioContext();
  if (sharedCtx.state !== 'running') await sharedCtx.resume();
  return sharedCtx;
}

/* ── Texture 0: Silicone pop ── */

function scheduleSiliconePress(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  const bufLen = Math.ceil(ctx.sampleRate * 0.14);
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 900;
  lp.Q.value = 3.5;

  const noiseEnv = ctx.createGain();
  noiseEnv.gain.setValueAtTime(0.85, t);
  noiseEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

  noise.connect(lp);
  lp.connect(noiseEnv);
  noiseEnv.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.14);

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 0.6, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.14, t + 0.09);

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0.65, t);
  oscEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.10);
}

function scheduleSiliconeRelease(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  const bufLen = Math.ceil(ctx.sampleRate * 0.14);
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1800;
  bp.Q.value = 2.5;

  const noiseEnv = ctx.createGain();
  noiseEnv.gain.setValueAtTime(0.75, t);
  noiseEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.085);

  noise.connect(bp);
  bp.connect(noiseEnv);
  noiseEnv.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.14);

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 0.84, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.21, t + 0.09);

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0.50, t);
  oscEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.10);
}

/* ── Texture 1: Water droplet ── */

function scheduleWaterPress(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  // Short noise burst boosted around the harmonic frequency
  const bufLen = Math.ceil(ctx.sampleRate * 0.08);
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const pk = ctx.createBiquadFilter();
  pk.type = 'peaking';
  pk.frequency.value = freq * 3;
  pk.Q.value = 4;
  pk.gain.value = 12;

  const noiseEnv = ctx.createGain();
  noiseEnv.gain.setValueAtTime(0.45, t);
  noiseEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

  noise.connect(pk);
  pk.connect(noiseEnv);
  noiseEnv.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.08);

  // Rapid descending tone — droplet splat
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 2.5, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.8, t + 0.08);

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0.42, t);
  oscEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.09);
}

function scheduleWaterRelease(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  // Rising tone — bubble returning to surface
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * 0.7, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 2.2, t + 0.12);

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0.32, t);
  oscEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

/* ── Texture 2: Warm piano tone ── */

function schedulePianoPress(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  // Additive harmonics: fundamental + octave + fifth, each decaying naturally
  const harmonics = [
    { mult: 1, gain: 0.45, tc: 0.10 },
    { mult: 2, gain: 0.18, tc: 0.07 },
    { mult: 3, gain: 0.09, tc: 0.05 },
  ];

  for (const h of harmonics) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * h.mult;

    const env = ctx.createGain();
    env.gain.setValueAtTime(h.gain, t);
    env.gain.setTargetAtTime(0.001, t + 0.01, h.tc);

    osc.connect(env);
    env.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Soft key-attack noise
  const bufLen = Math.ceil(ctx.sampleRate * 0.015);
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) ch[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2000;

  const noiseEnv = ctx.createGain();
  noiseEnv.gain.setValueAtTime(0.10, t);
  noiseEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

  noise.connect(lp);
  lp.connect(noiseEnv);
  noiseEnv.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.015);
}

function schedulePianoRelease(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  // Damped — note cut short by damper
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.22, t);
  env.gain.setTargetAtTime(0.001, t, 0.035);

  osc.connect(env);
  env.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

/* ── Texture 3: Bell / chime ── */

function scheduleBellPress(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  // Inharmonic partials characteristic of bells (Chladni modes)
  const partials = [
    { mult: 1.000, gain: 0.32, tc: 0.55 },
    { mult: 2.756, gain: 0.16, tc: 0.35 },
    { mult: 5.404, gain: 0.08, tc: 0.20 },
  ];

  for (const p of partials) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * p.mult;

    const env = ctx.createGain();
    env.gain.setValueAtTime(p.gain, t);
    env.gain.setTargetAtTime(0.001, t, p.tc);

    osc.connect(env);
    env.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + p.tc * 5);
  }
}

function scheduleBellRelease(ctx: AudioContext, freq: number) {
  const t = ctx.currentTime + 0.005;

  // Gentle upper chime
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq * 2;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.16, t);
  env.gain.setTargetAtTime(0.001, t, 0.22);

  osc.connect(env);
  env.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 1.0);
}

/* ── Texture dispatch table ── */

const TEXTURES = [
  { press: scheduleSiliconePress, release: scheduleSiliconeRelease },
  { press: scheduleWaterPress,    release: scheduleWaterRelease    },
  { press: schedulePianoPress,    release: schedulePianoRelease    },
  { press: scheduleBellPress,     release: scheduleBellRelease     },
];

const STORAGE_MUTED   = 'popcalm-muted';
const STORAGE_TEXTURE = 'popcalm-texture';

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function usePopSound() {
  const [muted, setMuted] = useState(() => readStored<boolean>(STORAGE_MUTED, false));
  const [textureIndex, setTextureIndex] = useState(() => readStored<number>(STORAGE_TEXTURE, 0));

  const mutedRef   = useRef(muted);
  const textureRef = useRef(textureIndex);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    localStorage.setItem(STORAGE_MUTED, JSON.stringify(next));
  }, []);

  const advanceTexture = useCallback(() => {
    const next = (textureRef.current + 1) % TEXTURES.length;
    textureRef.current = next;
    setTextureIndex(next);
    localStorage.setItem(STORAGE_TEXTURE, JSON.stringify(next));
  }, []);

  const playPress = useCallback(async (row: number) => {
    if (mutedRef.current) return;
    try {
      const ctx = await getReadyCtx();
      TEXTURES[textureRef.current].press(ctx, rowFreq(row));
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  const playRelease = useCallback(async (row: number) => {
    if (mutedRef.current) return;
    try {
      const ctx = await getReadyCtx();
      TEXTURES[textureRef.current].release(ctx, rowFreq(row));
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  return { muted, toggleMute, playPress, playRelease, advanceTexture, textureIndex };
}
