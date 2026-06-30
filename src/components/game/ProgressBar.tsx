import { useEffect, useRef, useState } from 'react';
import type { ColorPalette } from '../../types/game';

interface ProgressBarProps {
  pressed: number;
  total: number;
  palette: ColorPalette;
  label: string;
}

export function ProgressBar({ pressed, total, palette, label }: ProgressBarProps) {
  const percent = total > 0 ? Math.min(100, (pressed / total) * 100) : 0;
  const from = palette.colors[0] ?? '#E6E6FA';
  const via = palette.colors[Math.floor(palette.colors.length / 2)] ?? from;
  const to = palette.colors[palette.colors.length - 1] ?? '#FFB6C1';

  const lastPercentRef = useRef(percent);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    if (percent > lastPercentRef.current && percent < 100) {
      setBumping(true);
      const t = setTimeout(() => setBumping(false), 260);
      lastPercentRef.current = percent;
      return () => clearTimeout(t);
    }
    lastPercentRef.current = percent;
  }, [percent]);

  const milestones = [25, 50, 75];
  const isMilestone = milestones.includes(Math.round(percent));

  return (
    <div className="flex items-center gap-3 w-full max-w-md">
      <div
        className="progress-track flex-1"
        role="progressbar"
        aria-valuenow={pressed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
      >
        <div
          className={`progress-fill ${bumping ? 'is-bumping' : ''}`}
          style={
            {
              width: `${percent}%`,
              '--progress-from': from,
              '--progress-via': via,
              '--progress-to': to,
            } as React.CSSProperties
          }
        />
      </div>
      <span
        key={pressed}
        className={`text-xs font-semibold tabular-nums text-white/70 min-w-[3.5rem] text-right ${
          isMilestone ? 'progress-count--milestone' : ''
        }`}
        style={isMilestone ? { color: from } : undefined}
      >
        {pressed}/{total}
      </span>
    </div>
  );
}
