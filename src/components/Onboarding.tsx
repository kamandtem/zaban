import React, { useState } from 'react';
import { ArrowLeft, Check, Heart, Sprout, Languages, Sparkles } from 'lucide-react';
import slide1Img from '../assets/onboarding-1.svg';
import slide2Img from '../assets/onboarding-2.svg';

interface OnboardingProps {
  onFinish: () => void;
}

interface Slide {
  badge: string;
  title: React.ReactNode;
  body: string;
  image: string;
  imageAlt: string;
  chips: { icon: React.ReactNode; label: string }[];
  note?: string;
}

const BLUE = '#2D5BD0';
const YELLOW = '#FFB81C';

const slides: Slide[] = [
  {
    badge: 'خوش اومدی 👋',
    title: (
      <>
        زبان انگلیسی رو از <span style={{ color: BLUE }}>صفر</span> شروع کن
      </>
    ),
    body:
      'لینگوپلاس مخصوص کسانیه که هنوز نمی‌تونن با زبان ارتباط بگیرن. اگه حتی یه جمله‌ی ساده هم بلد نیستی، نگران نباش؛ جات همین‌جاست و از همون اول دستت رو می‌گیریم.',
    image: slide1Img,
    imageAlt: 'خانمی که با هدفون به زبان‌های مختلف گوش می‌دهد',
    chips: [
      { icon: <Sprout className="w-3.5 h-3.5" />, label: 'بدون هیچ پیش‌نیازی' },
      { icon: <Languages className="w-3.5 h-3.5" />, label: 'همه‌چیز فارسی توضیح داده می‌شه' },
      { icon: <Heart className="w-3.5 h-3.5" />, label: 'بدون استرس' },
    ],
  },
  {
    badge: 'ساده، خیلی ساده',
    title: (
      <>
        همه‌چیز <span style={{ color: BLUE }}>خیلی خیلی ساده</span> است
      </>
    ),
    body:
      'درس‌ها کوچیک و قدم‌به‌قدمن؛ با توضیح فارسی و مثال‌های ساده. اصطلاح سخت و قاعده‌ی پیچیده‌ای در کار نیست تا کم‌کم خودت بتونی جمله بسازی.',
    image: slide2Img,
    imageAlt: 'مردی که روی مبل با لپ‌تاپ زبان یاد می‌گیرد',
    chips: [
      { icon: <Sparkles className="w-3.5 h-3.5" />, label: 'درس‌های کوتاه' },
    ],
    note: 'این برنامه برای کسایی که زبانشون خوبه ساخته نشده؛ برای توئه که از اول داری شروع می‌کنی.',
  },
];

// دو اسلاید معرفی (فقط بار اول نمایش داده می‌شود)
export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const next = () => (isLast ? onFinish() : setIndex(i => i + 1));

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col font-fa"
      style={{
        background: 'linear-gradient(180deg, #FEF9F0 0%, #FFFFFF 100%)',
        paddingTop: 'var(--safe-top)',
        paddingBottom: 'var(--safe-bottom)',
      }}
    >
      {/* رد کردن */}
      <div className="flex justify-end px-5 pt-3 h-11 shrink-0">
        {!isLast && (
          <button
            type="button"
            onClick={onFinish}
            className="text-sm font-bold text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-xl"
          >
            رد کردن
          </button>
        )}
      </div>

      {/* محتوای اسلاید */}
      <div key={index} className="slide-in flex-1 min-h-0 overflow-y-auto px-6 pb-4 flex flex-col items-center">
        <div
          className="w-full max-w-sm h-[34vh] min-h-[170px] rounded-[32px] flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #FFF4D6 100%)' }}
        >
          <img src={slide.image} alt={slide.imageAlt} draggable={false} className="h-full w-full object-contain p-2" />
        </div>

        <span
          className="mt-5 text-xs font-black px-3 py-1 rounded-full"
          style={{ backgroundColor: '#FFF4D6', color: '#B45309' }}
        >
          {slide.badge}
        </span>

        <h1 className="mt-2.5 text-[22px] font-black text-slate-800 text-center leading-snug max-w-sm text-balance">{slide.title}</h1>

        <p className="mt-2.5 text-[15px] leading-7 text-slate-600 text-center max-w-sm">{slide.body}</p>

        <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-w-sm">
          {slide.chips.map(c => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
            >
              {c.icon}
              {c.label}
            </span>
          ))}
        </div>

        {slide.note && (
          <div className="mt-3 max-w-sm w-full flex items-start gap-2 rounded-2xl p-3 text-[13px] leading-6 font-bold text-amber-900 bg-amber-50 border border-amber-200">
            <Check className="w-4 h-4 mt-1 shrink-0 text-amber-600" />
            <span>{slide.note}</span>
          </div>
        )}
      </div>

      {/* نقطه‌ها و دکمه */}
      <div className="px-6 pb-6 pt-2 shrink-0 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`اسلاید ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? YELLOW : '#CBD5E1',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-full max-w-sm py-3.5 rounded-2xl text-white font-black text-base shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          style={{ backgroundColor: BLUE }}
        >
          <span>{isLast ? 'بزن بریم، شروع کنیم!' : 'بعدی'}</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
