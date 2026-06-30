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
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto px-4">
      {/* Shape selector */}
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          {tr.shape}
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {SHAPES.map((shape) => (
            <button
              key={shape.id}
              type="button"
              onClick={() => onShapeChange(shape.id)}
              aria-pressed={shapeId === shape.id}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2',
                shapeId === shape.id
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent',
              )}
            >
              <span aria-hidden="true" className="mr-1">{shape.icon}</span>
              {shape.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Palette selector */}
      <div className="flex flex-col items-center gap-2 w-full">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          {tr.palette}
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {PALETTES.map((palette) => (
            <button
              key={palette.id}
              type="button"
              onClick={() => onPaletteChange(palette.id)}
              aria-pressed={paletteId === palette.id}
              aria-label={palette.label[lang]}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2',
                paletteId === palette.id
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent',
              )}
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {palette.colors.slice(0, 3).map((c) => (
                  <span
                    key={c}
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: c }}
                  />
                ))}
              </span>
              {palette.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats + reset */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">
          <span className="text-white font-medium">{pressedCount}</span>
          {' '}{tr.of}{' '}
          <span className="text-white font-medium">{totalCount}</span>
          {' '}{tr.bubbles} {tr.pressed}
        </span>
        <button
          type="button"
          onClick={onReset}
          aria-label={tr.ariaReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <RotateCcw size={14} aria-hidden="true" />
          {tr.reset}
        </button>
      </div>
    </div>
  );
}
