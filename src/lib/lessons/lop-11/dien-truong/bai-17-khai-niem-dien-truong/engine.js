/**
 * The electric field of point charges on a board in centimetres, charges in
 * nanocoulombs: the field vector at a test point with each charge's part,
 * the force on a test charge, and field lines drawn with a number of lines
 * proportional to each charge.
 */
import { tidy } from '#lib/core/number-format.js';
import { traceFieldLine } from '#lib/domain/vector-field.js';
import { fieldAt } from '../_shared/charges.js';

/** @typedef {{ x: number, y: number, q: number }} Placed position in cm, charge in nC */
/** @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Bounds */

const NC = 1e-9;
const CM = 1e-2;

/** @param {Placed} c */
const si = (c) => ({ x: c.x * CM, y: c.y * CM, q: c.q * NC });

/**
 * Field at p (cm) in V/m: the total and the part of each charge.
 * @param {Placed[]} charges @param {{ x: number, y: number }} p
 */
export function probeField(charges, p) {
  const at = { x: p.x * CM, y: p.y * CM };
  const parts = charges.map((c) => fieldAt([si(c)], at));
  const total = parts.reduce((s, f) => ({ x: s.x + f.x, y: s.y + f.y }), { x: 0, y: 0 });
  return {
    parts,
    total,
    size: tidy(Math.hypot(total.x, total.y), 9),
  };
}

/**
 * Force on a test charge q (nC) in the field E (V/m), F = qE, in N.
 * @param {number} q @param {{ x: number, y: number }} e
 */
export const forceOnTest = (q, e) => ({ x: q * NC * e.x, y: q * NC * e.y });

/**
 * Number of field lines drawn from a charge: six per nanocoulomb, so a
 * charge twice as big gets twice as many lines.
 * @param {number} q nC
 */
export const lineCount = (q) => Math.min(24, Math.round(6 * Math.abs(q)));

/**
 * Field lines in cm: out of every positive charge, or, when there is none,
 * traced backwards into every negative one. Each line is a list of points
 * with its direction of travel along the field.
 * @param {Placed[]} charges @param {Bounds} bounds
 * @returns {Array<Array<{ x: number, y: number }>>}
 */
export function fieldLines(charges, bounds) {
  const sources = charges.map((c) => ({ x: c.x, y: c.y, strength: c.q }));
  const positive = sources.filter((s) => s.strength > 0);
  const out = positive.length > 0;
  const seeds = out ? positive : sources.filter((s) => s.strength < 0);
  const r = 0.4;
  const step = out ? 0.15 : -0.15;
  return seeds.flatMap((s, order) => {
    const n = lineCount(s.strength);
    return Array.from({ length: n }, (_, k) => {
      const a = (2 * Math.PI * (k + 0.5 * (order % 2))) / n;
      const start = { x: s.x + r * Math.cos(a), y: s.y + r * Math.sin(a) };
      const line = traceFieldLine(sources, start, { bounds, step, maxSteps: 260, stopRadius: r });
      return out ? line : line.reverse();
    });
  });
}

/**
 * Where to put a direction arrow on a field line: a point near its middle
 * and the unit direction there (along the field).
 * @param {Array<{ x: number, y: number }>} line
 */
export function midArrow(line) {
  if (line.length < 4) return null;
  const i = Math.floor(line.length / 2);
  const a = line[i - 1];
  const b = line[i];
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  if (d === 0) return null;
  return { at: b, dir: { x: (b.x - a.x) / d, y: (b.y - a.y) / d } };
}
