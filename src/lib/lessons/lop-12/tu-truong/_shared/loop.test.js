import { describe, expect, it } from 'vitest';
import { averageEmf, coilAt, fluxOf, peakEmf, wrapDeg } from './loop.js';

describe('a coil turning in a uniform field', () => {
  it('has flux BS cos α', () => {
    expect(fluxOf(0.2, 0.01, 0)).toBeCloseTo(0.002, 12);
    expect(fluxOf(0.2, 0.01, 60)).toBeCloseTo(0.001, 12);
    expect(fluxOf(0.2, 0.01, 90)).toBe(0);
    expect(fluxOf(0.2, 0.01, 180, 100)).toBeCloseTo(-0.2, 12);
  });

  it('has emf equal to minus the rate of change of flux', () => {
    const coil = { N: 50, B: 0.4, S: 0.02, omega: 10 };
    const bad = [];
    for (let t = 0; t < 1; t += 0.05) {
      const h = 1e-6;
      const slope = (coilAt(coil, t + h).flux - coilAt(coil, t - h).flux) / (2 * h);
      if (Math.abs(coilAt(coil, t).emf + slope) > 1e-4) bad.push(t);
    }
    expect(bad).toEqual([]);
    expect(peakEmf(50, 0.4, 0.02, 10)).toBeCloseTo(4, 12);
  });

  it('gives the average emf from a flux change', () => {
    expect(averageEmf(0, 0.06, 0.2)).toBeCloseTo(-0.3, 12);
  });

  it('wraps angles', () => {
    expect(wrapDeg(-30)).toBe(330);
    expect(wrapDeg(720)).toBe(0);
  });
});
