export const PREMIUM_STORAGE_KEY = 'lingoplus_premium_owned_v1';
const FIRST_LAUNCH_STORAGE_KEY = 'lingoplus_first_launch_v1';

export const FREE_WORD_LIMIT = 150;
export const FREE_SPELLING_WORD_LIMIT = 20;
export const FREE_SENTENCE_QUESTION_LIMIT = 20;
export const LEITNER_TRIAL_DAYS = 7;

export const BAZAAR_PRODUCT_ID = 'lingoplusapp';
export const BAZAAR_RSA_PUBLIC_KEY = 'MIHNMA0GCSqGSIb3DQEBAQUAA4G7ADCBtwKBrwChunvxdxnu8yBSZTwIuACdXzpAz+pzOLinlnQU28TUh+5/jeWhMq/0vdnCC3ztPZiCAV9KNS3UBHfajRvYO1/lytuD+eGfejBv53SpVwTsWpMnOrFWjzDXXdQzFrvwLhBsxJjxn5bhhI7Ktmnxo8CS6ccYFfPsez5zc2DSJtZBibyhJLGcHqAwcO77t7M4aFMn8Moz+sYJtP++Yg8iHX2PXAyATg04KW75XtgNMnECAwEAAQ==';
export const BAZAAR_DYNAMIC_PRICE_TOKEN = 'YdVmhnje9YLQRyA0ItZX5VQzST502Ok6SxVOkOVWGjQ';

// کمپین شروع از زمان آماده‌سازی نسخه؛ پس از این تاریخ توکن تخفیف ارسال نمی‌شود.
export const DISCOUNT_CAMPAIGN_END = new Date('2026-12-12T23:59:59+03:30');

export const isDiscountCampaignActive = (now = Date.now()) => now < DISCOUNT_CAMPAIGN_END.getTime();

export function getFirstLaunchTime(): number {
  try {
    const stored = Number(localStorage.getItem(FIRST_LAUNCH_STORAGE_KEY));
    if (Number.isFinite(stored) && stored > 0) return stored;
    const firstLaunch = Date.now();
    localStorage.setItem(FIRST_LAUNCH_STORAGE_KEY, String(firstLaunch));
    return firstLaunch;
  } catch {
    return Date.now();
  }
}

export function isLeitnerTrialExpired(firstLaunchTime: number, now = Date.now()): boolean {
  return now - firstLaunchTime >= LEITNER_TRIAL_DAYS * 24 * 60 * 60 * 1000;
}

export function readPremiumEntitlement(): boolean {
  try {
    return localStorage.getItem(PREMIUM_STORAGE_KEY) === 'yes';
  } catch {
    return false;
  }
}

export function writePremiumEntitlement(owned: boolean): void {
  try {
    if (owned) localStorage.setItem(PREMIUM_STORAGE_KEY, 'yes');
    else localStorage.removeItem(PREMIUM_STORAGE_KEY);
  } catch {
    // Bazaar purchase ownership is queried again on the next app launch.
  }
}
