import { useEffect, useRef, useState } from 'react';
import type { ColorPalette, Language } from '../../types/game';
import { t } from '../../config/i18n';

const STORAGE_KEY = 'popcalm.onboardingSeen';

interface OnboardingHintProps {
  palette: ColorPalette;
  lang: Language;
}

export function OnboardingHint({ palette, lang }: OnboardingHintProps) {
  const [visible, setVisible] = useState(false);
  const tr = t(lang);
  const seenRef = useRef<boolean | null>(null);

  useEffect(() => {
    let seen: boolean;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      seen = false;
    }
    seenRef.current = seen;
    if (!seen) {
      const timer = setTimeout(() => {
        if (!seenRef.current) {
          queueMicrotask(() => setVisible(true));
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => {
      try {
        window.localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setVisible(false);
    };
    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
    ];
    events.forEach((ev) => window.addEventListener(ev, dismiss, { once: true, passive: true }));
    // Auto-dismiss after 8s if user does nothing
    const auto = setTimeout(dismiss, 8000);
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, dismiss));
      clearTimeout(auto);
    };
  }, [visible]);

  if (!visible) return null;

  const from = palette.colors[0] ?? '#E6E6FA';
  const to = palette.colors[palette.colors.length - 1] ?? '#FFB6C1';

  return (
    <div
      className="onboarding-hint"
      style={{ '--hint-from': from, '--hint-to': to } as React.CSSProperties}
      role="status"
      aria-live="polite"
    >
      {tr.tapHint}
    </div>
  );
}
