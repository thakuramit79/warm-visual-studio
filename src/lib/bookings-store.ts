import { useCallback, useEffect, useState } from "react";

export interface UpcomingBooking {
  id: string;
  business: string;
  service: string;
  icon: string;
  iconBg: string;
  iconFg: string;
  date: string;
  time: string;
  status: string;
  highlight?: boolean;
}

export const DEFAULT_UPCOMING: UpcomingBooking[] = [
  {
    id: "spa",
    business: "Serenity Wellness Spa",
    service: "Full Body Aromatherapy",
    icon: "spa",
    iconBg: "bg-secondary-container",
    iconFg: "text-on-secondary-container",
    date: "Oct 24, 2024",
    time: "2:00 PM",
    status: "Starting in 2 hours",
    highlight: true,
  },
  {
    id: "barber",
    business: "The Modern Barber",
    service: "Signature Haircut & Beard Trim",
    icon: "content_cut",
    iconBg: "bg-primary-fixed",
    iconFg: "text-on-primary-fixed",
    date: "Oct 28, 2024",
    time: "10:30 AM",
    status: "Confirmed",
  },
];

const STORAGE_KEY = "bookmyq.upcoming-bookings";

function read(): UpcomingBooking[] {
  if (typeof window === "undefined") return DEFAULT_UPCOMING;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_UPCOMING;
    const parsed = JSON.parse(raw) as UpcomingBooking[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_UPCOMING;
    return parsed;
  } catch {
    return DEFAULT_UPCOMING;
  }
}

const listeners = new Set<(b: UpcomingBooking[]) => void>();

function write(next: UpcomingBooking[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l(next));
}

export function useUpcomingBookings() {
  const [bookings, setBookings] = useState<UpcomingBooking[]>(DEFAULT_UPCOMING);

  useEffect(() => {
    setBookings(read());
    const listener = (next: UpcomingBooking[]) => setBookings(next);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const reschedule = useCallback((id: string, date: string, time: string) => {
    const next = read().map((b) =>
      b.id === id ? { ...b, date, time, status: "Rescheduled — Confirmed", highlight: false } : b
    );
    write(next);
  }, []);

  return { bookings, reschedule };
}
