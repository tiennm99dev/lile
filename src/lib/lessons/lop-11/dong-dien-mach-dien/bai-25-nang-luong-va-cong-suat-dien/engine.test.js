import { describe, expect, it } from 'vitest';
import { energyKWh, jouleHeat, mainsCurrent, totalPower, waterRise } from './engine.js';

describe('household energy', () => {
  it('adds the powers of the devices that are on', () => {
    expect(totalPower([])).toBe(0);
    expect(totalPower(['tivi', 'quat'])).toBe(150);
    expect(totalPower(['am-dun', 'noi-com', 'den-led'])).toBe(2509);
  });

  it('counts kWh and the mains current', () => {
    expect(energyKWh(100, 5)).toBe(0.5);
    expect(energyKWh(1000, 0.25)).toBe(0.25);
    expect(mainsCurrent(440)).toBe(2);
  });
});

describe('Joule–Lenz heating', () => {
  it('gives Q = RI²t and warms water by Q/(mc)', () => {
    expect(jouleHeat(10, 1.5, 120)).toBe(2700);
    expect(jouleHeat(20, 2, 600)).toBe(48000);
    expect(waterRise(42000, 1)).toBe(10);
    expect(jouleHeat(10, 3, 60) / jouleHeat(10, 1.5, 60)).toBe(4);
  });
});
