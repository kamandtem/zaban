import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, XCircle, ArrowLeft, Sprout } from 'lucide-react';
import { basicsTopics, BasicTopic, BasicFormula } from '../../data/basicsData';

interface BasicsViewProps {
  completedBasics: string[];
  onCompleteTopic: (id: string) => void;
  onGoNext: () => void;
}

const toneClass: Record<string, string> = {
  subject: 'bg-sky-50 text-sky-700 border-sky-200',
  verb: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  aux: 'bg-amber-50 text-amber-700 border-amber-200',
  object: 'bg-purple-50 text-purple-700 border-purple-200',
  adj: 'bg-pink-50 text-pink-700 border-pink-200',
  extra: 'bg-slate-50 text-slate-600 border-slate-200',
};

const isLatin = (s: string) => /[A-Za-z]/.test(s);

const FormulaRow: React.FC<{ f: BasicFormula }> = ({ f }) => (
  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
    <span className="text-[11px] font-bold text-slate-500 block mb-2">{f.label}</span>
    <div dir="ltr" className="flex flex-wrap items-center gap-1.5">
      {f.parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className={`px-2.5 py-1 rounded-xl border text-xs font-bold ${toneClass[p.tone]} ${isLatin(p.text) ? 'font-en' : ''}`}>
            {p.text}
          </span>
          {i < f.parts.length - 1 && <span className="text-slate-300 font-black">+</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1">
        <p dir="ltr" className="font-en text-sm font-bold text-indigo-700 text-left">{f.example.en}</p>
        <p className="text-[11px] text-slate-500">{f.example.fa}</p>
      </div>
    </div>
  </div>
);

const TopicCard: React.FC<{
  topic: BasicTopic; index: number; open: boolean; done: boolean;
  onToggle: () => void; onDone: () => void;
}> = ({ topic, index, open, done, onToggle, onDone }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === topic.check.correct;

  return (
    <div className={`bg-white rounded-3xl border shadow-xs overflow-hidden transition-all ${open ? 'border-emerald-200 shadow-md' : 'border-slate-100'}`}>
      <button type="button" onClick={onToggle} className="w-full flex items-center gap-3 p-4 text-right">
        <span className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl shrink-0">{topic.emoji}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-emerald-600">قدم {(index + 1).toLocaleString('fa-IR')}</span>
          <h4 className="text-sm font-black text-slate-800">{topic.title}</h4>
        </div>
        {done && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 animate-fade-in">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{topic.summary}</p>

          <ul className="flex flex-col gap-1.5">
            {topic.points.map((pt, i) => (
              <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {topic.table && (
            <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50">
                  <tr>{topic.table.headers.map(h => <th key={h} className="p-2 font-bold text-slate-500 whitespace-nowrap">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {topic.table.rows.map((r, ri) => (
                    <tr key={ri} className="border-t border-slate-100">
                      {r.map((c, ci) => (
                        <td key={ci} className={`p-2 text-center whitespace-nowrap ${topic.table!.enCols.includes(ci) ? 'font-en font-bold text-indigo-700' : 'text-slate-600'}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {topic.formulas?.map((f, i) => <FormulaRow key={i} f={f} />)}

          <div className="flex flex-col gap-2">
            {topic.examples.map((ex, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-2.5 flex items-center gap-2">
                <div className="flex-1">
                  <p dir="ltr" className="font-en text-sm font-bold text-indigo-700 text-left">{ex.en}</p>
                  <p className="text-[11px] text-slate-500">{ex.fa}</p>
                </div>
              </div>
            ))}
          </div>

          {/* یک سوال کوتاه برای اطمینان */}
          <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-3">
            <span className="text-[11px] font-bold text-emerald-700 block mb-1">یه سوال کوچیک 👇</span>
            <p className="text-xs sm:text-sm font-bold text-slate-800">{topic.check.question}</p>
            {topic.check.sentence && (
              <p dir="ltr" className="font-en text-sm font-bold text-slate-700 text-left mt-1">{topic.check.sentence}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2" dir="ltr">
              {topic.check.options.map((o, i) => {
                const state = picked === null ? '' : i === topic.check.correct ? 'bg-emerald-500 text-white border-emerald-500' : i === picked ? 'bg-rose-500 text-white border-rose-500' : 'opacity-50';
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={picked !== null && correct}
                    onClick={() => {
                      setPicked(i);
                      if (i === topic.check.correct) onDone();
                    }}
                    className={`font-en px-3 py-2 rounded-xl border text-xs font-bold bg-white border-slate-200 text-slate-700 transition-all active:scale-95 ${state}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className={`mt-2 flex items-start gap-1.5 text-xs ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                {correct ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                <span>{correct ? `آفرین! ${topic.check.why}` : 'نه دقیقاً، یه بار دیگه امتحان کن.'}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const BasicsView: React.FC<BasicsViewProps> = ({ completedBasics, onCompleteTopic, onGoNext }) => {
  const [openId, setOpenId] = useState<string | null>(basicsTopics[0].id);
  const doneCount = basicsTopics.filter(t => completedBasics.includes(t.id)).length;
  const allDone = doneCount === basicsTopics.length;

  return (
    <div className="flex flex-col gap-4 pb-36 px-4 max-w-2xl mx-auto animate-fade-in">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <Sprout className="absolute -left-3 -bottom-3 w-28 h-28 text-white/10" />
        <span className="inline-block text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-1">قدم صفر</span>
        <h2 className="text-xl font-black">پیش‌نیاز: قواعد خیلی ساده</h2>
        <p className="text-xs sm:text-sm text-emerald-50 mt-1 leading-relaxed">
          قبل از زمان‌ها، این چند تا نکته‌ی ساده رو یاد بگیر تا بقیه درس‌ها راحت‌تر بشه.
        </p>
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(doneCount / basicsTopics.length) * 100}%` }} />
        </div>
        <span className="text-[11px] text-emerald-50 mt-1 block">
          {doneCount.toLocaleString('fa-IR')} از {basicsTopics.length.toLocaleString('fa-IR')} قدم
        </span>
      </div>

      {basicsTopics.map((t, i) => (
        <TopicCard
          key={t.id}
          topic={t}
          index={i}
          open={openId === t.id}
          done={completedBasics.includes(t.id)}
          onToggle={() => setOpenId(openId === t.id ? null : t.id)}
          onDone={() => onCompleteTopic(t.id)}
        />
      ))}

      <button
        type="button"
        onClick={onGoNext}
        className={`w-full py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-95 ${
          allDone ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-700 border border-indigo-200'
        }`}
      >
        <span>{allDone ? 'آماده‌ای! بریم سراغ ۱۲ زمان' : 'رفتن به ۱۲ زمان'}</span>
        <ArrowLeft className="w-4 h-4" />
      </button>
    </div>
  );
};
