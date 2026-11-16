import { describe, expect, it } from 'vitest';
import { countMaxima, countMinima, extremaPositions } from './interference.js';

describe('maxima and minima between two in-phase sources', () => {
  it('places them λ/2 apart and agrees with the counts', () => {
    const misses = [];
    for (const [a, lambda] of [
      [9, 2],
      [10, 3],
      [8, 2],
      [7, 1.5],
      [11, 2.5],
    ]) {
      const { maxima, minima } = extremaPositions(a, lambda);
      if (maxima.length !== countMaxima(a, lambda)) misses.push({ a, lambda, maxima });
      if (minima.length !== countMinima(a, lambda)) misses.push({ a, lambda, minima });
    }
    expect(misses).toEqual([]);
    expect(extremaPositions(4, 2)).toEqual({ maxima: [-1, 0, 1], minima: [-1.5, -0.5, 0.5, 1.5] });
  });
});
