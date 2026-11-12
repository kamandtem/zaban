import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { auxTextColor } from '../utils/auxiliaryColors';

export interface FormulaStep {
  roleFa: string; // e.g. "فاعل"
  roleEn?: string; // e.g. "Subject"
  example: string; // e.g. "I", "am", "eating", "an apple"
  color?: string; // color style
  auxVerb?: string; // if it's an auxiliary, link to auxColorMap
  noteFa?: string; // e.g. "شکل ساده", "ing دار"
}

interface FormulaVisualizerProps {
  titleFa: string;
  steps: FormulaStep[];
  type?: 'positive' | 'negative' | 'question' | 'request';
  sentenceExample?: {
    en: string;
    fa: string;
  };
}

export const FormulaVisualizer: React.FC<FormulaVisualizerProps> = ({
  titleFa,
  steps,
  type = 'positive',
  sentenceExample,
}) => {
  const [animatedStep, setAnimatedStep] = useState<number>(steps.length);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  const handleReplay = () => {
    setIsReplaying(true);
    setAnimatedStep(0);
    steps.forEach((_, idx) => {
      setTimeout(() => {
        setAnimatedStep(idx + 1);
        if (idx === steps.length - 1) {
          setIsReplaying(false);
        }
      }, (idx + 1) * 350);
    });
  };

  const roleTone = (role: string) => {
    const value = role.toLowerCase();
    if (value.includes('فاعل')) return 'text-sky-700';
    if (value.includes('فعل کمکی') || value.includes('کمکی')) return 'text-amber-700';
    if (value.includes('فعل')) return 'text-emerald-700';
    if (value.includes('مفعول')) return 'text-purple-700';
    if (value.includes('صفت')) return 'text-pink-700';
    return 'text-slate-700';
  };

  const badgeColor =
    type === 'positive'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : type === 'negative'
      ? 'bg-rose-50 text-rose-800 border-rose-200'
      : type === 'request'
      ? 'bg-violet-50 text-violet-800 border-violet-200'
      : 'bg-sky-50 text-sky-800 border-sky-200';

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
      {/* Header with Title and Replay Animation Button */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
            {type === 'positive' ? 'جمله‌ی خبری' : type === 'negative' ? 'جمله‌ی منفی' : type === 'request' ? 'درخواست محترمانه' : 'جمله‌ی پرسشی'}
          </span>
          <span className="text-xs font-bold text-slate-700">{titleFa}</span>
        </div>

        <button
          type="button"
          onClick={handleReplay}
          disabled={isReplaying}
          aria-label="نمایش انیمیشنی ترتیب"
          className="w-8 h-8 text-indigo-600 hover:text-indigo-800 flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all active:scale-95 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-indigo-600" />
        </button>
      </div>


      {/* STRICT LEFT-TO-RIGHT FORMULA STEPS CONTAINER */}
      <div
        dir="ltr"
        className="w-full flex items-stretch gap-0.5 py-2 px-0 justify-start"
        style={{ direction: 'ltr', flexDirection: 'row' }}
      >
        {steps.map((step, idx) => {
          const isVisible = idx < animatedStep;

          return (
            <React.Fragment key={idx}>
              {/* Step Card */}
              <div
                className={`relative flex-1 basis-0 min-w-0 flex flex-col items-center justify-center px-1 py-2 transition-all duration-300 ${
                  isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-20 scale-95 translate-y-2'
                }`}
              >
                {/* Persian Role Title */}
                <span dir="rtl" className={`text-[10px] leading-tight font-bold text-center font-fa break-words w-full ${roleTone(step.roleFa)}`}>
                  {step.roleFa}
                </span>

                {/* Auxiliary colored chip OR normal word */}
                <div className="mt-1 flex items-center justify-center max-w-full">
                  {step.auxVerb ? (
                    <span dir="ltr" className={`font-en font-bold text-[11px] leading-tight text-center break-words max-w-full ${auxTextColor(step.auxVerb)}`}>
                      {step.auxVerb}
                    </span>
                  ) : (
                    <span className={`font-en font-bold text-[11px] leading-tight text-center break-words max-w-full ${roleTone(step.roleFa)}`}>
                      {step.example}
                    </span>
                  )}
                </div>

                {/* Additional Note (e.g. شکل ساده فعل) */}
                {step.noteFa && (
                  <span
                    dir="rtl"
                    className="text-[9px] leading-tight text-slate-500 font-fa text-center mt-1 break-words w-full"
                  >
                    {step.noteFa}
                  </span>
                )}
              </div>

              {/* Connecting Arrow between blocks (Left to Right) */}
              {idx < steps.length - 1 && (
                <div className="shrink-0 flex items-center justify-center text-indigo-400">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Real-life Natural Sentence Example */}
      {sentenceExample && (
        <div className="mt-1 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 border border-indigo-100 rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p dir="ltr" className="font-en text-sm font-bold text-slate-800 text-left">
              {sentenceExample.en}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">{sentenceExample.fa}</p>
          </div>
        </div>
      )}
    </div>
  );
};
