import { describe, expect, it } from 'vitest';
import {
  U_MAX,
  U_MIN,
  analogAt,
  bitRate,
  codeOf,
  levelCount,
  levelOf,
  levelStep,
  levelVoltage,
  sampleSignal,
  sampledEnough,
  staircaseAt,
  worstError,
} from './engine.js';

describe('quantising', () => {
  it('has 2ⁿ levels spread over the converter range', () => {
    expect(levelCount(1)).toBe(2);
    expect(levelCount(4)).toBe(16);
    expect(levelStep(2)).toBeCloseTo(1, 12);
    expect(levelVoltage(0, 3)).toBe(U_MIN);
    expect(levelVoltage(7, 3)).toBeCloseTo(U_MAX, 12);
  });

  it('rounds a voltage to the nearest level and clamps outside the range', () => {
    expect(levelOf(0.4, 2)).toBe(2);
    expect(levelOf(-0.6, 2)).toBe(1);
    expect(levelOf(5, 3)).toBe(7);
    expect(levelOf(-5, 3)).toBe(0);
    expect(codeOf(5, 3)).toBe('101');
    expect(codeOf(1, 4)).toBe('0001');
  });

  it('keeps every sample within half a step of the signal', () => {
    const bad = sampleSignal(10, 3, 2).filter(
      (s) => Math.abs(s.u - s.q) > levelStep(3) / 2 + 1e-12,
    );
    expect(bad).toEqual([]);
  });
});

describe('sampling and rebuilding', () => {
  it('samples every 1/fs ms and holds each level until the next sample', () => {
    const s = sampleSignal(4, 2, 2);
    expect(s).toHaveLength(9);
    expect(s[1].t).toBeCloseTo(0.25, 12);
    expect(s[0].u).toBeCloseTo(analogAt(0), 12);
    expect(staircaseAt(s, 4, 0.3)).toBe(s[1].q);
  });

  it('follows the signal more closely with more samples and more bits', () => {
    const coarse = worstError(4, 2, 2);
    const fine = worstError(40, 4, 2);
    expect(fine).toBeLessThan(coarse / 2);
    expect(worstError(40, 4, 2)).toBeLessThan(worstError(40, 2, 2));
  });

  it('computes the bit rate and the sampling rule', () => {
    expect(bitRate(8, 8)).toBe(64);
    expect(sampledEnough(6)).toBe(true);
    expect(sampledEnough(5)).toBe(false);
  });
});
