import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { PortalShell } from "@/components/portal-shell";
import { money, useCheckout } from "@/lib/checkout-store";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Booking Confirmed | BookMyQ" },
      {
        name: "description",
        content: "Your BookMyQ booking is confirmed. View your receipt, QR ticket, and next steps.",
      },
      { property: "og:title", content: "Booking Confirmed | BookMyQ" },
      {
        property: "og:description",
        content: "Your BookMyQ booking is confirmed. View your receipt, QR ticket, and next steps.",
      },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const checkout = useCheckout();

  useEffect(() => {}, []);

  return (
    <PortalShell title="Your booking is confirmed!" subtitle="We've sent the details to your email and WhatsApp." eyebrow="Booking">
      <div className="flex flex-col items-center mb-md">
        <div className="relative w-24 h-24 flex items-center justify-center bg-secondary-container rounded-full mb-base">
          <svg className="w-14 h-14 text-on-secondary-container" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <h2 ref={h1Ref} className="sr-only">Booking confirmed</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-base">
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col">
          <div className="p-md border-b border-outline-variant relative">
            <div className="mb-base flex flex-wrap items-start justify-between gap-sm">
              <div className="min-w-0">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-xs block">Service Details</span>
                <h2 className="font-headline-md text-headline-md text-primary">Premium Spa &amp; Wellness</h2>
              </div>
              <div className="shrink-0 bg-secondary-container px-sm py-xs rounded-full">
                <span className="whitespace-nowrap font-label-sm text-label-sm text-on-secondary-container font-bold">#BMQ-98210</span>
              </div>
            </div>

            <div className="space-y-sm">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary">calendar_today</span>
                <div>
                  <p className="font-label-sm text-label-sm text-outline">Date &amp; Time</p>
                  <p className="font-body-md text-body-md font-bold">Friday, Oct 24 • 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary">person_pin</span>
                <div>
                  <p className="font-label-sm text-label-sm text-outline">Professional</p>
                  <p className="font-body-md text-body-md font-bold">Sarah Jenkins</p>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary">location_on</span>
                <div>
                  <p className="font-label-sm text-label-sm text-outline">Location</p>
                  <p className="font-body-md text-body-md font-bold">Elite Branch, Downtown HQ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-md bg-surface-container-low flex flex-wrap justify-between items-center gap-sm">
            <div>
              <p className="font-label-sm text-label-sm text-outline">Paid now</p>
              <p className="font-headline-md text-headline-md text-primary">{money(checkout?.paidNow ?? 120)}</p>
              {checkout?.promoCode && (
                <p className="font-label-sm text-label-sm text-secondary">Offer {checkout.promoCode} applied</p>
              )}
            </div>
            {checkout && checkout.dueAtCounter > 0 && (
              <div>
                <p className="font-label-sm text-label-sm text-outline">Due at counter</p>
                <p className="font-headline-md text-headline-md text-secondary">{money(checkout.dueAtCounter)}</p>
              </div>
            )}
            <div className="text-right">
              <p className="font-label-sm text-label-sm text-outline">Status</p>
              <p className="font-label-md text-label-md text-secondary font-bold">
                {checkout?.payMode === "deposit" ? "PART PAID · BALANCE AT COUNTER" : "PAID IN FULL"}
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 bg-primary text-on-primary rounded-xl border border-outline-variant p-md flex flex-col items-center justify-center text-center">
          <div className="bg-surface-container-lowest p-base rounded-lg mb-base w-full max-w-[160px] aspect-square flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              alt="A clean, minimalist QR code centered on a white background."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlzx_RAiH3N3qSD4CPOoIEo6zGKSInD0cUAI4bt5Wtmh9qajghHqkdD01Y9LcLodZw65tBnW37kfKNnUDX-VlndjvVTl412XnKQEuCk6IsXGohAPFoDbU2C_qePC_IpXUdACwess9ddwD4Wj2NUEavZLtfYQqjmfEyEFwxySiYr_ovfPIh3ehZkpo0hWo2lSxriCvAXDfZgBrEy4h8Doi8WbsrdE6hApPt7CNTLppthFSLDtQrk79aN9v4SEJ3RFKv6IIpLeEo3nxy"
            />
          </div>
          <p className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest mb-xs">Digital Ticket</p>
          <p className="font-body-md text-body-md">Show this at the entrance</p>
        </div>
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-sm mt-base">
          <button className="flex items-center justify-center gap-sm border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container">
            <span className="material-symbols-outlined">event</span>
            Add to Calendar
          </button>
          <button className="flex items-center justify-center gap-sm border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container">
            <span className="material-symbols-outlined">chat</span>
            WhatsApp Confirmation
          </button>
          <button className="flex items-center justify-center gap-sm border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container">
            <span className="material-symbols-outlined">directions</span>
            Get Directions
          </button>
        </div>
        <div className="md:col-span-12 mt-lg bg-secondary-container rounded-xl border border-outline-variant p-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-md">
            <div className="min-w-0 max-w-[28rem]">
              <h3 className="font-headline-md text-headline-md text-on-secondary-container mb-xs">Save more on every visit</h3>
              <p className="font-body-md text-body-md text-on-secondary-container/90">
                Join Membership for 20% off next time and unlock priority booking for all services.
              </p>
            </div>
            <button className="bg-primary text-on-primary rounded-lg px-lg py-2.5 font-label-md hover:bg-primary-container">
              Join Membership
            </button>
          </div>
        </div>
      </div>

      <div className="mt-xl flex gap-lg">
        <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Booking Policy</a>
        <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Manage Booking</a>
        <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Support</a>
      </div>

      <div className="mt-lg md:hidden">
        <Link
          to="/"
          className="w-full bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container flex items-center justify-center gap-sm"
        >
          <span className="material-symbols-outlined">home</span>
          Go to Home
        </Link>
      </div>
    </PortalShell>
  );
}
