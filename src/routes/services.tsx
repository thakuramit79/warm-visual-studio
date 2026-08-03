import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";

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

  const actions = (
    <div className="flex flex-wrap items-center gap-sm">
      <button className="flex items-center gap-xs px-md py-2 border border-outline-variant bg-surface-container-lowest rounded-lg hover:bg-surface-container">
        <span className="font-label-md text-label-md">Duration</span>
        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
      </button>
      <button className="flex items-center gap-xs px-md py-2 border border-outline-variant bg-surface-container-lowest rounded-lg hover:bg-surface-container">
        <span className="font-label-md text-label-md">Price Range</span>
        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
      </button>
      <button className="flex items-center gap-xs px-md py-2 border border-outline-variant bg-surface-container-lowest rounded-lg hover:bg-surface-container">
        <span className="font-label-md text-label-md">Availability</span>
        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
      </button>
    </div>
  );

  return (
    <PortalShell
      eyebrow="Lumina Wellness Spa"
      title="Select your services"
      subtitle="Browse categories and add services to your booking."
      actions={actions}
    >
      <div className="flex flex-col md:flex-row gap-md">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-md">
            <div className="card-surface bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">Categories</h3>
              <ul className="space-y-xs">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-md py-2 rounded-lg flex items-center justify-between transition-colors ${
                        activeCategory === cat
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      <span className="font-label-md text-label-md">{cat}</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface bg-primary text-on-primary rounded-xl p-md">
              <h4 className="font-label-md text-label-md font-bold mb-xs">Membership Exclusive</h4>
              <p className="text-label-sm font-label-sm opacity-80 mb-sm">Get 20% off all massages with Gold Tier.</p>
              <button className="bg-surface-container-lowest text-primary px-md py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container">
                Learn More
              </button>
            </div>
          </div>
        </aside>
        <section className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-md">
            {SERVICES.map((service) => {
              const isSelected = !!selected[service.id];
              return (
                <div
                  key={service.id}
                  className="card-surface flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img className="w-full h-full object-cover" src={service.img} alt={service.name} />
                    {service.popular && (
                      <span className="absolute top-sm right-sm bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-sm py-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-md flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-xs">
                      <h2 className="font-headline-md text-headline-md text-primary">{service.name}</h2>
                      <span className="font-headline-md text-headline-md text-secondary">${service.price}</span>
                    </div>
                    <div className="flex items-center gap-sm text-on-surface-variant mb-sm">
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
                    <div className="mt-auto pt-md border-t border-outline-variant">
                      <button
                        onClick={() => toggleService(service.id)}
                        className={`w-full py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm transition-colors ${
                          isSelected
                            ? "border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container"
                            : "bg-primary text-on-primary hover:bg-primary-container"
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
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-20 card-surface bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-label-md text-label-md text-primary uppercase">Booking Summary</h3>
              <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-lg text-label-sm font-label-sm">
                {selectedServices.length} items
              </span>
            </div>
            {selectedServices.length === 0 ? (
              <div className="py-lg flex flex-col items-center justify-center text-center opacity-60">
                <span className="material-symbols-outlined text-4xl mb-sm">shopping_cart</span>
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
            <div className="border-t border-outline-variant pt-md mt-md">
              <div className="flex justify-between items-center mb-md">
                <span className="font-label-md text-label-md text-on-surface-variant">Estimated Total</span>
                <span className="font-headline-md text-headline-md text-primary">${total.toFixed(2)}</span>
              </div>
              {total > 0 ? (
                <Link
                  to="/slots"
                  className="w-full block text-center bg-primary text-on-primary rounded-lg py-2.5 font-label-md hover:bg-primary-container"
                >
                  Confirm Selection
                </Link>
              ) : (
                <button className="w-full bg-outline-variant text-on-surface cursor-not-allowed rounded-lg py-2.5 font-label-md" disabled>
                  Confirm Selection
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
