import { useState, useCallback, useMemo } from 'react';
import type { BubbleState, Language } from '../types/game';
import { SHAPES, DEFAULT_SHAPE_ID } from '../config/shapes';
import { PALETTES, DEFAULT_PALETTE_ID } from '../config/palettes';
import { useLocalStorage } from './useLocalStorage';

export function useBubbleGame() {
  const [lang, setLang] = useLocalStorage<Language>('popcalm-lang', 'es');
  const [shapeId, setShapeId] = useLocalStorage<string>('popcalm-shape', DEFAULT_SHAPE_ID);
  const [paletteId, setPaletteId] = useLocalStorage<string>('popcalm-palette', DEFAULT_PALETTE_ID);
  const [bubbleStates, setBubbleStates] = useState<Record<string, BubbleState>>({});

  const currentShape = useMemo(
    () => SHAPES.find((s) => s.id === shapeId) ?? SHAPES[0],
    [shapeId],
  );

  const currentPalette = useMemo(
    () => PALETTES.find((p) => p.id === paletteId) ?? PALETTES[0],
    [paletteId],
  );

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
    setBubbleStates({});
  }, []);

  const changeShape = useCallback(
    (id: string) => {
      setShapeId(id);
      setBubbleStates({});
    },
    [setShapeId],
  );

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
    currentShape,
    currentPalette,
    pressedCount,
    totalCount: currentShape.positions.length,
  };
}
