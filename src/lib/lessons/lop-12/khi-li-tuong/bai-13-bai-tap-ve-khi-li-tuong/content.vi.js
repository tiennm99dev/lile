/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập giải bài tập về khí lí tưởng: áp dụng định luật Boyle, định luật Charles, quá trình đẳng tích, phương trình trạng thái pV/T = hằng số và phương trình Clapeyron pV = nRT; đọc và vẽ đồ thị trạng thái trong các hệ toạ độ p–V, p–T, V–T; bài toán biến đổi trạng thái qua nhiều quá trình và bài toán về động năng phân tử.',
  intro:
    'Chương này đã cho ta các định luật của chất khí, phương trình trạng thái và mô hình động học phân tử. Bài này luyện cách chọn đúng định luật cho từng quá trình, nối nhiều quá trình liên tiếp, và chuyển một chuỗi biến đổi trạng thái giữa các đồ thị $p$–$V$, $p$–$T$, $V$–$T$.',
  objectives: [
    'Nhận ra quá trình (đẳng nhiệt, đẳng áp, đẳng tích) từ đề bài hoặc từ đồ thị và chọn đúng hệ thức.',
    'Giải được bài toán biến đổi trạng thái qua một hay nhiều quá trình, dùng phương trình trạng thái để kiểm tra.',
    'Vận dụng được phương trình Clapeyron $pV = nRT$ và các hệ thức $p = \\dfrac{1}{3}\\rho\\overline{v^2}$, $\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Quá trình', 'Hệ thức', 'Đường biểu diễn'],
          rows: [
            [
              'Đẳng nhiệt ($T$ không đổi)',
              '$p_1V_1 = p_2V_2$',
              'Hypebol trong hệ $(p, V)$; đường thẳng vuông góc với trục $OT$ trong hệ $(p, T)$ và $(V, T)$',
            ],
            [
              'Đẳng áp ($p$ không đổi)',
              '$\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$',
              'Đường thẳng kéo dài qua gốc toạ độ trong hệ $(V, T)$; đường thẳng song song với trục $OV$ trong hệ $(p, V)$',
            ],
            [
              'Đẳng tích ($V$ không đổi)',
              '$\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}$',
              'Đường thẳng kéo dài qua gốc toạ độ trong hệ $(p, T)$; đường thẳng vuông góc với trục $OV$ trong hệ $(p, V)$',
            ],
            [
              'Bất kì (khối lượng khí không đổi)',
              '$\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}$',
              'Tuỳ từng quá trình',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Phương trình Clapeyron: $pV = nRT$, với $n = \\dfrac{m}{M} = \\dfrac{N}{N_A}$, $R = 8{,}31$ J/(mol.K), $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹.',
            'Áp suất khí theo mô hình động học phân tử: $p = \\dfrac{1}{3}\\mu m\\overline{v^2} = \\dfrac{1}{3}\\rho\\overline{v^2}$.',
            'Động năng tịnh tiến trung bình của phân tử: $\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$, với $k = \\dfrac{R}{N_A} = 1{,}38 \\cdot 10^{-23}$ J/K.',
          ],
        },
      ],
    },
    {
      heading: 'Phương pháp giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định lượng khí đang xét (khối lượng không đổi hay thay đổi, như khi bơm thêm hoặc xả bớt khí).',
            'Liệt kê các thông số của từng trạng thái: $(p_1, V_1, T_1)$, $(p_2, V_2, T_2)$, ...; đổi nhiệt độ ra kelvin, $T = t + 273$.',
            'Nhận ra quá trình nối hai trạng thái (thông số nào không đổi) và viết hệ thức tương ứng; nếu cả ba thông số đều thay đổi, dùng phương trình trạng thái.',
            'Với chuỗi nhiều quá trình, giải lần lượt từng quá trình: trạng thái cuối của quá trình trước là trạng thái đầu của quá trình sau.',
            'Kiểm tra kết quả: $\\dfrac{pV}{T}$ phải như nhau ở mọi trạng thái của cùng một lượng khí.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý đơn vị',
          text: 'Trong các hệ thức tỉ lệ ($p_1V_1 = p_2V_2$, $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, ...), $p$ và $V$ chỉ cần cùng đơn vị ở hai vế, nhưng $T$ luôn là nhiệt độ tuyệt đối (K). Trong $pV = nRT$ phải dùng đơn vị SI: $p$ (Pa), $V$ (m³), $T$ (K).',
        },
      ],
    },
    {
      heading: 'Đọc và chuyển đồ thị trạng thái',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi điểm trên đồ thị là một trạng thái; mỗi đoạn đường là một quá trình. Để vẽ lại một chuỗi quá trình sang hệ toạ độ khác, hãy tìm đủ $p$, $V$, $T$ của các trạng thái đầu và cuối, đánh dấu chúng trong hệ toạ độ mới, rồi nối bằng đúng dạng đường của từng quá trình.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ nhận dạng',
          text: 'Đoạn thẳng nằm ngang trong hệ $(p, V)$ là quá trình đẳng áp. Trong hệ $(V, T)$, đoạn đó nằm trên một đường thẳng mà kéo dài đi qua gốc toạ độ; trong hệ $(p, T)$, nó là đoạn thẳng song song với trục $OT$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Giải bài toán chuyển trạng thái trên đồ thị',
    instruction:
      'Chọn một bài. Kéo điểm trạng thái (màu cam) dọc đường quá trình nét đứt, hoặc dùng phím mũi tên, tới giá trị đề bài cho. Khi tới nơi, tự tính đại lượng được hỏi rồi bấm Kiểm tra. Làm xong, đổi hệ toạ độ $p$–$V$, $p$–$T$, $V$–$T$ để xem cùng chuỗi biến đổi được vẽ thế nào.',
  },
  examples: [
    {
      problem:
        'Mỗi lần bơm, chiếc bơm tay đưa được $125$ cm³ không khí ở áp suất $1$ atm vào một quả bóng có dung tích $2{,}5$ lít. Ban đầu trong bóng không có không khí. Coi nhiệt độ không đổi và dung tích bóng không đổi. Tính áp suất khí trong bóng sau $40$ lần bơm.',
      steps: [
        'Lượng khí đang xét là toàn bộ khí bơm vào bóng sau $40$ lần bơm.',
        'Trạng thái 1 (trước khi vào bóng): $p_1 = 1$ atm, $V_1 = 40 \\cdot 125 = 5\\,000$ cm³ $= 5$ lít.',
        'Trạng thái 2 (trong bóng): $V_2 = 2{,}5$ lít, $p_2 = ?$ Nhiệt độ không đổi nên dùng định luật Boyle: $p_1V_1 = p_2V_2$.',
        '$p_2 = \\dfrac{p_1V_1}{V_2} = \\dfrac{1 \\cdot 5}{2{,}5} = 2$ atm.',
      ],
      answer: '$p_2 = 2$ atm.',
    },
    {
      problem:
        'Một lượng khí ở trạng thái 1 có $p_1 = 150$ kPa, $V_1 = 8$ lít, $T_1 = 300$ K. Khí được nén đẳng nhiệt đến thể tích $6$ lít (trạng thái 2), sau đó đun nóng đẳng áp đến $450$ K (trạng thái 3). Tính $p_2$, $V_3$ và mô tả đồ thị của chuỗi quá trình trong hệ toạ độ $(p, V)$.',
      steps: [
        'Quá trình 1 → 2 đẳng nhiệt: $p_1V_1 = p_2V_2$, nên $p_2 = \\dfrac{150 \\cdot 8}{6} = 200$ kPa.',
        'Quá trình 2 → 3 đẳng áp ($p_3 = p_2 = 200$ kPa): $\\dfrac{V_2}{T_2} = \\dfrac{V_3}{T_3}$, với $T_2 = T_1 = 300$ K, nên $V_3 = \\dfrac{6 \\cdot 450}{300} = 9$ lít.',
        'Kiểm tra: $\\dfrac{p_1V_1}{T_1} = \\dfrac{150 \\cdot 8}{300} = 4$ và $\\dfrac{p_3V_3}{T_3} = \\dfrac{200 \\cdot 9}{450} = 4$.',
        'Trong hệ $(p, V)$: trục hoành là $V$, trục tung là $p$. Đoạn 1 → 2 là một cung hypebol đi lên, từ điểm $V = 8$ lít, $p = 150$ kPa đến điểm $V = 6$ lít, $p = 200$ kPa; đoạn 2 → 3 là đoạn thẳng nằm ngang ở $p = 200$ kPa, từ $V = 6$ lít đến $V = 9$ lít.',
      ],
      answer: '$p_2 = 200$ kPa, $V_3 = 9$ lít.',
    },
    {
      problem:
        'Một bình kín dung tích $8{,}31$ lít chứa $0{,}5$ mol khí ở $27$ °C. Tính áp suất khí trong bình và động năng tịnh tiến trung bình của một phân tử khí.',
      steps: [
        'Đổi đơn vị: $V = 8{,}31 \\cdot 10^{-3}$ m³, $T = 27 + 273 = 300$ K.',
        'Phương trình Clapeyron: $p = \\dfrac{nRT}{V} = \\dfrac{0{,}5 \\cdot 8{,}31 \\cdot 300}{8{,}31 \\cdot 10^{-3}} = 1{,}5 \\cdot 10^{5}$ Pa.',
        '$\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT = \\dfrac{3}{2} \\cdot 1{,}38 \\cdot 10^{-23} \\cdot 300 = 6{,}21 \\cdot 10^{-21}$ J.',
      ],
      answer: '$p = 1{,}5 \\cdot 10^{5}$ Pa; $\\overline{E}_\\text{đ} = 6{,}21 \\cdot 10^{-21}$ J.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Nén đẳng nhiệt một lượng khí từ thể tích $6$ lít xuống $4$ lít thì áp suất tăng thêm $0{,}75$ atm. Tính áp suất ban đầu của khí (theo atm).',
      answer: 1.5,
      unit: 'atm',
      tolerance: 0.01,
      hints: [
        'Đặt áp suất ban đầu là $p_1$; áp suất sau là $p_2 = p_1 + 0{,}75$.',
        'Định luật Boyle: $p_1 \\cdot 6 = (p_1 + 0{,}75) \\cdot 4$.',
      ],
      solution:
        '$6p_1 = 4p_1 + 3$, nên $2p_1 = 3$, $p_1 = 1{,}5$ atm (áp suất sau nén là $2{,}25$ atm).',
    },
    {
      type: 'number',
      prompt:
        'Một lượng khí có thể tích $10$ lít ở $27$ °C được đun nóng đẳng áp đến $127$ °C. Tính thể tích khí lúc sau (theo lít, làm tròn đến hàng phần trăm).',
      answer: 13.33,
      unit: 'lít',
      tolerance: 0.01,
      hints: [
        'Đổi ra kelvin: $T_1 = 300$ K, $T_2 = 400$ K.',
        'Dùng $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$.',
      ],
      solution:
        '$V_2 = V_1 \\cdot \\dfrac{T_2}{T_1} = 10 \\cdot \\dfrac{400}{300} \\approx 13{,}33$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Một bình kín chứa khí ở $27$ °C và áp suất $2$ atm. Đun nóng bình đến $87$ °C (bỏ qua sự nở của bình). Áp suất khí trong bình lúc đó là bao nhiêu atm?',
      answer: 2.4,
      unit: 'atm',
      tolerance: 0.01,
      hints: [
        'Bình kín, không nở: quá trình đẳng tích.',
        '$\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}$ với $T_1 = 300$ K, $T_2 = 360$ K.',
      ],
      solution: '$p_2 = p_1 \\cdot \\dfrac{T_2}{T_1} = 2 \\cdot \\dfrac{360}{300} = 2{,}4$ atm.',
    },
    {
      type: 'number',
      prompt:
        'Trong phòng thí nghiệm, người ta điều chế được $40$ cm³ khí hydrogen ở áp suất $750$ mmHg và nhiệt độ $27$ °C. Tính thể tích của lượng khí đó ở điều kiện tiêu chuẩn ($760$ mmHg, $0$ °C), theo cm³, làm tròn đến hàng phần mười.',
      answer: 35.9,
      unit: 'cm³',
      tolerance: 0.1,
      hints: [
        'Cả $p$, $V$, $T$ đều thay đổi: dùng phương trình trạng thái.',
        '$V_0 = V_1 \\cdot \\dfrac{p_1}{p_0} \\cdot \\dfrac{T_0}{T_1}$, với $T_1 = 300$ K, $T_0 = 273$ K.',
      ],
      solution:
        '$\\dfrac{p_1V_1}{T_1} = \\dfrac{p_0V_0}{T_0}$, nên $V_0 = \\dfrac{750 \\cdot 40 \\cdot 273}{300 \\cdot 760} = \\dfrac{8\\,190\\,000}{228\\,000} \\approx 35{,}9$ cm³.',
    },
    {
      type: 'number',
      prompt:
        'Một bình dung tích $10$ lít chứa khí oxygen ($M = 32$ g/mol) ở $27$ °C, áp suất $1{,}5 \\cdot 10^{5}$ Pa. Tính khối lượng khí oxygen trong bình (theo g, làm tròn đến hàng phần mười). Cho $R = 8{,}31$ J/(mol.K).',
      answer: 19.3,
      unit: 'g',
      tolerance: 0.1,
      hints: [
        'Đổi $V = 10^{-2}$ m³, $T = 300$ K.',
        'Từ $pV = \\dfrac{m}{M}RT$ suy ra $m = \\dfrac{pVM}{RT}$.',
      ],
      solution:
        '$m = \\dfrac{pVM}{RT} = \\dfrac{1{,}5 \\cdot 10^{5} \\cdot 10^{-2} \\cdot 32}{8{,}31 \\cdot 300} = \\dfrac{48\\,000}{2\\,493} \\approx 19{,}3$ g.',
    },
    {
      type: 'number',
      prompt:
        'Một lượng khí ở trạng thái 1 có $p_1 = 2$ atm, $V_1 = 3$ lít, $T_1 = 300$ K. Khí được nén đẳng nhiệt đến $1{,}5$ lít, sau đó đun nóng đẳng tích đến $450$ K. Tính áp suất cuối cùng $p_3$ (theo atm).',
      answer: 6,
      unit: 'atm',
      tolerance: 0.01,
      hints: [
        'Giải từng quá trình: trước hết tìm $p_2$ sau khi nén đẳng nhiệt.',
        'Quá trình sau là đẳng tích ở $V = 1{,}5$ lít, từ $T_2 = 300$ K đến $T_3 = 450$ K.',
      ],
      solution:
        'Đẳng nhiệt: $p_2 = \\dfrac{2 \\cdot 3}{1{,}5} = 4$ atm. Đẳng tích: $p_3 = p_2 \\cdot \\dfrac{T_3}{T_2} = 4 \\cdot \\dfrac{450}{300} = 6$ atm. Kiểm tra: $\\dfrac{2 \\cdot 3}{300} = \\dfrac{6 \\cdot 1{,}5}{450} = 0{,}02$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong hệ toạ độ $(p, T)$, đường biểu diễn nào sau đây là đường đẳng tích của một lượng khí xác định?',
      options: [
        'Đường thẳng mà nếu kéo dài sẽ đi qua gốc toạ độ',
        'Đường thẳng song song với trục $OT$',
        'Đường thẳng vuông góc với trục $OT$',
        'Đường hypebol',
      ],
      answer: 0,
      hints: ['Khi $V$ không đổi, $p$ tỉ lệ thế nào với $T$?'],
      solution:
        'Đẳng tích: $\\dfrac{p}{T} = $ hằng số, tức $p$ tỉ lệ thuận với $T$, nên đường biểu diễn là đường thẳng mà kéo dài đi qua gốc toạ độ. Đường song song với trục $OT$ là đẳng áp, đường vuông góc với trục $OT$ là đẳng nhiệt.',
    },
    {
      type: 'choice',
      prompt:
        'Trong hệ toạ độ $(p, V)$, một chu trình gồm: đoạn thẳng đứng 1 → 2 ($p$ tăng), đoạn thẳng nằm ngang 2 → 3 ($V$ tăng), và cung hypebol 3 → 1. Các quá trình 1 → 2, 2 → 3, 3 → 1 lần lượt là',
      options: [
        'đẳng tích, đẳng áp, đẳng nhiệt',
        'đẳng áp, đẳng tích, đẳng nhiệt',
        'đẳng nhiệt, đẳng áp, đẳng tích',
        'đẳng tích, đẳng nhiệt, đẳng áp',
      ],
      answer: 0,
      hints: [
        'Đoạn thẳng đứng trong hệ $(p, V)$: thông số nào không đổi?',
        'Hypebol trong hệ $(p, V)$ ứng với $pV = $ hằng số.',
      ],
      solution:
        'Đoạn thẳng đứng: $V$ không đổi (đẳng tích). Đoạn nằm ngang: $p$ không đổi (đẳng áp). Cung hypebol: $pV = $ hằng số (đẳng nhiệt).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi quá trình của một lượng khí xác định với hệ thức đúng.',
      left: ['Đẳng nhiệt', 'Đẳng áp', 'Đẳng tích'],
      right: [
        '$pV = $ hằng số',
        '$\\dfrac{V}{T} = $ hằng số',
        '$\\dfrac{p}{T} = $ hằng số',
        '$pT = $ hằng số',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Mỗi quá trình giữ một thông số không đổi; hai thông số còn lại liên hệ thế nào?'],
      solution:
        'Đẳng nhiệt: $pV = $ hằng số (định luật Boyle). Đẳng áp: $\\dfrac{V}{T} = $ hằng số (định luật Charles). Đẳng tích: $\\dfrac{p}{T} = $ hằng số. Không có quá trình nào ứng với $pT = $ hằng số.',
    },
    {
      type: 'number',
      prompt:
        'Tính động năng tịnh tiến trung bình của một phân tử khí ở $87$ °C, theo đơn vị $10^{-21}$ J (làm tròn đến hàng phần trăm). Cho $k = 1{,}38 \\cdot 10^{-23}$ J/K.',
      answer: 7.45,
      tolerance: 0.01,
      hints: ['$T = 87 + 273 = 360$ K.', '$\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$.'],
      solution:
        '$\\overline{E}_\\text{đ} = \\dfrac{3}{2} \\cdot 1{,}38 \\cdot 10^{-23} \\cdot 360 = 7{,}452 \\cdot 10^{-21}$ J $\\approx 7{,}45 \\cdot 10^{-21}$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một khối khí có khối lượng riêng $\\rho = 1{,}25$ kg/m³ và áp suất $p = 1{,}0 \\cdot 10^{5}$ Pa. Tính $\\sqrt{\\overline{v^2}}$ (căn bậc hai của trung bình bình phương tốc độ phân tử), theo m/s, làm tròn đến hàng đơn vị.',
      answer: 490,
      unit: 'm/s',
      tolerance: 1,
      hints: [
        'Từ $p = \\dfrac{1}{3}\\rho\\overline{v^2}$ suy ra $\\overline{v^2} = \\dfrac{3p}{\\rho}$.',
      ],
      solution:
        '$\\overline{v^2} = \\dfrac{3 \\cdot 1{,}0 \\cdot 10^{5}}{1{,}25} = 240\\,000$ m²/s², nên $\\sqrt{\\overline{v^2}} = \\sqrt{240\\,000} \\approx 490$ m/s.',
    },
    {
      type: 'choice',
      prompt:
        'Khí ở $27$ °C. Phải đun nóng khí đến nhiệt độ nào để động năng tịnh tiến trung bình của phân tử tăng gấp đôi?',
      options: ['$327$ °C', '$54$ °C', '$600$ °C', '$300$ °C'],
      answer: 0,
      hints: [
        '$\\overline{E}_\\text{đ}$ tỉ lệ với nhiệt độ tuyệt đối $T$, không phải với $t$ (°C).',
      ],
      solution:
        '$\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$ gấp đôi khi $T$ gấp đôi: $T_2 = 2 \\cdot 300 = 600$ K, tức $t_2 = 600 - 273 = 327$ °C.',
    },
  ],
  takeaways: [
    'Nhận ra thông số không đổi để chọn hệ thức: đẳng nhiệt $pV = $ hằng số, đẳng áp $\\dfrac{V}{T} = $ hằng số, đẳng tích $\\dfrac{p}{T} = $ hằng số; cả ba thay đổi thì dùng $\\dfrac{pV}{T} = $ hằng số.',
    'Chuỗi nhiều quá trình: giải lần lượt từng quá trình và kiểm tra $\\dfrac{pV}{T}$ như nhau ở mọi trạng thái.',
    'Chuyển đồ thị: tìm đủ $p$, $V$, $T$ của mỗi trạng thái rồi nối bằng đúng dạng đường của từng quá trình.',
    'Luôn dùng nhiệt độ tuyệt đối $T = t + 273$; trong $pV = nRT$ dùng đơn vị SI.',
  ],
};
