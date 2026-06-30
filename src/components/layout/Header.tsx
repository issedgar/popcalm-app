import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import type { Language } from '../../types/game';
import { t } from '../../config/i18n';

interface HeaderProps {
  lang: Language;
  muted: boolean;
  onToggleLang: () => void;
  onToggleMute: () => void;
  onReset: () => void;
}

export function Header({ lang, muted, onToggleLang, onToggleMute, onReset }: HeaderProps) {
  const tr = t(lang);

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-white/8">
      <span className="text-base font-semibold tracking-tight text-white">
        {tr.appName}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? tr.ariaUnmute : tr.ariaMute}
          aria-pressed={muted}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {muted
            ? <VolumeX size={15} aria-hidden="true" />
            : <Volume2 size={15} aria-hidden="true" />
          }
        </button>
        <button
          type="button"
          onClick={onToggleLang}
          aria-label={tr.ariaToggleLang}
          className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 uppercase tracking-widest"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button
          type="button"
          onClick={onReset}
          aria-label={tr.ariaReset}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
