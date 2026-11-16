/**
 * The potential of point charges on a board in centimetres, charges in
 * nanocoulombs: V = kq/r adds up as plain numbers (900·q/r volts with q in nC
 * and r in cm). A sampled grid of it gives a colour map, and marching squares
 * on that grid give the equipotential lines.
 */
import { tidy } from '#lib/core/number-format.js';
import { fieldAt, potentialAt } from '../_shared/charges.js';

/** @typedef {{ x: number, y: number, q: number }} Placed position in cm, charge in nC */
/** @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Bounds */
/** @typedef {{ x: number, y: number }} Point */

/** @param {Placed[]} charges */
const si = (charges) => charges.map((c) => ({ x: c.x * 1e-2, y: c.y * 1e-2, q: c.q * 1e-9 }));

/**
 * Potential at p (cm), in V, zero at infinity.
 * @param {Placed[]} charges @param {Point} p
 */
export const potential = (charges, p) =>
  tidy(potentialAt(si(charges), { x: p.x * 1e-2, y: p.y * 1e-2 }), 6);

/**
 * Field at p (cm), in V/m.
 * @param {Placed[]} charges @param {Point} p
 */
export const field = (charges, p) => fieldAt(si(charges), { x: p.x * 1e-2, y: p.y * 1e-2 });

/**
 * Potential sampled at the corners of a cols × rows grid over `bounds`,
 * row by row from the top (y = yMax). Values are clipped to ±`cap` V so a
 * point right on a charge stays finite.
 * @param {Placed[]} charges @param {Bounds} bounds
 * @param {number} cols @param {number} rows @param {number} [cap]
 */
export function sampleGrid(charges, bounds, cols, rows, cap = 1e4) {
  const values = new Float64Array((cols + 1) * (rows + 1));
  for (let j = 0; j <= rows; j++) {
    const y = bounds.yMax - ((bounds.yMax - bounds.yMin) * j) / rows;
    for (let i = 0; i <= cols; i++) {
      const x = bounds.xMin + ((bounds.xMax - bounds.xMin) * i) / cols;
      const v = potentialAt(si(charges), { x: x * 1e-2, y: y * 1e-2 });
      values[j * (cols + 1) + i] = Math.max(-cap, Math.min(cap, v));
    }
  }
  return { values, cols, rows, bounds };
}

/**
 * Equipotential line V = level as segments in cm, by marching squares over a
 * sampled grid. Cells that touch a clipped value are skipped, so no false line
 * is drawn around a charge.
 * @param {ReturnType<typeof sampleGrid>} grid @param {number} level @param {number} [cap]
 * @returns {Array<[Point, Point]>}
 */
export function contour(grid, level, cap = 1e4) {
  const { values, cols, rows, bounds } = grid;
  const dx = (bounds.xMax - bounds.xMin) / cols;
  const dy = (bounds.yMax - bounds.yMin) / rows;
  /** @type {Array<[Point, Point]>} */
  const out = [];
  /** @param {number} i @param {number} j */
  const at = (i, j) => values[j * (cols + 1) + i];
  /** Point on the edge from corner a to corner b where V crosses the level. */
  const cross = (
    /** @type {number} */ xa,
    /** @type {number} */ ya,
    /** @type {number} */ va,
    /** @type {number} */ xb,
    /** @type {number} */ yb,
    /** @type {number} */ vb,
  ) => {
    const t = (level - va) / (vb - va);
    return { x: xa + (xb - xa) * t, y: ya + (yb - ya) * t };
  };
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const c = [at(i, j), at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)];
      if (c.some((v) => Math.abs(v) >= cap)) continue;
      const x0 = bounds.xMin + i * dx;
      const x1 = x0 + dx;
      const y0 = bounds.yMax - j * dy;
      const y1 = y0 - dy;
      const corners = [
        { x: x0, y: y0 },
        { x: x1, y: y0 },
        { x: x1, y: y1 },
        { x: x0, y: y1 },
      ];
      /** @type {Point[]} */
      const hits = [];
      for (let e = 0; e < 4; e++) {
        const a = e;
        const b = (e + 1) % 4;
        if (c[a] < level !== c[b] < level) {
          hits.push(cross(corners[a].x, corners[a].y, c[a], corners[b].x, corners[b].y, c[b]));
        }
      }
      if (hits.length === 2) out.push([hits[0], hits[1]]);
      else if (hits.length === 4) {
        out.push([hits[0], hits[1]], [hits[2], hits[3]]);
      }
    }
  }
  return out;
}

/**
 * Colour of a potential on the map: red for positive, blue for negative,
 * white at zero, saturating smoothly for large values.
 * @param {number} v V @param {number} scale V shown at about 75% strength
 * @returns {[number, number, number]}
 */
export function colorOf(v, scale) {
  const s = Math.tanh(Math.abs(v) / scale);
  const fade = Math.round(255 * (1 - 0.8 * s));
  return v >= 0 ? [255, fade, fade] : [fade, fade, 255];
}
