/**
 * Exercises of the nuclear physics review: reactions with one particle
 * missing (found from the conservation of mass number and charge), their
 * energy from the nuclear masses, and the generated drill skills (decay
 * chains, binding energy, half-life, reaction energy). Masses are nuclear
 * masses in amu, rounded the way the book's exercises give them.
 */
import { int, pick, retryMake, rounded } from '#lib/core/drill.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import {
  AMU_MEV,
  M_N,
  M_P,
  binding,
  nuclideName,
  nuclideTex,
  reactionEnergy,
  sideTex,
  totals,
} from '../_shared/nuclear.js';

/**
 * @typedef {import('../_shared/nuclear.js').Particle & { m?: number }} Item
 * @typedef {{ before: Item[], after: Item[], hide: [0 | 1, number], extra?: string }} Reaction
 */

/**
 * Reactions to complete. `hide` names the missing particle (side, index);
 * `extra` is the neutrino written after a β decay; a reaction whose items
 * all carry a mass `m` also asks for its energy.
 * @type {ReadonlyArray<Reaction>}
 */
export const REACTIONS = [
  {
    before: [
      { A: 14, Z: 7, m: 13.9992 },
      { A: 4, Z: 2, m: 4.0015 },
    ],
    after: [
      { A: 17, Z: 8, m: 16.9947 },
      { A: 1, Z: 1, m: 1.0073 },
    ],
    hide: [1, 1],
  },
  {
    before: [
      { A: 9, Z: 4, m: 9.01 },
      { A: 4, Z: 2, m: 4.0015 },
    ],
    after: [
      { A: 12, Z: 6, m: 11.9967 },
      { A: 1, Z: 0, m: 1.0087 },
    ],
    hide: [1, 1],
  },
  {
    before: [{ A: 226, Z: 88, m: 225.9771 }],
    after: [
      { A: 222, Z: 86, m: 221.9704 },
      { A: 4, Z: 2, m: 4.0015 },
    ],
    hide: [1, 1],
  },
  {
    before: [{ A: 14, Z: 6 }],
    after: [
      { A: 14, Z: 7 },
      { A: 0, Z: -1 },
    ],
    hide: [1, 0],
    extra: '\\bar{\\nu}',
  },
  {
    before: [
      { A: 1, Z: 0 },
      { A: 235, Z: 92 },
    ],
    after: [
      { A: 95, Z: 39 },
      { A: 138, Z: 53 },
      { A: 1, Z: 0, count: 3 },
    ],
    hide: [1, 1],
  },
  {
    before: [
      { A: 2, Z: 1, m: 2.0136 },
      { A: 3, Z: 1, m: 3.0155 },
    ],
    after: [
      { A: 4, Z: 2, m: 4.0015 },
      { A: 1, Z: 0, m: 1.0087 },
    ],
    hide: [1, 0],
  },
  {
    before: [
      { A: 27, Z: 13, m: 26.9744 },
      { A: 4, Z: 2, m: 4.0015 },
    ],
    after: [
      { A: 30, Z: 15, m: 29.9701 },
      { A: 1, Z: 0, m: 1.0087 },
    ],
    hide: [1, 0],
  },
  {
    before: [
      { A: 7, Z: 3, m: 7.0144 },
      { A: 1, Z: 1, m: 1.0073 },
    ],
    after: [{ A: 4, Z: 2, m: 4.0015, count: 2 }],
    hide: [0, 1],
  },
  {
    before: [{ A: 238, Z: 92 }],
    after: [
      { A: 234, Z: 90 },
      { A: 4, Z: 2 },
    ],
    hide: [1, 0],
  },
  {
    before: [{ A: 60, Z: 27 }],
    after: [
      { A: 60, Z: 28 },
      { A: 0, Z: -1 },
    ],
    hide: [1, 1],
    extra: '\\bar{\\nu}',
  },
  {
    before: [{ A: 11, Z: 6 }],
    after: [
      { A: 11, Z: 5 },
      { A: 0, Z: 1 },
    ],
    hide: [1, 0],
    extra: '\\nu',
  },
  {
    before: [{ A: 210, Z: 84 }],
    after: [
      { A: 206, Z: 82 },
      { A: 4, Z: 2 },
    ],
    hide: [1, 0],
  },
];

/**
 * The missing particle of a reaction.
 * @param {Reaction} r
 */
export function missingOf(r) {
  const side = r.hide[0] === 0 ? r.before : r.after;
  return side[r.hide[1]];
}

/**
 * The reaction in TeX with the missing particle written as `slot`
 * ({}^{A}_{Z}X by default).
 * @param {Reaction} r @param {string} [slot]
 */
export function reactionTex(r, slot = '{}^{A}_{Z}\\mathrm{X}') {
  /** @param {Item[]} side @param {0 | 1} s */
  const write = (side, s) =>
    side
      .map((p, i) => {
        const k = p.count ?? 1;
        const body = s === r.hide[0] && i === r.hide[1] ? slot : nuclideTex(p.A, p.Z);
        return `${k > 1 ? k : ''}${body}`;
      })
      .join(' + ');
  return `${write(r.before, 0)} \\to ${write(r.after, 1)}${r.extra ? ` + ${r.extra}` : ''}`;
}

/**
 * The energy of a reaction in MeV from its masses, or null when it gives none.
 * @param {Reaction} r
 */
export function energyOf(r) {
  const all = [...r.before, ...r.after];
  if (all.some((p) => p.m === undefined)) return null;
  /** @param {Item[]} side */
  const mass = (side) => tidy(side.reduce((s, p) => s + (p.count ?? 1) * (p.m ?? 0), 0));
  return {
    before: mass(r.before),
    after: mass(r.after),
    energy: reactionEnergy(mass(r.before), mass(r.after)),
  };
}

/**
 * Checks a typed particle against the missing one.
 * @param {Reaction} r @param {number} A @param {number} Z
 */
export function isMissing(r, A, Z) {
  const p = missingOf(r);
  return p.A === A && p.Z === Z;
}

/**
 * The working that finds the missing particle.
 * @param {Reaction} r
 */
export function missingSteps(r) {
  const p = missingOf(r);
  const other = (/** @type {Item[]} */ side, /** @type {0 | 1} */ s) =>
    side.filter((_, i) => !(s === r.hide[0] && i === r.hide[1]));
  const known = r.hide[0] === 0 ? totals(r.after) : totals(r.before);
  const rest = totals(r.hide[0] === 0 ? other(r.before, 0) : other(r.after, 1));
  const k = p.count ?? 1;
  const times = k > 1 ? `${k}` : '';
  return [
    `Bảo toàn số nucleon: $${times}A = ${known.A} - ${rest.A}$, nên $A = ${p.A}$.`,
    `Bảo toàn điện tích: $${times}Z = ${known.Z} - ${rest.Z < 0 ? `(${rest.Z})` : rest.Z}$, nên $Z = ${p.Z}$.`,
    `Hạt cần tìm là $${nuclideTex(p.A, p.Z)}$ (${nuclideName(p.A, p.Z)}).`,
  ];
}

/* ---------- drill skills ---------- */

/** Nuclei with the nuclear masses the drill gives. */
const NUCLEI = [
  { A: 4, Z: 2, m: 4.0015 },
  { A: 7, Z: 3, m: 7.0144 },
  { A: 12, Z: 6, m: 11.9967 },
  { A: 16, Z: 8, m: 15.9905 },
  { A: 56, Z: 26, m: 55.9207 },
  { A: 235, Z: 92, m: 234.9934 },
];

const GIVEN = `$m_p = ${numTex(M_P)}$ amu, $m_n = ${numTex(M_N)}$ amu, $1$ amu $= ${numTex(AMU_MEV)}$ MeV/$c^2$`;

/** @type {import('#lib/core/drill.js').Skill} */
export const BINDING_SKILL = {
  id: 'lien-ket',
  label: 'Năng lượng liên kết',
  make(rand) {
    return retryMake(() => {
      const n = pick(rand, NUCLEI);
      const b = binding(n.Z, n.A, n.m);
      const name = `$${nuclideTex(n.A, n.Z)}$`;
      const lines = [
        `$\\Delta m = ${n.Z} \\cdot ${numTex(M_P)} + ${n.A - n.Z} \\cdot ${numTex(M_N)} - ${numTex(n.m)} = ${numTex(b.dm)}$ amu.`,
        `$E_{lk} = ${numTex(b.dm)} \\cdot ${numTex(AMU_MEV)} \\approx ${numTex(b.energy, 2)}$ MeV.`,
      ];
      if (rand() < 0.5) {
        const answer = rounded(b.energy, 1);
        if (answer === null) return null;
        return {
          prompt: `Tính năng lượng liên kết của hạt nhân ${name} (theo MeV, làm tròn đến một chữ số sau dấu phẩy). Cho $m = ${numTex(n.m)}$ amu, ${GIVEN}.`,
          answer,
          unit: 'MeV',
          hints: ['Tính độ hụt khối $\\Delta m = Zm_p + (A - Z)m_n - m$ trước.'],
          steps: [...lines, `Làm tròn: $E_{lk} \\approx ${numTex(answer)}$ MeV.`],
        };
      }
      const answer = rounded(b.energy / n.A, 2);
      if (answer === null) return null;
      return {
        prompt: `Tính năng lượng liên kết riêng của hạt nhân ${name} (theo MeV/nucleon, làm tròn đến hai chữ số sau dấu phẩy). Cho $m = ${numTex(n.m)}$ amu, ${GIVEN}.`,
        answer,
        unit: 'MeV/nucleon',
        hints: ['Tính $E_{lk} = \\Delta m \\cdot 931{,}5$ MeV rồi chia cho số nucleon $A$.'],
        steps: [
          ...lines,
          `$E_{lkr} = \\dfrac{E_{lk}}{${n.A}} \\approx ${numTex(answer)}$ MeV/nucleon.`,
        ],
      };
    });
  },
};

/** Natural decay chains: parent, last stable nucleus, α and β⁻ counts. */
const CHAINS = [
  { from: { A: 238, Z: 92 }, to: { A: 206, Z: 82 }, alpha: 8, beta: 6 },
  { from: { A: 235, Z: 92 }, to: { A: 207, Z: 82 }, alpha: 7, beta: 4 },
  { from: { A: 232, Z: 90 }, to: { A: 208, Z: 82 }, alpha: 6, beta: 4 },
];

/** @type {import('#lib/core/drill.js').Skill} */
export const CONSERVATION_SKILL = {
  id: 'bao-toan',
  label: 'Bảo toàn số khối và điện tích',
  make(rand) {
    if (rand() < 0.5) {
      const c = pick(rand, CHAINS);
      const askAlpha = rand() < 0.5;
      return {
        prompt: `Hạt nhân $${nuclideTex(c.from.A, c.from.Z)}$ sau một chuỗi phóng xạ $\\alpha$ và $\\beta^-$ biến thành hạt nhân bền $${nuclideTex(c.to.A, c.to.Z)}$. Có bao nhiêu lần phóng xạ ${askAlpha ? '$\\alpha$' : '$\\beta^-$'} trong chuỗi?`,
        answer: askAlpha ? c.alpha : c.beta,
        hints: [
          'Chỉ phóng xạ $\\alpha$ làm số khối thay đổi (giảm $4$ mỗi lần).',
          'Gọi $x$ là số lần phóng xạ $\\alpha$, $y$ là số lần phóng xạ $\\beta^-$; viết phương trình bảo toàn điện tích: $Z_{\\text{mẹ}} = Z_{\\text{con}} + 2x - y$.',
        ],
        steps: [
          `Số khối: $${c.from.A} = ${c.to.A} + 4x$, nên $x = ${c.alpha}$.`,
          `Điện tích: $${c.from.Z} = ${c.to.Z} + 2 \\cdot ${c.alpha} - y$, nên $y = ${c.beta}$.`,
          askAlpha
            ? `Có $${c.alpha}$ lần phóng xạ $\\alpha$.`
            : `Có $${c.beta}$ lần phóng xạ $\\beta^-$.`,
        ],
      };
    }
    const A = int(rand, 200, 240);
    const Z = int(rand, 82, 94);
    const x = int(rand, 1, 3);
    const y = int(rand, 1, 3);
    const askZ = rand() < 0.5;
    const A2 = A - 4 * x;
    const Z2 = Z - 2 * x + y;
    return {
      prompt: `Hạt nhân $${nuclideTex(A, Z)}$ phóng ra liên tiếp $${x}$ hạt $\\alpha$ và $${y}$ hạt $\\beta^-$. Hạt nhân tạo thành có ${askZ ? 'bao nhiêu proton' : 'số khối bằng bao nhiêu'}?`,
      answer: askZ ? Z2 : A2,
      hints: [
        'Mỗi lần phóng xạ $\\alpha$: $A$ giảm $4$, $Z$ giảm $2$. Mỗi lần phóng xạ $\\beta^-$: $A$ giữ nguyên, $Z$ tăng $1$.',
      ],
      steps: [
        `Số khối: $A' = ${A} - 4 \\cdot ${x} = ${A2}$.`,
        `Số proton: $Z' = ${Z} - 2 \\cdot ${x} + ${y} = ${Z2}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const HALF_LIFE_SKILL = {
  id: 'ban-ra',
  label: 'Chu kì bán rã',
  make(rand) {
    const k = int(rand, 2, 5);
    const T = pick(rand, [2, 3, 5, 8, 12, 15]);
    const unit = pick(rand, ['giờ', 'ngày', 'năm']);
    const left = pick(rand, [1, 2, 3, 5]);
    const m0 = left * 2 ** k;
    const kind = int(rand, 0, 2);
    if (kind === 0)
      return {
        prompt: `Một chất phóng xạ có chu kì bán rã $${T}$ ${unit}, khối lượng ban đầu $${m0}$ g. Sau $${k * T}$ ${unit}, khối lượng chất đó còn lại bao nhiêu gam?`,
        answer: left,
        unit: 'g',
        hints: [`Thời gian đã trôi qua bằng mấy chu kì bán rã?`],
        steps: [
          `$\\dfrac{t}{T} = \\dfrac{${k * T}}{${T}} = ${k}$.`,
          `$m = m_0 \\cdot 2^{-${k}} = \\dfrac{${m0}}{${2 ** k}} = ${left}$ g.`,
        ],
      };
    if (kind === 1)
      return {
        prompt: `Một chất phóng xạ có chu kì bán rã $${T}$ ${unit}, khối lượng ban đầu $${m0}$ g. Sau $${k * T}$ ${unit}, khối lượng chất đó đã bị phân rã là bao nhiêu gam?`,
        answer: m0 - left,
        unit: 'g',
        hints: ['Tính khối lượng còn lại trước, rồi lấy khối lượng ban đầu trừ đi.'],
        steps: [
          `$m = m_0 \\cdot 2^{-\\frac{t}{T}} = ${m0} \\cdot 2^{-${k}} = ${left}$ g.`,
          `Khối lượng đã phân rã: $${m0} - ${left} = ${m0 - left}$ g.`,
        ],
      };
    return {
      prompt: `Một chất phóng xạ có chu kì bán rã $${T}$ ${unit}. Sau bao nhiêu ${unit} thì số hạt nhân của nó còn lại $\\dfrac{1}{${2 ** k}}$ số hạt nhân ban đầu?`,
      answer: k * T,
      unit,
      hints: [`Viết $\\dfrac{1}{${2 ** k}}$ dưới dạng $2^{-n}$.`],
      steps: [
        `$2^{-\\frac{t}{T}} = \\dfrac{1}{${2 ** k}} = 2^{-${k}}$, nên $t = ${k}T$.`,
        `$t = ${k} \\cdot ${T} = ${k * T}$ ${unit}.`,
      ],
    };
  },
};

/** Reactions with masses, for the energy drill. */
export const ENERGY_REACTIONS = REACTIONS.filter((r) => energyOf(r) !== null);

/** @type {import('#lib/core/drill.js').Skill} */
export const ENERGY_SKILL = {
  id: 'nang-luong',
  label: 'Năng lượng phản ứng',
  make(rand) {
    return retryMake(() => {
      const r = pick(rand, ENERGY_REACTIONS);
      const e = /** @type {NonNullable<ReturnType<typeof energyOf>>} */ (energyOf(r));
      const answer = rounded(e.energy, 2);
      if (answer === null) return null;
      const masses = [...r.before, ...r.after]
        .filter((p, i, all) => all.findIndex((q) => q.A === p.A && q.Z === p.Z) === i)
        .map((p) => `$m(${nuclideTex(p.A, p.Z)}) = ${numTex(p.m ?? 0)}$ amu`)
        .join(', ');
      const dm = tidy(e.before - e.after);
      return {
        prompt: `Cho phản ứng $${sideTex(r.before)} \\to ${sideTex(r.after)}$ với ${masses}, $1$ amu $= ${numTex(AMU_MEV)}$ MeV/$c^2$. Tính năng lượng của phản ứng theo MeV, làm tròn đến hai chữ số sau dấu phẩy (phản ứng thu năng lượng thì ghi số âm).`,
        answer,
        unit: 'MeV',
        hints: [
          '$\\Delta E = (m_t - m_s) \\cdot 931{,}5$ MeV, với $m_t$, $m_s$ là tổng khối lượng trước và sau phản ứng.',
        ],
        steps: [
          `$m_t = ${numTex(e.before)}$ amu, $m_s = ${numTex(e.after)}$ amu.`,
          `$\\Delta E = ${dm < 0 ? `(${numTex(dm)})` : numTex(dm)} \\cdot ${numTex(AMU_MEV)} \\approx ${numTex(answer)}$ MeV: phản ứng ${answer > 0 ? 'toả' : 'thu'} năng lượng.`,
        ],
      };
    });
  },
};

export const SKILLS = [CONSERVATION_SKILL, BINDING_SKILL, HALF_LIFE_SKILL, ENERGY_SKILL];
