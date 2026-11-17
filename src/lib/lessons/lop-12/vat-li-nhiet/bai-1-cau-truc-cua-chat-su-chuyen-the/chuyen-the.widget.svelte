<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'nong-chay', label: 'Nóng chảy (rắn → lỏng)' },
    { id: 'dong-dac', label: 'Đông đặc (lỏng → rắn)' },
    { id: 'hoa-hoi', label: 'Hoá hơi (lỏng → khí)' },
    { id: 'ngung-tu', label: 'Ngưng tụ (khí → lỏng)' },
    { id: 'thang-hoa', label: 'Thăng hoa (rắn → khí)' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'kem',
        label: 'Que kem để ngoài nắng chảy nhỏ giọt',
        bin: 'nong-chay',
        why: 'Kem (rắn) nhận nhiệt từ không khí và chuyển sang thể lỏng.',
      },
      {
        id: 'duc-dong',
        label: 'Đun chảy đồng để đúc tượng',
        bin: 'nong-chay',
        why: 'Đồng rắn được nung tới nhiệt độ nóng chảy (khoảng 1 084 °C) để thành đồng lỏng.',
      },
      {
        id: 'nen',
        label: 'Sáp nến chảy xuống rồi cứng lại ở chân nến',
        bin: 'dong-dac',
        why: 'Sáp lỏng chảy ra xa ngọn lửa, toả nhiệt ra không khí và chuyển lại thành thể rắn.',
      },
      {
        id: 'da-tu-lanh',
        label: 'Nước trong khay của ngăn đá thành nước đá',
        bin: 'dong-dac',
        why: 'Nước lỏng toả nhiệt trong ngăn đá và chuyển sang thể rắn ở 0 °C.',
      },
      {
        id: 'phoi-do',
        label: 'Quần áo ướt phơi nắng khô dần',
        bin: 'hoa-hoi',
        why: 'Nước trong vải bay hơi ở mặt thoáng: lỏng → khí.',
      },
      {
        id: 'noi-soi',
        label: 'Nồi nước trên bếp sủi bọt',
        bin: 'hoa-hoi',
        why: 'Nước sôi: hoá hơi cả trong lòng chất lỏng, tạo bọt hơi.',
      },
      {
        id: 'suong',
        label: 'Sương đọng trên lá cây lúc sáng sớm',
        bin: 'ngung-tu',
        why: 'Hơi nước trong không khí gặp lạnh ban đêm, toả nhiệt và chuyển thành giọt nước.',
      },
      {
        id: 'coc-da',
        label: 'Mặt ngoài cốc nước đá có những giọt nước bám vào',
        bin: 'ngung-tu',
        why: 'Hơi nước trong không khí gặp thành cốc lạnh, ngưng tụ thành giọt nước; nước không thấm qua cốc.',
      },
      {
        id: 'bang-phien',
        label: 'Viên băng phiến trong tủ quần áo nhỏ dần',
        bin: 'thang-hoa',
        why: 'Băng phiến rắn chuyển thẳng sang thể khí, không qua thể lỏng.',
      },
      {
        id: 'da-kho',
        label: 'Đá khô (CO₂ rắn) bốc “khói” trắng rồi nhỏ dần',
        bin: 'thang-hoa',
        why: 'CO₂ rắn thăng hoa thành khí CO₂ ở áp suất thường.',
      },
    ],
    12,
  );
</script>

<CardSorter
  cards={CARDS}
  bins={BINS}
  label="Xếp các hiện tượng đời sống theo quá trình chuyển thể"
  hintOnWrong
/>
