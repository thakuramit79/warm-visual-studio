import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";

type NavItem = { to: string; label: string; icon: string };

const primaryNav: NavItem[] = [
  { to: "/", label: "Locations", icon: "storefront" },
  { to: "/services", label: "Services", icon: "spa" },
  { to: "/slots", label: "Availability", icon: "event_available" },
  { to: "/bookings", label: "Bookings", icon: "calendar_month" },
  { to: "/queue", label: "Live Queue", icon: "hourglass_top" },
];

const secondaryNav: NavItem[] = [
  { to: "/offers", label: "Offers", icon: "sell" },
  { to: "/notifications", label: "Notifications", icon: "notifications" },
  { to: "/concierge", label: "AI Concierge", icon: "smart_toy" },
];

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function NavLinks({ items, pathname, onNavigate }: { items: NavItem[]; pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        return (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-label-md text-label-md transition-colors ${
                active
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
              }`}
            >
              <Icon name={item.icon} className="text-[20px]" />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export type PortalShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: ReactNode;
  /** Renders content edge-to-edge without the max-width page padding wrapper. */
  bare?: boolean;
};

export function PortalShell({ children, title, subtitle, eyebrow, actions, bare }: PortalShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col gap-6 px-4 py-6">
      <Link to="/" className="flex items-center gap-2.5 px-2" aria-label="BookMyQ home">
        <BrandLogo size="md" showTagline />
      </Link>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div>
          <p className="mb-2 px-3 font-label-sm text-label-sm uppercase tracking-widest text-outline">Booking</p>
          <NavLinks items={primaryNav} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </div>
        <div>
          <p className="mb-2 px-3 font-label-sm text-label-sm uppercase tracking-widest text-outline">Engagement</p>
          <NavLinks items={secondaryNav} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </div>
      </nav>

      <div className="rounded-xl border border-outline-variant bg-surface-container-low p-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container font-label-md text-on-secondary-container">
            AL
          </span>
          <div className="min-w-0">
            <p className="truncate font-label-md text-label-md text-on-surface">Alex Lindberg</p>
            <p className="truncate font-label-sm text-label-sm text-on-surface-variant">Lumina Wellness Spa</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-outline-variant bg-surface-container-lowest lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-inverse-surface/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-outline-variant bg-surface-container-lowest">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-outline-variant bg-surface-container-lowest/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-md lg:px-lg">
            <button
              aria-label="Open navigation"
              className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Icon name="menu" />
            </button>

            <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 md:flex">
              <Icon name="search" className="text-[18px] text-outline" />
              <input
                aria-label="Search"
                placeholder="Search services, branches or bookings"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface outline-none placeholder:text-outline"
              />
            </div>

            <div className="ml-auto flex items-center gap-1">
              <Link
                to="/notifications"
                aria-label="Notifications"
                className="relative rounded-lg p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary"
              >
                <Icon name="notifications" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" />
              </Link>
              <Link
                to="/concierge"
                aria-label="AI concierge"
                className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container hover:text-primary"
              >
                <Icon name="smart_toy" />
              </Link>
              <span className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-label-md text-on-primary">
                AL
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-container-max px-md py-lg lg:px-lg">
          <div className="mb-md flex flex-col gap-sm border-b border-outline-variant pb-md md:flex-row md:items-end md:justify-between">
            <div>
              {eyebrow && (
                <p className="mb-xs font-label-sm text-label-sm uppercase tracking-widest text-secondary">{eyebrow}</p>
              )}
              <h1 className="font-headline-lg text-headline-lg text-primary">{title}</h1>
              {subtitle && <p className="mt-xs font-body-md text-body-md text-on-surface-variant">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-sm">{actions}</div>}
          </div>

          {bare ? children : <div className="flex flex-col gap-md">{children}</div>}
        </main>

        <footer className="mx-auto flex w-full max-w-container-max flex-col items-center justify-between gap-sm border-t border-outline-variant px-md py-md md:flex-row lg:px-lg">
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
            BookMyQ · Booking & queue platform for SMEs
          </p>
          <div className="flex gap-md">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="font-label-sm text-label-sm text-outline hover:text-primary">
                {l}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
