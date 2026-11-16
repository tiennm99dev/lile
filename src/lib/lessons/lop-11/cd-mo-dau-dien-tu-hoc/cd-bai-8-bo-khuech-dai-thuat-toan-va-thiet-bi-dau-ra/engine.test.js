import { describe, expect, it } from 'vitest';
import { devices, saturationInput, transferCurve } from './engine.js';

describe('transfer curve', () => {
  it('is a straight line through the origin clipped at the supply', () => {
    const pts = transferCurve('inverting', { r1: 10, rf: 100, usat: 12 }, -2, 2, 40);
    expect(pts).toHaveLength(41);
    expect(pts[0]).toEqual({ x: -2, y: 12 });
    expect(pts[20]).toEqual({ x: 0, y: 0 });
    expect(pts[21]).toEqual({ x: 0.1, y: -1 });
    expect(pts[40]).toEqual({ x: 2, y: -12 });
  });

  it('jumps between the two saturation levels for a comparator', () => {
    const pts = transferCurve('comparator', { uref: 0.5, usat: 12 }, -1, 1, 4);
    expect(pts.map((p) => p.y)).toEqual([-12, -12, -12, 0, 12]);
  });

  it('gives the input where an amplifier saturates', () => {
    expect(saturationInput(-10, 12)).toBe(1.2);
    expect(saturationInput(6, 12)).toBe(2);
  });
});

describe('output devices', () => {
  it('lights the LED and closes the relay only on a positive output', () => {
    expect(devices(12, 1000)).toEqual({ ledOn: true, ledCurrent: 0.01, relayClosed: true });
    expect(devices(-12, 1000)).toEqual({ ledOn: false, ledCurrent: 0, relayClosed: false });
    expect(devices(1, 1000).ledOn).toBe(false);
  });
});
