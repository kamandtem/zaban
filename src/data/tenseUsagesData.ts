// کاربردهای هر زمان به زبان ساده: «وقتی ... » + یک مثال
export interface TenseUsage {
  whenFa: string;
  en: string;
  fa: string;
}

export const tenseUsages: Record<string, TenseUsage[]> = {
  'present-simple': [
    { whenFa: 'وقتی می‌خواهیم خودمان را معرفی کنیم', en: 'My name is Sara. I live in Tehran.', fa: 'اسم من ساراست. من در تهران زندگی می‌کنم.' },
    { whenFa: 'وقتی از عادت‌ها و کارهای روزانه حرف می‌زنیم', en: 'I wake up at 7 every morning.', fa: 'من هر روز صبح ساعت ۷ بیدار می‌شوم.' },
    { whenFa: 'وقتی از یک حقیقت علمی یا واقعیت همیشگی صحبت می‌کنیم', en: 'Water boils at 100 degrees.', fa: 'آب در ۱۰۰ درجه می‌جوشد.' },
    { whenFa: 'وقتی سلیقه، احساس یا نظرمان را می‌گوییم', en: 'I love pizza.', fa: 'من عاشق پیتزا هستم.' },
    { whenFa: 'وقتی از برنامه‌های ثابت مثل ساعت حرکت قطار یا کلاس می‌گوییم', en: 'The train leaves at 9 o\'clock.', fa: 'قطار ساعت ۹ حرکت می‌کند.' },
  ],
  'present-continuous': [
    { whenFa: 'وقتی کاری همین الان در حال انجام است', en: 'I am reading a book now.', fa: 'الان دارم کتاب می‌خوانم.' },
    { whenFa: 'وقتی کاری این روزها و موقتاً در جریان است', en: 'She is learning English this month.', fa: 'او این ماه دارد انگلیسی یاد می‌گیرد.' },
    { whenFa: 'وقتی از برنامه قطعی آینده نزدیک حرف می‌زنیم', en: 'We are visiting grandma tomorrow.', fa: 'ما فردا به دیدن مادربزرگ می‌رویم.' },
    { whenFa: 'وقتی چیزی در حال تغییر است', en: 'The weather is getting cold.', fa: 'هوا دارد سرد می‌شود.' },
  ],
  'present-perfect': [
    { whenFa: 'وقتی تجربه‌ای را تعریف می‌کنیم (بدون گفتن زمان دقیق)', en: 'I have been to Shiraz.', fa: 'من (تا حالا) شیراز رفته‌ام.' },
    { whenFa: 'وقتی کاری تازه تمام شده و نتیجه‌اش الان مهم است', en: 'I have lost my key.', fa: 'کلیدم را گم کرده‌ام (الان کلید ندارم).' },
    { whenFa: 'وقتی کاری از گذشته شروع شده و هنوز ادامه دارد', en: 'We have lived here for five years.', fa: 'ما پنج سال است که اینجا زندگی می‌کنیم.' },
    { whenFa: 'وقتی می‌پرسیم «تا حالا ...؟»', en: 'Have you ever seen snow?', fa: 'تا حالا برف دیده‌ای؟' },
  ],
  'present-perfect-continuous': [
    { whenFa: 'وقتی می‌خواهیم مدت زمان یک کار را تاکید کنیم', en: 'I have been studying for two hours.', fa: 'دو ساعت است که دارم درس می‌خوانم.' },
    { whenFa: 'وقتی اثر یک کار طولانی را می‌بینیم', en: 'You look tired. Have you been running?', fa: 'خسته به نظر می‌رسی. داشتی می‌دویدی؟' },
    { whenFa: 'وقتی می‌پرسیم «چند وقت است که ...؟»', en: 'How long have you been waiting?', fa: 'چند وقت است که منتظری؟' },
  ],
  'past-simple': [
    { whenFa: 'وقتی کاری در گذشته شروع شده و تمام شده', en: 'I watched a movie last night.', fa: 'دیشب یک فیلم دیدم.' },
    { whenFa: 'وقتی خاطره یا داستان تعریف می‌کنیم', en: 'We went to the beach and swam.', fa: 'رفتیم کنار دریا و شنا کردیم.' },
    { whenFa: 'وقتی زمان دقیق گذشته را می‌گوییم', en: 'She was born in 2005.', fa: 'او سال ۲۰۰۵ به دنیا آمد.' },
    { whenFa: 'وقتی از عادتی در گذشته حرف می‌زنیم که دیگر نیست', en: 'I played football every day as a child.', fa: 'بچه که بودم هر روز فوتبال بازی می‌کردم.' },
  ],
  'past-continuous': [
    { whenFa: 'وقتی کاری در یک لحظه مشخص از گذشته در جریان بود', en: 'At 8 pm I was having dinner.', fa: 'ساعت ۸ شب داشتم شام می‌خوردم.' },
    { whenFa: 'وقتی وسط یک کار، اتفاق دیگری افتاد', en: 'I was sleeping when the phone rang.', fa: 'داشتم می‌خوابیدم که تلفن زنگ زد.' },
    { whenFa: 'وقتی صحنه یک داستان را توصیف می‌کنیم', en: 'It was raining and people were running.', fa: 'باران می‌بارید و مردم داشتند می‌دویدند.' },
    { whenFa: 'وقتی دو کار هم‌زمان در گذشته انجام می‌شد', en: 'She was cooking while he was reading.', fa: 'او آشپزی می‌کرد در حالی که آن یکی کتاب می‌خواند.' },
  ],
  'past-perfect': [
    { whenFa: 'وقتی می‌گوییم کدام کار گذشته زودتر اتفاق افتاده', en: 'When I arrived, the bus had left.', fa: 'وقتی رسیدم، اتوبوس رفته بود.' },
    { whenFa: 'وقتی دلیل یک اتفاق گذشته را توضیح می‌دهیم', en: 'He was hungry because he had not eaten.', fa: 'گرسنه بود چون غذا نخورده بود.' },
    { whenFa: 'وقتی از تجربه‌ای قبل از یک زمان گذشته حرف می‌زنیم', en: 'I had never flown before 2020.', fa: 'تا قبل از ۲۰۲۰ هرگز سوار هواپیما نشده بودم.' },
  ],
  'past-perfect-continuous': [
    { whenFa: 'وقتی مدت یک کار را تا لحظه‌ای در گذشته تاکید می‌کنیم', en: 'I had been waiting for an hour when she came.', fa: 'یک ساعت بود که منتظر بودم که او آمد.' },
    { whenFa: 'وقتی علت حالتی در گذشته را می‌گوییم', en: 'His eyes were red. He had been crying.', fa: 'چشم‌هایش قرمز بود. داشت گریه می‌کرد.' },
    { whenFa: 'وقتی کاری طولانی در گذشته با اتفاقی قطع شد', en: 'They had been playing for 30 minutes before it rained.', fa: '۳۰ دقیقه بازی کرده بودند که باران گرفت.' },
  ],
  'future-simple': [
    { whenFa: 'وقتی همین لحظه تصمیمی می‌گیریم', en: 'I am thirsty. I will drink some water.', fa: 'تشنه‌ام. یک کم آب می‌خورم.' },
    { whenFa: 'وقتی قول می‌دهیم', en: 'I will help you tomorrow.', fa: 'فردا کمکت می‌کنم.' },
    { whenFa: 'وقتی پیش‌بینی یا حدس درباره آینده می‌زنیم', en: 'I think it will rain.', fa: 'فکر کنم باران ببارد.' },
    { whenFa: 'وقتی پیشنهاد یا درخواست مؤدبانه داریم', en: 'Will you open the door, please?', fa: 'می‌شود لطفاً در را باز کنی؟' },
  ],
  'future-continuous': [
    { whenFa: 'وقتی کاری در یک لحظه مشخص از آینده در جریان خواهد بود', en: 'At 10 tomorrow I will be working.', fa: 'فردا ساعت ۱۰ مشغول کار خواهم بود.' },
    { whenFa: 'وقتی مؤدبانه درباره برنامه کسی می‌پرسیم', en: 'Will you be using the car tonight?', fa: 'امشب از ماشین استفاده می‌کنی؟' },
    { whenFa: 'وقتی کاری طبق روال در آینده در جریان است', en: 'This time next week I will be lying on the beach.', fa: 'هفته بعد همین موقع کنار ساحل دراز کشیده‌ام.' },
  ],
  'future-perfect': [
    { whenFa: 'وقتی کاری تا یک زمان مشخص در آینده تمام شده است', en: 'I will have finished my homework by 8.', fa: 'تا ساعت ۸ تکالیفم را تمام کرده‌ام.' },
    { whenFa: 'وقتی از ددلاین و موعد حرف می‌زنیم', en: 'They will have built the bridge by next year.', fa: 'تا سال بعد پل را ساخته‌اند.' },
    { whenFa: 'وقتی حساب و کتاب آینده را می‌گوییم', en: 'By June, I will have saved enough money.', fa: 'تا خرداد به اندازه کافی پول جمع کرده‌ام.' },
  ],
  'future-perfect-continuous': [
    { whenFa: 'وقتی مدت یک کار را تا لحظه‌ای در آینده می‌گوییم', en: 'By May, I will have been working here for 3 years.', fa: 'تا اردیبهشت، سه سال است که اینجا کار می‌کنم.' },
    { whenFa: 'وقتی می‌خواهیم طول کشیدن یک کار تا آینده را تاکید کنیم', en: 'At 6, she will have been studying for 4 hours.', fa: 'ساعت ۶، چهار ساعت است که دارد درس می‌خواند.' },
  ],
};

// فرمول خیلی ساده ساخت جمله (مثبت) برای هر زمان؛ بدون جزئیات
export const simpleFormulas: Record<string, string> = {
  'present-simple': 'فاعل + شکل ساده فعل + بقیه جمله',
  'present-continuous': 'فاعل + am / is / are + فعل با ing',
  'present-perfect': 'فاعل + have / has + شکل سوم فعل',
  'present-perfect-continuous': 'فاعل + have / has + been + فعل با ing',
  'past-simple': 'فاعل + شکل گذشته فعل + بقیه جمله',
  'past-continuous': 'فاعل + was / were + فعل با ing',
  'past-perfect': 'فاعل + had + شکل سوم فعل',
  'past-perfect-continuous': 'فاعل + had + been + فعل با ing',
  'future-simple': 'فاعل + will + شکل ساده فعل',
  'future-continuous': 'فاعل + will + be + فعل با ing',
  'future-perfect': 'فاعل + will + have + شکل سوم فعل',
  'future-perfect-continuous': 'فاعل + will + have + been + فعل با ing',
};
