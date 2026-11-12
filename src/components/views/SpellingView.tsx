import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, RotateCcw, SpellCheck, X } from 'lucide-react';
import { allVocabulary } from '../../data/vocabularyData';
import type { UserProgress, VocabularyWord } from '../../types';
import { FREE_SPELLING_WORD_LIMIT, FREE_WORD_LIMIT } from '../../utils/premiumAccess';

interface SpellingViewProps {
  progress: UserProgress;
  onGoToCards: () => void;
  isPremium: boolean;
  onUpgrade: () => void;
}

const todayKey = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const SpellingView: React.FC<SpellingViewProps> = ({ progress, onGoToCards, isPremium, onUpgrade }) => {
  const today = todayKey();
  const allLeitnerWords = useMemo(() => {
    const availableVocabulary = isPremium ? allVocabulary : allVocabulary.slice(0, FREE_WORD_LIMIT);
    const inLeitner = availableVocabulary.filter(word => Boolean(progress.leitnerCards[word.id]));
    return inLeitner.sort((a, b) => {
      const aDue = progress.leitnerCards[a.id].dueDate <= today;
      const bDue = progress.leitnerCards[b.id].dueDate <= today;
      return Number(bDue) - Number(aDue) || progress.leitnerCards[a.id].dueDate.localeCompare(progress.leitnerCards[b.id].dueDate);
    });
  }, [progress.leitnerCards, today, isPremium]);
  const session = isPremium ? allLeitnerWords : allLeitnerWords.slice(0, FREE_SPELLING_WORD_LIMIT);
  const hasLockedWords = !isPremium && allLeitnerWords.length > FREE_SPELLING_WORD_LIMIT;
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const card: VocabularyWord | undefined = session[index];

  const challenge = useMemo(() => {
    if (!card) return { characters: [] as string[], hiddenPositions: [] as number[], letters: [] as { key: string; value: string }[] };
    const characters = Array.from(card.word);
    const positions: number[] = [];
    let letterNumber = 0;
    const seed = Array.from(card.id).reduce((total, char) => total + char.charCodeAt(0), 0);
    characters.forEach((character, position) => {
      if (!/[a-z]/i.test(character)) return;
      if ((letterNumber + seed) % 2 === 0) positions.push(position);
      letterNumber += 1;
    });
    if (!positions.length) {
      let lastLetter = -1;
      characters.forEach((character, position) => { if (/[a-z]/i.test(character)) lastLetter = position; });
      if (lastLetter >= 0) positions.push(lastLetter);
    }
    const letters = positions.map((position, key) => ({ key: `${card.id}-${position}-${key}`, value: characters[position] }));
    for (let i = letters.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return { characters, hiddenPositions: positions, letters };
  }, [card]);

  const isCorrect = chosen.length === challenge.hiddenPositions.length && chosen.every((key, position) => {
    const picked = challenge.letters.find(letter => letter.key === key);
    const expected = challenge.characters[challenge.hiddenPositions[position]];
    return picked?.value.toLowerCase() === expected?.toLowerCase();
  });

  const chooseLetter = (key: string) => {
    if (chosen.includes(key) || chosen.length >= challenge.hiddenPositions.length) return;
    setChosen(current => [...current, key]);
    setChecked(false);
  };
  const nextWord = () => {
    setIndex(current => Math.min(current + 1, session.length));
    setChosen([]);
    setChecked(false);
  };

  if (!session.length) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-5 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600"><SpellCheck className="h-8 w-8" /></div>
        <h2 className="text-xl font-black text-slate-800">املا</h2>
        <p className="max-w-sm text-sm leading-relaxed text-slate-500">این بخش از واژه‌هایی استفاده می‌کند که وارد جعبه‌ی لایتنر شده‌اند. اول چند کارت را مرور کن تا اینجا برایشان املا بسازی.</p>
        <button type="button" onClick={onGoToCards} className="mt-2 flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md active:scale-95">
          رفتن به جعبه‌ی لایتنر <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-5 py-16 text-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${hasLockedWords ? 'bg-violet-100 text-violet-700' : 'bg-emerald-50 text-emerald-600'}`}>
          {hasLockedWords ? <span className="text-xl font-black">۲۰</span> : <Check className="h-8 w-8" />}
        </div>
        <h2 className="text-xl font-black text-slate-800">{hasLockedWords ? 'به سقف رایگان املا رسیدی' : 'آفرین! املاها تمام شد.'}</h2>
        <p className="max-w-sm text-sm leading-relaxed text-slate-500">{hasLockedWords ? '۲۰ واژهٔ اول رایگان است. برای املا و تمرین همهٔ واژه‌ها نسخهٔ کامل را تهیه کن.' : 'برای تمرین دوباره، از اول شروع کن.'}</p>
        {hasLockedWords ? (
          <button type="button" onClick={onUpgrade} className="rounded-2xl bg-indigo-700 px-5 py-3 text-sm font-black text-white shadow-md">بازکردن املا برای همهٔ واژه‌ها</button>
        ) : (
          <button type="button" onClick={() => { setIndex(0); setChosen([]); setChecked(false); }} className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white active:scale-95">شروع دوباره</button>
        )}
      </div>
    );
  }

  const placedLetters = new Map(challenge.hiddenPositions.map((position, slot) => {
    const letter = challenge.letters.find(item => item.key === chosen[slot]);
    return [position, letter?.value] as const;
  }));

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 pb-36 animate-fade-in">
      <header className="rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-600 to-fuchsia-600 p-5 text-white shadow-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold"><SpellCheck className="h-4 w-4" /> تمرین واژه‌های لایتنر</span>
        <h2 className="mt-2 text-xl font-black">املا</h2>
        <p className="mt-1 text-xs leading-relaxed text-white/80">معنی را بخوان و حروف جاافتاده را به ترتیب انتخاب کن. کارت‌های سررسیدشده زودتر می‌آیند.</p>
      </header>

      <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500">
        <span>{card.category}</span>
        <span>{(index + 1).toLocaleString('fa-IR')} از {session.length.toLocaleString('fa-IR')}</span>
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm">
        <p className="text-[11px] font-bold text-slate-400">معنی واژه</p>
        <h3 className="mt-1 text-xl font-black text-slate-800">{card.meaningFa}</h3>
        <div dir="ltr" className="mt-5 flex min-h-14 flex-wrap items-center justify-center gap-x-1.5 gap-y-2 rounded-2xl bg-slate-50 px-3 py-3 font-en text-xl font-black text-slate-800">
          {challenge.characters.map((character, position) => {
            if (!challenge.hiddenPositions.includes(position)) return <span key={position} className="min-w-[0.55em]">{character}</span>;
            const value = placedLetters.get(position);
            return <span key={position} className={`min-w-[0.8em] border-b-2 px-0.5 text-center ${value ? 'border-indigo-400 text-indigo-700' : 'border-slate-400 text-slate-300'}`}>{value ?? '_'}</span>;
          })}
        </div>
        <p className="mt-2 text-[10px] text-slate-400">حروف جاافتاده را از پایین به ترتیب بزن.</p>
      </section>

      <div className="flex min-h-12 flex-wrap items-center justify-center gap-2" dir="ltr">
        {challenge.letters.map(letter => {
          const used = chosen.includes(letter.key);
          return (
            <button key={letter.key} type="button" disabled={used} onClick={() => chooseLetter(letter.key)} className={`h-11 min-w-11 rounded-xl border px-3 font-en text-lg font-black transition-all active:scale-95 ${used ? 'border-slate-100 bg-slate-100 text-slate-300' : 'border-indigo-100 bg-white text-indigo-700 shadow-sm hover:bg-indigo-50'}`}>
              {letter.value}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-2">
        <button type="button" onClick={() => { setChosen([]); setChecked(false); }} disabled={!chosen.length} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 disabled:opacity-40">
          <RotateCcw className="h-4 w-4" /> پاک‌کردن
        </button>
        {!checked || !isCorrect ? (
          <button type="button" onClick={() => setChecked(true)} disabled={chosen.length !== challenge.hiddenPositions.length} className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm disabled:opacity-40">
            بررسی پاسخ <Check className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" onClick={nextWord} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm">
            واژه‌ی بعدی <ArrowLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {checked && (
        <p className={`flex items-center justify-center gap-1.5 text-sm font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
          {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {isCorrect ? 'درست نوشتی!' : 'ترتیب حروف درست نیست؛ دوباره امتحان کن.'}
        </p>
      )}
    </div>
  );
};
