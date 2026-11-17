import { describe, expect, it } from 'vitest';
import { fitLine, ratioOf, record, volumeAt } from './engine.js';

/** @param {number} pressure @param {number[]} temps */
function tableAt(pressure, temps) {
  return temps.reduce(
    (t, c) => record(t, { celsius: c, volume: volumeAt(c, pressure), pressure }),
    /** @type {import('./engine.js').Reading[]} */ ([]),
  );
}

describe("Charles's cylinder", () => {
  it('holds 30 cm³ at 27 °C and 1 × 10⁵ Pa, half as much at twice the pressure', () => {
    expect(volumeAt(27, 1)).toBe(30);
    expect(volumeAt(27, 2)).toBe(15);
    expect(volumeAt(127, 1)).toBe(40);
  });

  it('keeps V/T constant at constant pressure', () => {
    const ratios = tableAt(1, [-50, 0, 40, 100, 150]).map(ratioOf);
    const off = ratios.filter((r) => Math.abs(r - 0.1) > 0.001);
    expect(off).toEqual([]);
  });

  it('extrapolates the volume line to zero near −273 °C', () => {
    const fit = fitLine(tableAt(1, [-40, 10, 60, 110]), 1);
    expect(fit?.zero).toBeCloseTo(-273, 0);
    const fit2 = fitLine(tableAt(2, [0, 50, 100]), 2);
    expect(Math.abs((fit2?.zero ?? 0) + 273)).toBeLessThan(3);
  });

  it('needs two temperatures for a line', () => {
    expect(fitLine(tableAt(1, [20]), 1)).toBeNull();
  });
});
