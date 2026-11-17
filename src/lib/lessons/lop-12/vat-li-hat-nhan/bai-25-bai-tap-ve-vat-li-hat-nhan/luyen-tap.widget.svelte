<script>
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { SKILLS } from './engine.js';
</script>

<DrillBoard
  skills={SKILLS}
  perSkill={3}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 7,1 hoặc −1,21."
/>
