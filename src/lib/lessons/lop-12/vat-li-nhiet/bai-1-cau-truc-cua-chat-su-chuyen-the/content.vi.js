/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mô hình động học phân tử: các chất được cấu tạo từ các phân tử chuyển động hỗn loạn không ngừng, nhiệt độ càng cao chúng chuyển động càng nhanh, giữa chúng có lực liên kết. Cấu trúc khác nhau của chất rắn, lỏng, khí giải thích tính chất của mỗi thể và sự chuyển thể: nóng chảy, đông đặc, hoá hơi (bay hơi, sôi), ngưng tụ.',
  intro:
    'Cục nước đá để ngoài trời tan thành nước, vũng nước trên sân khô dần rồi biến mất, còn nồi nước trên bếp sủi bọt khi sôi. Cùng là nước, vì sao lúc thì cứng, lúc thì chảy được, lúc lại bay đi vô hình? Câu trả lời nằm ở cách các phân tử nước sắp xếp và chuyển động.',
  objectives: [
    'Nêu được ba nội dung của mô hình động học phân tử về cấu tạo chất.',
    'Dùng mô hình động học phân tử mô tả được cấu trúc của chất rắn, chất lỏng, chất khí và giải thích tính chất của mỗi thể.',
    'Giải thích được sơ lược sự nóng chảy, sự hoá hơi (bay hơi và sôi) và các quá trình ngược lại.',
  ],
  sections: [
    {
      heading: 'Mô hình động học phân tử về cấu tạo chất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mô hình động học phân tử',
          text: '1. Các chất được cấu tạo từ các hạt riêng biệt gọi là phân tử. 2. Các phân tử chuyển động hỗn loạn không ngừng; nhiệt độ của vật càng cao thì tốc độ chuyển động của các phân tử cấu tạo nên vật càng lớn. 3. Giữa các phân tử có lực tương tác gọi là lực liên kết phân tử.',
        },
        {
          type: 'p',
          text: 'Bằng chứng cho chuyển động hỗn loạn của phân tử là chuyển động Brown: soi giọt nước pha một ít bột phấn hoa (hay hạt khói trong không khí) dưới kính hiển vi, ta thấy các hạt nhỏ chuyển động không ngừng theo những đường gấp khúc bất kì. Đó là do các phân tử nước (không khí) chuyển động hỗn loạn va chạm vào hạt từ mọi phía. Hiện tượng khuếch tán (giọt mực loang dần trong cốc nước, mùi nước hoa lan khắp phòng) cũng cho thấy điều đó.',
        },
        {
          type: 'p',
          text: 'Lực liên kết phân tử gồm cả lực hút và lực đẩy. Khi các phân tử ở gần nhau, lực đẩy chiếm ưu thế (vì thế chất rắn, chất lỏng rất khó nén); khi chúng ra xa hơn, lực hút chiếm ưu thế; khi khoảng cách rất lớn (cỡ nhiều lần kích thước phân tử), lực liên kết gần như không đáng kể.',
        },
      ],
    },
    {
      heading: 'Cấu trúc của chất rắn, chất lỏng, chất khí',
      blocks: [
        {
          type: 'table',
          head: ['Đặc điểm', 'Chất rắn', 'Chất lỏng', 'Chất khí'],
          rows: [
            [
              'Khoảng cách giữa các phân tử',
              'Rất gần nhau (cỡ kích thước phân tử)',
              'Gần nhau, xa hơn một chút so với chất rắn',
              'Rất xa nhau (gấp nhiều lần kích thước phân tử)',
            ],
            ['Sự sắp xếp', 'Có trật tự', 'Kém trật tự hơn chất rắn', 'Không có trật tự'],
            [
              'Chuyển động của phân tử',
              'Dao động quanh vị trí cân bằng xác định',
              'Dao động quanh vị trí cân bằng, vị trí này có thể di chuyển',
              'Chuyển động hỗn loạn về mọi phía',
            ],
            ['Lực liên kết phân tử', 'Rất mạnh', 'Yếu hơn chất rắn', 'Rất yếu'],
            [
              'Hình dạng, thể tích',
              'Có hình dạng và thể tích riêng, rất khó nén',
              'Có thể tích riêng, có hình dạng của phần bình chứa nó, khó nén',
              'Không có hình dạng và thể tích riêng, chiếm toàn bộ bình chứa, dễ nén',
            ],
          ],
          caption: 'So sánh cấu trúc của chất ở ba thể theo mô hình động học phân tử.',
        },
        {
          type: 'p',
          text: 'Chất rắn được chia thành chất rắn kết tinh (có cấu trúc tinh thể, như muối ăn, kim loại, nước đá) và chất rắn vô định hình (không có cấu trúc tinh thể, như thuỷ tinh, nhựa đường, sáp nến).',
        },
      ],
    },
    {
      heading: 'Sự chuyển thể',
      blocks: [
        {
          type: 'p',
          text: 'Sự chuyển của chất từ thể này sang thể khác gọi là sự chuyển thể. Chiều thuận nhận nhiệt, chiều ngược toả nhiệt:',
        },
        {
          type: 'table',
          head: ['Quá trình', 'Chuyển thể', 'Quá trình ngược'],
          rows: [
            ['Nóng chảy', 'rắn → lỏng', 'Đông đặc (lỏng → rắn)'],
            ['Hoá hơi (bay hơi, sôi)', 'lỏng → khí', 'Ngưng tụ (khí → lỏng)'],
            ['Thăng hoa', 'rắn → khí', 'Ngưng kết (khí → rắn)'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sự nóng chảy',
          text: 'Sự nóng chảy là quá trình chuyển từ thể rắn sang thể lỏng. Khi được cung cấp nhiệt, các phân tử chất rắn dao động mạnh dần; đến một nhiệt độ nhất định, chúng thắng được lực liên kết giữ chúng ở vị trí xác định, cấu trúc mạng tinh thể bị phá vỡ và chất rắn chuyển sang thể lỏng. Chất rắn kết tinh nóng chảy ở một nhiệt độ xác định (nhiệt độ nóng chảy) và trong suốt quá trình nóng chảy nhiệt độ không đổi; chất rắn vô định hình mềm dần rồi lỏng ra, không có nhiệt độ nóng chảy xác định.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sự hoá hơi',
          text: 'Sự hoá hơi là quá trình chuyển từ thể lỏng sang thể khí, gồm hai hình thức. Sự bay hơi xảy ra ở mặt thoáng chất lỏng, ở mọi nhiệt độ: những phân tử ở gần mặt thoáng có động năng đủ lớn thắng được lực hút của các phân tử khác và thoát ra ngoài. Sự sôi là sự hoá hơi xảy ra cả ở mặt thoáng và trong lòng chất lỏng (tạo thành các bọt hơi), ở một nhiệt độ xác định gọi là nhiệt độ sôi; trong khi sôi nhiệt độ chất lỏng không đổi.',
        },
        { type: 'widget', name: 'chuyen-the' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Các yếu tố ảnh hưởng',
          text: 'Chất lỏng bay hơi càng nhanh khi nhiệt độ càng cao, diện tích mặt thoáng càng lớn, có gió và khi độ ẩm không khí càng thấp. Nhiệt độ sôi phụ thuộc áp suất khí trên mặt thoáng: ở áp suất tiêu chuẩn nước sôi ở $100$ °C, trên núi cao áp suất thấp nên nước sôi ở nhiệt độ thấp hơn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hộp phân tử nước',
    instruction:
      'Bật bếp (hoặc kéo thanh nhiệt lượng) để đun nước đá từ $-30$ °C đến hơi nước $150$ °C. Quan sát cách các phân tử sắp xếp và chuyển động ở mỗi thể, và để ý nhiệt độ trong lúc nóng chảy và lúc sôi.',
  },
  examples: [
    {
      problem:
        'Dùng mô hình động học phân tử, giải thích vì sao chất khí dễ nén còn chất rắn và chất lỏng rất khó nén.',
      steps: [
        'Trong chất khí, các phân tử ở rất xa nhau, khoảng trống giữa chúng lớn gấp nhiều lần kích thước phân tử; khi nén, các phân tử chỉ cần lại gần nhau hơn.',
        'Trong chất rắn và chất lỏng, các phân tử đã ở rất gần nhau (cỡ kích thước phân tử).',
        'Muốn ép chúng lại gần hơn nữa phải thắng lực đẩy giữa các phân tử, lực này tăng rất nhanh khi khoảng cách giảm.',
      ],
      answer:
        'Chất khí dễ nén vì khoảng cách giữa các phân tử lớn; chất rắn, chất lỏng khó nén vì các phân tử đã rất gần nhau và lực đẩy giữa chúng rất lớn.',
    },
    {
      problem:
        'Đun nóng một cục nước đá ở $-10$ °C cho đến khi nước sôi. Mô tả sự thay đổi nhiệt độ và cấu trúc của nước trong quá trình này.',
      steps: [
        'Từ $-10$ °C đến $0$ °C: nước đá (thể rắn) nóng lên, các phân tử dao động mạnh dần quanh vị trí cân bằng xác định.',
        'Ở $0$ °C: nước đá nóng chảy, nhiệt độ không đổi cho đến khi tan hết; nhiệt nhận vào dùng để phá vỡ mạng tinh thể.',
        'Từ $0$ °C đến $100$ °C: nước lỏng nóng lên, các phân tử chuyển động nhanh dần; nước bay hơi ở mặt thoáng.',
        'Ở $100$ °C (áp suất tiêu chuẩn): nước sôi, bọt hơi tạo thành cả trong lòng chất lỏng, nhiệt độ không đổi trong khi sôi.',
      ],
      answer:
        'Nhiệt độ tăng, đứng yên ở $0$ °C khi nóng chảy, tăng tiếp, rồi đứng yên ở $100$ °C khi sôi; cấu trúc chuyển từ có trật tự (rắn) sang kém trật tự (lỏng) rồi hỗn loạn (khí).',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn các nội dung thuộc mô hình động học phân tử về cấu tạo chất.',
      options: [
        'Các chất được cấu tạo từ các hạt riêng biệt gọi là phân tử',
        'Các phân tử chuyển động hỗn loạn không ngừng',
        'Nhiệt độ càng cao thì các phân tử chuyển động càng nhanh',
        'Giữa các phân tử có lực liên kết phân tử',
        'Các phân tử đứng yên khi vật ở thể rắn',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Mô hình gồm ba ý: cấu tạo từ phân tử, chuyển động của phân tử, lực tương tác.'],
      solution:
        'Bốn phát biểu đầu là nội dung của mô hình. Ngay cả ở thể rắn, các phân tử vẫn dao động quanh vị trí cân bằng, không đứng yên.',
    },
    {
      type: 'choice',
      prompt: 'Chuyển động Brown của các hạt phấn hoa trong nước chứng tỏ',
      options: [
        'các phân tử nước chuyển động hỗn loạn không ngừng',
        'các hạt phấn hoa là sinh vật sống tự bơi',
        'giữa các phân tử nước chỉ có lực hút',
        'nước luôn có dòng chảy đối lưu',
      ],
      answer: 0,
      hints: ['Cái gì va chạm vào hạt phấn hoa từ mọi phía?'],
      solution:
        'Các phân tử nước chuyển động hỗn loạn va chạm vào hạt phấn hoa từ mọi phía, các va chạm không cân bằng làm hạt chuyển động hỗn loạn.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi thể với đặc điểm chuyển động của phân tử.',
      left: ['Chất rắn', 'Chất lỏng', 'Chất khí'],
      right: [
        'Dao động quanh vị trí cân bằng xác định',
        'Dao động quanh vị trí cân bằng có thể di chuyển',
        'Chuyển động hỗn loạn về mọi phía',
        'Đứng yên hoàn toàn',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Chất lỏng chảy được vì vị trí cân bằng của phân tử không cố định.'],
      solution:
        'Rắn: dao động quanh vị trí cân bằng xác định. Lỏng: vị trí cân bằng di chuyển được. Khí: chuyển động hỗn loạn. Không có thể nào mà phân tử đứng yên.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao chất lỏng có thể tích riêng nhưng không có hình dạng riêng?',
      options: [
        'Các phân tử ở gần nhau nên khó nén, nhưng vị trí cân bằng của chúng di chuyển được',
        'Các phân tử ở rất xa nhau và chuyển động hỗn loạn',
        'Các phân tử sắp xếp có trật tự và dao động quanh vị trí cố định',
        'Giữa các phân tử chất lỏng không có lực liên kết',
      ],
      answer: 0,
      hints: [
        'Thể tích riêng liên quan đến khoảng cách phân tử; hình dạng liên quan đến vị trí cân bằng.',
      ],
      solution:
        'Phân tử chất lỏng ở gần nhau nên thể tích gần như không đổi; vị trí cân bằng có thể di chuyển nên chất lỏng chảy và có hình dạng của phần bình chứa nó.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng về sự bay hơi và sự sôi.',
      options: [
        'Sự bay hơi xảy ra ở mặt thoáng chất lỏng, ở mọi nhiệt độ',
        'Sự sôi xảy ra cả ở mặt thoáng và trong lòng chất lỏng',
        'Trong khi sôi, nhiệt độ của chất lỏng không đổi',
        'Sự bay hơi chỉ xảy ra ở nhiệt độ sôi',
        'Nhiệt độ sôi của nước luôn là 100 °C ở mọi độ cao',
      ],
      answers: [0, 1, 2],
      hints: [
        'Vũng nước vẫn khô dần dù chưa sôi.',
        'Nhiệt độ sôi phụ thuộc áp suất trên mặt thoáng.',
      ],
      solution:
        'Bay hơi xảy ra ở mặt thoáng, ở mọi nhiệt độ; sôi xảy ra cả trong lòng chất lỏng, ở nhiệt độ sôi không đổi. Nhiệt độ sôi của nước chỉ là $100$ °C ở áp suất tiêu chuẩn; trên núi cao nước sôi ở nhiệt độ thấp hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Khi nước đá đang nóng chảy ở $0$ °C mà vẫn được đun, nhiệt độ hỗn hợp nước và nước đá không tăng vì',
      options: [
        'nhiệt lượng nhận vào dùng để phá vỡ cấu trúc mạng tinh thể của nước đá',
        'nước đá không nhận thêm nhiệt lượng nữa',
        'nhiệt lượng nhận vào làm các phân tử chuyển động chậm lại',
        'nhiệt kế không đo được nhiệt độ dưới $1$ °C',
      ],
      answer: 0,
      hints: ['Nước đá vẫn nhận nhiệt; nhiệt đó đi đâu nếu không làm tăng nhiệt độ?'],
      solution:
        'Nhiệt lượng nhận vào giúp các phân tử thắng lực liên kết giữ chúng ở vị trí xác định, phá vỡ mạng tinh thể; nhiệt độ chỉ tăng khi nước đá đã tan hết.',
    },
    {
      type: 'order',
      prompt:
        'Đun liên tục một cục nước đá ở $-20$ °C. Sắp xếp các giai đoạn theo đúng thứ tự xảy ra.',
      items: [
        'Nước đá nóng lên đến $0$ °C',
        'Nước đá nóng chảy ở $0$ °C',
        'Nước lỏng nóng lên đến $100$ °C',
        'Nước sôi ở $100$ °C',
        'Hơi nước nóng lên trên $100$ °C',
      ],
      answer: [0, 1, 2, 3, 4],
      hints: ['Nhiệt độ chỉ đứng yên khi chất đang chuyển thể.'],
      solution:
        'Rắn nóng lên → nóng chảy ở $0$ °C → lỏng nóng lên → sôi ở $100$ °C → hơi nước nóng lên (áp suất tiêu chuẩn).',
    },
    {
      type: 'choice',
      prompt: 'Phơi quần áo ướt, cách nào làm quần áo khô nhanh nhất?',
      options: [
        'Trải rộng quần áo ở nơi có nắng và gió',
        'Gấp gọn quần áo để trong phòng kín',
        'Treo quần áo thành chồng dày trong bóng râm',
        'Bọc quần áo trong túi ni lông đặt dưới nắng',
      ],
      answer: 0,
      hints: ['Sự bay hơi nhanh hơn khi nào? Nghĩ đến nhiệt độ, diện tích mặt thoáng và gió.'],
      solution:
        'Nắng làm tăng nhiệt độ, trải rộng làm tăng diện tích mặt thoáng, gió mang hơi nước đi: cả ba đều làm nước bay hơi nhanh hơn.',
    },
    {
      type: 'text',
      prompt:
        'Quá trình chuyển trực tiếp từ thể rắn sang thể khí (như băng phiến để lâu nhỏ dần) gọi là sự gì?',
      accept: ['thăng hoa', 'sự thăng hoa'],
      hints: ['Quá trình ngược lại của nó là ngưng kết.'],
      solution: 'Đó là sự thăng hoa; quá trình ngược lại (khí → rắn) là sự ngưng kết.',
    },
  ],
  takeaways: [
    'Mô hình động học phân tử: chất cấu tạo từ phân tử; phân tử chuyển động hỗn loạn không ngừng, nhiệt độ càng cao chuyển động càng nhanh; giữa các phân tử có lực liên kết.',
    'Rắn: phân tử rất gần, có trật tự, dao động quanh vị trí cố định. Lỏng: gần nhau, kém trật tự, vị trí cân bằng di chuyển được. Khí: rất xa nhau, hỗn loạn, chiếm toàn bộ bình chứa.',
    'Nóng chảy (rắn → lỏng), hoá hơi (lỏng → khí, gồm bay hơi và sôi) cần nhận nhiệt; đông đặc, ngưng tụ toả nhiệt.',
    'Chất rắn kết tinh nóng chảy và chất lỏng sôi ở nhiệt độ xác định, nhiệt độ không đổi trong suốt quá trình.',
  ],
};
