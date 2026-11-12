// بخش «پیش‌نیاز»: قواعد خیلی ساده قبل از ورود به زمان‌ها و درس‌ها

export interface BasicExample { en: string; fa: string }
export interface BasicTable { headers: string[]; rows: string[][]; enCols: number[]; columnTones?: string[] }
export interface BasicFormula { label: string; parts: { text: string; tone: 'subject' | 'verb' | 'aux' | 'object' | 'adj' | 'extra' }[]; example: BasicExample }
export interface BasicCheck { question: string; sentence?: string; options: string[]; correct: number; why: string }

export interface BasicTopic {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  points: string[];
  table?: BasicTable;
  formulas?: BasicFormula[];
  verbForms?: { title: string; tone: string; description: string; exampleEn: string; exampleFa: string }[];
  examples: BasicExample[];
  check: BasicCheck;
}

export const basicsTopics: BasicTopic[] = [
  {
    id: 'sentence',
    emoji: '🧱',
    title: 'جمله‌سازی اولیه',
    summary: 'در جمله‌ی معمولی انگلیسی، اول فاعل می‌آید، بعد فعل و سپس مفعول. فعل معمولاً آخر جمله نیست.',
    points: [
      'فارسی: من سیب می‌خورم. انگلیسی: I eat an apple. (فعل وسط است)',
      'گاهی قبل از فعل اصلی یک فعل کمکی می‌آید: I can swim.',
      'وقتی فعل اصلی نداریم، از be استفاده می‌کنیم: I am happy.',
      'برای منفی کردن، not بعد از فعل کمکی می‌آید. برای سوالی کردن، فعل کمکی اول جمله می‌آید.',
      'مکان و زمان معمولاً آخر جمله می‌آیند: I study at home every day.',
    ],
    formulas: [
      { label: 'اسکلت اصلی', parts: [{ text: 'فاعل', tone: 'subject' }, { text: 'فعل', tone: 'verb' }, { text: 'مفعول', tone: 'object' }], example: { en: 'I eat an apple.', fa: 'من یک سیب می‌خورم.' } },
      { label: 'با فعل کمکی', parts: [{ text: 'فاعل', tone: 'subject' }, { text: 'فعل کمکی', tone: 'aux' }, { text: 'فعل', tone: 'verb' }, { text: 'مفعول', tone: 'object' }], example: { en: 'She can drive a car.', fa: 'او می‌تواند ماشین براند.' } },
      { label: 'با be و صفت', parts: [{ text: 'فاعل', tone: 'subject' }, { text: 'be', tone: 'aux' }, { text: 'صفت', tone: 'adj' }], example: { en: 'We are tired.', fa: 'ما خسته‌ایم.' } },
      { label: 'سوالی', parts: [{ text: 'فعل کمکی', tone: 'aux' }, { text: 'فاعل', tone: 'subject' }, { text: 'فعل', tone: 'verb' }, { text: '…?', tone: 'extra' }], example: { en: 'Can you swim?', fa: 'می‌توانی شنا کنی؟' } },
    ],
    examples: [{ en: "I can't swim.", fa: 'من نمی‌توانم شنا کنم.' }, { en: 'They play football in the park.', fa: 'آن‌ها در پارک فوتبال بازی می‌کنند.' }],
    check: { question: 'کدام ترتیب درست است؟', options: ['I a book read.', 'I read a book.', 'Read I a book.'], correct: 1, why: 'فاعل (I) + فعل (read) + مفعول (a book).' },
  },
  {
    id: 'verb-forms',
    emoji: '🔤',
    title: 'اشکال مختلف فعل',
    summary: 'بعضی جمله‌ها به شکل پایه‌ی فعل نیاز دارند و بعضی به شکل گذشته یا شکل سوم. با یک فعل ثابت، فرق سه شکل را راحت‌تر ببین.',
    points: [
      'فعل باقاعده معمولاً به هر دو شکل دوم و سوم ed می‌گیرد: work → worked → worked. فعل بی‌قاعده شکل‌های خودش را دارد؛ مثل eat → ate → eaten.',
      'در انگلیسی آمریکایی، شکل سوم get می‌تواند got یا gotten باشد؛ در انگلیسی بریتانیایی معمولاً got می‌آید. سه شکل read نوشتار یکسانی دارند.',
    ],
    verbForms: [
      {
        title: 'شکل اول فعل (V1)', tone: 'text-emerald-700',
        description: 'شکل پایه‌ی فعل است. در حال ساده بعد از I، you، we و they می‌آید؛ برای he، she و it معمولاً s یا es می‌گیرد. بعد از to و فعل کمکی can هم شکل پایه می‌آید.',
        exampleEn: 'I eat an apple every day.', exampleFa: 'من هر روز یک سیب می‌خورم.',
      },
      {
        title: 'شکل دوم فعل (V2)', tone: 'text-emerald-800',
        description: 'برای کاری می‌آید که در گذشته انجام شده و تمام شده است. واژه‌هایی مثل yesterday و last week اغلب به تشخیص آن کمک می‌کنند.',
        exampleEn: 'I ate an apple yesterday.', exampleFa: 'من دیروز یک سیب خوردم.',
      },
      {
        title: 'شکل سوم فعل (V3)', tone: 'text-emerald-950',
        description: 'در زمان‌های کامل بعد از have، has یا had می‌آید. در جمله‌ی مجهول هم بعد از شکل مناسب فعل be استفاده می‌شود.',
        exampleEn: 'I have eaten an apple.', exampleFa: 'من یک سیب خورده‌ام.',
      },
    ],
    table: {
      headers: ['شکل اول فعل (V1)', 'شکل دوم فعل (V2)', 'شکل سوم فعل (V3)'],
      rows: [
        ['be', 'was / were', 'been'],
        ['have', 'had', 'had'],
        ['do', 'did', 'done'],
        ['go', 'went', 'gone'],
        ['make', 'made', 'made'],
        ['get', 'got', 'got / gotten'],
        ['take', 'took', 'taken'],
        ['come', 'came', 'come'],
        ['see', 'saw', 'seen'],
        ['know', 'knew', 'known'],
        ['think', 'thought', 'thought'],
        ['give', 'gave', 'given'],
        ['find', 'found', 'found'],
        ['tell', 'told', 'told'],
        ['say', 'said', 'said'],
        ['eat', 'ate', 'eaten'],
        ['drink', 'drank', 'drunk'],
        ['write', 'wrote', 'written'],
        ['read', 'read', 'read'],
        ['speak', 'spoke', 'spoken'],
      ],
      enCols: [0, 1, 2],
      columnTones: ['text-emerald-700', 'text-emerald-800', 'text-emerald-950'],
    },
    examples: [],
    check: {
      question: 'بعد از have در جمله‌ی I have ___ the film، کدام شکل درست است؟',
      sentence: 'I have ___ the film.',
      options: ['see', 'saw', 'seen'],
      correct: 2,
      why: 'بعد از have شکل سوم فعل می‌آید: have seen.',
    },
  },
  {
    id: 'pronouns',
    emoji: '👤',
    title: 'ضمیرها',
    summary: 'ضمیر جای اسم می‌نشیند تا مدام اسم را تکرار نکنیم. بسته به جایش در جمله، شکلش عوض می‌شود.',
    points: [
      'ضمیر فاعلی: کسی که کار را انجام می‌دهد، اول جمله می‌آید.',
      'ضمیر مفعولی: کسی که کار رویش انجام می‌شود، بعد از فعل می‌آید.',
      'صفت ملکی: قبل از اسم می‌آید و مالک را نشان می‌دهد (my book).',
      'ضمیر ملکی: تنها می‌آید و جای «صفت ملکی + اسم» را می‌گیرد (mine).',
    ],
    table: {
      headers: ['فارسی', 'فاعلی', 'مفعولی', 'صفت ملکی', 'ضمیر ملکی'],
      rows: [
        ['من', 'I', 'me', 'my', 'mine'],
        ['تو', 'you', 'you', 'your', 'yours'],
        ['او (مرد)', 'he', 'him', 'his', 'his'],
        ['او (زن)', 'she', 'her', 'her', 'hers'],
        ['آن (شیء/حیوان)', 'it', 'it', 'its', '-'],
        ['ما', 'we', 'us', 'our', 'ours'],
        ['شما', 'you', 'you', 'your', 'yours'],
        ['آن‌ها', 'they', 'them', 'their', 'theirs'],
      ],
      enCols: [1, 2, 3, 4],
    },
    examples: [
      { en: 'She loves him.', fa: 'او (زن) او را (مرد) دوست دارد.' },
      { en: 'This is my bag.', fa: 'این کیف من است.' },
      { en: 'This bag is mine.', fa: 'این کیف مال من است.' },
    ],
    check: {
      question: 'کدام کلمه جای خالی را درست پر می‌کند؟',
      sentence: 'Ali is my friend. I like ___ .',
      options: ['he', 'him', 'his'],
      correct: 1,
      why: 'بعد از فعل (like) ضمیر مفعولی می‌آید: him.',
    },
  },
  {
    id: 'possessive-s',
    emoji: '🔑',
    title: "مالکیت با 's",
    summary: "برای گفتن «مالِ کسی»، به اسم صاحب 's اضافه می‌کنیم. ترتیبش برعکس فارسی است: اول صاحب، بعد چیز.",
    points: [
      "اسم صاحب + 's + چیز: Ali's car یعنی ماشینِ علی.",
      "اگر اسم جمع و با s تمام شود، فقط ' می‌گیرد: the boys' room.",
      "مراقب باش: it's یعنی it is، ولی its یعنی «مال آن».",
    ],
    formulas: [
      {
        label: 'ساختار مالکیت',
        parts: [
          { text: "Sara's", tone: 'subject' },
          { text: 'phone', tone: 'object' },
        ],
        example: { en: "Sara's phone is new.", fa: 'گوشیِ سارا نو است.' },
      },
    ],
    examples: [
      { en: "My mother's name is Maryam.", fa: 'اسم مادرم مریم است.' },
      { en: "The students' books are on the table.", fa: 'کتاب‌های دانش‌آموزان روی میز هستند.' },
    ],
    check: {
      question: '«کیفِ رضا» به انگلیسی کدام است؟',
      options: ["bag's Reza", "Reza's bag", 'Reza bag'],
      correct: 1,
      why: "اول صاحب با 's، بعد چیز: Reza's bag.",
    },
  },
  {
    id: 'noun-adjective',
    emoji: '🏠',
    title: 'اسم و صفت',
    summary: 'اسم یعنی اسم هر چیزی (book, cat). صفت چگونگی آن را می‌گوید (big, red). در انگلیسی صفت قبل از اسم می‌آید.',
    points: [
      'برعکس فارسی: «خانه بزرگ» می‌شود a big house، نه a house big.',
      'صفت هیچ‌وقت جمع نمی‌شود: big houses (نه bigs).',
      'صفت می‌تواند بعد از فعل be هم بیاید: The house is big.',
      'اسم برای جمع شدن معمولاً s می‌گیرد: one cat ← two cats.',
    ],
    formulas: [
      {
        label: 'صفت قبل از اسم',
        parts: [
          { text: 'a', tone: 'extra' },
          { text: 'red', tone: 'adj' },
          { text: 'car', tone: 'object' },
        ],
        example: { en: 'I have a red car.', fa: 'من یک ماشین قرمز دارم.' },
      },
      {
        label: 'صفت بعد از be',
        parts: [
          { text: 'The car', tone: 'subject' },
          { text: 'is', tone: 'aux' },
          { text: 'red', tone: 'adj' },
        ],
        example: { en: 'The car is red.', fa: 'ماشین قرمز است.' },
      },
    ],
    examples: [
      { en: 'She has a small dog.', fa: 'او یک سگ کوچک دارد.' },
      { en: 'These are good books.', fa: 'این‌ها کتاب‌های خوبی هستند.' },
    ],
    check: {
      question: '«یک گربه سفید» کدام است؟',
      options: ['a cat white', 'a white cat', 'a whites cat'],
      correct: 1,
      why: 'صفت (white) قبل از اسم (cat) می‌آید و جمع هم نمی‌شود.',
    },
  },
  {
    id: 'articles',
    emoji: '🅰️',
    title: 'حرف تعریف a، an و the',
    summary: 'این کلمه‌های کوچک قبل از اسم می‌آیند و نشان می‌دهند درباره‌ی یک چیز نامشخص حرف می‌زنیم یا چیز مشخصی.',
    points: [
      'a یعنی «یک» و پیش از کلمه‌ای می‌آید که با صدای بی‌صدا شروع می‌شود: a book، a car.',
      'an یعنی «یک» و پیش از کلمه‌ای می‌آید که با صدای صدادار شروع می‌شود: an apple، an egg.',
      'the یعنی «آن / اینِ مشخص»؛ وقتی شنونده می‌داند منظور کدام چیز است: the book.',
      'برای اسم جمع یا غیرقابل‌شمارش، معمولاً a یا an نمی‌آوریم: books، water.',
    ],
    examples: [
      { en: 'I have a dog.', fa: 'من یک سگ دارم.' },
      { en: 'She eats an apple.', fa: 'او یک سیب می‌خورد.' },
      { en: 'The dog is small.', fa: 'آن سگ کوچک است.' },
    ],
    check: { question: 'کدام گزینه درست است؟', sentence: 'I see ___ elephant.', options: ['a', 'an', 'the'], correct: 1, why: 'elephant با حرف e شروع می‌شود، پس an می‌آید.' },
  },
  {
    id: 'question-words',
    emoji: '❓',
    title: 'کلمات پرسشی',
    summary: 'برای گرفتن جواب دقیق، کلمه‌ی پرسشی را اول سوال می‌آوریم. بعد از آن معمولاً فعل کمکی و سپس فاعل می‌آید.',
    points: [
      'what = چه چیزی / چه؛ برای پرسیدن درباره‌ی چیزها.',
      'where = کجا؛ برای مکان. when = چه وقت؛ برای زمان.',
      'who = چه کسی؛ برای شخص. why = چرا؛ برای دلیل.',
      'how = چطور / چگونه؛ برای روش یا حال.',
      'در سوال، اول کلمه‌ی پرسشی می‌آید و بعد فعل کمکی، فاعل و فعل اصلی.',
    ],
    table: { headers: ['کلمه', 'معنی', 'مثال'], rows: [['what', 'چه چیزی', 'What is this?'], ['where', 'کجا', 'Where do you live?'], ['when', 'چه وقت', 'When do we start?'], ['who', 'چه کسی', 'Who is she?'], ['why', 'چرا', 'Why are you here?'], ['how', 'چطور', 'How do you go?']], enCols: [0, 2] },
    examples: [
      { en: 'Where do you live?', fa: 'کجا زندگی می‌کنی؟' },
      { en: 'What is your name?', fa: 'اسم تو چیست؟' },
      { en: 'Why are you happy?', fa: 'چرا خوشحالی؟' },
    ],
    check: { question: 'برای پرسیدن مکان از کدام کلمه استفاده می‌کنیم؟', options: ['When', 'Where', 'Who'], correct: 1, why: 'Where یعنی «کجا» و درباره‌ی مکان می‌پرسد.' },
  },
  {
    id: 'making-adjectives',
    emoji: '🧩',
    title: 'صفت‌ها چطور ساخته می‌شوند',
    summary: 'خیلی از صفت‌ها با چسباندن یک پسوند کوچک به اسم ساخته می‌شوند. سه تا از پرکاربردترین‌ها:',
    points: [
      'ful یعنی «پُر از»: help ← helpful (مفید)، beauty ← beautiful (زیبا)',
      'y یعنی «دارای»: sun ← sunny (آفتابی)، rain ← rainy (بارانی)',
      'less یعنی «بدون / بی»: home ← homeless (بی‌خانمان)، use ← useless (بی‌فایده)',
    ],
    examples: [
      { en: 'It is a sunny day.', fa: 'روز آفتابی‌ای است.' },
      { en: 'This app is very helpful.', fa: 'این برنامه خیلی مفید است.' },
    ],
    check: {
      question: '«بی‌فایده» کدام است؟',
      options: ['useful', 'useless', 'usey'],
      correct: 1,
      why: 'پسوند less یعنی «بدون»: useless = بی‌فایده.',
    },
  },
  {
    id: 'comparison',
    emoji: '🏆',
    title: 'تر و ترین',
    summary: 'برای مقایسه، صفت‌های کوتاه er و est می‌گیرند و صفت‌های بلند more و most.',
    points: [
      'صفت کوتاه: tall ← taller (بلندتر) ← the tallest (بلندترین)',
      'صفت بلند: beautiful ← more beautiful ← the most beautiful',
      'بعد از «تر» برای مقایسه than می‌آید: taller than me (بلندتر از من)',
      'چند استثنای مهم: good ← better ← best و bad ← worse ← worst',
    ],
    table: {
      headers: ['صفت', 'تر', 'ترین'],
      rows: [
        ['big', 'bigger', 'the biggest'],
        ['happy', 'happier', 'the happiest'],
        ['expensive', 'more expensive', 'the most expensive'],
        ['good', 'better', 'the best'],
      ],
      enCols: [0, 1, 2],
    },
    examples: [
      { en: 'Ali is taller than Reza.', fa: 'علی از رضا بلندتر است.' },
      { en: 'This is the best day.', fa: 'این بهترین روز است.' },
    ],
    check: {
      question: 'جای خالی را پر کن:',
      sentence: 'My bag is ___ than your bag.',
      options: ['big', 'bigger', 'biggest'],
      correct: 1,
      why: 'با than مقایسه بین دو چیز است، پس «تر» می‌خواهیم: bigger.',
    },
  },
];
