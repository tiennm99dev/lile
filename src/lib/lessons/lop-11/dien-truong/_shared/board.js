/**
 * A board in centimetres drawn on an SVG: the origin in the middle, y up,
 * `scale` pixels per centimetre. Points snap to `step` cm and stay `margin`
 * cm inside the edges.
 */
import { clamp } from '#lib/core/visuals/svg-math.js';
import { tidy } from '#lib/core/number-format.js';

/**
 * @param {{ width: number, height: number, scale: number, step?: number, margin?: number }} spec
 */
export function makeBoard({ width, height, scale, step = 0.5, margin = 0.5 }) {
  const halfX = width / 2 / scale;
  const halfY = height / 2 / scale;
  return {
    width,
    height,
    halfX,
    halfY,
    /** @param {number} x cm */
    px: (x) => width / 2 + x * scale,
    /** @param {number} y cm */
    py: (y) => height / 2 - y * scale,
    /** @param {{ x: number, y: number }} p pixels @returns {{ x: number, y: number }} */
    toCm: (p) => ({ x: (p.x - width / 2) / scale, y: (height / 2 - p.y) / scale }),
    /** @param {{ x: number, y: number }} p cm @returns {{ x: number, y: number }} */
    place: (p) => ({
      x: tidy(clamp(Math.round(p.x / step) * step, -halfX + margin, halfX - margin)),
      y: tidy(clamp(Math.round(p.y / step) * step, -halfY + margin, halfY - margin)),
    }),
  };
}

/**
 * Distance between two points, rounded away from binary noise.
 * @param {{ x: number, y: number }} a @param {{ x: number, y: number }} b
 */
export const distance = (a, b) => tidy(Math.hypot(a.x - b.x, a.y - b.y));
