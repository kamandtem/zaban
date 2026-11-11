import React, { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';

interface SplashScreenProps {
  onDone: () => void;
  /** مدت نمایش (میلی‌ثانیه) */
  duration?: number;
}

// صفحه‌ی شروع: لوگوی لینگوپلاس روی همان زمینه‌ی کرم لوگو
export const SplashScreen: React.FC<SplashScreenProps> = ({ onDone, duration = 2200 }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setLeaving(true), duration);
    return () => window.clearTimeout(t1);
  }, [duration]);

  useEffect(() => {
    if (!leaving) return;
    const t2 = window.setTimeout(onDone, 450);
    return () => window.clearTimeout(t2);
  }, [leaving, onDone]);

  return (
    <div
      onClick={() => setLeaving(true)}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 select-none"
      style={{
        backgroundColor: '#FEF9F0',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 450ms ease',
        paddingTop: 'var(--safe-top)',
        paddingBottom: 'var(--safe-bottom)',
      }}
      role="img"
      aria-label="لینگوپلاس"
    >
      <div className="splash-pop">
        <div className="splash-float">
          <img
            src={logoImg}
            alt="لینگوپلاس"
            draggable={false}
            className="w-[min(78vw,360px)] h-auto"
          />
        </div>
      </div>

      <p className="mt-6 text-sm font-bold text-[#1E3A8A]/70 text-center">
        انگلیسی رو از صفر و خیلی ساده یاد بگیر
      </p>

      <div className="absolute bottom-12 flex gap-2" aria-hidden>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="splash-dot w-2.5 h-2.5 rounded-full bg-[#FFB81C]"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
};
