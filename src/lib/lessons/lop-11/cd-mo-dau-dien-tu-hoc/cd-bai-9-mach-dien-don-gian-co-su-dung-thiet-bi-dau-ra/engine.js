/**
 * The circuit kit: a potential divider of two parts feeding the
 * non-inverting input of an op-amp comparator, a reference voltage U₀ on its
 * inverting input, and an output device. The learner fills the three slots
 * and tunes U₀; the board is then tested at a dark (or hot) and a bright (or
 * cool) setting against the goal.
 */
import { formatNumber } from '#lib/core/number-format.js';
import {
  SUPPLY,
  dividerOut,
  ldrResistance,
  luxText,
  ntcResistance,
  opampOut,
} from '../_shared/electronics.js';

/** @typedef {'ldr' | 'ntc' | 'fixed' | 'led' | 'relay' | 'buzzer'} PartId */
/** @typedef {'top' | 'bottom' | 'output'} SlotId */
/** @typedef {Record<SlotId, PartId | null>} Board */
/** @typedef {{ lux: number, celsius: number }} Surroundings */

/** Supply of the divider, in volts. */
export const U = SUPPLY;
/** The fixed resistor of the kit, in ohms. */
export const FIXED = 10_000;

export const PARTS = /** @type {const} */ ({
  ldr: { name: 'Điện trở quang (LDR)', short: 'LDR', place: 'divider' },
  ntc: { name: 'Điện trở nhiệt NTC', short: 'NTC', place: 'divider' },
  fixed: { name: 'Điện trở 10 kΩ', short: '10 kΩ', place: 'divider' },
  led: { name: 'LED và điện trở hạn dòng', short: 'LED', place: 'output' },
  relay: { name: 'Relay đóng mạch đèn 220 V', short: 'Relay', place: 'output' },
  buzzer: { name: 'Còi báo', short: 'Còi', place: 'output' },
});

/** @type {PartId[]} */
export const PART_IDS = ['ldr', 'ntc', 'fixed', 'led', 'relay', 'buzzer'];

export const SLOTS = /** @type {const} */ ({
  top: 'R₁ (giữa nguồn và lối vào +)',
  bottom: 'R₂ (giữa lối vào + và đất)',
  output: 'Thiết bị đầu ra',
});

/** @type {SlotId[]} */
export const SLOT_IDS = ['top', 'bottom', 'output'];

/**
 * @typedef {{
 *   title: string, task: string, sensor: 'ldr' | 'ntc', devices: PartId[],
 *   on: Surroundings, off: Surroundings, onWord: string, offWord: string
 * }} Goal
 */

/** The two circuits to build. */
export const GOALS = /** @type {Record<'night' | 'heat', Goal>} */ ({
  night: {
    title: 'Đèn tự bật khi trời tối',
    task: 'Lắp mạch để bóng đèn chiếu sáng 220 V tự bật khi trời tối (5 lx) và tắt khi trời sáng (300 lx).',
    sensor: 'ldr',
    devices: ['relay'],
    on: { lux: 5, celsius: 25 },
    off: { lux: 300, celsius: 25 },
    onWord: `trời tối (${luxText(5)})`,
    offWord: `trời sáng (${luxText(300)})`,
  },
  heat: {
    title: 'Báo động khi quá nóng',
    task: 'Lắp mạch để còi (hoặc đèn LED) báo động khi nhiệt độ lên tới 70 °C và im lặng ở 30 °C.',
    sensor: 'ntc',
    devices: ['buzzer', 'led'],
    on: { lux: 300, celsius: 70 },
    off: { lux: 300, celsius: 30 },
    onWord: 'nóng (70 °C)',
    offWord: 'mát (30 °C)',
  },
});

/** @returns {Board} */
export const emptyBoard = () => ({ top: null, bottom: null, output: null });

/**
 * Whether a part may go in a slot.
 * @param {SlotId} slot @param {PartId} part
 */
export const fits = (slot, part) => (slot === 'output') === (PARTS[part].place === 'output');

/**
 * Resistance of a divider part in the surroundings.
 * @param {PartId} part @param {Surroundings} s
 */
export function resistanceOf(part, s) {
  if (part === 'ldr') return ldrResistance(s.lux);
  if (part === 'ntc') return ntcResistance(s.celsius);
  return FIXED;
}

/**
 * The board in some surroundings: the divider voltage U_s on the
 * non-inverting input, the comparator output and whether the output device
 * works (it needs a positive output). Null while a divider slot is empty.
 * @param {Board} board @param {Surroundings} s @param {number} u0
 */
export function evaluate(board, s, u0) {
  if (!board.top || !board.bottom) return null;
  const us = dividerOut(U, resistanceOf(board.top, s), resistanceOf(board.bottom, s));
  const out = opampOut('comparator', { uin: us, uref: u0 }).out;
  return { us, out, on: board.output !== null && out > 0 };
}

/** @param {number} v */
const volt = (v) => `${formatNumber(v, 2)} V`;

/**
 * Judge a board against a goal at the goal's two test settings.
 * @param {Board} board @param {Goal} goal @param {number} u0
 * @returns {{ ok: boolean, text: string }}
 */
export function check(board, goal, u0) {
  const missing = SLOT_IDS.filter((s) => !board[s]).map((s) => SLOTS[s]);
  if (missing.length) return { ok: false, text: `Còn trống: ${missing.join('; ')}.` };
  const divider = [board.top, board.bottom];
  const sensors = divider.filter((p) => p === 'ldr' || p === 'ntc');
  if (sensors.length === 0) {
    return {
      ok: false,
      text: 'Mạch chia áp chỉ có điện trở cố định nên $U_s$ không bao giờ thay đổi. Thay một điện trở bằng cảm biến.',
    };
  }
  if (!sensors.includes(goal.sensor)) {
    return {
      ok: false,
      text: `${PARTS[sensors[0] ?? 'ldr'].name} không cảm nhận được ${goal.sensor === 'ldr' ? 'ánh sáng' : 'nhiệt độ'}. Dùng ${PARTS[goal.sensor].name}.`,
    };
  }
  if (sensors.length === 2) {
    return {
      ok: false,
      text: 'Mạch chia áp cần một điện trở cố định đứng cạnh cảm biến để sự thay đổi điện trở của cảm biến biến thành thay đổi điện áp.',
    };
  }
  const device = /** @type {PartId} */ (board.output);
  if (!goal.devices.includes(device)) {
    return {
      ok: false,
      text:
        goal.sensor === 'ldr'
          ? `${PARTS[device].name} không bật được bóng đèn chiếu sáng 220 V: lối ra op-amp chỉ cho dòng nhỏ, điện áp thấp. Dùng relay để đóng mạch đèn.`
          : 'Báo động cần phát ra tín hiệu: dùng còi hoặc LED.',
    };
  }
  const on = /** @type {NonNullable<ReturnType<typeof evaluate>>} */ (evaluate(board, goal.on, u0));
  const off = /** @type {NonNullable<ReturnType<typeof evaluate>>} */ (
    evaluate(board, goal.off, u0)
  );
  const levels = `Lúc ${goal.onWord} $U_s$ = ${volt(on.us)}, lúc ${goal.offWord} $U_s$ = ${volt(off.us)}`;
  if (on.us <= off.us) {
    return {
      ok: false,
      text: `Mạch chạy ngược: ${levels}, tức $U_s$ lúc cần bật lại nhỏ hơn lúc cần tắt. Đổi chỗ cảm biến và điện trở cố định.`,
    };
  }
  if (!on.on) {
    return {
      ok: false,
      text: `${levels}. $U_0$ = ${volt(u0)} cao quá nên lúc ${goal.onWord} $U_s$ vẫn chưa vượt $U_0$ và thiết bị không chạy. Hạ $U_0$ xuống dưới ${volt(on.us)}.`,
    };
  }
  if (off.on) {
    return {
      ok: false,
      text: `${levels}. $U_0$ = ${volt(u0)} thấp quá nên lúc ${goal.offWord} $U_s$ vẫn lớn hơn $U_0$ và thiết bị vẫn chạy. Nâng $U_0$ lên trên ${volt(off.us)}.`,
    };
  }
  return {
    ok: true,
    text: `Mạch đạt yêu cầu. ${levels}; $U_0$ = ${volt(u0)} nằm giữa hai giá trị đó nên op-amp bật thiết bị lúc ${goal.onWord} và tắt lúc ${goal.offWord}.`,
  };
}
