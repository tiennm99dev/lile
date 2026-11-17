/**
 * The magnetic force on a straight wire in a uniform field, F = I·l⃗ × B⃗,
 * so F = BIL·sin α with α the angle between the wire (the current) and B.
 * The page is the x–y plane, x to the right, y up and z out of the page
 * toward the reader. The current runs in the page at `theta` degrees
 * counterclockwise from +x; the field points right, left, out of the page
 * or into it.
 */
import { tidy } from '#lib/core/number-format.js';

/** @typedef {'phai' | 'trai' | 'ra' | 'vao'} FieldWay */
/** @typedef {{ x: number, y: number, z: number }} Vec3 */

/** Unit vector of each field direction. @type {Record<FieldWay, Vec3>} */
export const FIELD_UNIT = {
  phai: { x: 1, y: 0, z: 0 },
  trai: { x: -1, y: 0, z: 0 },
  ra: { x: 0, y: 0, z: 1 },
  vao: { x: 0, y: 0, z: -1 },
};

/** @param {Vec3} a @param {Vec3} b @returns {Vec3} */
function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Unit vector along the current.
 * @param {number} theta degrees
 * @returns {Vec3}
 */
export function currentUnit(theta) {
  const r = (theta * Math.PI) / 180;
  return { x: tidy(Math.cos(r), 12), y: tidy(Math.sin(r), 12), z: 0 };
}

/**
 * Angle α between the wire (along the current) and B, 0° to 180°.
 * @param {number} theta @param {FieldWay} way
 */
export function angleToField(theta, way) {
  const l = currentUnit(theta);
  const b = FIELD_UNIT[way];
  const dot = l.x * b.x + l.y * b.y + l.z * b.z;
  return tidy((Math.acos(Math.max(-1, Math.min(1, dot))) * 180) / Math.PI, 9);
}

/**
 * Size of the force, F = B·I·L·sin α, in newtons.
 * @param {number} B tesla @param {number} I ampere @param {number} L metre
 * @param {number} alpha degrees
 */
export function forceSize(B, I, L, alpha) {
  return tidy(B * I * L * Math.sin((alpha * Math.PI) / 180), 12);
}

/**
 * The force vector for current I along `theta` in a field of size B
 * pointing `way`, on a length L of wire: F = I·L·(l̂ × B⃗).
 * @param {number} B @param {number} I @param {number} L
 * @param {number} theta @param {FieldWay} way
 * @returns {Vec3}
 */
export function forceVector(B, I, L, theta, way) {
  const c = cross(currentUnit(theta), FIELD_UNIT[way]);
  const k = B * I * L;
  return { x: tidy(k * c.x, 12), y: tidy(k * c.y, 12), z: tidy(k * c.z, 12) };
}

/**
 * Cảm ứng từ found from a measured force: B = F / (I·L·sin α).
 * @param {number} F @param {number} I @param {number} L @param {number} alpha
 */
export function fieldFrom(F, I, L, alpha) {
  return tidy(F / (I * L * Math.sin((alpha * Math.PI) / 180)), 9);
}

/**
 * The direction of a force in words: in the page (by its angle) or out of
 * or into it.
 * @param {Vec3} f
 */
export function forceWords(f) {
  const inPlane = Math.hypot(f.x, f.y);
  if (inPlane < 1e-12 && Math.abs(f.z) < 1e-12) return 'không có lực';
  if (inPlane < 1e-12)
    return f.z > 0 ? 'hướng ra khỏi mặt phẳng hình vẽ' : 'hướng vào mặt phẳng hình vẽ';
  const deg = ((((Math.atan2(f.y, f.x) * 180) / Math.PI) % 360) + 360) % 360;
  const WORDS = [
    'sang phải',
    'chéo lên bên phải',
    'lên trên',
    'chéo lên bên trái',
    'sang trái',
    'chéo xuống bên trái',
    'xuống dưới',
    'chéo xuống bên phải',
  ];
  return `nằm trong mặt phẳng hình vẽ, ${WORDS[Math.round(deg / 45) % 8]}`;
}
