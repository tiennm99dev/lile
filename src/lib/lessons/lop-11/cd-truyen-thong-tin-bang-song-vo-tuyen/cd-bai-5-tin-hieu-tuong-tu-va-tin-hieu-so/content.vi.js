/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tín hiệu tương tự biến đổi liên tục và có vô số giá trị, tín hiệu số chỉ có một số hữu hạn mức; bộ ADC lấy mẫu, lượng tử hoá và mã hoá tín hiệu tương tự thành các bit, bộ DAC làm ngược lại.',
  intro:
    'Giọng hát thu qua micro là một điện áp lên xuống liên tục. Thế nhưng điện thoại lại lưu và gửi bài hát ấy dưới dạng một dãy dài các số 0 và 1. Điện áp liên tục được biến thành các con số như thế nào, và vì sao người ta lại muốn làm vậy?',
  objectives: [
    'Phân biệt được tín hiệu tương tự và tín hiệu số.',
    'Nêu được mối liên hệ giữa số bit và số mức của tín hiệu số.',
    'Mô tả được các bước chuyển đổi tương tự – số (ADC): lấy mẫu, lượng tử hoá, mã hoá; và vai trò của bộ chuyển đổi số – tương tự (DAC).',
    'Nêu được ưu, nhược điểm của việc truyền dữ liệu dưới dạng số.',
  ],
  sections: [
    {
      heading: 'Tín hiệu tương tự',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tín hiệu tương tự',
          text: 'Tín hiệu tương tự là tín hiệu biến đổi liên tục theo thời gian; trong một khoảng thời gian bất kì, nó có thể nhận vô số giá trị (vô số mức điện áp).',
        },
        {
          type: 'p',
          text: 'Micro biến dao động của âm thanh thành điện áp biến đổi liên tục theo đúng dạng sóng âm: đó là tín hiệu tương tự. Nhiệt độ trong ngày, độ sáng, áp suất đo bằng cảm biến cũng cho tín hiệu tương tự. Loa phát ra âm thanh cũng cần được cấp một tín hiệu tương tự.',
        },
      ],
    },
    {
      heading: 'Tín hiệu số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tín hiệu số',
          text: 'Tín hiệu số là tín hiệu chỉ nhận một số hữu hạn giá trị (một số hữu hạn mức điện áp), thay đổi từ mức này sang mức khác ở những thời điểm xác định.',
        },
        {
          type: 'p',
          text: 'Tín hiệu số đơn giản nhất có hai mức, ứng với hai chữ số $0$ và $1$; mỗi chữ số như vậy là một bit. Tín hiệu số có bốn mức thì mỗi mức mang được hai bit ($00$, $01$, $10$, $11$), nên mang nhiều thông tin hơn trên một mức.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Số bit và số mức',
          text: 'Dùng $n$ bit thì viết được $2^n$ số khác nhau, nên một tín hiệu số $n$ bit có $N = 2^n$ mức.',
        },
        {
          type: 'table',
          head: ['Số bit $n$', '$1$', '$2$', '$3$', '$4$', '$8$', '$16$'],
          rows: [['Số mức $2^n$', '$2$', '$4$', '$8$', '$16$', '$256$', '$65\\,536$']],
        },
      ],
    },
    {
      heading: 'Chuyển đổi tương tự – số (ADC) và số – tương tự (DAC)',
      blocks: [
        {
          type: 'p',
          text: 'Bộ chuyển đổi tương tự – số (ADC, analog-to-digital converter) biến tín hiệu tương tự thành tín hiệu số qua ba bước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lấy mẫu: đo giá trị của tín hiệu tương tự ở những thời điểm cách đều nhau. Khoảng thời gian giữa hai lần đo là chu kì lấy mẫu $T_s$; số mẫu lấy trong một giây là tần số lấy mẫu $f_s = \\dfrac{1}{T_s}$.',
            'Lượng tử hoá: làm tròn mỗi mẫu về mức gần nhất trong $2^n$ mức cho phép.',
            'Mã hoá: viết số thứ tự của mức đó bằng $n$ bit. Dãy các nhóm $n$ bit là tín hiệu số.',
          ],
        },
        {
          type: 'p',
          text: 'Lấy mẫu càng dày và dùng càng nhiều bit thì tín hiệu số càng bám sát tín hiệu tương tự. Để không mất các chi tiết nhanh nhất của tín hiệu, tần số lấy mẫu phải ít nhất gấp đôi tần số cao nhất có trong tín hiệu. Tai người nghe được đến khoảng $20$ kHz, nên đĩa CD lấy mẫu $44{,}1$ kHz, mỗi mẫu $16$ bit.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tốc độ bit',
          text: 'Mỗi giây có $f_s$ mẫu, mỗi mẫu $n$ bit, nên số bit phải truyền trong một giây (tốc độ bit) là $f_s \\cdot n$ (bit/s).',
        },
        {
          type: 'p',
          text: 'Bộ chuyển đổi số – tương tự (DAC, digital-to-analog converter) làm ngược lại: đọc từng nhóm $n$ bit, tạo ra điện áp của mức tương ứng và giữ đến mẫu sau. Tín hiệu bậc thang này được làm trơn để có lại tín hiệu tương tự đưa ra loa.',
        },
        {
          type: 'p',
          text: 'Trong một hệ thống truyền thanh số, ở phía phát: micro cho tín hiệu tương tự, ADC chuyển thành tín hiệu số, bộ biến điệu đưa tín hiệu số lên sóng mang cao tần, rồi khuếch đại và đưa ra anten phát. Ở phía thu: anten thu nhận sóng, bộ tách sóng tách tín hiệu số khỏi sóng mang, DAC chuyển lại thành tín hiệu tương tự, khuếch đại công suất rồi phát ra loa.',
        },
      ],
    },
    {
      heading: 'Ưu, nhược điểm của truyền dữ liệu dưới dạng số',
      blocks: [
        {
          type: 'table',
          head: ['Tiêu chí', 'Tín hiệu số', 'Tín hiệu tương tự'],
          rows: [
            ['Nhiễu', 'Ít bị ảnh hưởng bởi nhiễu', 'Bị ảnh hưởng bởi nhiễu'],
            [
              'Khôi phục tín hiệu',
              'Dễ khôi phục vì chỉ cần phân biệt vài mức (ví dụ $0$ và $1$)',
              'Khó khôi phục vì có vô số mức điện áp',
            ],
            [
              'Chất lượng khi truyền, sao chép',
              'Tốt, ít lỗi, không suy giảm sau nhiều lần sao chép',
              'Suy giảm dần, dễ lẫn nhiễu',
            ],
            [
              'Lưu trữ, xử lí',
              'Nén, lưu trữ, bảo mật tốt; cần phần cứng tốc độ cao, xử lí phức tạp hơn',
              'Xử lí đơn giản hơn',
            ],
            ['Băng thông', 'Chiếm nhiều băng thông', 'Chiếm ít băng thông'],
            ['Số người dùng', 'Cho phép nhiều người dùng chung đường truyền', 'Ít người dùng hơn'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao tín hiệu số ít bị nhiễu?',
          text: 'Nhiễu cộng thêm một chút điện áp vào tín hiệu. Với tín hiệu tương tự, phần nhiễu này không tách ra được. Với tín hiệu số hai mức, máy thu chỉ cần quyết định điện áp gần mức $0$ hay mức $1$ hơn, nên nhiễu nhỏ bị loại bỏ hoàn toàn và tín hiệu được tái tạo nguyên vẹn.',
        },
      ],
    },
    {
      heading: 'Dự án: Số hoá một đoạn ghi âm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thấy tần số lấy mẫu và số bit ảnh hưởng thế nào đến chất lượng âm thanh và dung lượng tệp. Dụng cụ: máy tính có phần mềm ghi âm miễn phí (ví dụ Audacity) hoặc điện thoại có ứng dụng ghi âm cho chọn tần số lấy mẫu, tai nghe.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ghi một đoạn $10$ giây (một câu nói và một đoạn nhạc) với $44{,}1$ kHz, $16$ bit, một kênh.',
            'Xuất cùng đoạn đó dưới dạng tệp không nén (WAV) với các thiết lập: $22{,}05$ kHz – $16$ bit, $8$ kHz – $16$ bit, $8$ kHz – $8$ bit.',
            'Với mỗi tệp, tính trước dung lượng $f_s \\cdot n \\cdot t$ (bit), đổi ra kilôbai rồi so với dung lượng thật của tệp.',
            'Nghe lần lượt các tệp, ghi nhận xét: âm cao (tiếng chũm choẹ, chữ "s") còn rõ không, có tiếng xì nền không.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng gồm: tần số lấy mẫu, số bit, tốc độ bit, dung lượng tính được, dung lượng thật và nhận xét chất lượng. Giải thích vì sao giảm tần số lấy mẫu làm mất âm cao, còn giảm số bit làm xuất hiện tiếng xì.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lấy mẫu và lượng tử hoá',
    instruction:
      'Kéo thanh trượt tần số lấy mẫu và chọn số bit mỗi mẫu. Quan sát bậc thang màu cam (tín hiệu số khôi phục) bám theo đường xanh (tín hiệu tương tự) đến đâu, sai lệch lớn nhất và tốc độ bit thay đổi thế nào. Thử tìm thiết lập ít bit nhất mà bậc thang vẫn giữ được dạng tín hiệu.',
  },
  examples: [
    {
      problem:
        'Một bộ ADC $3$ bit có các mức điện áp $0$ V, $1$ V, $2$ V, …, cách nhau $1$ V. Bộ có bao nhiêu mức? Mẫu $5{,}3$ V và mẫu $2{,}6$ V được mã hoá thành những mã nào?',
      steps: [
        'Số mức: $2^3 = 8$ mức, từ mức $0$ ($0$ V) đến mức $7$ ($7$ V).',
        'Mẫu $5{,}3$ V gần mức $5$ V nhất, nên lượng tử hoá thành mức $5$; viết $5$ bằng $3$ bit: $5 = 4 + 1$, mã $101$.',
        'Mẫu $2{,}6$ V gần mức $3$ V nhất, nên thành mức $3$; $3 = 2 + 1$, mã $011$.',
      ],
      answer: '$8$ mức; hai mẫu có mã $101$ và $011$.',
    },
    {
      problem:
        'Âm thanh CD được lấy mẫu với tần số $44{,}1$ kHz, mỗi mẫu $16$ bit, hai kênh (âm thanh nổi). Tính tốc độ bit và số bit của một phút nhạc không nén.',
      steps: [
        'Một kênh: $44\\,100 \\cdot 16 = 705\\,600$ bit/s.',
        'Hai kênh: $2 \\cdot 705\\,600 = 1\\,411\\,200$ bit/s, khoảng $1{,}4$ Mbit/s.',
        'Một phút: $1\\,411\\,200 \\cdot 60 = 84\\,672\\,000$ bit, tức $\\dfrac{84\\,672\\,000}{8} = 10\\,584\\,000$ byte, khoảng $10{,}6$ MB.',
      ],
      answer:
        'Tốc độ bit $1\\,411\\,200$ bit/s; một phút nhạc khoảng $8{,}5 \\cdot 10^7$ bit ($10{,}6$ MB).',
    },
    {
      problem:
        'Tín hiệu thoại có tần số cao nhất khoảng $4$ kHz. Tổng đài lấy mẫu với tần số nhỏ nhất đủ dùng và mã hoá mỗi mẫu $8$ bit. Tính tần số lấy mẫu và tốc độ bit.',
      steps: [
        'Tần số lấy mẫu ít nhất gấp đôi tần số cao nhất: $f_s = 2 \\cdot 4 = 8$ kHz.',
        'Tốc độ bit: $f_s \\cdot n = 8\\,000 \\cdot 8 = 64\\,000$ bit/s.',
      ],
      answer: '$f_s = 8$ kHz; tốc độ bit $64$ kbit/s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tín hiệu điện lấy ra ngay sau micro khi ta hát là loại tín hiệu nào?',
      options: [
        'Tín hiệu tương tự',
        'Tín hiệu số hai mức',
        'Tín hiệu số bốn mức',
        'Sóng mang cao tần',
      ],
      answer: 0,
      hints: ['Điện áp của micro thay đổi thế nào theo sóng âm: liên tục hay nhảy bậc?'],
      solution:
        'Micro cho điện áp biến đổi liên tục theo dạng sóng âm, có vô số giá trị: đó là tín hiệu tương tự. Muốn có tín hiệu số phải qua bộ ADC.',
    },
    {
      type: 'number',
      prompt: 'Một bộ ADC mã hoá mỗi mẫu bằng $4$ bit. Tín hiệu số của nó có bao nhiêu mức?',
      answer: 16,
      hints: ['Với $n$ bit thì có $2^n$ mức.'],
      solution: 'Số mức là $2^4 = 16$.',
    },
    {
      type: 'choice',
      prompt:
        'Tín hiệu số hai mức và tín hiệu số bốn mức, tín hiệu nào mang được nhiều bit hơn trên một mức?',
      options: [
        'Tín hiệu bốn mức, mỗi mức mang $2$ bit',
        'Tín hiệu hai mức, mỗi mức mang $2$ bit',
        'Hai tín hiệu mang số bit như nhau trên một mức',
        'Tín hiệu bốn mức, mỗi mức mang $4$ bit',
      ],
      answer: 0,
      hints: ['Cần bao nhiêu bit để đánh số $4$ mức khác nhau?'],
      solution:
        'Bốn mức được đánh số bằng $2$ bit ($00$, $01$, $10$, $11$), nên mỗi mức mang $2$ bit; tín hiệu hai mức chỉ mang $1$ bit trên một mức.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước bộ ADC chuyển tín hiệu tương tự thành tín hiệu số.',
      items: ['Mã hoá mỗi mức bằng $n$ bit', 'Lấy mẫu', 'Lượng tử hoá'],
      answer: [1, 2, 0],
      hints: ['Phải có các giá trị đo được trước, rồi mới làm tròn, rồi mới viết thành bit.'],
      solution:
        'Lấy mẫu (đo tín hiệu ở các thời điểm cách đều), lượng tử hoá (làm tròn về mức gần nhất), mã hoá (viết số thứ tự mức bằng $n$ bit).',
    },
    {
      type: 'text',
      prompt:
        'Một bộ ADC $3$ bit lượng tử hoá một mẫu thành mức số $6$. Viết mã $3$ bit của mẫu đó.',
      accept: ['110'],
      hints: ['Viết $6$ thành tổng các luỹ thừa của $2$: $4$, $2$, $1$.'],
      solution: '$6 = 4 + 2 + 0$, nên mã là $110$.',
    },
    {
      type: 'number',
      prompt:
        'Bộ DAC $3$ bit có các mức $0$ V, $1$ V, …, $7$ V. Nó nhận được mã $011$. Điện áp ra là bao nhiêu vôn?',
      answer: 3,
      unit: 'V',
      hints: ['Đổi mã nhị phân $011$ ra số thứ tự của mức.'],
      solution: '$011$ là $0 \\cdot 4 + 1 \\cdot 2 + 1 \\cdot 1 = 3$, ứng với mức $3$ V.',
    },
    {
      type: 'number',
      prompt:
        'Âm thanh nghe được có tần số đến $20$ kHz. Tần số lấy mẫu nhỏ nhất để không mất các âm cao nhất là bao nhiêu kHz?',
      answer: 40,
      unit: 'kHz',
      hints: ['Tần số lấy mẫu ít nhất gấp đôi tần số cao nhất của tín hiệu.'],
      solution:
        '$f_s \\geq 2 \\cdot 20 = 40$ kHz. Đĩa CD dùng $44{,}1$ kHz, lớn hơn một chút cho an toàn.',
    },
    {
      type: 'number',
      prompt:
        'Một máy ghi âm lấy mẫu $16$ kHz, mỗi mẫu $8$ bit, một kênh. Tốc độ bit là bao nhiêu kbit/s?',
      answer: 128,
      unit: 'kbit/s',
      hints: ['Tốc độ bit bằng tần số lấy mẫu nhân số bit mỗi mẫu.'],
      solution: '$16\\,000 \\cdot 8 = 128\\,000$ bit/s $= 128$ kbit/s.',
    },
    {
      type: 'number',
      prompt: 'Cần ít nhất bao nhiêu bit mỗi mẫu để tín hiệu số có từ $1\\,000$ mức trở lên?',
      answer: 10,
      hints: ['Tìm số $n$ nhỏ nhất để $2^n \\geq 1\\,000$.', '$2^9 = 512$.'],
      solution: '$2^9 = 512 < 1\\,000 \\leq 2^{10} = 1\\,024$, nên cần ít nhất $10$ bit.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào là ưu điểm của truyền dữ liệu dưới dạng số?',
      options: [
        'Ít bị ảnh hưởng bởi nhiễu, dễ khôi phục tín hiệu',
        'Dễ nén, lưu trữ và bảo mật',
        'Chiếm ít băng thông hơn tín hiệu tương tự',
        'Bộ xử lí đơn giản, không cần phần cứng tốc độ cao',
      ],
      answers: [0, 1],
      hints: ['Hai phát biểu thực ra là nhược điểm của tín hiệu số.'],
      solution:
        'Tín hiệu số ít bị nhiễu, dễ khôi phục, dễ nén, lưu trữ và bảo mật. Đổi lại nó chiếm nhiều băng thông hơn và cần phần cứng xử lí tốc độ cao, phức tạp hơn.',
    },
  ],
  takeaways: [
    'Tín hiệu tương tự biến đổi liên tục, có vô số giá trị; tín hiệu số chỉ có một số hữu hạn mức.',
    'Tín hiệu số $n$ bit có $2^n$ mức; mỗi mức của tín hiệu bốn mức mang $2$ bit.',
    'ADC: lấy mẫu (tần số $f_s$), lượng tử hoá (làm tròn về mức gần nhất), mã hoá (viết bằng $n$ bit); DAC làm ngược lại. Tốc độ bit bằng $f_s \\cdot n$.',
    'Lấy mẫu dày hơn (ít nhất gấp đôi tần số cao nhất) và nhiều bit hơn thì tín hiệu số bám sát tín hiệu tương tự hơn, nhưng cần truyền nhiều bit hơn.',
    'Truyền số ít bị nhiễu, dễ khôi phục, nén và bảo mật tốt, nhưng chiếm nhiều băng thông và cần xử lí phức tạp hơn.',
  ],
};
