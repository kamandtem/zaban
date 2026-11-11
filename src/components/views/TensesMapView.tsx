import React, { useState } from 'react';
import { allTensesData, DetailedTenseInfo, TenseCategory, TenseQuizItem } from '../../data/tensesData';
import { FormulaVisualizer } from '../FormulaVisualizer';
import { AuxChip } from '../../utils/auxiliaryColors';
import {
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Layers,
  ArrowLeft,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TenseTimeline } from '../TenseTimeline';
import { TenseIcon } from '../tenseIcons';
import { tenseUsages, simpleFormulas } from '../../data/tenseUsagesData';

interface TensesMapViewProps {
  completedTenses?: string[];
  onGoToFullCourse: () => void;
  onMarkTenseLearned?: (id: string) => void;
}

export const TensesMapView: React.FC<TensesMapViewProps> = ({
  completedTenses = [],
  onGoToFullCourse,
  onMarkTenseLearned,
}) => {
  const [activeTenseId, setActiveTenseId] = useState<string>('present-simple');
  const [showPatterns, setShowPatterns] = useState<boolean>(false);
  const [usagesOpenFor, setUsagesOpenFor] = useState<string | null>(null);

  // Quiz state
  const [quizMode, setQuizMode] = useState<'none' | 'formula' | 'sentence'>('none');
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const activeTense = allTensesData.find(t => t.id === activeTenseId) || allTensesData[0];
  const selectedCategory: TenseCategory = activeTense.category;
  const filteredTenses = allTensesData.filter(t => t.category === selectedCategory);
  const usages = tenseUsages[activeTense.id] || [];
  const isLearned = completedTenses.includes(activeTense.id);
  const usagesOpen = usagesOpenFor === activeTense.id;
  const simpleFormula = simpleFormulas[activeTense.id];

  // آیکون مرتبط با مفهوم هر زمان (رنگ‌ها همان رنگ‌های قبلی)
  const renderCardIcon = (tenseId: string, badgeColor: string) => (
    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${badgeColor}`}>
      <TenseIcon id={tenseId} className="w-5 h-5 text-white" />
    </div>
  );

  // Filter quizzes by active quiz mode
  const currentQuizzes: TenseQuizItem[] = allTensesData.flatMap(t =>
    t.quizzes.filter(q => q.type === quizMode)
  );
  const activeQuiz = currentQuizzes[currentQuizIndex];

  const handleCheckQuiz = () => {
    if (selectedQuizOption === null || quizChecked) return;
    setQuizChecked(true);
    if (selectedQuizOption === activeQuiz.correctIndex) {
      setQuizScore(prev => prev + 1);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < currentQuizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setQuizChecked(false);
    } else {
      setQuizMode('none');
      setCurrentQuizIndex(0);
      setSelectedQuizOption(null);
      setQuizChecked(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-36 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <span className="inline-block text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
          نقشه کلی ۱۲ زمان زبان انگلیسی
        </span>
        <h2 className="text-xl sm:text-2xl font-black">ساختار ۳ زمان اصلی و ۱۲ حالت</h2>
        <p className="text-xs sm:text-sm text-sky-100 mt-1 leading-relaxed">
          انگلیسی فقط ۳ زمان کلی دارد: <strong>حال</strong>، <strong>گذشته</strong> و <strong>آینده</strong>. روی خط زمان، هر زمانی رو که می‌خوای انتخاب کن تا کاربرد، فرمول و مثال‌هاش رو ببینی.
        </p>

        {/* Buttons for Golden Patterns & Quizzes */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            onClick={() => {
              setShowPatterns(prev => !prev);
              setQuizMode('none');
            }}
            className="px-3 py-1.5 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-xs hover:bg-sky-50 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{showPatterns ? 'بستن راز ۴ قالب اصلی' : 'راز طلایی: ۴ قالب اصلی زمان‌ها'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setQuizMode('formula');
              setCurrentQuizIndex(0);
              setSelectedQuizOption(null);
              setQuizChecked(false);
              setShowPatterns(false);
            }}
            className="px-3 py-1.5 bg-indigo-950/40 hover:bg-indigo-950/60 text-white text-xs font-bold rounded-xl border border-white/30 transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>آزمون حفظ فرمول‌ها</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setQuizMode('sentence');
              setCurrentQuizIndex(0);
              setSelectedQuizOption(null);
              setQuizChecked(false);
              setShowPatterns(false);
            }}
            className="px-3 py-1.5 bg-indigo-950/40 hover:bg-indigo-950/60 text-white text-xs font-bold rounded-xl border border-white/30 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            <span>آزمون در جمله روزمره</span>
          </button>
        </div>
      </div>

      {/* ================= GOLDEN 4-PATTERN VISUALIZER (PURE PERSIAN) ================= */}
      {showPatterns && (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-indigo-100 shadow-sm animate-fade-in flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm sm:text-base font-black text-slate-800">
              راز طلایی: تمام ۱۲ زمان از این ۴ قالب ساخته می‌شوند
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            به جای حفظ کردن فرمول‌های عجیب، کافی است بدانید هر حالت زمان چه قطعه‌ای به جمله اضافه می‌کند:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Pattern 1: ساده */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-indigo-700 block mb-1">
                ۱. حالت ساده (کارهای همیشگی یا یک‌باره)
              </span>
              <div dir="ltr" className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white p-2 rounded-xl">
                <span>[فاعل]</span>
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <span className="text-indigo-600 font-bold">شکل ساده فعل (یا گذشته)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">مثال: I eat an apple / I ate an apple</p>
            </div>

            {/* Pattern 2: استمراری */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-emerald-700 block mb-1">
                ۲. حالت استمراری (در حال انجام بودن)
              </span>
              <div dir="ltr" className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white p-2 rounded-xl">
                <span>[فاعل]</span>
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <AuxChip verb="am / is / was" />
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <span className="text-emerald-700 font-bold">فعل با پسوند ing</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">مثال: I am reading / She was sleeping</p>
            </div>

            {/* Pattern 3: کامل */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-purple-700 block mb-1">
                ۳. حالت کامل (تکمیل شده و بااثر)
              </span>
              <div dir="ltr" className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white p-2 rounded-xl">
                <span>[فاعل]</span>
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <AuxChip verb="have / has / had" />
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <span className="text-purple-700 font-bold">قسمت سوم فعل (P.P)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">مثال: I have eaten / He had seen</p>
            </div>

            {/* Pattern 4: کامل استمراری */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-amber-700 block mb-1">
                ۴. حالت کامل استمراری (تاکید بر مدت زمان)
              </span>
              <div dir="ltr" className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white p-2 rounded-xl">
                <span>[فاعل]</span>
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <span className="text-amber-800 font-bold">have/has been</span>
                <span className="text-indigo-500 font-bold">&rarr;</span>
                <span className="text-amber-700 font-bold">فعل با پسوند ing</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">مثال: I have been studying for 2 hours</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE QUIZ MODAL / INLINE TEST ================= */}
      {quizMode !== 'none' && activeQuiz && (
        <div className="bg-white rounded-3xl p-5 border-2 border-indigo-300 shadow-md animate-fade-in flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                {quizMode === 'formula' ? 'آزمون تسلط بر فرمول' : 'آزمون کاربرد در جمله'}
              </span>
              <span className="text-xs text-slate-400">
                سوال <span className="font-en">{currentQuizIndex + 1}</span> از <span className="font-en">{currentQuizzes.length}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setQuizMode('none')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              بستن آزمون ✕
            </button>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
            {activeQuiz.questionFa}
          </h4>

          {activeQuiz.questionEn && (
            <div dir="ltr" className="p-3 bg-slate-50 rounded-2xl font-en font-bold text-sm text-slate-800 border border-slate-200 text-left">
              {activeQuiz.questionEn}
            </div>
          )}

          {/* Options */}
          <div className="flex flex-col gap-2 mt-1">
            {activeQuiz.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                type="button"
                onClick={() => !quizChecked && setSelectedQuizOption(oIdx)}
                disabled={quizChecked}
                className={`p-3 rounded-2xl text-right text-xs sm:text-sm font-semibold border transition-all ${
                  selectedQuizOption === oIdx
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {quizChecked && (
            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
                selectedQuizOption === activeQuiz.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-2">
                {selectedQuizOption === activeQuiz.correctIndex ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block mb-0.5">
                    {selectedQuizOption === activeQuiz.correctIndex ? 'کاملاً درسته! 🎉' : 'نیاز به دقت بیشتر:'}
                  </span>
                  <p>{activeQuiz.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="mt-2 flex items-center justify-end">
            {!quizChecked ? (
              <button
                type="button"
                onClick={handleCheckQuiz}
                disabled={selectedQuizOption === null}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                بررسی پاسخ
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuiz}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
              >
                <span>{currentQuizIndex < currentQuizzes.length - 1 ? 'سوال بعدی' : 'پایان آزمون'}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= TIMELINE: گذشته ← الان → آینده ================= */}
      <TenseTimeline
        activeTenseId={activeTenseId}
        completedTenses={completedTenses}
        onSelect={setActiveTenseId}
      />

      {/* ================= 2x2 CARDS MATCHING NEW SCREENSHOT (Screenshot_2026-10-22_190901) ================= */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTenses.map(tense => {
          const isActive = tense.id === activeTenseId;

          return (
            <button
              key={tense.id}
              type="button"
              onClick={() => setActiveTenseId(tense.id)}
              className={`p-4 rounded-3xl text-right transition-all border flex flex-col justify-between min-h-[140px] relative overflow-hidden group ${
                isActive
                  ? 'bg-white border-indigo-400 shadow-md ring-2 ring-indigo-200'
                  : 'bg-white border-slate-100 hover:border-indigo-200 shadow-xs hover:shadow-sm'
              }`}
            >
              {/* Top row: Icon badge on right + Diagonal arrow icon on left (like screenshot) */}
              <div className="w-full flex items-center justify-between">
                {renderCardIcon(tense.id, tense.badgeColor)}
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Pure Persian Title & Concept */}
              <div className="mt-3">
                <h4 className="text-base font-black text-slate-800 leading-tight">
                  {tense.nameFa}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {tense.shortConcept}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= SELECTED TENSE DETAILS WITH LTR FORMULA VISUALIZER ================= */}
      {activeTense && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-800">{activeTense.nameFa}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{activeTense.shortConcept}</p>
            </div>
            {renderCardIcon(activeTense.id, activeTense.badgeColor)}
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold block mb-1 text-slate-800">این ساختار دقیقاً چه زمانی استفاده می‌شود؟</span>
            {activeTense.description}
          </div>

                    {/* ۱) فرمول ساده ساخت جمله */}
          {simpleFormula && (
            <div className="rounded-2xl p-[1.5px] bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-400 shadow-sm">
              <div className="bg-white rounded-[14px] px-3 py-3 flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  فرمول ساخت جمله
                </span>
                <p
                  dir="ltr"
                  className="font-en text-[13px] sm:text-base font-black text-slate-800 text-center leading-relaxed break-words max-w-full"
                >
                  {simpleFormula}
                </p>
              </div>
            </div>
          )}

          {/* ۲) کجا به کار می‌رود؟ (آکاردئونی) */}
          {usages.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 overflow-hidden">
              <button
                type="button"
                onClick={() => setUsagesOpenFor(usagesOpen ? null : activeTense.id)}
                aria-expanded={usagesOpen}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-3 text-right"
              >
                <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  {activeTense.nameFa.split(' (')[0]} کجاها به کار می‌رود؟
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${usagesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {usagesOpen && (
                <div className="flex flex-col gap-2 px-3 pb-3 animate-fade-in">
                  {usages.map((u, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-3 flex gap-3 shadow-2xs">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center">
                        {(idx + 1).toLocaleString('fa-IR')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">{u.whenFa}</p>
                        <div className="mt-1.5 bg-slate-50 rounded-xl p-2">
                          <span className="text-[10px] text-slate-400 block">مثال:</span>
                          <p dir="ltr" className="font-en text-sm font-bold text-indigo-700 text-left">{u.en}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">{u.fa}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FORMULAS DISPLAYED FROM LEFT TO RIGHT WITH VISUALIZER */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              فرمول ساخت جمله:
            </span>

            <div className="flex flex-col gap-3">
              {/* Positive formula */}
              <FormulaVisualizer
                titleFa="جمله مثبت"
                type="positive"
                steps={activeTense.formulaSteps.positive}
                sentenceExample={activeTense.examples[0]}
              />

              {/* Negative formula */}
              <FormulaVisualizer
                titleFa="جمله منفی"
                type="negative"
                steps={activeTense.formulaSteps.negative}
                sentenceExample={activeTense.examples[1]}
              />

              {/* Question formula */}
              <FormulaVisualizer
                titleFa="جمله سوالی"
                type="question"
                steps={activeTense.formulaSteps.question}
                sentenceExample={activeTense.examples[2]}
              />
            </div>
          </div>

          {/* Persian Comparison */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950">
            <span className="font-bold block mb-0.5">مقایسه با زبان فارسی:</span>
            <p className="leading-relaxed">{activeTense.persianComparison}</p>
          </div>

          {/* Simple English Examples */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              مثال‌های ساده انگلیسی با کلمات سطح پایه روزمره:
            </span>
            <div className="flex flex-col gap-2">
              {activeTense.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p dir="ltr" className="font-en text-sm font-bold text-indigo-700 text-left">
                      {ex.en}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{ex.fa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time markers */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1.5">
              نشانه‌ها و قیدهای زمانی رایج (معنی فارسی):
            </span>
            <div className="flex flex-wrap gap-2">
              {activeTense.timeMarkers.map((tm, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-xl text-xs text-slate-700"
                >
                  <strong dir="ltr" className="font-en">{tm.en}</strong>
                  <span className="text-slate-400">({tm.fa})</span>
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isLearned) return;
              onMarkTenseLearned?.(activeTense.id);
              try { confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } }); } catch {}
            }}
            className={`w-full py-3 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isLearned ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isLearned ? 'این زمان رو یاد گرفتی 🎉' : 'این زمان رو یاد گرفتم'}
          </button>
        </div>
      )}
    </div>
  );
};
