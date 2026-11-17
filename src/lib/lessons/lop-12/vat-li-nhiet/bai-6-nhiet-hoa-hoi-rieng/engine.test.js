import { describe, expect, it } from 'vitest';
import {
  L_WATER,
  latentFrom,
  massPoints,
  massTicks,
  readingAt,
  relativeError,
  run,
} from './engine.js';

describe('boiling water on a balance', () => {
  // 0,3 kg of water from 80 °C at 500 W.
  const r = run(0.3, 80, 500);

  it('warms the water before it boils', () => {
    expect(r.boilStart).toBeCloseTo(50.4, 9);
    expect(r.end).toBeCloseTo((25200 + 271200) / 500, 6);
    const warm = readingAt(r, 500, 25.2);
    expect(warm.temperature).toBeCloseTo(90, 9);
    expect(warm.mass).toBe(0.3);
    expect(warm.boiling).toBe(false);
  });

  it('keeps 100 °C and loses mass at the rate P / L while boiling', () => {
    const a = readingAt(r, 500, 100);
    const b = readingAt(r, 500, 300);
    expect(a.temperature).toBe(100);
    expect(a.boiling).toBe(true);
    expect(a.mass - b.mass).toBeCloseTo((500 * 200) / L_WATER, 9);
    expect(latentFrom(a, b)).toBeCloseTo(L_WATER, 3);
  });

  it('overestimates L when one reading is taken before boiling', () => {
    const before = readingAt(r, 500, 20);
    const after = readingAt(r, 500, 300);
    expect(/** @type {number} */ (latentFrom(before, after))).toBeGreaterThan(L_WATER);
    expect(latentFrom(before, readingAt(r, 500, 40))).toBeNull();
  });

  it('draws the mass graph and its ticks', () => {
    expect(massPoints(r)).toEqual([
      { x: 0, y: 300 },
      { x: r.boilStart, y: 300 },
      { x: r.end, y: 180 },
    ]);
    expect(massTicks(180, 300)).toEqual([150, 200, 250, 300]);
  });

  it('measures the error against the book value', () => {
    expect(relativeError(2.24e6)).toBeCloseTo(0.00885, 4);
  });
});
