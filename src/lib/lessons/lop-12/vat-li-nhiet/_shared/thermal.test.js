import { describe, expect, it } from 'vitest';
import { curvePoints, energyBefore, sciTex, stageAt, totalEnergy } from './thermal.js';

/** @type {import('./thermal.js').Stage[]} */
const ICE = [
  { kind: 'warm', from: -10, to: 0, perDegree: 420, phase: 'rắn' },
  { kind: 'change', at: 0, energy: 66800, from: 'rắn', to: 'lỏng' },
  { kind: 'warm', from: 0, to: 40, perDegree: 836, phase: 'lỏng' },
];

describe('heating curve', () => {
  it('adds up the energy of the stages', () => {
    expect(totalEnergy(ICE)).toBe(4200 + 66800 + 33440);
    expect(energyBefore(ICE, 1)).toBe(4200);
    expect(energyBefore(ICE, 2)).toBe(71000);
  });

  it('finds the stage and temperature for an energy', () => {
    expect(stageAt(ICE, 0).temperature).toBe(-10);
    expect(stageAt(ICE, 2100).temperature).toBe(-5);
    const melting = stageAt(ICE, 4200 + 33400);
    expect(melting.index).toBe(1);
    expect(melting.progress).toBeCloseTo(0.5, 9);
    expect(melting.temperature).toBe(0);
    expect(stageAt(ICE, 71000 + 8360).temperature).toBeCloseTo(10, 9);
    expect(stageAt(ICE, 1e9).temperature).toBe(40);
  });

  it('draws the corners at a constant power', () => {
    expect(curvePoints(ICE, 200)).toEqual([
      { x: 0, y: -10 },
      { x: 21, y: 0 },
      { x: 355, y: 0 },
      { x: 522.2, y: 40 },
    ]);
  });
});

describe('scientific notation', () => {
  it('writes the book way', () => {
    expect(sciTex(3.34e5)).toBe('3{,}34 \\cdot 10^{5}');
    expect(sciTex(2.26e6, 2)).toBe('2{,}26 \\cdot 10^{6}');
    expect(sciTex(4180)).toBe('4\\,180');
    expect(sciTex(0.25e5)).toBe('2{,}5 \\cdot 10^{4}');
    expect(sciTex(99999.9, 2)).toBe('1 \\cdot 10^{5}');
  });
});
