import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";

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
    read: true,
  },
  {
    id: 4,
    icon: "card_giftcard",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed",
    title: "Member Offer",
    time: "1d ago",
    body: "Your monthly member-only gift is ready to collect! Visit any branch to claim yours.",
    read: true,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <PortalShell
      title="Notifications"
      eyebrow="Inbox"
      subtitle={`${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
      actions={
        <button
          onClick={markAllRead}
          className="rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 font-label-md text-label-md text-primary hover:bg-surface-container"
        >
          Mark all as read
        </button>
      }
    >
      <div className="card-surface divide-y divide-outline-variant overflow-hidden">
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() =>
              setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)))
            }
            className={`flex w-full items-start gap-md px-md py-md text-left transition-colors hover:bg-surface-container ${
              n.read ? "" : "bg-secondary-container/10"
            }`}
          >
            <span className="relative mt-0.5 shrink-0">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${n.iconBg} ${n.iconColor}`}>
                <span className="material-symbols-outlined">{n.icon}</span>
              </span>
              {!n.read && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-secondary" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-xs flex items-center justify-between gap-sm">
                <span className={`font-label-md text-label-md ${n.read ? "text-on-surface" : "font-bold text-primary"}`}>
                  {n.title}
                </span>
                <span className="shrink-0 font-label-sm text-label-sm text-outline">{n.time}</span>
              </div>
              <p className="font-body-md text-body-md leading-snug text-on-surface-variant">{n.body}</p>
              {n.action && (
                <span
                  onClick={(e) => e.stopPropagation()}
                  className="mt-sm inline-block rounded-lg bg-primary px-md py-2.5 font-label-sm text-label-sm text-on-primary hover:bg-primary-container"
                >
                  {n.action}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </PortalShell>
  );
}
