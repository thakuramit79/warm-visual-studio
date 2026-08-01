import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "BookMyQ - Browse Services" },
      { name: "description", content: "Browse and select spa and wellness services to add to your booking." },
      { property: "og:title", content: "BookMyQ - Browse Services" },
      { property: "og:description", content: "Browse and select spa and wellness services to add to your booking." },
    ],
  }),
  component: ServicesPage,
});

const CATEGORIES = ["Massage", "Facials", "Nails", "Packages"];

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  rating: string;
  reviews: string;
  desc: string;
  img: string;
  popular?: boolean;
}

const SERVICES: Service[] = [
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    price: 120,
    duration: "60 min",
    rating: "4.9",
    reviews: "124 reviews",
    desc: "Focuses on realigning deeper layers of muscles and connective tissue for intense relaxation.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByF0eSAuDXE_lXk-wmSp3WO2Ava0xDiCMim3npzwK1SIrgmw_b7PU-zGiY285yJDba_VsSpRpvWWK-XV1hNjl-3PL8J_hNSKdB7qfAI05zbRhLnOaEYmQV6wGsxdYjEUnVixyCHytPOeM1_kXuOmkqzxcM0Yx6vSdhlwD6wxEMN8_vj4kZJhT8GOxgOByRy1MmaZ3Afg-GNlfxW5M5Zf0FrGDSzfIpSIPolyTl0oZs2TVdYzdWtjuBt6OjPzTsqu4aj0MSJ6gxKhch",
    popular: true,
  },
  {
    id: "hydrating-facial",
    name: "Hydrating Glow Facial",
    price: 85,
    duration: "45 min",
    rating: "4.7",
    reviews: "89 reviews",
    desc: "Rejuvenate your skin with a custom blend of organic botanicals and hyaluronic acid.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLnbG6Cjp3ILvDkUtH1U9Il6AiYhQeO4J0-q-rumdae1Qv1ymHdkexcYadyglF97l4Iq51GZzgOt4uyXyUUxOexpScBJDfPUtPNFqlnEVJ7xzQWROZJ_Q179WcmCM-sZMODUnVLFe_OmMR-4pR5o5FqIHprrZBBUre5iMZFxbc6mLiLdkqRuTql3twYMPwoRSBI6Sb4kToDRnKAL1if-180C3BdIcAnYaZaf5UN-QzI95qp_zs33xZkyXSNqMXzN9jfbamFHx_J3v-",
  },
  {
    id: "gel-manicure",
    name: "Luxury Gel Manicure",
    price: 55,
    duration: "60 min",
    rating: "5.0",
    reviews: "212 reviews",
    desc: "Long-lasting shine and strength with curated colors and expert cuticle care.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr8NnY74qR6214Nfl6DGwiERBLuVm0ofhN59iPPepXIrlrRKWRyTFhgKIPhLlOS2-5zAH_sLuOAjitc4r_sB3VlBeO3-w2AyNjNXNvMYQoVWij4ylnrWXndmMxBodpgUYknKhNTLwm7oOQZVrl9u9Fs-gGYTOJlKq3Ylf5NrSpQKuTaRhiD3ArY34qa4El9ORRTlXJiLwKxwcVWPbeKBnKEH3h1vERde8PTG1Yh6-Oc-u7uOLMqbC0Nqq2e59aAQfdG4REZHpFz6FX",
    popular: true,
  },
  {
    id: "swedish",
    name: "Swedish Relaxation",
    price: 95,
    duration: "60 min",
    rating: "4.8",
    reviews: "156 reviews",
    desc: "Traditional relaxation strokes to improve circulation and ease muscle tension.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-cnnKvGT9hfI8MQeUS6l3UhFfVcwjqL453DNZ88Srq9Ra-qsacD2cdRmYoVF_Ql0IBl-Kk8HvgiompqzwinEz3-xoe66UkhyK7qdpCbZg8Zek8_Gis_c5pB1RNrUzwLeK1kj3DwnldGsZXy-aon9PKt1l5-ny3-bz_gVOEoYuWBAGDLmSgXIF6BxeN_xtLNrLKWHckpNFeH7EdYq0t_kXIBAAeHqo3Fdg25cBA2r4tKiEdbrWBP6oLY3Ht8L3_HpL64GOD2bOe19d",
  },
];

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("Massage");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggleService = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedServices = SERVICES.filter((s) => selected[s.id]);
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* TopNavBar */}
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-sm">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</span>
          </div>
          <nav className="hidden md:flex items-center gap-xl">
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" to="/">Home</Link>
            <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md transition-colors" to="/services">Services</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" to="/bookings">Bookings</Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors" to="/offers">Offers</Link>
          </nav>
          <div className="flex items-center gap-md">
            <Link to="/notifications" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</Link>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">account_circle</button>
          </div>
        </div>
      </header>
      <main className="max-w-container-max mx-auto px-md lg:px-xl py-md flex flex-col md:flex-row gap-gutter relative">
        {/* Left Sidebar: Categories */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-md">
            <div className="bg-surface-container-low rounded-xl p-md border border-surface-variant/30">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Categories</h3>
              <ul className="space-y-base">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-md py-sm rounded-lg flex items-center justify-between group transition-all ${
                        activeCategory === cat
                          ? "bg-primary-container text-on-primary-container"
                          : "text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      <span className="font-label-md text-label-md">{cat}</span>
                      <span
                        className={`material-symbols-outlined text-sm transition-opacity ${
                          activeCategory === cat ? "" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        chevron_right
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary text-on-primary p-md rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary-container opacity-20 rounded-full group-hover:scale-110 transition-transform"></div>
              <h4 className="font-label-md text-label-md font-bold mb-xs relative z-10">Membership Exclusive</h4>
              <p className="text-label-sm font-label-sm opacity-80 mb-sm relative z-10">Get 20% off all massages with Gold Tier.</p>
              <button className="bg-secondary-fixed text-on-secondary-fixed px-md py-xs rounded-full font-label-sm text-label-sm relative z-10 hover:brightness-110 transition-all">Learn More</button>
            </div>
          </div>
        </aside>
        {/* Main Content Area */}
        <section className="flex-1 min-w-0">
          <div className="mb-lg">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-md">Select your services</h1>
            <div className="flex flex-wrap items-center gap-sm">
              <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-full border border-outline-variant/30 hover:border-secondary transition-colors">
                <span className="font-label-md text-label-md">Duration</span>
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
              <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-full border border-outline-variant/30 hover:border-secondary transition-colors">
                <span className="font-label-md text-label-md">Price Range</span>
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
              <button className="flex items-center gap-xs px-md py-sm bg-surface-container rounded-full border border-outline-variant/30 hover:border-secondary transition-colors">
                <span className="font-label-md text-label-md">Availability</span>
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
              <div className="h-8 w-[1px] bg-outline-variant mx-xs"></div>
              <button className="flex items-center gap-xs text-secondary hover:underline transition-all">
                <span className="material-symbols-outlined text-sm">tune</span>
                <span className="font-label-md text-label-md">More Filters</span>
              </button>
            </div>
          </div>
          <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {SERVICES.map((service) => {
              const isSelected = !!selected[service.id];
              return (
                <div
                  key={service.id}
                  className="service-card group flex flex-col bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(11,44,71,0.05)] border border-surface-variant/20 overflow-hidden hover:shadow-[0px_12px_32px_rgba(11,44,71,0.12)] transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img className="service-image w-full h-full object-cover transition-transform duration-500" src={service.img} alt={service.name} />
                    {service.popular && (
                      <span className="absolute top-sm right-sm bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-md py-xs rounded-full shadow-sm">Popular</span>
                    )}
                  </div>
                  <div className="p-md flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-xs">
                      <h2 className="font-headline-md text-headline-md text-primary">{service.name}</h2>
                      <span className="font-headline-md text-headline-md text-secondary">${service.price}</span>
                    </div>
                    <div className="flex items-center gap-sm text-on-surface-variant mb-md">
                      <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span className="text-label-md font-label-md">{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-label-md font-label-md">{service.rating} ({service.reviews})</span>
                      </div>
                    </div>
                    <p className="text-on-surface-variant text-body-md font-body-md line-clamp-2 mb-md">{service.desc}</p>
                    <div className="mt-auto pt-md border-t border-surface-variant/30">
                      <button
                        onClick={() => toggleService(service.id)}
                        className={`w-full py-sm rounded-lg font-label-md text-label-md active:scale-[0.98] transition-all flex items-center justify-center gap-sm ${
                          isSelected ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary hover:bg-primary/90"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{isSelected ? "check_circle" : "add_circle"}</span>
                        {isSelected ? "Added" : "Add to Booking"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Side Summary */}
        <div className="hidden lg:block w-80 sticky top-24 self-start">
          <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-xl shadow-lg p-md">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-label-md text-label-md text-primary uppercase">Booking Summary</h3>
              <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-lg text-label-sm font-label-sm">{selectedServices.length} items</span>
            </div>
            {selectedServices.length === 0 ? (
              <div className="py-xl flex flex-col items-center justify-center text-center opacity-40">
                <span className="material-symbols-outlined text-4xl mb-base">shopping_cart</span>
                <p className="text-body-md font-body-md">Select a service to<br />begin your journey.</p>
              </div>
            ) : (
              <div className="py-md space-y-sm">
                {selectedServices.map((s) => (
                  <div key={s.id} className="flex justify-between text-body-md font-body-md">
                    <span className="text-on-surface-variant">{s.name}</span>
                    <span className="text-primary">${s.price}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-dashed border-outline-variant py-md mt-md">
              <div className="flex justify-between items-center mb-md">
                <span className="font-label-md text-label-md text-on-surface-variant">Estimated Total</span>
                <span className="font-headline-md text-headline-md text-primary">${total.toFixed(2)}</span>
              </div>
              {total > 0 ? (
                <Link
                  to="/slots"
                  className="w-full block text-center bg-primary text-on-primary py-sm rounded-lg font-label-md text-label-md transition-all"
                >
                  Confirm Selection
                </Link>
              ) : (
                <button className="w-full bg-outline-variant text-on-surface cursor-not-allowed py-sm rounded-lg font-label-md text-label-md transition-all" disabled>
                  Confirm Selection
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* SideNavBar (FAB AI Concierge) */}
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        <Link to="/concierge" className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim w-16 h-16 rounded-full shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center text-on-secondary-fixed-variant hover:scale-110 transition-transform duration-300 animate-pulse-slow active:scale-95 group relative">
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
          <span className="absolute right-20 bg-primary text-on-primary text-label-sm font-label-sm px-md py-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Ask Concierge
          </span>
        </Link>
      </div>
      {/* Footer */}
      <footer className="bg-background dark:bg-background full-width py-md border-t border-surface-variant dark:border-outline-variant mt-xl">
        <div className="w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm max-w-container-max mx-auto">
          <div className="font-label-sm text-label-sm uppercase tracking-widest text-outline">BOOKMYQ</div>
          <div className="text-outline dark:text-outline-variant font-label-sm text-label-sm">Powered by BookMyQ • Built for SMEs</div>
          <div className="flex gap-md">
            <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">Privacy Policy</a>
            <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">Terms of Service</a>
            <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
