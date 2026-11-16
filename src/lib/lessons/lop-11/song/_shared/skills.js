/**
 * Generated drill skills for the wave exercises of the chapter: wavelength
 * and speed, two-source interference and standing waves on a string. Every
 * answer is an exact short decimal, so the drill board compares it exactly.
 */
import { int, pick } from '#lib/core/drill.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import { countMaxima, countMinima } from './interference.js';

/** @type {import('#lib/core/drill.js').Skill} */
export const WAVELENGTH_SKILL = {
  id: 'buoc-song',
  label: 'Bước sóng và tốc độ truyền sóng',
  make(rand) {
    const lambda = int(rand, 2, 8);
    const crests = int(rand, 3, 7);
    const f = pick(rand, [10, 20, 25, 40, 50]);
    const d = (crests - 1) * lambda;
    if (rand() < 0.5) {
      return {
        prompt: `Trên mặt nước, khoảng cách giữa $${crests}$ gợn lồi liên tiếp là $${d}$ cm. Nguồn sóng dao động với tần số $${f}$ Hz. Tính tốc độ truyền sóng (theo cm/s).`,
        answer: lambda * f,
        unit: 'cm/s',
        hints: [`Giữa $${crests}$ gợn lồi liên tiếp có $${crests - 1}$ bước sóng.`],
        steps: [
          `$${crests - 1}\\lambda = ${d}$ cm nên $\\lambda = ${lambda}$ cm.`,
          `$v = \\lambda f = ${lambda} \\cdot ${f} = ${lambda * f}$ cm/s.`,
        ],
      };
    }
    const v = tidy((lambda * f) / 100);
    return {
      prompt: `Một sóng cơ có tần số $${f}$ Hz truyền với tốc độ $${numTex(v)}$ m/s. Tính bước sóng (theo cm).`,
      answer: lambda,
      unit: 'cm',
      hints: ['$\\lambda = \\dfrac{v}{f}$; đổi kết quả ra cm.'],
      steps: [
        `$\\lambda = \\dfrac{v}{f} = \\dfrac{${numTex(v)}}{${f}} = ${numTex(tidy(lambda / 100))}$ m.`,
        `$\\lambda = ${lambda}$ cm.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const INTERFERENCE_SKILL = {
  id: 'giao-thoa',
  label: 'Bài toán giao thoa',
  make(rand) {
    const lambda = pick(rand, [1.5, 2, 2.5, 3, 4]);
    const f = pick(rand, [20, 40]);
    const v = tidy(lambda * f);
    if (rand() < 0.4) {
      const d1 = int(rand, 6, 14);
      const k = int(rand, 1, 4);
      const d2 = tidy(d1 + k * lambda);
      return {
        prompt: `Hai nguồn kết hợp cùng pha trên mặt nước dao động với tần số $${f}$ Hz, tốc độ truyền sóng $${numTex(v)}$ cm/s. Điểm $M$ cách hai nguồn $${d1}$ cm và $${numTex(d2)}$ cm là một cực đại. Tìm bậc $k$ của cực đại đó.`,
        answer: k,
        hints: ['Tính $\\lambda = \\dfrac{v}{f}$.', 'Chia $d_2 - d_1$ cho $\\lambda$.'],
        steps: [
          `$\\lambda = \\dfrac{${numTex(v)}}{${f}} = ${numTex(lambda)}$ cm.`,
          `$d_2 - d_1 = ${numTex(tidy(d2 - d1))}$ cm $= ${k}\\lambda$, nên $k = ${k}$.`,
        ],
      };
    }
    const a = int(rand, 5, 16);
    const minima = rand() < 0.4;
    const ratio = tidy(a / lambda, 4);
    const count = minima ? countMinima(a, lambda) : countMaxima(a, lambda);
    const range = minima
      ? `-${numTex(ratio, 2)} < k + \\dfrac{1}{2} < ${numTex(ratio, 2)}`
      : `-${numTex(ratio, 2)} < k < ${numTex(ratio, 2)}`;
    return {
      prompt: `Hai nguồn kết hợp cùng pha cách nhau $${a}$ cm, dao động với tần số $${f}$ Hz; tốc độ truyền sóng $${numTex(v)}$ cm/s. Có bao nhiêu ${minima ? 'cực tiểu' : 'cực đại'} trên đoạn nối hai nguồn?`,
      answer: count,
      hints: [
        `Tính $\\lambda$, rồi đếm số nguyên $k$ thoả mãn ${
          minima
            ? '$-\\dfrac{S_1S_2}{\\lambda} < k + \\dfrac{1}{2} < \\dfrac{S_1S_2}{\\lambda}$'
            : '$-\\dfrac{S_1S_2}{\\lambda} < k < \\dfrac{S_1S_2}{\\lambda}$'
        }.`,
      ],
      steps: [
        `$\\lambda = \\dfrac{${numTex(v)}}{${f}} = ${numTex(lambda)}$ cm; $\\dfrac{S_1S_2}{\\lambda} = \\dfrac{${a}}{${numTex(lambda)}} ${ratio === tidy(ratio, 2) ? '=' : '\\approx'} ${numTex(ratio, 2)}$.`,
        `$${range}$: có $${count}$ giá trị nguyên của $k$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const STANDING_SKILL = {
  id: 'song-dung',
  label: 'Bài toán sóng dừng',
  make(rand) {
    const lambda = pick(rand, [20, 30, 40, 50, 60]);
    const f = pick(rand, [10, 20, 25, 50]);
    const v = tidy((lambda * f) / 100);
    if (rand() < 0.35) {
      const k = int(rand, 0, 3);
      const l = ((2 * k + 1) * lambda) / 4;
      return {
        prompt: `Một sợi dây dài $${numTex(l)}$ cm, một đầu cố định, một đầu tự do, có sóng dừng với tần số $${f}$ Hz; tốc độ truyền sóng là $${numTex(v)}$ m/s. Trên dây có bao nhiêu bụng sóng?`,
        answer: k + 1,
        hints: [
          'Tính $\\lambda = \\dfrac{v}{f}$ theo cm.',
          'Một đầu tự do: $l = (2k + 1)\\dfrac{\\lambda}{4}$, số bụng là $k + 1$.',
        ],
        steps: [
          `$\\lambda = \\dfrac{${numTex(v)}}{${f}} = ${numTex(tidy(lambda / 100))}$ m $= ${lambda}$ cm.`,
          `$2k + 1 = \\dfrac{4l}{\\lambda} = \\dfrac{4 \\cdot ${numTex(l)}}{${lambda}} = ${2 * k + 1}$, nên $k = ${k}$.`,
          `Số bụng: $k + 1 = ${k + 1}$.`,
        ],
      };
    }
    const k = int(rand, 2, 6);
    const l = (k * lambda) / 2;
    return {
      prompt: `Một sợi dây dài $${numTex(l)}$ cm, hai đầu cố định, có sóng dừng với $${k}$ bụng khi tần số là $${f}$ Hz. Tính tốc độ truyền sóng trên dây (theo m/s).`,
      answer: v,
      unit: 'm/s',
      hints: [
        'Hai đầu cố định: $l = k\\dfrac{\\lambda}{2}$ với $k$ là số bụng.',
        '$v = \\lambda f$.',
      ],
      steps: [
        `$\\lambda = \\dfrac{2l}{k} = \\dfrac{2 \\cdot ${numTex(l)}}{${k}} = ${lambda}$ cm $= ${numTex(tidy(lambda / 100))}$ m.`,
        `$v = \\lambda f = ${numTex(tidy(lambda / 100))} \\cdot ${f} = ${numTex(v)}$ m/s.`,
      ],
    };
  },
};

export const WAVE_SKILLS = [WAVELENGTH_SKILL, INTERFERENCE_SKILL, STANDING_SKILL];
