/**
 * The magnetic field of currents seen in a plane, for the lesson on the
 * magnetic field. Every current is a long straight wire perpendicular to the
 * page: `current` +1 flows out of the page (⊙), −1 into it (⊗). A wire
 * gives B ∝ I/r around it, counterclockwise for a current out of the page,
 * as the right-hand grip rule says. A solenoid cut along its axis is a row of
 * wires coming out of the page on top and going in at the bottom.
 * Coordinates are in field units with y up.
 */

/** @typedef {{ x: number, y: number }} Vec */
/** @typedef {{ x: number, y: number, current: number }} Wire */
/** @typedef {'day-thang' | 'ong-day'} SceneId */

export const BOUNDS = { xMin: -6, xMax: 6, yMin: -3.75, yMax: 3.75 };

/** Half length and radius of the solenoid, and its turns drawn on each side. */
export const COIL = { half: 2.7, radius: 1, turns: 10 };

/**
 * The wires of a scene, with the current direction `sign` (+1 or −1): for
 * the straight wire +1 is out of the page; for the solenoid +1 sends the
 * current out of the page along the top row, so the field inside points to
 * the right.
 * @param {SceneId} id @param {number} sign
 * @returns {Wire[]}
 */
export function wiresOf(id, sign) {
  if (id === 'day-thang') return [{ x: 0, y: 0, current: sign }];
  /** @type {Wire[]} */
  const out = [];
  for (let i = 0; i < COIL.turns; i++) {
    const x = -COIL.half + (2 * COIL.half * i) / (COIL.turns - 1);
    out.push({ x, y: COIL.radius, current: sign }, { x, y: -COIL.radius, current: -sign });
  }
  return out;
}

/**
 * Field at `p`, in arbitrary units (one wire of unit current gives 1/r).
 * @param {Wire[]} wires @param {Vec} p
 * @returns {Vec}
 */
export function fieldAt(wires, p) {
  let bx = 0;
  let by = 0;
  for (const w of wires) {
    const dx = p.x - w.x;
    const dy = p.y - w.y;
    const r2 = dx * dx + dy * dy;
    if (r2 === 0) continue;
    bx += (-w.current * dy) / r2;
    by += (w.current * dx) / r2;
  }
  return { x: bx, y: by };
}

/**
 * Direction of the field at `p` in degrees, counterclockwise from +x: the
 * way the north end of a small compass needle points.
 * @param {Wire[]} wires @param {Vec} p
 */
export function needleAngle(wires, p) {
  const b = fieldAt(wires, p);
  return (Math.atan2(b.y, b.x) * 180) / Math.PI;
}

/**
 * Field size at `p` compared with the field 1 unit from a lone wire.
 * @param {Wire[]} wires @param {Vec} p
 */
export function strengthAt(wires, p) {
  const b = fieldAt(wires, p);
  return Math.hypot(b.x, b.y);
}

/**
 * A word for a field size: "mạnh", "trung bình" or "yếu".
 * @param {number} m
 */
export function strengthWord(m) {
  if (m >= 1.2) return 'mạnh';
  if (m >= 0.5) return 'trung bình';
  return 'yếu';
}

/**
 * Moves `p` into the board and at least `gap` away from every wire.
 * @param {Wire[]} wires @param {Vec} p @param {number} [gap]
 * @returns {Vec}
 */
export function pushOut(wires, p, gap = 0.45) {
  let q = {
    x: Math.min(BOUNDS.xMax - 0.4, Math.max(BOUNDS.xMin + 0.4, p.x)),
    y: Math.min(BOUNDS.yMax - 0.4, Math.max(BOUNDS.yMin + 0.4, p.y)),
  };
  for (const w of wires) {
    const dx = q.x - w.x;
    const dy = q.y - w.y;
    const d = Math.hypot(dx, dy);
    if (d < gap) {
      const ux = d === 0 ? 0 : dx / d;
      const uy = d === 0 ? 1 : dy / d;
      q = { x: w.x + ux * gap, y: w.y + uy * gap };
    }
  }
  return q;
}

const inBounds = (/** @type {Vec} */ p) =>
  p.x >= BOUNDS.xMin && p.x <= BOUNDS.xMax && p.y >= BOUNDS.yMin && p.y <= BOUNDS.yMax;

/**
 * Follows the field from `start` in steps of `step` (negative to go against
 * the field) until the line closes on itself, leaves the board or comes
 * too close to a wire.
 * @param {Wire[]} wires @param {Vec} start @param {number} step
 */
function follow(wires, start, step) {
  const unit = (/** @type {Vec} */ p) => {
    const b = fieldAt(wires, p);
    const m = Math.hypot(b.x, b.y);
    return m === 0 ? null : { x: b.x / m, y: b.y / m };
  };
  /** @type {Vec[]} */
  const line = [start];
  let p = start;
  let travelled = 0;
  for (let i = 0; i < 1600; i++) {
    const d1 = unit(p);
    if (!d1) break;
    const d2 = unit({ x: p.x + (d1.x * step) / 2, y: p.y + (d1.y * step) / 2 }) ?? d1;
    p = { x: p.x + d2.x * step, y: p.y + d2.y * step };
    travelled += Math.abs(step);
    if (!inBounds(p)) return { line, closed: false };
    if (wires.some((w) => Math.hypot(p.x - w.x, p.y - w.y) < 0.12)) return { line, closed: false };
    line.push(p);
    if (travelled > 1 && Math.hypot(p.x - start.x, p.y - start.y) < Math.abs(step) * 1.5) {
      line.push(start);
      return { line, closed: true };
    }
  }
  return { line, closed: false };
}

/**
 * The field line through `start`, ordered along the field. It is closed
 * when it comes back to `start` inside the board; otherwise it runs from
 * one edge of the board to another.
 * @param {Wire[]} wires @param {Vec} start
 * @returns {{ points: Vec[], closed: boolean }}
 */
export function fieldLine(wires, start) {
  const ahead = follow(wires, start, 0.05);
  if (ahead.closed) return { points: ahead.line, closed: true };
  const back = follow(wires, start, -0.05);
  return { points: [...back.line.slice(1).reverse(), ...ahead.line], closed: false };
}

/**
 * Starting points of the drawn field lines: circles of growing gaps round
 * the straight wire (the field weakens away from it), and points across
 * the inside of the solenoid.
 * @param {SceneId} id
 * @returns {Vec[]}
 */
export function seedsOf(id) {
  if (id === 'day-thang') return [0.6, 1.2, 2, 3].map((r) => ({ x: r, y: 0 }));
  return [-0.8, -0.48, -0.16, 0.16, 0.48, 0.8].map((y) => ({ x: 0, y }));
}

/**
 * All the drawn field lines of a scene.
 * @param {SceneId} id @param {number} sign
 */
export function linesOf(id, sign) {
  const wires = wiresOf(id, sign);
  return seedsOf(id).map((s) => fieldLine(wires, s));
}

/**
 * Which end of the solenoid is its north pole (where the lines leave):
 * the right end when the current runs out of the page along the top.
 * @param {number} sign
 * @returns {'phải' | 'trái'}
 */
export function northEnd(sign) {
  return sign > 0 ? 'phải' : 'trái';
}

const WAYS = [
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
 * A direction in words, to the nearest eighth of a turn.
 * @param {number} deg
 */
export function wayOf(deg) {
  return WAYS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}

/** @typedef {'len' | 'xuong' | 'trai' | 'phai' | 'ra' | 'vao'} Way */
/**
 * One grip-rule question: a straight wire perpendicular to the page with a
 * point beside it (`spot`), or a loop in the page with its current turning
 * clockwise (`cw`) or not, seen by the reader.
 * @typedef {{ kind: 'day', out: boolean, spot: 'len' | 'xuong' | 'trai' | 'phai' }
 *   | { kind: 'vong', cw: boolean }} GripQuestion
 */

/** The ways a field can point, with their words. @type {Array<{ way: Way, label: string }>} */
export const WAYS_3D = [
  { way: 'len', label: 'Lên trên' },
  { way: 'xuong', label: 'Xuống dưới' },
  { way: 'trai', label: 'Sang trái' },
  { way: 'phai', label: 'Sang phải' },
  { way: 'ra', label: 'Hướng ra (⊙)' },
  { way: 'vao', label: 'Hướng vào (⊗)' },
];

/** The questions of the grip-rule round, in order. @type {GripQuestion[]} */
export const GRIP_QUESTIONS = [
  { kind: 'day', out: true, spot: 'phai' },
  { kind: 'day', out: false, spot: 'len' },
  { kind: 'vong', cw: false },
  { kind: 'day', out: true, spot: 'xuong' },
  { kind: 'day', out: false, spot: 'trai' },
  { kind: 'vong', cw: true },
  { kind: 'day', out: true, spot: 'len' },
  { kind: 'day', out: false, spot: 'phai' },
];

/**
 * The way B points in a grip-rule question. Round a current out of the
 * page the lines turn counterclockwise: up on the right of the wire, left
 * above it. A loop whose current turns counterclockwise for the reader has
 * its field inside pointing out of the page.
 * @param {GripQuestion} q
 * @returns {Way}
 */
export function gripAnswer(q) {
  if (q.kind === 'vong') return q.cw ? 'vao' : 'ra';
  /** @type {Record<'len' | 'xuong' | 'trai' | 'phai', Way>} */
  const ccw = { phai: 'len', len: 'trai', trai: 'xuong', xuong: 'phai' };
  /** @type {Record<Way, Way>} */
  const flip = { len: 'xuong', xuong: 'len', trai: 'phai', phai: 'trai', ra: 'vao', vao: 'ra' };
  const w = ccw[q.spot];
  return q.out ? w : flip[w];
}
