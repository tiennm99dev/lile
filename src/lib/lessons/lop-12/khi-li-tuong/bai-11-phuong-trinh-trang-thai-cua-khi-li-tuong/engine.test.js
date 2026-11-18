import { describe, expect, it } from 'vitest';
import { R } from '../_shared/gas.js';
import { isStuck, move, pointOf, processLine, rangeOf, ratioOf, stateAt } from './engine.js';

const N = 0.4;

describe('the p, V, T panel', () => {
  it('gives about one atmosphere for 0,4 mol in 10 l at 300 K', () => {
    expect(stateAt(N, 10, 300).p).toBeCloseTo(99.72, 2);
  });

  it('keeps pV/T = nR through every process', () => {
    const start = stateAt(N, 10, 300);
    const states = [move('T', start, 20, N), move('p', start, 450, N), move('V', start, 600, N)];
    const off = states.filter((s) => Math.abs(ratioOf(s) - N * R) > 1e-9);
    expect(off).toEqual([]);
  });

  it('holds the fixed quantity', () => {
    const start = stateAt(N, 10, 300);
    expect(move('T', start, 20, N)).toMatchObject({ T: 300 });
    expect(move('T', start, 20, N).p).toBeCloseTo(start.p / 2, 9);
    expect(move('p', start, 600, N).p).toBe(start.p);
    expect(move('p', start, 600, N).V).toBeCloseTo(20, 9);
    expect(move('V', start, 600, N)).toMatchObject({ V: 10 });
    expect(move('V', start, 600, N).p).toBeCloseTo(2 * start.p, 9);
  });

  it('keeps an isobaric volume inside the cylinder', () => {
    const start = stateAt(N, 10, 300);
    const { min, max } = rangeOf('p', start, N);
    expect(move('p', start, min, N).V).toBeGreaterThanOrEqual(5);
    expect(move('p', start, max, N).V).toBeLessThanOrEqual(30);
  });

  it('flags an isobaric start that cannot change its temperature', () => {
    const corner = stateAt(N, 5, 600);
    expect(rangeOf('p', corner, N)).toEqual({ min: 600, max: 600 });
    expect(isStuck('p', rangeOf('p', corner, N))).toBe(true);
    expect(isStuck('p', rangeOf('p', stateAt(N, 10, 300), N))).toBe(false);
    expect(isStuck('V', rangeOf('V', corner, N))).toBe(false);
    expect(isStuck('T', rangeOf('T', corner, N))).toBe(false);
  });

  it('keeps the current temperature inside an isobaric range at the cylinder ends', () => {
    expect(rangeOf('p', stateAt(N, 5, 220), N).min).toBe(220);
    expect(rangeOf('p', stateAt(N, 30, 290), N).max).toBe(290);
  });

  it('lets an isobaric start with a single step left change its temperature', () => {
    const range = rangeOf('p', stateAt(N, 5, 590), N);
    expect(range).toEqual({ min: 590, max: 600 });
    expect(isStuck('p', range)).toBe(false);
  });

  it('draws each state on its process line', () => {
    const start = stateAt(N, 10, 300);
    for (const fixed of /** @type {const} */ (['T', 'p', 'V'])) {
      const line = processLine(fixed, start, N);
      const pt = pointOf(fixed, start);
      const a = line[0];
      const b = line[line.length - 1];
      if (fixed !== 'T') {
        // A straight line through the origin passes through the state.
        expect(a).toEqual({ x: 0, y: 0 });
        expect((b.y / b.x) * pt.x).toBeCloseTo(pt.y, 9);
      }
    }
  });
});
