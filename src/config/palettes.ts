import type { ColorPalette } from '../types/game';

export const PALETTES: ColorPalette[] = [
  {
    id: 'aurora',
    label: { es: 'Aurora', en: 'Aurora' },
    colors: ['#22d3ee', '#86efac', '#fde047', '#f9a8d4', '#c4b5fd'],
    background: '#0f172a',
    surface: 'rgba(255,255,255,0.07)',
    accent: '#22d3ee',
    border: 'rgba(255,255,255,0.12)',
  },
  {
    id: 'ocean',
    label: { es: 'Océano', en: 'Ocean' },
    colors: ['#2563eb', '#06b6d4', '#38bdf8', '#7dd3fc', '#a5f3fc'],
    background: '#0c1a2e',
    surface: 'rgba(255,255,255,0.06)',
    accent: '#38bdf8',
    border: 'rgba(56,189,248,0.16)',
  },
  {
    id: 'candy',
    label: { es: 'Dulce', en: 'Candy' },
    colors: ['#f472b6', '#c084fc', '#fde047', '#6ee7b7', '#fb923c'],
    background: '#170f2a',
    surface: 'rgba(255,255,255,0.07)',
    accent: '#f472b6',
    border: 'rgba(244,114,182,0.18)',
  },
  {
    id: 'sunset',
    label: { es: 'Atardecer', en: 'Sunset' },
    colors: ['#fb923c', '#f87171', '#f9a8d4', '#c084fc', '#fde047'],
    background: '#1a0f0a',
    surface: 'rgba(255,255,255,0.06)',
    accent: '#fb923c',
    border: 'rgba(251,146,60,0.18)',
  },
  {
    id: 'minimal',
    label: { es: 'Minimal', en: 'Minimal' },
    colors: ['#94a3b8', '#64748b', '#7dd3fc', '#e2e8f0', '#cbd5e1'],
    background: '#0f172a',
    surface: 'rgba(255,255,255,0.05)',
    accent: '#7dd3fc',
    border: 'rgba(148,163,184,0.14)',
  },
];

export const DEFAULT_PALETTE_ID = 'aurora';
