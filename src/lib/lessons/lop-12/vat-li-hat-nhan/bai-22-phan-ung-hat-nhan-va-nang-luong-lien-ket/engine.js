/**
 * The binding-energy curve of the lesson on nuclear reactions: the line
 * drawn through real nuclides, a fission of uranium-235 into two fragments
 * read off the curve, and three fusion reactions of light nuclei. A
 * reaction gives out the binding energy it gains,
 * Q = ΣA·ε (after) − ΣA·ε (before); free neutrons and protons have ε = 0.
 */
import { tidy } from '#lib/core/number-format.js';
import { CURVE, epsAt, epsOf, totals } from '../_shared/nuclear.js';

/** Points of the drawn curve: the light nuclides one by one, then the smooth part. */
export function curveLine() {
  const light = CURVE.filter((p) => p.A < 12 && !(p.A === 3 && p.Z === 2));
  /** @type {Array<{ x: number, y: number }>} */
  const pts = light.map((p) => ({ x: p.A, y: p.eps }));
  for (let A = 12; A <= 238; A += 2) pts.push({ x: A, y: epsAt(A) });
  return pts;
}

/**
 * Binding energy per nucleon of a particle: from the table, 0 for a free
 * nucleon, else read off the smooth curve.
 * @param {number} A @param {number} Z
 */
export function epsFor(A, Z) {
  if (A <= 1) return 0;
  return epsOf(A, Z) ?? epsAt(A);
}

/**
 * Binding energy gained by a reaction, in MeV.
 * @param {ReadonlyArray<import('../_shared/nuclear.js').Particle>} before
 * @param {ReadonlyArray<import('../_shared/nuclear.js').Particle>} after
 */
export function energyGain(before, after) {
  /** @param {ReadonlyArray<import('../_shared/nuclear.js').Particle>} side */
  const sum = (side) => side.reduce((s, p) => s + (p.count ?? 1) * p.A * epsFor(p.A, p.Z), 0);
  return tidy(sum(after) - sum(before), 3);
}

/** The fissioning nucleus: uranium-235 hit by a slow neutron. */
export const PARENT = { A: 235, Z: 92 };

/**
 * A fission of uranium-235 by a neutron into a light fragment of mass
 * number `light` and a heavy one, with `free` neutrons set loose. The 92
 * protons are shared in proportion to the nucleons.
 * @param {number} light @param {number} free
 */
export function fission(light, free) {
  const rest = PARENT.A + 1 - free;
  const heavy = rest - light;
  const z1 = Math.round((PARENT.Z * light) / rest);
  const before = [PARENT, { A: 1, Z: 0 }];
  const after = [
    { A: light, Z: z1 },
    { A: heavy, Z: PARENT.Z - z1 },
    { A: 1, Z: 0, count: free },
  ];
  return { before, after, energy: energyGain(before, after) };
}

/** Light fragment range of the slider. */
export const LIGHT_MIN = 85;
export const LIGHT_MAX = 118;

/** @typedef {{ id: string, label: string, before: import('../_shared/nuclear.js').Particle[], after: import('../_shared/nuclear.js').Particle[] }} Fusion */

/** @type {ReadonlyArray<Fusion>} */
export const FUSIONS = [
  {
    id: 'dt',
    label: 'D + T',
    before: [
      { A: 2, Z: 1 },
      { A: 3, Z: 1 },
    ],
    after: [
      { A: 4, Z: 2 },
      { A: 1, Z: 0 },
    ],
  },
  {
    id: 'dd',
    label: 'D + D',
    before: [{ A: 2, Z: 1, count: 2 }],
    after: [
      { A: 3, Z: 2 },
      { A: 1, Z: 0 },
    ],
  },
  {
    id: 'dhe',
    label: 'D + He-3',
    before: [
      { A: 2, Z: 1 },
      { A: 3, Z: 2 },
    ],
    after: [
      { A: 4, Z: 2 },
      { A: 1, Z: 1 },
    ],
  },
];

/**
 * Energy of a fusion reaction, and whether it is balanced.
 * @param {Fusion} f
 */
export function fusionOf(f) {
  const a = totals(f.before);
  const b = totals(f.after);
  return { energy: energyGain(f.before, f.after), balanced: a.A === b.A && a.Z === b.Z };
}
