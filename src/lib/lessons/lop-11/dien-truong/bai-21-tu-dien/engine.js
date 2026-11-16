/**
 * Capacitors in SI units: the capacitance of a parallel-plate capacitor, a
 * capacitor kept on its source (U fixed) or cut off from it (Q fixed), its
 * energy, and two capacitors joined in series or in parallel.
 */
import { tidy } from '#lib/core/number-format.js';
import { K } from '../_shared/charges.js';

/**
 * Dielectrics a plate capacitor may be filled with, with a typical dielectric
 * constant.
 * @type {Array<{ value: string, label: string, eps: number }>}
 */
export const DIELECTRICS = [
  { value: 'khong-khi', label: 'Không khí', eps: 1 },
  { value: 'dau-hoa', label: 'Dầu hoả', eps: 2 },
  { value: 'mica', label: 'Mica', eps: 6 },
];

/**
 * Capacitance of a parallel-plate capacitor C = εS/(4πkd), in F.
 * @param {number} eps dielectric constant @param {number} area S in m² @param {number} gap d in m
 */
export function plateCapacitance(eps, area, gap) {
  if (!(gap > 0)) return Infinity;
  return (eps * area) / (4 * Math.PI * K * gap);
}

/**
 * Energy stored by a capacitor, W = QU/2, in J.
 * @param {number} q C @param {number} u V
 */
export const energy = (q, u) => tidy((q * u) / 2, 18);

/**
 * State of a plate capacitor. While it is on the source the voltage is the
 * source's `u`; once it has been cut off it keeps the charge `kept` and the
 * voltage becomes Q/C.
 * @param {{ eps: number, area: number, gap: number, u: number, kept?: number | null }} setup
 *   SI units; `kept` is the charge left on it when cut off, or null while on the source
 */
export function capacitorState({ eps, area, gap, u, kept = null }) {
  const c = plateCapacitance(eps, area, gap);
  const onSource = kept === null || kept === undefined;
  const q = onSource ? c * u : kept;
  const volts = onSource ? u : q / c;
  return { c, q, u: volts, w: energy(q, volts), onSource };
}

/**
 * Equivalent capacitance of capacitors in series (1/C = Σ 1/Cᵢ) or in
 * parallel (C = Σ Cᵢ).
 * @param {number[]} caps @param {'noi-tiep' | 'song-song'} mode
 */
export function equivalent(caps, mode) {
  if (mode === 'song-song')
    return tidy(
      caps.reduce((s, c) => s + c, 0),
      15,
    );
  return tidy(1 / caps.reduce((s, c) => s + 1 / c, 0), 15);
}

/**
 * Two or more capacitors joined to a source of voltage u: the equivalent
 * capacitance, and each capacitor's charge, voltage and energy. Units are
 * whatever the caller uses consistently (µF, V give µC and µJ).
 * @param {number[]} caps @param {'noi-tiep' | 'song-song'} mode @param {number} u
 */
export function combine(caps, mode, u) {
  const c = equivalent(caps, mode);
  const q = tidy(c * u, 12);
  const parts = caps.map((ci) => {
    const qi = mode === 'song-song' ? tidy(ci * u, 12) : q;
    const ui = mode === 'song-song' ? u : tidy(q / ci, 12);
    return { c: ci, q: qi, u: ui, w: energy(qi, ui) };
  });
  return { c, q, u, w: energy(q, u), parts };
}
