import type { Language } from '../../types/game';
import { t } from '../../config/i18n';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const tr = t(lang);

  return (
    <footer className="py-3 text-center">
      <p className="text-[0.7rem] text-slate-500/70 font-medium tracking-wider">
        {tr.footerText}
      </p>
    </footer>
  );
}
