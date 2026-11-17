import { describe, expect, it } from 'vitest';
import {
  PUZZLES,
  answerTex,
  dragTo,
  driverOf,
  inRange,
  isClose,
  legPath,
  nudge,
  pointOf,
  reached,
  stateFrom,
} from './engine.js';

/** @param {import('./engine.js').State} s */
const ratio = (s) => (s.p * s.V) / s.T;

/** Walks a puzzle to its end, leg by leg. @param {import('./engine.js').Puzzle} puzzle */
function walk(puzzle) {
  const states = [puzzle.start];
  for (const leg of puzzle.legs) {
    states.push(stateFrom(leg.fixed, states[states.length - 1], leg.target.q, leg.target.value));
  }
  return states;
}

describe('state-change puzzles', () => {
  it('reach the answers worked out by hand', () => {
    const ends = PUZZLES.map((pz) => walk(pz).slice(1));
    expect(ends).toEqual([
      [
        { p: 300, V: 4, T: 300 },
        { p: 300, V: 8, T: 600 },
      ],
      [
        { p: 300, V: 6, T: 450 },
        { p: 200, V: 9, T: 450 },
      ],
      [
        { p: 150, V: 5, T: 200 },
        { p: 300, V: 5, T: 400 },
      ],
      [
        { p: 100, V: 12, T: 600 },
        { p: 50, V: 12, T: 300 },
      ],
    ]);
  });

  it('keep pV/T and every state on the graph', () => {
    const bad = PUZZLES.flatMap((pz) => {
      const states = walk(pz);
      const c = ratio(states[0]);
      return states.filter((s) => Math.abs(ratio(s) - c) > 1e-9 || !inRange(s));
    });
    expect(bad).toEqual([]);
  });

  it('hold the fixed quantity of every leg', () => {
    const bad = PUZZLES.flatMap((pz) => {
      const states = walk(pz);
      return pz.legs.filter((leg, i) => states[i][leg.fixed] !== states[i + 1][leg.fixed]);
    });
    expect(bad).toEqual([]);
  });
});

describe('dragging along a process', () => {
  const [first] = PUZZLES;
  const leg = first.legs[0];

  it('follows the vertical axis only for a vertical line', () => {
    expect(driverOf('T', 'pV')).toBe('x');
    expect(driverOf('T', 'pT')).toBe('y');
    expect(driverOf('T', 'VT')).toBe('y');
    expect(driverOf('V', 'pV')).toBe('y');
    expect(driverOf('V', 'pT')).toBe('x');
    expect(driverOf('p', 'VT')).toBe('x');
  });

  it('snaps the isotherm to the target from every view', () => {
    expect(dragTo(leg, first.start, 'pV', { x: 4.1, y: 0 })).toEqual({ p: 300, V: 4, T: 300 });
    expect(dragTo(leg, first.start, 'pT', { x: 0, y: 296 })?.V).toBeCloseTo(4, 9);
    expect(dragTo(leg, first.start, 'VT', { x: 999, y: 3.9 })?.V).toBe(4);
  });

  it('refuses a point off the graph', () => {
    expect(dragTo(leg, first.start, 'pV', { x: 0.2, y: 0 })).toBeNull();
    expect(dragTo(leg, first.start, 'pV', { x: -1, y: 0 })).toBeNull();
  });

  it('steps by key and knows when the leg is done', () => {
    let s = first.start;
    for (let i = 0; i < 16; i++) s = nudge(leg, first.start, s, -1) ?? s;
    expect(s.V).toBe(4);
    expect(reached(leg, s)).toBe(true);
    expect(reached(leg, first.start)).toBe(false);
  });

  it('draws an isochore as a vertical line on p–V', () => {
    const a = { p: 200, V: 6, T: 300 };
    const b = stateFrom('V', a, 'T', 450);
    const xs = new Set(legPath('V', a, b).map((s) => pointOf('pV', s).x));
    expect([...xs]).toEqual([6]);
  });
});

describe('checking answers', () => {
  it('accepts 1 % either side', () => {
    expect(isClose(301, 300)).toBe(true);
    expect(isClose(304, 300)).toBe(false);
  });
});

describe('worked answers', () => {
  it('put the numbers into the law', () => {
    const [pz] = PUZZLES;
    const s2 = stateFrom('T', pz.start, 'V', 4);
    expect(answerTex(pz.legs[0], pz.start, s2, 1, 2)).toBe(
      'p_2 = \\dfrac{p_1V_1}{V_2} = \\dfrac{100 \\cdot 12}{4} = 300',
    );
    const s3 = stateFrom('p', s2, 'T', 600);
    expect(answerTex(pz.legs[1], s2, s3, 2, 3)).toBe(
      'V_3 = \\dfrac{V_2T_3}{T_2} = \\dfrac{4 \\cdot 600}{300} = 8',
    );
  });
});
