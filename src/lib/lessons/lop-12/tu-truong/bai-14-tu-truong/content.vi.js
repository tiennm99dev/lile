/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Từ trường là trường lực gây ra bởi dòng điện hoặc nam châm, tác dụng lực từ lên nam châm hay dòng điện khác đặt trong nó. Từ trường được biểu diễn bằng các đường sức từ khép kín; chiều đường sức từ của dòng điện thẳng và của ống dây được xác định bằng quy tắc nắm tay phải.',
  intro:
    'Năm 1820, khi đóng mạch điện trong một buổi giảng, Hans Christian Oersted nhận thấy kim la bàn đặt gần dây dẫn bỗng quay lệch đi. Dòng điện chạy trong dây đã tác dụng lực lên kim nam châm giống như một nam châm khác. Vậy quanh dòng điện có gì, và làm sao biết kim nam châm sẽ quay về phía nào?',
  objectives: [
    'Nêu được từ trường là trường lực gây ra bởi dòng điện hoặc nam châm, và cách nhận biết từ trường bằng kim nam châm thử.',
    'Nêu được định nghĩa và các tính chất của đường sức từ; mô tả được từ phổ bằng mạt sắt.',
    'Vẽ được đường sức từ của nam châm thẳng, của dòng điện thẳng dài và của ống dây có dòng điện chạy qua.',
    'Vận dụng được quy tắc nắm tay phải để xác định chiều đường sức từ.',
  ],
  sections: [
    {
      heading: 'Tương tác từ và từ trường',
      blocks: [
        {
          type: 'p',
          text: 'Hai nam châm đặt gần nhau thì hút hoặc đẩy nhau. Thí nghiệm Oersted cho thấy dòng điện cũng tác dụng lực lên kim nam châm, nam châm tác dụng lực lên dây dẫn có dòng điện, và hai dây dẫn có dòng điện cũng hút hoặc đẩy nhau. Tương tác giữa nam châm với nam châm, giữa dòng điện với nam châm và giữa dòng điện với dòng điện đều gọi là tương tác từ; lực tương tác đó gọi là lực từ. Từ trường cũng tác dụng lực từ lên các hạt mang điện đang chuyển động (chúng tạo thành dòng điện), còn điện tích đứng yên thì không chịu lực từ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Từ trường',
          text: 'Từ trường là trường lực gây ra bởi dòng điện hoặc nam châm. Đó là một dạng vật chất tồn tại xung quanh dòng điện hoặc nam châm, mà biểu hiện cụ thể là lực từ tác dụng lên một dòng điện hay một nam châm khác đặt trong nó.',
        },
        {
          type: 'p',
          text: 'Để nhận biết từ trường, ta dùng một kim nam châm nhỏ đặt cân bằng trên một trục (kim nam châm thử). Ở chỗ có từ trường, kim bị lực từ làm quay và nằm cân bằng theo một hướng xác định. Người ta quy ước: hướng của từ trường tại một điểm là hướng Nam – Bắc của kim nam châm thử nằm cân bằng tại điểm đó (từ cực Nam sang cực Bắc của kim). Từ trường tại mỗi điểm được đặc trưng bằng vectơ cảm ứng từ $\\vec{B}$ có hướng là hướng của từ trường; độ lớn của $\\vec{B}$ sẽ được định nghĩa ở bài sau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Từ trường đều',
          text: 'Từ trường mà vectơ cảm ứng từ tại mọi điểm đều như nhau (cùng hướng, cùng độ lớn) gọi là từ trường đều. Từ trường trong khoảng giữa hai cực của một nam châm chữ U và trong lòng một ống dây dài có dòng điện là gần đúng từ trường đều.',
        },
      ],
    },
    {
      heading: 'Đường sức từ',
      blocks: [
        {
          type: 'p',
          text: 'Rắc mạt sắt lên tấm bìa đặt trên nam châm rồi gõ nhẹ: các mạt sắt bị nhiễm từ, xếp thành những đường cong nối từ cực này sang cực kia. Hình ảnh đó gọi là từ phổ; nó cho ta hình ảnh trực quan về từ trường.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường sức từ',
          text: 'Đường sức từ là những đường vẽ trong không gian có từ trường sao cho tiếp tuyến tại mỗi điểm có phương trùng với phương của từ trường tại điểm đó. Chiều của đường sức từ tại mỗi điểm là chiều của từ trường (chiều của $\\vec{B}$) tại điểm đó.',
        },
        {
          type: 'list',
          items: [
            'Qua mỗi điểm trong từ trường chỉ vẽ được một đường sức từ, nên các đường sức từ không cắt nhau.',
            'Các đường sức từ là những đường cong khép kín (hoặc vô hạn ở hai đầu). Bên ngoài nam châm, đường sức từ đi ra ở cực Bắc và đi vào ở cực Nam.',
            'Nơi từ trường mạnh, đường sức từ được vẽ mau (sít nhau); nơi từ trường yếu, đường sức từ được vẽ thưa.',
            'Đường sức từ của từ trường đều là những đường thẳng song song, cách đều nhau.',
          ],
        },
      ],
    },
    {
      heading: 'Từ trường của dòng điện. Quy tắc nắm tay phải',
      blocks: [
        {
          type: 'p',
          text: 'Với dòng điện thẳng dài, đường sức từ là những đường tròn đồng tâm nằm trong các mặt phẳng vuông góc với dây dẫn, tâm nằm trên dây. Càng xa dây, từ trường càng yếu nên các đường tròn càng thưa.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nắm tay phải (dòng điện thẳng)',
          text: 'Giơ ngón cái của bàn tay phải hướng theo chiều dòng điện, khum bốn ngón tay kia xung quanh dây dẫn thì chiều từ cổ tay đến các ngón tay là chiều của đường sức từ.',
        },
        {
          type: 'p',
          text: 'Trên hình vẽ, dây dẫn vuông góc với mặt phẳng hình vẽ được kí hiệu ⊙ khi dòng điện hướng ra phía người đọc và ⊗ khi dòng điện hướng vào trong. Với dòng điện ⊙, đường sức từ là các đường tròn ngược chiều kim đồng hồ; với dòng điện ⊗, cùng chiều kim đồng hồ.',
        },
        {
          type: 'p',
          text: 'Ống dây (gồm nhiều vòng dây quấn sát nhau) có dòng điện chạy qua tạo ra từ trường giống từ trường của một nam châm thẳng: bên ngoài ống, đường sức từ đi ra ở một đầu (cực Bắc) và đi vào ở đầu kia (cực Nam); trong lòng ống dây dài, đường sức từ là những đường thẳng song song cách đều, từ trường ở đó là từ trường đều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nắm tay phải (vòng dây, ống dây)',
          text: 'Khum bàn tay phải sao cho chiều từ cổ tay đến các ngón tay trùng với chiều dòng điện chạy qua các vòng dây, khi đó ngón cái choãi ra chỉ chiều của đường sức từ trong lòng vòng dây hoặc ống dây.',
        },
        { type: 'widget', name: 'grip-rule' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng nhầm hai cách dùng',
          text: 'Với dây thẳng, ngón cái chỉ dòng điện và các ngón khum chỉ đường sức. Với vòng dây và ống dây thì ngược lại: các ngón khum theo dòng điện, ngón cái chỉ đường sức trong lòng ống (cũng là hướng ra cực Bắc).',
        },
      ],
    },
  ],
  explore: {
    title: 'Kim nam châm thử quanh dòng điện',
    instruction:
      'Kéo kim nam châm thử (hoặc chọn nó rồi dùng phím mũi tên) đi quanh dây dẫn và quanh ống dây, quan sát cực Bắc (đầu đỏ) xoay theo đường sức từ. Bấm "Đảo chiều dòng điện" và dự đoán trước bằng quy tắc nắm tay phải xem kim sẽ quay thế nào. Bật "Nhiều kim nam châm" để thấy từ trường trong lòng ống dây gần như đều.',
  },
  examples: [
    {
      problem:
        'Một dây dẫn thẳng dài vuông góc với mặt phẳng trang giấy, dòng điện chạy từ ngoài vào trong trang giấy (⊗). Điểm $M$ nằm ngay bên phải dây. Kim nam châm thử đặt tại $M$ có cực Bắc chỉ hướng nào?',
      steps: [
        'Giơ ngón cái tay phải hướng vào trong trang giấy (theo chiều dòng điện).',
        'Bốn ngón tay khum lại theo chiều kim đồng hồ khi nhìn từ phía người đọc: đường sức từ là những đường tròn cùng chiều kim đồng hồ quanh dây.',
        'Tại điểm $M$ ở bên phải dây, tiếp tuyến của đường tròn cùng chiều kim đồng hồ hướng xuống dưới.',
        'Kim nam châm thử nằm dọc theo đường sức, cực Bắc chỉ theo chiều đường sức.',
      ],
      answer: 'Cực Bắc của kim nam châm tại $M$ chỉ xuống dưới (về phía mép dưới trang giấy).',
    },
    {
      problem:
        'Một ống dây đặt nằm ngang. Nhìn từ đầu bên phải của ống, dòng điện trong các vòng dây chạy ngược chiều kim đồng hồ. Đầu nào của ống dây là cực Bắc?',
      steps: [
        'Khum bàn tay phải sao cho các ngón tay chỉ chiều dòng điện trong các vòng dây: ngược chiều kim đồng hồ khi nhìn từ đầu phải.',
        'Dòng điện quay ngược chiều kim đồng hồ khi nhìn từ một phía thì ngón cái chỉ về phía người nhìn, tức là hướng sang phải.',
        'Ngón cái chỉ chiều đường sức từ trong lòng ống: từ trái sang phải. Đường sức từ đi ra khỏi ống ở đầu bên phải.',
      ],
      answer: 'Đầu bên phải là cực Bắc, đầu bên trái là cực Nam.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Từ trường không tác dụng lực từ lên vật nào sau đây đặt trong nó?',
      options: [
        'Một quả cầu thuỷ tinh tích điện đứng yên',
        'Một kim nam châm',
        'Một đoạn dây dẫn có dòng điện chạy qua',
        'Một electron đang chuyển động cắt các đường sức từ',
      ],
      answer: 0,
      hints: [
        'Từ trường tác dụng lực lên nam châm, lên dòng điện và lên hạt mang điện chuyển động.',
        'Một điện tích đứng yên có tạo thành dòng điện không?',
      ],
      solution:
        'Lực từ tác dụng lên nam châm, dòng điện và hạt mang điện đang chuyển động. Điện tích đứng yên không tạo thành dòng điện nên không chịu lực từ.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây về đường sức từ là không đúng?',
      options: [
        'Hai đường sức từ có thể cắt nhau tại nơi từ trường mạnh',
        'Qua mỗi điểm trong từ trường chỉ vẽ được một đường sức từ',
        'Các đường sức từ là những đường cong khép kín',
        'Nơi từ trường mạnh, các đường sức từ được vẽ mau hơn',
      ],
      answer: 0,
      hints: ['Nếu hai đường sức cắt nhau tại một điểm thì tại đó từ trường có mấy hướng?'],
      solution:
        'Tại mỗi điểm từ trường chỉ có một hướng nên chỉ có một đường sức đi qua: các đường sức từ không bao giờ cắt nhau. Ba phát biểu còn lại đều đúng.',
    },
    {
      type: 'choice',
      prompt: 'Đường sức từ của dòng điện chạy trong dây dẫn thẳng dài có dạng',
      options: [
        'những đường tròn đồng tâm nằm trong mặt phẳng vuông góc với dây, tâm nằm trên dây',
        'những đường thẳng song song với dây dẫn',
        'những đường thẳng vuông góc với dây dẫn, đi ra từ dây',
        'những đường cong đi ra ở một đầu dây và đi vào ở đầu kia',
      ],
      answer: 0,
      hints: ['Kim nam châm thử đặt quanh dây luôn nằm theo phương tiếp tuyến của một đường gì?'],
      solution:
        'Đường sức từ của dòng điện thẳng dài là những đường tròn đồng tâm, nằm trong mặt phẳng vuông góc với dây và có tâm nằm trên dây.',
    },
    {
      type: 'choice',
      prompt:
        'Dây dẫn thẳng dài vuông góc với mặt phẳng hình vẽ, dòng điện hướng ra phía người đọc (⊙). Điểm $N$ nằm ngay phía trên dây. Cảm ứng từ $\\vec{B}$ tại $N$ hướng',
      options: ['sang trái', 'sang phải', 'lên trên', 'xuống dưới'],
      answer: 0,
      hints: [
        'Ngón cái tay phải hướng ra phía người đọc: các ngón tay khum theo chiều nào khi nhìn từ phía người đọc?',
        'Đường sức là đường tròn ngược chiều kim đồng hồ; xét tiếp tuyến tại điểm cao nhất của đường tròn.',
      ],
      solution:
        'Dòng điện ⊙ tạo đường sức là những đường tròn ngược chiều kim đồng hồ. Tại điểm cao nhất của đường tròn, đi ngược chiều kim đồng hồ là đi sang trái, nên $\\vec{B}$ tại $N$ hướng sang trái.',
    },
    {
      type: 'choice',
      prompt:
        'Nhìn vào đầu $A$ của một ống dây, thấy dòng điện trong các vòng dây chạy cùng chiều kim đồng hồ. Đầu $A$ của ống dây là',
      options: [
        'cực Nam',
        'cực Bắc',
        'không phải cực nào',
        'cực Bắc hay cực Nam tuỳ cường độ dòng điện',
      ],
      answer: 0,
      hints: [
        'Khum các ngón tay phải theo chiều dòng điện; ngón cái chỉ hướng nào so với người nhìn?',
        'Đường sức từ đi ra ở cực Bắc, đi vào ở cực Nam.',
      ],
      solution:
        'Dòng điện chạy cùng chiều kim đồng hồ khi nhìn vào đầu $A$ thì ngón cái tay phải chỉ ra xa người nhìn: đường sức từ trong lòng ống đi từ $A$ vào trong ống, tức là đi vào ở đầu $A$. Vậy $A$ là cực Nam.',
    },
    {
      type: 'multi',
      prompt: 'Từ trường đều (gần đúng) tồn tại ở những nơi nào sau đây?',
      options: [
        'Trong lòng một ống dây dài có dòng điện chạy qua',
        'Trong khoảng giữa hai cực của một nam châm chữ U',
        'Xung quanh một dây dẫn thẳng dài có dòng điện',
        'Gần một cực của nam châm thẳng',
      ],
      answers: [0, 1],
      hints: ['Từ trường đều có các đường sức là những đường thẳng song song, cách đều nhau.'],
      solution:
        'Trong lòng ống dây dài và giữa hai cực nam châm chữ U, đường sức từ gần như là những đường thẳng song song cách đều: từ trường đều. Quanh dây dẫn thẳng, đường sức là đường tròn và càng xa càng thưa; gần cực nam châm thẳng, đường sức toả ra: đều không phải từ trường đều.',
    },
    {
      type: 'choice',
      prompt:
        'Người ta quy ước hướng của từ trường tại một điểm là hướng nào của kim nam châm thử nằm cân bằng tại điểm đó?',
      options: [
        'Từ cực Nam sang cực Bắc của kim',
        'Từ cực Bắc sang cực Nam của kim',
        'Vuông góc với trục của kim',
        'Hướng Bắc địa lí, không phụ thuộc vào kim',
      ],
      answer: 0,
      hints: ['Cực Bắc của kim nam châm chỉ theo chiều đường sức từ.'],
      solution:
        'Hướng của từ trường (hướng của $\\vec{B}$) tại một điểm là hướng Nam – Bắc của kim nam châm thử nằm cân bằng tại đó, tức là từ cực Nam sang cực Bắc của kim.',
    },
    {
      type: 'choice',
      prompt:
        'Trên hình vẽ đường sức từ quanh một dây dẫn thẳng dài, khoảng cách giữa các đường tròn liên tiếp tăng dần khi ra xa dây. Điều đó cho biết',
      options: [
        'càng xa dây, từ trường càng yếu',
        'càng xa dây, từ trường càng mạnh',
        'từ trường quanh dây là từ trường đều',
        'cường độ dòng điện giảm dần dọc theo dây',
      ],
      answer: 0,
      hints: ['Nơi từ trường mạnh thì đường sức được vẽ mau hay thưa?'],
      solution:
        'Đường sức từ được vẽ thưa ở nơi từ trường yếu. Các đường tròn thưa dần khi ra xa dây nên từ trường yếu dần theo khoảng cách đến dây.',
    },
  ],
  takeaways: [
    'Từ trường là trường lực gây ra bởi dòng điện hoặc nam châm; nó tác dụng lực từ lên nam châm, dòng điện và hạt mang điện chuyển động đặt trong nó.',
    'Hướng của từ trường tại một điểm là hướng từ cực Nam sang cực Bắc của kim nam châm thử nằm cân bằng tại đó.',
    'Đường sức từ có tiếp tuyến chỉ phương của từ trường, không cắt nhau, khép kín, mau ở nơi từ trường mạnh.',
    'Dòng điện thẳng: ngón cái tay phải theo dòng điện, các ngón khum chỉ đường sức (đường tròn đồng tâm).',
    'Ống dây: các ngón khum theo dòng điện trong các vòng dây, ngón cái chỉ đường sức trong lòng ống, cũng là hướng ra cực Bắc.',
  ],
};
