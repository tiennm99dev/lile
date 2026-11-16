<script module>
  export const title = 'Dao động điều hoà: đồ thị và con lắc lò xo';
</script>

<script>
  import OscGraph from './osc-graph.svelte';
  import SpringMass from './spring-mass.svelte';
  import { stateAt } from './oscillation.js';

  const A = 4;
  const omega = Math.PI;
  let t = $state(0.25);
  const x = $derived(stateAt(A, omega, 0, t).x);
</script>

<div class="space-y-3">
  <SpringMass {x} range={6} marks={[-A, A]} label="Vật ở li độ {x.toFixed(1)} cm" />
  <OscGraph
    curves={[{ f: (s) => stateAt(A, omega, 0, s).x }]}
    tMax={4}
    yMax={6}
    tStep={0.5}
    yStep={2}
    yLabel="x (cm)"
    label="Đồ thị li độ theo thời gian"
    cursor={t}
    onpick={(s) => (t = s)}
    valueText="t = {t.toFixed(2)} s"
  />
</div>
