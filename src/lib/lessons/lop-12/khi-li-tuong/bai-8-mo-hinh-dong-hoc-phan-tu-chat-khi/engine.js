/**
 * A two-dimensional box of ideal-gas molecules with one large Brown
 * particle among them.
 *
 * The molecules are points that never meet each other (the ideal-gas
 * model: no interaction except at collisions, and point molecules hardly
 * ever collide). They bounce elastically off the walls, and every bounce is
 * counted with the momentum it hands the wall, which is what makes the
 * pressure. The Brown particle is a heavy disc; molecules bounce off it
 * elastically too, so it is kicked from every side at random and wanders
 * along a zigzag path. Screen speeds grow like the square root of the
 * kelvin temperature, as molecular speeds do.
 */
import { gauss } from '../_shared/gas.js';

/** @typedef {{ x: number, y: number, vx: number, vy: number }} Body */
/** @typedef {{ molecules: Body[], brown: Body, hits: number, impulse: number, time: number }} Box */

export const WIDTH = 280;
export const HEIGHT = 200;
/** Radius of the Brown particle and its mass in molecule masses. */
export const BROWN_RADIUS = 10;
export const BROWN_MASS = 30;
/** Typical screen speed of a molecule at 300 K, units per second. */
export const BASE_SPEED = 110;

/**
 * Spread of each velocity component at a temperature.
 * @param {number} kelvin
 */
export function spreadAt(kelvin) {
  return (BASE_SPEED * Math.sqrt(kelvin / 300)) / Math.SQRT2;
}

/**
 * A fresh box of `count` molecules at `kelvin`, the Brown particle at rest
 * in the middle.
 * @param {number} count @param {number} kelvin @param {() => number} rand
 * @returns {Box}
 */
export function freshBox(count, kelvin, rand) {
  const s = spreadAt(kelvin);
  const molecules = [];
  while (molecules.length < count) {
    const x = 4 + rand() * (WIDTH - 8);
    const y = 4 + rand() * (HEIGHT - 8);
    if (Math.hypot(x - WIDTH / 2, y - HEIGHT / 2) < BROWN_RADIUS + 4) continue;
    molecules.push({ x, y, vx: s * gauss(rand), vy: s * gauss(rand) });
  }
  return {
    molecules,
    brown: { x: WIDTH / 2, y: HEIGHT / 2, vx: 0, vy: 0 },
    hits: 0,
    impulse: 0,
    time: 0,
  };
}

/**
 * The same box with `count` molecules: extra ones are added at `kelvin`,
 * surplus ones removed.
 * @param {Box} box @param {number} count @param {number} kelvin @param {() => number} rand
 * @returns {Box}
 */
export function withCount(box, count, kelvin, rand) {
  if (count <= box.molecules.length) return { ...box, molecules: box.molecules.slice(0, count) };
  const extra = freshBox(count - box.molecules.length, kelvin, rand).molecules;
  return { ...box, molecules: [...box.molecules, ...extra] };
}

/**
 * Every velocity scaled from one temperature to another: v grows like √T.
 * @param {Box} box @param {number} from @param {number} to
 * @returns {Box}
 */
export function reheat(box, from, to) {
  const k = Math.sqrt(to / from);
  /** @param {Body} b */
  const scale = (b) => ({ ...b, vx: b.vx * k, vy: b.vy * k });
  return { ...box, molecules: box.molecules.map(scale), brown: scale(box.brown) };
}

/**
 * Elastic bounce of a molecule (mass 1) off the Brown particle when they
 * overlap and approach each other; both bodies are changed in place.
 * @param {Body} m @param {Body} b
 */
function collide(m, b) {
  const dx = m.x - b.x;
  const dy = m.y - b.y;
  const dist = Math.hypot(dx, dy);
  if (dist >= BROWN_RADIUS || dist === 0) return;
  const nx = dx / dist;
  const ny = dy / dist;
  const approach = (m.vx - b.vx) * nx + (m.vy - b.vy) * ny;
  if (approach >= 0) return;
  const j = (-2 * approach) / (1 + 1 / BROWN_MASS);
  m.vx += j * nx;
  m.vy += j * ny;
  b.vx -= (j / BROWN_MASS) * nx;
  b.vy -= (j / BROWN_MASS) * ny;
  m.x = b.x + nx * BROWN_RADIUS;
  m.y = b.y + ny * BROWN_RADIUS;
}

/**
 * Moves every body for `dt` seconds (in steps of at most 1/60 s).
 * @param {Box} box @param {number} dt
 * @returns {Box}
 */
export function step(box, dt) {
  const molecules = box.molecules.map((m) => ({ ...m }));
  const brown = { ...box.brown };
  let hits = box.hits;
  let impulse = box.impulse;
  let left = dt;
  while (left > 1e-9) {
    const h = Math.min(left, 1 / 60);
    left -= h;
    brown.x += brown.vx * h;
    brown.y += brown.vy * h;
    const r = BROWN_RADIUS;
    if (brown.x < r) [brown.x, brown.vx] = [2 * r - brown.x, Math.abs(brown.vx)];
    if (brown.x > WIDTH - r) [brown.x, brown.vx] = [2 * (WIDTH - r) - brown.x, -Math.abs(brown.vx)];
    if (brown.y < r) [brown.y, brown.vy] = [2 * r - brown.y, Math.abs(brown.vy)];
    if (brown.y > HEIGHT - r)
      [brown.y, brown.vy] = [2 * (HEIGHT - r) - brown.y, -Math.abs(brown.vy)];
    for (const m of molecules) {
      m.x += m.vx * h;
      m.y += m.vy * h;
      if (m.x < 0 || m.x > WIDTH) {
        hits += 1;
        impulse += 2 * Math.abs(m.vx);
        m.vx = m.x < 0 ? Math.abs(m.vx) : -Math.abs(m.vx);
        m.x = m.x < 0 ? -m.x : 2 * WIDTH - m.x;
      }
      if (m.y < 0 || m.y > HEIGHT) {
        hits += 1;
        impulse += 2 * Math.abs(m.vy);
        m.vy = m.y < 0 ? Math.abs(m.vy) : -Math.abs(m.vy);
        m.y = m.y < 0 ? -m.y : 2 * HEIGHT - m.y;
      }
      collide(m, brown);
    }
  }
  return { molecules, brown, hits, impulse, time: box.time + dt };
}

/**
 * Total kinetic energy, molecules of mass 1 and the Brown particle.
 * @param {Box} box
 */
export function energyOf(box) {
  const e = box.molecules.reduce((s, m) => s + (m.vx ** 2 + m.vy ** 2) / 2, 0);
  return e + (BROWN_MASS * (box.brown.vx ** 2 + box.brown.vy ** 2)) / 2;
}

/**
 * Rate of growth of a counter over the samples kept, per second.
 * @param {Array<{ t: number, value: number }>} samples oldest first
 */
export function rateOf(samples) {
  if (samples.length < 2) return 0;
  const a = samples[0];
  const b = samples[samples.length - 1];
  return b.t > a.t ? (b.value - a.value) / (b.t - a.t) : 0;
}
