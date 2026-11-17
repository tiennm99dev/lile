import { describe, expect, it } from 'vitest';
import { METALS, kindOf, lineResistance, transformer, transmit } from './engine.js';

describe('ideal transformer', () => {
  it('scales voltage with the turns and current inversely', () => {
    const t = transformer({ U1: 220, N1: 1000, N2: 50, R: 11, ac: true });
    expect(t.U2).toBeCloseTo(11, 12);
    expect(t.I2).toBeCloseTo(1, 12);
    expect(t.I1).toBeCloseTo(0.05, 12);
    expect(t.U2 * t.I2).toBeCloseTo(220 * t.I1, 12);
    expect(kindOf(1000, 50)).toBe('máy hạ áp');
    expect(kindOf(500, 2000)).toBe('máy tăng áp');
  });

  it('induces nothing from a direct current', () => {
    expect(transformer({ U1: 220, N1: 100, N2: 200, R: 10, ac: false })).toMatchObject({
      U2: 0,
      I2: 0,
      I1: 0,
    });
  });
});

describe('power line', () => {
  it('computes R = ρl/S over both wires', () => {
    expect(lineResistance(METALS.nhom.rho, 20, 100)).toBeCloseTo(11.2, 9);
  });

  it('cuts the heat loss n² times when the voltage rises n times', () => {
    const low = transmit({ P: 500e3, U: 5e3, R: 20 });
    expect(low.I).toBeCloseTo(100, 9);
    expect(low.loss).toBeCloseTo(200e3, 6);
    expect(low.efficiency).toBeCloseTo(0.6, 12);
    const high = transmit({ P: 500e3, U: 50e3, R: 20 });
    expect(low.loss / high.loss).toBeCloseTo(100, 9);
    expect(high.drop).toBeCloseTo(200, 9);
  });

  it('never loses more than it sends', () => {
    const t = transmit({ P: 1e6, U: 1e3, R: 50 });
    expect(t.loss).toBe(1e6);
    expect(t.delivered).toBe(0);
  });
});
