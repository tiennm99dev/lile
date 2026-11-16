<script>
  import CircuitBoard from '#lib/domain/circuit-board.svelte';
  import { flatNetwork, equivalentResistance } from '#lib/domain/circuit.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { numTex } from '#lib/core/number-format.js';

  let mode = $state(/** @type {'series' | 'parallel'} */ ('series'));
  let resistors = $state([20]);
  let voltage = $state(6);
  let closed = $state(true);

  const r = $derived(equivalentResistance(flatNetwork(mode, resistors)));
  const text = $derived(
    !closed
      ? 'Khoá K mở: không có dòng điện.'
      : `${resistors.length > 1 ? 'Điện trở tương đương ' : ''}$R = ${numTex(r, 2)}$ Ω, $I = \\dfrac{U}{R} = \\dfrac{${numTex(voltage)}}{${numTex(r, 2)}} = ${numTex(voltage / r, 3)}$ A. Tăng $U$ thì $I$ tăng theo cùng tỉ lệ; tăng $R$ thì $I$ giảm.`,
  );
</script>

<div class="space-y-3">
  <CircuitBoard
    bind:mode
    bind:resistors
    bind:voltage
    bind:closed
    interactive
    maxVoltage={24}
    maxResistance={60}
    label="Mạch kiểm tra định luật Ohm"
  />
  <FeedbackNote tone="info" {text} />
</div>
