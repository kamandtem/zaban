import React, { useRef, useState } from 'react';
import { allVocabulary } from '../../data/vocabularyData';
import type { UserProgress } from '../../types';
import { ArrowUp, RotateCcw, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface FlashcardsViewProps { progress: UserProgress; onRateWord: (wordId: string, remembered: boolean) => void }

const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ progress, onRateWord }) => {
  const [session] = useState(() => {
    const today = todayKey();
    const due = allVocabulary.filter(w => progress.leitnerCards[w.id] && progress.leitnerCards[w.id].dueDate <= today);
    const alreadyNewToday = progress.leitnerNewDate === today ? progress.leitnerNewCount : 0;
    const fresh = allVocabulary.filter(w => !progress.leitnerCards[w.id]).slice(0, Math.max(0, 10 - alreadyNewToday));
    return [...due, ...fresh];
  });
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const card = session[index];

  const next = () => { setIndex(i => Math.min(i + 1, session.length)); setFlipped(false); };
  const previous = () => { setIndex(i => Math.max(0, i - 1)); setFlipped(false); };
  const rate = (remembered: boolean) => { if (!card) return; onRateWord(card.id, remembered); next(); };

  return (
    <div className="flex flex-col gap-5 pb-36 px-4 max-w-xl mx-auto animate-fade-in">
      <header className="bg-gradient-to-br from-indigo-700 via-violet-600 to-fuchsia-600 rounded-3xl p-5 text-white shadow-lg">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/15 px-2.5 py-1 rounded-full"><Layers className="w-3.5 h-3.5" /> یادگیری واژه‌ها</span>
        <h2 className="text-xl font-black mt-2">فلش کارت</h2>
        <p className="text-xs text-white/80 mt-1">روی کارت بزن تا برگردد؛ برای رفتن به واژه‌ی بعدی، کارت را به بالا بکش.</p>
      </header>

      {card ? <>
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-bold text-slate-700">{card.category}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-1 rounded-lg">خانه {(progress.leitnerCards[card.id]?.box ?? 1).toLocaleString('fa-IR')} از ۵</span>
          <span className="text-xs font-bold text-indigo-600">{(index + 1).toLocaleString('fa-IR')} از {session.length.toLocaleString('fa-IR')}</span>
        </div>
      </div>

      <div className="relative h-[390px] px-2">
        <div className="absolute inset-x-7 top-4 bottom-0 rounded-[32px] bg-indigo-100/80 rotate-3" />
        <div className="absolute inset-x-4 top-2 bottom-2 rounded-[32px] bg-violet-100 -rotate-2" />
        <button
          type="button"
          aria-label={flipped ? 'روی کارت را نشان بده' : 'معنی کارت را نشان بده'}
          onPointerDown={e => { start.current = { x: e.clientX, y: e.clientY }; swiped.current = false; }}
          onPointerUp={e => {
            if (!start.current) return;
            const dx = e.clientX - start.current.x;
            const dy = e.clientY - start.current.y;
            if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx)) {
              swiped.current = true;
              if (dy < 0) next(); else previous();
            }
            start.current = null;
          }}
          onClick={() => { if (!swiped.current) setFlipped(v => !v); swiped.current = false; }}
          className="absolute inset-0 w-full rounded-[32px] bg-white border border-slate-100 shadow-xl p-7 text-center flex flex-col items-center justify-center touch-none select-none active:scale-[0.99] transition-transform"
        >
          {!flipped ? (
            <>
              <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">{card.partOfSpeech}</span>
              <h3 dir="ltr" className="font-en text-3xl sm:text-4xl font-black text-slate-800 mt-6">{card.word}</h3>
              <p className="text-lg font-bold text-violet-700 mt-2">{card.pronunciationFa || ''}</p>
              <div className="w-full border-t border-slate-100 mt-7 pt-5">
                <p dir="ltr" className="font-en text-base font-bold text-indigo-700">{card.exampleEn}</p>
                <p className="text-[11px] text-slate-400 mt-3">برای دیدن معنی کارت را لمس کن</p>
              </div>
            </>
          ) : (
            <>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">معنی واژه</span>
              <h3 className="text-3xl font-black text-slate-800 mt-6">{card.meaningFa}</h3>
              <div className="w-full border-t border-slate-100 mt-7 pt-5">
                <p className="text-xs font-bold text-slate-500 mb-2">معنی جمله</p>
                <p className="text-base text-slate-700 leading-relaxed">{card.exampleFa}</p>
              </div>
              <span className="text-[11px] text-slate-400 mt-5 flex items-center gap-1"><RotateCcw className="w-3 h-3" /> لمس کن تا برگردد</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-5">
        {flipped ? <>
          <button type="button" onClick={() => rate(false)} className="py-3 px-4 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black">یادم نبود · خانه ۱</button>
          <button type="button" onClick={() => rate(true)} className="py-3 px-4 rounded-2xl bg-emerald-600 text-white text-xs font-black">یادم بود · خانه بعد</button>
        </> : <>
          <button type="button" onClick={previous} aria-label="کارت قبلی" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center"><ChevronRight className="w-5 h-5" /></button>
          <div className="flex items-center gap-2 text-xs text-slate-500"><ArrowUp className="w-4 h-4 text-indigo-600" /> کارت را به بالا بکش</div>
          <button type="button" onClick={() => setFlipped(true)} aria-label="دیدن پاسخ" className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md"><ChevronLeft className="w-5 h-5" /></button>
        </>}
      </div>
      </> : <div className="bg-white rounded-3xl p-7 text-center border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-slate-800">مرور امروز تمام شد</h3>
        <p className="text-sm text-slate-500 mt-2">کارت‌های تازه یا سررسیدشده‌ی دیگری برای امروز ندارید. فردا دوباره به این بخش سر بزنید.</p>
      </div>}
    </div>
  );
};
