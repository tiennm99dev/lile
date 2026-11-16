import { describe, expect, it } from 'vitest';
import { colorOf, contour, field, potential, sampleGrid } from './engine.js';

const BOUNDS = { xMin: -9, xMax: 9, yMin: -6, yMax: 6 };

describe('potential of point charges', () => {
  it('gives V = kq/r and adds as numbers', () => {
    // q = 1 nC, r = 3 cm: V = 9·10⁹·10⁻⁹/0,03 = 300 V.
    expect(potential([{ x: 0, y: 0, q: 1 }], { x: 3, y: 0 })).toBe(300);
    expect(potential([{ x: 0, y: 0, q: -2 }], { x: 0, y: 6 })).toBe(-300);
    const dipole = [
      { x: -3, y: 0, q: 1 },
      { x: 3, y: 0, q: -1 },
    ];
    expect(potential(dipole, { x: 0, y: 4 })).toBe(0);
  });

  it('points the field from high to low potential', () => {
    const e = field([{ x: 0, y: 0, q: 1 }], { x: 3, y: 0 });
    expect(e.x).toBeGreaterThan(0);
    expect(potential([{ x: 0, y: 0, q: 1 }], { x: 3.1, y: 0 })).toBeLessThan(300);
  });
});

describe('equipotential lines', () => {
  it('draws a circle around a single charge', () => {
    const grid = sampleGrid([{ x: 0, y: 0, q: 1 }], BOUNDS, 90, 60);
    const segs = contour(grid, 300);
    expect(segs.length).toBeGreaterThan(20);
    const off = segs.flat().filter((p) => Math.abs(Math.hypot(p.x, p.y) - 3) > 0.05);
    expect(off).toEqual([]);
  });

  it('draws the zero line of a dipole along its perpendicular bisector', () => {
    const grid = sampleGrid(
      [
        { x: -3, y: 0, q: 1 },
        { x: 3, y: 0, q: -1 },
      ],
      BOUNDS,
      90,
      60,
    );
    const off = contour(grid, 0)
      .flat()
      .filter((p) => Math.abs(p.x) > 1e-6);
    expect(off).toEqual([]);
  });

  it('colours positive red and negative blue', () => {
    expect(colorOf(0, 100)).toEqual([255, 255, 255]);
    const [r, g, b] = colorOf(500, 100);
    expect(r).toBe(255);
    expect(g).toBe(b);
    expect(g).toBeLessThan(100);
    expect(colorOf(-500, 100)[2]).toBe(255);
  });
});
