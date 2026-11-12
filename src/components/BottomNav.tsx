import React from 'react';
import { Home, Compass, BookOpen, Layers, NotebookPen } from 'lucide-react';

export type NavTab = 'home' | 'basics' | 'tenses' | 'wheel' | 'lessons' | 'words' | 'flashcards' | 'review' | 'spelling';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  mistakesCount?: number;
}

const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'خانه', icon: Home },
  { id: 'tenses', label: '۱۲ زمان', icon: Compass },
  { id: 'lessons', label: 'درس‌ها', icon: BookOpen },
  { id: 'words', label: 'واژگان', icon: Layers },
];

// نوبار پایین: کپسول شناور + دکمه‌ی آزمون
export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav
      aria-label="منوی ناوبری اصلی"
      className="fixed bottom-0 inset-x-0 z-50 px-3 pb-safe pointer-events-none"
    >
      <div className="max-w-md mx-auto flex items-center gap-3 pointer-events-auto">
        <div className="flex-1 flex items-center justify-between gap-1 p-1.5 rounded-full bg-[#EDEEF2]/95 backdrop-blur-xl border-2 border-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className={`h-12 flex items-center justify-center gap-1.5 rounded-full transition-all duration-300 active:scale-95 ${
                  active
                    ? 'px-4 bg-white text-slate-900 shadow-[0_4px_14px_rgba(15,23,42,0.10)]'
                    : 'w-12 text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`w-[22px] h-[22px] shrink-0 ${active ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
                {active && <span className="text-sm font-bold whitespace-nowrap animate-fade-in">{item.label}</span>}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onTabChange('wheel')}
          aria-label="شروع آزمون"
          className={`w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#FF7A7A] to-[#F43F5E] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(244,63,94,0.45)] active:scale-90 transition-transform ${
            currentTab === 'wheel' ? 'ring-4 ring-rose-200' : ''
          }`}
        >
          <NotebookPen className="w-7 h-7 stroke-[2.2]" />
        </button>
      </div>
    </nav>
  );
};
