import { describe, expect, it } from 'vitest';
import {
  CURVE,
  binding,
  epsAt,
  epsOf,
  massDefect,
  nuclideName,
  nuclideTex,
  reactionEnergy,
  sideTex,
  totals,
} from './nuclear.js';

describe('nuclide notation', () => {
  it('writes nuclei and particles with A and Z on the left', () => {
    expect(nuclideTex(235, 92)).toBe('{}^{235}_{92}\\mathrm{U}');
    expect(nuclideTex(1, 0)).toBe('{}^{1}_{0}n');
    expect(nuclideTex(0, -1)).toBe('{}^{0}_{-1}e');
    expect(nuclideTex(0, 1)).toBe('{}^{0}_{+1}e');
    expect(
      sideTex([
        { A: 1, Z: 0, count: 3 },
        { A: 92, Z: 36 },
      ]),
    ).toBe('3{}^{1}_{0}n + {}^{92}_{36}\\mathrm{Kr}');
  });

  it('names nuclei in words', () => {
    expect(nuclideName(14, 6)).toBe('carbon-14');
    expect(nuclideName(4, 2)).toBe('hạt α (helium-4)');
    expect(nuclideName(141, 56)).toBe('barium-141');
    expect(nuclideName(1, 0)).toBe('neutron');
  });
});

describe('binding energy', () => {
  it('gives the helium-4 numbers of the book exercise', () => {
    expect(massDefect(2, 4, 4.0015)).toBe(0.0305);
    const b = binding(2, 4, 4.0015);
    expect(b.energy).toBeCloseTo(28.41075, 6);
    expect(b.perNucleon).toBeCloseTo(7.1027, 3);
  });

  it('peaks near iron and falls off for heavy nuclei', () => {
    const top = CURVE.reduce((a, b) => (b.eps > a.eps ? b : a));
    expect(top.A).toBeGreaterThanOrEqual(56);
    expect(top.A).toBeLessThanOrEqual(62);
    expect(epsOf(235, 92)).toBe(7.591);
    expect(epsAt(56)).toBe(8.79);
    expect(epsAt(139)).toBeGreaterThan(8.3);
    expect(epsAt(139)).toBeLessThan(8.4);
  });

  it('estimates about 200 MeV for a typical fission of uranium-235', () => {
    const q = 95 * epsAt(95) + 139 * epsAt(139) - 235 * 7.591;
    expect(q).toBeGreaterThan(190);
    expect(q).toBeLessThan(215);
  });
});

describe('reactions', () => {
  it('balances mass number and charge', () => {
    const before = totals([
      { A: 235, Z: 92 },
      { A: 1, Z: 0 },
    ]);
    const after = totals([
      { A: 141, Z: 56 },
      { A: 92, Z: 36 },
      { A: 1, Z: 0, count: 3 },
    ]);
    expect(after).toEqual(before);
  });

  it('gives about 17,6 MeV for deuterium–tritium fusion', () => {
    expect(reactionEnergy(2.0136 + 3.0155, 4.0015 + 1.0087)).toBeCloseTo(17.60535, 6);
  });
});
