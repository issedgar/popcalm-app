import { useState, useCallback, useRef } from 'react';

let sharedCtx: AudioContext | null = null;

async function getReadyCtx(): Promise<AudioContext> {
  if (!sharedCtx) {
    sharedCtx = new AudioContext();
  }
  // Must await resume — scheduling audio while suspended is silently dropped
  if (sharedCtx.state !== 'running') {
    await sharedCtx.resume();
  }
  return sharedCtx;
}

function schedulePress(ctx: AudioContext) {
  const t = ctx.currentTime + 0.005; // small lookahead for scheduling safety

  // Noise burst through lowpass — muffled "thup"
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

  // Sub-bass thump — the body of the pop
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(160, t);
  osc.frequency.exponentialRampToValueAtTime(38, t + 0.09);

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0.65, t);
  oscEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.10);
}

function scheduleRelease(ctx: AudioContext) {
  const t = ctx.currentTime + 0.005;

  // Noise burst through bandpass — brighter, more open pop
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

  // Mid tone sweep up — the "pop" character
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.09);

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0.50, t);
  oscEnv.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.10);
}

export function usePopSound() {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
  }, []);

  const playPress = useCallback(async () => {
    if (mutedRef.current) return;
    try {
      const ctx = await getReadyCtx();
      schedulePress(ctx);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  const playRelease = useCallback(async () => {
    if (mutedRef.current) return;
    try {
      const ctx = await getReadyCtx();
      scheduleRelease(ctx);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  return { muted, toggleMute, playPress, playRelease };
}
