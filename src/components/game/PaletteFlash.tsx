import { useEffect, useRef, useState } from 'react';
import type { ColorPalette } from '../../types/game';

interface PaletteFlashProps {
  palette: ColorPalette;
}

export function PaletteFlash({ palette }: PaletteFlashProps) {
  const [flash, setFlash] = useState<{ color: string; key: number } | null>(null);
  const lastPaletteIdRef = useRef(palette.id);

  useEffect(() => {
    if (palette.id === lastPaletteIdRef.current) return;
    lastPaletteIdRef.current = palette.id;
    const color = palette.accent;
    queueMicrotask(() => setFlash({ color, key: Date.now() }));
    const timer = setTimeout(() => setFlash(null), 850);
    return () => clearTimeout(timer);
  }, [palette]);

  if (!flash) return null;

  return (
    <div
      key={flash.key}
      className="palette-flash"
      style={{ '--flash-color': flash.color } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
