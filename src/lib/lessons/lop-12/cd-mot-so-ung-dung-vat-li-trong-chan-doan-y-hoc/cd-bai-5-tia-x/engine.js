/**
 * The Coolidge tube: electrons accelerated through U hit the anode with
 * kinetic energy eU and give a continuous X-ray spectrum (Kramers' law: per
 * unit photon energy, intensity ∝ tube current · (eU − E)), cut below the
 * shortest wavelength λ_min = hc/(eU) and, through a filter, at long
 * wavelengths. The spectrum then decides how much of the beam gets through
 * soft tissue, bone or lead.
 */
import { E_CHARGE, M_ELECTRON, muAt } from '../_shared/xray.js';

/** hc in keV·nm, so λ(nm) = HC / E(keV). */
export const HC = 1.2398;

/**
 * Kinetic energy (J) of an electron accelerated from rest through U volts.
 * @param {number} U
 */
export const electronEnergy = (U) => E_CHARGE * U;

/**
 * Speed (m/s) of that electron from ½mv² = eU (non-relativistic, as the
 * book computes it).
 * @param {number} U
 */
export const electronSpeed = (U) => Math.sqrt((2 * E_CHARGE * U) / M_ELECTRON);

/**
 * Shortest X-ray wavelength (nm) a tube at `kV` can give.
 * @param {number} kV
 */
export const lambdaMin = (kV) => HC / kV;

/** Lowest photon energy counted (keV): softer rays never leave the tube. */
const E_LOW = 5;
const STEPS = 240;

/**
 * Sampled spectrum per unit photon energy: `{ E, n }` rows from E_LOW to
 * eU, with n ∝ mA·(U − E) and the aluminium filter's attenuation.
 * @param {{ kV: number, mA: number, filterMm: number }} tube
 */
export function spectrum({ kV, mA, filterMm }) {
  /** @type {Array<{ E: number, n: number }>} */
  const rows = [];
  for (let i = 0; i <= STEPS; i += 1) {
    const E = E_LOW + ((kV - E_LOW) * i) / STEPS;
    const n = mA * (kV - E) * Math.exp(-muAt('nhom', E) * filterMm * 0.1);
    rows.push({ E, n });
  }
  return rows;
}

/**
 * The same spectrum against wavelength (nm), intensity per unit wavelength
 * (E·n·dE/dλ ∝ n·E³), from λ_min up to `lambdaTop`.
 * @param {{ kV: number, mA: number, filterMm: number }} tube
 * @param {number} lambdaTop
 */
export function wavelengthCurve(tube, lambdaTop) {
  return spectrum(tube)
    .map(({ E, n }) => ({ x: HC / E, y: n * E ** 3 }))
    .filter((p) => p.x <= lambdaTop)
    .reverse();
}

/**
 * Total beam intensity (relative): the energy carried, ∑ E·n.
 * @param {{ kV: number, mA: number, filterMm: number }} tube
 */
export function beamPower(tube) {
  return spectrum(tube).reduce((s, r) => s + r.E * r.n, 0);
}

/**
 * Fraction of the beam's energy that crosses `cm` of a material.
 * @param {{ kV: number, mA: number, filterMm: number }} tube
 * @param {import('../_shared/xray.js').Material} material
 * @param {number} cm
 */
export function transmitted(tube, material, cm) {
  let all = 0;
  let through = 0;
  for (const { E, n } of spectrum(tube)) {
    all += E * n;
    through += E * n * Math.exp(-muAt(material, E) * cm);
  }
  return all > 0 ? through / all : 0;
}

/**
 * Mean photon energy (keV) of the beam: higher means harder rays.
 * @param {{ kV: number, mA: number, filterMm: number }} tube
 */
export function meanEnergy(tube) {
  let count = 0;
  let energy = 0;
  for (const { E, n } of spectrum(tube)) {
    count += n;
    energy += E * n;
  }
  return count > 0 ? energy / count : 0;
}
