import React, { useState } from 'react';
import { wheelCategories } from '../../data/wheelExercisesData';
import { multiWheelChallenges, MultiWheelChallenge } from '../../data/multiWheelData';
import { WheelSelector } from '../WheelSelector';
import { validateWheelAnswer } from '../../utils/grammarRules';
import { AuxChip, auxColorMap } from '../../utils/auxiliaryColors';
import {
  RotateCw,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Flame,
  HelpCircle,
  Layers,
  Wand2,
  CircleDot,
  Target,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WheelArenaViewProps {
  onRecordMistake: (questionText: string, wrongAnswer: string, correctAnswer: string, explanation: string) => void;
  onIncrementScore: () => void;
}

export const WheelArenaView: React.FC<WheelArenaViewProps> = ({
  onRecordMistake,
  onIncrementScore,
}) => {
  // Mode: 'multi-slot' (user taps on subject, auxiliary, verb, time marker) OR 'single'
  const [arenaMode, setArenaMode] = useState<'multi-slot' | 'single'>('multi-slot');

  // Multi-Slot State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const currentChallenge = multiWheelChallenges[challengeIndex];
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  // Store selected index for each slot: { [slotId]: number }
  const [slotSelections, setSlotSelections] = useState<number[]>([0, 0, 0, 0]);

  // Single-wheel state
  const [selectedCatId, setSelectedCatId] = useState<string>('to-be');
  const [singleExIndex, setSingleExIndex] = useState<number>(0);
  const [singleWheelIndex, setSingleWheelIndex] = useState<number>(0);

  // Common feedback
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [sentenceTranslation, setSentenceTranslation] = useState<string>('');

  // When switching challenges
  const handleSelectChallenge = (idx: number) => {
    setChallengeIndex(idx);
    setActiveSlotIndex(0);
    setSlotSelections(multiWheelChallenges[idx].slots.map(s => s.defaultIndex));
    setHasChecked(false);
    setIsCorrect(false);
    setFeedbackText('');
  };

  // When selecting an option on current active slot
  const handleSlotOptionChange = (optionIndex: number) => {
    const updated = [...slotSelections];
    updated[activeSlotIndex] = optionIndex;
    setSlotSelections(updated);
    if (hasChecked) {
      setHasChecked(false);
      setIsCorrect(false);
    }
  };

  // Validate Multi-Slot Sentence
  const handleValidateMultiSlot = () => {
    const chosenValues = currentChallenge.slots.map(
      (slot, i) => slot.options[slotSelections[i] || 0]
    );

    // Look for matching valid combination
    const match = currentChallenge.validCombinations.find(combo => {
      return combo.slotsMatches.every((allowedList, slotIdx) => {
        const val = chosenValues[slotIdx];
        return allowedList.includes(val);
      });
    });

    if (match) {
      setIsCorrect(true);
      setHasChecked(true);
      setFeedbackText(match.explanation);
      setSentenceTranslation(match.translationFa);
      onIncrementScore();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {}

    } else {
      setIsCorrect(false);
      setHasChecked(true);
      const builtSentence = chosenValues.join(' ');
      setFeedbackText(
        `این ترکیب در زمان ${currentChallenge.targetTenseFa} از نظر گرامری ناهماهنگ است. روی قطعات مختلف ضربه بزنید و چرخ را تغییر دهید تا اجزا با هم هماهنگ شوند.`
      );
      onRecordMistake(
        builtSentence,
        builtSentence,
        'ترکیب هماهنگ گرامری',
        `ترکیب انتخاب شده در چرخ برای ${currentChallenge.targetTenseFa} همخوانی نداشت.`
      );
    }
  };

  // Single-wheel handlers
  const activeSingleCat =
    wheelCategories.find(c => c.id === selectedCatId) || wheelCategories[0];
  const currentSingleEx =
    activeSingleCat.exercises[singleExIndex] || activeSingleCat.exercises[0];

  const handleCheckSingle = () => {
    if (hasChecked) return;
    const selectedOption = currentSingleEx.options[singleWheelIndex];
    const correct = validateWheelAnswer(selectedOption, currentSingleEx.correctOption);

    setIsCorrect(correct);
    setHasChecked(true);
    setFeedbackText(currentSingleEx.explanation);

    if (correct) {
      onIncrementScore();
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {}
    } else {
      const qText = currentSingleEx.sentenceWithBlank || currentSingleEx.promptFa;
      onRecordMistake(
        qText,
        selectedOption,
        currentSingleEx.correctOption,
        currentSingleEx.explanation
      );
    }
  };

  const handleNextSingle = () => {
    if (singleExIndex < activeSingleCat.exercises.length - 1) {
      setSingleExIndex(prev => prev + 1);
    } else {
      setSingleExIndex(0);
    }
    setSingleWheelIndex(0);
    setHasChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="flex flex-col gap-4 pb-36 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1">
              <RotateCw className="w-3 h-3 animate-spin-slow" />
              <span>چرخ انتخاب هوشمند چندبخشی</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black">باشگاه جمله‌سازی</h2>
            <p className="text-xs text-purple-100 mt-0.5">
              روی هر قسمت جمله بکش یا گزینه‌های بالا و پایین را لمس کن تا فاعل، فعل کمکی، فعل اصلی و قید را تنظیم کنی.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Switch: راست = تمرین تک بخش، چپ = جمله چند بخشی */}
      <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            setArenaMode('single');
            setHasChecked(false);
            setIsCorrect(false);
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            arenaMode === 'single'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="inline-flex items-center justify-center gap-1.5"><CircleDot className="w-4 h-4" />تمرین تک‌بخش</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setArenaMode('multi-slot');
            setHasChecked(false);
            setIsCorrect(false);
          }}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            arenaMode === 'multi-slot'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="inline-flex items-center justify-center gap-1.5"><Target className="w-4 h-4" />جمله‌ی چندبخشی</span>
        </button>
      </div>

      {/* ================= MODE 1: MULTI-SLOT SENTENCE WHEEL ================= */}
      {arenaMode === 'multi-slot' && (
        <div className="flex flex-col gap-3.5">
          {/* Challenge Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {multiWheelChallenges.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => handleSelectChallenge(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  challengeIndex === idx
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {ch.targetTenseFa}
              </button>
            ))}
          </div>

          {/* Interactive Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col items-center">
            {/* Header info */}
            <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2 border-b border-slate-100 pb-2">
              <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md text-[11px]">
                هدف: {currentChallenge.targetTenseFa}
              </span>
              <span className="text-[11px] text-slate-400">
                چالش <span className="font-en">{challengeIndex + 1}</span> از <span className="font-en">{multiWheelChallenges.length}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-700 mb-3 text-center">
              {currentChallenge.instructionFa}
            </p>

            {/* LIVE SENTENCE SLOTS CONTAINER (LEFT TO RIGHT) */}
            <div
              dir="ltr"
              className="w-full max-w-lg p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-3 flex flex-wrap items-center justify-center gap-2 shadow-inner"
            >
              {currentChallenge.slots.map((slot, sIdx) => {
                const selectedWord = slot.options[slotSelections[sIdx] || 0];
                const isActive = activeSlotIndex === sIdx;
                const isAux = auxColorMap[selectedWord.toLowerCase()];

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => {
                      setActiveSlotIndex(sIdx);
                      if (hasChecked) setHasChecked(false);
                    }}
                    className={`relative flex flex-col items-center px-3 py-2 rounded-xl transition-all active:scale-95 border ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                        : isAux
                        ? `${isAux.bg} ${isAux.text} ${isAux.border}`
                        : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400'
                    }`}
                  >
                    <span className="font-en font-black text-sm sm:text-base">
                      {selectedWord}
                    </span>
                    <span
                      dir="rtl"
                      className={`text-[9px] mt-0.5 font-fa ${
                        isActive ? 'text-indigo-100 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {slot.labelFa}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Slot Controller Indicator */}
            <div className="text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full mb-1 flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>
                در حال تنظیم چرخ برای: <strong>{currentChallenge.slots[activeSlotIndex].labelFa}</strong>
              </span>
            </div>

            {/* THE TACTILE DRUM WHEEL PICKER CONNECTED TO ACTIVE SLOT */}
            <div className="w-full max-w-[270px] bg-slate-50/70 border border-slate-200/70 rounded-3xl p-2 shadow-inner my-1">
              <WheelSelector
                options={currentChallenge.slots[activeSlotIndex].options}
                selectedIndex={slotSelections[activeSlotIndex] || 0}
                onSelect={(idx) => handleSlotOptionChange(idx)}
                disabled={hasChecked && isCorrect}
              />
            </div>

            {/* Actions & Feedback */}
            <div className="w-full max-w-md mt-3">
              {!hasChecked ? (
                <button
                  type="button"
                  onClick={handleValidateMultiSlot}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>بررسی تطابق کل جمله</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
              ) : (
                <div className="flex flex-col gap-2.5 animate-fade-in">
                  <div
                    className={`p-3.5 rounded-2xl border text-right ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
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
                          <span className="font-bold text-xs sm:text-sm">
                            {isCorrect ? 'جمله کاملاً درست و هماهنگ است! 🎉' : 'نیاز به هماهنگی اجزا'}
                          </span>
                        </div>
                        <p className="text-xs mt-1 leading-relaxed">{feedbackText}</p>
                        {sentenceTranslation && (
                          <p className="text-xs font-semibold text-emerald-800 mt-1">
                            معنی: {sentenceTranslation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Button to try another or next challenge */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHasChecked(false)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                    >
                      تغییر گزینه‌ها
                    </button>
                    {isCorrect && challengeIndex < multiWheelChallenges.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleSelectChallenge(challengeIndex + 1)}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1"
                      >
                        <span>چالش بعدی</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: SINGLE-WHEEL PRACTICE ================= */}
      {arenaMode === 'single' && (
        <div className="flex flex-col gap-3.5">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {wheelCategories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setSingleExIndex(0);
                  setSingleWheelIndex(0);
                  setHasChecked(false);
                  setIsCorrect(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCatId === cat.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {cat.titleFa}
              </button>
            ))}
          </div>

          {/* Interactive Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2 border-b border-slate-100 pb-2">
              <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md text-[11px]">
                {currentSingleEx.categoryTag || activeSingleCat.titleFa}
              </span>
              <span className="text-xs font-semibold">
                سوال <span className="font-en">{singleExIndex + 1}</span> از <span className="font-en">{activeSingleCat.exercises.length}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed max-w-md mb-3">
              {currentSingleEx.promptFa}
            </p>

            {/* Live Sentence Preview Container */}
            <div
              dir="ltr"
              className="w-full max-w-md p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-3 font-en text-base sm:text-lg font-bold text-slate-800 shadow-inner flex items-center justify-center flex-wrap gap-1.5"
            >
              <span>{currentSingleEx.prefixText}</span>
              <span className="inline-block px-3 py-0.5 bg-indigo-600 text-white rounded-xl shadow-xs transition-all duration-200 scale-105">
                {currentSingleEx.options[singleWheelIndex]}
              </span>
              <span>{currentSingleEx.suffixText}</span>
            </div>

            {/* Drum Wheel */}
            <div className="w-full max-w-[270px] bg-slate-50/70 border border-slate-200/70 rounded-3xl p-2 shadow-inner my-1">
              <WheelSelector
                options={currentSingleEx.options}
                selectedIndex={singleWheelIndex}
                onSelect={(idx) => {
                  setSingleWheelIndex(idx);
                  if (hasChecked) setHasChecked(false);
                }}
                disabled={hasChecked && isCorrect}
              />
            </div>

            {/* Check button / feedback */}
            <div className="w-full max-w-md mt-3">
              {!hasChecked ? (
                <button
                  type="button"
                  onClick={handleCheckSingle}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>بررسی پاسخ</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
              ) : (
                <div className="flex flex-col gap-2.5 animate-fade-in">
                  <div
                    className={`p-3.5 rounded-2xl border text-right ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
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
                          <span className="font-bold text-xs sm:text-sm">
                            {isCorrect ? 'پاسخ کاملاً صحیح است! 🎉' : 'نادرست — نگران نباش!'}
                          </span>
                        </div>
                        <p className="text-xs mt-1 leading-relaxed">{feedbackText}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextSingle}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>سوال بعدی چرخ</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
