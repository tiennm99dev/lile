/**
 * The photoelectric effect by Einstein's photon picture: a photon of energy
 * ε = hc/λ frees an electron only when ε ≥ A = hc/λ₀; the fastest electron
 * leaves with W_đmax = ε − A = eU_h. The photocell model: every photon frees
 * one electron (so I_bh = N·e), and the electrons leave with energies
 * W = W_đmax·√r for r uniform in [0, 1), which gives the current
 * I = I_bh·(1 − (U/U_h)²) for −U_h ≤ U_AK ≤ 0 and I = I_bh for U_AK ≥ 0.
 */
import { E_CHARGE, M_ELECTRON, photonEv } from '../_shared/quantum.js';

/**
 * Photoelectric limits λ₀ (μm) of some metals, from the book's table.
 */
export const METALS = /** @type {const} */ ([
  { id: 'xesi', name: 'Xesi', lambda0: 0.58 },
  { id: 'kali', name: 'Kali', lambda0: 0.55 },
  { id: 'natri', name: 'Natri', lambda0: 0.5 },
  { id: 'canxi', name: 'Canxi', lambda0: 0.43 },
  { id: 'nhom', name: 'Nhôm', lambda0: 0.36 },
  { id: 'kem', name: 'Kẽm', lambda0: 0.35 },
  { id: 'dong', name: 'Đồng', lambda0: 0.3 },
  { id: 'bac', name: 'Bạc', lambda0: 0.26 },
]);

/** @typedef {(typeof METALS)[number]['id']} MetalId */

/**
 * @param {MetalId} id
 */
export function metal(id) {
  const m = METALS.find((x) => x.id === id);
  if (!m) throw new Error(`unknown metal ${id}`);
  return m;
}

/**
 * Work function A (eV) of a metal from its limit λ₀: A = hc/λ₀.
 * @param {MetalId} id
 */
export const workFunctionEv = (id) => photonEv(metal(id).lambda0 * 1000);

/**
 * Everything the photon picture predicts for light of wavelength `nm` on a
 * metal: photon energy, work function, whether electrons leave, the largest
 * kinetic energy (eV), the stopping voltage (V) and the fastest speed (m/s).
 * @param {number} nm
 * @param {MetalId} id
 */
export function photoelectric(nm, id) {
  const eps = photonEv(nm);
  const A = workFunctionEv(id);
  const emits = eps >= A;
  const wMax = emits ? eps - A : 0;
  const vMax = Math.sqrt((2 * wMax * E_CHARGE) / M_ELECTRON);
  return { eps, A, emits, wMax, Uh: wMax, vMax };
}

/**
 * Photocurrent (A) at the voltage `U` (V) between anode and cathode, when
 * `photons` photons a second fall on the cathode.
 * @param {number} U
 * @param {number} photons
 * @param {{ emits: boolean, Uh: number }} effect
 */
export function photocurrent(U, photons, effect) {
  if (!effect.emits) return 0;
  const Ibh = photons * E_CHARGE;
  if (U >= 0) return Ibh;
  if (effect.Uh <= 0 || -U >= effect.Uh) return 0;
  const k = U / effect.Uh;
  return Ibh * (1 - k * k);
}

/**
 * A freed electron for the animation: `s` is its place across the gap (0 at
 * the cathode, 1 at the anode), `w` its starting kinetic energy (eV) and
 * `dir` +1 going out, −1 coming back.
 * @typedef {{ s: number, w: number, dir: number, y: number }} Electron
 */

/**
 * A newly freed electron with energy W_đmax·√r.
 * @param {() => number} rand
 * @param {number} wMax
 * @param {number} y vertical place on the plate (0..1), only for drawing
 * @returns {Electron}
 */
export const freeElectron = (rand, wMax, y) => ({ s: 0, w: wMax * Math.sqrt(rand()), dir: 1, y });

/**
 * Kinetic energy (eV) of an electron at `s` across a uniform field with
 * voltage `U` between anode and cathode.
 * @param {Electron} e
 * @param {number} U
 */
export const energyAt = (e, U) => e.w + U * e.s;

/** Animation speed across the gap: gap widths a second per √eV, plus a crawl. */
const SPEED = 0.35;
const CRAWL = 0.06;

/**
 * Moves an electron for `dt` seconds. Returns 'anode' when it arrives,
 * 'back' when the field has turned it round to the cathode, else null.
 * @param {Electron} e
 * @param {number} U
 * @param {number} dt
 * @returns {'anode' | 'back' | null}
 */
export function stepElectron(e, U, dt) {
  const k = Math.max(0, energyAt(e, U));
  const v = CRAWL + SPEED * Math.sqrt(k);
  e.s += e.dir * v * dt;
  if (e.dir > 0 && e.s < 1 && energyAt(e, U) <= 0) e.dir = -1;
  if (e.s >= 1) return 'anode';
  if (e.s <= 0 && e.dir < 0) return 'back';
  return null;
}

/**
 * Whether an electron of starting energy `w` (eV) reaches the anode at `U`.
 * @param {number} w
 * @param {number} U
 */
export const reachesAnode = (w, U) => w + U >= 0;
