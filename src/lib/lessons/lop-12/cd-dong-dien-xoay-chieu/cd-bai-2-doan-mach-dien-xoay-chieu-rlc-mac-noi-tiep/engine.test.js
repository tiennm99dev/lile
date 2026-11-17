import { describe, expect, it } from 'vitest';
import { currentCurve, solve } from './engine.js';

// The book's worksheet circuit: R = 10 Ω, L = 0,3/π H, C = 5·10⁻⁴/π F at 50 Hz.
const SHEET = { R: 10, L: 0.3 / Math.PI, C: 5e-4 / Math.PI, f: 50, U: 40 };

describe('series RLC circuit', () => {
  it('gives reactances, impedance and current', () => {
    const s = solve(SHEET);
    expect(s.ZL).toBeCloseTo(30, 9);
    expect(s.ZC).toBeCloseTo(20, 9);
    expect(s.Z).toBeCloseTo(10 * Math.SQRT2, 9);
    expect(s.I).toBeCloseTo(2 * Math.SQRT2, 9);
    expect(s.UR).toBeCloseTo(20 * Math.SQRT2, 9);
    expect(s.phi).toBeCloseTo(Math.PI / 4, 9);
    expect(s.tanPhi).toBeCloseTo(1, 9);
    expect(s.character).toBe('L');
  });

  it('adds the voltages as vectors, not as numbers', () => {
    const s = solve(SHEET);
    expect(Math.hypot(s.UR, s.UL - s.UC)).toBeCloseTo(SHEET.U, 9);
    expect(s.UR + s.UL + s.UC).toBeGreaterThan(SHEET.U);
  });

  it('peaks at the resonance frequency with u and i in phase', () => {
    const c = { R: 20, L: 0.3, C: 30e-6, U: 12 };
    const f0 = solve({ ...c, f: 50 }).f0;
    expect(f0).toBeCloseTo(53.05, 2);
    const at = solve({ ...c, f: f0 });
    expect(at.ZL).toBeCloseTo(at.ZC, 9);
    expect(at.I).toBeCloseTo(0.6, 9);
    expect(at.phi).toBeCloseTo(0, 9);
    expect(at.character).toBe('R');
    expect(solve({ ...c, f: 30 }).character).toBe('C');
    const curve = currentCurve(c, 10, 150, 280);
    const top = curve.reduce((a, b) => (b.y > a.y ? b : a));
    expect(Math.abs(top.x - f0)).toBeLessThan(0.5);
  });
});
