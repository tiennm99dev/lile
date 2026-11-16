<script>
  import { answerText, readNumber } from '#lib/core/decimal.js';
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { WAVE_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={WAVE_SKILLS}
  perSkill={3}
  read={readNumber}
  format={answerText}
  invalidText="Hãy nhập một số, ví dụ 7,5."
/>
