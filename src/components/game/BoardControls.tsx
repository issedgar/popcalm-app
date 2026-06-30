import { RotateCcw } from 'lucide-react';
import type { Language } from '../../types/game';
import { SHAPES } from '../../config/shapes';
import { PALETTES } from '../../config/palettes';
import { t } from '../../config/i18n';
import { cn } from '../../utils/cn';

interface BoardControlsProps {
  shapeId: string;
  paletteId: string;
  pressedCount: number;
  totalCount: number;
  lang: Language;
  onShapeChange: (id: string) => void;
  onPaletteChange: (id: string) => void;
  onReset: () => void;
}

export function BoardControls({
  shapeId,
  paletteId,
  pressedCount,
  totalCount,
  lang,
  onShapeChange,
  onPaletteChange,
  onReset,
}: BoardControlsProps) {
  const tr = t(lang);

  return (
    <div className="flex flex-col items-center gap-3.5 w-full max-w-xl mx-auto px-4">
      {/* Shape selector */}
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.18em]">
          {tr.shape}
        </span>
        <div className="flex flex-wrap justify-center gap-1.5">
          {SHAPES.map((shape) => (
            <button
              key={shape.id}
              type="button"
              onClick={() => onShapeChange(shape.id)}
              aria-pressed={shapeId === shape.id}
              className={cn('control-pill', shapeId === shape.id && 'is-active')}
            >
              <span aria-hidden="true" className="mr-1.5 text-base leading-none">
                {shape.icon}
              </span>
              {shape.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Palette selector */}
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-[0.18em]">
          {tr.palette}
        </span>
        <div className="flex flex-wrap justify-center gap-1.5">
          {PALETTES.map((palette) => (
            <button
              key={palette.id}
              type="button"
              onClick={() => onPaletteChange(palette.id)}
              aria-pressed={paletteId === palette.id}
              aria-label={palette.label[lang]}
              className={cn(
                'control-pill',
                paletteId === palette.id && 'is-active',
              )}
              style={
                paletteId === palette.id
                  ? ({ '--pill-accent': palette.accent } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {palette.colors.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{
                      background: c,
                      boxShadow: `0 0 0 1px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.4)`,
                    }}
                  />
                ))}
              </span>
              {palette.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats + reset */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-slate-400 tabular-nums">
          <span className="text-white font-semibold">{pressedCount}</span>
          {' '}{tr.of}{' '}
          <span className="text-white font-semibold">{totalCount}</span>
          {' '}{tr.bubbles} {tr.pressed}
        </span>
        <button
          type="button"
          onClick={onReset}
          aria-label={tr.ariaReset}
          className="control-pill control-pill--icon"
        >
          <RotateCcw size={13} aria-hidden="true" />
          {tr.reset}
        </button>
      </div>
    </div>
  );
}
