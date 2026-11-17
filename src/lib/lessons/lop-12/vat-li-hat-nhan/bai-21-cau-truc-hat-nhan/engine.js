/**
 * The nucleus builder of the lesson on nuclear structure: which nuclei a
 * number of protons and neutrons makes (stable isotope, known radioactive
 * isotope or one that does not hold together), the nucleus radius
 * R = 1,2·10⁻¹⁵·A^(1/3) m and the building tasks.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { NAMES, SYMBOLS } from '../_shared/nuclear.js';

/** The builder goes up to calcium. */
export const MAX_Z = 20;
export const MAX_N = 28;

/** Mass numbers of the stable isotopes, by Z. */
export const STABLE = /** @type {Record<number, number[]>} */ ({
  1: [1, 2],
  2: [3, 4],
  3: [6, 7],
  4: [9],
  5: [10, 11],
  6: [12, 13],
  7: [14, 15],
  8: [16, 17, 18],
  9: [19],
  10: [20, 21, 22],
  11: [23],
  12: [24, 25, 26],
  13: [27],
  14: [28, 29, 30],
  15: [31],
  16: [32, 33, 34, 36],
  17: [35, 37],
  18: [36, 38, 40],
  19: [39, 41],
  20: [40, 42, 43, 44, 46, 48],
});

/**
 * Radioactive isotopes of the first 20 elements with a half-life of at
 * least an hour, plus the short-lived tracers of PET scans, and what they
 * are known for.
 * @type {ReadonlyArray<{ Z: number, A: number, half: string, note?: string }>}
 */
export const RADIOACTIVE = [
  { Z: 1, A: 3, half: '12,3 năm', note: 'tritium, nhiên liệu của phản ứng nhiệt hạch' },
  { Z: 4, A: 7, half: '53 ngày' },
  { Z: 4, A: 10, half: '1,4 triệu năm' },
  { Z: 6, A: 11, half: '20 phút', note: 'dùng trong chụp PET' },
  { Z: 6, A: 14, half: '5 730 năm', note: 'dùng để xác định tuổi cổ vật' },
  { Z: 7, A: 13, half: '10 phút', note: 'dùng trong chụp PET' },
  { Z: 8, A: 15, half: '2 phút', note: 'dùng trong chụp PET' },
  { Z: 9, A: 18, half: '110 phút', note: 'dùng nhiều nhất trong chụp PET' },
  { Z: 11, A: 22, half: '2,6 năm' },
  { Z: 11, A: 24, half: '15 giờ' },
  { Z: 12, A: 28, half: '21 giờ' },
  { Z: 13, A: 26, half: '0,7 triệu năm' },
  { Z: 14, A: 31, half: '2,6 giờ' },
  { Z: 14, A: 32, half: '153 năm' },
  { Z: 15, A: 32, half: '14,3 ngày', note: 'dùng làm chất đánh dấu trong nông nghiệp, sinh học' },
  { Z: 15, A: 33, half: '25 ngày' },
  { Z: 16, A: 35, half: '87 ngày' },
  { Z: 16, A: 38, half: '2,8 giờ' },
  { Z: 17, A: 36, half: '0,3 triệu năm' },
  { Z: 18, A: 37, half: '35 ngày' },
  { Z: 18, A: 39, half: '269 năm' },
  { Z: 18, A: 41, half: '1,8 giờ' },
  { Z: 18, A: 42, half: '33 năm' },
  { Z: 19, A: 40, half: '1,25 tỉ năm', note: 'có sẵn trong tự nhiên, kể cả trong cơ thể người' },
  { Z: 19, A: 42, half: '12 giờ' },
  { Z: 19, A: 43, half: '22 giờ' },
  { Z: 20, A: 41, half: '0,1 triệu năm' },
  { Z: 20, A: 45, half: '163 ngày' },
  { Z: 20, A: 47, half: '4,5 ngày' },
];

/**
 * @typedef {{ kind: 'empty' } | { kind: 'neutrons' } | { kind: 'stable' }
 *   | { kind: 'radioactive', half: string, note?: string } | { kind: 'unbound' }} Status
 */

/**
 * What Z protons and N neutrons make.
 * @param {number} Z @param {number} N
 * @returns {Status}
 */
export function statusOf(Z, N) {
  if (Z === 0) return N === 0 ? { kind: 'empty' } : { kind: 'neutrons' };
  const A = Z + N;
  if (STABLE[Z]?.includes(A)) return { kind: 'stable' };
  const r = RADIOACTIVE.find((x) => x.Z === Z && x.A === A);
  if (r) return { kind: 'radioactive', half: r.half, note: r.note };
  return { kind: 'unbound' };
}

/** The mass numbers of the isotopes the builder knows for Z, stable or radioactive. */
export function isotopesOf(/** @type {number} */ Z) {
  return [...(STABLE[Z] ?? []), ...RADIOACTIVE.filter((r) => r.Z === Z).map((r) => r.A)].sort(
    (a, b) => a - b,
  );
}

/** R₀ of the radius formula, in metres. */
export const R0 = 1.2e-15;

/**
 * Nucleus radius R = R₀·A^(1/3) in femtometres (10⁻¹⁵ m).
 * @param {number} A
 */
export function radiusFm(A) {
  return tidy(1.2 * Math.cbrt(A), 6);
}

/**
 * A nucleus's name for text: "carbon-14", or the symbol when unnamed.
 * @param {number} Z @param {number} A
 */
export function nameOf(Z, A) {
  return `${NAMES[Z] ?? SYMBOLS[Z]}-${A}`;
}

/**
 * Drawing places of the nucleons, packed in a sunflower spiral from the
 * centre: protons and neutrons are mixed evenly through the nucleus.
 * @param {number} Z @param {number} N @param {number} step spacing in px
 * @returns {Array<{ x: number, y: number, proton: boolean }>}
 */
export function packing(Z, N, step) {
  const total = Z + N;
  const out = [];
  let p = 0;
  for (let i = 0; i < total; i++) {
    // Give the i-th place to a proton while protons lag behind their share.
    const proton = N === 0 || (p < Z && (p + 0.5) / Z <= (i - p + 0.5) / N);
    if (proton) p++;
    const r = step * Math.sqrt(i + 0.5) * 0.55;
    const a = i * 2.39996;
    out.push({ x: r * Math.cos(a), y: r * Math.sin(a), proton });
  }
  return out;
}

/** @typedef {{ text: string, Z: number, N: number }} Task */

/** @type {ReadonlyArray<Task>} */
export const TASKS = [
  { text: 'Tạo hạt nhân helium-4 (hạt α): $2$ proton và $2$ neutron.', Z: 2, N: 2 },
  { text: 'Tạo hạt nhân carbon-12, có $Z = 6$ và $A = 12$.', Z: 6, N: 6 },
  { text: 'Tạo đồng vị carbon-14, đồng vị dùng để xác định tuổi cổ vật.', Z: 6, N: 8 },
  { text: 'Tạo deuterium: đồng vị của hydrogen có số khối $A = 2$.', Z: 1, N: 1 },
  { text: 'Tạo đồng vị của oxygen ($Z = 8$) có số khối $18$.', Z: 8, N: 10 },
  { text: 'Tạo hạt nhân ${}^{23}_{11}\\mathrm{Na}$.', Z: 11, N: 12 },
  {
    text: 'Tạo hạt nhân có $Z = 19$, $A = 40$: một đồng vị phóng xạ có sẵn trong tự nhiên.',
    Z: 19,
    N: 21,
  },
];

/**
 * The feedback sentence for a built nucleus.
 * @param {number} Z @param {number} N
 */
export function describe(Z, N) {
  const A = Z + N;
  const s = statusOf(Z, N);
  if (s.kind === 'empty') return 'Bấm + để thêm proton và neutron vào hạt nhân.';
  if (s.kind === 'neutrons')
    return 'Chưa có proton nào: chỉ có neutron thì chưa phải là hạt nhân của một nguyên tố. Số proton $Z$ quyết định đó là nguyên tố nào.';
  const head = `$Z = ${Z}$, $N = ${N}$, $A = Z + N = ${A}$: hạt nhân ${nameOf(Z, A)}, bán kính $R \\approx ${numTex(radiusFm(A), 2)} \\cdot 10^{-15}$ m.`;
  const isos = isotopesOf(Z)
    .map((a) => nameOf(Z, a))
    .join(', ');
  if (s.kind === 'stable')
    return `${head} Đây là một đồng vị bền. Các đồng vị của ${NAMES[Z]} có trong bộ xếp: ${isos}.`;
  if (s.kind === 'radioactive')
    return `${head} Đây là một đồng vị phóng xạ, chu kì bán rã khoảng ${s.half}${s.note ? `, ${s.note}` : ''}.`;
  const few = A < Math.min(...STABLE[Z]);
  return `${head} Hạt nhân này không bền: ${few ? 'thiếu' : 'thừa'} neutron so với các đồng vị bền, nếu tạo được thì nó phân rã trong chưa đầy một giờ; số neutron càng lệch thì các nucleon càng khó giữ được với nhau. Các đồng vị của ${NAMES[Z]} có trong bộ xếp: ${isos}.`;
}
