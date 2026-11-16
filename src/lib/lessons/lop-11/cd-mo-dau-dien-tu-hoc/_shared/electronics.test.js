import { describe, expect, it } from 'vitest';
import {
  SUPPLY,
  dividerOut,
  ldrResistance,
  luxAt,
  luxText,
  ntcResistance,
  ohmText,
  opampOut,
  saturate,
} from './electronics.js';

describe('sensors', () => {
  it('gives the LDR a resistance that falls as the light grows', () => {
    expect(ldrResistance(10)).toBeCloseTo(20000, 6);
    expect(ldrResistance(1)).toBeCloseTo(100237, 0);
    expect(ldrResistance(1000)).toBeCloseTo(796, 0);
    expect(ldrResistance(0)).toBe(ldrResistance(1));
    expect(ldrResistance(500)).toBeLessThan(ldrResistance(50));
  });

  it('gives the NTC thermistor a resistance that falls as it warms', () => {
    expect(ntcResistance(25)).toBeCloseTo(10000, 6);
    expect(ntcResistance(0)).toBeCloseTo(33620, -2);
    expect(ntcResistance(100)).toBeCloseTo(697, -1);
    expect(ntcResistance(70)).toBeLessThan(ntcResistance(30));
  });
});

describe('potential divider', () => {
  it('takes the voltage across the lower resistor', () => {
    expect(dividerOut(12, 10000, 20000)).toBe(8);
    expect(dividerOut(9, 3000, 6000)).toBe(6);
    expect(dividerOut(12, 5000, 5000)).toBe(6);
  });
});

describe('op-amp', () => {
  it('compares its two inputs and saturates', () => {
    expect(opampOut('comparator', { uin: 2, uref: 1.5 }).out).toBe(SUPPLY);
    expect(opampOut('comparator', { uin: 1, uref: 1.5 }).out).toBe(-SUPPLY);
    expect(opampOut('comparator', { uin: 1.5, uref: 1.5 }).out).toBe(0);
  });

  it('amplifies with −Rf/R1 and 1 + Rf/R1 up to the supply', () => {
    const inv = opampOut('inverting', { uin: 0.5, r1: 10, rf: 100 });
    expect(inv).toEqual({ gain: -10, ideal: -5, out: -5, saturated: false });
    const non = opampOut('non-inverting', { uin: 0.5, r1: 10, rf: 40 });
    expect(non).toEqual({ gain: 5, ideal: 2.5, out: 2.5, saturated: false });
    const big = opampOut('inverting', { uin: -2, r1: 10, rf: 100 });
    expect(big).toEqual({ gain: -10, ideal: 20, out: SUPPLY, saturated: true });
    expect(saturate(-30)).toBe(-SUPPLY);
  });
});

describe('text', () => {
  it('writes resistances and illuminances the book way', () => {
    expect(ohmText(160)).toBe('160 Ω');
    expect(ohmText(8040)).toBe('8,04 kΩ');
    expect(ohmText(32500)).toBe('32,5 kΩ');
    expect(ohmText(100237)).toBe('100 kΩ');
    expect(ohmText(1.2e6)).toBe('1,2 MΩ');
    expect(luxAt(0)).toBe(1);
    expect(luxAt(30)).toBe(1000);
    expect(luxText(luxAt(5))).toBe('3,2 lx');
    expect(luxText(250)).toBe('250 lx');
  });
});
