/**
 * The first law of thermodynamics, ΔU = A + Q, with the book's signs: A > 0
 * when the gas receives work (it is compressed), A < 0 when it does work;
 * Q > 0 when it receives heat, Q < 0 when it gives heat out.
 */

/**
 * Change of internal energy, J.
 * @param {number} work A, J
 * @param {number} heat Q, J
 */
export function deltaU(work, heat) {
  return work + heat;
}

/**
 * What the sign of a quantity says, in the book's words.
 * @param {'A' | 'Q' | 'U'} quantity
 * @param {number} value
 */
export function signMeaning(quantity, value) {
  if (quantity === 'A') {
    if (value > 0) return 'khí nhận công (bị nén)';
    if (value < 0) return 'khí thực hiện công (đẩy pít-tông ra)';
    return 'không có công';
  }
  if (quantity === 'Q') {
    if (value > 0) return 'khí nhận nhiệt lượng';
    if (value < 0) return 'khí truyền nhiệt lượng ra ngoài';
    return 'không trao đổi nhiệt';
  }
  if (value > 0) return 'nội năng tăng';
  if (value < 0) return 'nội năng giảm';
  return 'nội năng không đổi';
}

/**
 * A signed integer for TeX: `+30`, `-70`, `0`.
 * @param {number} n
 */
export function signed(n) {
  return n > 0 ? `+${n}` : `${n}`;
}

/** @typedef {{ id: string, text: string, work: number, heat: number }} Scenario */

/**
 * Situations to set up on the cylinder, with the A and Q they mean.
 * @type {Scenario[]}
 */
export const SCENARIOS = [
  {
    id: 'dun-day',
    text: 'Khí nhận nhiệt lượng $100$ J và đẩy pít-tông, thực hiện công $70$ J.',
    work: -70,
    heat: 100,
  },
  {
    id: 'nen-toa',
    text: 'Nén khí bằng công $200$ J, đồng thời khí truyền ra ngoài nhiệt lượng $50$ J.',
    work: 200,
    heat: -50,
  },
  {
    id: 'giu-pittong',
    text: 'Giữ chặt pít-tông và đun nóng khí, khí nhận nhiệt lượng $150$ J.',
    work: 0,
    heat: 150,
  },
  {
    id: 'gian-no',
    text: 'Khí giãn nở thực hiện công $120$ J, không trao đổi nhiệt với bên ngoài.',
    work: -120,
    heat: 0,
  },
  {
    id: 'nen-lanh',
    text: 'Nén khí bằng công $80$ J trong khi làm lạnh xi lanh, khí truyền ra ngoài $80$ J.',
    work: 80,
    heat: -80,
  },
];

/**
 * Checks a set-up against a scenario and says what to fix.
 * @param {Scenario} scenario
 * @param {number} work
 * @param {number} heat
 * @returns {{ ok: boolean, text: string }}
 */
export function checkScenario(scenario, work, heat) {
  if (work === scenario.work && heat === scenario.heat) {
    const du = deltaU(work, heat);
    return {
      ok: true,
      text: `Đúng! $A = ${signed(work)}$ J, $Q = ${signed(heat)}$ J nên $\\Delta U = A + Q = ${signed(du)}$ J: ${signMeaning('U', du)}.`,
    };
  }
  /** @param {number} want @param {number} got @param {'A' | 'Q'} name */
  const hint = (want, got, name) => {
    if (want === got) return '';
    if (Math.sign(want) !== Math.sign(got))
      return `Xem lại dấu của $${name}$: trong tình huống này ${signMeaning(name, want)}.`;
    return `Dấu của $${name}$ đã đúng, hãy chỉnh lại độ lớn.`;
  };
  return {
    ok: false,
    text: [hint(scenario.work, work, 'A'), hint(scenario.heat, heat, 'Q')]
      .filter(Boolean)
      .join(' '),
  };
}
