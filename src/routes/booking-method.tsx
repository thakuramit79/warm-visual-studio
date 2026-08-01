import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/booking-method")({
  head: () => ({
    meta: [
      { title: "BookMyQ | Choose Booking Method" },
      { name: "description", content: "Choose your preferred journey: browse services yourself or book with our AI Concierge." },
      { property: "og:title", content: "BookMyQ | Choose Booking Method" },
      { property: "og:description", content: "Choose your preferred journey: browse services yourself or book with our AI Concierge." },
    ],
  }),
  component: BookingMethod,
});

function BookingMethod() {
  const [pressed, setPressed] = useState<string | null>(null);

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
      <nav className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-40">
        <div className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">BookMyQ</div>
          <div className="hidden md:flex items-center gap-xl">
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/">
              Home
            </Link>
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/services">
              Services
            </Link>
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/bookings">
              Bookings
            </Link>
            <Link className="font-label-md text-label-md text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors" to="/offers">
              Offers
            </Link>
          </div>
          <div className="flex items-center gap-base">
            <Link className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all" to="/notifications">
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden px-md py-xl">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary-container/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-tertiary-fixed-dim/15 rounded-full blur-[120px]"></div>
        </div>
        <div className="text-center mb-xl max-w-2xl mx-auto">
          <h1 className="font-display-lg text-display-lg text-primary mb-sm">How would you like to book?</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Choose your preferred journey to find the right service for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg w-full max-w-5xl mx-auto">
          <Link
            to="/services"
            style={pressed === "browse" ? { transform: "scale(0.98) translateY(0px)" } : undefined}
            onMouseDown={() => setPressed("browse")}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            className="group relative flex flex-col text-left bg-surface-container-lowest rounded-[2rem] p-md md:p-xl border border-surface-variant shadow-[0px_4px_20px_rgba(11,44,71,0.05)] card-transition hover:shadow-[0px_12px_32px_rgba(11,44,71,0.12)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center mb-md group-hover:bg-primary transition-colors duration-300">
              <span className="material-symbols-outlined text-[32px] text-primary group-hover:text-on-primary">
                dashboard_customize
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-base">Browse Services</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
              Explore categories and staff at your own pace. Perfect if you know exactly what you need or want to
              discover our full range.
            </p>
            <div className="mt-auto flex items-center font-label-md text-label-md text-primary font-bold">
              Start Browsing
              <span className="material-symbols-outlined ml-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[160px]">grid_view</span>
            </div>
          </Link>
          <Link
            to="/concierge"
            style={pressed === "ai" ? { transform: "scale(0.98) translateY(0px)" } : undefined}
            onMouseDown={() => setPressed("ai")}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            className="group relative flex flex-col text-left bg-primary-container rounded-[2rem] p-md md:p-xl border border-primary shadow-[0px_4px_20px_rgba(11,44,71,0.1)] card-transition hover:shadow-[0px_12px_32px_rgba(0,105,111,0.25)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-tertiary-fixed-dim/20 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center mb-md ai-glow group-hover:scale-110 transition-transform duration-500">
              <span
                className="material-symbols-outlined text-[32px] text-on-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-primary mb-base">Book with AI</h2>
            <p className="font-body-md text-body-md text-on-primary-container mb-xl">
              Let our AI Concierge find the perfect slot and professional for you. Just tell us what you're looking
              for in plain English.
            </p>
            <div className="mt-auto flex items-center font-label-md text-label-md text-tertiary-fixed font-bold">
              Open AI Concierge
              <span className="material-symbols-outlined ml-base group-hover:translate-x-2 transition-transform">
                bolt
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </div>
        <div className="mt-xl flex items-center gap-md opacity-60">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Wellness consultant"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcr9qmhGOcUxAHpTf6hXWjXmx11OqdBUFz_MupgSOqQMNQidE51OsAOF8Tx5P_VmwCk95725wSY3pwwh9M59_wN2oCSG0AqI5vrAAYWYm61ZUuSD6n7rxdtMhcbT-T_eOXdllA8eUFjYpaCSa00dZ46oADSGF5lq34w2HbA8ODae7e5egtq33QTLh85KUFj0j1vupt8fGQOrabD0zzaT35VqCfelcq-pE8jEGDll-__UVJIUf-votgEyI3xruE6BOSUPdPFsxX8tLy"
              />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Stylist"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUiD73qEen3byaFQW7NmTDK6PP5ZRqTy5MrEgZROtC3QlWsMT11EnSSUoSG2cmMSXtn4_IFAlehL9dlLSGYHNQZARZWMKVkKsIKMwb43D8WK1_TL71X7KcANsHg5f8S70-X2ztAudvfGy0zvtq6LMtKN0LSTza2kvT4mE1QAgQZywi6Tyj9yBMYovq_JhrU7rNdmNJuQiEU2DeDLg8y2bFYpqAOinWXI486CbY7YWL3XpJQmSU5n22hXR7rOSNeY_thBBoBgFFzquo"
              />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Therapist"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajiKLREEY_YC7Q9pOttAe860MV6ia0Qih2akWTaWkpZodcITbox3XDQsGvSPm8BGQU0JhKfz8iVIOAK7g5TT7BqEPjGOnhlxyn0j-zX3QrypOvG32EMiAg5bszNchsHG7Iz_emsDaeoS4N2NON8pUzX15sjU_lw694oZC8bckHHjAPOKp9bdXHkjVyOQrM0ocBFH-D5NZBPodaPsjOZVYrii7n-pX0CEExdnij8GQFQ7_728YR1v8hDb-OVj_7gN64ZPMKzvbwEEQ"
              />
            </div>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Over 1,200 slots available today across all specialists
          </p>
        </div>
      </main>
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link
          to="/concierge"
          className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim shadow-[0px_12px_32px_rgba(0,105,111,0.25)] fixed right-base bottom-base w-16 h-16 rounded-full flex items-center justify-center animate-pulse-slow active:scale-95 group hover:scale-110 transition-transform duration-300"
        >
          <span
            className="material-symbols-outlined text-on-secondary text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            chat_bubble
          </span>
          <span className="absolute right-20 bg-primary text-on-primary px-sm py-xs rounded-lg text-label-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Need help? Ask AI
          </span>
        </Link>
      </div>
      <footer className="w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm mt-xl py-md border-t border-surface-variant bg-background">
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
          Powered by BookMyQ • Built for SMEs
        </div>
        <div className="flex gap-md">
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">
            Terms of Service
          </a>
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
