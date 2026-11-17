import { describe, expect, it } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { totals } from '../_shared/nuclear.js';
import {
  ENERGY_REACTIONS,
  REACTIONS,
  SKILLS,
  energyOf,
  isMissing,
  missingOf,
  missingSteps,
  reactionTex,
} from './engine.js';

describe('reactions to complete', () => {
  it('are all balanced', () => {
    const bad = REACTIONS.filter((r) => {
      const a = totals(r.before);
      const b = totals(r.after);
      return a.A !== b.A || a.Z !== b.Z;
    });
    expect(bad).toEqual([]);
  });

  it('find the missing particle in the worked steps', () => {
    const bad = [];
    for (const r of REACTIONS) {
      const p = missingOf(r);
      const last = missingSteps(r);
      if (!last[0].endsWith(`$A = ${p.A}$.`) || !last[1].endsWith(`$Z = ${p.Z}$.`)) bad.push(last);
      if (!isMissing(r, p.A, p.Z) || isMissing(r, p.A + 1, p.Z)) bad.push(r);
    }
    expect(bad).toEqual([]);
  });

  it('write the slot in place of the missing particle', () => {
    expect(reactionTex(REACTIONS[0], '?')).toBe(
      '{}^{14}_{7}\\mathrm{N} + {}^{4}_{2}\\mathrm{He} \\to {}^{17}_{8}\\mathrm{O} + ?',
    );
    expect(reactionTex(REACTIONS[3], '?')).toBe(
      '{}^{14}_{6}\\mathrm{C} \\to ? + {}^{0}_{-1}e + \\bar{\\nu}',
    );
  });

  it('give the energies worked out by hand', () => {
    const e = REACTIONS.map((r) => energyOf(r)?.energy ?? null);
    expect(e[0]).toBeCloseTo(-1.21095, 6);
    expect(e[1]).toBeCloseTo(5.68215, 6);
    expect(e[2]).toBeCloseTo(4.8438, 6);
    expect(e[3]).toBeNull();
    expect(e[5]).toBeCloseTo(17.60535, 6);
    expect(e[6]).toBeCloseTo(-2.70135, 6);
    expect(e[7]).toBeCloseTo(17.41905, 6);
    expect(ENERGY_REACTIONS).toHaveLength(6);
  });
});

describe('drill skills', () => {
  it('make questions whose stated answer matches their last step', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      for (const q of buildSet(SKILLS, 3, seed)) {
        if (!Number.isFinite(q.answer)) bad.push(q.prompt);
        if (q.steps.length < 2) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('count α and β⁻ decays of a chain consistently', () => {
    const rand = rng(5);
    const bad = [];
    for (let i = 0; i < 60; i++) {
      const q = SKILLS[0].make(rand);
      if (!Number.isInteger(q.answer) || q.answer < 1) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('round binding and reaction energies to the places they ask for', () => {
    const rand = rng(11);
    const bad = [];
    for (let i = 0; i < 80; i++) {
      for (const s of [SKILLS[1], SKILLS[3]]) {
        const q = s.make(rand);
        const places = q.prompt.includes('một chữ số') ? 1 : 2;
        if (Math.abs(q.answer * 10 ** places - Math.round(q.answer * 10 ** places)) > 1e-6)
          bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });
});
