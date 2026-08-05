import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { PortalShell } from "@/components/portal-shell";
import {
  DEPOSIT_RATE,
  PROMOS,
  money,
  saveCheckout,
  type PayMode,
} from "@/lib/checkout-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Payment & Offers | BookMyQ" },
      {
        name: "description",
        content:
          "Apply an offer code and choose to pay in full online or pay a booking amount now and the balance at the counter.",
      },
      { property: "og:title", content: "Payment & Offers | BookMyQ" },
      {
        property: "og:description",
        content: "Apply offers and pay in full or pay a booking deposit for your BookMyQ appointment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const SUBTOTAL = 185;
const MEMBER_RATE = 0.15;
const SERVICE = "Executive Wellness Audit";

function CheckoutPage() {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [payMode, setPayMode] = useState<PayMode>("full");
  const [method, setMethod] = useState("card");

  const totals = useMemo(() => {
    const memberDiscount = SUBTOTAL * MEMBER_RATE;
    const afterMember = SUBTOTAL - memberDiscount;
    const promo = appliedCode ? PROMOS[appliedCode] : null;
    const promoDiscount = promo
      ? promo.type === "percent"
        ? (afterMember * promo.value) / 100
        : promo.value
      : 0;
    const total = Math.max(0, afterMember - promoDiscount);
    const paidNow = payMode === "full" ? total : Math.round(total * DEPOSIT_RATE * 100) / 100;
    return {
      memberDiscount,
      promoDiscount,
      total,
      paidNow,
      dueAtCounter: Math.round((total - paidNow) * 100) / 100,
    };
  }, [appliedCode, payMode]);

  const applyCode = () => {
    const code = codeInput.trim().toUpperCase();
    if (!code) return;
    if (!PROMOS[code]) {
      setError("That code isn't valid for this booking.");
      setAppliedCode(null);
      return;
    }
    setError(null);
    setAppliedCode(code);
  };

  const pay = () => {
    saveCheckout({
      service: SERVICE,
      subtotal: SUBTOTAL,
      memberDiscount: totals.memberDiscount,
      promoCode: appliedCode,
      promoDiscount: totals.promoDiscount,
      total: totals.total,
      payMode,
      paidNow: totals.paidNow,
      dueAtCounter: totals.dueAtCounter,
    });
    navigate({ to: "/confirmation" });
  };

  return (
    <PortalShell
      title="Payment & Offers"
      subtitle="Apply your offer and choose how you'd like to pay for this appointment."
      eyebrow="Booking · Payment"
      actions={
        <Link
          to="/review"
          className="flex items-center gap-xs rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 font-label-md text-primary hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to review
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-xl lg:grid-cols-12">
        <div className="space-y-md lg:col-span-7">
          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="mb-base font-headline-md text-headline-md text-primary">Offers & discount code</h2>
            <div className="flex flex-col gap-sm sm:flex-row">
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyCode()}
                placeholder="Enter code e.g. LUMINA20"
                aria-label="Discount code"
                className="flex-1 rounded-lg border border-outline-variant bg-surface px-md py-2.5 font-body-md text-on-surface outline-none placeholder:text-outline focus:border-secondary"
              />
              <button
                onClick={applyCode}
                className="rounded-lg bg-primary px-lg py-2.5 font-label-md text-on-primary hover:bg-primary-container"
              >
                Apply
              </button>
            </div>
            {error && <p className="mt-sm font-label-md text-error">{error}</p>}
            {appliedCode && (
              <div className="mt-sm flex items-center justify-between rounded-lg border border-outline-variant bg-secondary-container px-md py-sm">
                <span className="flex items-center gap-xs font-label-md text-on-secondary-container">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  {appliedCode} applied — {PROMOS[appliedCode].label}
                </span>
                <button
                  onClick={() => {
                    setAppliedCode(null);
                    setCodeInput("");
                  }}
                  className="font-label-sm text-on-secondary-container underline"
                >
                  Remove
                </button>
              </div>
            )}
            <div className="mt-md flex flex-wrap gap-xs">
              {Object.keys(PROMOS).map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setCodeInput(code);
                    setAppliedCode(code);
                    setError(null);
                  }}
                  className="rounded-full border border-dashed border-outline-variant px-sm py-1 font-label-sm text-on-surface-variant hover:border-secondary hover:text-secondary"
                >
                  {code}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="mb-base font-headline-md text-headline-md text-primary">How would you like to pay?</h2>
            <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
              <PayOption
                selected={payMode === "full"}
                onSelect={() => setPayMode("full")}
                icon="credit_score"
                title="Pay in full now"
                amount={money(totals.total)}
                description="Settle the entire amount online. Nothing to pay at the counter."
              />
              <PayOption
                selected={payMode === "deposit"}
                onSelect={() => setPayMode("deposit")}
                icon="account_balance_wallet"
                title={`Pay booking amount (${Math.round(DEPOSIT_RATE * 100)}%)`}
                amount={money(Math.round(totals.total * DEPOSIT_RATE * 100) / 100)}
                description="Reserve your slot now and pay the balance at the enterprise counter."
              />
            </div>

            <div className="mt-md space-y-sm">
              <p className="font-label-sm uppercase tracking-widest text-outline">Payment method</p>
              {[
                { id: "card", label: "Credit / Debit card", icon: "credit_card" },
                { id: "upi", label: "UPI / Wallet", icon: "qr_code_2" },
                { id: "netbanking", label: "Net banking", icon: "account_balance" },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-sm rounded-lg border px-md py-sm transition-colors ${
                    method === m.id
                      ? "border-secondary bg-secondary-container/40"
                      : "border-outline-variant hover:bg-surface-container"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    className="accent-primary"
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                  />
                  <span className="material-symbols-outlined text-secondary">{m.icon}</span>
                  <span className="font-body-md text-on-surface">{m.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <h2 className="font-headline-md text-headline-md text-primary">Order summary</h2>
            <p className="font-body-md text-on-surface-variant">{SERVICE} · 90 minutes</p>
            <div className="space-y-sm">
              <Row label="Service subtotal" value={money(SUBTOTAL)} />
              <Row label="Membership discount (15%)" value={`- ${money(totals.memberDiscount)}`} tone />
              {appliedCode && (
                <Row label={`Offer ${appliedCode}`} value={`- ${money(totals.promoDiscount)}`} tone />
              )}
              <div className="border-t border-dashed border-outline-variant pt-sm">
                <Row label="Total payable" value={money(totals.total)} strong />
              </div>
            </div>

            <div className="rounded-lg bg-primary-container p-md">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-on-primary-container">Paying now</span>
                <span className="font-headline-md text-headline-md text-on-primary">{money(totals.paidNow)}</span>
              </div>
              {payMode === "deposit" && (
                <div className="mt-xs flex items-center justify-between font-label-md text-on-primary-container">
                  <span>Due at counter</span>
                  <span>{money(totals.dueAtCounter)}</span>
                </div>
              )}
            </div>

            <button
              onClick={pay}
              className="flex w-full items-center justify-center gap-base rounded-lg bg-primary px-md py-3 font-label-md text-on-primary hover:bg-primary-container"
            >
              {payMode === "full" ? "Pay & confirm booking" : "Pay booking amount & confirm"}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <div className="flex items-center gap-base font-label-sm text-outline">
              <span className="material-symbols-outlined text-base">security</span>
              Secure 256-bit encrypted checkout
            </div>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}

function Row({ label, value, tone, strong }: { label: string; value: string; tone?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`font-body-md ${tone ? "text-on-secondary-container" : "text-on-surface-variant"}`}>
        {label}
      </span>
      <span
        className={
          strong
            ? "font-headline-md text-headline-md text-primary"
            : `font-body-lg ${tone ? "text-on-secondary-container" : "text-primary"}`
        }
      >
        {value}
      </span>
    </div>
  );
}

function PayOption({
  selected,
  onSelect,
  icon,
  title,
  amount,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: string;
  title: string;
  amount: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex h-full flex-col items-start gap-xs rounded-xl border p-md text-left transition-colors ${
        selected ? "border-secondary bg-secondary-container/40" : "border-outline-variant hover:bg-surface-container"
      }`}
    >
      <span className="flex items-center gap-xs font-label-md text-primary">
        <span className="material-symbols-outlined text-secondary">{icon}</span>
        {title}
      </span>
      <span className="font-headline-md text-headline-md text-primary">{amount}</span>
      <span className="font-body-md text-on-surface-variant">{description}</span>
    </button>
  );
}
