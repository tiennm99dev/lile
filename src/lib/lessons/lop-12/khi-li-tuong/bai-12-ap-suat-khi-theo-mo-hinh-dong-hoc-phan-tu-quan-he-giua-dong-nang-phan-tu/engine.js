/**
 * Molecular speeds of a gas in a closed vessel: a seeded sample of
 * molecules whose velocity components are normal with spread √(kT/m)
 * (the Maxwell distribution), drawn against the theoretical curve. The
 * vessel keeps its number density μ, so the pressure follows
 * p = ⅓·μ·m·v̄² = ⅔·μ·Ē_đ.
 */
import { rng } from '#lib/core/drill.js';
import { K_B, N_A, gauss } from '../_shared/gas.js';

/** The gases on offer, with their molar masses in g/mol. */
export const GASES = [
  { id: 'he', name: 'Helium (He)', molar: 4 },
  { id: 'n2', name: 'Nitrogen (N₂)', molar: 28 },
  { id: 'o2', name: 'Oxygen (O₂)', molar: 32 },
  { id: 'co2', name: 'Carbon dioxide (CO₂)', molar: 44 },
];

/** Molecules per cubic metre in the vessel (about air at 300 K and 1 atm). */
export const DENSITY = 2.5e25;
/** Molecules in the sample. */
export const SAMPLE = 1000;
/** Width of a histogram bin, m/s. */
export const BIN = 200;

/**
 * Mass of one molecule, kg, from the molar mass in g/mol.
 * @param {number} molar
 */
export function massOf(molar) {
  return molar / 1000 / N_A;
}

/**
 * Mean kinetic energy of a molecule, Ē_đ = 3/2·kT (J).
 * @param {number} kelvin
 */
export function meanEnergy(kelvin) {
  return 1.5 * K_B * kelvin;
}

/**
 * Mean square speed v̄² = 3kT/m (m²/s²).
 * @param {number} kelvin @param {number} molar
 */
export function meanSquare(kelvin, molar) {
  return (3 * K_B * kelvin) / massOf(molar);
}

/**
 * Pressure p = ⅓·μ·m·v̄² (Pa) of molecules with number density μ.
 * @param {number} density @param {number} mass @param {number} meanSq
 */
export function pressureOf(density, mass, meanSq) {
  return (density * mass * meanSq) / 3;
}

/**
 * The Maxwell speed density f(v) in s/m for speed v.
 * @param {number} v @param {number} kelvin @param {number} molar
 */
export function maxwell(v, kelvin, molar) {
  const a = massOf(molar) / (2 * K_B * kelvin);
  return 4 * Math.PI * (a / Math.PI) ** 1.5 * v * v * Math.exp(-a * v * v);
}

/**
 * Standard normal triples, one per molecule; scaling them by √(kT/m)
 * gives the velocity components at any temperature, so the sample changes
 * smoothly instead of being redrawn.
 * @param {number} seed
 */
export function unitSample(seed) {
  const rand = rng(seed);
  return Array.from({ length: SAMPLE }, () => [gauss(rand), gauss(rand), gauss(rand)]);
}

/**
 * Speeds of the sample at a temperature and molar mass.
 * @param {number[][]} unit @param {number} kelvin @param {number} molar
 */
export function speedsOf(unit, kelvin, molar) {
  const s = Math.sqrt((K_B * kelvin) / massOf(molar));
  return unit.map(([x, y, z]) => s * Math.hypot(x, y, z));
}

/**
 * Histogram of speeds up to `max`, as the share of molecules per 100 m/s
 * in each bin (in %), ready to draw as a step line.
 * @param {number[]} speeds @param {number} max
 */
export function histogram(speeds, max) {
  const bins = Array.from({ length: Math.ceil(max / BIN) }, () => 0);
  for (const v of speeds) {
    const i = Math.floor(v / BIN);
    if (i < bins.length) bins[i] += 1;
  }
  const scale = (100 * 100) / (speeds.length * BIN);
  return bins.flatMap((c, i) => [
    { x: i * BIN, y: c * scale },
    { x: (i + 1) * BIN, y: c * scale },
  ]);
}
