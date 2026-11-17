/**
 * Nuclear physics helpers for the chapter: element symbols, nuclide notation
 * the book's way ({}^{A}_{Z}X), mass defect and binding energy in amu and MeV,
 * the binding energy per nucleon of real nuclides and the balance of a
 * nuclear reaction (mass number and charge).
 */
import { tidy } from '#lib/core/number-format.js';

/** 1 amu in MeV/c², the book's value. */
export const AMU_MEV = 931.5;
/** 1 MeV in joules. */
export const MEV_J = 1.6e-13;
/** Masses of the proton and the neutron in amu, rounded the way the book's exercises give them. */
export const M_P = 1.0073;
export const M_N = 1.0087;

/** Chemical symbols by atomic number Z, from 1 to 94 (index 0 unused). */
export const SYMBOLS = [
  '',
  'H',
  'He',
  'Li',
  'Be',
  'B',
  'C',
  'N',
  'O',
  'F',
  'Ne',
  'Na',
  'Mg',
  'Al',
  'Si',
  'P',
  'S',
  'Cl',
  'Ar',
  'K',
  'Ca',
  'Sc',
  'Ti',
  'V',
  'Cr',
  'Mn',
  'Fe',
  'Co',
  'Ni',
  'Cu',
  'Zn',
  'Ga',
  'Ge',
  'As',
  'Se',
  'Br',
  'Kr',
  'Rb',
  'Sr',
  'Y',
  'Zr',
  'Nb',
  'Mo',
  'Tc',
  'Ru',
  'Rh',
  'Pd',
  'Ag',
  'Cd',
  'In',
  'Sn',
  'Sb',
  'Te',
  'I',
  'Xe',
  'Cs',
  'Ba',
  'La',
  'Ce',
  'Pr',
  'Nd',
  'Pm',
  'Sm',
  'Eu',
  'Gd',
  'Tb',
  'Dy',
  'Ho',
  'Er',
  'Tm',
  'Yb',
  'Lu',
  'Hf',
  'Ta',
  'W',
  'Re',
  'Os',
  'Ir',
  'Pt',
  'Au',
  'Hg',
  'Tl',
  'Pb',
  'Bi',
  'Po',
  'At',
  'Rn',
  'Fr',
  'Ra',
  'Ac',
  'Th',
  'Pa',
  'U',
  'Np',
  'Pu',
];

/** Names of the elements the chapter talks about, as the chemistry book writes them. */
export const NAMES = /** @type {Record<number, string>} */ ({
  1: 'hydrogen',
  2: 'helium',
  3: 'lithium',
  4: 'beryllium',
  5: 'boron',
  6: 'carbon',
  7: 'nitrogen',
  8: 'oxygen',
  9: 'fluorine',
  10: 'neon',
  11: 'sodium',
  12: 'magnesium',
  13: 'aluminium',
  14: 'silicon',
  15: 'phosphorus',
  16: 'sulfur',
  17: 'chlorine',
  18: 'argon',
  19: 'potassium',
  20: 'calcium',
  26: 'sắt',
  27: 'cobalt',
  36: 'krypton',
  38: 'strontium',
  53: 'iodine',
  55: 'caesium',
  56: 'barium',
  82: 'chì',
  84: 'polonium',
  86: 'radon',
  88: 'radium',
  90: 'thorium',
  92: 'uranium',
  94: 'plutonium',
});

/**
 * TeX of a nucleus or particle with its mass number and charge number on the
 * left: n, e⁻ and e⁺ get their own letters, everything else its symbol.
 * @param {number} A @param {number} Z
 */
export function nuclideTex(A, Z) {
  if (A === 1 && Z === 0) return '{}^{1}_{0}n';
  if (A === 0 && Z === -1) return '{}^{0}_{-1}e';
  if (A === 0 && Z === 1) return '{}^{0}_{+1}e';
  const sym = SYMBOLS[Z] || 'X';
  return `{}^{${A}}_{${Z}}\\mathrm{${sym}}`;
}

/**
 * A nucleus or particle in plain words, for live text and screen readers:
 * "neutron", "hạt α", "carbon-14" or "Ba-141".
 * @param {number} A @param {number} Z
 */
export function nuclideName(A, Z) {
  if (A === 1 && Z === 0) return 'neutron';
  if (A === 0 && Z === -1) return 'electron';
  if (A === 0 && Z === 1) return 'positron';
  if (A === 1 && Z === 1) return 'proton';
  if (A === 4 && Z === 2) return 'hạt α (helium-4)';
  const name = NAMES[Z];
  return name ? `${name}-${A}` : `${SYMBOLS[Z] ?? 'X'}-${A}`;
}

/**
 * Mass defect Δm = Z·m_p + (A − Z)·m_n − m_X in amu, from the nuclear mass m_X.
 * @param {number} Z @param {number} A @param {number} m nuclear mass in amu
 * @param {number} [mp] @param {number} [mn]
 */
export function massDefect(Z, A, m, mp = M_P, mn = M_N) {
  return tidy(Z * mp + (A - Z) * mn - m);
}

/**
 * Binding energy E_lk = Δm·c² in MeV and per nucleon, from the nuclear mass.
 * @param {number} Z @param {number} A @param {number} m nuclear mass in amu
 * @param {number} [mp] @param {number} [mn]
 */
export function binding(Z, A, m, mp = M_P, mn = M_N) {
  const dm = massDefect(Z, A, m, mp, mn);
  const energy = tidy(dm * AMU_MEV);
  return { dm, energy, perNucleon: tidy(energy / A) };
}

/**
 * Binding energy per nucleon (MeV) of real nuclides, from the atomic mass
 * evaluation, rounded to 0,001 MeV. Sorted by A.
 * @type {ReadonlyArray<{ A: number, Z: number, eps: number }>}
 */
export const CURVE = [
  { A: 2, Z: 1, eps: 1.112 },
  { A: 3, Z: 1, eps: 2.827 },
  { A: 3, Z: 2, eps: 2.573 },
  { A: 4, Z: 2, eps: 7.074 },
  { A: 6, Z: 3, eps: 5.332 },
  { A: 7, Z: 3, eps: 5.606 },
  { A: 9, Z: 4, eps: 6.463 },
  { A: 11, Z: 5, eps: 6.928 },
  { A: 12, Z: 6, eps: 7.68 },
  { A: 14, Z: 7, eps: 7.476 },
  { A: 16, Z: 8, eps: 7.976 },
  { A: 20, Z: 10, eps: 8.032 },
  { A: 24, Z: 12, eps: 8.261 },
  { A: 28, Z: 14, eps: 8.448 },
  { A: 32, Z: 16, eps: 8.493 },
  { A: 40, Z: 20, eps: 8.551 },
  { A: 48, Z: 22, eps: 8.723 },
  { A: 56, Z: 26, eps: 8.79 },
  { A: 62, Z: 28, eps: 8.795 },
  { A: 70, Z: 32, eps: 8.722 },
  { A: 84, Z: 36, eps: 8.717 },
  { A: 92, Z: 36, eps: 8.513 },
  { A: 98, Z: 42, eps: 8.635 },
  { A: 107, Z: 47, eps: 8.554 },
  { A: 120, Z: 50, eps: 8.505 },
  { A: 138, Z: 56, eps: 8.393 },
  { A: 141, Z: 56, eps: 8.326 },
  { A: 152, Z: 62, eps: 8.244 },
  { A: 166, Z: 68, eps: 8.142 },
  { A: 184, Z: 74, eps: 8.005 },
  { A: 197, Z: 79, eps: 7.916 },
  { A: 208, Z: 82, eps: 7.868 },
  { A: 226, Z: 88, eps: 7.662 },
  { A: 235, Z: 92, eps: 7.591 },
  { A: 238, Z: 92, eps: 7.57 },
];

/**
 * The binding energy per nucleon read off the smooth part of the curve at
 * mass number A (from 12 up), by straight lines between tabulated nuclides
 * that sit on it; the light nuclei below 12 jump about and are not
 * interpolated. Kr-92 and Ba-141, two fission fragments rich in neutrons,
 * lie a little below the curve and are left out of it.
 * @param {number} A
 */
export function epsAt(A) {
  const pts = CURVE.filter((p) => p.A >= 12 && p.A !== 92 && p.A !== 141 && p.A !== 14);
  if (A <= pts[0].A) return pts[0].eps;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    if (A <= b.A) return tidy(a.eps + ((b.eps - a.eps) * (A - a.A)) / (b.A - a.A), 4);
  }
  return pts[pts.length - 1].eps;
}

/**
 * The tabulated binding energy per nucleon of a nuclide, or null.
 * @param {number} A @param {number} Z
 */
export function epsOf(A, Z) {
  return CURVE.find((p) => p.A === A && p.Z === Z)?.eps ?? null;
}

/**
 * @typedef {{ A: number, Z: number, count?: number }} Particle
 */

/**
 * Total mass number and charge number of one side of a reaction.
 * @param {ReadonlyArray<Particle>} side
 */
export function totals(side) {
  let A = 0;
  let Z = 0;
  for (const p of side) {
    const k = p.count ?? 1;
    A += k * p.A;
    Z += k * p.Z;
  }
  return { A, Z };
}

/**
 * TeX of one side of a reaction: "{}^{235}_{92}U + {}^{1}_{0}n".
 * @param {ReadonlyArray<Particle>} side
 */
export function sideTex(side) {
  return side.map((p) => `${(p.count ?? 1) > 1 ? p.count : ''}${nuclideTex(p.A, p.Z)}`).join(' + ');
}

/**
 * Energy of a reaction in MeV from the nuclear masses (amu) before and after:
 * positive when it gives out energy.
 * @param {number} before total mass before @param {number} after total mass after
 */
export function reactionEnergy(before, after) {
  return tidy((before - after) * AMU_MEV);
}
