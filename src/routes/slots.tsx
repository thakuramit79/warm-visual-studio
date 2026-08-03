import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { PortalShell } from "@/components/portal-shell";

export const Route = createFileRoute("/slots")({
  head: () => ({
    meta: [
      { title: "BookMyQ | Select Staff & Slot" },
      { name: "description", content: "Choose your specialist, date, and time slot for your appointment." },
      { property: "og:title", content: "BookMyQ | Select Staff & Slot" },
      { property: "og:description", content: "Choose your specialist, date, and time slot for your appointment." },
    ],
  }),
  component: SlotsPage,
});

interface Staff {
  id: string;
  name: string;
  role: string;
  rating: string;
  tags: string[];
  img: string;
  topRated?: boolean;
}

const STAFF: Staff[] = [
  {
    id: "sarah",
    name: "Sarah Jenkins",
    role: "Master Therapist",
    rating: "4.9",
    tags: ["Deep Tissue", "Aromatherapy"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA32R6-j25dVcRog5G6wzWWPs2hlbbpvcQuCgg4t4pof_BH-XWipi624WQW0w7Y-7KGeprzaLsHS18CW4D9YMM86T25AiiXJA5Q2gdIQfjTtIotcU2ATfBfIYKu_RIELHE-uSAXxvAEvCCLVLnWJpUwP9zydoRdP0f7jvlj1DsxI_5QWNYT8OHq85RKKtvg0P2bljOHEFX_5zrLbLVWH5ngwpXajpPECDRD0Rrp1dgk3EWXnWozLzmF2K0F0ZFznnhx1PCpd7lIDc1t",
    topRated: true,
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Senior Specialist",
    rating: "4.8",
    tags: ["Swedish", "Sports Massage"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSrvXUNK8UU0Ahot1Xyca4RpuT6ceHXvS44vIcJKBBMDXycwu0RJf3ENXnKu9aangDc-OfhNpBsogriReVUurPBQR9J2LUVHrCtmUCTkl8j4j1vT9XUiTADE0wo2BqQAeCCyiJGA1x63sfAVFhiwKq3yf8wUSs0iFeWRj0pbJEawQOdDTc8dzL-01xFWsGPqPoZJKc9ZDx79v0-0xFA7BITuAHSxyhHFjKE5OJaZ6QvzaQmEk_5W0qEFXVE474_V91kB2qn0UhWNab",
  },
  {
    id: "elena",
    name: "Elena Rodriguez",
    role: "Aesthetic Expert",
    rating: "5.0",
    tags: ["Reiki", "Hot Stone"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBizdvj63NadjwYjDHNAPgguW_TEoWei7Y73G7U2YKBxS0YLTbgkNCmXKZ9fICVbMkVuBmtSj7HaG0GMDtMmVhVGxYg2d2b_QXvsVJe53Q8rUaAtxRG4cWs0BWnyLDPsXY3Rs3povfWfgc-8cYZOvTDpWRxujRulogUPCF0eGqcPSiXA5_W19ZcI6cZdr3fGXBeGsNkoNph9YyUEiS4OvzA1UI45TvYXJkYcTEOgwk_bwm4EE_tjY6_RA_inybKB9P9XnmSoVgUa3ZS",
  },
];

const MORNING = ["09:00 AM", "10:30 AM"];
const AFTERNOON = [
  { time: "01:30 PM", disabled: false },
  { time: "02:45 PM", disabled: false },
  { time: "04:30 PM", disabled: false },
  { time: "05:00 PM", disabled: true },
];
const EVENING = ["06:15 PM", "07:30 PM"];

const DAYS = [
  { day: "01", dot: "secondary" },
  { day: "02", dot: "outline-variant" },
  { day: "03", dot: null },
  { day: "04", today: true },
  { day: "05", dots: 2 },
  { day: "06", dot: null },
  { day: "07", dot: "secondary" },
  { day: "08", dot: null },
  { day: "09", dot: "secondary" },
  { day: "10", disabled: true },
];

function SlotsPage() {
  const [activeStaff, setActiveStaff] = useState("sarah");
  const [activeDay, setActiveDay] = useState("04");
  const [activeSlot, setActiveSlot] = useState("01:30 PM");

  const selectedStaff = STAFF.find((s) => s.id === activeStaff)!;

  return (
    <PortalShell
      title="Select Professional & Time"
      subtitle="Find the perfect match for your session"
      eyebrow="Booking"
      actions={
        <>
          <Link to="/services" className="border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container">
            Back
          </Link>
          <Link to="/review" className="bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container">
            Confirm Selection
          </Link>
        </>
      }
    >
      <div className="card-surface rounded-xl border border-outline-variant bg-secondary-container p-md flex items-start gap-sm mb-md">
        <div className="bg-on-secondary-container p-2 rounded-lg">
          <span className="material-symbols-outlined text-on-secondary">auto_awesome</span>
        </div>
        <div>
          <p className="text-on-secondary-container font-label-md">Concierge Recommendation</p>
          <p className="text-on-secondary-container font-body-md opacity-90 italic">"Sarah J. is top-rated for Deep Tissue Massage and has an opening today at 4:30 PM."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div className="lg:col-span-8 space-y-xl">
          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-headline-md text-headline-md text-primary">Choose your specialist</h2>
              <div className="flex gap-xs">
                <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
            <div className="flex gap-md overflow-x-auto hide-scrollbar pb-xs">
              {STAFF.map((staff) => {
                const isActive = staff.id === activeStaff;
                return (
                  <div
                    key={staff.id}
                    onClick={() => setActiveStaff(staff.id)}
                    className={`min-w-[280px] bg-surface-container-lowest rounded-xl p-md cursor-pointer transition-colors ${
                      isActive ? "border-2 border-secondary" : "border border-outline-variant"
                    }`}
                  >
                    <div className="relative w-full h-48 mb-md rounded-lg overflow-hidden">
                      <img className="w-full h-full object-cover" src={staff.img} alt={staff.name} />
                      {staff.topRated && (
                        <div className="absolute top-2 right-2 bg-secondary text-on-secondary text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Top Rated</div>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-headline-md text-primary leading-tight">{staff.name}</h3>
                        <p className={`font-label-sm ${isActive ? "text-on-secondary-container" : "text-on-surface-variant"}`}>{staff.role}</p>
                      </div>
                      <div className="flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span className="font-bold">{staff.rating}</span>
                      </div>
                    </div>
                    <div className="mt-md flex flex-wrap gap-xs">
                      {staff.tags.map((tag) => (
                        <span key={tag} className="bg-surface-container px-2 py-1 rounded text-[11px] font-medium text-on-surface-variant">{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-headline-md text-headline-md text-primary">Select Date</h2>
              <span className="font-label-md text-secondary">November 2024</span>
            </div>
            <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant">
              <div className="grid grid-cols-7 gap-xs text-center mb-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="text-[10px] font-bold text-outline uppercase tracking-widest">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-xs">
                <div className="aspect-square flex items-center justify-center text-outline opacity-30 text-label-md">28</div>
                <div className="aspect-square flex items-center justify-center text-outline opacity-30 text-label-md">29</div>
                <div className="aspect-square flex items-center justify-center text-outline opacity-30 text-label-md">30</div>
                <div className="aspect-square flex items-center justify-center text-outline opacity-30 text-label-md">31</div>
                {DAYS.map((d) => {
                  const isActive = d.day === activeDay;
                  if (d.disabled) {
                    return (
                      <div key={d.day} className="aspect-square flex flex-col items-center justify-center rounded-xl bg-surface-container-highest opacity-50 cursor-not-allowed">
                        <span className="text-label-md line-through">{d.day}</span>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={d.day}
                      onClick={() => setActiveDay(d.day)}
                      className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-colors border-b-4 ${
                        isActive
                          ? "bg-primary text-on-primary border-primary-container"
                          : "bg-surface-container-highest hover:bg-surface-variant border-transparent"
                      }`}
                    >
                      <span className={`text-label-md ${isActive ? "font-bold" : ""}`}>{d.day}</span>
                      {d.today && <span className="text-[10px] opacity-70">Today</span>}
                      {d.dot === "secondary" && <div className="w-1 h-1 bg-secondary rounded-full mt-1"></div>}
                      {d.dot === "outline-variant" && <div className="w-1 h-1 bg-outline-variant rounded-full mt-1"></div>}
                      {d.dots === 2 && (
                        <div className="flex gap-0.5 mt-1">
                          <div className="w-1 h-1 bg-secondary rounded-full"></div>
                          <div className="w-1 h-1 bg-secondary rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <section className="sticky top-24 space-y-md">
            <h2 className="font-headline-md text-headline-md text-primary">Available Slots</h2>
            <div className="space-y-lg">
              <div>
                <div className="flex items-center gap-sm mb-sm text-outline font-label-md">
                  <span className="material-symbols-outlined text-base">light_mode</span>
                  <span className="uppercase tracking-widest text-[11px]">Morning</span>
                </div>
                <div className="grid grid-cols-2 gap-sm">
                  {MORNING.map((slot) => (
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
              <div>
                <div className="flex items-center gap-sm mb-sm text-outline font-label-md">
                  <span className="material-symbols-outlined text-base">sunny</span>
                  <span className="uppercase tracking-widest text-[11px]">Afternoon</span>
                </div>
                <div className="grid grid-cols-2 gap-sm">
                  {AFTERNOON.map((slot) =>
                    slot.disabled ? (
                      <button key={slot.time} disabled className="py-3 px-4 rounded-lg border border-outline-variant text-on-surface-variant opacity-40 cursor-not-allowed text-center">
                        {slot.time}
                      </button>
                    ) : (
                      <button
                        key={slot.time}
                        onClick={() => setActiveSlot(slot.time)}
                        className={`py-3 px-4 rounded-lg text-center transition-colors ${
                          activeSlot === slot.time
                            ? "bg-primary text-on-primary font-bold"
                            : "border border-outline-variant text-on-surface-variant hover:border-secondary"
                        }`}
                      >
                        {slot.time}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-sm mb-sm text-outline font-label-md">
                  <span className="material-symbols-outlined text-base">dark_mode</span>
                  <span className="uppercase tracking-widest text-[11px]">Evening</span>
                </div>
                <div className="grid grid-cols-2 gap-sm">
                  {EVENING.map((slot) => (
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
            </div>
            <div className="p-md bg-tertiary-container text-on-tertiary-container rounded-xl border border-outline-variant">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">bolt</span>
                <p className="font-label-md">Fastest Appointment</p>
              </div>
              <p className="text-body-md mb-md opacity-90">Prefer to get it done today? There's a last-minute cancellation at 2:00 PM with Michael.</p>
              <button
                onClick={() => {
                  setActiveStaff("michael");
                  setActiveSlot("02:00 PM");
                }}
                className="w-full py-2 bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold rounded-lg hover:brightness-110 transition-all"
              >
                Claim Slot
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="card-surface rounded-xl border border-outline-variant bg-surface-container-lowest p-md flex flex-col md:flex-row justify-between items-center gap-md mt-lg">
        <div className="flex items-center gap-md">
          <div className="hidden sm:block w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
            <img className="w-full h-full object-cover" src={selectedStaff.img} alt={selectedStaff.name} />
          </div>
          <div>
            <div className="flex items-center gap-xs">
              <span className="font-label-md text-primary">Deep Tissue Therapy</span>
              <span className="text-outline text-sm">•</span>
              <span className="text-secondary font-bold">{selectedStaff.name}</span>
            </div>
            <div className="text-on-surface-variant font-label-sm">
              Mon, Nov {activeDay}th @ {activeSlot} • 60 mins • $120.00
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
