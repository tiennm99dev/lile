<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';

  const BINS = [
    { id: 'bay-hoi', label: 'Sự bay hơi' },
    { id: 'soi', label: 'Sự sôi' },
  ];

  const CARDS = shuffled(
    [
      {
        id: 'moi-nhiet-do',
        label: 'Xảy ra ở mọi nhiệt độ',
        bin: 'bay-hoi',
        why: 'Nước trong cốc vẫn cạn dần ở nhiệt độ phòng: bay hơi xảy ra ở bất kì nhiệt độ nào.',
      },
      {
        id: 'nhiet-do-soi',
        label: 'Chỉ xảy ra ở nhiệt độ sôi',
        bin: 'soi',
        why: 'Ở một áp suất cho trước, mỗi chất lỏng sôi ở một nhiệt độ xác định (nước: $100$ °C ở áp suất tiêu chuẩn).',
      },
      {
        id: 'mat-thoang',
        label: 'Chỉ xảy ra ở mặt thoáng chất lỏng',
        bin: 'bay-hoi',
        why: 'Chỉ những phân tử ở gần mặt thoáng, có động năng đủ lớn, mới thoát ra ngoài.',
      },
      {
        id: 'trong-long',
        label: 'Xảy ra cả trong lòng lẫn trên mặt thoáng chất lỏng',
        bin: 'soi',
        why: 'Khi sôi, các bọt hơi hình thành trong lòng chất lỏng, nổi lên và vỡ ra ở mặt thoáng.',
      },
      {
        id: 'khong-doi',
        label: 'Nhiệt độ chất lỏng không đổi dù vẫn được đun',
        bin: 'soi',
        why: 'Trong khi sôi, nhiệt lượng nhận vào dùng để hoá hơi, nhiệt độ giữ nguyên ở nhiệt độ sôi.',
      },
      {
        id: 'gio',
        label: 'Nhanh hơn khi có gió và diện tích mặt thoáng lớn',
        bin: 'bay-hoi',
        why: 'Gió đưa hơi đi khỏi mặt thoáng, mặt thoáng rộng thì nhiều phân tử thoát ra hơn.',
      },
      {
        id: 'mo-hoi',
        label: 'Mồ hôi làm mát cơ thể',
        bin: 'bay-hoi',
        why: 'Mồ hôi bay hơi trên da, lấy nhiệt lượng từ cơ thể nên cơ thể mát đi.',
      },
      {
        id: 'ap-suat',
        label: 'Áp suất trên mặt chất lỏng càng lớn thì nhiệt độ xảy ra càng cao',
        bin: 'soi',
        why: 'Nồi áp suất làm nước sôi ở trên $100$ °C; trên núi cao, nước sôi dưới $100$ °C.',
      },
    ],
    7,
  );
</script>

<CardSorter cards={CARDS} bins={BINS} label="Xếp đặc điểm vào sự bay hơi hoặc sự sôi" hintOnWrong />
