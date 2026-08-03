import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { PortalShell } from "@/components/portal-shell";
import { useUpcomingBookings } from "@/lib/bookings-store";

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

const cardClass =
  "bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col lg:flex-row lg:items-center gap-md";

function Bookings() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [search, setSearch] = useState("");
  const { bookings: upcoming } = useUpcomingBookings();

  const query = search.trim().toLowerCase();
  const visible = query
    ? upcoming.filter(
        (b) =>
          b.business.toLowerCase().includes(query) || b.service.toLowerCase().includes(query),
      )
    : upcoming;

  return (
    <PortalShell
      eyebrow="Account"
      title="My bookings"
      subtitle="Manage your active appointments and booking history in one place."
      actions={
        <Link
          to="/services"
          className="flex items-center gap-xs rounded-lg bg-primary px-md py-2.5 font-label-md text-label-md text-on-primary transition-colors hover:bg-primary-container"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New booking
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-md sm:grid-cols-3">
        {[
          { label: "Upcoming", value: String(upcoming.length), icon: "event_available" },
          { label: "Completed", value: "12", icon: "verified" },
          { label: "Cancelled", value: "0", icon: "event_busy" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-sm rounded-xl border border-outline-variant bg-surface-container-lowest p-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-secondary">
              <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
            </span>
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-outline">{stat.label}</p>
              <p className="font-headline-md text-headline-md text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-sm border-b border-outline-variant pb-sm md:flex-row md:items-center md:justify-between">
        <div className="flex gap-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-sm border-b-2 pb-sm font-label-md text-label-md transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
            search
          </span>
          <input
            className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-2 pl-10 pr-md font-body-md text-body-md outline-none transition-colors focus:border-secondary md:w-64"
            placeholder="Search bookings..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        {activeTab === "upcoming" &&
          (visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-outline-variant py-lg text-center font-body-md text-on-surface-variant">
              No upcoming bookings.
            </div>
          ) : (
            visible.map((b) => (
              <div key={b.id} className={cardClass}>
                <div className="flex items-center gap-sm lg:w-1/3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-container text-secondary">
                    <span className="material-symbols-outlined text-[22px]">{b.icon}</span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-headline-md text-headline-md text-primary">{b.business}</h3>
                    <p className="truncate font-label-md text-label-md text-on-surface-variant">{b.service}</p>
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-md">
                  <div>
                    <p className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Date &amp; time</p>
                    <p className="font-body-md text-body-md font-semibold text-on-surface">
                      {b.date} • {b.time}
                    </p>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Status</p>
                    <p
                      className={`font-body-md text-body-md font-semibold ${
                        b.highlight ? "text-secondary" : "text-on-surface-variant"
                      }`}
                    >
                      {b.status}
                    </p>
                  </div>
                </div>
                <div className="flex gap-sm lg:justify-end">
                  <Link
                    to="/reschedule/$bookingId"
                    params={{ bookingId: b.id }}
                    className="flex-1 rounded-lg bg-primary px-md py-2.5 text-center font-label-md text-label-md text-on-primary transition-colors hover:bg-primary-container lg:flex-none"
                  >
                    Reschedule
                  </Link>
                  <button className="flex-1 rounded-lg border border-outline-variant px-md py-2.5 font-label-md text-label-md text-error transition-colors hover:bg-error-container/30 lg:flex-none">
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ))}

        {activeTab === "completed" && (
          <div className={cardClass}>
            <div className="flex items-center gap-sm lg:w-1/3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined text-[22px]">fitness_center</span>
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-headline-md text-headline-md text-primary">Peak Performance Gym</h3>
                <p className="truncate font-label-md text-label-md text-on-surface-variant">
                  Personal Training Session
                </p>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Status</p>
              <p className="font-body-md text-body-md font-semibold text-on-surface-variant">Completed Oct 20</p>
            </div>
            <div className="flex gap-sm lg:justify-end">
              <Link
                to="/services"
                className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 text-center font-label-md text-label-md text-primary transition-colors hover:bg-surface-container lg:flex-none"
              >
                Repeat
              </Link>
              <button className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 font-label-md text-label-md text-primary transition-colors hover:bg-surface-container lg:flex-none">
                Invoice
              </button>
            </div>
          </div>
        )}

        {activeTab === "cancelled" && (
          <div className="rounded-xl border border-dashed border-outline-variant py-lg text-center font-body-md text-on-surface-variant">
            No cancelled bookings.
          </div>
        )}
      </div>
    </PortalShell>
  );
}
