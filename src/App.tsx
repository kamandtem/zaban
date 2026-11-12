import React, { useState, useEffect, useMemo, useRef } from 'react';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress, defaultProgress, registerActivity } from './utils/grammarRules';
import { allLessons } from './data/lessonsData';
import { Header, AppNotification } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { BottomNav, NavTab } from './components/BottomNav';
import { HomeView } from './components/views/HomeView';
import { TensesMapView } from './components/views/TensesMapView';
import { LessonsListView } from './components/views/LessonsListView';
import { LessonDetailView } from './components/views/LessonDetailView';
import { WheelArenaView } from './components/views/WheelArenaView';
import { VocabularyView } from './components/views/VocabularyView';
import { FlashcardsView } from './components/views/FlashcardsView';
import { ReviewMistakesView } from './components/views/ReviewMistakesView';
import { BasicsView } from './components/views/BasicsView';
import { setupNative, setStatusBarTheme } from './utils/native';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';

const ONBOARD_KEY = 'lingoplus_onboarded_v1';
const THEME_KEY = 'lingoplus_theme_v1';
const PROFILE_NAME_KEY = 'lingoplus_profile_name_v1';
const FONT_SCALE_KEY = 'lingoplus_content_scale_v1';

export type ThemeMode = 'light' | 'dark';

const readKey = (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } };
const writeKey = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

const hasSeenOnboarding = (): boolean => {
  try { return localStorage.getItem(ONBOARD_KEY) === 'yes'; } catch { return false; }
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // اسپلش ← (فقط بار اول) دو اسلاید معرفی ← برنامه
  const [theme, setTheme] = useState<ThemeMode>(() => (readKey(THEME_KEY) === 'dark' ? 'dark' : 'light'));
  const [displayName, setDisplayName] = useState(() => readKey(PROFILE_NAME_KEY) ?? '');
  const [fontScale, setFontScale] = useState(() => {
    const stored = Number(readKey(FONT_SCALE_KEY));
    return [0.9, 1, 1.1, 1.2].includes(stored) ? stored : 1;
  });
  const [stage, setStage] = useState<'splash' | 'onboarding' | 'app'>('splash');

  const handleSplashDone = () => setStage(hasSeenOnboarding() ? 'app' : 'onboarding');
  const handleOnboardingFinish = () => {
    try { localStorage.setItem(ONBOARD_KEY, 'yes'); } catch { /* ignore */ }
    setStage('app');
  };

  useEffect(() => { saveUserProgress(progress); }, [progress]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0F1426' : '#FEF9F0');
    writeKey(THEME_KEY, theme);
    setStatusBarTheme(theme === 'dark');
  }, [theme]);

  // برگشت به بالای صفحه با تغییر تب یا درس
  useEffect(() => { window.scrollTo({ top: 0 }); }, [currentTab, selectedLessonId]);

  // دکمه برگشت اندروید: بستن منو ← بستن درس ← رفتن به خانه ← خروج
  const stateRef = useRef({ menuOpen, selectedLessonId, currentTab });
  stateRef.current = { menuOpen, selectedLessonId, currentTab };
  useEffect(() => {
    return setupNative(() => {
      const s = stateRef.current;
      if (s.menuOpen) { setMenuOpen(false); return true; }
      if (s.selectedLessonId !== null) { setSelectedLessonId(null); return true; }
      if (s.currentTab !== 'home') { setCurrentTab('home'); return true; }
      return false;
    });
  }, []);

  const goTab = (tab: NavTab) => {
    setSelectedLessonId(null);
    setCurrentTab(tab);
  };

  const handleCompleteLesson = (lessonId: number) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev; // جلوگیری از امتیاز تکراری
      return registerActivity({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalExercisesCompleted: prev.totalExercisesCompleted + 4,
        correctAnswersCount: prev.correctAnswersCount + 4,
      });
    });
  };

  const handleRecordMistake = (questionText: string, wrongAnswer: string, correctAnswer: string, explanation: string) => {
    setProgress(prev => ({
      ...prev,
      totalExercisesCompleted: prev.totalExercisesCompleted + 1,
      mistakes: [
        {
          id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          lessonId: selectedLessonId ?? undefined,
          questionText, wrongAnswer, correctAnswer, explanation,
          timestamp: Date.now(),
        },
        ...prev.mistakes.slice(0, 49),
      ],
    }));
  };

  const handleIncrementScore = () => {
    setProgress(prev => registerActivity({
      ...prev,
      totalExercisesCompleted: prev.totalExercisesCompleted + 1,
      correctAnswersCount: prev.correctAnswersCount + 1,
    }));
  };

  const handleMarkTenseLearned = (id: string) => {
    setProgress(prev => prev.completedTenses.includes(id)
      ? prev
      : registerActivity({ ...prev, completedTenses: [...prev.completedTenses, id] }));
  };

  const handleCompleteBasic = (id: string) => {
    setProgress(prev => prev.completedBasics.includes(id)
      ? prev
      : registerActivity({ ...prev, completedBasics: [...prev.completedBasics, id] }));
  };

  const handleToggleBookmarkWord = (word: string) => {
    const w = word.toLowerCase();
    setProgress(prev => ({
      ...prev,
      bookmarkedWords: prev.bookmarkedWords.includes(w)
        ? prev.bookmarkedWords.filter(item => item !== w)
        : [...prev.bookmarkedWords, w],
    }));
  };

  const handleRateFlashcard = (wordId: string, remembered: boolean) => {
    setProgress(prev => {
      const today = new Date();
      const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const isNew = !prev.leitnerCards[wordId];
      const currentBox = prev.leitnerCards[wordId]?.box ?? 1;
      const box = remembered ? Math.min(5, currentBox + 1) : 1;
      const intervalDays = [1, 3, 7, 14, 30][box - 1];
      const due = new Date();
      due.setHours(12, 0, 0, 0);
      due.setDate(due.getDate() + intervalDays);
      const dueDate = `${due.getFullYear()}-${String(due.getMonth() + 1).padStart(2, '0')}-${String(due.getDate()).padStart(2, '0')}`;
      return registerActivity({
        ...prev,
        leitnerCards: { ...prev.leitnerCards, [wordId]: { box, dueDate } },
        leitnerNewDate: todayKey,
        leitnerNewCount: (prev.leitnerNewDate === todayKey ? prev.leitnerNewCount : 0) + (isNew ? 1 : 0),
      });
    });
  };

  const handleSetDailyGoal = (n: number) => setProgress(prev => ({ ...prev, dailyGoal: n }));
  const handleChangeDisplayName = (value: string) => {
    setDisplayName(value);
    writeKey(PROFILE_NAME_KEY, value);
  };
  const handleChangeFontScale = (value: number) => {
    setFontScale(value);
    writeKey(FONT_SCALE_KEY, String(value));
  };

  const handleClearMistakes = () => setProgress(prev => ({ ...prev, mistakes: [] }));
  const handleRemoveMistake = (id: string) =>
    setProgress(prev => ({ ...prev, mistakes: prev.mistakes.filter(m => m.id !== id) }));

  const handleResetProgress = () => {
    setProgress({ ...defaultProgress });
    goTab('home');
  };

  const points = progress.correctAnswersCount * 10 + progress.completedLessons.length * 50 + progress.completedTenses.length * 30 + progress.completedBasics.length * 20;
  const level = Math.floor(points / 500);

  const notifications = useMemo<AppNotification[]>(() => {
    const list: AppNotification[] = [];
    const left = progress.dailyGoal - progress.todayCompletedCount;
    if (left > 0) list.push({ id: 'goal', tone: 'indigo', title: 'هدف امروز', body: `${left.toLocaleString('fa-IR')} تمرین تا تکمیل هدف امروز مونده`, onClick: () => goTab('wheel') });
    if (progress.mistakes.length > 0) list.push({ id: 'mistakes', tone: 'rose', title: 'مرور اشتباه‌ها', body: `${progress.mistakes.length.toLocaleString('fa-IR')} سوال منتظر مرورن`, onClick: () => goTab('review') });
    if (progress.completedBasics.length === 0) list.push({ id: 'basics', tone: 'indigo', title: 'از پیش‌نیاز شروع کن', body: 'چند قاعده‌ی خیلی ساده قبل از زمان‌ها', onClick: () => goTab('basics') });
    if (progress.completedTenses.length < 12) list.push({ id: 'tenses', tone: 'amber', title: '۱۲ زمان انگلیسی', body: `${progress.completedTenses.length.toLocaleString('fa-IR')} از ۱۲ زمان رو یاد گرفتی، ادامه بده!`, onClick: () => goTab('tenses') });
    return list;
  }, [progress]);

  const selectedLesson = allLessons.find(l => l.id === selectedLessonId);
  const activeTab: NavTab = selectedLesson ? 'lessons' : currentTab;

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 flex flex-col font-fa select-text">
      <Header onOpenMenu={() => setMenuOpen(true)} notifications={notifications} />

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentTab={activeTab}
        onNavigate={goTab}
        points={points}
        level={level}
        streakDays={progress.streakDays}
        mistakesCount={progress.mistakes.length}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        dailyGoal={progress.dailyGoal}
        onChangeDailyGoal={handleSetDailyGoal}
        displayName={displayName}
        onChangeDisplayName={handleChangeDisplayName}
        fontScale={fontScale}
        onChangeFontScale={handleChangeFontScale}
        onReplayIntro={() => { setMenuOpen(false); setStage('onboarding'); }}
      />

      <main className="app-main-content flex-1 w-full pt-1 pb-6" style={{ '--content-scale': fontScale } as React.CSSProperties}>
        {selectedLesson ? (
          <LessonDetailView
            lesson={selectedLesson}
            progress={progress}
            onBack={() => setSelectedLessonId(null)}
            onCompleteLesson={handleCompleteLesson}
            onRecordMistake={handleRecordMistake}
            onToggleBookmarkWord={handleToggleBookmarkWord}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView progress={progress} onNavigateTab={goTab} onOpenLesson={id => setSelectedLessonId(id)} />
            )}
            {currentTab === 'basics' && (
              <BasicsView
                completedBasics={progress.completedBasics}
                onCompleteTopic={handleCompleteBasic}
                onGoNext={() => goTab('tenses')}
              />
            )}
            {currentTab === 'tenses' && (
              <TensesMapView
                completedTenses={progress.completedTenses}
                onGoToFullCourse={() => goTab('lessons')}
                onMarkTenseLearned={handleMarkTenseLearned}
              />
            )}
            {currentTab === 'wheel' && (
              <WheelArenaView onRecordMistake={handleRecordMistake} onIncrementScore={handleIncrementScore} />
            )}
            {currentTab === 'lessons' && (
              <LessonsListView progress={progress} onSelectLesson={id => setSelectedLessonId(id)} />
            )}
            {currentTab === 'words' && (
              <VocabularyView progress={progress} onToggleBookmarkWord={handleToggleBookmarkWord} />
            )}
            {currentTab === 'flashcards' && <FlashcardsView progress={progress} onRateWord={handleRateFlashcard} />}
            {currentTab === 'review' && (
              <ReviewMistakesView
                progress={progress}
                onNavigateTab={goTab}
                onClearMistakes={handleClearMistakes}
                onRemoveMistake={handleRemoveMistake}
                onResetProgress={handleResetProgress}
              />
            )}
          </>
        )}
      </main>

      <BottomNav currentTab={activeTab} onTabChange={goTab} mistakesCount={progress.mistakes.length} />

      {stage === 'onboarding' && <Onboarding onFinish={handleOnboardingFinish} />}
      {stage === 'splash' && <SplashScreen onDone={handleSplashDone} />}
    </div>
  );
}
