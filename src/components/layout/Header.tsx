import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import type { Language } from '../../types/game';
import { t } from '../../config/i18n';

const GITHUB_URL = 'https://github.com/issedgar/popcalm-app';

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
          className="cursor-pointer p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
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
          className="cursor-pointer px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 uppercase tracking-widest"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <button
          type="button"
          onClick={onReset}
          aria-label={tr.ariaReset}
          className="cursor-pointer p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
