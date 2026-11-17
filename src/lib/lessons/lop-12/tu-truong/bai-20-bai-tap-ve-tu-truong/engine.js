/**
 * Direction drills for the magnetic-field chapter. The page is the x–y
 * plane (x right, y up, z out of the page toward the reader). A direction
 * in the page is an angle in degrees counterclockwise from +x, a multiple
 * of 45°; `ra` is out of the page (⊙) and `vao` into it (⊗).
 *
 * - force: the force on a current, F⃗ = I·l⃗ × B⃗ (left-hand rule);
 * - rod: the current in a rod sliding across a field, along v⃗ × B⃗ (the
 *   force on its positive charges);
 * - loop: the induced current in a loop in the page (Lenz).
 */
import { cross3 } from '#lib/geom-engine/solid.js';
import { inducedTurn } from '../_shared/lenz.js';

/** @typedef {number | 'ra' | 'vao'} Dir */
/** @typedef {{ x: number, y: number, z: number }} Vec3 */

/**
 * Unit vector of a direction.
 * @param {Dir} d
 * @returns {Vec3}
 */
export function unitOf(d) {
  if (d === 'ra') return { x: 0, y: 0, z: 1 };
  if (d === 'vao') return { x: 0, y: 0, z: -1 };
  const r = (d * Math.PI) / 180;
  return { x: Math.cos(r), y: Math.sin(r), z: 0 };
}

/**
 * The direction of a vector, snapped to 45° in the page; null for a zero
 * vector.
 * @param {Vec3} v
 * @returns {Dir | null}
 */
export function dirOf(v) {
  const inPlane = Math.hypot(v.x, v.y);
  if (inPlane < 1e-9 && Math.abs(v.z) < 1e-9) return null;
  if (inPlane < 1e-9) return v.z > 0 ? 'ra' : 'vao';
  const deg = (Math.atan2(v.y, v.x) * 180) / Math.PI;
  return wrap(Math.round(deg / 45) * 45);
}

/**
 * Angle in [0°, 360°).
 * @param {number} deg
 */
export function wrap(deg) {
  return ((deg % 360) + 360) % 360;
}

/**
 * The direction of a ⨯ b for two directions, or null when they are parallel.
 * @param {Dir} a @param {Dir} b
 */
export function crossDir(a, b) {
  return dirOf(cross3(unitOf(a), unitOf(b)));
}

/** In-page direction words, every 45° from +x. */
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

/**
 * A direction in words.
 * @param {Dir} d
 */
export function dirWords(d) {
  if (d === 'ra') return 'hướng ra khỏi mặt phẳng hình vẽ (⊙)';
  if (d === 'vao') return 'hướng vào mặt phẳng hình vẽ (⊗)';
  return WORDS[Math.round(wrap(d) / 45) % 8];
}

/**
 * @typedef {{ kind: 'force', current: number, field: Dir }} ForceTask
 * @typedef {{ kind: 'rod', velocity: number, field: 'ra' | 'vao' }} RodTask
 * @typedef {{ kind: 'loop', field: 'ra' | 'vao', change: 'tang' | 'giam', story: string }} LoopTask
 * @typedef {ForceTask | RodTask | LoopTask} Task
 */

/** The drills, in the order the widget shows them. @type {Task[]} */
export const TASKS = [
  { kind: 'force', current: 0, field: 'vao' },
  { kind: 'force', current: 90, field: 'ra' },
  { kind: 'force', current: 180, field: 90 },
  { kind: 'loop', field: 'ra', change: 'tang', story: 'Cảm ứng từ tăng dần.' },
  { kind: 'rod', velocity: 0, field: 'vao' },
  { kind: 'force', current: 270, field: 0 },
  { kind: 'loop', field: 'vao', change: 'tang', story: 'Cảm ứng từ tăng dần.' },
  { kind: 'force', current: 45, field: 'vao' },
  {
    kind: 'loop',
    field: 'vao',
    change: 'giam',
    story: 'Vòng dây đang được kéo ra khỏi vùng từ trường.',
  },
  { kind: 'rod', velocity: 180, field: 'vao' },
  { kind: 'loop', field: 'ra', change: 'giam', story: 'Cảm ứng từ giảm dần.' },
];

/**
 * The right answer of a task: a direction for a force or a rod, a turn
 * (seen from the front) for a loop.
 * @param {Task} task
 * @returns {Dir | 'cw' | 'ccw' | null}
 */
export function answerOf(task) {
  if (task.kind === 'force') return crossDir(task.current, task.field);
  if (task.kind === 'rod') return crossDir(task.velocity, task.field);
  return inducedTurn(task.field, task.change);
}

/**
 * Whether a guess matches the answer of a task.
 * @param {Task} task
 * @param {Dir | 'cw' | 'ccw' | null} guess
 */
export function isRight(task, guess) {
  const a = answerOf(task);
  if (guess === null || a === null) return false;
  if (typeof a === 'number' && typeof guess === 'number') return wrap(a) === wrap(guess);
  return a === guess;
}
