import { describe, expect, it } from 'vitest';
import {
  beamPower,
  electronEnergy,
  electronSpeed,
  lambdaMin,
  meanEnergy,
  transmitted,
  wavelengthCurve,
} from './engine.js';

describe('electrons in the tube', () => {
  it('gains eU and the speed from ½mv² = eU', () => {
    expect(electronEnergy(20e3)).toBeCloseTo(3.2e-15, 25);
    expect(electronSpeed(10e3) / 1e7).toBeCloseTo(5.93, 2);
    expect(electronSpeed(1.44 * 5000) / electronSpeed(5000)).toBeCloseTo(1.2, 12);
  });

  it('gives a shortest wavelength inversely proportional to U', () => {
    expect(lambdaMin(50)).toBeCloseTo(0.0248, 4);
    expect(lambdaMin(100) * 2).toBeCloseTo(lambdaMin(50), 12);
  });
});

describe('spectrum and penetration', () => {
  const tube = { kV: 60, mA: 5, filterMm: 0 };

  it('starts at λ_min and scales with the tube current', () => {
    const curve = wavelengthCurve(tube, 0.15);
    expect(curve[0].x).toBeCloseTo(lambdaMin(60), 6);
    expect(curve[0].y).toBeCloseTo(0, 6);
    expect(beamPower({ ...tube, mA: 10 }) / beamPower(tube)).toBeCloseTo(2, 9);
  });

  it('hardens the beam with a higher voltage or a filter', () => {
    expect(meanEnergy({ ...tube, kV: 100 })).toBeGreaterThan(meanEnergy(tube));
    expect(meanEnergy({ ...tube, filterMm: 2 })).toBeGreaterThan(meanEnergy(tube));
    expect(transmitted({ ...tube, kV: 100 }, 'mo-mem', 5)).toBeGreaterThan(
      transmitted(tube, 'mo-mem', 5),
    );
  });

  it('lets more through soft tissue than bone, almost nothing through lead', () => {
    const soft = transmitted(tube, 'mo-mem', 1);
    const bone = transmitted(tube, 'xuong', 1);
    expect(soft).toBeGreaterThan(bone);
    expect(transmitted(tube, 'chi', 0.05)).toBeLessThan(0.01);
    expect(transmitted(tube, 'mo-mem', 1)).toBeCloseTo(
      transmitted({ ...tube, mA: 9 }, 'mo-mem', 1),
      12,
    );
  });
});
