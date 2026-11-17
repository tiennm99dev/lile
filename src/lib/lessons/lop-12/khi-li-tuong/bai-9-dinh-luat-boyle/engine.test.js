import { describe, expect, it } from 'vitest';
import { constantAt, isotherm, readingAt, record, spreadOf } from './engine.js';

describe("Boyle's syringe", () => {
  it('reads 1 × 10⁵ Pa at 30 cm³ and 300 K and doubles at half the volume', () => {
    expect(readingAt(30, 300)).toBe(1);
    expect(readingAt(15, 300)).toBe(2);
    expect(readingAt(20, 300)).toBe(1.5);
  });

  it('keeps pV constant to the gauge precision on each isotherm', () => {
    const table = [10, 13, 17, 22, 29, 35, 40].reduce(
      (t, v) => record(t, { volume: v, pressure: readingAt(v, 300), kelvin: 300 }),
      /** @type {import('./engine.js').Reading[]} */ ([]),
    );
    expect(spreadOf(table, 300)).toBeLessThan(0.01);
  });

  it('puts the warmer isotherm above the cooler one', () => {
    expect(constantAt(400)).toBeGreaterThan(constantAt(300));
    const warm = isotherm(400);
    const cool = isotherm(300);
    expect(warm.every((p, i) => p.y > cool[i].y)).toBe(true);
  });

  it('replaces a repeated reading and sorts the table', () => {
    let t = record([], { volume: 20, pressure: 1.5, kelvin: 300 });
    t = record(t, { volume: 10, pressure: 3, kelvin: 300 });
    t = record(t, { volume: 20, pressure: 1.5, kelvin: 300 });
    expect(t.map((r) => r.volume)).toEqual([10, 20]);
  });
});
