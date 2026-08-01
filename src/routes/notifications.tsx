import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Lumina Wellness Spa" },
      {
        name: "description",
        content: "View your latest booking updates, waitlist alerts, reminders and member offers.",
      },
      { property: "og:title", content: "Notifications | Lumina Wellness Spa" },
      {
        property: "og:description",
        content: "View your latest booking updates, waitlist alerts, reminders and member offers.",
      },
    ],
  }),
  component: Notifications,
});

type Notification = {
  id: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  time: string;
  body: React.ReactNode;
  action?: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    icon: "calendar_today",
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    title: "Booking Update",
    time: "2m ago",
    body: (
      <>
        Your appointment for <span className="font-semibold text-primary">Deep Tissue Massage</span> is confirmed
        for tomorrow at 10:30 AM.
      </>
    ),
    read: false,
  },
  {
    id: 2,
    icon: "event_available",
    iconBg: "bg-tertiary-container",
    iconColor: "text-on-tertiary-container",
    title: "Waitlist Alert",
    time: "1h ago",
    body: (
      <>
        A slot has opened up for your preferred time with <span className="font-semibold text-primary">Sarah Jenkins</span>{" "}
        at the Downtown Branch.
      </>
    ),
    action: "Book Now",
    read: false,
  },
  {
    id: 3,
    icon: "notifications_active",
    iconBg: "bg-primary-container",
    iconColor: "text-on-primary-container",
    title: "Reminder",
    time: "4h ago",
    body: "Don't forget to arrive 15 minutes early for your session. Enjoy your wellness journey!",
    read: false,
  },
  {
    id: 4,
    icon: "card_giftcard",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed",
    title: "Member Offer",
    time: "1d ago",
    body: "Your monthly member-only gift is ready to collect! Visit any branch to claim yours.",
    read: false,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [panelOpen, setPanelOpen] = useState(true);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen overflow-hidden">
      <main className="h-screen w-full flex flex-col">
        <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-10 h-20 w-full max-w-container-max mx-auto flex justify-between items-center px-md lg:px-xl">
          <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</div>
          <nav className="hidden md:flex gap-lg items-center">
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors font-label-md text-label-md" to="/">Home</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors font-label-md text-label-md" to="/services">Services</Link>
            <a className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md" href="#">Bookings</a>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary transition-colors font-label-md text-label-md" to="/offers">Offers</Link>
          </nav>
          <div className="flex items-center gap-md">
            <button
              className="material-symbols-outlined text-on-surface-variant"
              onClick={() => setPanelOpen(true)}
            >
              notifications
            </button>
            <div className="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">account_circle</span>
            </div>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto px-md lg:px-xl py-lg">
          <div className="max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-xl">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">My Bookings</h1>
                <p className="text-on-surface-variant font-body-md">Manage your upcoming wellness sessions</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] overflow-hidden border border-outline-variant/30">
                <div className="h-48 w-full relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="A serene spa environment"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMrDbsM1jmme19PWTUxn0hp76n5sUk4afoIdJEq_ivGYzB1dz8l9YlxFZZZDD7i9A6plj7QqjoPQDt4dRv6QbgLXrHWEa2P-cJP7fQIJZbrG3v1sSt7Lj6hxuHJ5gPQKNp8JogbOwJG5c-blefYpjtuVfnAPWTHEAKKJq6TSFwVT_dqtB0eN8QLZvqRZWWsgYqizq5KQ-biaobmuLzDwC6Piks1MzUHLz0nHPRegj_0jqqEC2ALKaWvZg3UbqpODcMBfSL0o15mZBg"
                  />
                  <div className="absolute top-sm right-sm bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm text-label-sm">Confirmed</div>
                </div>
                <div className="p-md">
                  <h3 className="font-headline-md text-headline-md text-primary mb-xs">Deep Tissue Massage</h3>
                  <div className="flex items-center gap-xs text-on-surface-variant mb-sm">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="font-body-md">Oct 24, 2023 • 10:30 AM</span>
                  </div>
                  <div className="flex items-center gap-md pt-md border-t border-outline-variant/20">
                    <button className="text-primary font-label-md underline">Reschedule</button>
                    <button className="text-error font-label-md">Cancel</button>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] overflow-hidden border border-outline-variant/30">
                <div className="h-48 w-full relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="A close-up of a premium facial treatment room"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTDAouLVkG48pQVcScmpxPcJiYVCJdD1PiGUlh7Qzq0_8ejNXguM4outORbLnVJjVMZJZVpnUx_RUVx4jH9Nhc9phOSX02W0OD7o4y_bQfgRocSq9ERx7MUroCc0xKyxjmdVWLwpJjShKcDxdB7rifcwihi5iXcHc6D_YOwbdm1UIEDDRw1Y0KLJQ1qNcd4P9sMGqpK2cEJiBqi5ERcgRQeUNJvOG5cL5ABdjepAxetNveK6rQQsAFVH8j4F-KTcTZ1flwt49oC7hT"
                  />
                  <div className="absolute top-sm right-sm bg-surface-container-high text-on-surface-variant px-sm py-xs rounded-full font-label-sm text-label-sm">Pending</div>
                </div>
                <div className="p-md">
                  <h3 className="font-headline-md text-headline-md text-primary mb-xs">HydraFacial Plus</h3>
                  <div className="flex items-center gap-xs text-on-surface-variant mb-sm">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="font-body-md">Oct 28, 2023 • 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-md pt-md border-t border-outline-variant/20">
                    <button className="text-primary font-label-md underline">Reschedule</button>
                    <button className="text-error font-label-md">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {panelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="notification-overlay">
          <div
            className="absolute inset-0 glass-overlay opacity-100 transition-opacity duration-300"
            onClick={() => setPanelOpen(false)}
          ></div>
          <aside className="relative w-full max-w-[440px] h-full bg-surface shadow-2xl animate-slide-in flex flex-col border-l border-outline-variant/20">
            <div className="px-md py-lg flex items-center justify-between border-b border-outline-variant/30">
              <div className="flex items-center gap-sm">
                <button
                  className="material-symbols-outlined text-on-surface hover:bg-surface-container-high p-xs rounded-full transition-colors"
                  onClick={() => setPanelOpen(false)}
                >
                  arrow_forward
                </button>
                <h2 className="font-headline-md text-headline-md text-primary">Notifications</h2>
              </div>
              <button className="text-secondary font-label-md hover:underline" onClick={markAllRead}>
                Mark all as read
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-md py-md space-y-sm">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`bg-surface-container-low p-md rounded-xl border ${n.read ? "border-outline-variant/10 opacity-60" : "border-outline-variant/10"} hover:border-secondary/30 transition-all cursor-pointer group shadow-sm`}
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)),
                    )
                  }
                >
                  <div className="flex gap-md">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full ${n.iconBg} flex items-center justify-center ${n.iconColor}`}>
                      <span className="material-symbols-outlined">{n.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-xs">
                        <span className="font-label-md text-primary">{n.title}</span>
                        <span className="text-outline text-label-sm">{n.time}</span>
                      </div>
                      <p className="text-on-surface-variant font-body-md leading-snug">{n.body}</p>
                      {n.action && (
                        <button
                          className="mt-sm bg-primary text-on-primary px-md py-1.5 rounded-lg text-label-sm font-semibold hover:bg-primary-container transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {n.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-xl text-center">
                <span className="material-symbols-outlined text-outline/20 text-[64px]">notifications_none</span>
                <p className="text-outline font-label-md mt-sm">No more notifications</p>
              </div>
            </div>
            <div className="p-md bg-surface-container-lowest border-t border-outline-variant/30">
              <button className="w-full py-md bg-secondary text-on-secondary rounded-xl font-label-md shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                View All Activity
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link
          to="/concierge"
          className="fixed right-base bottom-base w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-tertiary-fixed-dim shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center animate-pulse-slow active:scale-95 transition-transform duration-300"
        >
          <span className="material-symbols-outlined text-on-secondary text-3xl">home</span>
        </Link>
      </div>
    </div>
  );
}
