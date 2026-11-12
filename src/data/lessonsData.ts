import { Lesson } from '../types';

export const allLessons: Lesson[] = [
  // --- درس ۱: پایه‌های جمله‌سازی و ترتیب واژگان ---
  {
    id: 1,
    slug: 'sentence-foundations',
    titleFa: 'پایه‌های جمله‌سازی در انگلیسی',
    titleEn: 'Sentence Foundations & Word Order',
    badge: 'شروع از صفر',
    estimatedMinutes: 6,
    mainIdea: 'در بیشتر جمله‌های ساده انگلیسی، اول می‌گوییم چه کسی کاری را انجام می‌دهد، بعد خودِ کار را و سپس چیزی را که کار روی آن انجام می‌شود. پس ترتیب پایه این است: فاعل + فعل + مفعول. با همین سه بخش می‌توانی جمله‌های زیادی بسازی.',
    persianComparison: 'در فارسی می‌گوییم «علی سیب را خورد» و فعل معمولاً در پایان می‌آید. اما در انگلیسی می‌گوییم «Ali ate an apple»؛ یعنی اول فاعل، بعد فعل و در پایان مفعول. هنگام جمله‌سازی انگلیسی جای فعل را عوض نکن.',
    formulas: {
      title: 'ترتیب استاندارد اجزای جمله در زبان انگلیسی',
      positive: 'فاعل ➜ فعل ➜ مفعول ➜ مکان ➜ زمان',
      negative: 'فاعل ➜ فعل کمکی منفی ➜ شکل ساده فعل ➜ مفعول',
      question: 'فعل کمکی ➜ فاعل ➜ شکل ساده فعل ➜ مفعول؟',
      notes: 'قید زمان معمولاً در انتهای جمله قرار می‌گیرد.',
      positiveSteps: [
        { roleFa: 'فاعل', example: 'Sara', noteFa: 'شروع از چپ' },
        { roleFa: 'فعل اصلی', example: 'reads', noteFa: 'بلافاصله بعد فاعل' },
        { roleFa: 'مفعول', example: 'books' },
        { roleFa: 'زمان', example: 'every day' }
      ],
      negativeSteps: [
        { roleFa: 'فاعل', example: 'She' },
        { roleFa: 'کمکی منفی', example: "doesn't", auxVerb: "doesn't" },
        { roleFa: 'شکل ساده فعل', example: 'eat', noteFa: 'ساده' },
        { roleFa: 'مفعول', example: 'apples' }
      ]
    },
    examples: [
      {
        en: 'Sara reads books at home every evening.',
        fa: 'سارا هر روز غروب در خانه کتاب می‌خواند.',
        breakdown: 'Sara (فاعل) + reads (فعل) + books (مفعول) + at home (مکان) + every evening (زمان)'
      },
      {
        en: 'We learn English happily.',
        fa: 'ما با خوشحالی انگلیسی یاد می‌گیریم.',
        breakdown: 'We (فاعل) + learn (فعل) + English (مفعول) + happily (حالت)'
      },
      {
        en: 'The cat drinks milk in the kitchen.',
        fa: 'گربه در آشپزخانه شیر می‌نوشد.',
        breakdown: 'The cat (فاعل) + drinks (فعل) + milk (مفعول) + in the kitchen (مکان)'
      }
    ],
    vocabulary: [
      {
        id: 'v-1',
        word: 'Subject',
        partOfSpeech: 'اسم',
        meaningFa: 'فاعل (انجام‌دهنده کار)',
        exampleEn: 'The subject usually comes first.',
        exampleFa: 'فاعل معمولا اول می‌آید.',
        category: 'گرامر پایه'
      },
      {
        id: 'v-2',
        word: 'Verb',
        partOfSpeech: 'اسم',
        meaningFa: 'فعل (کلمه نشان‌دهنده عمل یا حالت)',
        exampleEn: 'Every English sentence needs a verb.',
        exampleFa: 'هر جمله انگلیسی به یک فعل نیاز دارد.',
        category: 'گرامر پایه'
      },
      {
        id: 'v-3',
        word: 'Object',
        partOfSpeech: 'اسم',
        meaningFa: 'مفعول (چیزی یا کسی که کار رویش انجام شده)',
        exampleEn: 'Books is the object here.',
        exampleFa: 'کتاب‌ها در اینجا مفعول است.',
        category: 'گرامر پایه'
      },
      {
        id: 'v-4',
        word: 'Read',
        partOfSpeech: 'فعل',
        meaningFa: 'خواندن',
        exampleEn: 'I read every night.',
        exampleFa: 'من هر شب مطالعه می‌کنم.',
        category: 'افعال پرکاربرد'
      }
    ],
    commonMistake: {
      wrong: 'I English learn every day.',
      correct: 'I learn English every day.',
      reason: 'فارسی‌زبان‌ها به اشتباه مفعول (English) را قبل از فعل (learn) قرار می‌دهند. در انگلیسی همیشه فعل بلافاصله بعد از فاعل می‌آید.'
    },
    exercises: [
      {
        id: 'ex-1-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، فاعل مناسب را انتخاب کن تا با بقیه جمله هماهنگ شود:',
        sentenceWithBlank: '___ reads a book every night.',
        prefixText: '',
        suffixText: ' reads a book every night.',
        options: ['She', 'They', 'I', 'We'],
        correctOption: 'She',
        categoryTag: 'انتخاب فاعل',
        explanation: 'چون فعل reads دارای s سوم‌شخص است، فاعل باید مفرد غایب باشد: She.'
      },
      {
        id: 'ex-1-2',
        type: 'word_order',
        promptFa: 'کلمات را به ترتیب درست انگلیسی مرتب کن تا جمله ساخته شود:',
        meaningFa: 'علی هر روز سیب می‌خورد.',
        scrambledWords: ['Ali', 'apples', 'eats', 'every day'],
        correctSentence: 'Ali eats apples every day.',
        explanation: 'ترتیب درست: فاعل (Ali) + فعل (eats) + مفعول (apples) + قید زمان (every day).'
      },
      {
        id: 'ex-1-3',
        type: 'multiple_choice',
        promptFa: 'کدام گزینه ترتیب گرامری درست جمله در انگلیسی را دارد؟',
        questionEn: 'Choose the correct English sentence:',
        options: [
          'They football in the yard play.',
          'They play football in the yard.',
          'Football they play in the yard.',
          'Play they football in the yard.'
        ],
        correctIndex: 1,
        explanation: 'ترتیب درست: فاعل (They) + فعل (play) + مفعول (football) + مکان (in the yard).'
      },
      {
        id: 'ex-1-4',
        type: 'fill_blank',
        promptFa: 'جای خالی را با فعل مناسب کامل کن:',
        sentenceWithBlank: 'We ___ to school in the morning.',
        options: ['go', 'goes', 'going', 'went to'],
        correctOption: 'go',
        explanation: 'برای فاعل جمع We در زمان حال ساده، شکل پایه فعل (go) بدون s استفاده می‌شود.'
      }
    ],
    quickReview: [
      'ترتیب کلمات در انگلیسی: فاعل (S) + فعل (V) + مفعول (O).',
      'هیچ‌وقت فعل را مثل فارسی در آخر جمله نگذارید.',
      'قیدهای زمان (مثل every day, yesterday) معمولا در انتهای جمله می‌آیند.'
    ]
  },

  // --- درس ۲: ضمایر فاعلی و صفات ملکی ---
  {
    id: 2,
    slug: 'pronouns-and-possessives',
    titleFa: 'ضمیرهای فاعلی و صفت‌های ملکی',
    titleEn: 'Subject Pronouns & Possessive Adjectives',
    badge: 'پایه‌های هویت',
    estimatedMinutes: 5,
    mainIdea: 'گاهی به‌جای تکرار نام یک شخص یا چیز، از ضمیر فاعلی استفاده می‌کنیم. صفت ملکی هم نشان می‌دهد چیزی متعلق به چه کسی است و پیش از اسم می‌آید؛ مثل my book یعنی کتاب من.',
    persianComparison: 'در فارسی ضمیر «او» برای آقا و خانم و اشیاء یکی است؛ اما در انگلیسی: He برای مرد، She برای زن، و It برای اشیا و حیوانات است. صفت‌های ملکی فارسی چسبان هستند (کتابم، کتابت)، ولی انگلیسی جداست (My book, Your book).',
    formulas: {
      title: 'ضمایر و صفت‌های ملکی آن‌ها',
      positive: 'I → my\nyou → your\nhe → his\nshe → her\nit → its\nwe → our\nthey → their',
      negative: '',
      question: '',
      notes: 'دقت کنید: its یعنی «مال آن»، اما it\'s مخفف it is است!'
    },
    examples: [
      {
        en: 'I love my family.',
        fa: 'من خانواده‌ام را دوست دارم.',
        breakdown: 'I (فاعل) + love + my (صفت ملکی) + family (اسم)'
      },
      {
        en: 'She washes her hands.',
        fa: 'او دست‌هایش را می‌شوید.',
        breakdown: 'She (فاعل خانم) -> her (صفت ملکی خانم)'
      },
      {
        en: 'They clean their room.',
        fa: 'آن‌ها اتاقشان را تمیز می‌کنند.',
        breakdown: 'They (فاعل جمع) -> their (صفت ملکی جمع)'
      }
    ],
    vocabulary: [
      {
        id: 'v-5',
        word: 'Family',
        partOfSpeech: 'اسم',
        meaningFa: 'خانواده',
        exampleEn: 'My family is very kind.',
        exampleFa: 'خانواده من خیلی مهربان هستند.',
        category: 'خانواده'
      },
      {
        id: 'v-6',
        word: 'Friend',
        partOfSpeech: 'اسم',
        meaningFa: 'دوست',
        exampleEn: 'He is my best friend.',
        exampleFa: 'او بهترین دوست من است.',
        category: 'روابط'
      },
      {
        id: 'v-7',
        word: 'Their',
        partOfSpeech: 'صفت ملکی',
        meaningFa: 'مال آن‌ها / ...ـِشان',
        exampleEn: 'Their house is big.',
        exampleFa: 'خانه آن‌ها بزرگ است.',
        category: 'گرامر پایه'
      }
    ],
    commonMistake: {
      wrong: 'He loves she mother.',
      correct: 'He loves his mother.',
      reason: 'بعد از فعل و قبل از اسم باید صفت ملکی (his) بیاید، نه ضمیر فاعلی (she).'
    },
    exercises: [
      {
        id: 'ex-2-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، صفت ملکی مناسب برای فاعل We را مشخص کن:',
        sentenceWithBlank: 'We love ___ new teacher.',
        prefixText: 'We love ',
        suffixText: ' new teacher.',
        options: ['our', 'their', 'my', 'his', 'her'],
        correctOption: 'our',
        categoryTag: 'صفت ملکی',
        explanation: 'صفت ملکی مربوط به فاعل We کلمه our (مال ما) است.'
      },
      {
        id: 'ex-2-2',
        type: 'multiple_choice',
        promptFa: 'کدام ضمیر برای یک کتاب یا یک میز استفاده می‌شود؟',
        questionEn: 'Which pronoun replaces a single inanimate object?',
        options: ['He', 'She', 'It', 'They'],
        correctIndex: 2,
        explanation: 'برای اشیاء و مفاهیم غیرانسان مفرد، همیشه از It استفاده می‌کنیم.'
      },
      {
        id: 'ex-2-3',
        type: 'fill_blank',
        promptFa: 'جای خالی را با ضمیر مناسب پر کن:',
        sentenceWithBlank: 'Ali is happy because ___ won the game.',
        options: ['he', 'she', 'it', 'they'],
        correctOption: 'he',
        explanation: 'چون Ali آقا و مفرد است، ضمیر فاعلی مناسب he است.'
      },
      {
        id: 'ex-2-4',
        type: 'word_order',
        promptFa: 'جمله را مرتب کن:',
        meaningFa: 'این ماشین او (آقا) است.',
        scrambledWords: ['is', 'This', 'his', 'car'],
        correctSentence: 'This is his car.',
        explanation: 'ترتیب درست: This + is + his + car.'
      }
    ],
    quickReview: [
      'فاعل‌ها: I (من), You (تو/شما), He (او-آقا), She (او-خانم), It (آن-اشیا), We (ما), They (آن‌ها)',
      'صفات ملکی همیشه قبل از یک اسم می‌آیند: my car, your book, his pen.',
      'تفاوت it\'s (مخفف it is) با its (مال آن) را جدی بگیرید!'
    ]
  },

  // --- درس ۳: فعل To Be (am, is, are, was, were) ---
  {
    id: 3,
    slug: 'verb-to-be',
    titleFa: 'فعل «بودن» یا To Be و گذشته آن',
    titleEn: 'The Verb "To Be" (Present & Past)',
    badge: 'مهم‌ترین فعل انگلیسی',
    estimatedMinutes: 6,
    mainIdea: 'فعل «بودن» برای معرفی افراد و بیان شغل، ویژگی، احساس یا مکان به کار می‌رود. در زمان حال شکل‌های am، is و are را داریم و برای گذشته از was و were استفاده می‌کنیم. انتخاب شکل درست به فاعل و زمان جمله بستگی دارد.',
    persianComparison: 'معادل «هستم، هستی، است، هستیم، هستند» در فارسی حال، و «بودم، بودی، بود، بودیم، بودند» در گذشته است.',
    formulas: {
      title: 'فرمول استفاده از To Be',
      positive: 'I am + صفت / اسم / مکان\nHe / She / It is + صفت / اسم / مکان\nWe / You / They are + صفت / اسم / مکان\nI / He / She / It was + صفت / اسم / مکان\nWe / You / They were + صفت / اسم / مکان',
      negative: 'I am not + صفت / اسم / مکان\nHe / She / It is not + صفت / اسم / مکان\nWe / You / They are not + صفت / اسم / مکان\nI / He / She / It was not + صفت / اسم / مکان\nWe / You / They were not + صفت / اسم / مکان',
      question: 'Am I + صفت / اسم / مکان؟\nIs he / she / it + صفت / اسم / مکان؟\nAre we / you / they + صفت / اسم / مکان؟\nWas I / he / she / it + صفت / اسم / مکان؟\nWere we / you / they + صفت / اسم / مکان؟',
      shortAnswer: 'Yes, I am. / No, he isn\'t.'
    },
    examples: [
      {
        en: 'I am a teacher and my brother is a doctor.',
        fa: 'من معلم هستم و برادرم دکتر است.',
        breakdown: 'I + am | brother (he) + is'
      },
      {
        en: 'They were at home yesterday evening.',
        fa: 'آن‌ها دیروز عصر در خانه بودند.',
        breakdown: 'They + were (گذشته برای جمع) + at home'
      },
      {
        en: 'Is she ready for the exam?',
        fa: 'آیا او برای امتحان آماده است؟',
        breakdown: 'Is (فعل اول جمله) + she (فاعل) + ready (صفت)؟'
      }
    ],
    vocabulary: [
      {
        id: 'v-8',
        word: 'Teacher',
        partOfSpeech: 'اسم',
        meaningFa: 'معلم / آموزگار',
        exampleEn: 'Mr. Reza is an English teacher.',
        exampleFa: 'آقای رضا معلم زبان انگلیسی است.',
        category: 'مشاغل'
      },
      {
        id: 'v-9',
        word: 'Ready',
        partOfSpeech: 'صفت',
        meaningFa: 'آماده',
        exampleEn: 'Are you ready?',
        exampleFa: 'آیا آماده‌ای؟',
        category: 'صفت‌های روزمره'
      },
      {
        id: 'v-10',
        word: 'Happy',
        partOfSpeech: 'صفت',
        meaningFa: 'خوشحال / شادمان',
        exampleEn: 'She was very happy yesterday.',
        exampleFa: 'او دیروز خیلی خوشحال بود.',
        category: 'احساسات'
      }
    ],
    commonMistake: {
      wrong: 'I have 20 years old.',
      correct: 'I am 20 years old.',
      reason: 'در فارسی می‌گوییم «۲۰ سال دارم»، اما در انگلیسی برای سن از فعل to be (بودن) استفاده می‌شود: I am 20 years old.'
    },
    exercises: [
      {
        id: 'ex-3-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، شکل درست فعل To Be را در زمان حال پیدا کن:',
        sentenceWithBlank: 'I ___ very interested in learning English.',
        prefixText: 'I ',
        suffixText: ' very interested in learning English.',
        options: ['am', 'is', 'are', 'was', 'were', 'will be'],
        correctOption: 'am',
        categoryTag: 'فعل To Be',
        explanation: 'برای فاعل اول شخص مفرد I در زمان حال، همیشه شکل am به کار می‌رود.'
      },
      {
        id: 'ex-3-2',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، فعل To Be برای زمان گذشته و فاعل They را انتخاب کن:',
        sentenceWithBlank: 'They ___ at the park yesterday.',
        prefixText: 'They ',
        suffixText: ' at the park yesterday.',
        options: ['were', 'was', 'are', 'is', 'am'],
        correctOption: 'were',
        categoryTag: 'گذشته To Be',
        explanation: 'برای فاعل جمع They در زمان گذشته (yesterday) فعل were به کار می‌رود.'
      },
      {
        id: 'ex-3-3',
        type: 'multiple_choice',
        promptFa: 'چگونه جمله «She is cold» را سوالی می‌کنیم؟',
        questionEn: 'How to make "She is cold" a question?',
        options: ['Does she cold?', 'Is she cold?', 'She is cold?', 'Cold is she?'],
        correctIndex: 1,
        explanation: 'برای سوالی کردن جملات دارای to be، کافی است فعل (Is) را به ابتدای جمله ببریم.'
      },
      {
        id: 'ex-3-4',
        type: 'fill_blank',
        promptFa: 'جای خالی را کامل کن:',
        sentenceWithBlank: 'We ___ students last year, but now we are teachers.',
        options: ['were', 'was', 'are', 'is'],
        correctOption: 'were',
        categoryTag: 'زمان گذشته',
        explanation: 'عبارت last year نشان‌دهنده گذشته است و فاعل We جمع است، پس were صحیح است.'
      }
    ],
    quickReview: [
      'زمان حال: I am | he/she/it is | we/you/they are.',
      'زمان گذشته: I/he/she/it was | we/you/they were.',
      'برای منفی کردن فقط not اضافه کنید (isn\'t, aren\'t, wasn\'t, weren\'t).',
      'برای سن، احساسات و مشخصات ظاهری از to be استفاده می‌شود، نه have!'
    ]
  },

  // --- درس ۴: افعال کمکی Do / Does / Did / Have / Has / Will ---
  {
    id: 4,
    slug: 'auxiliary-verbs',
    titleFa: 'فعل‌های کمکی و نقش آن‌ها در سوال و منفی',
    titleEn: 'Auxiliary Verbs (Do, Does, Did, Have, Will)',
    badge: 'موتور محرک گرامر',
    estimatedMinutes: 6,
    mainIdea: 'فعل‌های کمکی کنار فعل اصلی می‌آیند و به ما کمک می‌کنند جمله را منفی یا پرسشی کنیم یا زمان آن را نشان دهیم. آن‌ها را مثل دستیار فعل اصلی در نظر بگیر.',
    persianComparison: 'در فارسی منفی کردن با اضافه کردن حرف «نـ» به ابتدای فعل انجام می‌شود (می‌روم -> نمی‌روم). اما در انگلیسی معمولا نمی‌توانید مستقیم not را به فعل اصلی بچسبانید؛ باید از فعل کمکی مثل don\'t / doesn\'t / didn\'t استفاده کنید!',
    formulas: {
      title: 'نقشه کاربرد و ترتیب افعال کمکی',
      positive: 'فاعل ➜ فعل کمکی ➜ شکل ساده فعل',
      negative: 'فاعل ➜ فعل کمکی منفی ➜ شکل ساده فعل',
      question: 'فعل کمکی ➜ فاعل ➜ شکل ساده فعل؟',
      shortAnswer: 'Yes, I do. / No, she doesn\'t. / Yes, he did.',
      positiveSteps: [
        { roleFa: 'فاعل', example: 'She' },
        { roleFa: 'کمکی منفی', example: "doesn't", auxVerb: "doesn't" },
        { roleFa: 'شکل ساده فعل', example: 'eat', noteFa: 'ساده بدون تغییر' },
        { roleFa: 'مفعول', example: 'meat' }
      ],
      negativeSteps: [
        { roleFa: 'فاعل', example: 'They' },
        { roleFa: 'کمکی منفی', example: "don't", auxVerb: "don't" },
        { roleFa: 'شکل ساده فعل', example: 'know', noteFa: 'ساده' },
        { roleFa: 'مفعول', example: 'the answer' }
      ],
      questionSteps: [
        { roleFa: 'کمکی اول جمله', example: 'Do / Does', auxVerb: 'do' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'شکل ساده فعل', example: 'like', noteFa: 'بدون پسوند' },
        { roleFa: 'مفعول', example: 'milk?' }
      ]
    },
    examples: [
      {
        en: 'Do you play tennis?',
        fa: 'آیا تنیس بازی می‌کنی؟',
        breakdown: 'Do (کمکی) + you (فاعل) + play (فعل اصلی ساده)'
      },
      {
        en: 'She does not eat meat.',
        fa: 'او گوشت نمی‌خورد.',
        breakdown: 'She + does not (کمکی منفی) + eat (فعل ساده)'
      },
      {
        en: 'Did you lock the door?',
        fa: 'آیا در را قفل کردی؟',
        breakdown: 'Did (کمکی گذشته) + you + lock (ساده)'
      }
    ],
    vocabulary: [
      {
        id: 'v-11',
        word: 'Help',
        partOfSpeech: 'فعل/اسم',
        meaningFa: 'کمک کردن / کمک',
        exampleEn: 'Can you help me?',
        exampleFa: 'می‌توانی کمکم کنی؟',
        category: 'افعال پرکاربرد'
      },
      {
        id: 'v-12',
        word: 'Know',
        partOfSpeech: 'فعل',
        meaningFa: 'دانستن / شناختن',
        exampleEn: 'I don\'t know the answer.',
        exampleFa: 'من جواب را نمی‌دانم.',
        category: 'افعال پرکاربرد'
      },
      {
        id: 'v-13',
        word: 'Like',
        partOfSpeech: 'فعل',
        meaningFa: 'دوست داشتن / پسندیدن',
        exampleEn: 'She likes tea.',
        exampleFa: 'او چای دوست دارد.',
        category: 'افعال پرکاربرد'
      }
    ],
    commonMistake: {
      wrong: 'Does she works here?',
      correct: 'Does she work here?',
      reason: 'وقتی does یا did وارد جمله می‌شود، s سوم‌شخص یا ed گذشته از روی فعل اصلی برداشته می‌شود و فعل به شکل ساده بازمی‌گردد!'
    },
    exercises: [
      {
        id: 'ex-4-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، فعل کمکی مناسب برای سوال منفی حال ساده با فاعل He را پیدا کن:',
        sentenceWithBlank: 'He ___ not speak Spanish.',
        prefixText: 'He ',
        suffixText: ' not speak Spanish.',
        options: ['does', 'do', 'did', 'is', 'has'],
        correctOption: 'does',
        categoryTag: 'فعل کمکی',
        explanation: 'برای سوم‌شخص مفرد (He) در حال ساده، از فعل کمکی does استفاده می‌شود.'
      },
      {
        id: 'ex-4-2',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، فعل کمکی برای سوال گذشته را انتخاب کن:',
        sentenceWithBlank: '___ you finish the test yesterday?',
        prefixText: '',
        suffixText: ' you finish the test yesterday?',
        options: ['Did', 'Do', 'Does', 'Have', 'Will'],
        correctOption: 'Did',
        categoryTag: 'کمکی گذشته',
        explanation: 'چون قید زمان yesterday گذشته است، فعل کمکی Did به کار می‌رود.'
      },
      {
        id: 'ex-4-3',
        type: 'multiple_choice',
        promptFa: 'کدام شکل جمله از نظر گرامری کاملا صحیح است؟',
        questionEn: 'Choose the grammatically correct sentence:',
        options: [
          'Did he went to school?',
          'Did he go to school?',
          'Did he goes to school?',
          'Did he going to school?'
        ],
        correctIndex: 1,
        explanation: 'همراه با Did، فعل اصلی باید ساده و بدون تغییر باشد: Did he go.'
      },
      {
        id: 'ex-4-4',
        type: 'word_order',
        promptFa: 'کلمات را مرتب کن:',
        meaningFa: 'آیا آن‌ها موسیقی دوست دارند؟',
        scrambledWords: ['Do', 'they', 'like', 'music?'],
        correctSentence: 'Do they like music?',
        explanation: 'ترتیب درست: Do (کمکی) + they (فاعل) + like (فعل) + music (مفعول)؟'
      }
    ],
    quickReview: [
      'حال ساده: do (I/you/we/they) و does (he/she/it).',
      'گذشته ساده: did برای تمام ضمایر یکسان است.',
      'قانون طلایی: وقتی does یا did بیاید، فعل اصلی حتما ساده و لخت می‌شود!'
    ]
  },

  // --- درس ۵: جملات امری و درخواست‌های محترمانه (Imperatives) ---
  {
    id: 5,
    slug: 'imperatives-and-requests',
    titleFa: 'دستورها و درخواست‌های ساده (Imperatives)',
    titleEn: 'Imperatives & Polite Requests',
    badge: 'کاربرد فوری روزمره',
    estimatedMinutes: 5,
    mainIdea: 'برای امر کردن، راهنمایی دادن، دستورالعمل یا نصیحت کردن، فاعل (You) حذف می‌شود و جمله مستقیماً با شکل ساده فعل شروع می‌شود. برای منفی کردن، ابتدای جمله Don\'t اضافه می‌کنیم.',
    persianComparison: 'معادل «بیا»، «برو»، «در را ببند» و منفی «نیا»، «نرو» در فارسی است. برای محترمانه شدن کلمه Please را اول یا آخر اضافه می‌کنیم.',
    formulas: {
      title: 'فرمول جملات امری و درخواست‌ها',
      positive: 'شکل ساده فعل ➜ مفعول (مثل: Open the door)',
      negative: 'کلمه Don\'t ➜ شکل ساده فعل ➜ مفعول (مثل: Don\'t touch that)',
      question: 'Could you + شکل ساده فعل + مفعول, please? (مثل: Could you open the door, please?)',
      notes: 'در حالت امری فاعل حذف می‌شود و جمله مستقیماً با خود فعل آغاز می‌گردد.',
      positiveSteps: [
        { roleFa: 'شکل ساده فعل', example: 'Open', noteFa: 'بدون فاعل' },
        { roleFa: 'مفعول', example: 'the door', noteFa: 'در را' }
      ],
      negativeSteps: [
        { roleFa: 'نهی کننده', example: "Don't", auxVerb: "don't", noteFa: 'نکن' },
        { roleFa: 'شکل ساده فعل', example: 'worry', noteFa: 'نگران' }
      ],
      questionSteps: [
        { roleFa: 'درخواست مودبانه', example: 'Could you', noteFa: 'ممکن است شما...' },
        { roleFa: 'فعل ساده', example: 'open', noteFa: 'باز کنید' },
        { roleFa: 'مفعول', example: 'the window, please', noteFa: 'پنجره را، لطفاً' }
      ]
    },
    examples: [
      {
        en: 'Please open the door.',
        fa: 'لطفاً در را باز کن.',
        breakdown: 'Please (لطفا) + open (شکل ساده فعل) + the door'
      },
      {
        en: 'Don\'t worry, everything is fine.',
        fa: 'نگران نباش، همه‌چیز روبه‌راه است.',
        breakdown: 'Don\'t + worry (فعل ساده)'
      },
      {
        en: 'Listen carefully to the teacher.',
        fa: 'با دقت به معلم گوش بده.',
        breakdown: 'Listen (فعل امری) + carefully (قید)'
      }
    ],
    vocabulary: [
      {
        id: 'v-14',
        word: 'Open',
        partOfSpeech: 'فعل',
        meaningFa: 'باز کردن / گشودن',
        exampleEn: 'Open your book.',
        exampleFa: 'کتابت را باز کن.',
        category: 'دستورات روزمره'
      },
      {
        id: 'v-15',
        word: 'Close',
        partOfSpeech: 'فعل',
        meaningFa: 'بستن',
        exampleEn: 'Close the door, please.',
        exampleFa: 'در را ببند، لطفاً.',
        category: 'دستورات روزمره'
      },
      {
        id: 'v-16',
        word: 'Carefully',
        partOfSpeech: 'قید',
        meaningFa: 'با دقت / محتاطانه',
        exampleEn: 'Drive carefully.',
        exampleFa: 'با دقت رانندگی کن.',
        category: 'قیود'
      }
    ],
    commonMistake: {
      wrong: 'You open the window! (به عنوان امر)',
      correct: 'Open the window!',
      reason: 'در حالت امری انگلیسی فاعل You بر زبان آورده نمی‌شود تا حس دستور مستقیم ایجاد شود.'
    },
    exercises: [
      {
        id: 'ex-5-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، کلمه مناسب برای منفی کردن جمله امری را پیدا کن:',
        sentenceWithBlank: '___ speak loudly in the library.',
        prefixText: '',
        suffixText: ' speak loudly in the library.',
        options: ['Don\'t', 'Doesn\'t', 'Didn\'t', 'Not', 'No'],
        correctOption: 'Don\'t',
        categoryTag: 'امر منفی',
        explanation: 'دستور منفی در زبان انگلیسی همیشه با Don\'t ساخته می‌شود: Don\'t speak.'
      },
      {
        id: 'ex-5-2',
        type: 'multiple_choice',
        promptFa: 'کدام جمله درخواست محترمانه درست است؟',
        questionEn: 'Choose the polite request:',
        options: [
          'Give me water.',
          'Please give me a glass of water.',
          'You must give water.',
          'Water give me please.'
        ],
        correctIndex: 1,
        explanation: 'استفاده از Please در ابتدای جمله امری باعث محترمانه شدن درخواست می‌شود.'
      },
      {
        id: 'ex-5-3',
        type: 'word_order',
        promptFa: 'کلمات را مرتب کن تا یک دستورالعمل بسازی:',
        meaningFa: 'دست‌هایت را قبل از ناهار بشوی.',
        scrambledWords: ['Wash', 'your', 'hands', 'before lunch.'],
        correctSentence: 'Wash your hands before lunch.',
        explanation: 'ترتیب درست: Wash + your hands + before lunch.'
      },
      {
        id: 'ex-5-4',
        type: 'fill_blank',
        promptFa: 'جای خالی را کامل کن:',
        sentenceWithBlank: '___ quiet! The baby is sleeping.',
        options: ['Be', 'Are', 'Is', 'Being'],
        correctOption: 'Be',
        explanation: 'شکل ساده فعل to be برای حالت امری کلمه Be است: Be quiet!'
      }
    ],
    quickReview: [
      'جمله امری مثبت: شکل ساده فعل بدون فاعل (Go!, Come here!).',
      'جمله امری منفی: Don\'t + شکل ساده فعل (Don\'t give up!).',
      'افزودن Please لحن شما را از دستوری به محترمانه تبدیل می‌کند.'
    ]
  },

  // --- درس ۶: ساختار مجهول (Passive Voice) ---
  {
    id: 6,
    slug: 'passive-voice',
    titleFa: 'ساختار مجهول و کاربردهای طبیعی آن',
    titleEn: 'Passive Voice (Natural Usage)',
    badge: 'ساختار پیشرفته اما ساده',
    estimatedMinutes: 6,
    mainIdea: 'در جمله معلوم، توجه روی کسی است که کار را انجام می‌دهد. در جمله مجهول، توجه بیشتر روی کاری است که انجام شده یا چیزی است که کار روی آن انجام شده؛ حتی اگر انجام‌دهنده را ندانیم. برای ساخت مجهول از شکل مناسب فعل «بودن» و شکل سوم فعل اصلی استفاده می‌کنیم.',
    persianComparison: 'معلوم: «آشپز غذا را می‌پزد». مجهول: «غذا پخته می‌شود». در فارسی هم مفعول به ابتدای جمله می‌آید و فعل با «شدن» ترکیب می‌شود.',
    formulas: {
      title: 'فرمول جمله مجهول',
      positive: 'مفعول + am / is / are / was / were + شکل سوم فعل (+ by + انجام‌دهنده)',
      negative: 'مفعول + am / is / are / was / were + not + شکل سوم فعل',
      question: 'Am / Is / Are / Was / Were + مفعول + شکل سوم فعل؟',
      notes: 'اگر بخواهیم انجام‌دهنده را ذکر کنیم، از کلمه by در انتهای جمله استفاده می‌کنیم: by the chef.'
    },
    examples: [
      {
        en: 'The food is cooked by the chef.',
        fa: 'غذا توسط سرآشپز پخته می‌شود.',
        breakdown: 'The food (مفعول) + is (فعل be حال) + cooked (شکل سوم) + by the chef'
      },
      {
        en: 'English is spoken all over the world.',
        fa: 'انگلیسی در سراسر جهان صحبت می‌شود.',
        breakdown: 'English + is + spoken (شکل سوم speak)'
      },
      {
        en: 'The car was repaired yesterday.',
        fa: 'ماشین دیروز تعمیر شد.',
        breakdown: 'The car + was (گذشته be) + repaired (شکل سوم تعمیر)'
      }
    ],
    vocabulary: [
      {
        id: 'v-17',
        word: 'Cook',
        partOfSpeech: 'فعل/اسم',
        meaningFa: 'پختن / آشپز',
        exampleEn: 'She cooks dinner every night.',
        exampleFa: 'او هر شب شام می‌پزد.',
        category: 'غذا و خانه'
      },
      {
        id: 'v-18',
        word: 'Build',
        partOfSpeech: 'فعل',
        meaningFa: 'ساختن / بنا کردن',
        exampleEn: 'This house was built in 1990.',
        exampleFa: 'این خانه در سال ۱۹۹۰ ساخته شد.',
        category: 'افعال پرکاربرد'
      },
      {
        id: 'v-19',
        word: 'Speak',
        partOfSpeech: 'فعل',
        meaningFa: 'صحبت کردن / سخن گفتن',
        exampleEn: 'Do you speak English?',
        exampleFa: 'آیا انگلیسی صحبت می‌کنی؟',
        category: 'افعال پرکاربرد'
      }
    ],
    commonMistake: {
      wrong: 'The window broke by the wind. (برای مجهول)',
      correct: 'The window was broken by the wind.',
      reason: 'در جمله مجهول حتما باید یکی از اشکال فعل be (در اینجا was) همراه با شکل سوم فعل بیاید.'
    },
    exercises: [
      {
        id: 'ex-6-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، شکل فعل be را برای مجهول حال مفرد انتخاب کن:',
        sentenceWithBlank: 'This delicious bread ___ baked every morning.',
        prefixText: 'This delicious bread ',
        suffixText: ' baked every morning.',
        options: ['is', 'are', 'was', 'were', 'has'],
        correctOption: 'is',
        categoryTag: 'مجهول زمان حال',
        explanation: 'نان (bread) مفرد غیرقابل‌شمارش است و زمان جمله حال است (every morning)، پس is baked درست است.'
      },
      {
        id: 'ex-6-2',
        type: 'multiple_choice',
        promptFa: 'کدام گزینه معادل مجهول جمله «Ali repaired the bicycle yesterday» است؟',
        questionEn: 'Passive of "Ali repaired the bicycle yesterday":',
        options: [
          'The bicycle was repaired by Ali yesterday.',
          'The bicycle is repaired by Ali yesterday.',
          'Ali was repaired the bicycle.',
          'The bicycle repaired Ali yesterday.'
        ],
        correctIndex: 0,
        explanation: 'چون جمله گذشته است، فرمول مجهول was + repaired است: The bicycle was repaired by Ali yesterday.'
      },
      {
        id: 'ex-6-3',
        type: 'fill_blank',
        promptFa: 'جای خالی را با شکل سوم فعل کامل کن:',
        sentenceWithBlank: 'The letter was ___ yesterday afternoon.',
        options: ['sent', 'send', 'sends', 'sending'],
        correctOption: 'sent',
        explanation: 'بعد از was در ساختار مجهول، شکل سوم فعل (sent) به کار می‌رود.'
      },
      {
        id: 'ex-6-4',
        type: 'word_order',
        promptFa: 'جمله مجهول را مرتب کن:',
        meaningFa: 'این تلفن در ژاپن ساخته شد.',
        scrambledWords: ['This phone', 'was made', 'in Japan.'],
        correctSentence: 'This phone was made in Japan.',
        explanation: 'ترتیب درست: This phone + was made + in Japan.'
      }
    ],
    quickReview: [
      'هسته مجهول: شکل فعل be + شکل سوم فعل (P.P).',
      'فعل be با زمان جمله و مفرد/جمع بودن مفعول تغییر می‌کند (is, are, was, were).',
      'تنها زمانی از مجهول استفاده کنید که مفعول یا عمل مهم‌تر از کننده کار باشد.'
    ]
  },

  // --- درس ۷: کلمات پرسشی (Wh- Questions) ---
  {
    id: 7,
    slug: 'question-words',
    titleFa: 'کلمات پرسشی: What, Where, When, Who, Why, How',
    titleEn: 'Wh- Question Words',
    badge: 'کلیدهای مکالمه',
    estimatedMinutes: 5,
    mainIdea: 'وقتی پاسخ دقیق‌تری از بله یا خیر می‌خواهیم، از کلمه‌های پرسشی استفاده می‌کنیم: what برای چه چیزی، where برای کجا، when برای چه زمانی، who برای چه کسی، why برای چرا و how برای چگونه.',
    persianComparison: 'در فارسی کلمه پرسشی می‌تواند هر کجای جمله بیاید («کجا رفتی؟» یا «رفتی کجا؟»). اما در انگلیسی کلمه پرسشی تقریباً همیشه در ابتدای جمله قرار می‌گیرد.',
    formulas: {
      title: 'فرمول سوالات Wh',
      positive: 'کلمه پرسشی + فعل کمکی + فاعل + فعل اصلی؟',
      negative: 'Why didn\'t you tell me?',
      question: 'Where do you live? / What is your name?',
      notes: 'اگر کلمه پرسشی خودش فاعل جمله باشد، فعل کمکی نمی‌خواهد: Who called you?'
    },
    examples: [
      {
        en: 'Where do you live?',
        fa: 'کجا زندگی می‌کنی؟',
        breakdown: 'Where (کجا) + do (کمکی) + you (فاعل) + live (فعل اصلی)'
      },
      {
        en: 'Why are you learning English?',
        fa: 'چرا داری انگلیسی یاد می‌گیری؟',
        breakdown: 'Why (چرا) + are (کمکی) + you (فاعل) + learning (فعل)'
      },
      {
        en: 'When does the train arrive?',
        fa: 'قطار چه ساعتی (چه زمانی) می‌رسد؟',
        breakdown: 'When (چه وقت) + does (کمکی) + the train (فاعل) + arrive (رسیدن)'
      }
    ],
    vocabulary: [
      {
        id: 'v-20',
        word: 'Where',
        partOfSpeech: 'کلمه پرسشی',
        meaningFa: 'کجا / به چه مکانی',
        exampleEn: 'Where is the library?',
        exampleFa: 'کتابخانه کجاست؟',
        category: 'پرسش‌ها'
      },
      {
        id: 'v-21',
        word: 'When',
        partOfSpeech: 'کلمه پرسشی',
        meaningFa: 'کِی / چه زمانی',
        exampleEn: 'When is your birthday?',
        exampleFa: 'تولدت کِی است؟',
        category: 'پرسش‌ها'
      },
      {
        id: 'v-22',
        word: 'Why',
        partOfSpeech: 'کلمه پرسشی',
        meaningFa: 'چرا / به چه دلیل',
        exampleEn: 'Why are you happy?',
        exampleFa: 'چرا خوشحالی؟',
        category: 'پرسش‌ها'
      }
    ],
    commonMistake: {
      wrong: 'Where you are going?',
      correct: 'Where are you going?',
      reason: 'در سوال انگلیسی بعد از کلمه پرسشی، باید فعل کمکی (are) قبل از فاعل (you) بیاید.'
    },
    exercises: [
      {
        id: 'ex-7-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، کلمه پرسشی مناسب برای سوال درباره مکان را پیدا کن:',
        sentenceWithBlank: '___ is your school located?',
        prefixText: '',
        suffixText: ' is your school located?',
        options: ['Where', 'What', 'When', 'Who', 'Why', 'How'],
        correctOption: 'Where',
        categoryTag: 'کلمات پرسشی',
        explanation: 'برای پرسیدن مکان مدرسه از Where (کجا) استفاده می‌کنیم.'
      },
      {
        id: 'ex-7-2',
        type: 'multiple_choice',
        promptFa: 'اگر بخواهیم دلیل کاری را بپرسیم از کدام کلمه استفاده می‌کنیم؟',
        questionEn: 'Which word asks for a reason?',
        options: ['When', 'Where', 'Why', 'Who'],
        correctIndex: 2,
        explanation: 'کلمه Why برای پرسیدن علت و دلیل (چرا) استفاده می‌شود و با Because پاسخ داده می‌شود.'
      },
      {
        id: 'ex-7-3',
        type: 'word_order',
        promptFa: 'کلمات را مرتب کن:',
        meaningFa: 'اسم تو چیست؟',
        scrambledWords: ['is', 'What', 'name?', 'your'],
        correctSentence: 'What is your name?',
        explanation: 'ترتیب درست: What + is + your name?'
      },
      {
        id: 'ex-7-4',
        type: 'fill_blank',
        promptFa: 'جای خالی را کامل کن:',
        sentenceWithBlank: '___ is knocking on the door? - It\'s Sara.',
        options: ['Who', 'What', 'Where', 'Why'],
        correctOption: 'Who',
        explanation: 'چون پاسخ یک شخص (سارا) است، کلمه پرسشی مناسب Who (چه کسی) است.'
      }
    ],
    quickReview: [
      'What (چه چیزی), Where (کجا), When (چه وقت), Who (چه کسی), Why (چرا), How (چگونه).',
      'ترتیب سوال: کلمه پرسشی + فعل کمکی + فاعل + فعل اصلی.',
      'پاسخ سوالات Wh توضیح کامل است، نه فقط Yes یا No.'
    ]
  },

  // --- درس ۸: حروف تعریف a / an / the ---
  {
    id: 8,
    slug: 'articles-a-an-the',
    titleFa: 'حروف تعریف: a, an و the',
    titleEn: 'Articles: A, An & The',
    badge: 'جزییات تاثیرگذار',
    estimatedMinutes: 5,
    mainIdea: 'برای اسم مفردی که برای مخاطب مشخص نیست، معمولاً از a یا an استفاده می‌کنیم. معمولاً پیش از حرف‌های بی‌صدا a و پیش از a، e، i، o یا u از an استفاده می‌کنیم. برای چیز مشخص و شناخته‌شده از the استفاده می‌کنیم.',
    persianComparison: 'در فارسی نشانه نکره «یک کتاب» یا «کتابی» است. نشانه معرفه (the) در فارسی کلماتی مثل «اون کتابه» یا آوردن «را» است: «کتاب را بده» یعنی همان کتاب مشخص.',
    formulas: {
      title: 'قانون انتخاب حرف تعریف',
      positive: 'a + اسم مفرد با آغاز بی‌صدا (a cat)\nan + اسم مفرد با آغاز صدادار (an apple / an hour)\nthe + اسم مشخص و شناخته‌شده',
      negative: '',
      question: '',
      notes: 'برای شروع، به حرف اول کلمه نگاه کن. چند استثنا وجود دارد که در درس‌های بعدی یاد می‌گیری.'
    },
    examples: [
      {
        en: 'I saw a dog. The dog was very friendly.',
        fa: 'یک سگ دیدم. سگه (آن سگ مشخص) خیلی مهربان بود.',
        breakdown: 'دفعه اول ناشناس است (a dog)، دفعه دوم چون شناخته شده است از the استفاده می‌شود.'
      },
      {
        en: 'She wants an apple and a sandwich.',
        fa: 'او یک سیب و یک ساندویچ می‌خواهد.',
        breakdown: 'an apple (با حرف a) | a sandwich (با حرف s)'
      },
      {
        en: 'Look at the moon tonight!',
        fa: 'امشب به ماه نگاه کن!',
        breakdown: 'چون در جهان فقط یک ماه داریم، همیشه the moon است.'
      }
    ],
    vocabulary: [
      {
        id: 'v-23',
        word: 'Apple',
        partOfSpeech: 'اسم',
        meaningFa: 'سیب',
        exampleEn: 'An apple a day keeps the doctor away.',
        exampleFa: 'خوردن یک سیب در روز، دکتر را دور نگه می‌دارد.',
        category: 'میوه‌ها'
      },
      {
        id: 'v-24',
        word: 'Book',
        partOfSpeech: 'اسم',
        meaningFa: 'کتاب',
        exampleEn: 'I bought a new book.',
        exampleFa: 'من یک کتاب نو خریدم.',
        category: 'آموزش'
      },
      {
        id: 'v-25',
        word: 'World',
        partOfSpeech: 'اسم',
        meaningFa: 'دنیا / جهان',
        exampleEn: 'The world is beautiful.',
        exampleFa: 'جهان زیباست.',
        category: 'عمومی'
      }
    ],
    commonMistake: {
      wrong: 'I ate a orange.',
      correct: 'I ate an orange.',
      reason: 'کلمه orange با حرف صدادار شروع می‌شود، بنابراین باید از an استفاده کرد.'
    },
    exercises: [
      {
        id: 'ex-8-1',
        type: 'wheel',
        promptFa: 'با چرخ انتخاب، حرف تعریف مناسب برای کلمه umbrella را پیدا کن:',
        sentenceWithBlank: 'Take ___ umbrella; it might rain.',
        prefixText: 'Take ',
        suffixText: ' umbrella; it might rain.',
        options: ['an', 'a', 'the', 'some'],
        correctOption: 'an',
        categoryTag: 'حرف تعریف',
        explanation: 'umbrella با حرف u شروع می‌شود، پس an umbrella درست است.'
      },
      {
        id: 'ex-8-2',
        type: 'multiple_choice',
        promptFa: 'کدام گزینه درباره پدیده‌های منحصر‌به‌فرد (مانند خورشید یا آسمان) به کار می‌رود؟',
        questionEn: 'Which article is used for unique objects like the sun?',
        options: ['a', 'an', 'the', 'no article'],
        correctIndex: 2,
        explanation: 'برای پدیده‌های تک و یکتا در دنیا همواره از the استفاده می‌شود: the sun, the sky.'
      },
      {
        id: 'ex-8-3',
        type: 'fill_blank',
        promptFa: 'جای خالی را کامل کن:',
        sentenceWithBlank: 'He is ___ honest person.',
        options: ['an', 'a', 'the', 'one'],
        correctOption: 'an',
        explanation: 'در این عبارت an پیش از honest آمده است: an honest person.'
      },
      {
        id: 'ex-8-4',
        type: 'word_order',
        promptFa: 'کلمات را مرتب کن:',
        meaningFa: 'در را لطفا باز کن.',
        scrambledWords: ['Open', 'the door,', 'please.'],
        correctSentence: 'Open the door, please.',
        explanation: 'ترتیب درست: Open + the door, + please.'
      }
    ],
    quickReview: [
      'a برای اسم‌های مفرد با شروع صدای صامت (a boy, a table).',
      'an برای اسم‌های مفرد با شروع صدای مصوت (an egg, an hour).',
      'the برای اشیای مشخص و شناخته‌شده یا منحصر‌به‌فرد در جهان (the sun).'
    ]
  }
];
