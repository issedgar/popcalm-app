import { memo, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface BubbleProps {
  id: string;
  color: string;
  isDown: boolean;
  isGuide?: boolean;
  label: string;
  style: React.CSSProperties;
  onToggle: () => void;
}

export const Bubble = memo(function Bubble({ id, color, isDown, isGuide, label, style, onToggle }: BubbleProps) {
  const [pressCount, setPressCount] = useState(0);
  const wasDownRef = useRef(false);

  useEffect(() => {
    // Detect up→down transition to restart the ripple animation
    if (isDown && !wasDownRef.current) {
      setPressCount((c) => c + 1);
    }
    wasDownRef.current = isDown;
  }, [isDown]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail > 0) return;
    onToggle();
  };

  return (
    <button
      type="button"
      data-bubble-id={id}
      aria-label={label}
      aria-pressed={isDown}
      style={{ ...style, '--bubble-color': color } as React.CSSProperties}
      className={cn('bubble-btn', isDown && 'bubble-btn--down', isGuide && 'bubble-btn--guide')}
      onClick={handleClick}
    >
      {pressCount > 0 && (
        <span key={pressCount} className="bubble-ripple" aria-hidden="true" />
      )}
    </button>
  );
});
