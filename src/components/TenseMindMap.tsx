import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, Network, CheckCircle2, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { allTensesData } from '../data/tensesData';
import { simpleFormulas } from '../data/tenseUsagesData';
import { auxColorMap } from '../utils/auxiliaryColors';
import { TenseIcon } from './tenseIcons';

interface TenseMindMapProps {
  open: boolean;
  onClose: () => void;
  completedTenses: string[];
}

interface Leaf { id: string; typeFa: string; en: string; fa: string }
interface Group {
  id: 'present' | 'past' | 'future';
  nameFa: string;
  hintFa: string;
  sample: string;
  dot: string;      // رنگ نود و خط‌ها (هماهنگ با خط زمان)
  line: string;
  soft: string;
  text: string;
  border: string;
  leaves: Leaf[];
}

// ترتیب مثل خط زمان: گذشته ← حال ← آینده
const GROUPS: Group[] = [
  {
    id: 'present', nameFa: 'حال', hintFa: 'الان، هر روز…', sample: 'I go',
    dot: 'bg-indigo-600', line: 'bg-indigo-300', soft: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200',
    leaves: [
      { id: 'present-simple', typeFa: 'ساده', en: 'I go', fa: 'من می‌روم' },
      { id: 'present-continuous', typeFa: 'استمراری', en: 'I am going', fa: 'من دارم می‌روم' },
      { id: 'present-perfect', typeFa: 'کامل', en: 'I have gone', fa: 'من رفته‌ام' },
      { id: 'present-perfect-continuous', typeFa: 'کامل استمراری', en: 'I have been going', fa: 'مدتی است که دارم می‌روم' },
    ],
  },
  {
    id: 'past', nameFa: 'گذشته', hintFa: 'دیروز، پارسال…', sample: 'I went',
    dot: 'bg-sky-500', line: 'bg-sky-300', soft: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200',
    leaves: [
      { id: 'past-simple', typeFa: 'ساده', en: 'I went', fa: 'من رفتم' },
      { id: 'past-continuous', typeFa: 'استمراری', en: 'I was going', fa: 'من داشتم می‌رفتم' },
      { id: 'past-perfect', typeFa: 'کامل', en: 'I had gone', fa: 'من رفته بودم' },
      { id: 'past-perfect-continuous', typeFa: 'کامل استمراری', en: 'I had been going', fa: 'مدتی بود که داشتم می‌رفتم' },
    ],
  },
  {
    id: 'future', nameFa: 'آینده', hintFa: 'فردا، سال بعد…', sample: 'I will go',
    dot: 'bg-purple-500', line: 'bg-purple-300', soft: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200',
    leaves: [
      { id: 'future-simple', typeFa: 'ساده', en: 'I will go', fa: 'من خواهم رفت' },
      { id: 'future-continuous', typeFa: 'استمراری', en: 'I will be going', fa: 'من در حال رفتن خواهم بود' },
      { id: 'future-perfect', typeFa: 'کامل', en: 'I will have gone', fa: 'تا آن موقع رفته‌ام' },
      { id: 'future-perfect-continuous', typeFa: 'کامل استمراری', en: 'I will have been going', fa: 'تا آن موقع مدتی است که می‌روم' },
    ],
  },
];

// متن انگلیسی با رنگ‌بندی فعل‌های کمکی (همان رنگ‌های ثابت برنامه)
const Colored: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\s+|\+|\/)/).map((tok, i) => {
      const c = auxColorMap[tok.toLowerCase()];
      return c ? (
        <span key={i} className={`px-1 rounded-md ${c.bg} ${c.text}`}>{tok}</span>
      ) : (
        <span key={i}>{tok}</span>
      );
    })}
  </>
);

// باز و بسته شدن نرم
const Collapse: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      opacity: open ? 1 : 0,
      transition: 'grid-template-rows 0.3s ease, opacity 0.25s ease',
    }}
    aria-hidden={!open}
  >
    <div style={{ minHeight: 0, overflow: 'hidden' }}>{children}</div>
  </div>
);

// یک فرزند درخت با خط عمودی و شاخه‌ی افقی (راست‌به‌چپ)
const Branch: React.FC<{ last: boolean; lineClass: string; children: React.ReactNode }> = ({ last, lineClass, children }) => (
  <div className={`relative pr-5 ${last ? '' : 'pb-2.5'}`}>
    <span className={`absolute right-0 top-0 w-0.5 ${lineClass}`} style={{ height: last ? 24 : '100%' }} />
    <span className={`absolute right-0 w-5 h-0.5 ${lineClass}`} style={{ top: 23 }} />
    {children}
  </div>
);

export const TenseMindMap: React.FC<TenseMindMapProps> = ({ open, onClose, completedTenses }) => {
  const [rootOpen, setRootOpen] = useState(false);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const allOpen = rootOpen && GROUPS.every(g => openCats[g.id]);
  const toggleAll = () => {
    if (allOpen) {
      setRootOpen(false);
      setOpenCats({});
    } else {
      setRootOpen(true);
      setOpenCats({ present: true, past: true, future: true });
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="نقشه ذهنی لینگوپلاس"
    >
      <div
        className="w-full sm:max-w-lg h-[92dvh] sm:h-[88dvh] bg-gradient-to-b from-indigo-50 via-white to-sky-50 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="shrink-0 px-4 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-slate-100 bg-white/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30 shrink-0">
              <Network className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-black text-slate-800 leading-tight">نقشه ذهنی لینگوپلاس</h2>
              <p className="text-[11px] text-slate-500">روی هر نود بزن تا باز یا بسته شود</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleAll}
              className="h-9 px-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              {allOpen ? <ChevronsDownUp className="w-4 h-4" /> : <ChevronsUpDown className="w-4 h-4" />}
              <span>{allOpen ? 'بستن همه' : 'باز کردن همه'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* بدنه‌ی قابل اسکرول */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5" style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}>
          {/* نود اصلی */}
          <button
            type="button"
            onClick={() => setRootOpen(o => !o)}
            aria-expanded={rootOpen}
            className="flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-gradient-to-l from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all"
          >
            <span className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-black font-en ${rootOpen ? '' : 'animate-pulse'}`}>
              ۱۲
            </span>
            <span className="text-right">
              <span className="block text-sm font-black leading-tight">زمان‌های انگلیسی</span>
              <span className="block text-[10px] text-indigo-100">۳ زمان اصلی × ۴ حالت</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${rootOpen ? 'rotate-180' : ''}`} />
          </button>

          {!rootOpen && (
            <p className="text-[11px] text-slate-400 mt-3 mr-2">برای دیدن شاخه‌ها، روی نود بالا بزن 👆</p>
          )}

          <Collapse open={rootOpen}>
            <div className="mr-[29px]">
              {/* خط اتصال از ریشه */}
              <div className="pt-2">
                {GROUPS.map((g, gi) => {
                  const catOpen = !!openCats[g.id];
                  return (
                    <Branch key={g.id} last={gi === GROUPS.length - 1} lineClass="bg-slate-300">
                      {/* نود زمان (حال / گذشته / آینده) */}
                      <button
                        type="button"
                        onClick={() => setOpenCats(s => ({ ...s, [g.id]: !s[g.id] }))}
                        aria-expanded={catOpen}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-2xl border bg-white shadow-xs text-right active:scale-[0.99] transition-all ${g.border}`}
                      >
                        <span className={`w-10 h-10 rounded-xl ${g.dot} text-white text-sm font-black flex items-center justify-center shrink-0`}>
                          {g.nameFa}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className={`block text-[11px] font-bold ${g.text}`}>{g.hintFa}</span>
                          <span dir="ltr" className="block text-left font-en text-[13px] font-bold text-slate-800 mt-0.5">
                            <Colored text={g.sample} />
                          </span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${catOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* ۴ حالت */}
                      <Collapse open={catOpen}>
                        <div className="mr-[27px] pt-2.5">
                          {g.leaves.map((leaf, li) => {
                            const info = allTensesData.find(t => t.id === leaf.id);
                            const done = completedTenses.includes(leaf.id);
                            const formula = (simpleFormulas[leaf.id] || '').replace(' + بقیه جمله', '');
                            return (
                              <Branch key={leaf.id} last={li === g.leaves.length - 1} lineClass={g.line}>
                                <div className={`rounded-2xl border p-2.5 ${g.soft} ${g.border}`}>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-1.5">
                                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${info?.badgeColor || 'bg-slate-500 text-white'}`}>
                                        <TenseIcon id={leaf.id} className="w-3.5 h-3.5 text-white" />
                                      </span>
                                      <span className="text-xs font-black text-slate-800">{leaf.typeFa}</span>
                                    </span>
                                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                  </div>

                                  <p dir="ltr" className="font-en text-[13px] font-bold text-slate-800 text-left mt-1.5 leading-relaxed">
                                    <Colored text={leaf.en} />
                                  </p>
                                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{leaf.fa}</p>

                                  <div className="mt-1.5 rounded-lg bg-white/80 px-2 py-1">
                                    <span className="text-[9px] text-slate-400 block">فرمول</span>
                                    <p dir="ltr" className="font-en text-[11px] font-semibold text-slate-700 text-left leading-relaxed break-words">
                                      <Colored text={formula} />
                                    </p>
                                  </div>
                                </div>
                              </Branch>
                            );
                          })}
                        </div>
                      </Collapse>
                    </Branch>
                  );
                })}
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>,
    document.body
  );
};
