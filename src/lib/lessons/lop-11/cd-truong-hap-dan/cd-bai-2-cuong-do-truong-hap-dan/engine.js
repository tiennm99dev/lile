/**
 * Field strength of a planet against the distance from its centre, measured
 * in planet radii: g = GM/r² outside the planet, so g = g₀/x² at x = r/R.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { BODIES, fieldStrength } from '../_shared/gravity.js';

/** @typedef {keyof typeof BODIES} BodyId */

/** Farthest distance shown, in planet radii. */
export const X_MAX = 8;

/**
 * Field strength at the surface g₀ = GM/R², N/kg.
 * @param {BodyId} id
 */
export function surfaceField(id) {
  const b = BODIES[id];
  return fieldStrength(b.mass, b.radius);
}

/**
 * Field strength at x planet radii from the centre (x ≥ 1), N/kg.
 * @param {BodyId} id @param {number} x
 */
export function fieldAtRadii(id, x) {
  const b = BODIES[id];
  return fieldStrength(b.mass, x * b.radius);
}

/**
 * Height above the surface at x planet radii, km.
 * @param {BodyId} id @param {number} x
 */
export function heightKm(id, x) {
  return tidy(((x - 1) * BODIES[id].radius) / 1000, 6);
}

/**
 * Points of the curve g(x) from the surface out to `X_MAX`.
 * @param {BodyId} id @param {number} [count]
 */
export function curvePoints(id, count = 120) {
  return Array.from({ length: count + 1 }, (_, i) => {
    const x = 1 + ((X_MAX - 1) * i) / count;
    return { x, y: fieldAtRadii(id, x) };
  });
}

/**
 * How many times weaker the field is at x than at the surface, x².
 * @param {number} x
 */
export const weakerBy = (x) => tidy(x * x, 6);

/**
 * A sentence for the readout: the height, the field and the ratio to g₀.
 * @param {BodyId} id @param {number} x
 */
export function describe(id, x) {
  const g = fieldAtRadii(id, x);
  const h = heightKm(id, x);
  const name = BODIES[id].name;
  if (x === 1) {
    return `Ở bề mặt ${name}: $g_0 \\approx ${numTex(g, 2)}$ N/kg.`;
  }
  const k = weakerBy(x);
  const ratio = Number.isInteger(x)
    ? `bằng $\\dfrac{g_0}{${k}}$: khoảng cách đến tâm gấp $${x}$ lần thì $g$ giảm $${x}^2 = ${k}$ lần.`
    : `bằng $\\dfrac{g_0}{${numTex(k, 2)}}$ vì $\\left(\\dfrac{r}{R}\\right)^2 \\approx ${numTex(k, 2)}$.`;
  return `Độ cao $h \\approx ${numTex(h, 0)}$ km, $r = ${numTex(x, 2)}R$: $g \\approx ${numTex(g, 2)}$ N/kg, ${ratio}`;
}
