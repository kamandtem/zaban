export interface SentenceSlot {
  id: string;
  labelFa: string; // e.g. "فاعل", "فعل کمکی", "شکل فعل", "قید زمان"
  options: string[];
  defaultIndex: number;
}

export interface MultiWheelChallenge {
  id: string;
  titleFa: string;
  targetTenseFa: string;
  instructionFa: string;
  slots: SentenceSlot[];
  validCombinations: {
    // Indices or values that make a correct sentence
    slotsMatches: string[][]; // list of valid [slot0, slot1, slot2, slot3]
    explanation: string;
    translationFa: string;
  }[];
}

export const multiWheelChallenges: MultiWheelChallenge[] = [
  // 1. چالش زمان حال ساده
  {
    id: 'ch-present-simple',
    titleFa: 'ساخت جمله در زمان حال ساده (کارهای روزمره)',
    targetTenseFa: 'حال ساده',
    instructionFa: 'روی هر بخش از جمله (فاعل، شکل فعل، قید) ضربه بزن و چرخ را بچرخان تا یک جمله درست بسازی:',
    slots: [
      {
        id: 'slot-sub',
        labelFa: 'فاعل',
        options: ['She', 'I', 'They'],
        defaultIndex: 0
      },
      {
        id: 'slot-verb',
        labelFa: 'شکل فعل اصلی',
        options: ['eats', 'eat', 'is eating', 'ate'],
        defaultIndex: 0
      },
      {
        id: 'slot-time',
        labelFa: 'قید زمان',
        options: ['every morning', 'yesterday', 'now', 'tomorrow'],
        defaultIndex: 0
      }
    ],
    validCombinations: [
      {
        slotsMatches: [['She'], ['eats'], ['every morning']],
        explanation: 'برای سوم‌شخص مفرد (She) در حال ساده فعل s می‌گیرد: She eats an apple every morning.',
        translationFa: 'او هر روز صبح سیب می‌خورد.'
      },
      {
        slotsMatches: [['I', 'They'], ['eat'], ['every morning']],
        explanation: 'برای فاعل I یا They در حال ساده شکل ساده فعل (eat) با قید عادتی every morning به کار می‌رود.',
        translationFa: 'من / آن‌ها هر روز صبح سیب می‌خورند.'
      }
    ]
  },

  // 2. چالش زمان حال استمراری (چند بخشی کامل: فاعل + کمکی + فعل ing + قید)
  {
    id: 'ch-present-continuous',
    titleFa: 'ساخت جمله حال استمراری (همین لحظه)',
    targetTenseFa: 'حال استمراری',
    instructionFa: 'روی بخش‌های جمله ضربه بزن تا فاعل، فعل کمکی و قید زمان را با هم هماهنگ کنی:',
    slots: [
      {
        id: 'slot-sub',
        labelFa: 'فاعل',
        options: ['I', 'She', 'We'],
        defaultIndex: 0
      },
      {
        id: 'slot-aux',
        labelFa: 'فعل کمکی',
        options: ['am', 'is', 'are', 'was', 'were'],
        defaultIndex: 0
      },
      {
        id: 'slot-verb',
        labelFa: 'شکل فعل',
        options: ['playing', 'plays', 'play', 'played'],
        defaultIndex: 0
      },
      {
        id: 'slot-time',
        labelFa: 'قید زمان',
        options: ['right now', 'yesterday', 'every day'],
        defaultIndex: 0
      }
    ],
    validCombinations: [
      {
        slotsMatches: [['I'], ['am'], ['playing'], ['right now']],
        explanation: 'هماهنگی کامل: I + am + playing + right now (همین الان).',
        translationFa: 'من همین الان دارم فوتبال بازی می‌کنم.'
      },
      {
        slotsMatches: [['She'], ['is'], ['playing'], ['right now']],
        explanation: 'هماهنگی کامل: She + is + playing + right now.',
        translationFa: 'او همین الان دارد فوتبال بازی می‌کند.'
      },
      {
        slotsMatches: [['We'], ['are'], ['playing'], ['right now']],
        explanation: 'هماهنگی کامل: We + are + playing + right now.',
        translationFa: 'ما همین الان داریم فوتبال بازی می‌کنیم.'
      }
    ]
  },

  // 3. چالش زمان گذشته ساده
  {
    id: 'ch-past-simple',
    titleFa: 'ساخت جمله گذشته ساده',
    targetTenseFa: 'گذشته ساده',
    instructionFa: 'یک جمله گذشته درست بساز که فاعل، فعل و قید زمان با هم منطبق باشند:',
    slots: [
      {
        id: 'slot-sub',
        labelFa: 'فاعل',
        options: ['Ali', 'We', 'They'],
        defaultIndex: 0
      },
      {
        id: 'slot-verb',
        labelFa: 'شکل فعل',
        options: ['watched', 'watch', 'is watching', 'will watch'],
        defaultIndex: 0
      },
      {
        id: 'slot-time',
        labelFa: 'قید زمان',
        options: ['yesterday', 'every night', 'tomorrow', 'now'],
        defaultIndex: 0
      }
    ],
    validCombinations: [
      {
        slotsMatches: [['Ali', 'We', 'They'], ['watched'], ['yesterday']],
        explanation: 'فعل گذشته با ed (watched) با قید زمان دیروز (yesterday) هماهنگ است.',
        translationFa: 'دیروز تلویزیون تماشا کردیم / کرد.'
      }
    ]
  },

  // 4. چالش زمان آینده با will
  {
    id: 'ch-future-simple',
    titleFa: 'ساخت جمله آینده با will',
    targetTenseFa: 'آینده ساده',
    instructionFa: 'قطعات را بچرخان تا یک جمله آینده درست با کلمه will بسازی:',
    slots: [
      {
        id: 'slot-sub',
        labelFa: 'فاعل',
        options: ['I', 'She', 'They'],
        defaultIndex: 0
      },
      {
        id: 'slot-aux',
        labelFa: 'کمکی آینده',
        options: ['will', 'is', 'did', 'was'],
        defaultIndex: 0
      },
      {
        id: 'slot-verb',
        labelFa: 'فعل اصلی',
        options: ['help', 'helps', 'helped', 'helping'],
        defaultIndex: 0
      },
      {
        id: 'slot-time',
        labelFa: 'زمان',
        options: ['tomorrow', 'yesterday', 'last night'],
        defaultIndex: 0
      }
    ],
    validCombinations: [
      {
        slotsMatches: [['I', 'She', 'They'], ['will'], ['help'], ['tomorrow']],
        explanation: 'بعد از will فعل همیشه ساده می‌آید (help) و با قید فردا (tomorrow) هماهنگ است.',
        translationFa: 'فردا کمکت خواهم کرد / خواهد کرد.'
      }
    ]
  }
];
