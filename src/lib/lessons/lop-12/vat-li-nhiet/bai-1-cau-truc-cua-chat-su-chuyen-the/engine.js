/**
 * A box of water molecules heated from ice at −30 °C to steam at 150 °C.
 *
 * Heat comes in "phần" (parts): one part warms one gram-sized sample of
 * liquid water by 1 °C, and the other stages keep the real ratios of water
 * (ice and steam need about half as much per degree, melting 80 parts,
 * boiling 540 parts), so the temperature – heat graph has the true shape.
 *
 * Each molecule plays one role. Solid molecules vibrate round a fixed site
 * of the lattice; liquid ones wander in a layer at the bottom that spreads
 * over the whole floor; gas ones fly straight and bounce off every wall.
 * The on-screen speeds are exaggerated, but they grow with temperature.
 */
import { stageAt, totalEnergy } from '../_shared/thermal.js';

/** @typedef {'ran' | 'long' | 'khi'} Role */
/** @typedef {{ x: number, y: number, dx: number, dy: number }} Molecule */
/** @typedef {{ x0: number, y0: number, x1: number, y1: number }} Box */

/** @type {import('../_shared/thermal.js').Stage[]} */
export const STAGES = [
  { kind: 'warm', from: -30, to: 0, perDegree: 0.5, phase: 'rắn' },
  { kind: 'change', at: 0, energy: 80, from: 'rắn', to: 'lỏng' },
  { kind: 'warm', from: 0, to: 100, perDegree: 1, phase: 'lỏng' },
  { kind: 'change', at: 100, energy: 540, from: 'lỏng', to: 'khí' },
  { kind: 'warm', from: 100, to: 150, perDegree: 0.5, phase: 'khí' },
];

/** All the heat the sample can take in, in parts. */
export const MAX_ENERGY = totalEnergy(STAGES);

/** Molecules in the box, and the lattice they make as a solid. */
export const COLS = 6;
export const ROWS = 5;
export const COUNT = COLS * ROWS;
export const SPACING = 15;

/** @type {Box} */
export const BOX = { x0: 12, y0: 12, x1: 268, y1: 188 };

/**
 * The state of the sample after taking in `energy` parts.
 * @param {number} energy
 */
export function sampleAt(energy) {
  const { index, progress, temperature } = stageAt(STAGES, energy);
  let solid = 0;
  let gas = 0;
  if (index === 0) solid = COUNT;
  if (index === 1) solid = Math.round(COUNT * (1 - progress));
  if (index === 3) gas = Math.round(COUNT * progress);
  if (index === 4) gas = COUNT;
  /** @type {'ran' | 'nong-chay' | 'long' | 'soi' | 'khi'} */
  const state = /** @type {const} */ (['ran', 'nong-chay', 'long', 'soi', 'khi'])[index];
  return { temperature, state, solid, gas, liquid: COUNT - solid - gas, progress };
}

/**
 * Role of molecule `i` when `solid` molecules are solid and `gas` are gas.
 * The lattice is filled from the bottom row, so melting eats it from the
 * top; the last molecules are the first to leave as vapour.
 * @param {number} i @param {number} solid @param {number} gas
 * @returns {Role}
 */
export function roleOf(i, solid, gas) {
  if (i < solid) return 'ran';
  if (i >= COUNT - gas) return 'khi';
  return 'long';
}

/**
 * Lattice site of molecule `i`: rows from the floor up, centred.
 * @param {number} i
 */
export function siteOf(i) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const width = (COLS - 1) * SPACING;
  const cx = (BOX.x0 + BOX.x1) / 2;
  return { x: cx - width / 2 + col * SPACING, y: BOX.y1 - 8 - row * SPACING };
}

/**
 * Top of the liquid layer: the liquid (and any solid left) fills the floor
 * of the box to the height its molecules need packed together.
 * @param {number} condensed molecules that are solid or liquid
 */
export function liquidTop(condensed) {
  const area = condensed * (1.1 * SPACING) ** 2;
  const height = Math.max(SPACING, area / (BOX.x1 - BOX.x0) + SPACING / 2);
  return BOX.y1 - height;
}

/**
 * Exaggerated screen speed for a temperature, in SVG units per second; it
 * grows like the square root of the kelvin temperature.
 * @param {number} celsius
 */
export function screenSpeed(celsius) {
  return 30 * Math.sqrt((celsius + 273) / 273);
}

/**
 * Vibration amplitude of a solid molecule round its site.
 * @param {number} celsius
 */
export function amplitude(celsius) {
  return 0.8 + 1.6 * Math.sqrt(Math.max(0, celsius + 273) / 273);
}

/** @param {() => number} rand */
function heading(rand) {
  const a = rand() * 2 * Math.PI;
  return { dx: Math.cos(a), dy: Math.sin(a) };
}

/**
 * Molecules of a fresh block of ice, each at its lattice site.
 * @param {() => number} rand
 * @returns {Molecule[]}
 */
export function freshSample(rand) {
  return Array.from({ length: COUNT }, (_, i) => ({ ...siteOf(i), ...heading(rand) }));
}

/**
 * @param {number} x @param {number} d @param {number} lo @param {number} hi
 * @returns {[number, number]}
 */
function bounce(x, d, lo, hi) {
  if (x < lo) return [Math.min(hi, 2 * lo - x), Math.abs(d)];
  if (x > hi) return [Math.max(lo, 2 * hi - x), -Math.abs(d)];
  return [x, d];
}

/**
 * Moves every molecule for `dt` seconds.
 * @param {Molecule[]} molecules
 * @param {number} dt
 * @param {ReturnType<typeof sampleAt>} sample
 * @param {number} time seconds since the start, for the vibration phase
 * @param {() => number} rand
 * @returns {Molecule[]}
 */
export function step(molecules, dt, sample, time, rand) {
  const speed = screenSpeed(sample.temperature);
  const amp = amplitude(sample.temperature);
  const top = liquidTop(sample.solid + sample.liquid);
  const moved = molecules.map((m, i) => {
    const role = roleOf(i, sample.solid, sample.gas);
    if (role === 'ran') {
      const site = siteOf(i);
      const tx = site.x + amp * Math.sin(17 * time + i * 1.7);
      const ty = site.y + amp * Math.cos(13 * time + i * 2.3);
      const k = Math.min(1, dt * 10);
      return { ...m, x: m.x + (tx - m.x) * k, y: m.y + (ty - m.y) * k };
    }
    if (role === 'long') {
      // A short hop in a new direction now and then: the molecule stays
      // among its neighbours but its place keeps moving.
      const turn = rand() < Math.min(1, dt * 6);
      let { dx, dy } = turn ? heading(rand) : m;
      let x = m.x + dx * speed * 0.6 * dt;
      let y = m.y + dy * speed * 0.6 * dt;
      // A molecule that has just condensed falls back into the layer.
      if (y < top - 4) y = Math.min(BOX.y1, m.y + 60 * dt);
      [x, dx] = bounce(x, dx, BOX.x0 + 4, BOX.x1 - 4);
      if (y >= top - 4) [y, dy] = bounce(y, dy, top, BOX.y1 - 4);
      return { x, y, dx, dy };
    }
    let x = m.x + m.dx * speed * 3 * dt;
    let y = m.y + m.dy * speed * 3 * dt;
    let dx = m.dx;
    let dy = m.dy;
    [x, dx] = bounce(x, dx, BOX.x0 + 4, BOX.x1 - 4);
    [y, dy] = bounce(y, dy, BOX.y0 + 4, BOX.y1 - 4);
    return { x, y, dx, dy };
  });
  return keepApart(moved, sample);
}

/**
 * Pushes apart liquid molecules that come closer than one lattice spacing,
 * so a liquid stays about as dense as the solid instead of piling up. A
 * solid molecule holds its site; only the liquid one gives way.
 * @param {Molecule[]} molecules
 * @param {ReturnType<typeof sampleAt>} sample
 * @returns {Molecule[]}
 */
function keepApart(molecules, sample) {
  const out = molecules.map((m) => ({ ...m }));
  const roles = out.map((_, i) => roleOf(i, sample.solid, sample.gas));
  for (let i = 0; i < out.length; i++) {
    for (let j = i + 1; j < out.length; j++) {
      const a = roles[i];
      const b = roles[j];
      if (a === 'khi' || b === 'khi' || (a === 'ran' && b === 'ran')) continue;
      const p = out[i];
      const q = out[j];
      const gap = Math.hypot(q.x - p.x, q.y - p.y);
      if (gap >= SPACING) continue;
      const ux = gap > 1e-6 ? (q.x - p.x) / gap : 1;
      const uy = gap > 1e-6 ? (q.y - p.y) / gap : 0;
      const push = SPACING - gap;
      const share = a === 'ran' ? [0, 1] : b === 'ran' ? [1, 0] : [0.5, 0.5];
      p.x -= ux * push * share[0];
      p.y -= uy * push * share[0];
      q.x += ux * push * share[1];
      q.y += uy * push * share[1];
    }
  }
  for (const m of out) {
    m.x = Math.min(BOX.x1 - 4, Math.max(BOX.x0 + 4, m.x));
    m.y = Math.min(BOX.y1 - 4, Math.max(BOX.y0 + 4, m.y));
  }
  return out;
}

/**
 * Mean distance from each molecule to its nearest neighbour, in units of
 * the lattice spacing: about 1 in a solid or liquid, several in a gas.
 * @param {Array<{ x: number, y: number }>} points
 */
export function nearestGap(points) {
  if (points.length < 2) return 0;
  let sum = 0;
  for (const p of points) {
    let best = Infinity;
    for (const q of points) {
      if (q === p) continue;
      best = Math.min(best, Math.hypot(p.x - q.x, p.y - q.y));
    }
    sum += best;
  }
  return sum / points.length / SPACING;
}

/** What the book's table says about each state. */
export const STRUCTURE = {
  ran: {
    name: 'Chất rắn',
    gap: 'Rất gần nhau (cỡ kích thước phân tử)',
    order: 'Sắp xếp có trật tự',
    motion: 'Dao động quanh vị trí cân bằng xác định',
    shape: 'Có hình dạng và thể tích riêng, rất khó nén',
  },
  long: {
    name: 'Chất lỏng',
    gap: 'Gần nhau, xa hơn một chút so với chất rắn',
    order: 'Kém trật tự hơn chất rắn',
    motion: 'Dao động quanh vị trí cân bằng có thể di chuyển',
    shape: 'Có thể tích riêng, có hình dạng của phần bình chứa nó, khó nén',
  },
  khi: {
    name: 'Chất khí',
    gap: 'Rất xa nhau (gấp nhiều lần kích thước phân tử)',
    order: 'Không có trật tự',
    motion: 'Chuyển động hỗn loạn về mọi phía',
    shape: 'Không có hình dạng và thể tích riêng, chiếm toàn bộ bình chứa, dễ nén',
  },
};
