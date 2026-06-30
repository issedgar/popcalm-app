import { memo } from 'react';
import { cn } from '../../utils/cn';

interface BubbleProps {
  id: string;
  color: string;
  isDown: boolean;
  label: string;
  style: React.CSSProperties;
  onToggle: () => void;
}

export const Bubble = memo(function Bubble({ id, color, isDown, label, style, onToggle }: BubbleProps) {
  return (
    <button
      type="button"
      data-bubble-id={id}
      aria-label={label}
      aria-pressed={isDown}
      style={{ ...style, '--bubble-color': color } as React.CSSProperties}
      className={cn('bubble-btn', isDown && 'bubble-btn--down')}
      onClick={onToggle}
    />
  );
});
