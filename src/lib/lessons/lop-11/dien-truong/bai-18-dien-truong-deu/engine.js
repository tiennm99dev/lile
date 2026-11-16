/**
 * An electron shot along the middle of two parallel plates with voltage U a
 * distance d apart: the uniform field E = U/d, the acceleration eE/m across
 * the plates and the parabola y = ax²/(2v₀²) it follows until it leaves the
 * plates or strikes the positive plate. Lengths in metres, y measured toward
 * the positive plate.
 */
import { tidy } from '#lib/core/number-format.js';
import { E_CHARGE, ELECTRON_MASS } from '../_shared/charges.js';

/**
 * Field between the plates, E = U/d, in V/m.
 * @param {number} u V @param {number} d m
 */
export const uniformField = (u, d) => tidy(u / d, 9);

/**
 * The electron's flight between plates of length `length`.
 * @param {{ u: number, d: number, length: number, v0: number }} setup SI units
 */
export function flight({ u, d, length, v0 }) {
  const e = uniformField(u, d);
  const a = (E_CHARGE * e) / ELECTRON_MASS;
  const half = d / 2;
  // x where |y| reaches d/2: a x²/(2v₀²) = d/2.
  const xHit = a > 0 ? v0 * Math.sqrt(d / a) : Infinity;
  const hits = xHit < length;
  const xEnd = hits ? xHit : length;
  const time = xEnd / v0;
  const yEnd = hits ? half : (a * time * time) / 2;
  return {
    field: e,
    accel: a,
    hits,
    xEnd,
    time,
    yEnd,
    /** Slope dy/dx where the electron leaves the plates. */
    slope: (a * xEnd) / (v0 * v0),
  };
}

/**
 * Points of the path in metres: the parabola between the plates and, when the
 * electron gets out, the straight line it then follows up to `xMax`.
 * @param {{ u: number, d: number, length: number, v0: number }} setup
 * @param {number} xMax @param {number} [n]
 */
export function path(setup, xMax, n = 40) {
  const f = flight(setup);
  /** @type {Array<{ x: number, y: number }>} */
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = (f.xEnd * i) / n;
    pts.push({ x, y: (f.accel * x * x) / (2 * setup.v0 * setup.v0) });
  }
  if (!f.hits && xMax > f.xEnd) pts.push({ x: xMax, y: f.yEnd + f.slope * (xMax - f.xEnd) });
  return pts;
}
