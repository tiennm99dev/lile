import { describe, expect, it } from 'vitest';
import { characteristic, currentAt, resistanceAt } from './engine.js';

describe('characteristics', () => {
  it('keeps the resistor at 20 Ω both ways', () => {
    expect(currentAt('dien-tro', 6)).toBe(0.3);
    expect(currentAt('dien-tro', -4)).toBe(-0.2);
    expect(resistanceAt('dien-tro', 2)).toBe(20);
    expect(resistanceAt('dien-tro', -5)).toBe(20);
  });

  it('lets the lamp resistance grow with the voltage', () => {
    expect(currentAt('den', 6)).toBeCloseTo(0.5, 12);
    expect(currentAt('den', 3)).toBeCloseTo(0.4, 12);
    expect(resistanceAt('den', 6)).toBeCloseTo(12, 9);
    expect(resistanceAt('den', 3)).toBeCloseTo(7.5, 9);
    expect(currentAt('den', -6)).toBeCloseTo(-0.5, 12);
  });

  it('blocks the diode backwards and below the knee', () => {
    expect(resistanceAt('diot', -3)).toBeNull();
    expect(resistanceAt('diot', 0.2)).toBeNull();
    expect(Math.abs(currentAt('diot', -6))).toBeLessThan(1e-9);
    expect(currentAt('diot', 3)).toBeCloseTo(0.24, 3);
    expect(currentAt('diot', 6)).toBeLessThan(0.6);
  });

  it('samples a curve end to end', () => {
    const pts = characteristic('den', -6, 6, 13);
    expect(pts).toHaveLength(13);
    expect(pts[0].x).toBe(-6);
    expect(pts[12].x).toBe(6);
  });
});
