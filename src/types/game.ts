export type BubbleState = 'up' | 'down';
export type Language = 'es' | 'en';

export interface BubblePosition {
  id: string;
  col: number;
  row: number;
}

export interface BoardShape {
  id: string;
  label: { es: string; en: string };
  icon: string;
  cols: number;
  rows: number;
  positions: BubblePosition[];
}

export interface ColorPalette {
  id: string;
  label: { es: string; en: string };
  colors: string[];
  background: string;
  surface: string;
  accent: string;
  border: string;
}
