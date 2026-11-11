import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { allTensesData, TenseCategory } from '../data/tensesData';
import { TenseIcon } from './tenseIcons';

interface TenseTimelineProps {
  activeTenseId: string;
  completedTenses: string[];
  onSelect: (id: string) => void;
}

const zones: { id: TenseCategory; label: string; sub: string; dot: string; text: string; soft: string }[] = [
  { id: 'past', label: 'گذشته', sub: 'دیروز، پارسال…', dot: 'bg-sky-500', text: 'text-sky-700', soft: 'bg-sky-50' },
  { id: 'present', label: 'حال', sub: 'الان، هر روز…', dot: 'bg-indigo-600', text: 'text-indigo-700', soft: 'bg-indigo-50' },
  { id: 'future', label: 'آینده', sub: 'فردا، سال بعد…', dot: 'bg-purple-500', text: 'text-purple-700', soft: 'bg-purple-50' },
];

const aspectLabel = (id: string) => {
  if (id.endsWith('perfect-continuous')) return 'کامل استمراری';
  if (id.endsWith('perfect')) return 'کامل';
  if (id.endsWith('continuous')) return 'استمراری';
  return 'ساده';
};

/* نمودار شکل عمل روی خط زمان برای زمان انتخاب‌شده */
const ActionDiagram: React.FC<{ id: string }> = ({ id }) => {
  const cat: TenseCategory = id.startsWith('past') ? 'past' : id.startsWith('future') ? 'future' : 'present';
  const ref = cat === 'past' ? 70 : cat === 'present' ? 160 : 250; // نقطه مرجع
  const aspect = aspectLabel(id);
  const y = 40;
  const wave = (x1: number, x2: number) => {
    let d = `M ${x1} ${y}`;
    for (let x = x1; x < x2; x += 10) d += ` q 2.5 -9 5 0 q 2.5 9 5 0`;
    return d;
  };

  return (
    <svg viewBox="0 0 320 80" className="w-full h-20" aria-hidden>
      <defs>
        <linearGradient id="axis" x1="0" x2="1">
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="0.5" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#a855f7" />
        </marker>
        <marker id="arrowAct" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#f97316" />
        </marker>
      </defs>
      {/* محور زمان */}
      <line x1="10" y1={y} x2="308" y2={y} stroke="url(#axis)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowHead)" />
      {/* «الان» */}
      <line x1="160" y1={y - 16} x2="160" y2={y + 16} stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" />
      <text x="160" y="76" textAnchor="middle" fontSize="10" fill="#4f46e5" fontWeight="700">الان</text>
      <text x="40" y="76" textAnchor="middle" fontSize="10" fill="#0284c7">گذشته</text>
      <text x="282" y="76" textAnchor="middle" fontSize="10" fill="#9333ea">آینده</text>

      {/* شکل عمل */}
      {aspect === 'ساده' && cat === 'present' && (
        [100, 130, 160, 190, 220].map(x => <circle key={x} cx={x} cy={y} r="5" fill="#f97316" />)
      )}
      {aspect === 'ساده' && cat !== 'present' && (
        <g>
          <circle cx={ref} cy={y} r="8" fill="#f97316" opacity="0.25" />
          <circle cx={ref} cy={y} r="5" fill="#f97316" />
        </g>
      )}
      {aspect === 'استمراری' && (
        <path d={wave(ref - 30, ref + 30)} stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {aspect === 'کامل' && (
        <g>
          <circle cx={ref - 50} cy={y - 14} r="4" fill="#f97316" />
          <path d={`M ${ref - 50} ${y - 14} Q ${ref - 25} ${y - 30} ${ref - 4} ${y - 6}`} stroke="#f97316" strokeWidth="2.5" fill="none" markerEnd="url(#arrowAct)" />
        </g>
      )}
      {aspect === 'کامل استمراری' && (
        <g>
          <path d={wave(ref - 55, ref - 5)} stroke="#f97316" strokeWidth="2.5" fill="none" transform={`translate(0 -14)`} />
          <line x1={ref - 4} y1={y - 22} x2={ref - 4} y2={y - 6} stroke="#f97316" strokeWidth="2.5" />
        </g>
      )}
      {cat !== 'present' && (
        <line x1={ref} y1={y - 10} x2={ref} y2={y + 10} stroke="#334155" strokeWidth="2" />
      )}
    </svg>
  );
};

const diagramCaption = (id: string) => {
  const cat = id.startsWith('past') ? 'گذشته' : id.startsWith('future') ? 'آینده' : 'حال';
  switch (aspectLabel(id)) {
    case 'ساده':
      return cat === 'حال' ? 'کاری که مدام تکرار می‌شود یا همیشه درست است' : `یک اتفاق کامل در یک نقطه از ${cat}`;
    case 'استمراری':
      return `کاری که در یک لحظه از ${cat} در جریان است`;
    case 'کامل':
      return `کاری که قبل از یک نقطه از ${cat} تمام شده`;
    default:
      return `کاری که مدتی ادامه داشته تا یک نقطه از ${cat}`;
  }
};

export const TenseTimeline: React.FC<TenseTimelineProps> = ({ activeTenseId, completedTenses, onSelect }) => {
  const active = allTensesData.find(t => t.id === activeTenseId);

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-800">خط زمان ۱۲ زمان انگلیسی</h3>
        <span className="text-[11px] text-slate-400">روی هر زمان بزن</span>
      </div>

      {/* خط زمان اصلی: بولت «گذشته» اول خط، «حال» وسط، «آینده» آخر خط */}
      <div dir="ltr" className="relative">
        <div className="relative h-8">
          <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />
          {zones.map((zone, i) => {
            const zoneActive = active?.category === zone.id;
            const pos = i === 0 ? 'left-0' : i === 1 ? 'left-1/2 -translate-x-1/2' : 'right-0';
            return (
              <span
                key={zone.id}
                className={`absolute top-1/2 -translate-y-1/2 ${pos} w-6 h-6 rounded-full border-[5px] border-white shadow-md ${zone.dot} transition-transform ${
                  zoneActive ? 'scale-125 ring-4 ring-indigo-100' : ''
                } ${zone.id === 'present' ? 'animate-pulse' : ''}`}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-1.5">
          {zones.map((zone, i) => (
            <div
              key={zone.id}
              dir="rtl"
              className={i === 0 ? 'text-left' : i === 1 ? 'text-center' : 'text-right'}
            >
              <span className={`block text-xs font-black ${zone.text}`}>{zone.label}</span>
              <span className="block text-[10px] text-slate-400">{zone.sub}</span>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-3 gap-2 mt-3">
          {zones.map(zone => {
            const tenses = allTensesData.filter(t => t.category === zone.id);
            const zoneActive = active?.category === zone.id;
            return (
              <div key={zone.id} className="flex flex-col items-center">
                <div dir="rtl" className={`w-full flex flex-col gap-1.5 p-1.5 rounded-2xl ${zoneActive ? zone.soft : 'bg-slate-50'} transition-colors`}>
                  {tenses.map(t => {
                    const isActive = t.id === activeTenseId;
                    const done = completedTenses.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => onSelect(t.id)}
                        className={`relative flex items-center gap-1.5 p-1.5 rounded-xl text-right transition-all active:scale-95 ${
                          isActive ? 'bg-white shadow-md ring-2 ring-indigo-300' : 'hover:bg-white/70'
                        }`}
                      >
                        <span className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center ${t.badgeColor}`}>
                          <TenseIcon id={t.id} className="w-3.5 h-3.5 text-white" />
                        </span>
                        <span className={`text-[10px] leading-tight ${isActive ? 'font-black text-slate-800' : 'font-semibold text-slate-600'}`}>
                          {aspectLabel(t.id)}
                        </span>
                        {done && <CheckCircle2 className="w-3 h-3 text-emerald-500 absolute top-1 left-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* نمودار شکل عمل */}
      {active && (
        <div className="bg-gradient-to-b from-orange-50/60 to-white border border-orange-100 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-7 h-7 rounded-xl flex items-center justify-center ${active.badgeColor}`}>
              <TenseIcon id={active.id} className="w-4 h-4 text-white" />
            </span>
            <div>
              <span className="text-xs font-black text-slate-800 block">{active.nameFa}</span>
              <span className="text-[10px] text-slate-500">{diagramCaption(active.id)}</span>
            </div>
          </div>
          <ActionDiagram id={active.id} />
        </div>
      )}
    </div>
  );
};
