import { useCallback } from 'react';

function vibrate(ms: number): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
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
