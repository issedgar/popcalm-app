import type { BoardShape } from '../types/game';
import {
  squarePositions,
  circlePositions,
  heartPositions,
  hexagonPositions,
  flowerPositions,
} from '../utils/shapeFactory';

export const SHAPES: BoardShape[] = [
  {
    id: 'square',
    label: { es: 'Cuadrado', en: 'Square' },
    icon: '⬛',
    cols: 7,
    rows: 7,
    positions: squarePositions(7, 7),
  },
  {
    id: 'circle',
    label: { es: 'Círculo', en: 'Circle' },
    icon: '⚫',
    cols: 9,
    rows: 9,
    positions: circlePositions(9, 9),
  },
  {
    id: 'strip',
    label: { es: 'Tira', en: 'Strip' },
    icon: '▬',
    cols: 3,
    rows: 9,
    positions: squarePositions(3, 9),
  },
  {
    id: 'heart',
    label: { es: 'Corazón', en: 'Heart' },
    icon: '♥',
    cols: 11,
    rows: 11,
    positions: heartPositions(11, 11),
  },
  {
    id: 'hexagon',
    label: { es: 'Hexágono', en: 'Hexagon' },
    icon: '⬡',
    cols: 9,
    rows: 9,
    positions: hexagonPositions(9, 9),
  },
  {
    id: 'flower',
    label: { es: 'Flor', en: 'Flower' },
    icon: '❋',
    cols: 11,
    rows: 11,
    positions: flowerPositions(11, 11),
  },
];

export const DEFAULT_SHAPE_ID = 'square';
