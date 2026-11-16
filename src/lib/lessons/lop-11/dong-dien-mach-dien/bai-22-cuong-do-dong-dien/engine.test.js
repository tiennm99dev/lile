import { describe, expect, it } from 'vitest';
import { CHARGE, WIRE, drift, makeCarriers, modelCurrent } from './engine.js';

describe('model wire', () => {
  it('spaces density carriers per cm on every lane', () => {
    const cs = makeCarriers(3, 2);
    expect(cs).toHaveLength(2 * 3 * WIRE);
    expect(cs.every((c) => c.x >= 0 && c.x < WIRE)).toBe(true);
  });

  it('counts S·n·v·Δt carriers through the section, so Δq/Δt = Snvq', () => {
    const misses = [];
    for (const [lanes, density, speed] of [
      [1, 1, 0.5],
      [2, 3, 1.5],
      [3, 4, 3],
      [2, 2, 2.5],
    ]) {
      let cs = makeCarriers(density, lanes, 5);
      let passed = 0;
      // Two seconds of frames of uneven length.
      let t = 0;
      for (let i = 0; t < 2 - 1e-12; i++) {
        const dt = Math.min(i % 2 ? 1 / 60 : 1 / 45, 2 - t);
        const step = drift(cs, speed * dt);
        cs = step.carriers;
        passed += step.passed;
        t += dt;
      }
      const expected = lanes * density * speed * 2;
      if (passed !== expected) misses.push({ lanes, density, speed, passed, expected });
      if (Math.abs((passed * CHARGE) / 2 - modelCurrent(lanes, density, speed)) > 1e-9)
        misses.push({ current: true, lanes });
    }
    expect(misses).toEqual([]);
  });
});
