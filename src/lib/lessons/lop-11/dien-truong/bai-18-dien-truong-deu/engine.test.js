import { describe, expect, it } from 'vitest';
import { flight, path, uniformField } from './engine.js';

describe('uniform field between plates', () => {
  it('gives E = U/d', () => {
    expect(uniformField(100, 0.02)).toBe(5000);
    expect(uniformField(12, 0.004)).toBe(3000);
  });

  it('bends the electron along a parabola that leaves the plates', () => {
    const f = flight({ u: 100, d: 0.02, length: 0.05, v0: 3e7 });
    expect(f.hits).toBe(false);
    expect(f.accel).toBeCloseTo(8.7912e14, -10);
    expect(f.time).toBeCloseTo(1.6667e-9, 12);
    expect(f.yEnd).toBeCloseTo(1.221e-3, 5);
  });

  it('strikes the positive plate when the electron is slow', () => {
    const f = flight({ u: 100, d: 0.02, length: 0.05, v0: 1e7 });
    expect(f.hits).toBe(true);
    expect(f.xEnd).toBeCloseTo(0.0477, 4);
    expect(f.yEnd).toBe(0.01);
  });

  it('flies straight with no voltage', () => {
    const f = flight({ u: 0, d: 0.02, length: 0.05, v0: 2e7 });
    expect(f.hits).toBe(false);
    expect(f.yEnd).toBe(0);
    const pts = path({ u: 0, d: 0.02, length: 0.05, v0: 2e7 }, 0.07);
    expect(pts.at(-1)).toEqual({ x: 0.07, y: 0 });
  });

  it('continues in a straight line after the plates', () => {
    const setup = { u: 100, d: 0.02, length: 0.05, v0: 3e7 };
    const f = flight(setup);
    const pts = path(setup, 0.07, 10);
    expect(pts).toHaveLength(12);
    expect(pts[10].y).toBeCloseTo(f.yEnd, 12);
    expect(pts[11].y).toBeCloseTo(f.yEnd + f.slope * 0.02, 12);
  });
});
