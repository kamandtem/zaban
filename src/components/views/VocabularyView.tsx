import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { allVocabulary } from '../../data/vocabularyData';
import { VocabularyWord, UserProgress } from '../../types';
import {
  Layers,
  Bookmark,
  BookmarkCheck,
  Search,
  Sparkles,
  BookOpen,
  ChevronDown,
  X,
  Home,
  Users,
  Calendar,
  MessageCircle,
  MapPin,
  Activity,
  Sparkle,
  Car,
  Shirt,
  ShoppingBag,
  Cloud,
  HeartPulse,
  Utensils,
  BookOpenCheck,
  Apple,
  Cat,
  Palette,
  Clock,
  Link,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

interface VocabularyViewProps {
  progress: UserProgress;
  onToggleBookmarkWord: (word: string) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  progress,
  onToggleBookmarkWord,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [selectedLevel, setSelectedLevel] = useState<string>('همه');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Extract unique categories
  const categories = ['همه', ...Array.from(new Set(allVocabulary.map(w => w.category)))];
const categoryIcons: Record<string, LucideIcon> = {
  'همه': Layers,
  'عبارت‌های روزمره': MessageCircle,
  'مردم و خانواده': Users,
  'زمان و تقویم': Calendar,
  'واژه‌های رابط و پرسشی': MessageCircle,
  'مکان و جهت': MapPin,
  'مکان‌ها': MapPin,
  'کارهای روزمره': Activity,
  'صفت‌ها و حالت‌ها': Sparkle,
  'خانه و وسایل': Home,
  'شهر و سفر': Car,
  'لباس': Shirt,
  'خرید و پول': ShoppingBag,
  'طبیعت و هوا': Cloud,
  'بدن و سلامتی': HeartPulse,
  'غذا و نوشیدنی': Utensils,
  'میوه‌ها': Apple,
  'حیوانات': Cat,
  'خانه و مدرسه': BookOpenCheck,
  'رنگ‌ها و صفت‌ها': Palette,
  'قیدهای پرکاربرد': Clock,
  'زمان و مکان': MapPin,
  'کلمات رابط': Link,
  'کار و مردم': Briefcase,
  'مدرسه و یادگیری': BookOpenCheck,
};

  const filteredWords = allVocabulary.filter(w => {
    const matchesCat = selectedCategory === 'همه' || w.category === selectedCategory;
    const matchesLevel = selectedLevel === 'همه' || w.level === selectedLevel;
    const matchesSearch =
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.meaningFa.includes(searchTerm);
    const matchesBookmark =
      !onlyBookmarks || progress.bookmarkedWords.includes(w.word.toLowerCase());

    return matchesCat && matchesLevel && matchesSearch && matchesBookmark;
  });

  return (
    <div className="flex flex-col gap-4 pb-24 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-black">واژگان روزمره</h2>
          <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-full">۳۶۵ واژه</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button type="button" onClick={() => setFiltersOpen(true)} className="flex items-center justify-between gap-2 rounded-xl bg-white/15 border border-white/25 px-3 py-2 text-xs font-bold text-white">
            <span>سطح: {selectedLevel === 'همه' ? 'همه' : selectedLevel}</span><ChevronDown className="w-4 h-4 shrink-0" />
          </button>
          <button type="button" onClick={() => setFiltersOpen(true)} className="flex items-center justify-between gap-2 rounded-xl bg-white/15 border border-white/25 px-3 py-2 text-xs font-bold text-white">
            <span className="truncate">دسته: {onlyBookmarks ? 'نشان‌شده‌ها' : selectedCategory}</span><ChevronDown className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در کلمات یا معنی فارسی..."
            className="w-full bg-white/15 border border-white/30 rounded-2xl py-2.5 pr-10 pl-4 text-xs sm:text-sm text-white placeholder-teal-100 outline-none focus:bg-white/25 transition-all"
          />
          <Search className="w-4 h-4 text-teal-100 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {filtersOpen && createPortal((
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="presentation" onClick={() => setFiltersOpen(false)}>
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />
          <section role="dialog" aria-modal="true" aria-label="انتخاب سطح و دسته‌ی واژگان" onClick={e => e.stopPropagation()} className="relative z-10 w-full max-w-sm max-h-[78vh] overflow-hidden rounded-3xl border border-white bg-white shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div><h3 className="text-base font-black text-slate-800">فیلتر واژگان</h3><p className="mt-0.5 text-[11px] text-slate-500">سطح و دسته‌ی دلخواهت را انتخاب کن.</p></div>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="بستن پنجره" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <div className="max-h-[calc(78vh-76px)] overflow-y-auto p-4">
              <p className="mb-2 text-xs font-black text-slate-600">سطح زبان</p>
              <div className="grid grid-cols-3 gap-2">
                {['همه', 'A1', 'A2'].map(level => (
                  <button key={level} type="button" onClick={() => setSelectedLevel(level)} className={`rounded-xl border px-3 py-2 text-xs font-bold ${selectedLevel === level ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
                    {level === 'همه' ? 'همه‌ی سطح‌ها' : level}
                  </button>
                ))}
              </div>
              <p className="mb-2 mt-5 text-xs font-black text-slate-600">دسته‌ی واژگان</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat, categoryIndex) => {
                  const CategoryIcon = categoryIcons[cat] ?? [BookOpenCheck, Home, MapPin, Sparkle][categoryIndex % 4];
                  return (
                  <button key={cat} type="button" onClick={() => { setSelectedCategory(cat); setOnlyBookmarks(false); setFiltersOpen(false); }} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-right text-xs font-bold ${!onlyBookmarks && selectedCategory === cat ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
                    <CategoryIcon className="h-4 w-4 shrink-0" />
                    <span>{cat}</span>
                  </button>
                );})}
              </div>
              <button type="button" onClick={() => setOnlyBookmarks(value => !value)} className={`mt-3 flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold ${onlyBookmarks ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
                <Bookmark className="h-4 w-4" /> واژه‌های نشان‌شده ({progress.bookmarkedWords.length})
              </button>
              <button type="button" onClick={() => setFiltersOpen(false)} className="mt-4 w-full rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700">نمایش {filteredWords.length.toLocaleString('fa-IR')} واژه</button>
            </div>
          </section>
        </div>
      ), document.body)}

      {/* Vocabulary Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredWords.map((item) => {
          const isBookmarked = progress.bookmarkedWords.includes(item.word.toLowerCase());

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:border-teal-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top: Word & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div dir="rtl" className="flex flex-wrap items-baseline justify-start gap-x-1.5 gap-y-0.5">
                      <h4 dir="ltr" className="font-en text-base sm:text-lg font-black text-slate-800">
                        {item.word}
                      </h4>
                      <span aria-hidden="true" className="text-xs font-bold text-slate-300">/</span>
                      <span dir="rtl" className="text-[11px] font-semibold text-teal-700">{item.pronunciationFa}</span>
                    </div>
                    <span className="text-xs text-teal-600 font-semibold mt-0.5 block">
                      {item.partOfSpeech}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onToggleBookmarkWord(item.word)}
                      aria-label={`نشان کردن کلمه ${item.word}`}
                      className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-amber-500 flex items-center justify-center transition-colors active:scale-95"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Persian Meaning */}
                <p className="text-sm font-bold text-slate-800 mt-2 bg-teal-50/70 text-teal-950 p-2 rounded-xl">
                  {item.meaningFa}
                </p>

                {/* Example in context */}
                <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                  <p dir="ltr" className="font-en font-bold text-indigo-700 text-left">
                    "{item.exampleEn}"
                  </p>
                  <p className="text-slate-500 mt-1">{item.exampleFa}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
          <p className="text-slate-500 text-sm">هیچ واژه‌ای با این مشخصات یافت نشد.</p>
        </div>
      )}
    </div>
  );
};
