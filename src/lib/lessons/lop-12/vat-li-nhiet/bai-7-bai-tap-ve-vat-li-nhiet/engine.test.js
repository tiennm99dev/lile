import { describe, expect, it } from 'vitest';
import { isClose, mix, startHeat } from './engine.js';

describe('mixing two bodies in a calorimeter', () => {
  it('weights the temperatures by m·c when nothing changes state', () => {
    // 0,2 kg copper at 100 °C into 0,5 kg water at 20 °C.
    const r = mix(
      { substance: 'dong', mass: 0.2, temperature: 100 },
      { substance: 'nuoc', mass: 0.5, temperature: 20 },
    );
    expect(r.temperature).toBeCloseTo(49800 / 2178, 6);
    expect(r.heat).toBeCloseTo(0.2 * 390 * (100 - 49800 / 2178), 4);
    expect(r.hot.substance).toBe('dong');
  });

  it('melts all the ice when the water has heat to spare', () => {
    // 0,1 kg ice at −5 °C into 0,5 kg water at 40 °C.
    const r = mix(
      { substance: 'nuoc-da', mass: 0.1, temperature: -5 },
      { substance: 'nuoc', mass: 0.5, temperature: 40 },
    );
    expect(r.temperature).toBeCloseTo(49550 / 2520, 6);
    expect(r.iceLeft).toBe(0);
    expect(r.iceMelted).toBeCloseTo(0.1, 9);
    expect(r.heat).toBeCloseTo(0.5 * 4200 * (40 - 49550 / 2520), 4);
  });

  it('stops at 0 °C with ice left when the water runs out of heat', () => {
    // 0,2 kg ice at −10 °C into 0,3 kg water at 20 °C.
    const r = mix(
      { substance: 'nuoc-da', mass: 0.2, temperature: -10 },
      { substance: 'nuoc', mass: 0.3, temperature: 20 },
    );
    expect(r.temperature).toBe(0);
    expect(r.iceMelted).toBeCloseTo(21000 / 334000, 9);
    expect(r.heat).toBeCloseTo(25200, 6);
  });

  it('freezes some water when the ice is very cold', () => {
    // 0,5 kg ice at −20 °C into 0,1 kg water at 0 °C: 21 000 J needed, 33 400 J if all froze.
    const r = mix(
      { substance: 'nuoc-da', mass: 0.5, temperature: -20 },
      { substance: 'nuoc', mass: 0.1, temperature: 0 },
    );
    expect(r.temperature).toBe(0);
    expect(r.iceMelted).toBeCloseTo(-21000 / 334000, 9);
    expect(r.heat).toBeCloseTo(21000, 6);
  });

  it('freezes all the water and stays below 0 °C when the ice is cold and plentiful', () => {
    // 1 kg ice at −20 °C into 0,1 kg water at 0 °C: freezing gives 33 400 J, the ice needs 42 000 J.
    const r = mix(
      { substance: 'nuoc-da', mass: 1, temperature: -20 },
      { substance: 'nuoc', mass: 0.1, temperature: 0 },
    );
    expect(r.temperature).toBeCloseTo((33400 - 42000) / (1.1 * 2100), 6);
    expect(r.iceLeft).toBeCloseTo(1.1, 9);
  });

  it('goes below 0 °C when a cold metal meets ice', () => {
    const r = mix(
      { substance: 'nuoc-da', mass: 0.1, temperature: -20 },
      { substance: 'sat', mass: 0.5, temperature: 0 },
    );
    expect(r.temperature).toBeCloseTo(-4200 / 430, 6);
    expect(r.iceLeft).toBeCloseTo(0.1, 9);
  });

  it('keeps the total heat content', () => {
    const a = { substance: /** @type {const} */ ('nhom'), mass: 0.4, temperature: 90 };
    const b = { substance: /** @type {const} */ ('nuoc'), mass: 0.2, temperature: 10 };
    const r = mix(a, b);
    const after =
      startHeat({ ...a, temperature: r.temperature }) +
      startHeat({ ...b, temperature: r.temperature });
    expect(after).toBeCloseTo(startHeat(a) + startHeat(b), 6);
  });

  it('accepts predictions within half a degree', () => {
    expect(isClose(22.5, 22.865)).toBe(true);
    expect(isClose(22, 22.865)).toBe(false);
  });
});
