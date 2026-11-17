import { describe, expect, it } from 'vitest';
import {
  CYST,
  RIB,
  ROWS,
  aTrace,
  brightness,
  depthFromTime,
  impedance,
  mediumAt,
  reflectance,
  scanColumn,
} from './engine.js';

describe('reflection at a boundary', () => {
  it('uses Z = ρv and R = ((Z2 − Z1)/(Z2 + Z1))²', () => {
    expect(impedance('muscle')).toBeCloseTo(1.6906, 4);
    expect(reflectance(1, 3)).toBeCloseTo(0.25, 12);
    expect(reflectance(2, 2)).toBe(0);
    expect(reflectance(impedance('muscle'), impedance('bone'))).toBeGreaterThan(0.4);
    expect(reflectance(impedance('air'), impedance('fat'))).toBeGreaterThan(0.99);
  });

  it('turns echo time into depth with d = vt/2', () => {
    expect(depthFromTime(65)).toBeCloseTo(5.005, 6);
  });
});

describe('scanning a column', () => {
  it('finds the cyst walls at their depths and nothing inside the cyst', () => {
    const { echoes, rows } = scanColumn(CYST.x, true);
    const walls = echoes.filter((e) => e.to === 'fluid' || e.from === 'fluid');
    expect(walls).toHaveLength(2);
    expect(walls[0].z).toBeCloseTo(CYST.z - CYST.r, 1);
    expect(walls[1].z).toBeCloseTo(CYST.z + CYST.r, 1);
    expect(depthFromTime(walls[0].t)).toBeCloseTo(walls[0].z, 0);
    const inside = Math.floor(((CYST.z + 0.3) / 12) * ROWS);
    expect(rows[inside]).toBe(0);
  });

  it('casts a shadow behind a rib', () => {
    expect(mediumAt(RIB.x, RIB.z)).toBe('bone');
    const { echoes, rows } = scanColumn(RIB.x, true);
    expect(echoes.some((e) => e.to === 'bone' && e.I > 0.3)).toBe(true);
    expect(rows.slice(Math.floor(ROWS / 2)).every((b) => b === 0)).toBe(true);
  });

  it('sends almost nothing into the body without gel', () => {
    const dry = scanColumn(4, false);
    expect(dry.echoes[0].I).toBeGreaterThan(0.99);
    expect(dry.rows.slice(5).every((b) => b === 0)).toBe(true);
    const wet = scanColumn(4, true);
    expect(wet.rows.slice(5).every((b) => b > 0)).toBe(true);
  });

  it('draws the A-mode trace with a peak at each echo time', () => {
    const { echoes } = scanColumn(RIB.x, true);
    const bone = echoes.find((e) => e.to === 'bone');
    const trace = aTrace(echoes, 160);
    const near = trace.reduce((a, p) =>
      Math.abs(p.x - (bone?.t ?? 0)) < Math.abs(a.x - (bone?.t ?? 0)) ? p : a,
    );
    expect(near.y).toBeGreaterThan(0.9);
    expect(brightness(1e-6)).toBe(0);
    expect(brightness(1)).toBe(1);
  });
});
