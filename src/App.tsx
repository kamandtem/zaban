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
import { SpellingView } from './components/views/SpellingView';
import { ReviewMistakesView } from './components/views/ReviewMistakesView';
import { BasicsView } from './components/views/BasicsView';
import { setupNative, setStatusBarTheme } from './utils/native';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { allVocabulary } from './data/vocabularyData';
import { PremiumUpgradeModal } from './components/PremiumUpgradeModal';
import { buyPremiumOnce, connectToBazaar, isBazaarAndroid, queryPremiumPurchase } from './utils/bazaarBilling';
import { FREE_WORD_LIMIT, getFirstLaunchTime, isLeitnerTrialExpired, readPremiumEntitlement, writePremiumEntitlement } from './utils/premiumAccess';
import {
  parseReminderPreferences,
  requestReminderAccess,
  synchronizeReminders,
} from './utils/reminders';
import type { ReminderPreferences, ReminderStatus } from './utils/reminders';

const ONBOARD_KEY = 'lingoplus_onboarded_v1';
const THEME_KEY = 'lingoplus_theme_v1';
const PROFILE_NAME_KEY = 'lingoplus_profile_name_v1';
const FONT_SCALE_KEY = 'lingoplus_content_scale_v1';
const REMINDER_SETTINGS_KEY = 'lingoplus_reminders_v1';

export type ThemeMode = 'light' | 'dark';

const readKey = (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } };
const writeKey = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

const hasSeenOnboarding = (): boolean => {
  try { return localStorage.getItem(ONBOARD_KEY) === 'yes'; } catch { return false; }
};

const localDateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

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
  const [reminderPreferences, setReminderPreferences] = useState<ReminderPreferences>(() => parseReminderPreferences(readKey(REMINDER_SETTINGS_KEY)));
  const [reminderStatus, setReminderStatus] = useState<ReminderStatus>('ready');
  const [reminderMessage, setReminderMessage] = useState('');
  const [todayKey, setTodayKey] = useState(() => localDateKey(new Date()));
  const [clockNow, setClockNow] = useState(() => Date.now());
  const [firstLaunchTime] = useState(getFirstLaunchTime);
  const [isPremium, setIsPremium] = useState(readPremiumEntitlement);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [purchaseBusy, setPurchaseBusy] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [stage, setStage] = useState<'splash' | 'onboarding' | 'app'>('splash');
  const leitnerTrialExpired = isLeitnerTrialExpired(firstLaunchTime, clockNow);

  const handleSplashDone = () => setStage(hasSeenOnboarding() ? 'app' : 'onboarding');
  const handleOnboardingFinish = () => {
    try { localStorage.setItem(ONBOARD_KEY, 'yes'); } catch { /* ignore */ }
    setStage('app');
  };

  useEffect(() => { saveUserProgress(progress); }, [progress]);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const current = localDateKey(new Date());
      setTodayKey(previous => previous === current ? previous : current);
      setClockNow(Date.now());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!isBazaarAndroid()) return;
    let active = true;
    void (async () => {
      await connectToBazaar();
      const owned = await queryPremiumPurchase();
      if (active) {
        setIsPremium(owned);
        writePremiumEntitlement(owned);
      }
    })().catch(() => {
      // Keep a previously verified entitlement available during temporary store outages.
    });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    let active = true;
    const remindersAllowed = isPremium || !leitnerTrialExpired
      ? reminderPreferences
      : { ...reminderPreferences, leitnerEnabled: false };
    synchronizeReminders(remindersAllowed, progress).then(status => {
      if (!active) return;
      setReminderStatus(status);
      if (!remindersAllowed.dailyWordEnabled && !remindersAllowed.leitnerEnabled) setReminderMessage('');
      else if (reminderPreferences.leitnerEnabled && !remindersAllowed.leitnerEnabled) setReminderMessage('دوره‌ی رایگان جعبه‌ی لایتنر تمام شده؛ یادآوری‌های مرور پس از خرید نسخه‌ی کامل دوباره فعال می‌شوند.');
      else if (status === 'denied') setReminderMessage('اجازه‌ی اعلان‌ها فعال نیست. از تنظیمات گوشی اجازه‌ی اعلان‌های لینگوپلاس را بده.');
      else if (status === 'unsupported') setReminderMessage('یادآوری دستگاه در نسخه‌ی نصب‌شده‌ی برنامه فعال می‌شود.');
      else if (status === 'approximate') setReminderMessage('یادآوری‌ها فعال‌اند؛ اگر «هشدارها و یادآورها» در تنظیمات گوشی خاموش باشد، ممکن است کمی دیرتر برسند.');
      else setReminderMessage('یادآوری‌ها روشن‌اند و در زمان انتخاب‌شده فرستاده می‌شوند.');
    });
    return () => { active = false; };
  }, [reminderPreferences, progress.leitnerCards, isPremium, leitnerTrialExpired]);
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
  const handleChangeReminderPreferences = async (next: ReminderPreferences) => {
    const wasEnabled = reminderPreferences.dailyWordEnabled || reminderPreferences.leitnerEnabled;
    const willBeEnabled = next.dailyWordEnabled || next.leitnerEnabled;
    if (!wasEnabled && willBeEnabled) {
      const status = await requestReminderAccess();
      setReminderStatus(status);
      if (status === 'denied') {
        setReminderMessage('برای فعال‌کردن یادآوری‌ها، اجازه‌ی اعلان‌ها را در گوشی فعال کن.');
        return;
      }
      if (status === 'unsupported') setReminderMessage('یادآوری دستگاه در نسخه‌ی نصب‌شده‌ی برنامه فعال می‌شود.');
      else if (status === 'approximate') setReminderMessage('برای یادآوری دقیق، در صفحه‌ی تنظیمات گوشی «هشدارها و یادآورها» را روشن کن.');
    }
    setReminderPreferences(next);
    writeKey(REMINDER_SETTINGS_KEY, JSON.stringify(next));
  };

  const handleBuyPremium = async () => {
    setPurchaseBusy(true);
    setPurchaseMessage('');
    try {
      await connectToBazaar();
      await buyPremiumOnce();
      setIsPremium(true);
      writePremiumEntitlement(true);
      setPurchaseMessage('خرید با موفقیت انجام شد؛ همهٔ امکانات باز شدند.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'پرداخت انجام نشد. دوباره تلاش کن.';
      setPurchaseMessage(message);
    } finally {
      setPurchaseBusy(false);
    }
  };

  const handleRestorePremium = async () => {
    setPurchaseBusy(true);
    setPurchaseMessage('');
    try {
      await connectToBazaar();
      const owned = await queryPremiumPurchase();
      setIsPremium(owned);
      writePremiumEntitlement(owned);
      setPurchaseMessage(owned ? 'خرید قبلی بازیابی شد؛ نسخهٔ کامل فعاله.' : 'خرید قبلی برای این حساب بازار پیدا نشد.');
    } catch (error) {
      setPurchaseMessage(error instanceof Error ? error.message : 'بازیابی خرید انجام نشد.');
    } finally {
      setPurchaseBusy(false);
    }
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
  const dayDate = new Date(`${todayKey}T12:00:00`);
  const startOfYear = new Date(dayDate.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((dayDate.getTime() - startOfYear.getTime()) / 86_400_000);
  const dailyWordVocabulary = isPremium ? allVocabulary : allVocabulary.slice(0, FREE_WORD_LIMIT);
  const dailyWord = dailyWordVocabulary[(dayOfYear - 1) % dailyWordVocabulary.length];

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-800 flex flex-col font-fa select-text">
      <Header onOpenMenu={() => setMenuOpen(true)} notifications={notifications} dailyWord={dailyWord} onDailyWordClick={() => goTab('words')} />

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentTab={activeTab}
        onNavigate={goTab}
        points={points}
        level={level}
        streakDays={progress.streakDays}
        mistakesCount={progress.mistakes.length}
        isPremium={isPremium}
        onOpenUpgrade={() => { setPurchaseMessage(''); setUpgradeOpen(true); }}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        dailyGoal={progress.dailyGoal}
        onChangeDailyGoal={handleSetDailyGoal}
        displayName={displayName}
        onChangeDisplayName={handleChangeDisplayName}
        fontScale={fontScale}
        onChangeFontScale={handleChangeFontScale}
        reminderPreferences={reminderPreferences}
        onChangeReminderPreferences={next => { void handleChangeReminderPreferences(next); }}
        reminderMessage={reminderMessage}
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
              <WheelArenaView onRecordMistake={handleRecordMistake} onIncrementScore={handleIncrementScore} isPremium={isPremium} onUpgrade={() => { setPurchaseMessage(''); setUpgradeOpen(true); }} />
            )}
            {currentTab === 'lessons' && (
              <LessonsListView progress={progress} onSelectLesson={id => setSelectedLessonId(id)} />
            )}
            {currentTab === 'words' && (
              <VocabularyView progress={progress} onToggleBookmarkWord={handleToggleBookmarkWord} isPremium={isPremium} onUpgrade={() => { setPurchaseMessage(''); setUpgradeOpen(true); }} />
            )}
            {currentTab === 'flashcards' && <FlashcardsView progress={progress} onRateWord={handleRateFlashcard} isPremium={isPremium} trialExpired={leitnerTrialExpired} onUpgrade={() => { setPurchaseMessage(''); setUpgradeOpen(true); }} />}
            {currentTab === 'spelling' && <SpellingView progress={progress} onGoToCards={() => goTab('flashcards')} isPremium={isPremium} onUpgrade={() => { setPurchaseMessage(''); setUpgradeOpen(true); }} />}
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

      <PremiumUpgradeModal
        open={upgradeOpen}
        isPremium={isPremium}
        busy={purchaseBusy}
        message={purchaseMessage}
        onClose={() => setUpgradeOpen(false)}
        onBuy={() => { void handleBuyPremium(); }}
        onRestore={() => { void handleRestorePremium(); }}
      />

      {stage === 'onboarding' && <Onboarding onFinish={handleOnboardingFinish} />}
      {stage === 'splash' && <SplashScreen onDone={handleSplashDone} />}
    </div>
  );
}
