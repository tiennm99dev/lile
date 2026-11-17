import { describe, expect, it } from 'vitest';
import { kindOf, lineLoss, secondaryVoltage } from './engine.js';

describe('the ideal transformer', () => {
  it('scales the voltage by the turns ratio', () => {
    expect(secondaryVoltage(220, 1000, 50)).toBe(11);
    expect(secondaryVoltage(220, 500, 1000)).toBe(440);
    expect(kindOf(1000, 50)).toBe('ha');
    expect(kindOf(500, 1000)).toBe('tang');
    expect(kindOf(400, 400)).toBe('giu');
  });

  it('gives nothing on direct current', () => {
    expect(secondaryVoltage(220, 500, 1000, false)).toBe(0);
  });
});

describe('transmission losses', () => {
  it('fall with the square of the voltage', () => {
    const low = lineLoss(500e3, 5e3, 20);
    const high = lineLoss(500e3, 10e3, 20);
    expect(low.I).toBe(100);
    expect(low.loss).toBe(200e3);
    expect(high.loss).toBe(50e3);
    expect(low.loss / high.loss).toBe(4);
    expect(high.efficiency).toBe(0.9);
    expect(high.drop).toBe(1000);
  });
});
