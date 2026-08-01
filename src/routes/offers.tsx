import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

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
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container min-h-screen">
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-50">
        <nav className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-base">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</span>
          </div>
          <div className="hidden md:flex items-center gap-lg">
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/services">Services</Link>
            <a className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" href="#">Bookings</a>
            <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md" to="/offers">Offers</Link>
          </div>
          <div className="flex items-center gap-md">
            <Link className="p-2 rounded-full hover:bg-surface-container transition-colors" to="/notifications">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </Link>
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
            </button>
          </div>
        </nav>
      </header>
      <main className="max-w-container-max mx-auto px-md lg:px-xl py-lg">
        <section className="mb-xl text-center md:text-left">
          <h1 className="font-display-lg text-display-lg text-primary mb-sm">Exclusive Offers</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Discover curated wellness promotions designed to elevate your self-care journey at Lumina Wellness.
          </p>
        </section>
        <section className="mb-lg overflow-x-auto pb-xs">
          <div className="flex gap-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-md py-sm rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0px_4px_20px_rgba(11,44,71,0.05)] offer-card-hover border border-surface-variant/50">
            <div className="aspect-[16/9] relative">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDoHDojxHEBotLa2lGEzuSSnwj8cataWUcOEAIEDpNmWABkGSaxkCbtQymSF7mt-M9iIhh7wQJFhSA4Ww1SUZO9gFCf_VF0I2Dw8BICmJzjLRpK5DAaJ1OeEIcI_mQ-RymAHKHA58pHkv-eK_Jv5lBmm1vdSzU8Vsl5LR8B5wmvLtOwo2X4-RhDZJFUfDPViZ93YDQiwwkkZouoSgakY0FVrDgKrfX9Ez-3gMp0gMeEqbD3XVimxSojFTX83ys_PzXN-9YD28IPUDSU')",
                }}
              ></div>
              <div className="absolute top-md right-md bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm text-label-sm">Limited Time</div>
            </div>
            <div className="p-lg">
              <h3 className="font-headline-md text-headline-md text-primary mb-xs">First Visit Special — 20% Off</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                Experience our signature treatments at a preferred rate for your inaugural visit to Lumina.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-md border-t border-surface-variant pt-md">
                <div>
                  <span className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-xs">Promo Code</span>
                  <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded border border-dashed border-outline/30">
                    <span className="font-label-md text-label-md text-primary font-bold">LUMINA20</span>
                    <button
                      className={`material-symbols-outlined text-[18px] transition-colors ${copiedCode === "LUMINA20" ? "text-green-600" : "text-secondary hover:text-primary"}`}
                      onClick={() => copyCode("LUMINA20")}
                    >
                      {copiedCode === "LUMINA20" ? "check" : "content_copy"}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-label-sm text-label-sm text-outline mb-xs">Valid Until</span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">Dec 31, 2024</span>
                </div>
              </div>
              <button
                onClick={() => toggleClaim("offer1")}
                className="w-full mt-lg py-md bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-xs"
              >
                {claimed['offer1'] ? "Claimed" : "Claim Offer"} <span className="material-symbols-outlined">{claimed['offer1'] ? "check_circle" : "arrow_forward"}</span>
              </button>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0px_4px_20px_rgba(11,44,71,0.05)] offer-card-hover border border-surface-variant/50">
            <div className="aspect-[16/9] relative">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2DpgZfbAYzXJr5ze6CFWRYEeCBCu0SxJgqrXScFFO5a8XY6_RqxmG-MpBszi45YS6HFSUbtDCG0LD9poW-o4fdmoY6SDJgWHNNaFxHs_9_uTkMzIgldzQ5g8yz9ILyiUHcc4H_w3cB68Ev11YfyZ2cpILpChKfYYHg0zfYY_9YWBo6m6gJCfZ-jHVNkWUZWguzhi7C3j_5FxLMf7VWzANrO_jCDWAisSikoI09w8QiAfrvL63GaYiDC6g8mN3OFqtCnhoTjhYUGWK')",
                }}
              ></div>
              <div className="absolute top-md right-md bg-tertiary-fixed text-on-tertiary-fixed px-sm py-xs rounded-full font-label-sm text-label-sm">Bestseller</div>
            </div>
            <div className="p-lg">
              <h3 className="font-headline-md text-headline-md text-primary mb-xs">Wellness Week Bundle</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                Buy 3 sessions of any 60-minute massage therapy and receive the 4th session complimentary.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-md border-t border-surface-variant pt-md">
                <div>
                  <span className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-xs">Promo Code</span>
                  <div className="inline-flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded border border-dashed border-outline/30">
                    <span className="font-label-md text-label-md text-primary font-bold">BUNDLEUP</span>
                    <button
                      className={`material-symbols-outlined text-[18px] transition-colors ${copiedCode === "BUNDLEUP" ? "text-green-600" : "text-secondary hover:text-primary"}`}
                      onClick={() => copyCode("BUNDLEUP")}
                    >
                      {copiedCode === "BUNDLEUP" ? "check" : "content_copy"}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-label-sm text-label-sm text-outline mb-xs">Valid Until</span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">Nov 15, 2024</span>
                </div>
              </div>
              <button
                onClick={() => toggleClaim("offer2")}
                className="w-full mt-lg py-md bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-xs"
              >
                {claimed['offer2'] ? "Claimed" : "Claim Offer"} <span className="material-symbols-outlined">{claimed['offer2'] ? "check_circle" : "arrow_forward"}</span>
              </button>
            </div>
          </div>
        </section>
        <section className="mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary flex items-center gap-xs">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                Member-Only Rewards
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Exclusive benefits tailored for our Lumina Circle members.</p>
            </div>
            <button className="text-secondary font-label-md text-label-md hover:underline flex items-center gap-xs">
              View Membership Plans <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="md:col-span-2 bg-primary text-on-primary rounded-2xl p-lg relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <div
                  className="w-full h-full bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_NZylkf-NXfRl6Ul--nH0ELGprpyAbqQ7yPrqTlZYcRwfqcuGgf6ITPJtYc5HCyocIuuxPVNp4u6wLE6n-sOZy1eqzYrwOyT9-9orW-zS5sjSrd7B01qfhy_yOIh9gn_XKZCfJ_ZGB1Lukqc22nSx6D3QGdANfhhxiicnr37Z112PnHLA5U9KNzLustQsaPTw1XLPTlF5Q84DlajhGW1U0MiMgGR2iM6f6hsu1-xUcmi5w42cwDvVWNjB60dZ3harrd6s3BMmh8VZ')",
                  }}
                ></div>
              </div>
              <div className="relative z-10">
                <span className="inline-block px-sm py-xs bg-white/10 backdrop-blur-md rounded-full font-label-sm text-label-sm border border-white/20 mb-md">Gold &amp; Platinum Only</span>
                <h3 className="font-display-lg text-headline-lg mb-sm">Weekend Retreat Upgrade</h3>
                <p className="font-body-md text-on-primary-container max-w-md">
                  Members receive automatic suite upgrades on all weekend wellness retreats booked this quarter.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-lg mt-md">
                <button
                  onClick={() => toggleClaim("retreat")}
                  className="px-lg py-sm bg-secondary-container text-on-secondary-container rounded-lg font-label-md text-label-md hover:bg-white transition-all"
                >
                  {claimed['retreat'] ? "Claimed" : "Claim Now"}
                </button>
                <div className="text-white/60">
                  <span className="font-label-sm text-label-sm block">Expires</span>
                  <span className="font-label-md font-bold">In 5 Days</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-high rounded-2xl p-lg flex flex-col justify-between border border-surface-variant">
              <div>
                <div className="w-12 h-12 bg-secondary text-on-secondary rounded-xl flex items-center justify-center mb-md shadow-lg">
                  <span className="material-symbols-outlined">redeem</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-xs">Monthly Gift</h3>
                <p className="font-body-md text-on-surface-variant">Collect your complimentary essential oil kit from the concierge desk.</p>
              </div>
              <div className="mt-md">
                <div className="flex items-center gap-xs text-secondary font-label-md mb-md">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span>Status: Ready to Collect</span>
                </div>
                <button
                  onClick={() => toggleClaim("giftQr")}
                  className="w-full py-sm border-2 border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all"
                >
                  {claimed['giftQr'] ? "QR Code Sent" : "Get QR Code"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link
          to="/concierge"
          className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim w-16 h-16 rounded-full shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center animate-pulse-slow active:scale-95 transition-transform duration-300"
        >
          <span className="material-symbols-outlined text-on-secondary text-[32px]">bolt</span>
        </Link>
      </div>
      <footer className="bg-background dark:bg-background full-width py-md border-t border-surface-variant dark:border-outline-variant mt-xl">
        <div className="w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm max-w-container-max mx-auto">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Powered by BookMyQ • Built for SMEs</span>
          <div className="flex gap-md">
            <a className="text-outline font-label-sm text-label-sm hover:text-on-background transition-colors" href="#">Privacy Policy</a>
            <a className="text-outline font-label-sm text-label-sm hover:text-on-background transition-colors" href="#">Terms of Service</a>
            <a className="text-outline font-label-sm text-label-sm hover:text-on-background transition-colors" href="#">Contact Support</a>
          </div>
          <div className="text-outline font-label-sm text-label-sm">© 2024 Lumina Wellness</div>
        </div>
      </footer>
    </div>
  );
}
