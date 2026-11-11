import React from 'react';

export interface AuxColorConfig {
  bg: string;
  text: string;
  border: string;
  badge: string;
  family: string;
  tense: 'present' | 'past' | 'future';
}

/**
 * Consistent color palette for auxiliary verbs across the app:
 * - have / has: soft lilac / lavender
 * - had: deep rich purple (past)
 * - am: light indigo
 * - is: soft sky blue
 * - are: medium cobalt blue
 * - was / were: deep navy blue (past)
 * - do / does: light emerald green
 * - did: deep forest green (past)
 * - will / won't: warm amber / orange
 */
export const auxColorMap: Record<string, AuxColorConfig> = {
  // have / has / had
  have: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', badge: 'bg-purple-200 text-purple-900', family: 'have', tense: 'present' },
  has: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', badge: 'bg-purple-200 text-purple-900', family: 'have', tense: 'present' },
  "haven't": { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-400', badge: 'bg-purple-200 text-purple-900', family: 'have', tense: 'present' },
  "hasn't": { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-400', badge: 'bg-purple-200 text-purple-900', family: 'have', tense: 'present' },
  had: { bg: 'bg-purple-900', text: 'text-purple-50', border: 'border-purple-950', badge: 'bg-purple-950 text-purple-200', family: 'have', tense: 'past' },
  "hadn't": { bg: 'bg-purple-900', text: 'text-purple-50', border: 'border-purple-950', badge: 'bg-purple-950 text-purple-200', family: 'have', tense: 'past' },

  // am / is / are / was / were
  am: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300', badge: 'bg-indigo-200 text-indigo-900', family: 'be', tense: 'present' },
  is: { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-300', badge: 'bg-sky-200 text-sky-900', family: 'be', tense: 'present' },
  "isn't": { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-400', badge: 'bg-sky-200 text-sky-900', family: 'be', tense: 'present' },
  are: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', badge: 'bg-blue-200 text-blue-900', family: 'be', tense: 'present' },
  "aren't": { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-400', badge: 'bg-blue-200 text-blue-900', family: 'be', tense: 'present' },
  was: { bg: 'bg-blue-900', text: 'text-blue-50', border: 'border-blue-950', badge: 'bg-blue-950 text-blue-200', family: 'be', tense: 'past' },
  "wasn't": { bg: 'bg-blue-900', text: 'text-blue-50', border: 'border-blue-950', badge: 'bg-blue-950 text-blue-200', family: 'be', tense: 'past' },
  were: { bg: 'bg-indigo-950', text: 'text-indigo-50', border: 'border-indigo-950', badge: 'bg-slate-900 text-indigo-200', family: 'be', tense: 'past' },
  "weren't": { bg: 'bg-indigo-950', text: 'text-indigo-50', border: 'border-indigo-950', badge: 'bg-slate-900 text-indigo-200', family: 'be', tense: 'past' },

  // do / does / did
  do: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', badge: 'bg-emerald-200 text-emerald-900', family: 'do', tense: 'present' },
  does: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', badge: 'bg-emerald-200 text-emerald-900', family: 'do', tense: 'present' },
  "don't": { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-400', badge: 'bg-emerald-200 text-emerald-900', family: 'do', tense: 'present' },
  "doesn't": { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-400', badge: 'bg-emerald-200 text-emerald-900', family: 'do', tense: 'present' },
  did: { bg: 'bg-emerald-900', text: 'text-emerald-50', border: 'border-emerald-950', badge: 'bg-emerald-950 text-emerald-200', family: 'do', tense: 'past' },
  "didn't": { bg: 'bg-emerald-900', text: 'text-emerald-50', border: 'border-emerald-950', badge: 'bg-emerald-950 text-emerald-200', family: 'do', tense: 'past' },

  // will / won't
  will: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', badge: 'bg-amber-200 text-amber-900', family: 'will', tense: 'future' },
  "won't": { bg: 'bg-amber-500 text-white', text: 'text-white', border: 'border-amber-600', badge: 'bg-amber-600 text-white', family: 'will', tense: 'future' },
  "will not": { bg: 'bg-amber-500 text-white', text: 'text-white', border: 'border-amber-600', badge: 'bg-amber-600 text-white', family: 'will', tense: 'future' },
};

export const AuxChip: React.FC<{
  verb: string;
  showTenseLabel?: boolean;
  className?: string;
  compact?: boolean;
}> = ({ verb, showTenseLabel = false, className = '', compact = false }) => {
  const cleanVerb = verb.trim().toLowerCase();
  const config = auxColorMap[cleanVerb] || {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-300',
    badge: 'bg-slate-200 text-slate-700',
    family: 'other',
    tense: 'present',
  };

  const tenseLabelFa =
    config.tense === 'past' ? 'گذشته' : config.tense === 'future' ? 'آینده' : 'حال';

  return (
    <span
      dir="ltr"
      className={`inline-flex items-center justify-center max-w-full break-words text-center ${compact ? 'gap-1 px-1 py-0.5 rounded-lg text-[11px] leading-tight' : 'gap-1.5 px-2.5 py-0.5 rounded-xl text-xs'} border font-en font-bold shadow-2xs ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span>{verb}</span>
      {showTenseLabel && (
        <span
          dir="rtl"
          className={`text-[9px] font-fa font-normal px-1 py-0.2 rounded-md ${config.badge}`}
        >
          {tenseLabelFa}
        </span>
      )}
    </span>
  );
};
