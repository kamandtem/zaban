import { UserProgress } from '../types';

/**
 * Normalizes an English sentence by trimming and collapsing multiple spaces
 */
export function normalizeSentence(str: string): string {
  return str.trim().replace(/\s+/g, ' ').replace(/\s+([?.!,])/g, '$1');
}

/**
 * Validates a wheel selector answer against the expected correct option
 */
export function validateWheelAnswer(selected: string, correct: string): boolean {
  return selected.trim().toLowerCase() === correct.trim().toLowerCase();
}

/**
 * Validates a word scramble / word order submission
 */
export function validateWordOrder(submittedWords: string[], targetSentence: string): boolean {
  const assembled = normalizeSentence(submittedWords.join(' '));
  const target = normalizeSentence(targetSentence);
  // Compare without trailing punctuation or case sensitivity
  const cleanAssembled = assembled.replace(/[?.!]/g, '').toLowerCase();
  const cleanTarget = target.replace(/[?.!]/g, '').toLowerCase();
  return cleanAssembled === cleanTarget;
}

/**
 * Calculates updated streak count when the user performs an action
 */
/** تاریخ محلی (نه UTC) به شکل YYYY-MM-DD */
export function toLocalDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayDiff(fromStr: string, toStr: string): number {
  const [y1, m1, d1] = fromStr.split('-').map(Number);
  const [y2, m2, d2] = toStr.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

export function calculateStreak(
  currentStreak: number,
  lastActiveDateStr: string | null,
  currentDate: Date = new Date()
): { newStreak: number; newActiveDateStr: string } {
  const todayStr = toLocalDateStr(currentDate);
  if (!lastActiveDateStr) {
    return { newStreak: 1, newActiveDateStr: todayStr };
  }

  if (lastActiveDateStr === todayStr) {
    return { newStreak: Math.max(1, currentStreak), newActiveDateStr: todayStr };
  }

  const diffDays = dayDiff(lastActiveDateStr, todayStr);

  if (diffDays === 1) {
    return { newStreak: currentStreak + 1, newActiveDateStr: todayStr };
  } else if (diffDays > 1) {
    return { newStreak: 1, newActiveDateStr: todayStr };
  }

  return { newStreak: currentStreak, newActiveDateStr: todayStr };
}

/**
 * Provides correct form of 'be' verb in present tense
 */
export function getPresentToBe(subject: string): 'am' | 'is' | 'are' | null {
  const s = subject.trim().toLowerCase();
  if (s === 'i') return 'am';
  if (['he', 'she', 'it'].includes(s)) return 'is';
  if (['we', 'they', 'you'].includes(s)) return 'are';
  return null;
}

/**
 * Provides correct auxiliary 'do' or 'does' in present simple
 */
export function getPresentDoDoes(subject: string): 'do' | 'does' | null {
  const s = subject.trim().toLowerCase();
  if (['he', 'she', 'it'].includes(s)) return 'does';
  if (['i', 'you', 'we', 'they'].includes(s)) return 'do';
  return null;
}

/**
 * Default initial progress object
 */
export const defaultProgress: UserProgress = {
  streakDays: 0,
  lastActiveDate: '',
  completedLessons: [],
  completedTenses: [],
  completedBasics: [],
  totalExercisesCompleted: 0,
  correctAnswersCount: 0,
  mistakes: [],
  bookmarkedWords: [],
  leitnerCards: {},
  leitnerNewDate: '',
  leitnerNewCount: 0,
  dailyGoal: 5,
  todayCompletedCount: 0,
};

const STORAGE_KEY = 'lingoplus_progress_v1';

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    const merged: UserProgress = {
      ...defaultProgress,
      ...parsed,
      leitnerCards: parsed?.leitnerCards && typeof parsed.leitnerCards === 'object' ? parsed.leitnerCards : {},
      leitnerNewDate: typeof parsed?.leitnerNewDate === 'string' ? parsed.leitnerNewDate : '',
      leitnerNewCount: Number.isFinite(parsed?.leitnerNewCount) ? Math.max(0, parsed.leitnerNewCount) : 0,
    };
    // روز جدید: شمارنده امروز صفر می‌شود و اگر بیش از یک روز فاصله افتاده، زنجیره قطع می‌شود
    const today = toLocalDateStr();
    if (merged.lastActiveDate && merged.lastActiveDate !== today) {
      merged.todayCompletedCount = 0;
      if (dayDiff(merged.lastActiveDate, today) > 1) merged.streakDays = 0;
    }
    return merged;
  } catch {
    return { ...defaultProgress };
  }
}

/** ثبت فعالیت امروز: به‌روزرسانی زنجیره روزانه و شمارنده امروز */
export function registerActivity(p: UserProgress, completed = 1): UserProgress {
  const today = toLocalDateStr();
  const sameDay = p.lastActiveDate === today;
  const { newStreak } = calculateStreak(p.streakDays, p.lastActiveDate || null);
  return {
    ...p,
    streakDays: newStreak,
    lastActiveDate: today,
    todayCompletedCount: (sameDay ? p.todayCompletedCount : 0) + completed,
  };
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress locally', err);
  }
}
