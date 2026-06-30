import { useCallback } from 'react';

let pendingVibrationMs = 0;
let isFlushListenerRegistered = false;

function canVibrateNow(): boolean {
  const activation = navigator.userActivation;
  return !activation || activation.hasBeenActive || activation.isActive;
}

function flushPendingVibration(): void {
  isFlushListenerRegistered = false;
  const ms = pendingVibrationMs;
  pendingVibrationMs = 0;
  if (ms > 0) vibrate(ms);
}

function queueVibration(ms: number): void {
  pendingVibrationMs = Math.max(pendingVibrationMs, ms);
  if (isFlushListenerRegistered || typeof window === 'undefined') return;
  isFlushListenerRegistered = true;
  const flush = () => {
    window.removeEventListener('pointerup', flush, true);
    window.removeEventListener('click', flush, true);
    window.removeEventListener('keydown', flush, true);
    flushPendingVibration();
  };
  window.addEventListener('pointerup', flush, { capture: true });
  window.addEventListener('click', flush, { capture: true });
  window.addEventListener('keydown', flush, { capture: true });
}

function vibrate(ms: number): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    if (!canVibrateNow()) {
      queueVibration(ms);
      return;
    }
    try {
      navigator.vibrate(ms);
    } catch {
      // Vibration API not supported or blocked
    }
  }
}

export function useHaptic() {
  const press   = useCallback(() => vibrate(12), []);
  const release = useCallback(() => vibrate(6),  []);
  return { press, release };
}
