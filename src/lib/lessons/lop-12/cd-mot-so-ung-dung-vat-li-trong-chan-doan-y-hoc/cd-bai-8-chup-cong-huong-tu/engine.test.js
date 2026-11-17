import { describe, expect, it } from 'vitest';
import { SLICES, fieldAt, hitSlices, larmor, recoveryTime, relax } from './engine.js';

describe('Larmor frequency and resonance', () => {
  it('grows in proportion to the field', () => {
    expect(larmor(1.5)).toBeCloseTo(63.87, 9);
    expect(larmor(3)).toBeCloseTo(2 * larmor(1.5), 12);
  });

  it('tips every slice at the Larmor frequency without a gradient, none off it', () => {
    expect(hitSlices(1.5, false, 63.87)).toEqual([0, 1, 2, 3, 4]);
    expect(hitSlices(1.5, false, 63.5)).toEqual([]);
  });

  it('picks out one slice when the gradient is on', () => {
    expect(fieldAt(1.5, 5, true)).toBeCloseTo(1.502, 12);
    expect(hitSlices(1.5, true, 63.87)).toEqual([2]);
    const bad = [];
    for (let i = 0; i < SLICES.length; i += 1) {
      const f = Math.round(larmor(fieldAt(1.5, SLICES[i].z, true)) * 100) / 100;
      const hit = hitSlices(1.5, true, f);
      if (hit.length !== 1 || hit[0] !== i) bad.push(i);
    }
    expect(bad).toEqual([]);
  });
});

describe('relaxation', () => {
  it('returns along B with T1 and fades the signal with T2', () => {
    expect(relax('fat', 0)).toEqual({ mz: 0, signal: 1 });
    expect(relax('fat', 260).mz).toBeCloseTo(1 - Math.exp(-1), 12);
    expect(relax('csf', 1000).mz).toBeLessThan(relax('fat', 1000).mz);
    expect(recoveryTime('grey', 0.5)).toBeCloseTo(920 * Math.LN2, 9);
  });
});
