import React, { useState } from 'react';
import { allLessons } from '../../data/lessonsData';
import { Lesson, UserProgress } from '../../types';
import { BookOpen, CheckCircle2, Clock, Sparkles, ArrowLeft, Search } from 'lucide-react';

interface LessonsListViewProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: number) => void;
}

export const LessonsListView: React.FC<LessonsListViewProps> = ({
  progress,
  onSelectLesson,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLessons = allLessons.filter(lesson =>
    lesson.titleFa.includes(searchTerm) ||
    lesson.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.badge.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-4 pb-24 px-4 max-w-2xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <span className="inline-block text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
          مسیر دوم • آموزش گام‌به‌گام
        </span>
        <h2 className="text-xl sm:text-2xl font-black">فهرست درس‌های دوره کامل</h2>
        <p className="text-xs sm:text-sm text-indigo-100 mt-1 leading-relaxed">
          هر درس کوتاه، مستقل و ۵ دقیقه‌ای است. گرامر را در کنار واژگان و اشتباهات رایج یاد بگیر!
        </p>

        {/* Search Input */}
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در درس‌ها (مثلا: فعل be، فاعل، گذشته...)"
            className="w-full bg-white/15 border border-white/30 rounded-2xl py-2.5 pr-10 pl-4 text-xs sm:text-sm text-white placeholder-indigo-200 outline-none focus:bg-white/25 transition-all"
          />
          <Search className="w-4 h-4 text-indigo-200 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Progress pill */}
      <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-2xs">
        <span className="text-xs text-slate-500">وضعیت پیشرفت در درس‌ها:</span>
        <span className="text-xs font-bold text-indigo-600">
          <span className="font-en">{progress.completedLessons.length}</span> از <span className="font-en">{allLessons.length}</span> درس تکمیل شده
        </span>
      </div>

      {/* Lessons List */}
      <div className="flex flex-col gap-3">
        {filteredLessons.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="group cursor-pointer bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between gap-3 active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                {/* Lesson Number Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-en font-black text-base shadow-xs transition-colors ${
                    isCompleted
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : lesson.id}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {lesson.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-en">
                      <Clock className="w-3 h-3" />
                      {lesson.estimatedMinutes} min
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-1">
                    {lesson.titleFa}
                  </h4>
                  <p className="text-xs text-slate-400 font-en mt-0.5">{lesson.titleEn}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={`p-2.5 rounded-2xl transition-colors ${
                  isCompleted
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white'
                }`}
                aria-label={`مشاهده درس ${lesson.titleFa}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
