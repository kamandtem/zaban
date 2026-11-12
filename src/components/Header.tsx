import React, { useEffect, useRef, useState } from 'react';
import { Bell, Flame, Target, RotateCcw } from 'lucide-react';
import { MascotAvatar } from './MascotAvatar';
import type { VocabularyWord } from '../types';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  tone: 'amber' | 'rose' | 'indigo';
  onClick?: () => void;
}

interface HeaderProps {
  onOpenMenu: () => void;
  notifications: AppNotification[];
  dailyWord: VocabularyWord;
  onDailyWordClick: () => void;
}

const toneIcon = {
  amber: <Flame className="w-4 h-4 text-amber-500" />,
  rose: <RotateCcw className="w-4 h-4 text-rose-500" />,
  indigo: <Target className="w-4 h-4 text-indigo-500" />,
};

// هدر شناور (الگوبرداری از طرح مرجع)
export const Header: React.FC<HeaderProps> = ({ onOpenMenu, notifications, dailyWord, onDailyWordClick }) => {
  const [openNotif, setOpenNotif] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openNotif) return;
    const close = (e: Event) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpenNotif(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [openNotif]);

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-safe pb-2 bg-gradient-to-b from-[#F8F9FE] via-[#F8F9FE]/90 to-transparent">
      <div className="max-w-2xl mx-auto bg-white rounded-[28px] shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-white px-3 py-2.5 flex items-center justify-between">
        {/* سمت راست: منو + لوگو + نام */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="باز کردن منو"
            className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block w-5 h-[2.5px] rounded-full bg-orange-500" />
              <span className="block w-5 h-[2.5px] rounded-full bg-orange-500" />
              <span className="block w-5 h-[2.5px] rounded-full bg-orange-500" />
            </span>
          </button>
          <div className="w-12 h-12 rounded-2xl bg-orange-100 border-2 border-orange-300/80 flex items-center justify-center overflow-hidden">
            <MascotAvatar type="bear" size="sm" />
          </div>
          <h1 className="text-xl font-black text-slate-800">لینگوپلاس</h1>
        </div>

        {/* سمت چپ: اعلان‌ها */}
        <div className="relative" ref={boxRef}>
          <button
            type="button"
            onClick={() => setOpenNotif(v => !v)}
            aria-label="اعلان‌ها"
            className="relative w-12 h-12 rounded-2xl bg-slate-100/80 flex items-center justify-center text-slate-600 active:scale-95 transition-transform"
          >
            <Bell className="w-5 h-5" />
              {notifications.length + 1 > 0 && (
              <span className="absolute -top-1 -left-1 min-w-[20px] h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center border-2 border-white">
                {(notifications.length + 1).toLocaleString('fa-IR')}
              </span>
            )}
          </button>

          {openNotif && (
            <div className="absolute left-0 top-14 w-72 max-h-[80vh] overflow-y-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 p-2 animate-scale-up origin-top-left">
              <p className="text-xs font-black text-slate-700 px-2 py-1.5">اعلان‌ها و کلمه‌ی امروز</p>
              <button type="button" onClick={() => { setOpenNotif(false); onDailyWordClick(); }} className="w-full text-right p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 hover:bg-emerald-50">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-emerald-700">کلمه‌ی امروز</span>
                  <span className="text-[9px] font-black text-emerald-700 bg-white px-1.5 py-0.5 rounded-full">{dailyWord.level ?? 'A1'}</span>
                </div>
                <span dir="ltr" className="block font-en text-base font-black text-slate-800 text-left mt-1">{dailyWord.word}</span>
                <span className="block text-xs font-bold text-slate-700 mt-0.5">{dailyWord.meaningFa}</span>
                <span dir="ltr" className="block font-en text-[10px] text-indigo-700 text-left leading-tight mt-2 line-clamp-1">{dailyWord.exampleEn}</span>
                <span className="block text-[10px] text-slate-500 text-right leading-tight mt-0.5 line-clamp-1">{dailyWord.exampleFa}</span>
              </button>
              {notifications.length === 0 ? (
                <p className="text-[10px] text-slate-400 px-2 py-3 text-center">اعلان دیگری فعلاً نداری.</p>
              ) : (
                notifications.map(n => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => { setOpenNotif(false); n.onClick?.(); }}
                    className="w-full flex items-start gap-2.5 p-2.5 rounded-2xl hover:bg-slate-50 text-right"
                  >
                    <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">{toneIcon[n.tone]}</span>
                    <span>
                      <span className="block text-xs font-bold text-slate-800">{n.title}</span>
                      <span className="block text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.body}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
