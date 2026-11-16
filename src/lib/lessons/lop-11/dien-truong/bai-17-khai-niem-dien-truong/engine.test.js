import { describe, expect, it } from 'vitest';
import { fieldLines, forceOnTest, lineCount, midArrow, probeField } from './engine.js';

const BOUNDS = { xMin: -9, xMax: 9, yMin: -6, yMax: 6 };

describe('field of point charges', () => {
  it('points away from a positive charge with E = k|Q|/r²', () => {
    // Q = 4 nC, r = 20 cm: E = 9·10⁹·4·10⁻⁹/0,04 = 900 V/m.
    const f = probeField([{ x: 0, y: 0, q: 4 }], { x: 20, y: 0 });
    expect(f.size).toBeCloseTo(900, 6);
    expect(f.total.x).toBeGreaterThan(0);
    const g = probeField([{ x: 0, y: 0, q: -4 }], { x: 20, y: 0 });
    expect(g.total.x).toBeLessThan(0);
  });

  it('adds the fields of several charges', () => {
    // +1 nC and −1 nC 6 cm apart: at the midpoint both parts point to the − charge.
    const f = probeField(
      [
        { x: -3, y: 0, q: 1 },
        { x: 3, y: 0, q: -1 },
      ],
      { x: 0, y: 0 },
    );
    expect(f.parts[0].x).toBeCloseTo(1e4, 6);
    expect(f.size).toBeCloseTo(2e4, 6);
  });

  it('gives the force on a test charge, opposite to E for a negative charge', () => {
    const e = { x: 1000, y: 0 };
    expect(forceOnTest(2, e).x).toBeCloseTo(2e-6, 15);
    expect(forceOnTest(-2, e).x).toBeLessThan(0);
  });
});

describe('field lines', () => {
  it('draws more lines for a bigger charge', () => {
    expect(lineCount(1)).toBe(6);
    expect(lineCount(-2)).toBe(12);
    expect(lineCount(10)).toBe(24);
  });

  it('leaves a positive charge and enters a negative one', () => {
    const plus = fieldLines([{ x: 0, y: 0, q: 1 }], BOUNDS);
    expect(plus).toHaveLength(6);
    const first = plus[0];
    expect(Math.hypot(first.at(-1)?.x ?? 0, first.at(-1)?.y ?? 0)).toBeGreaterThan(
      Math.hypot(first[0].x, first[0].y),
    );
    const minus = fieldLines([{ x: 0, y: 0, q: -1 }], BOUNDS);
    const m = minus[0];
    expect(Math.hypot(m[0].x, m[0].y)).toBeGreaterThan(
      Math.hypot(m.at(-1)?.x ?? 0, m.at(-1)?.y ?? 0),
    );
    const arrow = midArrow(m);
    expect(arrow).not.toBeNull();
  });

  it('ends a dipole line at the negative charge', () => {
    const lines = fieldLines(
      [
        { x: -3, y: 0, q: 1 },
        { x: 3, y: 0, q: -1 },
      ],
      BOUNDS,
    );
    const end = lines[0].at(-1) ?? { x: 0, y: 0 };
    expect(Math.hypot(end.x - 3, end.y)).toBeLessThan(0.5);
  });
});
