import type { Language } from '../types/game';

const translations = {
  es: {
    appName: 'PopCalm',
    tagline: 'Presiona. Relájate. Respira.',
    description: 'Un momento de calma en tu pantalla.',
    shape: 'Forma',
    palette: 'Colores',
    reset: 'Reiniciar',
    pressed: 'presionadas',
    of: 'de',
    bubbles: 'burbujas',
    footerText: 'Hecho para relajarse.',
    ariaToggleLang: 'Cambiar idioma a inglés',
    ariaBubble: (id: string, state: string) => `Burbuja ${id}, ${state === 'down' ? 'presionada' : 'suelta'}`,
    ariaReset: 'Reiniciar tablero',
    ariaMute: 'Silenciar sonido',
    ariaUnmute: 'Activar sonido',
  },
  en: {
    appName: 'PopCalm',
    tagline: 'Press. Relax. Breathe.',
    description: 'A moment of calm on your screen.',
    shape: 'Shape',
    palette: 'Colors',
    reset: 'Reset',
    pressed: 'pressed',
    of: 'of',
    bubbles: 'bubbles',
    footerText: 'Made for relaxing.',
    ariaToggleLang: 'Switch language to Spanish',
    ariaBubble: (id: string, state: string) => `Bubble ${id}, ${state === 'down' ? 'pressed' : 'up'}`,
    ariaReset: 'Reset board',
    ariaMute: 'Mute sound',
    ariaUnmute: 'Unmute sound',
  },
} as const;

export type Translations = (typeof translations)[Language];

export function t(lang: Language): Translations {
  return translations[lang];
}
