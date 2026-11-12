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
  const [dragY, setDragY] = useState(0);
  const [sending, setSending] = useState(false);
  const [entering, setEntering] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const card = session[index];

  const next = () => {
    setIndex(i => Math.min(i + 1, session.length));
    setFlipped(false); setDragY(0); setSending(false); setEntering(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
  };
  const previous = () => { setIndex(i => Math.max(0, i - 1)); setFlipped(false); setDragY(0); };
  const sendCardAway = () => {
    if (sending) return;
    setSending(true);
    window.setTimeout(next, 280);
  };
  const rate = (remembered: boolean) => { if (!card) return; onRateWord(card.id, remembered); next(); };
  const today = todayKey();
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const tomorrowKey = dateKey(tomorrow);
  const daysUntil = (date: string) => Math.round((new Date(`${date}T12:00:00`).getTime() - new Date(`${today}T12:00:00`).getTime()) / 86400000);
  const freshToday = Math.max(0, 10 - (progress.leitnerNewDate === today ? progress.leitnerNewCount : 0));
  const reminders = [
    { label: 'امروز', count: allVocabulary.filter(w => progress.leitnerCards[w.id]?.dueDate <= today).length + freshToday },
    { label: 'فردا', count: allVocabulary.filter(w => progress.leitnerCards[w.id]?.dueDate === tomorrowKey).length },
    { label: 'هفته‌ی بعد', count: allVocabulary.filter(w => { const d = progress.leitnerCards[w.id]?.dueDate; return d && daysUntil(d) >= 2 && daysUntil(d) <= 7; }).length },
    { label: 'ماه بعد', count: allVocabulary.filter(w => { const d = progress.leitnerCards[w.id]?.dueDate; return d && daysUntil(d) >= 8 && daysUntil(d) <= 30; }).length },
  ];

  return (
    <div className="flex flex-col gap-5 pb-36 px-4 max-w-xl mx-auto animate-fade-in">
      <header className="bg-gradient-to-br from-indigo-700 via-violet-600 to-fuchsia-600 rounded-3xl p-5 text-white shadow-lg">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/15 px-2.5 py-1 rounded-full"><Layers className="w-3.5 h-3.5" /> مرور فاصله‌دار</span>
        <h2 className="text-xl font-black mt-2">جعبه‌ی لایتنر</h2>
        <p className="text-xs text-white/80 mt-1">کارت‌ها با یادآوری درست به خانه‌ی بعد می‌روند؛ اگر یادت نبود، به خانه‌ی اول برمی‌گردند.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {reminders.map(item => <div key={item.label} className="rounded-xl bg-white/15 px-2 py-2 text-center"><p className="text-[10px] text-white/75">{item.label}</p><p className="text-sm font-black mt-0.5">{item.count.toLocaleString('fa-IR')} کارت</p></div>)}
        </div>
      </header>

      {card ? <>
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-bold text-slate-700">{card.category}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-1 rounded-lg">خانه {(progress.leitnerCards[card.id]?.box ?? 1).toLocaleString('fa-IR')} از ۵</span>
          <span className="text-xs font-bold text-indigo-600">{(index + 1).toLocaleString('fa-IR')} از {session.length.toLocaleString('fa-IR')}</span>
        </div>
      </div>

      <div className="relative mx-auto mt-2 h-[330px] w-full max-w-[310px] px-2 [perspective:1100px]">
        {[5, 4, 3, 2, 1].map((layer) => <div key={layer} className="absolute inset-x-3 top-0 bottom-2 rounded-[28px] border border-slate-200/80 bg-white shadow-md pointer-events-none" style={{ transform: `translateY(${(5 - layer) * 4}px) rotate(${layer % 2 === 0 ? 1.1 : -1.1}deg) scale(${1 - layer * 0.055})`, opacity: 0.16 + (6 - layer) * 0.105, zIndex: 6 - layer }} />)}
        <div
          role="button"
          tabIndex={0}
          aria-label={flipped ? 'روی کارت را نشان بده' : 'معنی کارت را نشان بده'}
          onPointerDown={e => { start.current = { x: e.clientX, y: e.clientY }; swiped.current = false; e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={e => { if (!start.current) return; const dy = e.clientY - start.current.y; if (Math.abs(dy) > 8) { swiped.current = true; setDragY(dy); } }}
          onPointerUp={e => {
            if (!start.current) return;
            const dx = e.clientX - start.current.x;
            const dy = e.clientY - start.current.y;
            if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx)) {
              swiped.current = true;
              if (dy < 0) sendCardAway(); else previous();
            } else {
              setDragY(0);
            }
            start.current = null;
          }}
          onClick={() => { if (!swiped.current) setFlipped(v => !v); swiped.current = false; }}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(v => !v); } }}
          className={`absolute inset-x-3 top-0 bottom-2 rounded-[28px] bg-transparent touch-none select-none z-10 ${sending ? 'pointer-events-none' : ''}`}
          style={{ transform: sending ? 'translate3d(0,-135%,0) rotate(-8deg) scale(.84)' : entering ? 'translate3d(0,115%,0) scale(.9)' : `translate3d(0,${dragY}px,0) rotate(${dragY * -0.025}deg) scale(${Math.max(.94, 1 - Math.abs(dragY) / 1400)})`, opacity: sending ? 0 : entering ? 0.45 : 1, transition: dragY === 0 || sending || entering ? 'transform 300ms cubic-bezier(.2,.8,.2,1), opacity 260ms ease' : 'none', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 rounded-[28px] [transform-style:preserve-3d] transition-transform duration-500 ease-in-out" style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            <div className="absolute inset-0 rounded-[28px] bg-white border border-slate-100 shadow-[0_24px_55px_rgba(15,23,42,0.22)] p-5 text-center flex flex-col items-center justify-center [backface-visibility:hidden]">
              <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">{card.partOfSpeech}</span>
              <h3 dir="ltr" className="font-en text-2xl sm:text-3xl font-black text-slate-800 mt-4">{card.word}</h3>
              <div className="w-full border-t border-slate-100 mt-4 pt-4">
                <p dir="ltr" className="font-en text-sm font-bold text-indigo-700">{card.exampleEn}</p>
                <p className="text-[11px] text-slate-400 mt-2">برای دیدن معنی کارت را لمس کن</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-[28px] bg-white border border-slate-100 shadow-[0_24px_55px_rgba(15,23,42,0.22)] p-5 text-center flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">معنی واژه</span>
              <h3 className="text-2xl font-black text-slate-800 mt-4">{card.meaningFa}</h3>
              <p className="text-[11px] text-violet-700 bg-violet-50 px-3 py-1.5 rounded-full mt-2">تاریخ مرور: {progress.leitnerCards[card.id]?.dueDate ? new Date(`${progress.leitnerCards[card.id].dueDate}T12:00:00`).toLocaleDateString('fa-IR') : 'امروز'}</p>
              <div className="w-full border-t border-slate-100 mt-5 pt-4">
                <p className="text-xs font-bold text-slate-500 mb-2">معنی جمله</p>
                <p className="text-sm text-slate-700 leading-relaxed">{card.exampleFa}</p>
              </div>
              <span className="text-[11px] text-slate-400 mt-5 flex items-center gap-1"><RotateCcw className="w-3 h-3" /> لمس کن تا برگردد</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
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
        <p className="text-sm text-slate-500 mt-2">کارت‌های تازه یا سررسیدشده‌ی دیگری برای امروز ندارید. کارت‌های بعدی طبق تاریخ یادآوری‌شان نمایش داده می‌شوند.</p>
      </div>}
    </div>
  );
};
