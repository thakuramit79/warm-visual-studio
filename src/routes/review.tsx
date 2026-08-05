import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";


import { PortalShell } from "@/components/portal-shell";

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
  const navigate = useNavigate();

  const confirmBooking = () => {
    navigate({ to: "/checkout" });
  };

  return (
    <PortalShell title="Review Your Booking" subtitle="Please check all details before confirming your appointment." eyebrow="Booking · Step 3 of 3">
      <div className="flex items-center gap-sm mb-md">
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
        <div className="lg:col-span-8 space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl">
              <div className="flex items-start justify-between mb-sm">
                <span className="text-secondary font-label-sm uppercase tracking-widest">Premium Service</span>
                <span className="material-symbols-outlined text-secondary-fixed-dim">stars</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-xs">Executive Wellness Audit</h3>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span className="text-body-md">90 Minutes Duration</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl">
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
            <div className="md:col-span-2 bg-primary-container border border-outline-variant p-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-md">
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
          <section className="bg-surface-container-low border border-outline-variant p-lg rounded-xl">
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
        <div className="lg:col-span-4">
          <aside className="sticky top-24 space-y-md">
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
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
                className="w-full bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-base"
              >
                Continue to payment
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="mt-xs text-center font-label-sm text-outline">Apply offers and choose full or part payment next</p>
              <div className="mt-lg pt-md border-t border-outline-variant">
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
            <div className="bg-secondary-container border border-outline-variant p-md rounded-xl flex gap-md">
              <span className="material-symbols-outlined text-secondary">auto_awesome</span>
              <div>
                <p className="font-label-md text-on-secondary-container">AI Insight</p>
                <p className="text-body-md text-on-surface-variant">Booking this now secures the last morning slot for Dr. Vance this month!</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      
    </PortalShell>
  );
}
