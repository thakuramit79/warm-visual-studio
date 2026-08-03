import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { PortalShell } from "@/components/portal-shell";
import { DEFAULT_UPCOMING, useUpcomingBookings } from "@/lib/bookings-store";

export const Route = createFileRoute("/reschedule/$bookingId")({
  head: () => ({
    meta: [
      { title: "Reschedule Appointment | BookMyQ" },
      {
        name: "description",
        content: "Pick a new date and time slot to move your existing BookMyQ appointment.",
      },
      { property: "og:title", content: "Reschedule Appointment | BookMyQ" },
      {
        property: "og:description",
        content: "Pick a new date and time slot to move your existing BookMyQ appointment.",
      },
    ],
  }),
  component: ReschedulePage,
});

const MONTH = "Oct 2024";

const DAYS = [
  { day: "24", label: "Thu" },
  { day: "25", label: "Fri" },
  { day: "26", label: "Sat" },
  { day: "27", label: "Sun" },
  { day: "28", label: "Mon" },
  { day: "29", label: "Tue", disabled: true },
  { day: "30", label: "Wed" },
];

const SLOT_GROUPS = [
  { label: "Morning", icon: "light_mode", slots: ["09:00 AM", "10:30 AM", "11:15 AM"] },
  { label: "Afternoon", icon: "sunny", slots: ["01:30 PM", "02:45 PM", "04:30 PM"] },
  { label: "Evening", icon: "dark_mode", slots: ["06:15 PM", "07:30 PM"] },
];

function ReschedulePage() {
  const { bookingId } = Route.useParams();
  const navigate = useNavigate();
  const { bookings, reschedule } = useUpcomingBookings();

  const booking =
    bookings.find((b) => b.id === bookingId) ?? DEFAULT_UPCOMING.find((b) => b.id === bookingId);

  const [activeDay, setActiveDay] = useState("26");
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  if (!booking) {
    return (
      <PortalShell title="Booking not found" eyebrow="Booking">
        <Link to="/bookings" className="inline-block bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container">
          Back to bookings
        </Link>
      </PortalShell>
    );
  }

  const newDate = `Oct ${activeDay}, 2024`;

  const confirm = () => {
    if (!activeSlot) return;
    reschedule(booking.id, newDate, activeSlot);
    navigate({ to: "/bookings" });
  };

  return (
    <PortalShell
      title="Reschedule appointment"
      subtitle="Pick a new date and time — we'll move your existing booking."
      eyebrow="Booking"
      actions={
        <>
          <Link
            to="/bookings"
            className="border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container"
          >
            Keep current time
          </Link>
          <button
            onClick={confirm}
            disabled={!activeSlot}
            className="bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm new time
          </button>
        </>
      }
    >
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg flex items-center gap-md mb-xl">
        <div className={`w-16 h-16 rounded-xl ${booking.iconBg} flex items-center justify-center shrink-0`}>
          <span className={`material-symbols-outlined ${booking.iconFg} text-3xl`}>{booking.icon}</span>
        </div>
        <div className="flex-1">
          <h2 className="font-headline-md text-headline-md text-primary">{booking.business}</h2>
          <p className="text-on-surface-variant font-label-md text-label-md">{booking.service}</p>
          <p className="font-body-md text-body-md mt-xs">
            Currently: <span className="font-semibold">{booking.date} • {booking.time}</span>
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <section className="lg:col-span-7">
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-headline-md text-headline-md text-primary">Select new date</h2>
            <span className="font-label-md text-label-md text-secondary">{MONTH}</span>
          </div>
          <div className="bg-surface-container-low border border-outline-variant p-md rounded-xl grid grid-cols-4 sm:grid-cols-7 gap-sm">
            {DAYS.map((d) =>
              d.disabled ? (
                <div
                  key={d.day}
                  className="aspect-square flex flex-col items-center justify-center rounded-xl bg-surface-container-highest opacity-50 cursor-not-allowed"
                >
                  <span className="text-[10px] uppercase tracking-widest text-outline">{d.label}</span>
                  <span className="text-label-md line-through">{d.day}</span>
                </div>
              ) : (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(d.day)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-colors border-b-4 ${
                    activeDay === d.day
                      ? "bg-primary text-on-primary border-primary-container"
                      : "bg-surface-container-highest hover:bg-surface-variant border-transparent"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest opacity-70">{d.label}</span>
                  <span className={`text-label-md ${activeDay === d.day ? "font-bold" : ""}`}>{d.day}</span>
                </button>
              )
            )}
          </div>
        </section>

        <section className="lg:col-span-5 space-y-lg">
          <h2 className="font-headline-md text-headline-md text-primary">Available slots</h2>
          {SLOT_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-sm mb-sm text-outline font-label-md">
                <span className="material-symbols-outlined text-base">{group.icon}</span>
                <span className="uppercase tracking-widest text-[11px]">{group.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-sm">
                {group.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setActiveSlot(slot)}
                    className={`py-3 px-4 rounded-lg text-center transition-colors ${
                      activeSlot === slot
                        ? "bg-primary text-on-primary font-bold"
                        : "border border-outline-variant text-on-surface-variant hover:border-secondary"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="mt-lg bg-surface-container-lowest border border-outline-variant rounded-xl p-md font-body-md text-body-md text-on-surface-variant">
        {activeSlot ? (
          <>
            New time: <span className="font-bold text-primary">{newDate} • {activeSlot}</span>
          </>
        ) : (
          "Select a time slot to continue"
        )}
      </div>
    </PortalShell>
  );
}
