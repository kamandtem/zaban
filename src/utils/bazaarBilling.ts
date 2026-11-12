import { Capacitor, registerPlugin } from '@capacitor/core';
import {
  BAZAAR_DYNAMIC_PRICE_TOKEN,
  BAZAAR_PRODUCT_ID,
  BAZAAR_RSA_PUBLIC_KEY,
  isDiscountCampaignActive,
} from './premiumAccess';

interface BazaarBillingPlugin {
  initialize(options: { rsaPublicKey: string }): Promise<{ connected: boolean }>;
  getPurchasedProducts(): Promise<{ productIds: string[] }>;
  purchaseProduct(options: {
    productId: string;
    dynamicPriceToken?: string;
  }): Promise<{ productId: string }>;
}

const BazaarBilling = registerPlugin<BazaarBillingPlugin>('BazaarBilling');

export const isBazaarAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

export async function connectToBazaar(): Promise<void> {
  if (!isBazaarAndroid()) throw new Error('پرداخت فقط در نسخه‌ی اندروید نصب‌شده از بازار در دسترس است.');
  await BazaarBilling.initialize({ rsaPublicKey: BAZAAR_RSA_PUBLIC_KEY });
}

export async function queryPremiumPurchase(): Promise<boolean> {
  const result = await BazaarBilling.getPurchasedProducts();
  return result.productIds.includes(BAZAAR_PRODUCT_ID);
}

export async function buyPremiumOnce(): Promise<void> {
  if (!isBazaarAndroid()) throw new Error('برای خرید، برنامه را روی گوشی اندرویدی با بازار نصب و اجرا کن.');
  const result = await BazaarBilling.purchaseProduct({
    productId: BAZAAR_PRODUCT_ID,
    ...(isDiscountCampaignActive() ? { dynamicPriceToken: BAZAAR_DYNAMIC_PRICE_TOKEN } : {}),
  });
  if (result.productId !== BAZAAR_PRODUCT_ID) throw new Error('شناسهٔ محصول خریداری‌شده با محصول نسخهٔ کامل هم‌خوانی ندارد.');
}
