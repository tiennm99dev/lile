import { describe, expect, it } from 'vitest';
import { BOTTOM, energyAt, presetPaths, walk, workAlong } from './engine.js';

const M = { x: -5, y: 2 };
const N = { x: 5, y: -2 };

describe('work and potential energy in a uniform field', () => {
  it('measures energy from the negative plate', () => {
    // q = 2 µC, E = 1 000 V/m, d = 6 cm: W = 2·10⁻⁶·1 000·0,06 J = 120 µJ.
    expect(energyAt(2, 1000, 2)).toBe(120);
    expect(energyAt(2, 1000, BOTTOM)).toBe(0);
    expect(energyAt(-2, 1000, 2)).toBe(-120);
  });

  it('gives A = qEd from the drop along the field', () => {
    expect(workAlong(2, 1000, M, N)).toBe(80);
    expect(workAlong(2, 1000, N, M)).toBe(-80);
    expect(workAlong(2, 1000, { x: 0, y: 1 }, { x: 7, y: 1 })).toBe(0);
    expect(workAlong(-2, 1000, M, N)).toBe(-80);
  });

  it('does the same work along every path, equal to W_M − W_N', () => {
    const paths = presetPaths(M, N);
    const results = paths.map((p) => walk(2, 1000, p.points));
    for (const r of results) expect(r.work).toBeCloseTo(80, 6);
    expect(energyAt(2, 1000, M.y) - energyAt(2, 1000, N.y)).toBe(80);
    const lengths = results.map((r) => r.length);
    expect(lengths[1]).toBeGreaterThan(lengths[0]);
    expect(lengths[2]).toBeGreaterThan(lengths[0]);
    for (const p of paths) {
      expect(p.points[0]).toEqual(M);
      expect(p.points.at(-1)).toEqual(N);
    }
  });

  it('does no work around a closed path', () => {
    const [straight] = presetPaths(M, N);
    const back = [...straight.points, ...[...straight.points].reverse()];
    expect(walk(2, 1000, back).work).toBeCloseTo(0, 9);
  });
});
