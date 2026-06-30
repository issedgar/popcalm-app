import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { BubbleState, Language } from '../types/game';
import { SHAPES, DEFAULT_SHAPE_ID } from '../config/shapes';
import { PALETTES, DEFAULT_PALETTE_ID } from '../config/palettes';
import { useLocalStorage } from './useLocalStorage';

export function useBubbleGame() {
  const [lang, setLang] = useLocalStorage<Language>('popcalm-lang', 'es');
  const [shapeId, setShapeId] = useLocalStorage<string>('popcalm-shape', DEFAULT_SHAPE_ID);
  const [paletteId, setPaletteId] = useLocalStorage<string>('popcalm-palette', DEFAULT_PALETTE_ID);
  const [bubbleStates, setBubbleStates] = useState<Record<string, BubbleState>>({});

  // Timer maps — plain numbers in browser context (window.setTimeout)
  const bubbleTimersRef = useRef<Map<string, number>>(new Map());
  const waveTimersRef   = useRef<number[]>([]);

  const currentShape = useMemo(
    () => SHAPES.find((s) => s.id === shapeId) ?? SHAPES[0],
    [shapeId],
  );

  const currentPalette = useMemo(
    () => PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0],
    [paletteId],
  );

  const clearBubbleTimers = useCallback(() => {
    bubbleTimersRef.current.forEach((t) => clearTimeout(t));
    bubbleTimersRef.current.clear();
  }, []);

  const clearWaveTimers = useCallback(() => {
    waveTimersRef.current.forEach((t) => clearTimeout(t));
    waveTimersRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearBubbleTimers();
      clearWaveTimers();
    };
  }, [clearBubbleTimers, clearWaveTimers]);

  // Per-bubble 7-second inactivity timeout (GDD §6.2)
  // A bubble that stays 'down' for 7s gently returns to 'up' on its own.
  useEffect(() => {
    const timers = bubbleTimersRef.current;

    // Cancel timers for bubbles that are no longer 'down'
    timers.forEach((timer, id) => {
      if (bubbleStates[id] !== 'down') {
        clearTimeout(timer);
        timers.delete(id);
      }
    });

    // Schedule for newly pressed bubbles that don't have a timer yet
    Object.entries(bubbleStates).forEach(([id, state]) => {
      if (state === 'down' && !timers.has(id)) {
        const timer = window.setTimeout(() => {
          setBubbleStates((prev) => {
            if (prev[id] !== 'down') return prev;
            return { ...prev, [id]: 'up' };
          });
          timers.delete(id);
        }, 30_000);
        timers.set(id, timer);
      }
    });
  }, [bubbleStates]);

  const toggleBubble = useCallback((id: string) => {
    setBubbleStates((prev) => ({
      ...prev,
      [id]: prev[id] === 'down' ? 'up' : 'down',
    }));
  }, []);

  const pressBubble = useCallback((id: string) => {
    setBubbleStates((prev) => {
      if (prev[id] === 'down') return prev;
      return { ...prev, [id]: 'down' };
    });
  }, []);

  const releaseBubble = useCallback((id: string) => {
    setBubbleStates((prev) => {
      if (prev[id] !== 'down') return prev;
      return { ...prev, [id]: 'up' };
    });
  }, []);

  const reset = useCallback(() => {
    clearBubbleTimers();
    clearWaveTimers();
    setBubbleStates({});
  }, [clearBubbleTimers, clearWaveTimers]);

  const changeShape = useCallback(
    (id: string) => {
      clearBubbleTimers();
      clearWaveTimers();
      setShapeId(id);
      setBubbleStates({});
    },
    [setShapeId, clearBubbleTimers, clearWaveTimers],
  );

  // Wave reinflation (GDD §6.1): releases rows top-to-bottom with 40ms stagger.
  // 400ms initial pause lets the user appreciate the fully-pressed state.
  const waveReset = useCallback(() => {
    clearWaveTimers();

    const rowMap = new Map<number, string[]>();
    currentShape.positions.forEach((pos) => {
      if (!rowMap.has(pos.row)) rowMap.set(pos.row, []);
      rowMap.get(pos.row)!.push(pos.id);
    });

    const sortedRows = [...rowMap.keys()].sort((a, b) => a - b);

    sortedRows.forEach((row, i) => {
      const timer = window.setTimeout(() => {
        const ids = rowMap.get(row)!;
        setBubbleStates((prev) => {
          const next = { ...prev };
          ids.forEach((id) => { next[id] = 'up'; });
          return next;
        });
      }, 400 + i * 40);
      waveTimersRef.current.push(timer);
    });
  }, [currentShape, clearWaveTimers]);

  const pressedCount = useMemo(
    () => Object.values(bubbleStates).filter((s) => s === 'down').length,
    [bubbleStates],
  );

  return {
    lang,
    setLang,
    shapeId,
    paletteId,
    setPaletteId,
    changeShape,
    bubbleStates,
    toggleBubble,
    pressBubble,
    releaseBubble,
    reset,
    waveReset,
    currentShape,
    currentPalette,
    pressedCount,
    totalCount: currentShape.positions.length,
  };
}
