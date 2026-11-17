import { describe, expect, it } from 'vitest';
import { acAt, rangeFor, rms } from './ac.js';

describe('alternating quantities', () => {
  it('follows X0 cos(2πft + φ)', () => {
    expect(acAt(3, 50, 0, 0)).toBeCloseTo(3, 12);
    expect(acAt(3, 50, Math.PI / 2, 0)).toBeCloseTo(0, 12);
    expect(acAt(3, 50, Math.PI / 2, 0.005)).toBeCloseTo(-3, 12);
    expect(acAt(2, 50, 0, 0.02)).toBeCloseTo(2, 12);
  });

  it('gives the effective value X0/√2', () => {
    expect(rms(220 * Math.SQRT2)).toBeCloseTo(220, 12);
    expect(rms(3)).toBeCloseTo(2.1213, 4);
  });

  it('picks the smallest range with room for the peak', () => {
    expect(rangeFor(3, [2, 4, 8])).toBe(4);
    expect(rangeFor(3.9, [2, 4, 8])).toBe(8);
    expect(rangeFor(20, [2, 4, 8])).toBe(8);
  });
});
