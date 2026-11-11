import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LessonExercise, WheelExerciseItem, WordOrderExerciseItem, MultipleChoiceExerciseItem, FillBlankExerciseItem } from '../types';
import { WheelSelector } from './WheelSelector';
import { validateWheelAnswer, validateWordOrder } from '../utils/grammarRules';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, ArrowLeft, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseModalProps {
  title: string;
  exercises: LessonExercise[];
  isOpen: boolean;
  onClose: () => void;
  onCompleteExercise: (correctCount: number, totalCount: number) => void;
  onRecordMistake: (questionText: string, wrongAnswer: string, correctAnswer: string, explanation: string) => void;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  title,
  exercises,
  isOpen,
  onClose,
  onCompleteExercise,
  onRecordMistake,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedWheelIndex, setSelectedWheelIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [selectedBlank, setSelectedBlank] = useState<string | null>(null);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentExercise = exercises[currentIndex];
  const feedbackRef = useRef<HTMLDivElement>(null);

  // هر بار که مودال باز می‌شود از اول شروع شود (قبلاً صفحه‌ی «پایان» یا امتیاز قبلی می‌ماند)
  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  }, [isOpen]);

  // قفل اسکرول صفحه‌ی پشت مودال تا صفحه با لمس تمرین جابه‌جا نشود
  useEffect(() => {
    if (!isOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [isOpen]);

  // بعد از «بررسی پاسخ»، بازخورد در دید بیاید (بدون اینکه اندازه‌ی مودال تغییر کند)
  useEffect(() => {
    if (hasChecked) feedbackRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [hasChecked]);

  // Initialize state when current exercise changes
  useEffect(() => {
    if (!currentExercise) return;
    setHasChecked(false);
    setIsCorrect(false);
    setSelectedChoice(null);
    setSelectedBlank(null);

    if (currentExercise.type === 'wheel') {
      setSelectedWheelIndex(0);
    } else if (currentExercise.type === 'word_order') {
      setAssembledWords([]);
      setAvailableWords([...currentExercise.scrambledWords]);
    }
  }, [currentIndex, currentExercise]);

  if (!isOpen || !currentExercise) return null;

  // Word order handlers
  const handlePickWord = (word: string, index: number) => {
    if (hasChecked) return;
    const newAvail = [...availableWords];
    newAvail.splice(index, 1);
    setAvailableWords(newAvail);
    setAssembledWords([...assembledWords, word]);
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (hasChecked) return;
    const newAssembled = [...assembledWords];
    newAssembled.splice(index, 1);
    setAssembledWords(newAssembled);
    setAvailableWords([...availableWords, word]);
  };

  const handleResetWordOrder = () => {
    if (currentExercise.type === 'word_order') {
      setAssembledWords([]);
      setAvailableWords([...currentExercise.scrambledWords]);
    }
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    if (hasChecked) return;
    let correct = false;
    let wrongText = '';
    let correctText = '';

    if (currentExercise.type === 'wheel') {
      const selected = currentExercise.options[selectedWheelIndex];
      correct = validateWheelAnswer(selected, currentExercise.correctOption);
      wrongText = selected;
      correctText = currentExercise.correctOption;
    } else if (currentExercise.type === 'word_order') {
      correct = validateWordOrder(assembledWords, currentExercise.correctSentence);
      wrongText = assembledWords.join(' ');
      correctText = currentExercise.correctSentence;
    } else if (currentExercise.type === 'multiple_choice') {
      correct = selectedChoice === currentExercise.correctIndex;
      wrongText = selectedChoice !== null ? currentExercise.options[selectedChoice] : 'پاسخ داده نشد';
      correctText = currentExercise.options[currentExercise.correctIndex];
    } else if (currentExercise.type === 'fill_blank') {
      correct = selectedBlank === currentExercise.correctOption;
      wrongText = selectedBlank || 'پاسخ داده نشد';
      correctText = currentExercise.correctOption;
    }

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      setScore(prev => prev + 1);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    } else {
      const qText = currentExercise.sentenceWithBlank || currentExercise.promptFa;
      onRecordMistake(qText, wrongText, correctText, currentExercise.explanation);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      onCompleteExercise(score + (isCorrect ? 1 : 0), exercises.length);
    }
  };

  return createPortal((
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
      style={{ overscrollBehavior: 'contain' }}
    >
      {/* ارتفاع ثابت: اندازه‌ی مودال بین انواع تمرین و بعد از بازخورد تغییر نمی‌کند */}
      <div className="exercise-sheet bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-scale-up">
        {/* Top bar with progress and title */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              تمرین تعاملی
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 mt-1">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 font-en">
              {currentIndex + 1} / {exercises.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress line */}
        <div className="w-full bg-slate-100 h-1.5 shrink-0">
          <div
            className="bg-indigo-600 h-1.5 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>

        {/* Main Content Area */}
        <div
          className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 flex flex-col"
          style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
        >
          {!isFinished ? (
            <>
              {/* Prompt */}
              <div className="mb-4">
                <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
                  {currentExercise.promptFa}
                </p>
                {currentExercise.type === 'wheel' && (currentExercise as WheelExerciseItem).categoryTag && (
                  <span className="inline-block mt-1 text-[11px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    موضوع: {(currentExercise as WheelExerciseItem).categoryTag}
                  </span>
                )}
              </div>

              {/* RENDER SPECIFIC EXERCISE TYPE */}
              {/* 1. WHEEL SELECTOR EXERCISE (Landmark Feature!) */}
              {currentExercise.type === 'wheel' && (
                <div className="flex flex-col items-center justify-center my-auto py-2">
                  {/* Dynamic Sentence Preview updating live with wheel selection */}
                  <div
                    dir="ltr"
                    className="w-full text-center p-3.5 min-h-[76px] flex flex-wrap items-center justify-center gap-y-1 bg-slate-50 border border-slate-200 rounded-2xl mb-4 font-en text-lg sm:text-xl font-bold text-slate-800"
                  >
                    <span>{(currentExercise as WheelExerciseItem).prefixText}</span>
                    <span className="inline-block mx-1.5 px-3 py-0.5 bg-indigo-600 text-white rounded-xl shadow-xs">
                      {(currentExercise as WheelExerciseItem).options[selectedWheelIndex]}
                    </span>
                    <span>{(currentExercise as WheelExerciseItem).suffixText}</span>
                  </div>

                  {/* Tactile Drum Wheel Picker */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-sm w-full max-w-[280px]">
                    <WheelSelector
                      options={(currentExercise as WheelExerciseItem).options}
                      selectedIndex={selectedWheelIndex}
                      onSelect={(idx) => setSelectedWheelIndex(idx)}
                      disabled={hasChecked}
                    />
                  </div>
                </div>
              )}

              {/* 2. WORD ORDER EXERCISE */}
              {currentExercise.type === 'word_order' && (
                <div className="flex flex-col gap-4 my-auto">
                  {/* Target Persian Meaning */}
                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-sm text-indigo-900 font-medium">
                    معنی جمله: {(currentExercise as WordOrderExerciseItem).meaningFa}
                  </div>

                  {/* Assembled Sentence Box */}
                  <div
                    dir="ltr"
                    className="min-h-[70px] p-3 bg-slate-50 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-wrap gap-2 items-center"
                  >
                    {assembledWords.length === 0 ? (
                      <span className="text-slate-400 text-sm italic">
                        روی کلمات زیر ضربه بزنید تا جمله تشکیل شود...
                      </span>
                    ) : (
                      assembledWords.map((word, idx) => (
                        <button
                          key={`${word}-${idx}`}
                          type="button"
                          onClick={() => handleRemoveWord(word, idx)}
                          disabled={hasChecked}
                          className="px-3 py-1.5 bg-indigo-600 text-white font-en font-medium rounded-xl text-sm shadow-xs hover:bg-rose-500 transition-colors"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available scrambled words */}
                  <div dir="ltr" className="flex flex-wrap gap-2 justify-center">
                    {availableWords.map((word, idx) => (
                      <button
                        key={`${word}-${idx}`}
                        type="button"
                        onClick={() => handlePickWord(word, idx)}
                        disabled={hasChecked}
                        className="px-3.5 py-2 bg-white border border-slate-200 text-slate-800 font-en font-semibold rounded-xl text-sm shadow-xs hover:border-indigo-500 hover:bg-indigo-50/50 active:scale-95 transition-all"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {/* Reset words button */}
                  {!hasChecked && assembledWords.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetWordOrder}
                      className="self-center flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors mt-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>چیدن دوباره از اول</span>
                    </button>
                  )}
                </div>
              )}

              {/* 3. MULTIPLE CHOICE EXERCISE */}
              {currentExercise.type === 'multiple_choice' && (
                <div className="flex flex-col gap-3 my-auto">
                  <div
                    dir="ltr"
                    className="p-3 bg-slate-50 rounded-2xl font-en font-bold text-slate-800 text-base border border-slate-200"
                  >
                    {(currentExercise as MultipleChoiceExerciseItem).questionEn}
                  </div>

                  <div className="flex flex-col gap-2">
                    {(currentExercise as MultipleChoiceExerciseItem).options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => !hasChecked && setSelectedChoice(idx)}
                        disabled={hasChecked}
                        dir="ltr"
                        className={`p-3.5 rounded-2xl text-left font-en text-sm font-semibold border transition-colors select-none touch-manipulation ${
                          selectedChoice === idx
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="inline-block w-6 text-xs opacity-70">
                          {['A', 'B', 'C', 'D'][idx]}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. FILL IN BLANK EXERCISE */}
              {currentExercise.type === 'fill_blank' && (
                <div className="flex flex-col gap-4 my-auto">
                  <div
                    dir="ltr"
                    className="p-4 bg-slate-50 rounded-2xl font-en font-bold text-slate-800 text-base sm:text-lg border border-slate-200 text-center"
                  >
                    {(currentExercise as FillBlankExerciseItem).sentenceWithBlank}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {(currentExercise as FillBlankExerciseItem).options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => !hasChecked && setSelectedBlank(opt)}
                        disabled={hasChecked}
                        dir="ltr"
                        className={`p-3 rounded-2xl font-en font-semibold text-center border transition-colors select-none touch-manipulation ${
                          selectedBlank === opt
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FEEDBACK SECTION UPON CHECKING */}
              {hasChecked && (
                <div
                  ref={feedbackRef}
                  className={`mt-4 p-4 rounded-2xl border animate-fade-in shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/90 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">
                          {isCorrect ? 'آفرین، کاملاً درسته! 🎉' : 'نیاز به مرور دارد'}
                        </span>
                      </div>
                      <p className="text-xs mt-1 leading-relaxed">{currentExercise.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* FINISHED STATE */
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">تمرین با موفقیت تکمیل شد!</h3>
              <p className="text-sm text-slate-600 mt-2">
                از مجموع <span className="font-en font-bold text-indigo-600">{exercises.length}</span> سوال، به{' '}
                <span className="font-en font-bold text-emerald-600">{score}</span> سوال پاسخ درست دادی.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95"
              >
                بازگشت به درس
              </button>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        {!isFinished && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500">
              {hasChecked ? 'برای سوال بعدی ادامه را بزنید' : 'پاسخ خود را انتخاب و بررسی کنید'}
            </span>
            {!hasChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>بررسی پاسخ</span>
                <Sparkles className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{currentIndex < exercises.length - 1 ? 'سوال بعدی' : 'مشاهده نتیجه'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  ), document.body);
};
