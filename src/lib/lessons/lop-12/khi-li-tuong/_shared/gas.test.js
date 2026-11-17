import { describe, expect, it } from 'vitest';
import { K_B, N_A, R, curve, pressureOf, toKelvin } from './gas.js';

describe('ideal gas helpers', () => {
  it('keeps k = R / N_A to the precision the book prints', () => {
    expect(R / N_A / K_B).toBeCloseTo(1, 2);
  });

  it('converts Celsius to Kelvin the book way', () => {
    expect(toKelvin(27)).toBe(300);
    expect(toKelvin(-273)).toBe(0);
  });

  it('gives about one atmosphere for one mole at 0 °C in 22,4 litres', () => {
    expect(pressureOf(1, 22.4e-3, 273)).toBeCloseTo(1.013e5, -3);
  });

  it('samples a curve from end to end', () => {
    const pts = curve((x) => 2 * x, 0, 10, 5);
    expect(pts).toHaveLength(6);
    expect(pts[5]).toEqual({ x: 10, y: 20 });
  });
});
