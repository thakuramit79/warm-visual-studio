import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review & Confirm | BookMyQ" },
      { name: "description", content: "Review your booking details and confirm your appointment." },
      { property: "og:title", content: "Review & Confirm | BookMyQ" },
      { property: "og:description", content: "Review your booking details and confirm your appointment." },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const navigate = useNavigate();

  const confirmBooking = () => {
    setShowSuccess(true);
    setTimeout(() => setCardVisible(true), 10);
  };

  return (
    <div className="bg-background text-on-surface font-body-md antialiased relative">
      {/* Top Navigation Bar */}
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-40 h-20 w-full">
        <div className="flex justify-between items-center px-md lg:px-xl h-full w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-base">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</span>
          </div>
          <nav className="hidden md:flex items-center gap-lg">
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors font-label-md text-label-md" to="/">Home</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors font-label-md text-label-md" to="/services">Services</Link>
            <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md" to="/bookings">Bookings</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors font-label-md text-label-md" to="/offers">Offers</Link>
          </nav>
          <div className="flex items-center gap-md">
            <Link to="/notifications" className="p-base rounded-full hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-on-surface">notifications</span>
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
              <img className="w-full h-full object-cover" alt="Client avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCVrLHdmCSIWxgmA5bKQNre7OFWdJpe5LCZZTkRKbt-iyD1JBkjDUXFeHRJoEaqnXEESlTWQMXdbX79L09w6z4j_drkrXdnykpPXywuweLg8vpZk4LklZ-Jca63q6ebDdA41aJw_q_rKOkxNbEK2BeSg26loiCYY4easjNh3CgZaNjMAkcdS-fIv5WTseN8lfUGr-uai-mLrIaHmezI7Z7d2lBpzTCPGyVrmjZXMYDoqdrvZerkjOz-YflU7e3p2KpN4CsoRMN17Pf" />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-container-max mx-auto px-md lg:px-xl py-xl min-h-[calc(100vh-160px)]">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-sm mb-lg">
          <div className="flex items-center gap-xs">
            <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm">✓</span>
            <span className="hidden md:inline font-label-md text-label-md text-secondary">Service selection</span>
          </div>
          <div className="w-8 h-[2px] bg-secondary-fixed"></div>
          <div className="flex items-center gap-xs">
            <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm">✓</span>
            <span className="hidden md:inline font-label-md text-label-md text-secondary">Date &amp; Time</span>
          </div>
          <div className="w-8 h-[2px] bg-secondary"></div>
          <div className="flex items-center gap-xs">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">3</span>
            <span className="font-label-md text-label-md text-primary">Confirmation</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-md">
            <h1 className="font-headline-lg text-headline-lg mb-base">Review Your Booking</h1>
            <p className="text-on-surface-variant font-body-md mb-lg">Please check all details before confirming your appointment. AI Concierge is standing by if you need any adjustments.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] border border-surface-variant/50">
                <div className="flex items-start justify-between mb-sm">
                  <span className="text-secondary font-label-sm uppercase tracking-widest">Premium Service</span>
                  <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-xs">Executive Wellness Audit</h3>
                <div className="flex items-center gap-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  <span className="text-body-md">90 Minutes Duration</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] border border-surface-variant/50">
                <div className="flex gap-md">
                  <img className="w-16 h-16 rounded-full object-cover ring-2 ring-secondary-container" alt="Specialist avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLm_u6fxmD_xb0nwRTZKzOGiiwQXLAhQKxFQmuWVZzN4KtSavCJjK6ZmdpC1eF-z2TS5q_bhYYnbLZr-JlqthGSYit2uXreEigyBkqgehp_5iHB-F0LVoMkLN28BJFC3j_S3qBjxf2Tz1J0bikCOKjYCuTrCFgkfHiLx4zmb337TBds_PjmVhg9PrNUkUt8s1tVeDdv5wp2Rv9dzq2joWRebHTAjUUdUJSVOV5P8tNd9wcs4w9cfs5tcdrgzkfKGz_xoj_4TBipIMR" />
                  <div>
                    <h4 className="font-headline-md text-headline-md text-primary">Dr. Julian Vance</h4>
                    <p className="text-on-surface-variant font-body-md">Senior Wellness Lead</p>
                    <div className="flex items-center gap-xs mt-xs text-secondary">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="font-label-md">Downtown Branch, Suite 402</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 bg-primary-container p-md rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] flex flex-col md:flex-row items-center justify-between gap-md">
                <div className="flex items-center gap-md">
                  <div className="bg-primary-fixed text-on-primary-fixed p-sm rounded-lg flex flex-col items-center min-w-[80px]">
                    <span className="font-label-sm uppercase">Oct</span>
                    <span className="font-headline-md text-headline-md leading-none">24</span>
                  </div>
                  <div>
                    <p className="text-on-primary-container font-label-md uppercase">Appointment Schedule</p>
                    <h4 className="text-on-primary font-headline-md text-headline-md">Thursday, 10:30 AM</h4>
                  </div>
                </div>
                <Link to="/slots" className="text-primary-fixed hover:text-on-primary-container transition-colors font-label-md flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Change Time
                </Link>
              </div>
            </div>
            <section className="bg-surface-container-low p-lg rounded-xl mt-lg">
              <div className="flex items-center justify-between mb-md">
                <h2 className="font-headline-md text-headline-md text-primary">Client Information</h2>
                <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm">Verified Member</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="font-label-sm text-outline uppercase">Full Name</label>
                  <p className="font-body-lg text-on-surface">Eleanor Fitzwilliam</p>
                </div>
                <div className="space-y-xs">
                  <label className="font-label-sm text-outline uppercase">Email Address</label>
                  <p className="font-body-lg text-on-surface">e.fitzwilliam@corporate-hq.com</p>
                </div>
                <div className="space-y-xs">
                  <label className="font-label-sm text-outline uppercase">Phone Number</label>
                  <p className="font-body-lg text-on-surface">+1 (555) 012-3456</p>
                </div>
                <div className="space-y-xs">
                  <label className="font-label-sm text-outline uppercase">Special Requests</label>
                  <p className="font-body-lg text-on-surface italic">Quiet environment preferred.</p>
                </div>
              </div>
            </section>
          </div>
          {/* Right Column: Price & CTA */}
          <div className="lg:col-span-4">
            <aside className="sticky top-28 space-y-md">
              <div className="bg-surface-container-highest p-lg rounded-2xl shadow-[0px_12px_32px_rgba(11,44,71,0.12)]">
                <h2 className="font-headline-md text-headline-md text-primary mb-lg">Payment Summary</h2>
                <div className="space-y-md mb-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-body-md">Service Subtotal</span>
                    <span className="font-body-lg text-primary">$185.00</span>
                  </div>
                  <div className="flex justify-between items-center text-on-secondary-container">
                    <span className="font-body-md">Membership Discount (15%)</span>
                    <span className="font-body-lg">- $27.75</span>
                  </div>
                  <div className="flex justify-between items-center text-on-secondary-container">
                    <span className="font-body-md">Early Bird Promo</span>
                    <span className="font-body-lg">- $10.00</span>
                  </div>
                  <div className="pt-md border-t border-dashed border-outline-variant">
                    <div className="flex justify-between items-center">
                      <span className="font-headline-md text-headline-md text-primary">Total Amount</span>
                      <span className="font-headline-md text-headline-md text-secondary">$147.25</span>
                    </div>
                    <p className="text-right text-outline font-label-sm mt-xs">Including all taxes &amp; fees</p>
                  </div>
                </div>
                <button
                  onClick={confirmBooking}
                  className="w-full bg-gradient-to-br from-primary to-secondary text-on-primary py-md rounded-xl font-headline-md text-headline-md shadow-lg hover:shadow-xl transition-all active:scale-95 group overflow-hidden relative"
                  style={{ background: "linear-gradient(135deg, #00172b 0%, #00696f 100%)" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-base">
                    Confirm Booking
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </button>
                <div className="mt-lg pt-md border-t border-surface-variant/50">
                  <div className="flex items-center gap-base text-outline mb-sm">
                    <span className="material-symbols-outlined text-base">security</span>
                    <span className="font-label-sm">Secure 256-bit Encrypted Checkout</span>
                  </div>
                  <div className="space-y-xs">
                    <a className="block text-primary hover:underline font-label-md" href="#">Cancellation &amp; Rescheduling Policy</a>
                    <p className="font-label-sm text-outline">Cancel free of charge up to 24 hours before your appointment.</p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-container/30 p-md rounded-xl border border-secondary/20 flex gap-md">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <div>
                  <p className="font-label-md text-on-secondary-container">AI Insight</p>
                  <p className="text-body-md text-on-surface-variant">Booking this now secures the last morning slot for Dr. Vance this month!</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      {/* FAB */}
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link to="/concierge" className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim text-secondary dark:text-secondary-fixed fixed right-base bottom-base w-16 h-16 rounded-full shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center animate-pulse-slow active:scale-95 transition-transform duration-300 hover:scale-110">
          <span className="material-symbols-outlined text-on-secondary text-3xl">smart_toy</span>
        </Link>
      </div>
      {/* Footer */}
      <footer className="bg-background dark:bg-background w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm mt-xl py-md border-t border-surface-variant dark:border-outline-variant">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">BookMyQ Concierge</span>
        <span className="text-outline dark:text-outline-variant font-label-sm text-label-sm">Powered by BookMyQ • Built for SMEs</span>
        <div className="flex gap-md">
          <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">Privacy Policy</a>
          <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">Terms of Service</a>
          <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">Contact Support</a>
        </div>
      </footer>
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm flex items-center justify-center p-md">
          <div
            className={`bg-white p-xl rounded-3xl max-w-md w-full text-center shadow-2xl transition-all duration-500 transform ${
              cardVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-lg">
              <span className="material-symbols-outlined text-secondary text-6xl">check_circle</span>
            </div>
            <h2 className="font-display-lg text-headline-lg text-primary mb-base">Booking Confirmed!</h2>
            <p className="text-on-surface-variant font-body-lg mb-xl">Your appointment has been successfully scheduled. We've sent a confirmation to your email.</p>
            <div className="space-y-sm">
              <button
                onClick={() => navigate({ to: "/bookings" })}
                className="w-full bg-primary text-on-primary py-md rounded-xl font-headline-md"
              >
                View Dashboard
              </button>
              <button
                onClick={() => navigate({ to: "/confirmation" })}
                className="w-full text-primary font-label-md"
              >
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
