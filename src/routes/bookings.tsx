import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My Bookings Dashboard | BookMyQ" },
      {
        name: "description",
        content: "View and manage your upcoming, completed, and cancelled bookings in one dashboard.",
      },
      { property: "og:title", content: "My Bookings Dashboard | BookMyQ" },
      {
        property: "og:description",
        content: "View and manage your upcoming, completed, and cancelled bookings in one dashboard.",
      },
    ],
  }),
  component: Bookings,
});

type Tab = "upcoming" | "completed" | "cancelled";

const tabs: { id: Tab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const bookingsByTab: Record<Tab, { key: string }[]> = {
  upcoming: [{ key: "spa" }, { key: "barber" }],
  completed: [{ key: "gym" }],
  cancelled: [],
};

function Bookings() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [search, setSearch] = useState("");

  const cards = bookingsByTab[activeTab];

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      <style>{`
        .booking-card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .booking-card-hover:hover { transform: translateY(-4px); box-shadow: 0px 12px 32px rgba(11, 44, 71, 0.12); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dde4e4; border-radius: 10px; }
      `}</style>
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</div>
          <nav className="hidden md:flex items-center gap-xl">
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" to="/">Home</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" to="/services">Services</Link>
            <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md transition-colors" to="/bookings">Bookings</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" to="/offers">Offers</Link>
          </nav>
          <div className="flex items-center gap-md">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border-2 border-primary-container">
              <img
                className="w-full h-full object-cover"
                alt="A professional close-up headshot of a friendly user."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjk365OE8FElVlYHf3mwZEjDUBM5rR5NsvF6av6bWz4htk4s9nHloKLr7dC3xNhHuDEvD_kcEzhGpTlor0g51GVgkdbR5h_5ar9KEvZk482_K2WdIbYUpTbTIqmJgcsoxi07YpUq8M0Hg4VVVHSwz--tLfmXYEr-OZic0nk-i5zsxaBNAvYxRz6MzjauVE-k460INSl870FobGbZ93NSBfIy8k5oOiZKuZSZWVkSNZ8u_pUUWoO7ofUZihs_ZDLv_iCpC0Wx-4w32a"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-container-max mx-auto px-md lg:px-xl py-lg">
        <section className="mb-lg">
          <div className="bg-surface-container-low rounded-xl p-md md:p-lg flex flex-col md:flex-row items-center gap-md md:gap-xl border border-surface-variant/50">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-on-primary shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  alt="A high-quality profile photograph of a smiling customer."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwGhwaL-QBjvPS6h-YDCfp4bF185uStLUu1ZK9TzjeGODAOlmPujSC-X-37osUSVUoRwzOLL556Oxy3RqbPPs-WZKSmP1Mbc7Xmez3YT9usT--TKwcY9GotHN8Zb0w1Bfus2BU9hriF7a8z_1YnVqYCG29TS6all5R5M5lSBcSwygM1Qbk0iRaVjA3DG1-R4vz0Il022_dAbhuP_A_T_uA3Vju6H0w_fqE7PXQjqZei5IBMrfwNwDXHdp68PYTunpQTtQEypzOD8xJ"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-secondary rounded-full border-4 border-surface-container-low"></div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">Welcome back, Alexandra</h1>
              <p className="text-on-surface-variant font-body-md mb-md">Manage your active appointments and booking history in one place.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-md">
                <div className="bg-surface-container-highest px-md py-sm rounded-lg flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">event_available</span>
                  <span className="font-label-md text-label-md text-on-surface">3 Upcoming</span>
                </div>
                <div className="bg-surface-container-highest px-md py-sm rounded-lg flex items-center gap-sm">
                  <span className="material-symbols-outlined text-on-tertiary-container">verified</span>
                  <span className="font-label-md text-label-md text-on-surface">12 Completed</span>
                </div>
              </div>
            </div>
            <button className="bg-primary text-on-primary px-xl py-md rounded-full font-label-md text-label-md hover:bg-primary-container transition-all active:scale-95 flex items-center gap-sm">
              <span className="material-symbols-outlined text-xl">add</span>
              New Booking
            </button>
          </div>
        </section>
        <section className="mb-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-surface-variant">
            <div className="flex gap-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-md border-b-2 font-label-md text-label-md transition-all ${
                    activeTab === tab.id
                      ? "border-secondary text-secondary font-bold"
                      : "border-transparent text-on-surface-variant font-medium hover:text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-sm mb-md md:mb-0">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input
                  className="pl-10 pr-md py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none w-full md:w-64 transition-all"
                  placeholder="Search bookings..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
              </button>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 gap-md" id="bookings-container" style={{ transition: "opacity 0.3s" }}>
          {activeTab === "upcoming" && (
            <>
              <div className="booking-card-hover bg-surface-container-lowest p-md md:p-lg rounded-xl border border-surface-variant shadow-[0px_4px_20px_rgba(11,44,71,0.05)] flex flex-col lg:flex-row lg:items-center gap-md lg:gap-xl">
                <div className="flex items-center gap-md lg:w-1/3">
                  <div className="w-16 h-16 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container text-3xl">spa</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary truncate">Serenity Wellness Spa</h3>
                    <p className="text-on-surface-variant font-label-md text-label-md">Full Body Aromatherapy</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-md lg:flex-1 lg:justify-center">
                  <div className="flex items-center gap-sm bg-surface-container px-md py-2 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">calendar_today</span>
                    <div>
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Date &amp; Time</p>
                      <p className="font-body-md text-body-md font-semibold">Oct 24, 2024 • 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-sm bg-secondary-container/30 px-md py-2 rounded-lg border border-secondary/20">
                    <span className="material-symbols-outlined text-secondary animate-pulse">timer</span>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Status</p>
                      <p className="font-body-md text-body-md font-bold text-on-secondary-container">Starting in 2 hours</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-sm lg:w-1/4 lg:justify-end">
                  <button className="flex-1 lg:flex-none px-md py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors">Reschedule</button>
                  <button className="flex-1 lg:flex-none px-md py-2 border border-error text-error rounded-lg font-label-md text-label-md hover:bg-error-container/20 transition-colors">Cancel</button>
                </div>
              </div>
              <div className="booking-card-hover bg-surface-container-lowest p-md md:p-lg rounded-xl border border-surface-variant shadow-[0px_4px_20px_rgba(11,44,71,0.05)] flex flex-col lg:flex-row lg:items-center gap-md lg:gap-xl">
                <div className="flex items-center gap-md lg:w-1/3">
                  <div className="w-16 h-16 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-fixed text-3xl">content_cut</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary truncate">The Modern Barber</h3>
                    <p className="text-on-surface-variant font-label-md text-label-md">Signature Haircut &amp; Beard Trim</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-md lg:flex-1 lg:justify-center">
                  <div className="flex items-center gap-sm bg-surface-container px-md py-2 rounded-lg">
                    <span className="material-symbols-outlined text-outline">calendar_today</span>
                    <div>
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Date &amp; Time</p>
                      <p className="font-body-md text-body-md font-semibold">Oct 28, 2024 • 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-sm bg-surface-container px-md py-2 rounded-lg">
                    <span className="material-symbols-outlined text-outline">info</span>
                    <div>
                      <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</p>
                      <p className="font-body-md text-body-md font-semibold text-on-surface-variant">Confirmed</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-sm lg:w-1/4 lg:justify-end">
                  <button className="flex-1 lg:flex-none px-md py-2 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors">Reschedule</button>
                  <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors" title="View Details">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
            </>
          )}
          {activeTab === "completed" && (
            <div className="booking-card-hover bg-surface-container-lowest/50 p-md md:p-lg rounded-xl border border-surface-variant border-dashed flex flex-col lg:flex-row lg:items-center gap-md lg:gap-xl">
              <div className="flex items-center gap-md lg:w-1/3 grayscale opacity-70">
                <div className="w-16 h-16 rounded-xl bg-tertiary-fixed-dim flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">fitness_center</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary truncate">Peak Performance Gym</h3>
                  <p className="text-on-surface-variant font-label-md text-label-md">Personal Training Session</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-md lg:flex-1 lg:justify-center opacity-70">
                <div className="flex items-center gap-sm px-md py-2">
                  <span className="material-symbols-outlined text-outline">task_alt</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</p>
                    <p className="font-body-md text-body-md font-semibold">Completed Oct 20</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-sm lg:w-1/4 lg:justify-end">
                <button className="flex-1 lg:flex-none px-md py-2 border border-secondary text-secondary rounded-lg font-label-md text-label-md hover:bg-secondary-container/20 transition-colors flex items-center justify-center gap-xs">
                  <span className="material-symbols-outlined text-lg">repeat</span> Repeat
                </button>
                <button className="flex-1 lg:flex-none px-md py-2 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-xs">
                  <span className="material-symbols-outlined text-lg">receipt_long</span> Invoice
                </button>
              </div>
            </div>
          )}
          {activeTab === "cancelled" && cards.length === 0 && (
            <div className="text-center py-xl text-on-surface-variant font-body-md">No cancelled bookings.</div>
          )}
        </section>
      </main>
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link
          to="/concierge"
          className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim text-secondary dark:text-secondary-fixed w-16 h-16 rounded-full shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-pulse-slow active:scale-95 group"
        >
          <span className="material-symbols-outlined text-on-secondary text-3xl transition-transform duration-500 group-hover:rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>
            smart_toy
          </span>
        </Link>
      </div>
      <footer className="w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm mt-xl border-t border-surface-variant dark:border-outline-variant py-md bg-background dark:bg-background">
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Powered by BookMyQ • Built for SMEs</div>
        <div className="flex gap-md">
          <a className="text-outline font-label-sm text-label-sm hover:text-on-background transition-colors" href="#">Privacy Policy</a>
          <a className="text-outline font-label-sm text-label-sm hover:text-on-background transition-colors" href="#">Terms of Service</a>
          <a className="text-outline font-label-sm text-label-sm hover:text-on-background transition-colors" href="#">Contact Support</a>
        </div>
        <div className="text-outline font-label-sm text-label-sm">© 2024 BookMyQ</div>
      </footer>
    </div>
  );
}
