/**
 * The simple band model of a solid: a valence band, a forbidden gap of width
 * E_g and a conduction band. Electrons cross the gap by heat (intrinsic
 * density n ∝ T^{3/2}·e^{−E_g/(2kT)}) or by absorbing photons with hf ≥ E_g.
 * A semiconductor's resistance falls as its carriers grow; a metal keeps its
 * free electrons and its resistance rises with temperature,
 * R = R₀[1 + α(T − T₀)].
 */

/** Boltzmann constant in eV/K. */
export const K_EV = 8.617e-5;

/** Effective density factor (cm⁻³) that gives silicon about 10¹⁰ cm⁻³ at 300 K. */
const N_EFF = 2.5e19;

/** Free electrons in copper (cm⁻³). */
const N_METAL = 8.5e22;

/** Temperature coefficient of copper's resistance (K⁻¹), from T₀ = 300 K. */
export const ALPHA_CU = 4.3e-3;

/** Electrons a second per unit light level, turned into a steady extra density (cm⁻³). */
const PHOTO_DENSITY = 1e14;

/**
 * The materials of the widget, with band gap E_g (eV); a metal has none.
 */
export const MATERIALS = /** @type {const} */ ([
  { id: 'dong', name: 'Đồng (kim loại)', kind: 'kim loại', gap: 0 },
  { id: 'germani', name: 'Germani (bán dẫn)', kind: 'bán dẫn', gap: 0.66 },
  { id: 'silic', name: 'Silic (bán dẫn)', kind: 'bán dẫn', gap: 1.12 },
  { id: 'kim-cuong', name: 'Kim cương (điện môi)', kind: 'điện môi', gap: 5.5 },
]);

/** @typedef {(typeof MATERIALS)[number]['id']} MaterialId */

/**
 * @param {MaterialId} id
 */
export function material(id) {
  const m = MATERIALS.find((x) => x.id === id);
  if (!m) throw new Error(`unknown material ${id}`);
  return m;
}

/**
 * Density (cm⁻³) of electrons crossed into the conduction band by heat at
 * temperature `T` (K) across a gap `gap` (eV).
 * @param {number} gap
 * @param {number} T
 */
export const thermalDensity = (gap, T) =>
  N_EFF * (T / 300) ** 1.5 * Math.exp(-gap / (2 * K_EV * T));

/**
 * Extra conduction electrons (cm⁻³) made by light of photon energy `photonEv`
 * at relative level `light` (0..1): only photons with hf ≥ E_g lift
 * electrons over the gap.
 * @param {number} gap
 * @param {number} photonEv
 * @param {number} light
 */
export const photoDensity = (gap, photonEv, light) => (photonEv >= gap ? PHOTO_DENSITY * light : 0);

/**
 * Conduction electrons (cm⁻³) of a material under given conditions.
 * @param {MaterialId} id
 * @param {{ T: number, photonEv: number, light: number }} at
 */
export function carriers(id, { T, photonEv, light }) {
  const { gap, kind } = material(id);
  if (kind === 'kim loại') return N_METAL;
  return thermalDensity(gap, T) + photoDensity(gap, photonEv, light);
}

/**
 * Resistance relative to the same sample at 300 K in the dark. For a
 * semiconductor or insulator R ∝ 1/n (mobility held fixed in this model); for
 * a metal R = R₀[1 + α(T − 300)].
 * @param {MaterialId} id
 * @param {{ T: number, photonEv: number, light: number }} at
 */
export function relativeResistance(id, at) {
  if (material(id).kind === 'kim loại') return 1 + ALPHA_CU * (at.T - 300);
  const dark = carriers(id, { T: 300, photonEv: 0, light: 0 });
  return dark / carriers(id, at);
}
