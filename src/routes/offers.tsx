import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Exclusive Offers | Lumina Wellness" },
      {
        name: "description",
        content: "Discover curated wellness promotions and member-only rewards at Lumina Wellness.",
      },
      { property: "og:title", content: "Exclusive Offers | Lumina Wellness" },
      {
        property: "og:description",
        content: "Discover curated wellness promotions and member-only rewards at Lumina Wellness.",
      },
    ],
  }),
  component: Offers,
});

const categories = ["All Offers", "Spa & Skin", "Massage Therapy", "Membership Perks", "Retreats"];

type Offer = {
  key: string;
  badge: string;
  title: string;
  description: string;
  code: string;
  validUntil: string;
};

const offers: Offer[] = [
  {
    key: "offer1",
    badge: "Limited Time",
    title: "First Visit Special — 20% Off",
    description: "Experience our signature treatments at a preferred rate for your inaugural visit to Lumina.",
    code: "LUMINA20",
    validUntil: "Dec 31, 2024",
  },
  {
    key: "offer2",
    badge: "Bestseller",
    title: "Wellness Week Bundle",
    description: "Buy 3 sessions of any 60-minute massage therapy and receive the 4th session complimentary.",
    code: "BUNDLEUP",
    validUntil: "Nov 15, 2024",
  },
];

function Offers() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 2000);
  };

  const toggleClaim = (key: string) => {
    setClaimed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <PortalShell
      title="Exclusive Offers"
      eyebrow="Promotions"
      subtitle="Curated wellness promotions and member-only rewards."
    >
      <div className="flex flex-wrap gap-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-md py-sm font-label-md text-label-md transition-colors ${
              activeCategory === cat
                ? "bg-primary text-on-primary"
                : "border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        {offers.map((offer) => (
          <div key={offer.key} className="card-surface flex flex-col gap-md p-lg">
            <div className="flex items-start justify-between gap-sm">
              <h3 className="font-headline-md text-headline-md text-primary">{offer.title}</h3>
              <span className="shrink-0 rounded-full bg-secondary-container px-sm py-xs font-label-sm text-label-sm text-on-secondary-container">
                {offer.badge}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">{offer.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-md border-t border-outline-variant pt-md">
              <div>
                <span className="mb-xs block font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  Promo Code
                </span>
                <div className="inline-flex items-center gap-xs rounded border border-dashed border-outline bg-surface-container-low px-sm py-xs">
                  <span className="font-label-md text-label-md font-bold text-primary">{offer.code}</span>
                  <button
                    className="material-symbols-outlined text-[18px] text-secondary hover:text-primary"
                    onClick={() => copyCode(offer.code)}
                  >
                    {copiedCode === offer.code ? "check" : "content_copy"}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="mb-xs block font-label-sm text-label-sm text-outline">Valid Until</span>
                <span className="font-label-md text-label-md font-medium text-on-surface">{offer.validUntil}</span>
              </div>
            </div>
            <button
              onClick={() => toggleClaim(offer.key)}
              className="mt-sm flex items-center justify-center gap-xs rounded-lg bg-primary px-md py-2.5 font-label-md text-label-md text-on-primary hover:bg-primary-container"
            >
              {claimed[offer.key] ? "Claimed" : "Claim Offer"}
              <span className="material-symbols-outlined text-[18px]">
                {claimed[offer.key] ? "check_circle" : "arrow_forward"}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-md flex flex-col justify-between gap-sm md:flex-row md:items-end">
          <div>
            <h2 className="flex items-center gap-xs font-headline-lg text-headline-lg text-primary">
              <span className="material-symbols-outlined text-secondary">stars</span>
              Member-Only Rewards
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Exclusive benefits tailored for our Lumina Circle members.
            </p>
          </div>
          <button className="font-label-md text-label-md text-secondary hover:underline">
            View Membership Plans
          </button>
        </div>

        <div className="grid grid-cols-1 gap-md md:grid-cols-3">
          <div className="card-surface flex min-h-[240px] flex-col justify-between p-lg md:col-span-2">
            <div>
              <span className="mb-md inline-block rounded-full border border-outline-variant bg-surface-container-low px-sm py-xs font-label-sm text-label-sm text-on-surface-variant">
                Gold &amp; Platinum Only
              </span>
              <h3 className="mb-sm font-headline-lg text-headline-lg text-primary">Weekend Retreat Upgrade</h3>
              <p className="max-w-[28rem] font-body-md text-body-md text-on-surface-variant">
                Members receive automatic suite upgrades on all weekend wellness retreats booked this quarter.
              </p>
            </div>
            <div className="mt-md flex items-center gap-lg">
              <button
                onClick={() => toggleClaim("retreat")}
                className="rounded-lg bg-primary px-lg py-2.5 font-label-md text-label-md text-on-primary hover:bg-primary-container"
              >
                {claimed["retreat"] ? "Claimed" : "Claim Now"}
              </button>
              <div className="text-on-surface-variant">
                <span className="block font-label-sm text-label-sm">Expires</span>
                <span className="font-label-md text-label-md font-bold">In 5 Days</span>
              </div>
            </div>
          </div>

          <div className="card-surface flex flex-col justify-between p-lg">
            <div>
              <div className="mb-md flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-on-secondary">
                <span className="material-symbols-outlined">redeem</span>
              </div>
              <h3 className="mb-xs font-headline-md text-headline-md text-primary">Monthly Gift</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Collect your complimentary essential oil kit from the concierge desk.
              </p>
            </div>
            <div className="mt-md">
              <div className="mb-md flex items-center gap-xs font-label-md text-label-md text-secondary">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Status: Ready to Collect</span>
              </div>
              <button
                onClick={() => toggleClaim("giftQr")}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 font-label-md text-label-md text-primary hover:bg-surface-container"
              >
                {claimed["giftQr"] ? "QR Code Sent" : "Get QR Code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
