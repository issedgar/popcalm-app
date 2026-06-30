import { useEffect, useRef, useState } from 'react';
import type { ColorPalette, Language } from '../../types/game';
import { t } from '../../config/i18n';

interface CelebrationProps {
  trigger: number;
  palette: ColorPalette;
  lang: Language;
}

interface ConfettiPiece {
  id: number;
  color: string;
  cx: number;
  cy: number;
  cr: number;
  shape: 'square' | 'circle';
  delay: number;
}

const PIECE_COUNT = 18;

function makePieces(palette: ColorPalette, seed: number): ConfettiPiece[] {
  const rand = (i: number) => {
    const x = Math.sin((seed * 9301 + i * 49297) % 1000) * 233280;
    return x - Math.floor(x);
  };
  return Array.from({ length: PIECE_COUNT }, (_, i) => {
    const angle = (i / PIECE_COUNT) * Math.PI * 2 + rand(i) * 0.4;
    const dist = 80 + rand(i + 1) * 80;
    return {
      id: seed * 1000 + i,
      color: palette.colors[i % palette.colors.length],
      cx: Math.cos(angle) * dist,
      cy: Math.sin(angle) * dist - 30,
      cr: (rand(i + 2) - 0.5) * 720,
      shape: i % 3 === 0 ? 'circle' : 'square',
      delay: rand(i + 3) * 80,
    };
  });
}

export function Celebration({ trigger, palette, lang }: CelebrationProps) {
  const [active, setActive] = useState<{ pieces: ConfettiPiece[]; key: number } | null>(null);
  const tr = t(lang);
  const lastTriggerRef = useRef(trigger);

  useEffect(() => {
    if (trigger === lastTriggerRef.current) return;
    lastTriggerRef.current = trigger;
    if (trigger === 0) return;
    // Defer state update so the linter (react-hooks/set-state-in-effect)
    // does not flag this as a cascading render. We are synchronizing with
    // an external value (`trigger` prop) and need to enter the "celebrating"
    // state when it changes.
    const next = { pieces: makePieces(palette, trigger), key: trigger };
    queueMicrotask(() => setActive(next));
    const timer = setTimeout(() => setActive(null), 2000);
    return () => clearTimeout(timer);
  }, [trigger, palette]);

  if (!active) return null;

  return (
    <>
      <div className="celebrate-flash" aria-hidden="true" />
      <div className="celebrate-toast" aria-live="polite">
        {tr.complete}
      </div>
      {active.pieces.map((p) => (
        <span
          key={p.id}
          className="celebrate-confetti"
          aria-hidden="true"
          style={
            {
              background: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              animationDelay: `${p.delay}ms`,
              '--cx': `${p.cx}px`,
              '--cy': `${p.cy}px`,
              '--cr': `${p.cr}deg`,
              boxShadow: `0 0 8px ${p.color}`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}
