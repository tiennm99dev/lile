/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo tốc độ truyền âm trong không khí bằng ống cộng hưởng: loa nối máy phát tần số đặt ở miệng ống, dịch pít-tông để tìm hai vị trí liên tiếp mà âm to nhất (sóng dừng trong cột khí); khoảng cách giữa hai vị trí đó bằng nửa bước sóng, nên v = λf = 2(l2 − l1)f.',
  intro:
    'Âm truyền trong không khí nhanh đến mức không thể bấm giờ bằng tay trên quãng đường vài mét. Nhưng nhờ sóng dừng, ta đo được tốc độ âm chỉ với một ống nhựa, một pít-tông và một chiếc thước: chỉ cần tìm những chỗ âm vang to nhất.',
  objectives: [
    'Nêu được cơ sở của phép đo: sóng dừng trong cột không khí một đầu kín, một đầu hở.',
    'Bố trí được thí nghiệm với ống cộng hưởng, loa và máy phát tần số.',
    'Xác định được bước sóng âm từ hai vị trí liên tiếp của pít-tông khi âm to nhất và tính được tốc độ truyền âm $v = 2(l_2 - l_1)f$.',
    'Tính được giá trị trung bình, sai số và viết được kết quả $v = \\overline{v} \\pm \\Delta v$.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết và dụng cụ',
      blocks: [
        {
          type: 'p',
          text: 'Loa đặt sát miệng ống phát âm có tần số $f$ do máy phát tần số tạo ra. Sóng âm truyền vào ống, phản xạ ở mặt pít-tông và giao thoa với sóng tới, tạo thành sóng dừng trong cột không khí. Mặt pít-tông là đầu kín, luôn là một nút; miệng ống là đầu hở, gần như là một bụng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Khi nào âm to nhất',
          text: 'Âm nghe to nhất khi cột khí dài $l$ có sóng dừng với bụng ở miệng ống: $l = (2k + 1)\\dfrac{\\lambda}{4}$. Hai vị trí liên tiếp của pít-tông mà âm to nhất cách nhau $d = l_2 - l_1 = \\dfrac{\\lambda}{2}$, nên $\\lambda = 2d$ và $v = \\lambda f = 2(l_2 - l_1)f$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao dùng hiệu $l_2 - l_1$?',
          text: 'Bụng sóng ở đầu hở thực ra nằm hơi lệch ra ngoài miệng ống một đoạn nhỏ, nên $l_1$ không đúng bằng $\\dfrac{\\lambda}{4}$. Đoạn lệch đó như nhau ở mọi vị trí cộng hưởng, nên hiệu $l_2 - l_1$ vẫn đúng bằng $\\dfrac{\\lambda}{2}$: dùng hiệu số loại bỏ được sai số này.',
        },
        {
          type: 'table',
          caption: 'Dụng cụ cho mỗi nhóm',
          head: ['Dụng cụ', 'Ghi chú'],
          rows: [
            [
              'Ống cộng hưởng',
              'Ống nhựa trong, có pít-tông dịch chuyển được và thước đo chiều dài cột khí',
            ],
            ['Máy phát tần số', 'Chỉnh được tần số và biên độ, đọc được tần số $f$'],
            ['Loa nhỏ', 'Nối với máy phát, đặt sát miệng ống'],
            ['Dây nối, giá đỡ', 'Giữ ống nằm ngang và cố định loa'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Để biên độ của máy phát nhỏ vừa đủ nghe, tránh âm quá to gây hại cho tai. Dịch pít-tông chậm và đều; quanh chỗ âm to, dịch từng chút một để xác định vị trí âm to nhất. Giữ lớp học yên lặng trong lúc đo.',
        },
      ],
    },
    {
      heading: 'Tiến hành thí nghiệm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo tốc độ truyền âm trong không khí bằng ống cộng hưởng và viết kết quả kèm sai số.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nối máy phát tần số với loa, đặt loa sát miệng ống. Bật máy phát, chỉnh biên độ và chọn tần số, ví dụ $f = 500$ Hz; ghi giá trị $f$.',
            'Đẩy pít-tông sát miệng ống, rồi từ từ kéo pít-tông ra xa loa. Lắng nghe: âm lúc to lúc nhỏ.',
            'Dừng ở vị trí thứ nhất mà âm to nhất, đọc chiều dài cột khí $l_1$ trên thước.',
            'Tiếp tục kéo pít-tông tới vị trí kế tiếp mà âm to nhất, đọc $l_2$.',
            'Làm lại các bước trên ba lần, ghi kết quả vào bảng.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng kết quả (tần số nguồn âm $f = \\ldots$ Hz)',
          head: ['Lần đo', '$l_1$ (cm)', '$l_2$ (cm)', '$d = l_2 - l_1$ (cm)', '$v = 2df$ (m/s)'],
          rows: [
            ['$1$', '...', '...', '...', '...'],
            ['$2$', '...', '...', '...', '...'],
            ['$3$', '...', '...', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tính $\\overline{d}$ và $\\Delta d$ (trung bình các độ lệch $|d_i - \\overline{d}|$), rồi $\\overline{v} = 2\\overline{d}f$. Sai số tỉ đối $\\delta v = \\delta d + \\delta f = \\dfrac{\\Delta d}{\\overline{d}} + \\dfrac{\\Delta f}{f}$, sai số tuyệt đối $\\Delta v = \\delta v \\cdot \\overline{v}$. Viết kết quả $v = \\overline{v} \\pm \\Delta v$, so sánh với giá trị khoảng $340$ m/s và nêu nguyên nhân sai số (xác định vị trí âm to nhất bằng tai, đọc thước, tiếng ồn xung quanh).',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá có một ống cộng hưởng ảo; tốc độ âm trong mỗi ống phụ thuộc nhiệt độ không khí nên không giống nhau. Em kéo pít-tông, nhìn đồng hồ độ to để ghi $l_1$, $l_2$, tự tính $v$ rồi nhập để kiểm tra. Đo với vài tần số khác nhau để có giá trị trung bình.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ống cộng hưởng ảo',
    instruction:
      'Chọn tần số của máy phát. Kéo pít-tông (hoặc dùng thanh trượt và các nút $\\pm 0{,}1$ cm) từ sát loa ra xa, theo dõi thanh độ to. Ở vị trí âm to nhất đầu tiên bấm Ghi $l_1$, ở vị trí âm to nhất kế tiếp bấm Ghi $l_2$. Tính $v = 2(l_2 - l_1)f$ (đổi cm ra m), nhập rồi bấm Kiểm tra. Đo lại với các tần số khác để có kết quả $v = \\overline{v} \\pm \\Delta v$.',
  },
  examples: [
    {
      problem:
        'Dùng ống cộng hưởng với âm có tần số $500$ Hz, một nhóm thấy âm to nhất khi cột khí dài $l_1 = 16{,}5$ cm và $l_2 = 51{,}0$ cm. Tính bước sóng và tốc độ truyền âm.',
      steps: [
        '$d = l_2 - l_1 = 51{,}0 - 16{,}5 = 34{,}5$ cm $= \\dfrac{\\lambda}{2}$.',
        '$\\lambda = 2d = 69$ cm $= 0{,}69$ m.',
        '$v = \\lambda f = 0{,}69 \\cdot 500 = 345$ m/s.',
      ],
      answer: '$\\lambda = 0{,}69$ m; $v = 345$ m/s.',
    },
    {
      problem:
        'Ba lần đo với cùng tần số $f = 500$ Hz (coi như không có sai số) cho $d$ lần lượt $34{,}2$ cm, $34{,}6$ cm và $34{,}4$ cm. Viết kết quả đo tốc độ truyền âm.',
      steps: [
        '$\\overline{d} = \\dfrac{34{,}2 + 34{,}6 + 34{,}4}{3} = 34{,}4$ cm.',
        'Các độ lệch $0{,}2$; $0{,}2$; $0$ nên $\\Delta d = \\dfrac{0{,}4}{3} \\approx 0{,}13$ cm.',
        '$\\overline{v} = 2\\overline{d}f = 2 \\cdot 0{,}344 \\cdot 500 = 344$ m/s.',
        '$\\delta v = \\dfrac{\\Delta d}{\\overline{d}} = \\dfrac{0{,}4}{3 \\cdot 34{,}4} \\approx 0{,}0039$; $\\Delta v = \\delta v \\cdot \\overline{v} \\approx 0{,}0039 \\cdot 344 \\approx 1{,}3$ m/s.',
      ],
      answer: '$v = 344 \\pm 1{,}3$ m/s.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Với âm có tần số $400$ Hz, âm to nhất khi cột khí dài $l_1 = 20{,}4$ cm và $l_2 = 63{,}4$ cm. Tính tốc độ truyền âm (theo m/s).',
      answer: 344,
      unit: 'm/s',
      hints: ['$l_2 - l_1 = \\dfrac{\\lambda}{2}$.', 'Đổi $\\lambda$ ra mét rồi nhân với $f$.'],
      solution:
        '$d = 63{,}4 - 20{,}4 = 43$ cm; $\\lambda = 2d = 86$ cm $= 0{,}86$ m; $v = 0{,}86 \\cdot 400 = 344$ m/s.',
    },
    {
      type: 'choice',
      prompt:
        'Khi âm nghe to nhất trong ống cộng hưởng, tại mặt pít-tông và tại miệng ống lần lượt là',
      options: [
        'một nút và một bụng sóng',
        'một bụng và một nút sóng',
        'hai nút sóng',
        'hai bụng sóng',
      ],
      answer: 0,
      hints: ['Mặt pít-tông là đầu kín, miệng ống là đầu hở.'],
      solution:
        'Không khí sát mặt pít-tông không dao động được: đó là nút. Ở miệng ống hở, không khí dao động mạnh nhất: đó là bụng, nên âm thoát ra to nhất.',
    },
    {
      type: 'number',
      prompt:
        'Âm có tần số $680$ Hz, tốc độ truyền âm $340$ m/s. Hai vị trí liên tiếp của pít-tông mà âm to nhất cách nhau bao nhiêu xentimét?',
      answer: 25,
      unit: 'cm',
      hints: [
        'Tính $\\lambda = \\dfrac{v}{f}$.',
        'Hai vị trí liên tiếp cách nhau $\\dfrac{\\lambda}{2}$.',
      ],
      solution:
        '$\\lambda = \\dfrac{340}{680} = 0{,}5$ m $= 50$ cm; khoảng cách $\\dfrac{\\lambda}{2} = 25$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao nên tính bước sóng từ $l_2 - l_1$ thay vì dùng $\\lambda = 4l_1$?',
      options: [
        'Vì bụng sóng ở miệng ống lệch ra ngoài một chút; hiệu $l_2 - l_1$ không chịu ảnh hưởng của đoạn lệch đó',
        'Vì $l_1$ luôn bằng không',
        'Vì tần số của âm thay đổi khi pít-tông dịch chuyển',
        'Vì âm ở vị trí $l_1$ nhỏ hơn ở vị trí $l_2$',
      ],
      answer: 0,
      hints: ['Đoạn lệch của bụng sóng ở miệng ống có như nhau ở mọi vị trí cộng hưởng không?'],
      solution:
        'Bụng ở đầu hở nằm hơi ngoài miệng ống nên $l_1$ nhỏ hơn $\\dfrac{\\lambda}{4}$ một chút. Đoạn lệch này như nhau với $l_1$ và $l_2$, nên $l_2 - l_1 = \\dfrac{\\lambda}{2}$ chính xác hơn.',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo tốc độ truyền âm được $340$ m/s, $342$ m/s và $338$ m/s. Tính sai số tuyệt đối $\\Delta v$ (trung bình các độ lệch, làm tròn đến hai chữ số thập phân).',
      answer: 1.33,
      tolerance: 0.01,
      unit: 'm/s',
      hints: [
        'Tính $\\overline{v}$ trước.',
        '$\\Delta v$ là trung bình của các $|v_i - \\overline{v}|$.',
      ],
      solution:
        '$\\overline{v} = \\dfrac{340 + 342 + 338}{3} = 340$ m/s; các độ lệch $0$, $2$, $2$; $\\Delta v = \\dfrac{4}{3} \\approx 1{,}33$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Đo được $\\overline{d} = 34{,}5$ cm với $\\Delta d = 0{,}3$ cm; tần số máy phát coi như chính xác ($\\Delta f = 0$). Tính sai số tỉ đối $\\delta v$ theo phần trăm (làm tròn đến hai chữ số thập phân).',
      answer: 0.87,
      tolerance: 0.01,
      unit: '%',
      hints: ['$\\delta v = \\dfrac{\\Delta d}{\\overline{d}} + \\dfrac{\\Delta f}{f}$.'],
      solution: '$\\delta v = \\dfrac{0{,}3}{34{,}5} + 0 \\approx 0{,}0087 = 0{,}87\\%$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo tốc độ truyền âm bằng ống cộng hưởng theo đúng thứ tự.',
      items: [
        'Kéo pít-tông tới vị trí âm to nhất kế tiếp, đọc $l_2$',
        'Nối loa với máy phát tần số, đặt loa sát miệng ống và chọn tần số $f$',
        'Tính $v = 2(l_2 - l_1)f$',
        'Từ từ kéo pít-tông ra xa loa, dừng ở vị trí âm to nhất đầu tiên, đọc $l_1$',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải có nguồn âm trước khi tìm vị trí âm to nhất.'],
      solution:
        'Nối loa và chọn tần số; kéo pít-tông tìm $l_1$; kéo tiếp tìm $l_2$; cuối cùng tính $v = 2(l_2 - l_1)f$.',
    },
  ],
  takeaways: [
    'Trong ống cộng hưởng, mặt pít-tông là nút, miệng ống gần như là bụng; âm to nhất khi $l = (2k + 1)\\dfrac{\\lambda}{4}$.',
    'Hai vị trí liên tiếp của pít-tông khi âm to nhất cách nhau $\\dfrac{\\lambda}{2}$: $v = 2(l_2 - l_1)f$.',
    'Dùng hiệu $l_2 - l_1$ để loại sai số do bụng sóng lệch ra ngoài miệng ống; lặp lại phép đo và viết $v = \\overline{v} \\pm \\Delta v$.',
  ],
};
