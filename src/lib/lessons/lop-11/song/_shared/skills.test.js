import { describe, expect, it } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { countMaxima, countMinima } from './interference.js';
import { INTERFERENCE_SKILL, STANDING_SKILL, WAVELENGTH_SKILL, WAVE_SKILLS } from './skills.js';

/** Numbers written in a prompt, decimal comma read as a point. */
const numbersIn = (/** @type {string} */ text) => {
  const found = [...text.matchAll(/\$(\d+(?:\{,\}\d+)?)\$/g)].map((m) =>
    Number(m[1].replace('{,}', '.')),
  );
  if (found.length < 2) throw new Error(`too few numbers in: ${text}`);
  return found;
};

describe('wave drill skills', () => {
  it('builds full sets with short exact answers', () => {
    const misses = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildSet(WAVE_SKILLS, 3, seed)) {
        const short = Number((q.answer * 100).toFixed(6)) % 1 === 0;
        if (!(q.answer > 0) || !short || q.steps.length === 0) misses.push(q);
      }
    }
    expect(misses).toEqual([]);
  });

  it('recomputes every answer from the numbers in its prompt', () => {
    const misses = [];
    for (let seed = 1; seed <= 60; seed++) {
      const rand = rng(seed);
      const w = WAVELENGTH_SKILL.make(rand);
      const [a, b, c] = numbersIn(w.prompt);
      // gợn lồi: n crests over d cm at f Hz; else f Hz at v m/s.
      const wExpect = w.unit === 'cm/s' ? (b / (a - 1)) * c : (b / a) * 100;
      if (Math.abs(wExpect - w.answer) > 1e-9) misses.push(w);

      const g = INTERFERENCE_SKILL.make(rand);
      const nums = numbersIn(g.prompt);
      if (g.prompt.includes('bậc')) {
        const [f, v, d1, d2] = nums;
        if (Math.abs((d2 - d1) / (v / f) - g.answer) > 1e-9) misses.push(g);
      } else {
        const [a2, f, v] = nums;
        const want = g.prompt.includes('cực tiểu')
          ? countMinima(a2, v / f)
          : countMaxima(a2, v / f);
        if (want !== g.answer) misses.push(g);
      }

      const s = STANDING_SKILL.make(rand);
      const [l, x, y] = numbersIn(s.prompt);
      if (s.unit === 'm/s') {
        // l cm, x bụng, y Hz.
        if (Math.abs(((2 * l) / x / 100) * y - s.answer) > 1e-9) misses.push(s);
      } else {
        // l cm, f = x Hz, v = y m/s: 2k + 1 = 4l/λ.
        const lambda = (y / x) * 100;
        if (Math.abs(((4 * l) / lambda + 1) / 2 - s.answer) > 1e-9) misses.push(s);
      }
    }
    expect(misses).toEqual([]);
  });
});
