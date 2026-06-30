import { useCallback, useEffect, useRef, useState } from 'react';
import type { BubblePosition, BubbleState } from '../types/game';

interface UseBreathingOptions {
  positions: BubblePosition[];
  bubbleStates: Record<string, BubbleState>;
  lastInteractionRef: React.MutableRefObject<number>;
}

const IDLE_MS     =  5_000;  // user must be idle ≥ 5s before guide appears
const COOLDOWN_MS = 45_000;  // minimum gap between guide appearances
const POLL_MS     =  5_000;  // how often we check the idle/cooldown condition
const CYCLE_MS    = 19_000;  // 4s inhale + 7s hold + 8s exhale

export function useBreathing({ positions, bubbleStates, lastInteractionRef }: UseBreathingOptions) {
  const [guideId, setGuideId] = useState<string | null>(null);

  const positionsRef    = useRef(positions);
  const bubbleStatesRef = useRef(bubbleStates);
  // Start as "already cooled down" so the guide can appear on first idle window
  const lastGuideClearedAt = useRef<number>(Date.now() - COOLDOWN_MS);
  const prevGuideIdRef     = useRef<string | null>(null);

  useEffect(() => { positionsRef.current = positions; },    [positions]);
  useEffect(() => { bubbleStatesRef.current = bubbleStates; }, [bubbleStates]);

  // Track when a guide cycle ends to enforce the 45s cooldown
  useEffect(() => {
    if (prevGuideIdRef.current !== null && guideId === null) {
      lastGuideClearedAt.current = Date.now();
    }
    prevGuideIdRef.current = guideId;
  }, [guideId]);

  // Cancel guide when shape changes
  useEffect(() => {
    setGuideId(null);
  }, [positions]);

  // Poll every 5s: if idle ≥ 10s AND cooldown elapsed → select a random 'up' bubble
  useEffect(() => {
    const interval = window.setInterval(() => {
      const idleMs     = Date.now() - lastInteractionRef.current;
      const cooldownMs = Date.now() - lastGuideClearedAt.current;

      if (idleMs < IDLE_MS)         return;
      if (cooldownMs < COOLDOWN_MS) return;

      const upBubbles = positionsRef.current.filter(
        (p) => bubbleStatesRef.current[p.id] !== 'down',
      );
      if (upBubbles.length === 0) return;

      const picked = upBubbles[Math.floor(Math.random() * upBubbles.length)];
      setGuideId((prev) => prev ?? picked.id);
    }, POLL_MS);

    return () => clearInterval(interval);
  }, [lastInteractionRef]);

  // Auto-clear after one full breathing cycle (19s)
  useEffect(() => {
    if (!guideId) return;
    const timer = window.setTimeout(() => setGuideId(null), CYCLE_MS);
    return () => clearTimeout(timer);
  }, [guideId]);

  const cancelGuide = useCallback(() => setGuideId(null), []);

  return { guideId, cancelGuide };
}
