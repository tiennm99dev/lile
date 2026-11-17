import { describe, expect, it } from 'vitest';
import { emfAt, outputOf, rms } from './engine.js';

describe('the alternator', () => {
  it('has E₀ = NBSω and f equal to the turns per second', () => {
    const o = outputOf(100, 0.2, 50);
    expect(o.f).toBe(50);
    expect(o.T).toBe(0.02);
    expect(o.omega).toBeCloseTo(100 * Math.PI, 9);
    expect(o.E0).toBeCloseTo(100 * 0.2 * 0.02 * 100 * Math.PI, 9);
    expect(o.E).toBeCloseTo(o.E0 / Math.SQRT2, 9);
  });

  it('doubles its peak and its frequency when it turns twice as fast', () => {
    const a = outputOf(100, 0.3, 2);
    const b = outputOf(100, 0.3, 4);
    expect(b.E0 / a.E0).toBeCloseTo(2, 9);
    expect(b.f / a.f).toBe(2);
  });

  it('starts from zero emf and peaks a quarter period later', () => {
    const o = outputOf(150, 0.4, 2);
    expect(emfAt(150, 0.4, 2, 0)).toBeCloseTo(0, 9);
    expect(emfAt(150, 0.4, 2, o.T / 4)).toBeCloseTo(o.E0, 9);
  });

  it('gives the effective value E₀/√2', () => {
    expect(rms(220 * Math.SQRT2)).toBeCloseTo(220, 9);
  });
});
