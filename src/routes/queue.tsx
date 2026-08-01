import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/queue")({
  head: () => ({
    meta: [
      { title: "Live Queue Tracker | BookMyQ" },
      {
        name: "description",
        content: "Track your live position in the queue with real-time updates and estimated wait time.",
      },
      { property: "og:title", content: "Live Queue Tracker | BookMyQ" },
      {
        property: "og:description",
        content: "Track your live position in the queue with real-time updates and estimated wait time.",
      },
    ],
  }),
  component: Queue,
});

const CIRCUMFERENCE = 691.15;

function Queue() {
  const [position, setPosition] = useState(4);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [pulse, setPulse] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo((s) => (s + 5) % 60);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((p) => (p > 1 ? p - 1 : p));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.max(0, Math.min(1, (10 - position) / 10));
  const dashOffset = CIRCUMFERENCE - progress * CIRCUMFERENCE;

  const handlePulse = (id: string) => {
    setPulse(id);
    setTimeout(() => setPulse(null), 200);
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-base">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</span>
          </div>
          <nav className="hidden md:flex gap-xl items-center">
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/services">Services</Link>
            <Link className="font-label-md text-label-md text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1" to="/bookings">Bookings</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/offers">Offers</Link>
          </nav>
          <div className="flex items-center gap-md">
            <button className="p-2 rounded-full hover:bg-surface-container transition-colors relative">
              <span className="material-symbols-outlined text-on-surface">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
              <img
                className="w-full h-full object-cover"
                alt="A professional business user avatar."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSEmA8STjzzBae_hv67zkLZ6L3oyBazLMAVcdMXO5ZW2CgK1QIsukPEukSeOjVHI9N__yruf_4ODvfbqkrR4H9Dmi1eLKsxr25FmVTE6yChPllG7PKDbUiGzfZhrDYbdwq0T9x9hM35KqRL6JqfQ344II0gFu2bvmqcAKw5GQmZ9TQPe_jkZi4zp5oigVq-d5ChuEZY5Cx46NzjflnTJ1KwHMQCAW1pQbwKW4XQUXUWdSgBy3lh-sAJEOrbDWtbTFGY7SPa1pZLsL_"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-md py-xl lg:py-xl">
        <style>{`
          .glass-card { background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
          @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 0.5; } 50% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(0.95); opacity: 0.5; } }
          .animate-pulse-ring { animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          .progress-ring__circle { transition: stroke-dashoffset 0.35s; transform: rotate(-90deg); transform-origin: 50% 50%; }
        `}</style>
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          <div className="flex flex-col items-center justify-center space-y-md">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-[280px] h-[280px] rounded-full bg-secondary-container/20 animate-pulse-ring"></div>
              <svg className="w-[260px] h-[260px] drop-shadow-lg">
                <circle className="text-surface-container-highest" cx={130} cy={130} fill="transparent" r={110} stroke="currentColor" strokeWidth={12}></circle>
                <circle
                  className="text-secondary progress-ring__circle"
                  cx={130}
                  cy={130}
                  fill="transparent"
                  r={110}
                  stroke="currentColor"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  strokeWidth={12}
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">Your Position</p>
                <h1 className="font-display-lg text-display-lg text-primary leading-none">{position}</h1>
                <p className="font-body-md text-body-md text-secondary font-semibold mt-xs">
                  {position <= 3 ? "Next soon" : "In queue"}
                </p>
              </div>
            </div>
            <div className="w-full max-w-xs flex flex-col items-center space-y-sm">
              <div className="flex items-center gap-sm bg-secondary-container/30 px-md py-sm rounded-full border border-secondary-fixed">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                <p className="font-label-md text-label-md text-on-secondary-container font-bold">Queue active &amp; moving</p>
              </div>
              <p className="font-label-sm text-label-sm text-outline">Last updated {secondsAgo} seconds ago</p>
            </div>
          </div>
          <div className="space-y-md">
            <div className="glass-card p-xl rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] border border-white/40">
              <h2 className="font-headline-md text-headline-md text-primary mb-md">Status Overview</h2>
              <div className="grid grid-cols-2 gap-md mb-xl">
                <div className="bg-surface-container-low p-md rounded-lg border border-surface-variant/50">
                  <p className="font-label-sm text-label-sm text-outline mb-xs">Est. Wait</p>
                  <p className="font-headline-md text-headline-md text-on-surface">{position * 4 + 2} mins</p>
                </div>
                <div className="bg-surface-container-low p-md rounded-lg border border-surface-variant/50">
                  <p className="font-label-sm text-label-sm text-outline mb-xs">In Front</p>
                  <p className="font-headline-md text-headline-md text-on-surface">{Math.max(position - 1, 0)} People</p>
                </div>
              </div>
              <div className="space-y-sm">
                <button
                  onClick={() => handlePulse("notify")}
                  className="w-full flex items-center justify-center gap-sm bg-primary text-on-primary py-md px-lg rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all shadow-md active:scale-95"
                >
                  <span
                    className="material-symbols-outlined transition-transform duration-200"
                    style={{ transform: pulse === "notify" ? "scale(1.2)" : "scale(1)" }}
                  >
                    notifications_active
                  </span>
                  Notify Me
                </button>
                <div className="grid grid-cols-2 gap-sm">
                  <button
                    onClick={() => handlePulse("checkin")}
                    className="flex items-center justify-center gap-sm bg-secondary-container text-on-secondary-container py-md px-md rounded-xl font-label-md text-label-md hover:opacity-90 transition-all active:scale-95"
                  >
                    <span
                      className="material-symbols-outlined transition-transform duration-200"
                      style={{ transform: pulse === "checkin" ? "scale(1.2)" : "scale(1)" }}
                    >
                      how_to_reg
                    </span>
                    Check-in
                  </button>
                  <button
                    onClick={() => handlePulse("leave")}
                    className="flex items-center justify-center gap-sm border-2 border-outline-variant text-on-surface-variant py-md px-md rounded-xl font-label-md text-label-md hover:bg-surface-container transition-all active:scale-95"
                  >
                    <span
                      className="material-symbols-outlined transition-transform duration-200"
                      style={{ transform: pulse === "leave" ? "scale(1.2)" : "scale(1)" }}
                    >
                      logout
                    </span>
                    Leave Queue
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary to-on-secondary-container p-md rounded-xl text-on-secondary shadow-lg flex items-center gap-md">
              <div className="bg-white/20 p-sm rounded-full">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <p className="font-label-md text-label-md font-bold">AI Concierge Insight</p>
                <p className="font-label-sm text-label-sm opacity-90">The queue is moving 15% faster than usual today. Stay close!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link
          to="/concierge"
          className="fixed right-base bottom-base w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-tertiary-fixed-dim shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center text-on-secondary animate-pulse-slow active:scale-95 group transition-all"
        >
          <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>
            smart_toy
          </span>
        </Link>
      </div>
      <footer className="bg-background dark:bg-background border-t border-surface-variant dark:border-outline-variant w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm py-md mt-xl">
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Powered by BookMyQ • Built for SMEs</div>
        <div className="flex gap-md">
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">Contact Support</a>
        </div>
        <div className="font-label-sm text-label-sm text-outline dark:text-outline-variant">© 2024 BookMyQ Inc.</div>
      </footer>
    </div>
  );
}
