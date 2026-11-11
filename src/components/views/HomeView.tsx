import React, { useState } from 'react';
import { UserProgress } from '../../types';
import { MascotAvatar } from '../MascotAvatar';
import { TenseMindMap } from '../TenseMindMap';
import {
  Compass,
  BookOpen,
  RotateCw,
  Sparkles,
  ArrowLeft,
  Network,
  CheckCircle2,
  Clock,
  Layers,
  Award
} from 'lucide-react';

interface HomeViewProps {
  progress: UserProgress;
  onNavigateTab: (tab: 'basics' | 'tenses' | 'wheel' | 'lessons' | 'words' | 'review') => void;
  onOpenLesson: (lessonId: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onNavigateTab,
  onOpenLesson,
}) => {
  const [mindMapOpen, setMindMapOpen] = useState(false);
  const percentComplete = Math.min(
    100,
    Math.round((progress.todayCompletedCount / progress.dailyGoal) * 100)
  );

  return (
    <div className="flex flex-col gap-5 pb-24 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* کارت نقشه ذهنی لینگوپلاس */}
      <button
        type="button"
        onClick={() => setMindMapOpen(true)}
        className="w-full relative overflow-hidden rounded-3xl bg-white border border-indigo-100 shadow-xs hover:shadow-md hover:border-indigo-300 p-4 flex items-center gap-3.5 text-right active:scale-[0.99] transition-all"
      >
        <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/25">
          <Network className="w-6 h-6" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-base font-black text-slate-800">نقشه ذهنی لینگوپلاس</span>
          <span className="block text-xs text-slate-500 mt-0.5">۱۲ زمان انگلیسی را یک‌جا و شاخه‌به‌شاخه ببین</span>
        </span>
        <ArrowLeft className="w-4 h-4 text-indigo-500 shrink-0" />
      </button>
      <TenseMindMap open={mindMapOpen} onClose={() => setMindMapOpen(false)} completedTenses={progress.completedTenses} />

      {/* TODAY'S PROGRESS HERO CARD (Matching Dark Purple Card in Screenshot 1) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4338CA] via-[#4F46E5] to-[#7C3AED] text-white p-5 sm:p-6 shadow-xl shadow-indigo-500/20">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-semibold text-indigo-200">پیشرفت امروز شما</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              {progress.todayCompletedCount >= progress.dailyGoal
                ? 'آفرین! هدف روزانه تکمیل شد 🎉'
                : `${progress.dailyGoal - progress.todayCompletedCount} تمرین تا تکمیل هدف امروز`}
            </h3>

            {/* Glowing Orange Progress Bar (Like Screenshot 1) */}
            <div className="mt-3 w-full bg-white/20 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${percentComplete}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-indigo-200 mt-2">
              <span><span className="font-en">{percentComplete}%</span> تکمیل شده</span>
              <span>
                <span className="font-en">{progress.todayCompletedCount}</span> / <span className="font-en">{progress.dailyGoal}</span> گام
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenLesson(1)}
              className="mt-4 px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-transform active:scale-95 inline-flex items-center gap-1.5"
            >
              <span>ادامه یادگیری درس ۱</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cute mascot illustration in corner (like in Screenshot 1) */}
          <div className="shrink-0 flex flex-col items-center">
            <MascotAvatar type="bear" size="lg" />
            <span className="text-[11px] font-bold text-amber-300 mt-1">لینگو</span>
          </div>
        </div>
      </div>

      {/* THE TWO MAIN PATHS (مسیر اول و مسیر دوم از پرامپت) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-slate-800">مسیرهای آموزش</h3>
          <span className="text-xs text-slate-400">طراحی شده برای یادگیری بدون استرس</span>
        </div>

        {/* قدم صفر: پیش‌نیاز */}
        <button
          type="button"
          onClick={() => onNavigateTab('basics')}
          className="w-full mb-3.5 bg-gradient-to-l from-emerald-50 to-white rounded-3xl p-4 border border-emerald-200 shadow-xs flex items-center gap-3.5 text-right active:scale-[0.99] transition-all"
        >
          <span className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xl shadow-md shadow-emerald-500/20">🌱</span>
          <span className="flex-1">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">قدم صفر • پیش‌نیاز</span>
            <span className="block text-base font-bold text-slate-800 mt-1">قواعد خیلی ساده</span>
            <span className="block text-xs text-slate-500 mt-0.5">ضمیرها، مالکیت، صفت، تر و ترین و اسکلت جمله</span>
            <span className="block text-[11px] font-bold text-emerald-600 mt-1">
              {(progress.completedBasics?.length ?? 0).toLocaleString('fa-IR')} از ۶ قدم
            </span>
          </span>
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Path 1: نقشه کلی زبان */}
          <div
            onClick={() => onNavigateTab('tenses')}
            className="group cursor-pointer bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-xs hover:border-sky-300 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full -mr-8 -mt-8 -z-0 group-hover:scale-125 transition-transform" />
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  مسیر اول • کوتاه و تصویری
                </span>
                <h4 className="text-base font-bold text-slate-800 mt-1">نقشه کلی ۱۲ زمان</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  قبل از غرق شدن در جزییات، دید کلی از حال، گذشته و آینده پیدا کن و فرمول‌های هر ۱۲ زمان را بشناس.
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
                  <span>مشاهده نقشه زمان‌ها</span>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Path 2: یادگیری قدم‌به‌قدم */}
          <div
            onClick={() => onNavigateTab('lessons')}
            className="group cursor-pointer bg-white rounded-3xl p-4 sm:p-5 border border-indigo-100 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-8 -mt-8 -z-0 group-hover:scale-125 transition-transform" />
            <div className="relative z-10 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  مسیر دوم • دوره کامل
                </span>
                <h4 className="text-base font-bold text-slate-800 mt-1">یادگیری قدم‌به‌قدم</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  از ترتیب کلمات و فعل be تا جملات مجهول، امری، سوالی و واژگان روزمره با درس‌های کوچک ۵ دقیقه‌ای.
                </p>
                <div className="mt-3 flex items-center text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all">
                  <span>ورود به فهرست درس‌ها</span>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE SPOTLIGHT: چرخ انتخاب هوشمند */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 border border-purple-200/80 rounded-3xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
            <RotateCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                ویژگی شاخص اپلیکیشن
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
              باشگاه جمله‌سازی
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              با کشیدن گزینه‌ها یا لمس فلش‌های بالا و پایین، جمله‌های گرامری بساز.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('wheel')}
          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-2xl shadow-xs shrink-0 transition-transform active:scale-95 flex items-center gap-1"
        >
          <span>تمرین</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TODAY'S HABITS LIST */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-base font-bold text-slate-800">فعالیت‌های روزانه من</h3>
          <span className="text-xs font-semibold text-indigo-600">
            <span className="font-en">{progress.todayCompletedCount}</span> از <span className="font-en">{progress.dailyGoal}</span> انجام شده
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Item 1 */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                  درس ۱: پایه‌های جمله‌سازی
                </h5>
                <p className="text-[11px] text-slate-400">ترتیب کلمات فاعل + فعل + مفعول</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                ✓
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <RotateCw className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                  تمرین چرخ فعل «بودن» (To Be)
                </h5>
                <p className="text-[11px] text-slate-400">چرخاندن چرخ برای انتخاب am/is/are</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('wheel')}
              className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              شروع
            </button>
          </div>

          {/* Item 3 */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                  فلش‌کارت ۵ واژه کاربردی روز
                </h5>
                <p className="text-[11px] text-slate-400">همراه مثال‌های روزمره</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('words')}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              مشاهده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
