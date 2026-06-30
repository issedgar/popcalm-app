import { useMemo } from 'react';
import type { ColorPalette } from '../../types/game';

interface AmbientBubblesProps {
  palette: ColorPalette;
  count?: number;
}

interface GhostBubble {
  id: number;
  size: number;
  top: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  side: 'left' | 'right';
}

// Deterministic pseudo-random so the layout is stable across renders
// and doesn't shift around on every re-render.
function seedRand(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function AmbientBubbles({ palette, count = 14 }: AmbientBubblesProps) {
  const bubbles = useMemo<GhostBubble[]>(() => {
    const colors = palette.colors;
    return Array.from({ length: count }, (_, i) => {
      const size = 18 + Math.floor(seedRand(i * 3 + 1) * 70); // 18-88px
      const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';
      // Vertically distribute across the full viewport height
      const top = 8 + seedRand(i * 3 + 2) * 84; // 8%-92%
      // Within the outer 22% of the viewport on each side
      const left = side === 'left'
        ? 2 + seedRand(i * 3 + 3) * 16 // 2%-18%
        : 82 + seedRand(i * 3 + 3) * 16; // 82%-98%
      const color = colors[i % colors.length];
      const delay = seedRand(i * 3 + 4) * 8; // 0-8s
      const duration = 14 + seedRand(i * 3 + 5) * 10; // 14-24s
      return { id: i, size, top, left, color, delay, duration, side };
    });
  }, [palette.colors, count]);

  return (
    <div className="ambient-bubbles" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="ambient-bubble"
          style={
            {
              width: `${b.size}px`,
              height: `${b.size}px`,
              top: `${b.top}%`,
              left: `${b.left}%`,
              background: `radial-gradient(ellipse 70% 62% at 36% 28%, rgba(255,255,255,0.35) 0%, ${b.color} 55%, color-mix(in srgb, ${b.color} 70%, #000) 100%)`,
              boxShadow: `0 0 24px color-mix(in srgb, ${b.color} 35%, transparent), inset 0 -3px 0 rgba(0,0,0,0.18), inset 0 2px 1px rgba(255,255,255,0.25)`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
