import React from 'react';
import { Check, Crown, LoaderCircle, RefreshCw, X } from 'lucide-react';
import { DISCOUNT_CAMPAIGN_END, isDiscountCampaignActive } from '../utils/premiumAccess';

interface PremiumUpgradeModalProps {
  open: boolean;
  isPremium: boolean;
  busy: boolean;
  message: string;
  onClose: () => void;
  onBuy: () => void;
  onRestore: () => void;
}

export const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({
  open, isPremium, busy, message, onClose, onBuy, onRestore,
}) => {
  if (!open) return null;

  const promoActive = isDiscountCampaignActive();
  const promoEndLabel = DISCOUNT_CAMPAIGN_END.toLocaleDateString('fa-IR');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-title"
        onClick={event => event.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-2xl"
      >
        <div className="relative bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 px-6 pb-6 pt-7 text-white">
          <button type="button" onClick={onClose} aria-label="بستن" className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
            <X className="h-4 w-4" />
          </button>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20"><Crown className="h-7 w-7 text-amber-200" /></div>
          <h2 id="premium-title" className="mt-4 text-xl font-black">{isPremium ? 'نسخهٔ کامل فعاله' : 'دسترسی کامل لینگوپلاس'}</h2>
          <p className="mt-1 text-sm leading-relaxed text-white/80">یک‌بار خرید کن و برای همیشه به همهٔ امکانات دسترسی داشته باش.</p>
        </div>

        <div className="space-y-4 p-5">
          <ul className="space-y-2.5 text-sm text-slate-700">
            {[
              'همهٔ ۳۶۵ واژه و فلش‌کارت‌ها',
              'جعبهٔ لایتنر بدون محدودیت زمانی',
              'املا برای همهٔ واژه‌ها',
              'همهٔ تمرین‌های باشگاه جمله‌سازی',
            ].map(item => <li key={item} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-3.5 w-3.5" /></span><span>{item}</span></li>)}
          </ul>

          {!isPremium && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-center">
              {promoActive ? <>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500"><span className="line-through">۱۴۹٬۰۰۰ تومان</span><span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-700">پیشنهاد شروع</span></div>
                <p className="mt-1 text-2xl font-black text-indigo-800">۵۹٬۰۰۰ <span className="text-sm">تومان</span></p>
                <p className="mt-1 text-[10px] text-slate-500">تا {promoEndLabel}؛ مبلغ نهایی در صفحهٔ پرداخت بازار نمایش داده می‌شود.</p>
              </> : <>
                <p className="text-sm font-bold text-indigo-900">خرید یک‌باره؛ دسترسی همیشگی</p>
                <p className="mt-1 text-[11px] text-slate-500">مبلغ نهایی را در صفحهٔ پرداخت بازار می‌بینی.</p>
              </>}
            </div>
          )}

          {message && <p role="status" className="rounded-xl bg-amber-50 px-3 py-2 text-center text-xs leading-relaxed text-amber-800">{message}</p>}

          {!isPremium && <>
            <button type="button" disabled={busy} onClick={onBuy} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-700 px-4 py-3 text-sm font-black text-white shadow-md transition hover:bg-indigo-800 disabled:cursor-wait disabled:opacity-60">
              {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />}
              {busy ? 'در حال اتصال به بازار…' : 'خرید نسخهٔ کامل'}
            </button>
            <button type="button" disabled={busy} onClick={onRestore} className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50">
              <RefreshCw className="h-3.5 w-3.5" /> بازیابی خرید قبلی
            </button>
          </>}

          {isPremium && <button type="button" onClick={onClose} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white">ادامهٔ یادگیری</button>}
        </div>
      </section>
    </div>
  );
};
