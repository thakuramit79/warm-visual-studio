import { useEffect, useState } from "react";

export type PayMode = "full" | "deposit";

export interface CheckoutSummary {
  service: string;
  subtotal: number;
  memberDiscount: number;
  promoCode: string | null;
  promoDiscount: number;
  total: number;
  payMode: PayMode;
  paidNow: number;
  dueAtCounter: number;
}

export const PROMOS: Record<string, { label: string; type: "percent" | "flat"; value: number }> = {
  LUMINA20: { label: "First Visit Special — 20% off", type: "percent", value: 20 },
  BUNDLEUP: { label: "Bundle Up — 10% off", type: "percent", value: 10 },
  EARLYBIRD: { label: "Early Bird Promo — $10 off", type: "flat", value: 10 },
};

export const DEPOSIT_RATE = 0.25;

const STORAGE_KEY = "bookmyq.checkout";

export function saveCheckout(summary: CheckoutSummary) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(summary));
}

export function readCheckout(): CheckoutSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CheckoutSummary) : null;
  } catch {
    return null;
  }
}

export function useCheckout() {
  const [checkout, setCheckout] = useState<CheckoutSummary | null>(null);
  useEffect(() => setCheckout(readCheckout()), []);
  return checkout;
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
