/**
 * Rectifying u = U₀cos(2πft) with ideal diodes (no forward drop, no reverse
 * current) into a load R, with an optional smoothing capacitor C across the
 * load. With the capacitor, the diodes conduct only while the source is above
 * the capacitor's voltage; the rest of the time the capacitor discharges
 * through R as v·e^(−Δt/RC).
 */
import { acAt } from '../_shared/ac.js';

/** @typedef {'none' | 'half' | 'full'} Mode */

/**
 * The output voltage across the load without a capacitor.
 * @param {Mode} mode
 * @param {boolean} flipped the single diode, or the whole bridge, turned round
 * @param {number} u the source voltage at that moment
 */
export function rectify(mode, flipped, u) {
  if (mode === 'none') return u;
  if (mode === 'full') return flipped ? -Math.abs(u) : Math.abs(u);
  return flipped ? Math.min(u, 0) : Math.max(u, 0);
}

/**
 * Which diodes conduct for a source voltage u while current flows. In the
 * bridge, D1 joins A to P, D2 joins B to P, D3 joins M to B and D4 joins M
 * to A (A and B on the source, P and M on the load): built right, D1 and D3
 * conduct when u > 0, D2 and D4 when u < 0; turned round, the other pair.
 * @param {Mode} mode @param {number} u @param {boolean} [flipped]
 * @returns {string[]}
 */
export function conductingFor(mode, u, flipped = false) {
  if (mode === 'none' || u === 0) return [];
  if (mode === 'half') return u > 0 !== flipped ? ['D'] : [];
  return u > 0 !== flipped ? ['D1', 'D3'] : ['D2', 'D4'];
}

/** The bridge diodes, each pointing 'up' (towards P) or 'down' (towards M). */
export const BRIDGE = /** @type {const} */ (['D1', 'D2', 'D3', 'D4']);

/**
 * Whether a bridge built from four diodes works. A diode pair on one rail
 * pointing opposite ways (D1 against D2, or D3 against D4) joins A to B
 * directly in one half-cycle and shorts the source: 'short'. Otherwise all
 * four pointing to P give a positive full-wave voltage ('ok'), all four
 * pointing to M the same waveform upside down ('reversed'), and the top pair
 * against the bottom pair leaves no way back to the source ('open').
 * @param {Record<'D1' | 'D2' | 'D3' | 'D4', 'up' | 'down'>} d
 * @returns {'ok' | 'reversed' | 'short' | 'open'}
 */
export function bridgeStatus(d) {
  if (d.D1 !== d.D2 || d.D3 !== d.D4) return 'short';
  if (d.D1 !== d.D3) return 'open';
  return d.D1 === 'up' ? 'ok' : 'reversed';
}

/**
 * @typedef {{ mode: Mode, flipped: boolean, U0: number, f: number, RC: number | null }} Setup
 * RC in seconds, or null for no capacitor.
 */

/**
 * Samples of the source and load voltages over [0, tMax], in the steady
 * state: the run starts `warm` periods earlier so the capacitor has settled.
 * `on` tells whether current flows from the source through the diodes.
 * @param {Setup} s @param {number} tMax @param {number} n pieces
 * @returns {Array<{ t: number, u: number, out: number, on: boolean }>}
 */
export function simulate(s, tMax, n) {
  const dt = tMax / n;
  const warm = s.RC === null ? 0 : Math.ceil(5 / s.f / dt);
  /** @type {Array<{ t: number, u: number, out: number, on: boolean }>} */
  const out = [];
  let v = 0;
  for (let i = -warm; i <= n; i += 1) {
    const t = i * dt;
    const u = acAt(s.U0, s.f, 0, t);
    const r = rectify(s.mode, s.flipped, u);
    let on = r !== 0 || s.mode === 'none';
    if (s.RC !== null && s.mode !== 'none') {
      const decayed = v * Math.exp(-dt / s.RC);
      if (Math.abs(r) >= Math.abs(decayed)) {
        v = r;
      } else {
        v = decayed;
        on = false;
      }
    } else {
      v = r;
    }
    if (i >= 0) out.push({ t, u, out: v, on: on && u !== 0 });
  }
  return out;
}

/**
 * Average, highest and lowest load voltage over the samples (take whole
 * periods), and the ripple: highest minus lowest.
 * @param {Array<{ out: number }>} samples
 */
export function outputStats(samples) {
  let sum = 0;
  let hi = -Infinity;
  let lo = Infinity;
  for (const p of samples) {
    sum += p.out;
    hi = Math.max(hi, p.out);
    lo = Math.min(lo, p.out);
  }
  return { mean: sum / samples.length, hi, lo, ripple: hi - lo };
}
