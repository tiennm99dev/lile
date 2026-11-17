import { describe, expect, it } from 'vitest';
import {
  DPHI_OPTIONS,
  TASKS,
  characteristics,
  checkReading,
  relationPlain,
  relationText,
  rmsText,
} from './engine.js';

describe('characteristic values', () => {
  it('gives ω, T, the effective values and the phase difference', () => {
    const c = characteristics({ U0: 3, I0: 0.3, f: 50, phiU: Math.PI / 2, phiI: Math.PI / 2 });
    expect(c.omega).toBeCloseTo(100 * Math.PI, 9);
    expect(c.T).toBeCloseTo(0.02, 12);
    expect(c.U).toBeCloseTo(2.1213, 4);
    expect(c.I).toBeCloseTo(0.2121, 4);
    expect(c.dphi).toBe(0);
    expect(rmsText(3)).toBe('2,12');
  });

  it('says which of u and i leads, and by how long', () => {
    expect(relationText(Math.PI / 3)).toBe('$u$ sớm pha $\\frac{\\pi}{3}$ so với $i$');
    expect(relationText(-Math.PI / 2)).toBe('$u$ trễ pha $\\frac{\\pi}{2}$ so với $i$ (vuông pha)');
    expect(relationText(Math.PI)).toBe('$u$ và $i$ ngược pha');
    expect(relationPlain(2 * Math.PI)).toBe('u và i cùng pha');
    expect(relationPlain(-Math.PI / 3)).toBe('u trễ pha π/3 so với i');
    const c = characteristics({ U0: 1, I0: 1, f: 50, phiU: 0, phiI: -Math.PI / 2 });
    expect(c.lag).toBeCloseTo(0.005, 12);
  });
});

describe('reading tasks', () => {
  it('has a matching option for every task and accepts the right reading', () => {
    const bad = [];
    for (const task of TASKS) {
      const c = characteristics(task);
      const pick = DPHI_OPTIONS.findIndex((d) => Math.abs(d - c.dphi) < 1e-9);
      const r = checkReading(task, { U: Math.round(c.U * 100) / 100, f: task.f, pick });
      if (pick < 0 || !r.all) bad.push(task);
    }
    expect(bad).toEqual([]);
  });

  it('flags a peak read as the effective value and a wrong frequency', () => {
    const task = TASKS[0];
    const r = checkReading(task, { U: task.U0, f: 1 / 0.04, pick: 0 });
    expect(r).toMatchObject({ uOk: false, fOk: false, phiOk: false, all: false });
  });
});
