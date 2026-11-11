import React from 'react';
import { UserProgress } from '../../types';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame,
  Award,
  Trash2,
  BookOpen,
  Sparkles,
  Settings,
  Compass
} from 'lucide-react';

interface ReviewMistakesViewProps {
  progress: UserProgress;
  onNavigateTab: (tab: 'tenses' | 'lessons' | 'review') => void;
  onClearMistakes: () => void;
  onRemoveMistake: (id: string) => void;
  onResetProgress: () => void;
}

export const ReviewMistakesView: React.FC<ReviewMistakesViewProps> = ({
  progress,
  onNavigateTab,
  onClearMistakes,
  onRemoveMistake,
  onResetProgress,
}) => {
  const accuracy =
    progress.totalExercisesCompleted > 0
      ? Math.round((progress.correctAnswersCount / progress.totalExercisesCompleted) * 100)
      : 100;

  return (
    <div className="flex flex-col gap-5 pb-24 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <span className="inline-block text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
          مرور هوشمند و آمار
        </span>
        <h2 className="text-xl sm:text-2xl font-black">جعبه اشتباهات و آمار یادگیری</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          اشتباه کردن بهترین فرصت یادگیری است! هر سوالی که اشتباه پاسخ داده‌ای اینجا ذخیره می‌شود تا مرور کنی.
        </p>
      </div>

      {/* سه کارت میان‌بر (منتقل‌شده از خانه) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => onNavigateTab('tenses')}
          className="bg-white p-3 sm:p-4 rounded-3xl border border-indigo-50 shadow-xs flex flex-col items-center text-center hover:border-indigo-200 hover:shadow-md transition-all active:scale-95"
        >
          <div className="w-9 h-9 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500">نقشه زمان‌ها</span>
          <span className="text-base sm:text-lg font-extrabold text-slate-800 mt-0.5">
            <span className="font-en">{progress.completedTenses.length}</span> / <span className="font-en">12</span>
          </span>
          <span className="text-[10px] text-sky-600 mt-0.5">زمان کامل</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('lessons')}
          className="bg-white p-3 sm:p-4 rounded-3xl border border-indigo-50 shadow-xs flex flex-col items-center text-center hover:border-indigo-200 hover:shadow-md transition-all active:scale-95"
        >
          <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500">درس‌های پاس‌شده</span>
          <span className="text-base sm:text-lg font-extrabold text-slate-800 mt-0.5">
            <span className="font-en">{progress.completedLessons.length}</span> درس
          </span>
          <span className="text-[10px] text-amber-600 mt-0.5">گام به گام</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('review')}
          className="bg-white p-3 sm:p-4 rounded-3xl border border-indigo-50 shadow-xs flex flex-col items-center text-center hover:border-indigo-200 hover:shadow-md transition-all active:scale-95"
        >
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500">زنجیره تمرین</span>
          <span className="text-base sm:text-lg font-extrabold text-slate-800 mt-0.5">
            <span className="font-en">{progress.streakDays}</span> روز
          </span>
          <span className="text-[10px] text-emerald-600 mt-0.5">پشتکار عالی</span>
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <span className="text-[11px] text-slate-500 block">زنجیره مطالعه</span>
          <span className="text-lg font-black text-amber-600 font-en mt-0.5 block">
            {progress.streakDays} روز
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <span className="text-[11px] text-slate-500 block">کل تمرین‌ها</span>
          <span className="text-lg font-black text-indigo-600 font-en mt-0.5 block">
            {progress.totalExercisesCompleted}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <span className="text-[11px] text-slate-500 block">پاسخ‌های صحیح</span>
          <span className="text-lg font-black text-emerald-600 font-en mt-0.5 block">
            {progress.correctAnswersCount}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <span className="text-[11px] text-slate-500 block">درصد دقت</span>
          <span className="text-lg font-black text-purple-600 font-en mt-0.5 block">
            {accuracy}%
          </span>
        </div>
      </div>

      {/* MISTAKES SECTION */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-slate-800">
              سوالات نیازمند مرور ({progress.mistakes.length})
            </h3>
          </div>

          {progress.mistakes.length > 0 && (
            <button
              type="button"
              onClick={onClearMistakes}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>پاک‌کردن همه</span>
            </button>
          )}
        </div>

        {progress.mistakes.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-semibold text-slate-700">عالی! در حال حاضر هیچ اشتباه ثبت‌شده‌ای نداری.</p>
            <p className="text-xs text-slate-400 mt-1">با خیال راحت تمرین‌های جدید رو انجام بده.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {progress.mistakes.map((m) => (
              <div
                key={m.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p dir="ltr" className="font-en text-sm font-bold text-slate-800 text-left">
                    {m.questionText}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveMistake(m.id)}
                    aria-label="حذف این مورد از اشتباهات"
                    className="text-slate-400 hover:text-slate-600 text-xs p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-rose-100 text-rose-800 px-2.5 py-1 rounded-xl">
                    ❌ پاسخ شما: <strong dir="ltr" className="font-en">{m.wrongAnswer}</strong>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-xl">
                    ✅ پاسخ درست: <strong dir="ltr" className="font-en">{m.correctAnswer}</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                  💡 <strong>نکته آموزشی:</strong> {m.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SETTINGS & RESET OPTION */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-800">شروع مجدد دوره از صفر</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            در صورت تمایل می‌توانید تمامی پیشرفت‌ها و آمار را ریست کنید.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('آیا مطمئن هستید که می‌خواهید پیشرفت خود را ریست کنید؟')) {
              onResetProgress();
            }
          }}
          className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold rounded-xl transition-colors border border-slate-200"
        >
          ریست آمار
        </button>
      </div>
    </div>
  );
};
