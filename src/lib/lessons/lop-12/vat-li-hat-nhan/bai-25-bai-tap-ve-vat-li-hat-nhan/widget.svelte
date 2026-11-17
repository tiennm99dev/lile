<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { nuclideName, nuclideTex } from '../_shared/nuclear.js';
  import {
    REACTIONS,
    energyOf,
    isMissing,
    missingOf,
    missingSteps,
    reactionTex,
  } from './engine.js';

  /** How far a typed energy may be from the exact one, in MeV. */
  const TOLERANCE = 0.05;

  const ids = $props.id();

  let at = $state(0);
  let typedA = $state('');
  let typedZ = $state('');
  let typedE = $state('');
  let stage = $state(/** @type {'particle' | 'energy' | 'done'} */ ('particle'));
  let misses = $state(0);
  let last = $state(/** @type {null | 'ok' | 'wrong' | 'invalid'} */ (null));
  /** Reactions completed with the particle right at the first try. */
  let firstTry = $state(0);

  const r = $derived(REACTIONS[at]);
  const p = $derived(missingOf(r));
  const energy = $derived(energyOf(r));
  const A = $derived(readInt(typedA));
  const Z = $derived(readInt(typedZ));

  /** @param {string} s */
  function readInt(s) {
    const v = readNumber(s);
    return v !== null && Number.isInteger(v) ? v : null;
  }

  const slot = $derived(
    stage === 'particle'
      ? A !== null && Z !== null && A >= 0
        ? `\\boxed{${nuclideTex(A, Z)}}`
        : '\\boxed{{}^{A}_{Z}\\mathrm{X}}'
      : nuclideTex(p.A, p.Z),
  );

  function checkParticle() {
    if (A === null || Z === null) {
      last = 'invalid';
      return;
    }
    if (isMissing(r, A, Z)) {
      if (misses === 0) firstTry += 1;
      last = 'ok';
      misses = 0;
      stage = energy ? 'energy' : 'done';
    } else {
      misses += 1;
      last = 'wrong';
    }
  }

  function checkEnergy() {
    const v = readNumber(typedE.replace(/\s*mev\s*$/i, ''));
    if (v === null || !energy) {
      last = 'invalid';
      return;
    }
    if (Math.abs(v - energy.energy) <= TOLERANCE) {
      last = 'ok';
      misses = 0;
      stage = 'done';
    } else {
      misses += 1;
      last = 'wrong';
    }
  }

  function next() {
    at = (at + 1) % REACTIONS.length;
    typedA = '';
    typedZ = '';
    typedE = '';
    stage = 'particle';
    misses = 0;
    last = null;
  }

  const massLine = $derived(
    energy
      ? [...r.before, ...r.after]
          .filter((q, i, all) => all.findIndex((x) => x.A === q.A && x.Z === q.Z) === i)
          .map((q) => `$m(${nuclideTex(q.A, q.Z)}) = ${numTex(q.m ?? 0)}$`)
          .join('; ') + ' (amu); $1$ amu $= 931{,}5$ MeV/$c^2$.'
      : '',
  );

  const energyWorking = $derived.by(() => {
    if (!energy) return '';
    const dm = energy.before - energy.after;
    return `$m_t = ${numTex(energy.before)}$ amu, $m_s = ${numTex(energy.after)}$ amu, nên $\\Delta E = (m_t - m_s) \\cdot 931{,}5 = ${numTex(dm, 4)} \\cdot 931{,}5 \\approx ${numTex(energy.energy, 2)}$ MeV: phản ứng ${energy.energy > 0 ? 'toả' : 'thu'} năng lượng.`;
  });

  const note = $derived.by(() => {
    if (last === 'invalid')
      return 'Hãy nhập số nguyên cho $A$ và $Z$ (năng lượng: một số, có thể âm, ví dụ $-1{,}2$).';
    if (stage === 'particle') {
      if (last !== 'wrong')
        return 'Nhập số khối $A$ và điện tích $Z$ của hạt còn thiếu rồi bấm "Kiểm tra".';
      if (misses === 1)
        return 'Chưa đúng. Gợi ý: tổng số khối (số ở trên) hai vế phải bằng nhau, tổng điện tích (số ở dưới) hai vế cũng phải bằng nhau. Electron có $Z = -1$, neutron có $Z = 0$.';
      return `Chưa đúng. ${missingSteps(r).join(' ')}`;
    }
    const found = `Đúng: hạt còn thiếu là ${nuclideName(p.A, p.Z)} $${nuclideTex(p.A, p.Z)}$.`;
    if (stage === 'energy') {
      if (last !== 'wrong')
        return `${found} Bây giờ tính năng lượng của phản ứng theo MeV (thu năng lượng thì ghi số âm). ${massLine}`;
      if (misses === 1)
        return `Chưa đúng. Gợi ý: $\\Delta E = (m_t - m_s) \\cdot 931{,}5$ MeV, với $m_t$, $m_s$ là tổng khối lượng các hạt trước và sau phản ứng (nhớ nhân hệ số trước hạt). ${massLine}`;
      return `Chưa đúng. ${energyWorking}`;
    }
    return energy ? `Đúng. ${energyWorking}` : `${found} Bấm "Phản ứng tiếp".`;
  });

  const tone = $derived(
    last === 'ok' || stage === 'done'
      ? 'ok'
      : last === 'wrong' || last === 'invalid'
        ? 'warn'
        : 'info',
  );
</script>

<div class="space-y-4">
  <p class="text-sm font-semibold text-slate-600">
    Phản ứng {at + 1}/{REACTIONS.length} · Tìm đúng hạt ngay lần đầu: {firstTry}
  </p>
  <p class="{card} overflow-x-auto px-3 py-4 text-center text-lg">
    <Tex math={reactionTex(r, slot)} />
  </p>

  {#if stage === 'particle'}
    <div class="grid grid-cols-2 gap-3 sm:max-w-sm">
      <label class="block text-sm font-semibold text-slate-700" for="{ids}-a">
        Số khối A
        <input
          id="{ids}-a"
          class="{textInput} mt-1"
          inputmode="numeric"
          autocomplete="off"
          bind:value={typedA}
          onkeydown={(e) => e.key === 'Enter' && checkParticle()}
        />
      </label>
      <label class="block text-sm font-semibold text-slate-700" for="{ids}-z">
        Điện tích Z
        <input
          id="{ids}-z"
          class="{textInput} mt-1"
          inputmode="text"
          autocomplete="off"
          bind:value={typedZ}
          onkeydown={(e) => e.key === 'Enter' && checkParticle()}
        />
      </label>
    </div>
    <button type="button" class={button.primary} onclick={checkParticle}>Kiểm tra</button>
  {:else if stage === 'energy'}
    <div class="sm:max-w-sm">
      <label class="block text-sm font-semibold text-slate-700" for="{ids}-e">
        Năng lượng phản ứng ΔE (MeV)
        <input
          id="{ids}-e"
          class="{textInput} mt-1"
          inputmode="text"
          autocomplete="off"
          bind:value={typedE}
          onkeydown={(e) => e.key === 'Enter' && checkEnergy()}
        />
      </label>
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={checkEnergy}>Kiểm tra</button>
      <button type="button" class={button.quiet} onclick={next}>Bỏ qua, phản ứng tiếp</button>
    </div>
  {:else}
    <button type="button" class={button.primary} onclick={next}>Phản ứng tiếp</button>
  {/if}

  <FeedbackNote {tone} text={note} />
  {#if stage === 'particle'}
    <p class="text-xs text-slate-500">
      Nhập Z = −1 cho electron, Z = 1 và A = 0 cho positron. Đáp số năng lượng được chấp nhận khi
      sai lệch không quá {formatNumber(TOLERANCE)} MeV.
    </p>
  {/if}
</div>
