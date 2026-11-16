/**
 * A body launched from the Earth's surface with no air and no spin of the
 * Earth: its path is a conic about the Earth's centre. Lengths are in Earth
 * radii and speeds in units of the first cosmic speed v_I = √(GM/R), so
 * GM = 1 and R = 1. The launch point is the top of the Earth (0; 1) and the
 * body is thrown to the right, `angle` degrees above the horizontal.
 */
import { BODIES, escapeSpeed, orbitSpeed } from '../_shared/gravity.js';

const { mass, radius } = BODIES.earth;

/** First cosmic speed of the Earth, km/s. */
export const V1 = orbitSpeed(mass, radius) / 1000;
/** Second cosmic speed of the Earth, km/s. */
export const V2 = escapeSpeed(mass, radius) / 1000;
/** Earth's radius, km. */
export const EARTH_KM = radius / 1000;

/** Paths are cut where they leave this distance from the centre, in R. */
export const FAR = 6;

/** @typedef {{ x: number, y: number }} Vec */
/** @typedef {'roi-ngay' | 'roi' | 'tron' | 'elip' | 'thoat'} Outcome */

/**
 * The conic of a launch at `speed` km/s, `angle` degrees above the horizontal.
 * @param {number} speed km/s @param {number} angle degrees
 */
export function orbitOf(speed, angle) {
  const u = speed / V1;
  const a = (angle * Math.PI) / 180;
  const vx = u * Math.cos(a);
  const vy = u * Math.sin(a);
  // e = (v² − 1/r)·r − (r·v)·v with r = (0; 1).
  const ex = -vy * vx;
  const ey = u * u - 1 - vy * vy;
  const e = Math.hypot(ex, ey);
  return {
    u,
    p: vx * vx,
    e,
    omega: Math.atan2(ey, ex),
    energy: (u * u) / 2 - 1,
  };
}

/**
 * What happens to the body.
 * @param {number} speed km/s @param {number} angle degrees
 * @returns {Outcome}
 */
export function outcomeOf(speed, angle) {
  const { p, e, energy } = orbitOf(speed, angle);
  if (energy >= -1e-9) return 'thoat';
  const perigee = p / (1 + e);
  if (perigee >= 1 - 1e-9) return e < 0.02 ? 'tron' : 'elip';
  return angle === 0 ? 'roi-ngay' : 'roi';
}

/**
 * Points of the path from the launch, clockwise round the Earth: a closed
 * orbit for one turn, a fall until it meets the ground again, an escape until
 * it goes past `FAR`.
 * @param {number} speed km/s @param {number} angle degrees
 * @returns {{ points: Vec[], landedAfter: number | null }} landedAfter is the angle (rad) round the Earth where it lands
 */
export function pathOf(speed, angle) {
  const { p, e, omega } = orbitOf(speed, angle);
  const start = { x: 0, y: 1 };
  /** @param {number} th */
  const radiusAt = (th) => {
    const d = 1 + e * Math.cos(th - omega);
    return d <= 0 ? Infinity : p / d;
  };
  /** @type {Vec[]} */
  const points = [start];
  const theta0 = Math.PI / 2;
  const steps = 720;
  const dth = (2 * Math.PI) / steps;
  for (let k = 1; k <= steps; k++) {
    const th = theta0 - k * dth;
    const r = radiusAt(th);
    if (r < 1 - 1e-9) {
      // Bisect for the point where the path meets the ground.
      let lo = th + dth;
      let hi = th;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        if (radiusAt(mid) >= 1) lo = mid;
        else hi = mid;
      }
      if (k === 1 && radiusAt(theta0 - dth / 1000) < 1) return { points, landedAfter: 0 };
      points.push({ x: Math.cos(lo), y: Math.sin(lo) });
      return { points, landedAfter: theta0 - lo };
    }
    if (r > FAR) break;
    points.push({ x: r * Math.cos(th), y: r * Math.sin(th) });
  }
  return { points, landedAfter: null };
}

/**
 * Highest distance from the centre on a closed or falling path, in R, or
 * Infinity on an escape.
 * @param {number} speed km/s @param {number} angle degrees
 */
export function apogee(speed, angle) {
  const { p, e, energy } = orbitOf(speed, angle);
  if (energy >= 0) return Infinity;
  return p / (1 - e);
}

/**
 * Mechanical energy per kilogram at launch, ½v² − GM/R, in MJ/kg.
 * @param {number} speed km/s
 */
export function energyPerKg(speed) {
  return (speed * speed) / 2 - V1 * V1;
}

/**
 * The first `shown` part (0 to 1) of a path, in SVG pixels for a picture
 * centred at (cx; cy) with `scale` pixels per Earth radius, and the point
 * reached so far.
 * @param {Vec[]} points @param {number} shown
 * @param {{ cx: number, cy: number, scale: number }} view
 */
export function motionPath(points, shown, { cx, cy, scale }) {
  const count = Math.max(1, Math.round(points.length * Math.min(1, Math.max(0, shown))));
  const px = points.slice(0, count).map((p) => ({ x: cx + p.x * scale, y: cy - p.y * scale }));
  return {
    points: px.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '),
    tip: px.at(-1) ?? null,
  };
}
