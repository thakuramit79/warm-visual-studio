import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { branches, setSelectedBranchId } from "@/lib/branch-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumina Wellness Spa | Select Your Location" },
      {
        name: "description",
        content:
          "Scanned in? Pick the Lumina Wellness Spa branch you're visiting to see live wait times, services and open slots.",
      },
      { property: "og:title", content: "Lumina Wellness Spa | Select Your Location" },
      {
        property: "og:description",
        content: "Pick your branch to see live wait times, services and open slots.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [view, setView] = useState<"list" | "map">("list");

  const select = (id: string) => {
    setSelectedBranchId(id);
    navigate({ to: "/business" });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <header className="border-b border-outline-variant bg-surface-container-lowest">
        <div className="mx-auto flex w-full max-w-container-max items-center gap-3 px-md py-md lg:px-lg">
          <BrandLogo size="lg" showTagline />
          <span className="ml-auto flex items-center gap-xs rounded-full border border-outline-variant bg-surface-container-low px-sm py-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary">qr_code_scanner</span>
            Scanned check-in
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-container-max px-md py-lg lg:px-lg">
        <div className="mb-md flex flex-col gap-sm border-b border-outline-variant pb-md md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-xs font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Step 1 of 2 · Lumina Wellness Spa
            </p>
            <h1 className="font-headline-lg text-headline-lg text-primary">Which location are you at?</h1>
            <p className="mt-xs font-body-md text-body-md text-on-surface-variant">
              Confirm your branch to unlock its services, live queue and available times.
            </p>
          </div>
          <div className="flex p-1 bg-surface-container-low border border-outline-variant rounded-lg">
            {(["list", "map"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center gap-xs px-md py-2 rounded-lg font-label-md transition-colors ${
                  view === v
                    ? "bg-surface-container-lowest text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{v === "list" ? "list" : "map"}</span>
                {v === "list" ? "List View" : "Map View"}
              </button>
            ))}
          </div>
        </div>

        {view === "list" ? (
          <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="card-surface flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${branch.image}')` }}
                  />
                  {branch.badge && (
                    <div className="absolute right-sm top-sm flex items-center gap-xs rounded-full bg-secondary px-sm py-1 font-label-sm text-on-secondary">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {branch.badge.icon}
                      </span>
                      {branch.badge.label}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-md">
                  <div className="mb-sm flex items-start justify-between">
                    <h2 className="font-headline-md text-headline-md text-primary">{branch.name}</h2>
                    <span className="flex items-center gap-xs font-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">distance</span>
                      {branch.distance}
                    </span>
                  </div>
                  <p className="mb-md font-body-md text-body-md text-on-surface-variant">
                    {branch.addressLines[0]}
                    <br />
                    {branch.addressLines[1]}
                  </p>
                  <div className="mb-md grid grid-cols-2 gap-sm rounded-lg bg-surface-container-low p-sm">
                    <div>
                      <span className="mb-xs block font-label-sm uppercase tracking-wider text-on-surface-variant">
                        Wait Time
                      </span>
                      <span
                        className={`font-headline-md font-bold ${
                          branch.waitHighlight ? "text-secondary" : "text-on-surface"
                        }`}
                      >
                        {branch.waitTime}
                      </span>
                    </div>
                    <div className="border-l border-outline-variant pl-sm">
                      <span className="mb-xs block font-label-sm uppercase tracking-wider text-on-surface-variant">
                        Next Slot
                      </span>
                      <span className="font-headline-md font-bold text-primary">{branch.nextSlot}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => select(branch.id)}
                    className="mt-auto flex w-full items-center justify-center gap-sm rounded-lg bg-primary py-2.5 font-label-md text-on-primary hover:bg-primary-container"
                  >
                    I'm at this branch
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
            <div className="relative h-[420px] overflow-hidden rounded-xl border border-outline-variant lg:col-span-2">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCo8n-IQ_r77ZxNdqeAYVB7AK_zeG4EO9TS_VjoO3S7UfqcdOAUNnYe2ZxGo02ZO1C-NAuFRU7pf4o_g32aOTtKbXJuki-qIXuHeQWpWaB0BlZ_tGVB6KBHfB5wSglqSmX7_5erpPtWlYXfY5UhdxPzSpNybnzEEnpA7s2XBI1ljFd40SUT6UTWpJf6eeUEGF6KFh8SAarHGoNeTjcCHRp3RhuNTLk8Fk1gsUfW5sFbMCcnD6tIP5VfkvZsIkLwKGWwnYP5WKtMyJZh')",
                }}
              />
              <div className="absolute left-1/3 top-1/4 rounded-full bg-primary p-2 text-on-primary">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <div className="absolute left-1/2 top-1/2 rounded-full bg-secondary p-2 text-on-secondary">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <div className="absolute bottom-1/3 right-1/4 rounded-full bg-primary p-2 text-on-primary">
                <span className="material-symbols-outlined">spa</span>
              </div>
            </div>
            <ul className="flex flex-col gap-sm">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <button
                    onClick={() => select(branch.id)}
                    className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-md text-left hover:bg-surface-container"
                  >
                    <p className="font-headline-md text-headline-md text-primary">{branch.name}</p>
                    <p className="mt-xs font-body-md text-body-md text-on-surface-variant">
                      {branch.addressLines.join(" · ")}
                    </p>
                    <p className="mt-sm font-label-sm text-label-sm text-on-surface-variant">
                      {branch.distance} away · {branch.waitTime} wait · next {branch.nextSlot}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-md font-label-sm text-label-sm text-outline">
          Wrong venue? Scan the QR code displayed at your reception desk to switch businesses.
        </p>
      </main>
    </div>
  );
}
