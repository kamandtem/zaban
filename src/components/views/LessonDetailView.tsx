import React, { useState } from 'react';
import { Lesson, UserProgress } from '../../types';
import { ExerciseModal } from '../ExerciseModal';
import { FormulaVisualizer } from '../FormulaVisualizer';
import { AuxChip } from '../../utils/auxiliaryColors';
import {
  ArrowRight,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RotateCw,
  Clock,
  Bookmark,
  BookmarkCheck,
  Layers,
  HelpCircle
} from 'lucide-react';

interface LessonDetailViewProps {
  lesson: Lesson;
  progress: UserProgress;
  onBack: () => void;
  onCompleteLesson: (lessonId: number) => void;
  onRecordMistake: (questionText: string, wrongAnswer: string, correctAnswer: string, explanation: string) => void;
  onToggleBookmarkWord: (word: string) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  progress,
  onBack,
  onCompleteLesson,
  onRecordMistake,
  onToggleBookmarkWord,
}) => {
  const [isExerciseOpen, setIsExerciseOpen] = useState<boolean>(false);
  const isCompleted = progress.completedLessons.includes(lesson.id);

  const handleExerciseComplete = (correctCount: number, totalCount: number) => {
    if (correctCount >= Math.ceil(totalCount * 0.6)) {
      onCompleteLesson(lesson.id);
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-36 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست درس‌ها</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          درس <span className="font-en">{lesson.id}</span> • <span className="font-en">{lesson.estimatedMinutes}</span> دقیقه
        </span>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
            {lesson.badge}
          </span>
          {isCompleted && (
            <span className="text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>پاس شده</span>
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-black">{lesson.titleFa}</h2>
        <p className="text-xs sm:text-sm text-indigo-100 mt-1">{lesson.titleEn}</p>
      </div>

      {/* SPECIAL COLOR MAP FOR AUXILIARY VERBS (LESSON 4 SPECIFIC REQUEST) */}
      {lesson.id === 4 && (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-200 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="text-sm font-black text-slate-800">
              نقشه رنگی و طیف افعال کمکی (حالت گذشته = رنگ غلیظ‌تر همان خانواده)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Family 1: have / has / had */}
            <div className="bg-purple-50/60 p-3 rounded-2xl border border-purple-200">
              <span className="text-xs font-bold text-purple-900 block mb-1">
                خانواده Have (یاسی تا بنفش پررنگ):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <AuxChip verb="have" showTenseLabel />
                <AuxChip verb="has" showTenseLabel />
                <span className="text-slate-400 text-xs">➜ گذشته:</span>
                <AuxChip verb="had" showTenseLabel />
              </div>
            </div>

            {/* Family 2: be / am / is / are / was / were */}
            <div className="bg-sky-50/60 p-3 rounded-2xl border border-sky-200">
              <span className="text-xs font-bold text-sky-900 block mb-1">
                خانواده Be (نیلی و آبی تا سرمه‌ای تیره):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <AuxChip verb="am" showTenseLabel />
                <AuxChip verb="is" showTenseLabel />
                <AuxChip verb="are" showTenseLabel />
                <span className="text-slate-400 text-xs">➜ گذشته:</span>
                <AuxChip verb="was" showTenseLabel />
                <AuxChip verb="were" showTenseLabel />
              </div>
            </div>

            {/* Family 3: do / does / did */}
            <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900 block mb-1">
                خانواده Do (سبز روشن تا یشمی تیره):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <AuxChip verb="do" showTenseLabel />
                <AuxChip verb="does" showTenseLabel />
                <span className="text-slate-400 text-xs">➜ گذشته:</span>
                <AuxChip verb="did" showTenseLabel />
              </div>
            </div>

            {/* Family 4: will / won't */}
            <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                نشانه آینده Will (طیف کهربایی):
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <AuxChip verb="will" showTenseLabel />
                <AuxChip verb="won't" showTenseLabel />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. ایده اصلی (MAIN CONCEPT) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <h3 className="text-sm font-bold text-indigo-600 flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold">
            ۱
          </span>
          <span>این درس را ساده یاد بگیریم</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {lesson.mainIdea}
        </p>
      </div>

      {/* 2. مقایسه با زبان فارسی (PERSIAN COMPARISON) */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-900">
            ۲
          </span>
          <span>تفاوت این ساختار با فارسی</span>
        </h3>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          {lesson.persianComparison}
        </p>
      </div>

      {/* 3. فرمول‌ها (FORMULAS - STRICTLY LEFT TO RIGHT) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-indigo-600 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold">
              ۳
            </span>
            <span>فرمول جمله‌سازی با رنگ‌بندی</span>
          </h3>
        </div>

        {lesson.formulas.positiveSteps ? (
          <>
            <FormulaVisualizer
              titleFa="جمله مثبت"
              type="positive"
              steps={lesson.formulas.positiveSteps}
              sentenceExample={lesson.examples[0]}
            />
            {lesson.formulas.negativeSteps && (
              <FormulaVisualizer
                titleFa="جمله منفی"
                type="negative"
                steps={lesson.formulas.negativeSteps}
                sentenceExample={lesson.examples[1]}
              />
            )}
            {lesson.formulas.questionSteps && (
              <FormulaVisualizer
                titleFa="جمله سوالی"
                type="question"
                steps={lesson.formulas.questionSteps}
                sentenceExample={lesson.examples[2]}
              />
            )}
          </>
        ) : (
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col gap-2.5">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <span className="text-[11px] font-bold text-emerald-700 block mb-1">
                حالت مثبت (+):
              </span>
              <p dir="rtl" className="text-xs sm:text-sm font-bold text-slate-800 text-right leading-8">
                {lesson.formulas.positive.split(/(فاعل|مفعول|فعل کمکی|فعل اصلی|شکل ساده فعل|شکل سوم فعل|شکل گذشته فعل|کلمه پرسشی|فعل)/g).map((part, i) => {
                  const tone = part === 'فاعل' ? 'bg-sky-100 text-sky-800' : part === 'مفعول' ? 'bg-purple-100 text-purple-800' : part.includes('فعل') ? 'bg-emerald-100 text-emerald-800' : part === 'کلمه پرسشی' ? 'bg-pink-100 text-pink-800' : '';
                  return tone ? <span key={i} className={`inline-block mx-0.5 px-2 py-0.5 rounded-lg ${tone}`}>{part}</span> : <span key={i}>{part}</span>;
                })}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <span className="text-[11px] font-bold text-rose-700 block mb-1">
                حالت منفی (-):
              </span>
              <p dir="rtl" className="text-xs sm:text-sm font-bold text-slate-800 text-right leading-8">
                {lesson.formulas.negative.split(/(فاعل|مفعول|فعل کمکی|فعل اصلی|شکل ساده فعل|شکل سوم فعل|شکل گذشته فعل|کلمه پرسشی|فعل)/g).map((part, i) => {
                  const tone = part === 'فاعل' ? 'bg-sky-100 text-sky-800' : part === 'مفعول' ? 'bg-purple-100 text-purple-800' : part.includes('فعل') ? 'bg-emerald-100 text-emerald-800' : part === 'کلمه پرسشی' ? 'bg-pink-100 text-pink-800' : '';
                  return tone ? <span key={i} className={`inline-block mx-0.5 px-2 py-0.5 rounded-lg ${tone}`}>{part}</span> : <span key={i}>{part}</span>;
                })}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <span className="text-[11px] font-bold text-sky-700 block mb-1">
                حالت سوالی (؟):
              </span>
              <p dir="rtl" className="text-xs sm:text-sm font-bold text-slate-800 text-right leading-8">
                {lesson.formulas.question.split(/(فاعل|مفعول|فعل کمکی|فعل اصلی|شکل ساده فعل|شکل سوم فعل|شکل گذشته فعل|کلمه پرسشی|فعل)/g).map((part, i) => {
                  const tone = part === 'فاعل' ? 'bg-sky-100 text-sky-800' : part === 'مفعول' ? 'bg-purple-100 text-purple-800' : part.includes('فعل') ? 'bg-emerald-100 text-emerald-800' : part === 'کلمه پرسشی' ? 'bg-pink-100 text-pink-800' : '';
                  return tone ? <span key={i} className={`inline-block mx-0.5 px-2 py-0.5 rounded-lg ${tone}`}>{part}</span> : <span key={i}>{part}</span>;
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. مثال‌ها (EXAMPLES) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <h3 className="text-sm font-bold text-indigo-600 flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold">
            ۴
          </span>
          <span>مثال‌های کوتاه و کاربردی روزمره</span>
        </h3>

        <div className="flex flex-col gap-3">
          {lesson.examples.map((ex, idx) => (
            <div
              key={idx}
              className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between gap-3"
            >
              <div className="flex-1">
                <p dir="ltr" className="font-en text-sm sm:text-base font-bold text-indigo-800 text-left">
                  {ex.en}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">{ex.fa}</p>
                {ex.breakdown && (
                  <div className="text-[11px] text-indigo-600 mt-1 border-t border-slate-200/60 pt-1 flex flex-col gap-0.5">
                    <span className="font-bold">🔍 تجزیه اجزا:</span>
                    {ex.breakdown.split(/\s*(?:\+|\||→|->)\s*/).filter(Boolean).map((part, partIdx) => (
                      <span key={partIdx} dir="auto" className="leading-relaxed">{part}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. واژگان کلیدی این درس (VOCABULARY) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <h3 className="text-sm font-bold text-indigo-600 flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold">
            ۵
          </span>
          <span>واژگان کاربردی مرتبط با این درس</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {lesson.vocabulary.map((w) => {
            const isBookmarked = progress.bookmarkedWords.includes(w.word.toLowerCase());

            return (
              <div
                key={w.id}
                className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span dir="ltr" className="font-en font-bold text-slate-800 text-sm">
                      {w.word}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 mt-0.5 block">
                    {w.meaningFa}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onToggleBookmarkWord(w.word)}
                    aria-label={`نشان کردن کلمه ${w.word}`}
                    className="w-7 h-7 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-amber-500 flex items-center justify-center transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. اشتباه رایج فارسی‌زبان‌ها (COMMON MISTAKE) */}
      <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <span>اشتباه بسیار رایج فارسی‌زبان‌ها</span>
        </h3>

        <div className="space-y-2 mt-3">
          <div className="flex items-center gap-2 text-xs text-rose-700 bg-white/80 p-2 rounded-xl border border-rose-100">
            <span className="font-bold shrink-0">❌ شکل نادرست:</span>
            <span dir="ltr" className="font-en line-through text-slate-500">
              {lesson.commonMistake.wrong}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-white/80 p-2 rounded-xl border border-emerald-100">
            <span className="font-bold shrink-0">✅ شکل درست:</span>
            <span dir="ltr" className="font-en font-bold text-emerald-700">
              {lesson.commonMistake.correct}
            </span>
          </div>

          <p className="text-xs text-rose-900 mt-2 leading-relaxed">
            💡 <strong>چرا؟</strong> {lesson.commonMistake.reason}
          </p>
        </div>
      </div>

      {/* 7. تمرین تعاملی ۴ گانه (PRACTICE CTA) */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-3xl p-5 shadow-xs flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
          <RotateCw className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-800">
            تمرین تعاملی این درس (چرخ انتخاب، مرتب‌سازی و جای خالی)
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            ۴ تمرین متنوع برای تثبیت کامل این مبحث منتظر شماست.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExerciseOpen(true)}
          className="mt-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>شروع تمرین‌های درس <span className="font-en">{lesson.id}</span></span>
        </button>
      </div>

      {/* 9. مرور سریع چند ثانیه‌ای (QUICK REVIEW) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>مرور سریع درس در ۳۰ ثانیه</span>
        </h3>

        <ul className="space-y-2">
          {lesson.quickReview.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive Exercises Modal */}
      {isExerciseOpen && (
        <ExerciseModal
          title={lesson.titleFa}
          exercises={lesson.exercises}
          isOpen={isExerciseOpen}
          onClose={() => setIsExerciseOpen(false)}
          onCompleteExercise={handleExerciseComplete}
          onRecordMistake={onRecordMistake}
        />
      )}
    </div>
  );
};
