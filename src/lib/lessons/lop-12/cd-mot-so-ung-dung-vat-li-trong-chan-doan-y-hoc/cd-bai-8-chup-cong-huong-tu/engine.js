/**
 * Nuclear magnetic resonance of hydrogen protons in an MRI scanner. In a
 * strong field B the protons line up with it and their axes turn about it at
 * the Larmor frequency f = γ̄B (γ̄ = 42,58 MHz/T). A radio pulse at exactly
 * that frequency tips them over (resonance); after the pulse they return to
 * their initial state, sending out a radio signal, at a pace set by the
 * tissue's relaxation times T₁ (back along B) and T₂ (signal fading). Gradient
 * coils make B, hence f, differ from slice to slice, so a pulse picks out one
 * slice.
 */

/** Larmor frequency per tesla of a hydrogen proton (MHz/T). */
export const GAMMA_BAR = 42.58;

/**
 * Larmor frequency (MHz) in a field of `B` tesla.
 * @param {number} B
 */
export const larmor = (B) => GAMMA_BAR * B;

/** Gradient (T/m) of the gradient coils when switched on. */
export const GRADIENT = 0.04;
/** Half-width (MHz) of the band of frequencies one pulse covers. */
export const BANDWIDTH = 0.015;

/** Relaxation times (ms) of tissues at about 1,5 T. */
export const TISSUES = {
  fat: { name: 'mỡ', T1: 260, T2: 80, color: '#d97706' },
  white: { name: 'chất trắng', T1: 790, T2: 90, color: '#64748b' },
  grey: { name: 'chất xám', T1: 920, T2: 100, color: '#7c3aed' },
  muscle: { name: 'cơ', T1: 870, T2: 50, color: '#dc2626' },
  csf: { name: 'dịch não tuỷ', T1: 4000, T2: 2000, color: '#0284c7' },
};

/** @typedef {keyof typeof TISSUES} Tissue */

/** The slices along the body axis: position (cm) and the tissue in each. */
export const SLICES = /** @type {Array<{ z: number, tissue: Tissue }>} */ ([
  { z: -10, tissue: 'fat' },
  { z: -5, tissue: 'white' },
  { z: 0, tissue: 'grey' },
  { z: 5, tissue: 'csf' },
  { z: 10, tissue: 'muscle' },
]);

/**
 * The field (T) at a slice: B₀ plus the gradient's share when it is on.
 * @param {number} B0 @param {number} z cm @param {boolean} gradient
 */
export const fieldAt = (B0, z, gradient) => B0 + (gradient ? GRADIENT * z * 0.01 : 0);

/**
 * Whether a pulse at `fRF` (MHz) resonates with protons whose Larmor
 * frequency is `fL`.
 * @param {number} fRF @param {number} fL
 */
export const resonates = (fRF, fL) => Math.abs(fRF - fL) <= BANDWIDTH + 1e-9;

/**
 * Indices of the slices a pulse at `fRF` tips over.
 * @param {number} B0 @param {boolean} gradient @param {number} fRF
 */
export function hitSlices(B0, gradient, fRF) {
  return SLICES.flatMap((s, i) => (resonates(fRF, larmor(fieldAt(B0, s.z, gradient))) ? [i] : []));
}

/**
 * State of a tissue's magnetisation `t` ms after a 90° pulse: `mz` is how far
 * it has returned along B (0 to 1), `signal` the radio signal it still sends
 * (1 to 0).
 * @param {Tissue} tissue @param {number} t
 */
export function relax(tissue, t) {
  const { T1, T2 } = TISSUES[tissue];
  return { mz: 1 - Math.exp(-t / T1), signal: Math.exp(-t / T2) };
}

/**
 * Time (ms) a tissue takes to get `share` of the way back along B.
 * @param {Tissue} tissue @param {number} share
 */
export const recoveryTime = (tissue, share) => -TISSUES[tissue].T1 * Math.log(1 - share);
