import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BookMyQ - Branch Selection" },
      { name: "description", content: "Choose your preferred Lumina Wellness Spa location and see available services and times." },
      { property: "og:title", content: "BookMyQ - Branch Selection" },
      { property: "og:description", content: "Choose your preferred Lumina Wellness Spa location and see available services and times." },
    ],
  }),
  component: Index,
});

type Branch = {
  id: string;
  name: string;
  address: React.ReactNode;
  distance: string;
  waitTime: string;
  waitHighlight: boolean;
  nextSlot: string;
  image: string;
  badge?: { icon: string; label: string };
};

const branches: Branch[] = [
  {
    id: "downtown",
    name: "Downtown Branch",
    address: (
      <>
        124 Urban Plaza, Suite 400
        <br />
        Central Business District
      </>
    ),
    distance: "0.8 miles",
    waitTime: "15 mins",
    waitHighlight: true,
    nextSlot: "10:30 AM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI0NtZXPpHnEFFBIZQJMpiYZTtP3SStE0Wa-V9YcFwAny7RVjb67GGb_Dg0qMGX_5oCcgMaV7Sx6pAH7xjKvy7YrqWmmk-texeraFiMq-XDUPS03wnUFlR1dDXuIZEnt6V6McV4RcEEQZFHUM1cV9navH12eMv-sDe2ep3QMFBBWA6JjCwxrBpKeBHjDd8IiYHwGzA4wVhGwpvORFuzbTG-A6J-013NieVu1zX3lmcLvhD9oTE83uDmffqIXIul3FbsP3pkSc5hagr",
    badge: { icon: "auto_awesome", label: "Shortest Wait" },
  },
  {
    id: "riverside",
    name: "Riverside",
    address: (
      <>
        45 Waterfront Drive
        <br />
        River North District
      </>
    ),
    distance: "0.2 miles",
    waitTime: "45 mins",
    waitHighlight: false,
    nextSlot: "11:15 AM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoaGJJ03epYztwYwuvEhuXvbcEXNy_K-AlnMobqCpC3MHYM31-5Xa-cu9nhr4aw8siqtUzxdOorwWED43bIoLk0nMBXR1TNxSvteR6si17FiIYEpaEMC6FigSzizdiUdjvQTAkzeBWz3KTpEuQPOe2URFrRUIMJlMya2jn1KxEX-Vd755Cwqs_7v2H4Vuri_ItQwgt9Z6UrFDNpAS1aMko5ELLAfBeLs9YAATB0bzf8J01dYmMuY-efoYNrUf4gyyn1CoUZJ7DF4zQ",
    badge: { icon: "location_on", label: "Nearest Branch" },
  },
  {
    id: "westend",
    name: "West End",
    address: (
      <>
        892 Kensington Way
        <br />
        West End Heights
      </>
    ),
    distance: "2.4 miles",
    waitTime: "30 mins",
    waitHighlight: false,
    nextSlot: "10:45 AM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEt8OYSel90bAaVBUQLiUwGNzX8UNC1JQzYe4bht7vLWKLe0kxj1RywvYRF6pC1pw1wLwOBGs1khwNbA_B8ZJ1PoL2i6vgVmFRkrw8jEORkgjWn--fSSspJ2gMXfwOKCaegC-1dnra30jNvRQML1XirQq_TEpj7r-SEViCu07pnUJQf-0SEm1wsiljLijKeDI12PukHAIlc5UMg0caBPg_rCUH2pcX_S1wCbo3DJ_WYcxB_oSUz-yfhEKoqOBjOrPmaCCUQGUM6-tB",
  },
];

function Index() {
  const [view, setView] = useState<"list" | "map">("list");

  const actions = (
    <div className="flex p-1 bg-surface-container-low border border-outline-variant rounded-lg">
      <button
        className={`flex items-center gap-xs px-md py-2 rounded-lg font-label-md transition-colors ${
          view === "list" ? "bg-surface-container-lowest text-primary" : "text-on-surface-variant hover:text-primary"
        }`}
        onClick={() => setView("list")}
      >
        <span className="material-symbols-outlined text-[18px]">list</span>
        List View
      </button>
      <button
        className={`flex items-center gap-xs px-md py-2 rounded-lg font-label-md transition-colors ${
          view === "map" ? "bg-surface-container-lowest text-primary" : "text-on-surface-variant hover:text-primary"
        }`}
        onClick={() => setView("map")}
      >
        <span className="material-symbols-outlined text-[18px]">map</span>
        Map View
      </button>
    </div>
  );

  return (
    <PortalShell
      eyebrow="Lumina Wellness Spa"
      title="Choose your preferred location"
      subtitle="Select a branch to see available services and times."
      actions={actions}
    >
      {view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="card-surface bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{ backgroundImage: `url('${branch.image}')` }}
                />
                {branch.badge && (
                  <div className="absolute top-sm right-sm">
                    <div className="flex items-center gap-xs px-sm py-1 bg-secondary text-on-secondary rounded-full font-label-sm">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {branch.badge.icon}
                      </span>
                      {branch.badge.label}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-md flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="font-headline-md text-headline-md text-primary">{branch.name}</h3>
                  <span className="flex items-center gap-xs font-label-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">distance</span>
                    {branch.distance}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">{branch.address}</p>
                <div className="grid grid-cols-2 gap-sm mb-md bg-surface-container-low p-sm rounded-lg">
                  <div>
                    <span className="text-on-surface-variant font-label-sm block mb-xs uppercase tracking-wider">
                      Wait Time
                    </span>
                    <span className={`font-bold font-headline-md ${branch.waitHighlight ? "text-secondary" : "text-on-surface"}`}>
                      {branch.waitTime}
                    </span>
                  </div>
                  <div className="border-l border-outline-variant pl-sm">
                    <span className="text-on-surface-variant font-label-sm block mb-xs uppercase tracking-wider">
                      Next Slot
                    </span>
                    <span className="text-primary font-bold font-headline-md">{branch.nextSlot}</span>
                  </div>
                </div>
                <Link
                  to="/business"
                  className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container flex items-center justify-center gap-sm mt-auto"
                >
                  Select Branch
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[500px] w-full rounded-xl overflow-hidden border border-outline-variant">
          <div className="w-full h-full bg-surface-container relative flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCo8n-IQ_r77ZxNdqeAYVB7AK_zeG4EO9TS_VjoO3S7UfqcdOAUNnYe2ZxGo02ZO1C-NAuFRU7pf4o_g32aOTtKbXJuki-qIXuHeQWpWaB0BlZ_tGVB6KBHfB5wSglqSmX7_5erpPtWlYXfY5UhdxPzSpNybnzEEnpA7s2XBI1ljFd40SUT6UTWpJf6eeUEGF6KFh8SAarHGoNeTjcCHRp3RhuNTLk8Fk1gsUfW5sFbMCcnD6tIP5VfkvZsIkLwKGWwnYP5WKtMyJZh')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute top-1/4 left-1/3 bg-primary text-on-primary p-2 rounded-full">
              <span className="material-symbols-outlined">spa</span>
            </div>
            <div className="absolute top-1/2 left-1/2 bg-secondary text-on-secondary p-2 rounded-full">
              <span className="material-symbols-outlined">spa</span>
            </div>
            <div className="absolute bottom-1/3 right-1/4 bg-primary text-on-primary p-2 rounded-full">
              <span className="material-symbols-outlined">spa</span>
            </div>
          </div>
        </div>
      )}
    </PortalShell>
  );
}
