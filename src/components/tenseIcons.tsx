import React from 'react';
import {
  Repeat, Activity, BadgeCheck, Hourglass,
  History, Film, Rewind, Timer,
  Rocket, CalendarClock, Flag, TrendingUp,
} from 'lucide-react';

type IconCmp = React.ComponentType<{ className?: string }>;

// آیکون مرتبط با مفهوم هر زمان
export const tenseIconMap: Record<string, IconCmp> = {
  'present-simple': Repeat,              // عادت و تکرار
  'present-continuous': Activity,        // در جریانِ همین الان
  'present-perfect': BadgeCheck,         // تمام‌شده با اثر تا الان
  'present-perfect-continuous': Hourglass, // مدت‌دار تا الان
  'past-simple': History,                // یک‌بار در گذشته
  'past-continuous': Film,               // صحنه در جریان در گذشته
  'past-perfect': Rewind,                // گذشته‌ی قبل از گذشته
  'past-perfect-continuous': Timer,      // مدت تا نقطه‌ای در گذشته
  'future-simple': Rocket,               // تصمیم و پیش‌بینی آینده
  'future-continuous': CalendarClock,    // در جریان در زمانی از آینده
  'future-perfect': Flag,                // تمام‌شده تا موعد آینده
  'future-perfect-continuous': TrendingUp, // مدت تا آینده
};

export const TenseIcon: React.FC<{ id: string; className?: string }> = ({ id, className }) => {
  const Icon = tenseIconMap[id] || Repeat;
  return <Icon className={className} />;
};
