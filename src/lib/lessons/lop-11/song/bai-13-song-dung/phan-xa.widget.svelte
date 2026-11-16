<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import WavePlot from '#lib/domain/wave-plot.svelte';

  const ENDS = [
    { value: 'co-dinh', label: 'Phản xạ ở đầu cố định' },
    { value: 'tu-do', label: 'Phản xạ ở đầu tự do' },
  ];

  let end = $state('co-dinh');
  let time = $state(0);

  // The reflecting end sits at x = 0: the incident wave runs toward it (−x),
  // the reflected wave runs back (+x), inverted at a fixed end.
  const waves = $derived([
    {
      amplitude: 1,
      wavelength: 4,
      period: 1,
      direction: /** @type {-1} */ (-1),
      name: 'Sóng tới',
      color: '#2563eb',
    },
    {
      amplitude: 1,
      wavelength: 4,
      period: 1,
      direction: /** @type {1} */ (1),
      phase: end === 'co-dinh' ? Math.PI : 0,
      name: 'Sóng phản xạ',
      color: '#ea580c',
    },
  ]);
</script>

<div class="space-y-3">
  <SegmentedControl label="Đầu phản xạ" options={ENDS} bind:value={end} hideLabel />
  <WavePlot
    {waves}
    showSum
    along="x"
    from={0}
    to={8}
    bind:time
    label="Sóng tới, sóng phản xạ và sóng tổng hợp; đầu phản xạ ở x = 0"
  />
  <p class="text-sm text-slate-700" aria-live="polite">
    {end === 'co-dinh'
      ? 'Ở đầu cố định (x = 0), sóng phản xạ luôn ngược pha với sóng tới nên đầu dây luôn đứng yên: đó là một nút. Các điểm x = 2; 4; 6; 8 cm (cách nhau nửa bước sóng) cũng luôn đứng yên.'
      : 'Ở đầu tự do (x = 0), sóng phản xạ cùng pha với sóng tới nên đầu dây dao động mạnh nhất: đó là một bụng. Các nút nằm ở x = 1; 3; 5; 7 cm, cách đầu tự do một phần tư bước sóng rồi cứ nửa bước sóng lại có một nút.'}
    Chạy sóng hoặc kéo thời điểm t để thấy đường tổng hợp (màu đen) không chạy đi mà chỉ phồng lên, xẹp
    xuống.
  </p>
</div>
