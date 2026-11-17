import { describe, expect, it } from 'vitest';
import { totals } from '../_shared/nuclear.js';
import { FUSIONS, LIGHT_MAX, LIGHT_MIN, curveLine, fission, fusionOf } from './engine.js';

describe('curveLine', () => {
  it('runs from deuterium to uranium with x increasing', () => {
    const pts = curveLine();
    expect(pts[0]).toEqual({ x: 2, y: 1.112 });
    expect(pts.at(-1)?.x).toBe(238);
    const back = pts.filter((p, i) => i > 0 && p.x < pts[i - 1].x);
    expect(back).toEqual([]);
  });
});

describe('fission', () => {
  it('conserves nucleons and charge for every split on the slider', () => {
    const bad = [];
    for (let a = LIGHT_MIN; a <= LIGHT_MAX; a++)
      for (const free of [2, 3]) {
        const f = fission(a, free);
        const x = totals(f.before);
        const y = totals(f.after);
        if (x.A !== y.A || x.Z !== y.Z) bad.push(`${a}/${free}`);
        if (f.energy < 150 || f.energy > 220) bad.push(`energy ${a}/${free}: ${f.energy}`);
      }
    expect(bad).toEqual([]);
  });

  it('gives about 200 MeV for a typical split', () => {
    const f = fission(95, 2);
    expect(f.after[0]).toEqual({ A: 95, Z: 37 });
    expect(f.after[1]).toEqual({ A: 139, Z: 55 });
    expect(f.energy).toBeGreaterThan(195);
    expect(f.energy).toBeLessThan(210);
  });
});

describe('fusion', () => {
  it('matches the known energies of the light reactions', () => {
    const [dt, dd, dhe] = FUSIONS.map(fusionOf);
    expect(dt.energy).toBeCloseTo(17.59, 2);
    expect(dd.energy).toBeCloseTo(3.27, 2);
    expect(dhe.energy).toBeCloseTo(18.35, 2);
    expect([dt, dd, dhe].every((f) => f.balanced)).toBe(true);
  });
});
