import type { Language } from '../../types/game';
import { t } from '../../config/i18n';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const tr = t(lang);

  return (
    <footer className="py-4 text-center border-t border-white/8">
      <p className="text-xs text-slate-500">{tr.footerText}</p>
    </footer>
  );
}
