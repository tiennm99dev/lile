/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Từ trường biến thiên theo thời gian sinh ra điện trường xoáy có đường sức khép kín, và điện trường biến thiên theo thời gian sinh ra từ trường: hai trường đó là hai mặt của một trường thống nhất, điện từ trường. Điện từ trường lan truyền trong không gian là sóng điện từ: E và B dao động cùng pha, vuông góc với nhau và vuông góc với phương truyền, nên sóng điện từ là sóng ngang, truyền được cả trong chân không với tốc độ c = 3·10⁸ m/s.',
  intro:
    'Trong bài cảm ứng điện từ, ta thấy từ thông qua một vòng dây kín biến thiên thì trong vòng dây có dòng điện. Nhưng để các electron trong dây chuyển động thành dòng, phải có một điện trường đẩy chúng đi. Điện trường ấy từ đâu ra, và nếu bỏ vòng dây đi thì nó có còn không? Câu trả lời của Maxwell dẫn đến một dự đoán lớn: điện trường và từ trường có thể tự lan truyền trong không gian, kể cả trong chân không, dưới dạng sóng điện từ.',
  objectives: [
    'Nêu được từ trường biến thiên theo thời gian sinh ra điện trường xoáy; phân biệt điện trường xoáy với điện trường tĩnh.',
    'Nêu được điện trường biến thiên theo thời gian sinh ra từ trường, và khái niệm điện từ trường.',
    'Mô tả được mô hình sóng điện từ: $\\vec{E}$ và $\\vec{B}$ dao động cùng pha, vuông góc với nhau và với phương truyền.',
    'Vận dụng được $\\lambda = cT = \\dfrac{c}{f}$ và quy tắc tam diện thuận $\\vec{E}, \\vec{B}, \\vec{v}$.',
  ],
  sections: [
    {
      heading: 'Từ trường biến thiên và điện trường xoáy',
      blocks: [
        {
          type: 'p',
          text: 'Đặt một vòng dây kín trong từ trường biến thiên, trong vòng dây xuất hiện dòng điện cảm ứng. Các electron tự do trong dây chuyển động có hướng được là nhờ một điện trường. Maxwell cho rằng điện trường này không phụ thuộc vào vòng dây: vòng dây chỉ là "dụng cụ" giúp ta phát hiện nó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận của Maxwell',
          text: 'Nếu tại một nơi có từ trường biến thiên theo thời gian thì tại nơi đó xuất hiện một điện trường xoáy. Điện trường xoáy là điện trường có các đường sức là những đường cong khép kín.',
        },
        {
          type: 'table',
          head: ['Đặc điểm', 'Điện trường tĩnh', 'Điện trường xoáy'],
          rows: [
            ['Nguồn sinh ra', 'Điện tích đứng yên', 'Từ trường biến thiên theo thời gian'],
            [
              'Đường sức',
              'Đường cong không kín: đi ra từ điện tích dương, kết thúc ở điện tích âm',
              'Đường cong khép kín, bao quanh vùng có từ trường biến thiên',
            ],
            [
              'Giống nhau',
              'Tác dụng lực lên điện tích, biểu diễn bằng vectơ $\\vec{E}$',
              'Tác dụng lực lên điện tích, biểu diễn bằng vectơ $\\vec{E}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chiều của đường sức',
          text: 'Đường sức điện trường xoáy có cùng chiều với dòng điện cảm ứng mà một vòng dây kín đặt ở đó sẽ có. Vì vậy có thể tìm chiều của nó bằng định luật Lenz.',
        },
        { type: 'widget', name: 'vortex' },
      ],
    },
    {
      heading: 'Điện từ trường',
      blocks: [
        {
          type: 'p',
          text: 'Maxwell còn khẳng định điều ngược lại: điện trường biến thiên theo thời gian cũng sinh ra từ trường, giống như một dòng điện. Chẳng hạn, khi tụ điện phóng điện hay nạp điện, điện trường giữa hai bản tụ biến thiên và sinh ra từ trường trong khoảng giữa hai bản, nơi không có dòng điện dẫn nào.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện từ trường',
          text: 'Điện trường biến thiên và từ trường biến thiên cùng tồn tại trong không gian, liên quan mật thiết với nhau và có thể chuyển hoá lẫn nhau. Chúng là hai thành phần của một trường thống nhất gọi là điện từ trường.',
        },
        {
          type: 'list',
          items: [
            'Điện trường tĩnh và từ trường không đổi chỉ là những trường hợp riêng của điện từ trường, khi các thành phần không biến thiên.',
            'Tại mỗi điểm của điện từ trường, vectơ cường độ điện trường $\\vec{E}$ và vectơ cảm ứng từ $\\vec{B}$ vuông góc với nhau.',
          ],
        },
      ],
    },
    {
      heading: 'Mô hình sóng điện từ',
      blocks: [
        {
          type: 'p',
          text: 'Từ trường biến thiên sinh ra điện trường xoáy biến thiên, điện trường này lại sinh ra từ trường biến thiên ở vùng lân cận, cứ thế điện từ trường lan rộng ra mà không cần môi trường vật chất. Maxwell tính được tốc độ lan truyền này đúng bằng tốc độ ánh sáng; năm 1887, Hertz tạo ra và thu được sóng điện từ bằng thí nghiệm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng điện từ',
          text: 'Sóng điện từ là điện từ trường lan truyền trong không gian.',
        },
        {
          type: 'list',
          items: [
            'Tại mỗi điểm, $\\vec{E}$ và $\\vec{B}$ biến thiên điều hoà theo thời gian, cùng tần số và cùng pha: cùng đạt cực đại, cùng bằng 0.',
            '$\\vec{E}$ và $\\vec{B}$ vuông góc với nhau và cùng vuông góc với phương truyền sóng, nên sóng điện từ là sóng ngang. Ba vectơ $\\vec{E}$, $\\vec{B}$, $\\vec{v}$ theo thứ tự đó tạo thành một tam diện thuận: quay đinh ốc theo chiều từ $\\vec{E}$ sang $\\vec{B}$ thì đinh ốc tiến theo chiều $\\vec{v}$.',
            'Sóng điện từ truyền được trong chân không với tốc độ $c = 3 \\cdot 10^8$ m/s, và truyền được trong các môi trường rắn, lỏng, khí.',
            'Sóng điện từ mang năng lượng; nó cũng phản xạ, khúc xạ, giao thoa, nhiễu xạ như sóng cơ.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bước sóng',
          text: 'Trong chân không, sóng điện từ có tần số $f$ (chu kì $T$) có bước sóng $$\\lambda = cT = \\dfrac{c}{f},$$ với $c = 3 \\cdot 10^8$ m/s.',
        },
        {
          type: 'table',
          head: ['Đặc điểm', 'Sóng cơ', 'Sóng điện từ'],
          rows: [
            ['Môi trường', 'Cần môi trường vật chất', 'Truyền được cả trong chân không'],
            ['Loại sóng', 'Sóng ngang hoặc sóng dọc', 'Luôn là sóng ngang'],
            [
              'Đại lượng dao động',
              'Phần tử của môi trường',
              'Cường độ điện trường $\\vec{E}$ và cảm ứng từ $\\vec{B}$',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Sóng điện từ trong không gian',
    instruction:
      'Bấm "Cho sóng truyền đi", kéo trên hình để xoay góc nhìn. Dời điểm đang xét và để ý: $\\vec{E}$ (đỏ) và $\\vec{B}$ (xanh) luôn cùng bằng 0, cùng đạt cực đại, luôn vuông góc với nhau và với phương truyền. Tăng tần số $f$ thì bước sóng ngắn lại.',
  },
  examples: [
    {
      problem:
        'Một đài phát thanh FM phát sóng điện từ có tần số $100$ MHz. Tính chu kì và bước sóng của sóng này trong không khí (coi tốc độ truyền bằng $c = 3 \\cdot 10^8$ m/s).',
      steps: [
        '$f = 100$ MHz $= 10^8$ Hz.',
        'Chu kì: $T = \\dfrac{1}{f} = 10^{-8}$ s.',
        'Bước sóng: $\\lambda = \\dfrac{c}{f} = \\dfrac{3 \\cdot 10^8}{10^8} = 3$ m.',
      ],
      answer: '$T = 10^{-8}$ s và $\\lambda = 3$ m.',
    },
    {
      problem:
        'Một sóng điện từ truyền theo phương thẳng đứng, hướng từ dưới lên. Tại điểm $M$, ở một thời điểm, vectơ $\\vec{E}$ có độ lớn cực đại và hướng về phía Nam. Vectơ $\\vec{B}$ tại $M$ lúc đó thế nào?',
      steps: [
        '$\\vec{E}$ và $\\vec{B}$ dao động cùng pha, nên khi $E$ cực đại thì $B$ cũng cực đại.',
        '$\\vec{B}$ vuông góc với $\\vec{E}$ và với phương truyền (thẳng đứng), nên $\\vec{B}$ nằm ngang theo phương Đông – Tây.',
        '$\\vec{E}, \\vec{B}, \\vec{v}$ tạo thành tam diện thuận: quay từ hướng Nam sang hướng $\\vec{B}$ phải làm đinh ốc tiến lên trên. Nhìn từ trên xuống, quay từ Nam sang Đông là ngược chiều kim đồng hồ, đinh ốc tiến lên: $\\vec{B}$ hướng về phía Đông.',
      ],
      answer: '$\\vec{B}$ có độ lớn cực đại và hướng về phía Đông.',
    },
    {
      problem:
        'Một nam châm điện được nuôi bằng dòng điện xoay chiều. So sánh điện trường xuất hiện quanh lõi của nó với điện trường của một quả cầu tích điện đứng yên.',
      steps: [
        'Dòng điện xoay chiều làm từ trường trong lõi biến thiên theo thời gian, nên quanh lõi xuất hiện điện trường xoáy.',
        'Đường sức của điện trường xoáy là những đường cong khép kín bao quanh lõi; đường sức của quả cầu tích điện đứng yên là những đường hở, xuất phát từ quả cầu (nếu quả cầu tích điện dương).',
        'Cả hai đều là điện trường: đều tác dụng lực lên điện tích đặt trong đó.',
      ],
      answer:
        'Quanh lõi nam châm điện có điện trường xoáy với đường sức khép kín; quanh quả cầu có điện trường tĩnh với đường sức hở.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điện trường xoáy là điện trường',
      options: [
        'có các đường sức là những đường cong khép kín',
        'của các điện tích đứng yên',
        'có các đường sức đi ra từ điện tích dương và kết thúc ở điện tích âm',
        'giữa hai bản tụ điện có điện tích không đổi',
      ],
      answer: 0,
      hints: ['Tên gọi "xoáy" gợi đến hình dạng đường sức.'],
      solution:
        'Điện trường xoáy do từ trường biến thiên sinh ra, các đường sức của nó khép kín. Các lựa chọn còn lại mô tả điện trường tĩnh.',
    },
    {
      type: 'choice',
      prompt: 'Ở trường hợp nào sau đây xuất hiện điện trường xoáy?',
      options: [
        'Quanh lõi sắt của một máy biến áp đang hoạt động với dòng điện xoay chiều',
        'Quanh một thanh nam châm thẳng đứng yên',
        'Quanh một dây dẫn có dòng điện không đổi chạy qua',
        'Quanh một điện tích điểm đứng yên',
      ],
      answer: 0,
      hints: ['Điện trường xoáy chỉ xuất hiện khi từ trường biến thiên theo thời gian.'],
      solution:
        'Dòng điện xoay chiều làm từ trường trong lõi máy biến áp biến thiên, nên có điện trường xoáy. Nam châm đứng yên và dòng điện không đổi tạo ra từ trường không đổi; điện tích đứng yên tạo ra điện trường tĩnh.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây về sóng điện từ là SAI?',
      options: [
        'Sóng điện từ không truyền được trong chân không',
        'Sóng điện từ là sóng ngang',
        'Sóng điện từ mang năng lượng',
        'Tại mỗi điểm, $\\vec{E}$ và $\\vec{B}$ dao động cùng pha',
      ],
      answer: 0,
      hints: ['Ánh sáng Mặt Trời đến được Trái Đất qua khoảng chân không giữa chúng.'],
      solution:
        'Sóng điện từ là điện từ trường tự lan truyền, không cần môi trường vật chất, nên truyền được trong chân không. Các phát biểu còn lại đều đúng.',
    },
    {
      type: 'choice',
      prompt: 'Tại một điểm có sóng điện từ truyền qua, cường độ điện trường và cảm ứng từ',
      options: [
        'dao động cùng pha, theo hai phương vuông góc với nhau',
        'dao động ngược pha, theo hai phương vuông góc với nhau',
        'dao động lệch pha nhau $\\dfrac{\\pi}{2}$, theo cùng một phương',
        'dao động cùng pha, theo cùng phương truyền sóng',
      ],
      answer: 0,
      hints: [
        'Trong mô hình sóng điện từ, $E$ và $B$ cùng đạt cực đại và cùng bằng 0.',
        'Sóng điện từ là sóng ngang.',
      ],
      solution:
        '$\\vec{E}$ và $\\vec{B}$ dao động cùng pha, vuông góc với nhau và cùng vuông góc với phương truyền sóng.',
    },
    {
      type: 'number',
      prompt:
        'Một sóng điện từ có tần số $75$ MHz truyền trong chân không. Bước sóng của nó bằng bao nhiêu mét?',
      answer: 4,
      unit: 'm',
      hints: ['Đổi $75$ MHz $= 7{,}5 \\cdot 10^7$ Hz.', '$\\lambda = \\dfrac{c}{f}$.'],
      solution: '$\\lambda = \\dfrac{3 \\cdot 10^8}{7{,}5 \\cdot 10^7} = 4$ m.',
    },
    {
      type: 'number',
      prompt:
        'Sóng wifi có tần số $2{,}4$ GHz. Bước sóng của nó trong không khí (tốc độ coi bằng $c = 3 \\cdot 10^8$ m/s) bằng bao nhiêu xentimét?',
      answer: 12.5,
      unit: 'cm',
      hints: ['$1$ GHz $= 10^9$ Hz.', 'Tính $\\lambda$ theo mét rồi đổi ra xentimét.'],
      solution: '$\\lambda = \\dfrac{3 \\cdot 10^8}{2{,}4 \\cdot 10^9} = 0{,}125$ m $= 12{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một sóng điện từ có bước sóng $0{,}6$ m trong chân không. Tần số của nó bằng bao nhiêu MHz?',
      answer: 500,
      unit: 'MHz',
      hints: ['$f = \\dfrac{c}{\\lambda}$.'],
      solution: '$f = \\dfrac{3 \\cdot 10^8}{0{,}6} = 5 \\cdot 10^8$ Hz $= 500$ MHz.',
    },
    {
      type: 'choice',
      prompt:
        'Một sóng điện từ truyền theo phương ngang, hướng từ Tây sang Đông. Tại điểm $M$, ở một thời điểm, vectơ $\\vec{E}$ cực đại và hướng thẳng đứng lên trên. Khi đó vectơ $\\vec{B}$ tại $M$',
      options: [
        'có độ lớn cực đại và hướng về phía Nam',
        'có độ lớn cực đại và hướng về phía Bắc',
        'bằng 0',
        'có độ lớn cực đại và hướng thẳng đứng xuống dưới',
      ],
      answer: 0,
      hints: [
        '$\\vec{E}$ và $\\vec{B}$ cùng pha, và $\\vec{B}$ vuông góc với cả $\\vec{E}$ lẫn phương truyền.',
        'Dùng tam diện thuận: quay từ $\\vec{E}$ sang $\\vec{B}$, đinh ốc phải tiến theo hướng Đông.',
      ],
      solution:
        'Cùng pha nên $B$ cực đại. $\\vec{B}$ nằm ngang theo phương Bắc – Nam. Chọn trục $Ox$ hướng Đông, $Oy$ hướng Bắc, $Oz$ hướng lên: cần $\\vec{e}_z \\times \\vec{B}$ cùng chiều $\\vec{e}_x$. Vì $\\vec{e}_z \\times (-\\vec{e}_y) = \\vec{e}_x$, nên $\\vec{B}$ hướng về phía Nam.',
    },
    {
      type: 'choice',
      prompt: 'Điểm khác nhau cơ bản giữa sóng điện từ và sóng cơ là',
      options: [
        'sóng điện từ truyền được trong chân không, sóng cơ thì không',
        'sóng điện từ không mang năng lượng, sóng cơ thì mang năng lượng',
        'sóng điện từ không giao thoa được, sóng cơ thì giao thoa được',
        'sóng điện từ có thể là sóng dọc, sóng cơ luôn là sóng ngang',
      ],
      answer: 0,
      hints: ['Sóng cơ là dao động của các phần tử môi trường lan truyền đi.'],
      solution:
        'Sóng cơ cần môi trường vật chất, còn sóng điện từ là điện từ trường tự lan truyền nên truyền được cả trong chân không. Cả hai loại sóng đều mang năng lượng và giao thoa được; sóng điện từ luôn là sóng ngang.',
    },
  ],
  takeaways: [
    'Từ trường biến thiên theo thời gian sinh ra điện trường xoáy, có đường sức khép kín; điện trường biến thiên theo thời gian sinh ra từ trường.',
    'Điện trường và từ trường biến thiên là hai thành phần của một trường thống nhất: điện từ trường.',
    'Sóng điện từ là điện từ trường lan truyền trong không gian: $\\vec{E}$ và $\\vec{B}$ cùng pha, vuông góc với nhau và với phương truyền ($\\vec{E}, \\vec{B}, \\vec{v}$ tạo thành tam diện thuận); là sóng ngang, truyền được trong chân không.',
    'Bước sóng trong chân không: $\\lambda = cT = \\dfrac{c}{f}$, $c = 3 \\cdot 10^8$ m/s.',
  ],
};
