import { describe, expect, it } from 'vitest';
import {
  GOAL,
  burnAt,
  criticalDepth,
  kOf,
  regime,
  stepPower,
  steadyAfter,
  verdict,
} from './engine.js';

describe('multiplication factor', () => {
  it('falls as the rods go in and as the fuel burns', () => {
    expect(kOf(0, 0)).toBeCloseTo(1.06, 12);
    expect(kOf(1, 0)).toBeCloseTo(0.94, 12);
    expect(kOf(0.5, 0)).toBeCloseTo(1, 12);
    expect(kOf(0.5, 0.01)).toBeLessThan(1);
  });

  it('can always be brought back to 1 by pulling the rods', () => {
    for (const s of [0, 30, 60, 1000]) {
      const d = criticalDepth(burnAt(s));
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(1);
      expect(kOf(d, burnAt(s))).toBeCloseTo(1, 12);
    }
  });

  it('names the three regimes', () => {
    expect(regime(1)).toBe('toi');
    expect(regime(0.98)).toBe('duoi');
    expect(regime(1.02)).toBe('vuot');
  });
});

describe('power', () => {
  it('stays when critical, grows above, dies away below', () => {
    expect(stepPower(100, 1, 0.5)).toBe(100);
    expect(stepPower(100, 1.02, 1)).toBeCloseTo(100 * 1.02 ** 10, 9);
    expect(stepPower(100, 0.98, 1)).toBeLessThan(100);
  });

  it('counts seconds in the band and judges the game', () => {
    expect(steadyAfter(3, 100, 0.5)).toBe(3.5);
    expect(steadyAfter(3, 130, 0.5)).toBe(0);
    expect(verdict(250, 0)).toBe('trip');
    expect(verdict(2, 0)).toBe('out');
    expect(verdict(100, GOAL)).toBe('won');
    expect(verdict(100, 1)).toBe('run');
  });
});
