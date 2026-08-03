import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PortalShell } from "@/components/portal-shell";

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

  return (
    <PortalShell
      title="Live Queue"
      eyebrow="Real-time"
      subtitle="Track your position and get notified when it's your turn."
    >
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2 lg:items-start">
        <div className="card-surface flex flex-col items-center gap-md p-lg">
          <div className="relative flex items-center justify-center">
            <svg className="h-[220px] w-[220px]">
              <circle className="text-surface-container-highest" cx={110} cy={110} fill="transparent" r={95} stroke="currentColor" strokeWidth={10}></circle>
              <circle
                className="text-secondary"
                cx={110}
                cy={110}
                fill="transparent"
                r={95}
                stroke="currentColor"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                strokeWidth={10}
                style={{ transition: "stroke-dashoffset 0.35s", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <p className="mb-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Your Position
              </p>
              <h2 className="font-display-lg text-display-lg leading-none text-primary">{position}</h2>
              <p className="mt-xs font-body-md text-body-md font-semibold text-secondary">
                {position <= 3 ? "Next soon" : "In queue"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-sm rounded-full border border-secondary-fixed bg-secondary-container/30 px-md py-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            <p className="font-label-md text-label-md font-bold text-on-secondary-container">Queue active &amp; moving</p>
          </div>
          <p className="font-label-sm text-label-sm text-outline">Last updated {secondsAgo} seconds ago</p>
        </div>

        <div className="flex flex-col gap-md">
          <div className="card-surface p-lg">
            <h3 className="mb-md font-headline-md text-headline-md text-primary">Status Overview</h3>
            <div className="mb-lg grid grid-cols-2 gap-md">
              <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
                <p className="mb-xs font-label-sm text-label-sm text-outline">Est. Wait</p>
                <p className="font-headline-md text-headline-md text-on-surface">{position * 4 + 2} mins</p>
              </div>
              <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
                <p className="mb-xs font-label-sm text-label-sm text-outline">In Front</p>
                <p className="font-headline-md text-headline-md text-on-surface">{Math.max(position - 1, 0)} People</p>
              </div>
            </div>
            <div className="flex flex-col gap-sm">
              <button className="flex w-full items-center justify-center gap-sm rounded-lg bg-primary px-md py-2.5 font-label-md text-label-md text-on-primary hover:bg-primary-container">
                <span className="material-symbols-outlined">notifications_active</span>
                Notify Me
              </button>
              <div className="grid grid-cols-2 gap-sm">
                <button className="flex items-center justify-center gap-sm rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 font-label-md text-label-md text-primary hover:bg-surface-container">
                  <span className="material-symbols-outlined">how_to_reg</span>
                  Check-in
                </button>
                <button className="flex items-center justify-center gap-sm rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2.5 font-label-md text-label-md text-primary hover:bg-surface-container">
                  <span className="material-symbols-outlined">logout</span>
                  Leave Queue
                </button>
              </div>
            </div>
          </div>

          <div className="card-surface flex items-center gap-md p-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <p className="font-label-md text-label-md font-bold text-primary">AI Concierge Insight</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                The queue is moving 15% faster than usual today. Stay close!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
