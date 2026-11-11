import { WheelExerciseItem } from '../types';

export interface WheelCategory {
  id: string;
  titleFa: string;
  titleEn: string;
  iconName: string;
  exercises: WheelExerciseItem[];
}

export const wheelCategories: WheelCategory[] = [
  {
    id: 'to-be',
    titleFa: 'فعل «بودن» (To Be)',
    titleEn: 'To Be Verbs',
    iconName: 'Sparkles',
    exercises: [
      {
        id: 'w-be-1',
        type: 'wheel',
        promptFa: 'با چرخاندن چرخ، فعل To Be مناسب برای فاعل I را در زمان حال پیدا کن:',
        sentenceWithBlank: 'I ___ a dedicated English learner.',
        prefixText: 'I ',
        suffixText: ' a dedicated English learner.',
        options: ['am', 'is', 'are', 'was', 'were', 'will be'],
        correctOption: 'am',
        categoryTag: 'فعل To Be حال',
        explanation: 'برای فاعل I در زمان حال همواره از am استفاده می‌شود: I am a dedicated English learner.'
      },
      {
        id: 'w-be-2',
        type: 'wheel',
        promptFa: 'فعل To Be مناسب برای فاعل جمع They در گذشته (دیروز) را انتخاب کن:',
        sentenceWithBlank: 'They ___ at the library yesterday.',
        prefixText: 'They ',
        suffixText: ' at the library yesterday.',
        options: ['were', 'was', 'are', 'is', 'am', 'be'],
        correctOption: 'were',
        categoryTag: 'فعل To Be گذشته',
        explanation: 'برای فاعل جمع They در زمان گذشته، فعل were استفاده می‌شود: They were at the library yesterday.'
      },
      {
        id: 'w-be-3',
        type: 'wheel',
        promptFa: 'فعل مناسب برای فاعل سوم‌شخص مفرد (She) در زمان حال را انتخاب کن:',
        sentenceWithBlank: 'She ___ very talented and energetic.',
        prefixText: 'She ',
        suffixText: ' very talented and energetic.',
        options: ['is', 'are', 'am', 'were', 'was'],
        correctOption: 'is',
        categoryTag: 'فعل To Be حال',
        explanation: 'برای فاعل‌های سوم‌شخص مفرد (He/She/It) از is استفاده می‌شود.'
      }
    ]
  },
  {
    id: 'subjects',
    titleFa: 'ضمایر فاعلی (Subjects)',
    titleEn: 'Subject Pronouns',
    iconName: 'UserCheck',
    exercises: [
      {
        id: 'w-sub-1',
        type: 'wheel',
        promptFa: 'چرخ را بچرخان و فاعلی را انتخاب کن که با فعل am هماهنگ باشد:',
        sentenceWithBlank: '___ am really happy today.',
        prefixText: '',
        suffixText: ' am really happy today.',
        options: ['I', 'He', 'She', 'They', 'We', 'You'],
        correctOption: 'I',
        categoryTag: 'هماهنگی فاعل و فعل',
        explanation: 'تنها فاعلی که با فعل am می‌آید، ضمیر I (من) است: I am really happy today.'
      },
      {
        id: 'w-sub-2',
        type: 'wheel',
        promptFa: 'فاعل مناسبی انتخاب کن که با فعل کمکی does هماهنگ باشد:',
        sentenceWithBlank: '___ does not eat fast food.',
        prefixText: '',
        suffixText: ' does not eat fast food.',
        options: ['He', 'They', 'We', 'You', 'I'],
        correctOption: 'He',
        categoryTag: 'هماهنگی فاعل و Does',
        explanation: 'فعل کمکی does فقط برای فاعل‌های مفرد غایب مثل He, She, It به کار می‌رود.'
      },
      {
        id: 'w-sub-3',
        type: 'wheel',
        promptFa: 'فاعل مناسب برای فعل جمع are را در چرخ انتخاب کن:',
        sentenceWithBlank: '___ are traveling to Isfahan tomorrow.',
        prefixText: '',
        suffixText: ' are traveling to Isfahan tomorrow.',
        options: ['We', 'He', 'She', 'It', 'I'],
        correctOption: 'We',
        categoryTag: 'فاعل جمع',
        explanation: 'فعل are برای ضمایر جمع We, They, You استفاده می‌شود: We are traveling...'
      }
    ]
  },
  {
    id: 'auxiliary',
    titleFa: 'افعال کمکی (Do / Does / Did)',
    titleEn: 'Auxiliary Verbs',
    iconName: 'Zap',
    exercises: [
      {
        id: 'w-aux-1',
        type: 'wheel',
        promptFa: 'فعل کمکی مناسب برای سوال منفی در گذشته با yesterday را پیدا کن:',
        sentenceWithBlank: 'Why ___ you not call me yesterday?',
        prefixText: 'Why ',
        suffixText: ' you not call me yesterday?',
        options: ['did', 'do', 'does', 'were', 'have'],
        correctOption: 'did',
        categoryTag: 'کمکی زمان گذشته',
        explanation: 'برای کارهای مربوط به گذشته (yesterday)، فعل کمکی did استفاده می‌شود.'
      },
      {
        id: 'w-aux-2',
        type: 'wheel',
        promptFa: 'فعل کمکی سوالی برای فاعل you در حال ساده را انتخاب کن:',
        sentenceWithBlank: '___ you like Persian food?',
        prefixText: '',
        suffixText: ' you like Persian food?',
        options: ['Do', 'Does', 'Are', 'Is', 'Did'],
        correctOption: 'Do',
        categoryTag: 'سوال حال ساده',
        explanation: 'با ضمیر you برای سوال پرسیدن درباره علایق در زمان حال ساده از Do استفاده می‌شود: Do you like...'
      }
    ]
  },
  {
    id: 'question-words',
    titleFa: 'کلمات پرسشی (Wh- Words)',
    titleEn: 'Question Words',
    iconName: 'HelpCircle',
    exercises: [
      {
        id: 'w-wh-1',
        type: 'wheel',
        promptFa: 'چرخ را بچرخان تا کلمه پرسشی مناسب برای زمان («چه وقتی») را پیدا کنی:',
        sentenceWithBlank: '___ does the morning class start?',
        prefixText: '',
        suffixText: ' does the morning class start?',
        options: ['When', 'Where', 'Who', 'What', 'Why', 'How'],
        correctOption: 'When',
        categoryTag: 'پرسش زمان',
        explanation: 'کلمه When برای پرسیدن درباره زمان شروع کلاس به کار می‌رود: When does the morning class start?'
      },
      {
        id: 'w-wh-2',
        type: 'wheel',
        promptFa: 'کلمه پرسشی برای پرسش درباره علت («چرا») را انتخاب کن:',
        sentenceWithBlank: '___ are you so excited today?',
        prefixText: '',
        suffixText: ' are you so excited today?',
        options: ['Why', 'Where', 'When', 'Who', 'What', 'How'],
        correctOption: 'Why',
        categoryTag: 'پرسش علت',
        explanation: 'کلمه Why برای پرسیدن علت و انگیزه حالتی به کار می‌رود.'
      }
    ]
  }
];
