import { describe, expect, it } from 'vitest';
import { compare, pairForce, resultant } from './engine.js';

describe('force between two charges', () => {
  it('computes the force and its kind', () => {
    // 2 µC and −3 µC, 30 cm apart: F = 9·10⁹·6·10⁻¹²/0,09 = 0,6 N.
    const p = pairForce({ x: -15, y: 0, q: 2 }, { x: 15, y: 0, q: -3 });
    expect(p.r).toBe(30);
    expect(p.force).toBeCloseTo(0.6, 12);
    expect(p.attract).toBe(true);
    expect(p.unit).toEqual({ x: 1, y: 0 });
    expect(pairForce({ x: 0, y: 0, q: 2 }, { x: 0, y: 3, q: 2 }, 2).attract).toBe(false);
    expect(pairForce({ x: 0, y: 0, q: 0 }, { x: 0, y: 3, q: 2 }).none).toBe(true);
  });

  it('explains how the force scales', () => {
    const before = { q1: 2, q2: 3, r: 4, eps: 1 };
    expect(compare({ q1: 2, q2: 3, r: 8, eps: 1 }, before).ratio).toBe(0.25);
    expect(compare({ q1: 4, q2: 3, r: 4, eps: 1 }, before).ratio).toBe(2);
    expect(compare({ q1: -2, q2: 3, r: 4, eps: 2 }, before)).toEqual({
      charges: 1,
      distance: 1,
      medium: 0.5,
      ratio: 0.5,
    });
  });
});

describe('resultant force', () => {
  it('adds two forces along a line', () => {
    const r = resultant({ x: -10, y: 0, q: 2 }, { x: 10, y: 0, q: -2 }, { x: 0, y: 0, q: 1 });
    expect(r.f1Size).toBeCloseTo(1.8, 9);
    expect(r.size).toBeCloseTo(3.6, 9);
    expect(r.total.x).toBeGreaterThan(0);
  });

  it('adds two perpendicular forces', () => {
    // q0 at the right angle: F1 = F2 = 0,9 N, F = 0,9√2 N.
    const r = resultant({ x: 0, y: 10, q: 1 }, { x: 10, y: 0, q: 1 }, { x: 0, y: 0, q: 1 });
    expect(r.f1Size).toBeCloseTo(0.9, 9);
    expect(r.size).toBeCloseTo(0.9 * Math.SQRT2, 9);
  });
});
