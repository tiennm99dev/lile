/**
 * A charge moved in the uniform field between two horizontal plates: the
 * positive plate on top, the negative plate (zero of potential energy) at
 * y = BOTTOM cm, the field pointing down. Charges in µC, lengths in cm, the
 * field in V/m, so work and energy come out in µJ.
 */
import { tidy } from '#lib/core/number-format.js';

/** Height of the negative plate on the board, cm. */
export const BOTTOM = -4;
/** Height of the positive plate on the board, cm. */
export const TOP = 4;

/** @typedef {{ x: number, y: number }} Point cm */

/**
 * Potential energy W = qEd with d the distance from the point to the
 * negative plate, in µJ.
 * @param {number} q µC @param {number} field V/m @param {number} y cm
 */
export const energyAt = (q, field, y) => tidy(q * field * (y - BOTTOM) * 1e-2, 9);

/**
 * Work of the electric force on q moved from a to b, A = qE·d where d is
 * the drop along the field (the field points down), in µJ.
 * @param {number} q @param {number} field @param {Point} a @param {Point} b
 */
export const workAlong = (q, field, a, b) => tidy(q * field * (a.y - b.y) * 1e-2, 9);

/**
 * Work summed step by step along a path, and the path's length in cm.
 * @param {number} q @param {number} field @param {Point[]} path
 */
export function walk(q, field, path) {
  let work = 0;
  let length = 0;
  for (let i = 1; i < path.length; i++) {
    work += workAlong(q, field, path[i - 1], path[i]);
    length += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
  }
  return { work: tidy(work, 6), length: tidy(length, 6) };
}

/**
 * Ready-made paths from m to n: straight, a broken line through a corner
 * near the positive plate, and a loop that dips toward the negative plate.
 * @param {Point} m @param {Point} n
 * @returns {Array<{ id: string, name: string, points: Point[] }>}
 */
export function presetPaths(m, n) {
  const straight = Array.from({ length: 21 }, (_, i) => ({
    x: m.x + ((n.x - m.x) * i) / 20,
    y: m.y + ((n.y - m.y) * i) / 20,
  }));
  const corner = { x: (m.x + n.x) / 2, y: TOP - 0.5 };
  const broken = [
    ...Array.from({ length: 10 }, (_, i) => ({
      x: m.x + ((corner.x - m.x) * i) / 10,
      y: m.y + ((corner.y - m.y) * i) / 10,
    })),
    ...Array.from({ length: 11 }, (_, i) => ({
      x: corner.x + ((n.x - corner.x) * i) / 10,
      y: corner.y + ((n.y - corner.y) * i) / 10,
    })),
  ];
  const loop = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    return {
      x: m.x + (n.x - m.x) * t,
      y: m.y + (n.y - m.y) * t - (m.y - BOTTOM - 0.5) * Math.sin(Math.PI * t),
    };
  }).map((p) => ({ x: tidy(p.x, 6), y: tidy(Math.max(BOTTOM + 0.3, p.y), 6) }));
  return [
    { id: 'thang', name: 'Đường thẳng', points: straight },
    { id: 'gap-khuc', name: 'Đường gấp khúc', points: broken },
    { id: 'vong', name: 'Đường vòng xuống thấp', points: loop },
  ];
}
