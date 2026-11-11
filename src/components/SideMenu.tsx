import React, { useEffect, useRef, useState } from 'react';
import {
  Home, Compass, BookOpen, Layers, RotateCw, BarChart2, Copy,
  Settings, Code2, Sprout, Moon, Sun, Type, Target, Info, ArrowRight,
} from 'lucide-react';
import { MascotAvatar } from './MascotAvatar';
import type { NavTab } from './BottomNav';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  points: number;
  level: number;
  streakDays: number;
  mistakesCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  fontSize: 'sm' | 'md' | 'lg';
  onChangeFontSize: (v: 'sm' | 'md' | 'lg') => void;
  dailyGoal: number;
  onChangeDailyGoal: (n: number) => void;
  onReplayIntro: () => void;
}

// دکمه‌های انتخاب چندحالته (برای تنظیمات)
function Segmented<T extends string | number>({
  value, options, onChange,
}: { value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
      {options.map(o => (
        <button
          key={String(o.v)}
          type="button"
          onClick={() => onChange(o.v)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            value === o.v ? 'bg-white text-[#FF6A00] shadow-sm' : 'text-slate-500'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${on ? 'bg-[#FF6A00]' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-1 w-5 h-5 rounded-full bg-[#ffffff] shadow transition-all ${on ? 'right-1' : 'right-6'}`} />
    </button>
  );
}

const sections: { title: string; items: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] }[] = [
  {
    title: 'بخش‌های اصلی',
    items: [
      { id: 'home', label: 'خانه', icon: Home },
      { id: 'basics', label: 'پیش‌نیاز (قواعد ساده)', icon: Sprout },
      { id: 'tenses', label: '۱۲ زمان انگلیسی', icon: Compass },
      { id: 'lessons', label: 'درس‌های قدم‌به‌قدم', icon: BookOpen },
    ],
  },
  {
    title: 'تمرین و مرور',
    items: [
      { id: 'wheel', label: 'باشگاه جمله‌سازی', icon: RotateCw },
      { id: 'words', label: 'واژگان', icon: Layers },
      { id: 'flashcards', label: 'فلش کارت', icon: Copy },
      { id: 'review', label: 'مرور اشتباه‌ها و آمار', icon: BarChart2 },
    ],
  },
];

const PANEL_WIDTH = 320;

// منوی کناری: از سمت راست وارد می‌شود و با کشیدن به سمت بیرون (راست) بسته می‌شود
export const SideMenu: React.FC<SideMenuProps> = ({
  open, onClose, currentTab, onNavigate,
  points, level, mistakesCount,
  theme, onToggleTheme, fontSize, onChangeFontSize,
  dailyGoal, onChangeDailyGoal, onReplayIntro,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const dark = theme === 'dark';
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; locked: 'h' | 'v' | null } | null>(null);

  useEffect(() => { if (!open) { setDragX(0); setShowSettings(false); } }, [open]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY, locked: null };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!start.current) return;
    const t = e.touches[0];
    const dx = t.clientX - start.current.x;
    const dy = t.clientY - start.current.y;
    if (!start.current.locked) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) start.current.locked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    if (start.current.locked === 'h') {
      setDragging(true);
      setDragX(Math.max(0, dx)); // فقط به سمت راست (بیرون)
    }
  };
  const onTouchEnd = () => {
    if (dragging && dragX > PANEL_WIDTH * 0.3) onClose();
    setDragging(false);
    setDragX(0);
    start.current = null;
  };

  const translate = open ? dragX : PANEL_WIDTH + 40;
  const backdropOpacity = open ? Math.max(0, 1 - dragX / PANEL_WIDTH) : 0;

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* پس‌زمینه مات */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-[3px]"
        style={{ opacity: backdropOpacity, transition: dragging ? 'none' : 'opacity 300ms ease' }}
      />

      {/* پنل */}
      <aside
        role="dialog"
        aria-label="منوی برنامه"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="absolute top-3 bottom-3 right-3 bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.25)] flex flex-col overflow-hidden"
        style={{
          width: `min(${PANEL_WIDTH}px, calc(100vw - 48px))`,
          marginTop: 'var(--safe-top)',
          marginBottom: 'var(--safe-bottom)',
          transform: `translateX(${translate}px)`,
          transition: dragging ? 'none' : 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* پروفایل */}
        <div className="p-5 pb-4 flex items-start justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 border-2 border-orange-300 flex items-center justify-center">
              <MascotAvatar type="bear" size="sm" />
            </div>
            <div>
              <span className="text-xs text-slate-400">روز خوش 👋</span>
              <p className="text-base font-black text-slate-800">دوست لینگوپلاسی</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  سطح {level.toLocaleString('fa-IR')}
                </span>
                <span className="text-[11px] font-bold text-amber-600">{points.toLocaleString('fa-IR')} امتیاز</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowSettings(v => !v)}
              aria-label="تنظیمات"
              aria-pressed={showSettings}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center active:scale-95 ${
                showSettings ? 'bg-[#FF6A00] text-white' : 'bg-slate-50 text-slate-600'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={dark ? 'تم روز' : 'تم شب'}
              className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center active:scale-95"
            >
              {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
          </div>
        </div>

        {/* آیتم‌ها */}
        {showSettings ? (
          <div className="flex-1 overflow-y-auto px-4 py-3 no-scrollbar flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="self-start flex items-center gap-1.5 text-xs font-bold text-slate-500 px-2 py-1"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به منو</span>
            </button>
            <p className="text-sm font-black text-slate-800 px-1">تنظیمات</p>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
              {dark ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <span className="flex-1 text-sm font-bold text-slate-700">تم شب</span>
              <Toggle on={dark} onClick={onToggleTheme} label="تم شب" />
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Type className="w-5 h-5 text-slate-400" /><span>اندازه‌ی متن</span>
              </div>
              <Segmented value={fontSize} onChange={onChangeFontSize}
                options={[{ v: 'sm', label: 'کوچک' }, { v: 'md', label: 'معمولی' }, { v: 'lg', label: 'بزرگ' }]} />
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Target className="w-5 h-5 text-slate-400" /><span>هدف روزانه (تعداد تمرین)</span>
              </div>
              <Segmented value={dailyGoal} onChange={onChangeDailyGoal}
                options={[3, 5, 10, 15].map(n => ({ v: n, label: n.toLocaleString('fa-IR') }))} />
            </div>

            <button
              type="button"
              onClick={onReplayIntro}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 text-right active:scale-[0.98]"
            >
              <Info className="w-5 h-5 text-slate-400" />
              <span className="flex-1 text-sm font-bold text-slate-700">دوباره دیدن معرفی برنامه</span>
            </button>

            <button
              type="button"
              onClick={() => { onNavigate('review'); onClose(); }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 text-right active:scale-[0.98]"
            >
              <BarChart2 className="w-5 h-5 text-slate-400" />
              <span className="flex-1 text-sm font-bold text-slate-700">آمار و بازنشانی پیشرفت</span>
            </button>
          </div>
        ) : (
        <nav className="flex-1 overflow-y-auto px-4 py-3 no-scrollbar">
          {sections.map(sec => (
            <div key={sec.title} className="mb-3">
              <p className="text-xs font-bold text-slate-400 px-2 mb-2">{sec.title}</p>
              <div className="flex flex-col gap-1">
                {sec.items.map(item => {
                  const Icon = item.icon;
                  const active = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => { onNavigate(item.id); onClose(); }}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-right transition-all active:scale-[0.98] ${
                        active
                          ? 'bg-[#FF6A00] text-white shadow-[0_10px_25px_rgba(255,106,0,0.35)]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                      <span className="flex-1 text-sm font-bold">{item.label}</span>
                      {item.id === 'review' && mistakesCount > 0 && (
                        <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-black flex items-center justify-center ${active ? 'bg-white text-[#FF6A00]' : 'bg-rose-500 text-white'}`}>
                          {mistakesCount.toLocaleString('fa-IR')}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        )}

        {/* پایین منو */}
        <div className="border-t border-slate-100 p-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Code2 className="w-4 h-4 text-indigo-500" />
          <span>برنامه‌نویس: محمدرضا ارجمند</span>
        </div>
      </aside>
    </div>
  );
};
