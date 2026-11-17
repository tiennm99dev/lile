import { describe, expect, it } from 'vitest';
import { carriers, photoDensity, relativeResistance, thermalDensity } from './engine.js';

const dark = (/** @type {number} */ T) => ({ T, photonEv: 0, light: 0 });

describe('carriers across the gap', () => {
  it('gives silicon about 10¹⁰ cm⁻³ at 300 K and far more in germanium', () => {
    const si = thermalDensity(1.12, 300);
    expect(si).toBeGreaterThan(5e9);
    expect(si).toBeLessThan(2e10);
    expect(thermalDensity(0.66, 300)).toBeGreaterThan(1000 * si);
    expect(thermalDensity(5.5, 300)).toBeLessThan(1e-20);
  });

  it('lets only photons with hf ≥ E_g lift electrons', () => {
    expect(photoDensity(1.12, 0.9, 1)).toBe(0);
    expect(photoDensity(1.12, 1.9, 1)).toBeGreaterThan(0);
    expect(photoDensity(0.66, 0.9, 0.5)).toBe(photoDensity(0.66, 0.9, 1) / 2);
  });
});

describe('resistance', () => {
  it('falls with temperature in a semiconductor and rises in a metal', () => {
    expect(relativeResistance('silic', dark(300))).toBeCloseTo(1, 12);
    expect(relativeResistance('silic', dark(350))).toBeLessThan(0.1);
    expect(relativeResistance('dong', dark(400))).toBeCloseTo(1.43, 9);
    expect(carriers('dong', dark(400))).toBe(carriers('dong', dark(300)));
  });

  it('falls under suitable light, like a photoresistor', () => {
    const lit = { T: 300, photonEv: 1.9, light: 1 };
    expect(relativeResistance('silic', lit)).toBeLessThan(0.001);
    expect(relativeResistance('kim-cuong', lit)).toBeCloseTo(1, 12);
    expect(relativeResistance('kim-cuong', { ...lit, photonEv: 6 })).toBeLessThan(1e-20);
  });
});
