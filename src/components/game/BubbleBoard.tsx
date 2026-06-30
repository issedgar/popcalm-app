import { useRef, useCallback, useSyncExternalStore } from 'react';
import type { BoardShape, BubbleState, ColorPalette, Language } from '../../types/game';
import { Bubble } from './Bubble';
import { t } from '../../config/i18n';

interface BubbleBoardProps {
  shape: BoardShape;
  palette: ColorPalette;
  bubbleStates: Record<string, BubbleState>;
  lang: Language;
  guideId?: string | null;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
  onRelease: (id: string) => void;
}

const subscribeResize = (cb: () => void) => {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
};

function useCellSize(cols: number, rows: number): number {
  return useSyncExternalStore(
    subscribeResize,
    () => computeCell(cols, rows),
    () => computeCell(cols, rows),
  );
}

function computeCell(cols: number, rows: number): number {
  const maxDim = Math.min(560, window.innerWidth * 0.9, window.innerHeight * 0.62);
  const raw = Math.floor(maxDim / Math.max(cols, rows));
  return Math.max(30, Math.min(68, raw));
}

export function BubbleBoard({
  shape,
  palette,
  bubbleStates,
  lang,
  guideId,
  onToggle,
  onPress,
  onRelease,
}: BubbleBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const processedRef = useRef<Set<string>>(new Set());
  // Determined at pointerdown from the first bubble's state.
  // 'press' → drag makes bubbles go down; 'release' → drag makes them go up.
  const dragIntentRef = useRef<'press' | 'release'>('press');

  const cellSize = useCellSize(shape.cols, shape.rows);
  const bubbleSize = Math.floor(cellSize * 0.80);
  const offset = (cellSize - bubbleSize) / 2;
  const boardWidth = shape.cols * cellSize;
  const boardHeight = shape.rows * cellSize;

  const getBubbleIdAt = useCallback((clientX: number, clientY: number): string | null => {
    const el = document.elementFromPoint(clientX, clientY);
    const bubbleEl = el?.closest('[data-bubble-id]');
    if (!bubbleEl || !boardRef.current?.contains(bubbleEl)) return null;
    return bubbleEl.getAttribute('data-bubble-id');
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDraggingRef.current = true;
      processedRef.current = new Set();
      dragIntentRef.current = 'press'; // default reset on each gesture
      boardRef.current?.setPointerCapture(e.pointerId);

      const id = getBubbleIdAt(e.clientX, e.clientY);
      if (id) {
        // Read current state BEFORE toggling to determine drag intent
        dragIntentRef.current = bubbleStates[id] === 'down' ? 'release' : 'press';
        processedRef.current.add(id);
        onToggle(id);
      }
    },
    [getBubbleIdAt, onToggle, bubbleStates],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const id = getBubbleIdAt(e.clientX, e.clientY);
      if (id && !processedRef.current.has(id)) {
        processedRef.current.add(id);
        if (dragIntentRef.current === 'release') {
          onRelease(id);
        } else {
          onPress(id);
        }
      }
    },
    [getBubbleIdAt, onPress, onRelease],
  );

  const endDrag = useCallback(() => {
    isDraggingRef.current = false;
    processedRef.current = new Set();
  }, []);

  const translations = t(lang);

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: boardHeight + 16 }}
    >
      <div
        key={shape.id}
        ref={boardRef}
        role="group"
        aria-label={lang === 'es' ? 'Tablero de burbujas' : 'Bubble board'}
        className="relative select-none"
        style={{
          width: boardWidth,
          height: boardHeight,
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {shape.positions.map((pos, i) => {
          const color = palette.colors[pos.row % palette.colors.length];
          const state = bubbleStates[pos.id] ?? 'up';
          return (
            <Bubble
              key={pos.id}
              id={pos.id}
              color={color}
              isDown={state === 'down'}
              isGuide={pos.id === guideId}
              label={translations.ariaBubble(pos.id, state)}
              style={{
                position: 'absolute',
                left: pos.col * cellSize + offset,
                top: pos.row * cellSize + offset,
                width: bubbleSize,
                height: bubbleSize,
                animationDelay: `${Math.min(i * 8, 320)}ms`,
              }}
              onToggle={() => onToggle(pos.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
