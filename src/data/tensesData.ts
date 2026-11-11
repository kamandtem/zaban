import { FormulaStep } from '../components/FormulaVisualizer';

export type TenseCategory = 'present' | 'past' | 'future';

export interface TenseQuizItem {
  id: string;
  type: 'formula' | 'sentence';
  questionFa: string;
  questionEn?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DetailedTenseInfo {
  id: string;
  category: TenseCategory;
  nameFa: string;
  shortConcept: string;
  description: string;
  badgeColor: string; // for the new card style matching screenshot
  iconType: 'chat' | 'image' | 'voice' | 'file';
  formulaSteps: {
    positive: FormulaStep[];
    negative: FormulaStep[];
    question: FormulaStep[];
  };
  persianComparison: string;
  timeMarkers: { en: string; fa: string }[];
  examples: {
    en: string;
    fa: string;
  }[];
  quizzes: TenseQuizItem[];
}

export const allTensesData: DetailedTenseInfo[] = [
  // 1. حال ساده
  {
    id: 'present-simple',
    category: 'present',
    nameFa: 'حال ساده',
    shortConcept: 'کارهای همیشگی، عادت‌های روزانه و حقایق',
    description: 'برای کارهایی که به طور روزمره یا همیشگی تکرار می‌شوند؛ مثل مسواک زدن، رفتن به مدرسه، یا آب نوشیدن.',
    badgeColor: 'bg-pink-500 text-white',
    iconType: 'chat',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I / You / We', noteFa: 'شروع از چپ' },
        { roleFa: 'شکل ساده فعل', example: 'eat / drink', noteFa: 'برای he/she کلمه s می‌گیرد' },
        { roleFa: 'مفعول یا بقیه جمله', example: 'an apple' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'She' },
        { roleFa: 'فعل کمکی منفی', example: "doesn't", auxVerb: "doesn't" },
        { roleFa: 'شکل ساده فعل', example: 'eat', noteFa: 'بدون s' },
        { roleFa: 'مفعول', example: 'apples' }
      ],
      question: [
        { roleFa: 'فعل کمکی اول', example: 'Do / Does', auxVerb: 'do' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'شکل ساده فعل', example: 'like', noteFa: 'ساده و لخت' },
        { roleFa: 'مفعول', example: 'milk?' }
      ]
    },
    persianComparison: 'در فارسی می‌گوییم «من هر روز سیب می‌خورم». در انگلیسی هم اول فاعل می‌آید و بلافاصله فعل قرار می‌گیرد.',
    timeMarkers: [
      { en: 'every day', fa: 'هر روز' },
      { en: 'always', fa: 'همیشه' },
      { en: 'usually', fa: 'معمولاً' },
      { en: 'often', fa: 'اغلب' }
    ],
    examples: [
      { en: 'I drink milk every day.', fa: 'من هر روز شیر می‌نوشم.' },
      { en: 'She eats an apple in the morning.', fa: 'او صبح‌ها یک سیب می‌خورد.' },
      { en: 'We go to school by bus.', fa: 'ما با اتوبوس به مدرسه می‌رویم.' }
    ],
    quizzes: [
      {
        id: 'qz-ps-1',
        type: 'formula',
        questionFa: 'در زمان حال ساده برای فاعل She، چه تغییری در فعل اصلی ایجاد می‌شود؟',
        options: [
          'به انتهای فعل s یا es اضافه می‌شود',
          'فعل به گذشته تبدیل می‌شود (ed می‌گیرد)',
          'قبل از فعل am/is می‌آید',
          'هیچ تغییری نمی‌کند'
        ],
        correctIndex: 0,
        explanation: 'قانون طلایی: برای سوم‌شخص‌های مفرد (He, She, It) در حال ساده، به فعل پسوند s یا es اضافه می‌شود: She eats.'
      },
      {
        id: 'qz-ps-2',
        type: 'sentence',
        questionFa: 'کدام کلمه جای خالی را در این جمله عادتی درست کامل می‌کند؟',
        questionEn: 'Ali ___ football every Friday.',
        options: ['plays', 'play', 'is playing', 'played'],
        correctIndex: 0,
        explanation: 'فاعل Ali سوم‌شخص مفرد است و قید every Friday عادت همیشگی را نشان می‌دهد، پس plays صحیح است.'
      }
    ]
  },

  // 2. حال استمراری
  {
    id: 'present-continuous',
    category: 'present',
    nameFa: 'حال استمراری',
    shortConcept: 'کاری که همین الان در حال انجام است',
    description: 'وقتی کاری دقیقاً جلوی چشم ما یا در همین لحظه در جریان است و هنوز تمام نشده است.',
    badgeColor: 'bg-emerald-500 text-white',
    iconType: 'image',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'فعل کمکی بودن', example: 'am', auxVerb: 'am' },
        { roleFa: 'فعل با ing', example: 'reading', noteFa: 'نشانه استمرار' },
        { roleFa: 'مفعول', example: 'a book now' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'He' },
        { roleFa: 'کمکی منفی', example: "isn't", auxVerb: "isn't" },
        { roleFa: 'فعل با ing', example: 'sleeping' }
      ],
      question: [
        { roleFa: 'کمکی در اول', example: 'Are', auxVerb: 'are' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'فعل با ing', example: 'coming?' }
      ]
    },
    persianComparison: 'معادل مستقیم «دارم می‌خوانم»، «داری می‌روی» در فارسی است.',
    timeMarkers: [
      { en: 'now', fa: 'الان' },
      { en: 'right now', fa: 'همین الان' },
      { en: 'at the moment', fa: 'در حال حاضر' }
    ],
    examples: [
      { en: 'I am eating breakfast now.', fa: 'من الان دارم صبحانه می‌خورم.' },
      { en: 'Look! The cat is sleeping.', fa: 'نگاه کن! گربه دارد می‌خوابد.' },
      { en: 'They are playing football.', fa: 'آن‌ها دارند فوتبال بازی می‌کنند.' }
    ],
    quizzes: [
      {
        id: 'qz-pc-1',
        type: 'formula',
        questionFa: 'فرمول حال استمراری شامل چه قطعاتی است؟',
        options: [
          'فاعل + am/is/are + فعل با ing',
          'فاعل + شکل ساده فعل + ed',
          'فاعل + have/has + شکل سوم فعل',
          'فاعل + will + شکل ساده فعل'
        ],
        correctIndex: 0,
        explanation: 'حال استمراری همیشه دو نشانه دارد: فعل کمکی بودن (am/is/are) و پسوند ing روی فعل اصلی.'
      },
      {
        id: 'qz-pc-2',
        type: 'sentence',
        questionFa: 'جای خالی را برای کاری که همین الان در حال وقوع است کامل کن:',
        questionEn: 'Listen! Sara ___ the piano.',
        options: ['is playing', 'plays', 'played', 'will play'],
        correctIndex: 0,
        explanation: 'کلمه Listen! (گوش کن!) نشان می‌دهد عمل در همین لحظه جریان دارد، پس is playing درست است.'
      }
    ]
  },

  // 3. حال کامل (ماضی نقلی)
  {
    id: 'present-perfect',
    category: 'present',
    nameFa: 'حال کامل (ماضی نقلی)',
    shortConcept: 'کاری در گذشته که اثرش تا الان باقی است یا تجربه شده',
    description: 'کاری در گذشته انجام شده اما زمان دقیق آن مطرح نیست؛ بلکه اثر کار تا این لحظه باقی مانده است.',
    badgeColor: 'bg-sky-500 text-white',
    iconType: 'file',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I / We' },
        { roleFa: 'فعل کمکی', example: 'have', auxVerb: 'have' },
        { roleFa: 'قسمت سوم فعل', example: 'eaten / seen', noteFa: 'شکل سوم (P.P)' },
        { roleFa: 'مفعول', example: 'lunch' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'He' },
        { roleFa: 'کمکی منفی', example: "hasn't", auxVerb: "hasn't" },
        { roleFa: 'قسمت سوم فعل', example: 'seen', noteFa: 'شکل سوم see' },
        { roleFa: 'مفعول', example: 'this film yet' }
      ],
      question: [
        { roleFa: 'کمکی در اول', example: 'Have', auxVerb: 'have' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'قسمت سوم فعل', example: 'cleaned', noteFa: 'شکل سوم clean' },
        { roleFa: 'مفعول', example: 'your room?' }
      ]
    },
    persianComparison: 'در فارسی معمولاً با «خورده‌ام»، «دیده‌ام»، «رفته است» ترجمه می‌شود.',
    timeMarkers: [
      { en: 'already', fa: 'از قبل' },
      { en: 'yet', fa: 'هنوز (در منفی و سوال)' },
      { en: 'just', fa: 'همین الان / تازه' }
    ],
    examples: [
      { en: 'I have eaten my food.', fa: 'من غذایم را خورده‌ام (سیر هستم).' },
      { en: 'She has lost her pen.', fa: 'او خودکارش را گم کرده است (هنوز پیدایش نکرده).' },
      { en: 'We have seen this cartoon.', fa: 'ما این کارتون را دیده‌ایم.' }
    ],
    quizzes: [
      {
        id: 'qz-pp-1',
        type: 'formula',
        questionFa: 'بعد از فعل‌های کمکی have و has، فعل اصلی به چه شکلی درمی‌آید؟',
        options: [
          'قسمت سوم فعل (Past Participle)',
          'شکل ساده فعل بدون تغییر',
          'فعل با پسوند ing',
          'همیشه شکل گذشته با ed'
        ],
        correctIndex: 0,
        explanation: 'قانون: بعد از have یا has همیشه شکل سوم فعل (قسمت سوم) می‌آید، مثل have eaten یا has seen.'
      },
      {
        id: 'qz-pp-2',
        type: 'sentence',
        questionFa: 'جای خالی را با ساختار درست حال کامل پر کن:',
        questionEn: 'He ___ his room already.',
        options: ['has cleaned', 'cleaned', 'is cleaning', 'clean'],
        correctIndex: 0,
        explanation: 'با قید already و فاعل He، ساختار has + cleaned صحیح است.'
      }
    ]
  },

  // 4. حال کامل استمراری
  {
    id: 'present-perfect-continuous',
    category: 'present',
    nameFa: 'حال کامل استمراری',
    shortConcept: 'کاری از گذشته تا الان با تاکید بر مدت زمان',
    description: 'برای کارهایی که از قبل شروع شده و تا همین لحظه بی‌وقفه ادامه داشته است.',
    badgeColor: 'bg-orange-500 text-white',
    iconType: 'voice',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'کمکی کامل', example: 'have', auxVerb: 'have' },
        { roleFa: 'کلمه been', example: 'been', noteFa: 'ثابت' },
        { roleFa: 'فعل با ing', example: 'waiting', noteFa: 'استمرار' },
        { roleFa: 'مدت زمان', example: 'for 1 hour' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'She' },
        { roleFa: 'کمکی منفی', example: "hasn't", auxVerb: "hasn't" },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'sleeping' }
      ],
      question: [
        { roleFa: 'کمکی در اول', example: 'Have', auxVerb: 'have' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'working?' }
      ]
    },
    persianComparison: 'معادل «یک ساعته که دارم می‌خوانم» در زبان فارسی روزمره.',
    timeMarkers: [
      { en: 'for 2 hours', fa: 'به مدت ۲ ساعت' },
      { en: 'since morning', fa: 'از صبح' }
    ],
    examples: [
      { en: 'I have been studying for two hours.', fa: 'دو ساعت است که دارم درس می‌خوانم.' },
      { en: 'It has been raining all morning.', fa: 'تمام صبح باران می‌باریده است.' }
    ],
    quizzes: [
      {
        id: 'qz-ppc-1',
        type: 'formula',
        questionFa: 'کدام کلمه کلیدی در ساختار حال کامل استمراری بعد از have/has می‌آید؟',
        options: ['been', 'be', 'being', 'was'],
        correctIndex: 0,
        explanation: 'فرمول این زمان have/has + been + فعل با ing است.'
      }
    ]
  },

  // 5. گذشته ساده
  {
    id: 'past-simple',
    category: 'past',
    nameFa: 'گذشته ساده',
    shortConcept: 'کاری که در گذشته در یک زمان مشخص به پایان رسید',
    description: 'برای کارهایی که در گذشته شروع شدند و در همان گذشته تمام شدند؛ مثل «دیروز به پارک رفتم».',
    badgeColor: 'bg-pink-500 text-white',
    iconType: 'chat',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I / Ali' },
        { roleFa: 'فعل گذشته', example: 'played / went', noteFa: 'با ed یا بی‌قاعده' },
        { roleFa: 'مفعول و زمان', example: 'football yesterday' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'We' },
        { roleFa: 'کمکی منفی گذشته', example: "didn't", auxVerb: "didn't" },
        { roleFa: 'شکل ساده فعل', example: 'go', noteFa: 'فعل ساده می‌شود' },
        { roleFa: 'مکان', example: 'to school' }
      ],
      question: [
        { roleFa: 'کمکی گذشته', example: 'Did', auxVerb: 'did' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'شکل ساده فعل', example: 'see', noteFa: 'ساده' },
        { roleFa: 'مفعول', example: 'him yesterday?' }
      ]
    },
    persianComparison: 'معادل «رفتم، خوردم، دیدی» در زبان فارسی.',
    timeMarkers: [
      { en: 'yesterday', fa: 'دیروز' },
      { en: 'last night', fa: 'دیشب' },
      { en: 'two days ago', fa: 'دو روز پیش' }
    ],
    examples: [
      { en: 'I watched a film yesterday.', fa: 'من دیروز یک فیلم تماشا کردم.' },
      { en: 'She did not eat cake.', fa: 'او کیک نخورد.' },
      { en: 'Did you drink water?', fa: 'آیا آب نوشیدی؟' }
    ],
    quizzes: [
      {
        id: 'qz-past-1',
        type: 'formula',
        questionFa: 'در جمله منفی گذشته، بعد از didn\'t چه شکلی از فعل اصلی می‌آید؟',
        options: [
          'شکل ساده فعل (بدون ed)',
          'شکل گذشته فعل با ed',
          'فعل با پسوند ing',
          'قسمت سوم فعل'
        ],
        correctIndex: 0,
        explanation: 'با ورود didn\'t بار گذشته بودن برداشته می‌شود و فعل اصلی ساده می‌شود: didn\'t go.'
      },
      {
        id: 'qz-past-2',
        type: 'sentence',
        questionFa: 'جای خالی را با فعل گذشته درست پر کن:',
        questionEn: 'They ___ to the park yesterday.',
        options: ['went', 'go', 'goes', 'going'],
        correctIndex: 0,
        explanation: 'دیروز (yesterday) نشانه گذشته ساده است و گذشته go کلمه went است.'
      }
    ]
  },

  // 6. گذشته استمراری
  {
    id: 'past-continuous',
    category: 'past',
    nameFa: 'گذشته استمراری',
    shortConcept: 'کاری که در یک زمان مشخص در گذشته در حال رخ دادن بود',
    description: 'برای کارهایی که در گذشته مدتی در جریان بودند، مثلاً «دیروز ساعت ۸ داشتم شام می‌خوردم».',
    badgeColor: 'bg-emerald-500 text-white',
    iconType: 'image',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I / He' },
        { roleFa: 'کمکی گذشته بودن', example: 'was', auxVerb: 'was' },
        { roleFa: 'فعل با ing', example: 'eating' },
        { roleFa: 'مفعول و زمان', example: 'dinner at 8 PM' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'They' },
        { roleFa: 'کمکی منفی گذشته', example: "weren't", auxVerb: "weren't" },
        { roleFa: 'فعل با ing', example: 'sleeping' }
      ],
      question: [
        { roleFa: 'کمکی اول', example: 'Were', auxVerb: 'were' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'فعل با ing', example: 'reading?' }
      ]
    },
    persianComparison: 'معادل «داشتم می‌رفتم»، «داشتند بازی می‌کردند» در فارسی.',
    timeMarkers: [
      { en: 'at 8 PM yesterday', fa: 'دیروز ساعت ۸' },
      { en: 'while', fa: 'در حالی که' }
    ],
    examples: [
      { en: 'I was sleeping when you called.', fa: 'وقتی زنگ زدی، داشتم می‌خوابیدم.' },
      { en: 'They were studying at 9 PM.', fa: 'آن‌ها ساعت ۹ شب داشتند درس می‌خواندند.' }
    ],
    quizzes: [
      {
        id: 'qz-past-c-1',
        type: 'formula',
        questionFa: 'در گذشته استمراری برای فاعل‌های جمع (مثل We یا They) از کدام فعل کمکی استفاده می‌شود؟',
        options: ['were', 'was', 'are', 'had'],
        correctIndex: 0,
        explanation: 'برای جمع در گذشته از were و برای مفرد از was استفاده می‌شود: They were playing.'
      }
    ]
  },

  // 7. گذشته کامل (ماضی بعید)
  {
    id: 'past-perfect',
    category: 'past',
    nameFa: 'گذشته کامل (ماضی بعید)',
    shortConcept: 'کاری که قبل از یک کار دیگر در گذشته تمام شده بود',
    description: 'وقتی دو کار در گذشته اتفاق افتاده باشد، کاری که زودتر از دیگری رخ داده با had بیان می‌شود.',
    badgeColor: 'bg-sky-500 text-white',
    iconType: 'file',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'She' },
        { roleFa: 'کمکی گذشته had', example: 'had', auxVerb: 'had' },
        { roleFa: 'قسمت سوم فعل', example: 'eaten', noteFa: 'شکل سوم eat' },
        { roleFa: 'بقیه جمله', example: 'before we arrived' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'کمکی منفی', example: "hadn't", auxVerb: "hadn't" },
        { roleFa: 'قسمت سوم فعل', example: 'seen' },
        { roleFa: 'مفعول', example: 'him before' }
      ],
      question: [
        { roleFa: 'کمکی had اول', example: 'Had', auxVerb: 'had' },
        { roleFa: 'فاعل', example: 'they' },
        { roleFa: 'قسمت سوم فعل', example: 'left?' }
      ]
    },
    persianComparison: 'معادل «رفته بودم»، «خورده بود» در زبان فارسی.',
    timeMarkers: [
      { en: 'before', fa: 'قبل از' },
      { en: 'after', fa: 'بعد از' }
    ],
    examples: [
      { en: 'The bus had left before I came.', fa: 'اتوبوس رفته بود قبل از این‌که من بیایم.' },
      { en: 'He had finished homework before dinner.', fa: 'او قبل از شام تکالیفش را تمام کرده بود.' }
    ],
    quizzes: [
      {
        id: 'qz-past-p-1',
        type: 'formula',
        questionFa: 'فرمول گذشته کامل شامل چه فعل کمکی است؟',
        options: ['had', 'have', 'did', 'was'],
        correctIndex: 0,
        explanation: 'گذشته کامل برای تمام فاعل‌ها با had + قسمت سوم فعل ساخته می‌شود: had finished.'
      }
    ]
  },

  // 8. گذشته کامل استمراری
  {
    id: 'past-perfect-continuous',
    category: 'past',
    nameFa: 'گذشته کامل استمراری',
    shortConcept: 'کاری که تا قبل از یک اتفاق در گذشته برای مدتی در جریان بود',
    description: 'تمرکز روی طول مدت کاری است که تا پیش از یک واقعه دیگر در گذشته ادامه داشته است.',
    badgeColor: 'bg-orange-500 text-white',
    iconType: 'voice',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'He' },
        { roleFa: 'کمکی had', example: 'had', auxVerb: 'had' },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'running', noteFa: 'استمرار' },
        { roleFa: 'زمان', example: 'for 1 hour' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'They' },
        { roleFa: 'کمکی منفی', example: "hadn't", auxVerb: "hadn't" },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'waiting' }
      ],
      question: [
        { roleFa: 'کمکی اول', example: 'Had', auxVerb: 'had' },
        { roleFa: 'فاعل', example: 'she' },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'sleeping?' }
      ]
    },
    persianComparison: 'معادل «یک ساعت بود که داشت کار می‌کرد تا این‌که...» در فارسی.',
    timeMarkers: [
      { en: 'for an hour before', fa: 'برای یک ساعت قبل از...' }
    ],
    examples: [
      { en: 'I had been reading for an hour when he came.', fa: 'یک ساعت بود که داشتم کتاب می‌خواندم که او آمد.' }
    ],
    quizzes: [
      {
        id: 'qz-past-pc-1',
        type: 'sentence',
        questionFa: 'در ساختار had been فعل به چه صورت می‌آید؟',
        options: ['فعل همراه با ing', 'شکل ساده فعل', 'فعل با ed', 'بدون فعل'],
        correctIndex: 0,
        explanation: 'در ساختار had been فعل اصلی همیشه با ing می‌آید: had been reading.'
      }
    ]
  },

  // 9. آینده ساده
  {
    id: 'future-simple',
    category: 'future',
    nameFa: 'آینده ساده',
    shortConcept: 'پیش‌بینی، تصمیم ناگهانی یا قول دادن درباره آینده',
    description: 'برای کارهایی که در آینده انجام خواهیم داد؛ مثل «فردا به تو زنگ خواهم زد».',
    badgeColor: 'bg-pink-500 text-white',
    iconType: 'chat',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I / She' },
        { roleFa: 'نشانه آینده', example: 'will', auxVerb: 'will' },
        { roleFa: 'شکل ساده فعل', example: 'help / call', noteFa: 'ساده بدون پسوند' },
        { roleFa: 'مفعول و زمان', example: 'you tomorrow' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'نشانه منفی آینده', example: "won't", auxVerb: "won't" },
        { roleFa: 'شکل ساده فعل', example: 'go', noteFa: 'ساده' },
        { roleFa: 'مکان', example: 'there' }
      ],
      question: [
        { roleFa: 'نشانه آینده اول', example: 'Will', auxVerb: 'will' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'شکل ساده فعل', example: 'come', noteFa: 'ساده' },
        { roleFa: 'زمان', example: 'tomorrow?' }
      ]
    },
    persianComparison: 'معادل «خواهم رفت / فردا می‌روم» در فارسی.',
    timeMarkers: [
      { en: 'tomorrow', fa: 'فردا' },
      { en: 'next week', fa: 'هفته آینده' },
      { en: 'soon', fa: 'به‌زودی' }
    ],
    examples: [
      { en: 'I will call you tomorrow.', fa: 'من فردا به تو زنگ خواهم زد.' },
      { en: 'She will not come today.', fa: 'او امروز نخواهد آمد.' },
      { en: 'Will you help me?', fa: 'آیا کمکم می‌کنی؟' }
    ],
    quizzes: [
      {
        id: 'qz-fut-1',
        type: 'formula',
        questionFa: 'بعد از کلمه will فعل اصلی جمله چه تغییری می‌کند؟',
        options: [
          'به شکل ساده و بدون هیچ تغییری باقی می‌ماند',
          'پسوند ed می‌گیرد',
          'پسوند s می‌گیرد',
          'به آن ing اضافه می‌شود'
        ],
        correctIndex: 0,
        explanation: 'بعد از will فعل همیشه کاملاً ساده می‌آید: will call, will go.'
      },
      {
        id: 'qz-fut-2',
        type: 'sentence',
        questionFa: 'جای خالی را با کلمه درست برای آینده پر کن:',
        questionEn: 'Don\'t worry, I ___ help you.',
        options: ['will', 'am', 'did', 'was'],
        correctIndex: 0,
        explanation: 'برای قول دادن و کارهای آینده از will استفاده می‌شود: I will help you.'
      }
    ]
  },

  // 10. آینده استمراری
  {
    id: 'future-continuous',
    category: 'future',
    nameFa: 'آینده استمراری',
    shortConcept: 'کاری که در یک ساعت مشخص در آینده در جریان خواهد بود',
    description: 'برای کارهایی که در آینده در یک زمان معین در حال انجام هستند؛ مثلاً «فردا ساعت ۴ دارم کتاب می‌خوانم».',
    badgeColor: 'bg-emerald-500 text-white',
    iconType: 'image',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'نشانه آینده', example: 'will', auxVerb: 'will' },
        { roleFa: 'کلمه be', example: 'be', noteFa: 'ثابت' },
        { roleFa: 'فعل با ing', example: 'sleeping' },
        { roleFa: 'زمان مشخص', example: 'at 11 PM' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'They' },
        { roleFa: 'منفی آینده', example: "won't", auxVerb: "won't" },
        { roleFa: 'کلمه be', example: 'be' },
        { roleFa: 'فعل با ing', example: 'working' }
      ],
      question: [
        { roleFa: 'Will اول', example: 'Will', auxVerb: 'will' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'کلمه be', example: 'be' },
        { roleFa: 'فعل با ing', example: 'waiting?' }
      ]
    },
    persianComparison: 'معادل «فردا این موقع دارم درس می‌خوانم» در زبان گفتاری فارسی.',
    timeMarkers: [
      { en: 'this time tomorrow', fa: 'فردا این موقع' },
      { en: 'at 10 AM tomorrow', fa: 'فردا ساعت ۱۰' }
    ],
    examples: [
      { en: 'This time tomorrow, I will be flying.', fa: 'فردا این موقع، در حال پرواز خواهم بود.' },
      { en: 'Don\'t call at 9, I will be studying.', fa: 'ساعت ۹ زنگ نزن؛ آن موقع دارم درس می‌خوانم.' }
    ],
    quizzes: [
      {
        id: 'qz-fut-c-1',
        type: 'formula',
        questionFa: 'فرمول آینده استمراری چیست؟',
        options: [
          'فاعل + will be + فعل با ing',
          'فاعل + will + شکل ساده فعل',
          'فاعل + have been + فعل با ing',
          'فاعل + was + فعل با ing'
        ],
        correctIndex: 0,
        explanation: 'فرمول این زمان will be + فعل با ing است: will be sleeping.'
      }
    ]
  },

  // 11. آینده کامل
  {
    id: 'future-perfect',
    category: 'future',
    nameFa: 'آینده کامل',
    shortConcept: 'کاری که تا قبل از یک موعد در آینده حتماً تمام شده است',
    description: 'وقتی مطمئن هستیم کاری تا قبل از یک ساعت یا روز در آینده تکمیل شده است.',
    badgeColor: 'bg-sky-500 text-white',
    iconType: 'file',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'نشانه آینده', example: 'will', auxVerb: 'will' },
        { roleFa: 'کلمه have', example: 'have', auxVerb: 'have' },
        { roleFa: 'قسمت سوم فعل', example: 'finished', noteFa: 'شکل سوم finish' },
        { roleFa: 'موعد زمانی', example: 'by 5 PM' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'She' },
        { roleFa: 'منفی', example: "won't", auxVerb: "won't" },
        { roleFa: 'have', example: 'have', auxVerb: 'have' },
        { roleFa: 'قسمت سوم فعل', example: 'arrived' }
      ],
      question: [
        { roleFa: 'Will اول', example: 'Will', auxVerb: 'will' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'have', example: 'have', auxVerb: 'have' },
        { roleFa: 'قسمت سوم فعل', example: 'finished?' }
      ]
    },
    persianComparison: 'معادل «تا فردا کارم را تمام کرده‌ام» در فارسی.',
    timeMarkers: [
      { en: 'by tomorrow', fa: 'تا فردا' },
      { en: 'by 5 PM', fa: 'تا ساعت ۵' }
    ],
    examples: [
      { en: 'By 5 PM, I will have finished my homework.', fa: 'تا ساعت ۵ عصر، تکالیفم را تمام کرده خواهم بود.' }
    ],
    quizzes: [
      {
        id: 'qz-fut-p-1',
        type: 'formula',
        questionFa: 'در زمان آینده کامل، بعد از will have چه شکلی از فعل می‌آید؟',
        options: [
          'قسمت سوم فعل (Past Participle)',
          'شکل ساده فعل',
          'فعل با ing',
          'فعل کمکی do'
        ],
        correctIndex: 0,
        explanation: 'فرمول will have + قسمت سوم فعل است: will have finished.'
      }
    ]
  },

  // 12. آینده کامل استمراری
  {
    id: 'future-perfect-continuous',
    category: 'future',
    nameFa: 'آینده کامل استمراری',
    shortConcept: 'تاکید بر مدت زمان کاری که تا نقطه‌ای در آینده همچنان در جریان بوده',
    description: 'نشان می‌دهد تا یک روز یا سال مشخص در آینده، کاری برای مدت معینی ادامه داشته است.',
    badgeColor: 'bg-orange-500 text-white',
    iconType: 'voice',
    formulaSteps: {
      positive: [
        { roleFa: 'فاعل', example: 'I' },
        { roleFa: 'ترکیب آینده کامل', example: 'will have', auxVerb: 'will' },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'living' },
        { roleFa: 'مدت زمان', example: 'here for 2 years' }
      ],
      negative: [
        { roleFa: 'فاعل', example: 'He' },
        { roleFa: 'منفی', example: "won't have", auxVerb: "won't" },
        { roleFa: 'کلمه been', example: 'been' },
        { roleFa: 'فعل با ing', example: 'working' }
      ],
      question: [
        { roleFa: 'Will اول', example: 'Will', auxVerb: 'will' },
        { roleFa: 'فاعل', example: 'you' },
        { roleFa: 'have been', example: 'have been', auxVerb: 'have' },
        { roleFa: 'فعل با ing', example: 'studying?' }
      ]
    },
    persianComparison: 'معادل «تا ماه بعد، دو سال خواهد بود که اینجا کار می‌کنم» در فارسی.',
    timeMarkers: [
      { en: 'by next month for 2 years', fa: 'تا ماه آینده به مدت ۲ سال' }
    ],
    examples: [
      { en: 'By next year, I will have been learning English for 2 years.', fa: 'تا سال آینده، دو سال خواهد بود که دارم انگلیسی یاد می‌گیرم.' }
    ],
    quizzes: [
      {
        id: 'qz-fut-pc-1',
        type: 'sentence',
        questionFa: 'کدام حالت برای تکمیل ساختار آینده کامل استمراری درست است؟',
        questionEn: 'By tomorrow, she will have been ___ for 5 hours.',
        options: ['sleeping', 'sleep', 'slept', 'sleeps'],
        correctIndex: 0,
        explanation: 'در ساختار will have been فعل با پسوند ing می‌آید: will have been sleeping.'
      }
    ]
  }
];
