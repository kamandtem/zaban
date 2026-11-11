import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface WheelSelectorProps {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const STEP = 46;            // فاصله‌ی عمودی بین دو گزینه (پیکسل)
const ITEM_H = 48;          // ارتفاع هر گزینه
const WHEEL_H = 170;        // ارتفاع کل چرخ
const DRAG_THRESHOLD = 6;   // کمتر از این مقدار حرکت = «ضربه»، نه کشیدن
const MASK = 'linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%)';

/**
 * چرخ انتخاب (Drum Picker)
 * - گزینه‌ها با کشیدن مستقیم یا ضربه روی ردیف تغییر می‌کنند
 * - چرخ ماوس فقط وقتی چرخ فوکوس دارد
 * - ضربه روی هر گزینه، فلش‌ها و نقطه‌ها همان گزینه را انتخاب می‌کنند
 */
export const WheelSelector: React.FC<WheelSelectorProps> = ({
  options,
  selectedIndex,
  onSelect,
  disabled = false,
}) => {
  const last = options.length - 1;
  const [dragPos, setDragPos] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  const drag = useRef<{
    id: number; startX: number; startY: number; startIndex: number;
    moved: boolean; pos: number; armed: boolean; aborted: boolean; touch: boolean;
    timer: ReturnType<typeof setTimeout> | null; lastY: number;
  } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // آخرین مقدارها برای استفاده در شنونده‌های بومی (بدون بسته‌شدن روی مقدار قدیمی)
  const live = useRef({ selectedIndex, onSelect, disabled, last });
  live.current = { selectedIndex, onSelect, disabled, last };

  const clamp = (i: number) => Math.min(last, Math.max(0, i));

  const handlePrev = useCallback(() => {
    if (disabled || selectedIndex <= 0) return;
    onSelect(selectedIndex - 1);
  }, [disabled, selectedIndex, onSelect]);

  const handleNext = useCallback(() => {
    if (disabled || selectedIndex >= last) return;
    onSelect(selectedIndex + 1);
  }, [disabled, selectedIndex, last, onSelect]);

  // ---------- کشیدن (Pointer Events) ----------
  const arm = (el: HTMLDivElement) => {
    const d = drag.current;
    if (!d || d.armed || d.aborted) return;
    d.armed = true;
    d.startY = d.lastY;
    d.startIndex = live.current.selectedIndex;
    d.pos = d.startIndex;
    setArmed(true);
    try { el.setPointerCapture(d.id); } catch { /* ignore */ }
    try { navigator.vibrate?.(8); } catch { /* ignore */ }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = e.currentTarget;
    const touch = e.pointerType !== 'mouse';
    drag.current = {
      id: e.pointerId, startX: e.clientX, startY: e.clientY, startIndex: selectedIndex,
      moved: false, pos: selectedIndex, armed: false, aborted: false, touch, timer: null, lastY: e.clientY,
    };
    drag.current.armed = true;
    setArmed(true);
    try { el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    d.lastY = e.clientY;
    if (!d.armed) return;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.abs(dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    const pos = Math.min(last, Math.max(0, d.startIndex - dy / STEP));
    d.pos = pos;
    setDragPos(pos);
    const idx = Math.round(pos);
    if (idx !== live.current.selectedIndex) live.current.onSelect(idx);
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.timer) clearTimeout(d.timer);
    drag.current = null;
    setArmed(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }

    if (d.moved) {
      const idx = clamp(Math.round(d.pos));
      setDragPos(null); // نشستن نرم روی گزینه‌ی نهایی
      if (!cancelled && idx !== live.current.selectedIndex) live.current.onSelect(idx);
      return;
    }
    if (cancelled || d.aborted) return;

    // ضربه: گزینه‌ای که زیر انگشت است انتخاب می‌شود
    const rect = e.currentTarget.getBoundingClientRect();
    const fromCenter = e.clientY - (rect.top + rect.height / 2);
    const idx = clamp(Math.round(selectedIndex + fromCenter / STEP));
    if (idx !== selectedIndex) onSelect(idx);
  };

  // ---------- جلوگیری از اسکرول صفحه فقط وقتی کشیدن چرخ فعال است ----------
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      if (drag.current?.armed && e.cancelable) e.preventDefault();
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  // ---------- چرخ ماوس: فقط وقتی چرخ فوکوس دارد (وگرنه صفحه عادی اسکرول می‌شود) ----------
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    let acc = 0;
    let lastTs = 0;
    const onWheel = (e: WheelEvent) => {
      const s = live.current;
      if (s.disabled || document.activeElement !== el) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastTs > 250) acc = 0;
      lastTs = now;
      acc += e.deltaY;
      if (Math.abs(acc) >= 40) {
        const next = Math.min(s.last, Math.max(0, s.selectedIndex + Math.sign(acc)));
        acc = 0;
        if (next !== s.selectedIndex) s.onSelect(next);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // ---------- کیبورد (فقط وقتی چرخ فوکوس دارد) ----------
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowUp') { e.preventDefault(); handlePrev(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); handleNext(); }
    else if (e.key === 'Home') { e.preventDefault(); onSelect(0); }
    else if (e.key === 'End') { e.preventDefault(); onSelect(last); }
  };

  const pos = dragPos ?? selectedIndex;
  const activeIdx = clamp(Math.round(pos));
  const dragging = dragPos !== null;

  return (
    <div className="flex flex-col items-center justify-center select-none py-1 w-full">
      <button
        type="button"
        onClick={handlePrev}
        disabled={disabled || selectedIndex === 0}
        aria-label="گزینه قبلی چرخ"
        className="w-10 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-600 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all"
      >
        <ChevronUp className="w-6 h-6 stroke-[2.5]" />
      </button>

      <div
        ref={boxRef}
        role="listbox"
        tabIndex={disabled ? -1 : 0}
        aria-label="چرخ انتخاب گرامری"
        aria-activedescendant={`wheel-opt-${activeIdx}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => finishDrag(e, false)}
        onPointerCancel={(e) => finishDrag(e, true)}
        onKeyDown={onKeyDown}
        onContextMenu={(e) => e.preventDefault()}
        className={`relative w-full max-w-[260px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded-2xl transition-shadow ${
          armed ? 'ring-2 ring-indigo-300 bg-indigo-50/30' : ''
        } ${
          disabled ? 'cursor-default' : dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          height: WHEEL_H,
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        } as React.CSSProperties}
      >
        {/* نوار هایلایت وسط */}
        <div
          className="absolute inset-x-2 bg-indigo-50/90 rounded-2xl border border-indigo-200/80 shadow-inner pointer-events-none"
          style={{ top: (WHEEL_H - ITEM_H) / 2, height: ITEM_H }}
        />

        {/* گزینه‌ها (محو شدن لبه‌ها با mask تا روی هر پس‌زمینه‌ای درست باشد) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ WebkitMaskImage: MASK, maskImage: MASK }}
        >
          {options.map((option, idx) => {
            const off = idx - pos;
            const a = Math.abs(off);
            if (a > 2.6) return null;
            const scale = Math.max(0.68, 1 - a * 0.16);
            const opacity = Math.max(0.12, 1 - a * 0.55);
            const active = idx === activeIdx;
            return (
              <div
                key={idx}
                id={`wheel-opt-${idx}`}
                role="option"
                aria-selected={idx === selectedIndex}
                className="absolute inset-x-0 flex items-center justify-center font-en px-3 whitespace-nowrap"
                style={{
                  top: (WHEEL_H - ITEM_H) / 2,
                  height: ITEM_H,
                  fontSize: 22,
                  fontWeight: active ? 800 : 600,
                  color: active ? '#4338ca' : '#64748b',
                  opacity,
                  transform: `translate3d(0, ${off * STEP}px, 0) scale(${scale})`,
                  transition: dragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0.9, 0.4, 1), opacity 0.22s ease, color 0.15s ease',
                  willChange: 'transform, opacity',
                }}
              >
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={disabled || selectedIndex === last}
        aria-label="گزینه بعدی چرخ"
        className="w-10 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-600 active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all"
      >
        <ChevronDown className="w-6 h-6 stroke-[2.5]" />
      </button>

      <div className="flex gap-1.5 mt-1 flex-wrap justify-center">
        {options.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => !disabled && onSelect(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selectedIndex ? 'bg-indigo-600 w-5' : 'bg-slate-300 hover:bg-slate-400 w-1.5'
            }`}
            aria-label={`رفتن به گزینه ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
