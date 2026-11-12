import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import type { UserProgress } from '../types';

export interface ReminderPreferences {
  dailyWordEnabled: boolean;
  dailyWordTime: string;
  leitnerEnabled: boolean;
  leitnerTime: string;
}

export const defaultReminderPreferences: ReminderPreferences = {
  dailyWordEnabled: false,
  dailyWordTime: '09:00',
  leitnerEnabled: false,
  leitnerTime: '19:00',
};

export type ReminderStatus = 'ready' | 'approximate' | 'denied' | 'unsupported';

const WORD_REMINDER_ID = 430001;
const LEITNER_DAILY_ID = 430002;
const LEITNER_DATE_ID_BASE = 430010;
const REMINDER_IDS = [WORD_REMINDER_ID, LEITNER_DAILY_ID, ...Array.from({ length: 41 }, (_, index) => LEITNER_DATE_ID_BASE + index)];

export function parseReminderPreferences(raw: string | null): ReminderPreferences {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    const validTime = (value: unknown): value is string =>
      typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
    return {
      dailyWordEnabled: parsed?.dailyWordEnabled === true,
      dailyWordTime: validTime(parsed?.dailyWordTime) ? parsed.dailyWordTime : defaultReminderPreferences.dailyWordTime,
      leitnerEnabled: parsed?.leitnerEnabled === true,
      leitnerTime: validTime(parsed?.leitnerTime) ? parsed.leitnerTime : defaultReminderPreferences.leitnerTime,
    };
  } catch {
    return { ...defaultReminderPreferences };
  }
}

export async function requestReminderAccess(): Promise<ReminderStatus> {
  if (!Capacitor.isNativePlatform()) return 'unsupported';
  try {
    let permission = await LocalNotifications.checkPermissions();
    if (permission.display !== 'granted') permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') return 'denied';

    if (Capacitor.getPlatform() === 'android') {
      let exact = await LocalNotifications.checkExactNotificationSetting();
      if (exact.exact_alarm !== 'granted') {
        await LocalNotifications.changeExactNotificationSetting();
        exact = await LocalNotifications.checkExactNotificationSetting();
      }
      return exact.exact_alarm === 'granted' ? 'ready' : 'approximate';
    }
    return 'ready';
  } catch {
    return 'denied';
  }
}

const parseTime = (value: string): { hour: number; minute: number } => {
  const [hour, minute] = value.split(':').map(Number);
  return { hour: Number.isFinite(hour) ? Math.max(0, Math.min(23, hour)) : 9, minute: Number.isFinite(minute) ? Math.max(0, Math.min(59, minute)) : 0 };
};

const localDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export async function synchronizeReminders(
  preferences: ReminderPreferences,
  progress: UserProgress,
): Promise<ReminderStatus> {
  if (!Capacitor.isNativePlatform()) return 'unsupported';

  try {
    await LocalNotifications.cancel({ notifications: REMINDER_IDS.map(id => ({ id })) });
    if (!preferences.dailyWordEnabled && !preferences.leitnerEnabled) return 'ready';

    const permission = await LocalNotifications.checkPermissions();
    if (permission.display !== 'granted') return 'denied';

    const notifications = [];
    if (preferences.dailyWordEnabled) {
      const { hour, minute } = parseTime(preferences.dailyWordTime);
      notifications.push({
        id: WORD_REMINDER_ID,
        title: 'وقت کلمه‌ی روزانه است',
        body: 'یک واژه‌ی تازه را همراه معنی و مثال کوتاهش در لینگوپلاس بخوان.',
        schedule: { on: { hour, minute } },
        autoCancel: true,
      });
    }

    if (preferences.leitnerEnabled) {
      const { hour, minute } = parseTime(preferences.leitnerTime);
      const today = localDateKey(new Date());
      const cards = Object.values(progress.leitnerCards);
      const overdueCount = cards.filter(card => card.dueDate <= today).length;

      if (overdueCount > 0) {
        notifications.push({
          id: LEITNER_DAILY_ID,
          title: 'زمان مرور جعبه‌ی لایتنر',
          body: `${overdueCount.toLocaleString('fa-IR')} کارت برای مرور آماده است.`,
          schedule: { on: { hour, minute } },
          autoCancel: true,
        });
      } else {
        const upcomingDates = [...new Set(cards.map(card => card.dueDate).filter(date => date > today))].sort().slice(0, 41);
        upcomingDates.forEach((nextDueDate, index) => {
          const [year, month, day] = nextDueDate.split('-').map(Number);
          const at = new Date(year, month - 1, day, hour, minute, 0, 0);
          notifications.push({
            id: LEITNER_DATE_ID_BASE + index,
            title: 'زمان مرور جعبه‌ی لایتنر',
            body: 'کارت‌های سررسیدشده‌ات را مرور کن.',
            schedule: { at },
            autoCancel: true,
          });
        });
      }
    }

    if (notifications.length) {
      await LocalNotifications.schedule({ notifications });
    }

    if (Capacitor.getPlatform() === 'android') {
      const exact = await LocalNotifications.checkExactNotificationSetting();
      return exact.exact_alarm === 'granted' ? 'ready' : 'approximate';
    }
    return 'ready';
  } catch {
    return 'denied';
  }
}
