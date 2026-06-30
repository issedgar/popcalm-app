import type { BubblePosition } from '../types/game';

function buildPositions(
  cols: number,
  rows: number,
  filter?: (col: number, row: number) => boolean,
): BubblePosition[] {
  const result: BubblePosition[] = [];
  let idx = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!filter || filter(col, row)) {
        result.push({ id: `b${idx++}`, col, row });
      }
    }
  }
  return result;
}

export function squarePositions(cols: number, rows: number): BubblePosition[] {
  return buildPositions(cols, rows);
}

export function circlePositions(cols: number, rows: number): BubblePosition[] {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  return buildPositions(cols, rows, (col, row) => {
    const dx = (col - cx) / (cx || 1);
    const dy = (row - cy) / (cy || 1);
    return dx * dx + dy * dy < 1;
  });
}

export function heartPositions(cols: number, rows: number): BubblePosition[] {
  return buildPositions(cols, rows, (col, row) => {
    const nx = (col / (cols - 1)) * 2.4 - 1.2;
    const ny = 1.3 - (row / (rows - 1)) * 2.4;
    return Math.pow(nx * nx + ny * ny - 1, 3) <= nx * nx * ny * ny * ny;
  });
}

export function hexagonPositions(cols: number, rows: number): BubblePosition[] {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  return buildPositions(cols, rows, (col, row) => {
    const rowDist = Math.abs(row - cy);
    const maxColDist = cx * (1 - (rowDist / (cy || 1)) * 0.5);
    return Math.abs(col - cx) <= maxColDist;
  });
}

export function flowerPositions(cols: number, rows: number): BubblePosition[] {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  return buildPositions(cols, rows, (col, row) => {
    const dx = (col - cx) / (cx || 1);
    const dy = (row - cy) / (cy || 1);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return true;
    const angle = Math.atan2(dy, dx);
    const r = 0.48 + 0.42 * Math.abs(Math.cos(3 * angle));
    return dist < r;
  });
}
