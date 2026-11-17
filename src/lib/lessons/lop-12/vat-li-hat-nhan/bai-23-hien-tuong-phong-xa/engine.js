/**
 * The virtual radioactive sample of the lesson on radioactivity: N₀ nuclei,
 * each of which decays at random with the same chance in every short time
 * step, against the decay law N = N₀·2^(−t/T).
 */

/**
 * The chance that one nucleus decays during dt: 1 − 2^(−dt/T).
 * @param {number} dt @param {number} T half-life
 */
export function decayChance(dt, T) {
  return 1 - 2 ** (-dt / T);
}

/**
 * The number of nuclei left at time t by the decay law.
 * @param {number} n0 @param {number} t @param {number} T
 */
export function remaining(n0, t, T) {
  return n0 * 2 ** (-t / T);
}

/**
 * Decay constant λ = ln 2 / T.
 * @param {number} T
 */
export function decayConstant(T) {
  return Math.LN2 / T;
}

/**
 * One time step of the sample: every nucleus still there decays with the
 * same chance, independently of the others. `decayed[i]` is the time nucleus
 * i decayed, or null while it is still there.
 * @param {ReadonlyArray<number | null>} decayed
 * @param {number} t time at the end of the step
 * @param {number} dt @param {number} T @param {() => number} rand
 */
export function step(decayed, t, dt, T, rand) {
  const p = decayChance(dt, T);
  return decayed.map((d) => (d === null && rand() < p ? t : d));
}

/**
 * How many nuclei are still there.
 * @param {ReadonlyArray<number | null>} decayed
 */
export function countLeft(decayed) {
  let n = 0;
  for (const d of decayed) if (d === null) n++;
  return n;
}

/**
 * Points of the decay law curve from 0 to tMax.
 * @param {number} n0 @param {number} T @param {number} tMax
 */
export function lawCurve(n0, T, tMax) {
  const pts = [];
  for (let i = 0; i <= 100; i++) {
    const t = (tMax * i) / 100;
    pts.push({ x: t, y: remaining(n0, t, T) });
  }
  return pts;
}
