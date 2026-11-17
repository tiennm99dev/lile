import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  METALS,
  freeElectron,
  photocurrent,
  photoelectric,
  reachesAnode,
  stepElectron,
  workFunctionEv,
} from './engine.js';

const J = 1.6e-19;

describe('work function and the photoelectric condition', () => {
  it('gives A = hc/λ₀ as in the book', () => {
    expect(workFunctionEv('dong') * J).toBeCloseTo(6.625e-19, 30);
    expect((workFunctionEv('kem') * J) / 1e-19).toBeCloseTo(5.68, 2);
    expect(METALS.every((m, i) => i === 0 || m.lambda0 < METALS[i - 1].lambda0)).toBe(true);
  });

  it('frees electrons only for λ ≤ λ₀, whatever the light', () => {
    expect(photoelectric(400, 'kem').emits).toBe(false);
    expect(photoelectric(350, 'kem').emits).toBe(true);
    expect(photoelectric(500, 'xesi').emits).toBe(true);
    expect(photoelectric(400, 'kem').wMax).toBe(0);
  });

  it('follows Einstein: hf = A + W_đmax = A + eU_h', () => {
    const e = photoelectric(250, 'dong');
    expect(e.eps).toBeCloseTo(e.A + e.wMax, 12);
    expect(e.Uh).toBeCloseTo(4.96875 - 4.140625, 9);
    expect(e.vMax).toBeCloseTo(Math.sqrt((2 * e.wMax * J) / 9.1e-31), 3);
  });
});

describe('photocurrent', () => {
  const e = photoelectric(300, 'kali');

  it('saturates at N·e and vanishes at −U_h', () => {
    expect(photocurrent(2, 1e13, e)).toBeCloseTo(1.6e-6, 15);
    expect(photocurrent(0, 1e13, e)).toBeCloseTo(1.6e-6, 15);
    expect(photocurrent(-e.Uh, 1e13, e)).toBe(0);
    expect(photocurrent(-e.Uh / 2, 1e13, e)).toBeCloseTo(1.2e-6, 15);
    expect(photocurrent(2, 1e13, photoelectric(700, 'kali'))).toBe(0);
  });

  it('scales with the number of photons but U_h does not', () => {
    expect(photocurrent(1, 3e13, e) / photocurrent(1, 1e13, e)).toBeCloseTo(3, 12);
  });
});

describe('electrons crossing the gap', () => {
  it('matches the current model: the share that reaches the anode', () => {
    const rand = rng(7);
    const U = -e2().Uh / 2;
    const n = 4000;
    let arrived = 0;
    for (let i = 0; i < n; i += 1) {
      const el = freeElectron(rand, e2().wMax, 0.5);
      let end = null;
      for (let k = 0; k < 2000 && !end; k += 1) end = stepElectron(el, U, 0.02);
      if (end === 'anode') arrived += 1;
      if ((end === 'anode') !== reachesAnode(el.w, U)) arrived = NaN;
    }
    expect(arrived / n).toBeCloseTo(0.75, 1);
  });
});

function e2() {
  return photoelectric(300, 'kali');
}
