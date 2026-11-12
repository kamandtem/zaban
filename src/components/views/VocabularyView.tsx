import React, { useState } from 'react';
import { allVocabulary } from '../../data/vocabularyData';
import { VocabularyWord, UserProgress } from '../../types';
import {
  Layers,
  Bookmark,
  BookmarkCheck,
  Search,
  Sparkles,
  BookOpen
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

  // Extract unique categories
  const categories = ['همه', ...Array.from(new Set(allVocabulary.map(w => w.category)))];

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
        <span className="inline-block text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
          واژگان کاربردی روزمره
        </span>
        <h2 className="text-xl sm:text-2xl font-black">جعبه لغات پرکاربرد</h2>
        <p className="text-xs sm:text-sm text-teal-100 mt-1 leading-relaxed">
          کلمات را در قالب جمله‌های ساده یاد بگیر، نه صرفاً به شکل حفظی!
        </p>

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

      {/* Level filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="shrink-0 text-[10px] font-bold text-slate-400">سطح:</span>
        {['همه', 'A1', 'A2'].map(level => (
          <button key={level} type="button" onClick={() => setSelectedLevel(level)} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedLevel === level ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'}`}>
            {level === 'همه' ? 'همه' : level}
          </button>
        ))}
      </div>

      {/* Topic/category filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="shrink-0 text-[10px] font-bold text-slate-400">دسته:</span>
        <button
          type="button"
          onClick={() => setOnlyBookmarks(prev => !prev)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
            onlyBookmarks
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>نشان‌شده‌ها ({progress.bookmarkedWords.length})</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setOnlyBookmarks(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              !onlyBookmarks && selectedCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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
                    <div className="flex items-center gap-2">
                      <h4 dir="ltr" className="font-en text-base sm:text-lg font-black text-slate-800">
                        {item.word}
                      </h4>
                    </div>
                    <span className="text-xs text-teal-600 font-semibold mt-0.5 block">
                      {item.partOfSpeech}
                    </span>
            <span className="inline-flex text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-1">{item.level ?? 'A1'}</span>
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
