import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "Lumina Wellness Spa | BookMyQ" },
      { name: "description", content: "Where ancient healing traditions meet modern luxury. Discover Lumina Wellness Spa's signature treatments and book your appointment." },
      { property: "og:title", content: "Lumina Wellness Spa | BookMyQ" },
      { property: "og:description", content: "Where ancient healing traditions meet modern luxury. Discover Lumina Wellness Spa's signature treatments and book your appointment." },
    ],
  }),
  component: Business,
});

function Business() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    {
      from: "ai",
      text: "Hello! I'm your Lumina assistant. Would you like to see available slots for a Deep Tissue massage today?",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setMessage("");
  };

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(11,44,71,0.05)] docked full-width top-0 sticky z-50">
        <nav className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-xs">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
              Lumina
            </span>
          </div>
          <div className="hidden md:flex items-center gap-lg">
            <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md hover:text-primary transition-colors" to="/business">
              Home
            </Link>
            <a className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" href="#services">
              Services
            </a>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/bookings">
              Bookings
            </Link>
            <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/offers">
              Offers
            </Link>
          </div>
          <div className="flex items-center gap-md">
            <Link className="p-base text-primary" to="/notifications">
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <button className="p-base text-primary">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section className="relative h-[870px] w-full flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqT30KeFyVwfhcLIDbs0ys-U93N8c6yQukw77kNrEAjNXZ7wTbLcKjJVQ0-MpZBxGlNvv9X02K7X4p-mFuWXoI2wjPOL7yGOTxhzaASLIeCMs8DjMdaiPqKssM7EIrqa9pvxFwirGuisfwxx2wwqMZHUp4Fik96sFNt3mNo9ffo4k9mQ4eVpPx9X2lZsexok5Znw-juLI0hSneI483_DoTqjNUpxIKa9cvsheDRd0PaoDDiYbHlfQ-02lTMSsLwPfeXJVn4SNiQh8U')",
              }}
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-md lg:px-xl pb-xl">
            <div className="max-w-2xl text-on-primary">
              <div className="flex items-center gap-base mb-base">
                <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm text-label-sm flex items-center gap-xs">
                  <span className="material-symbols-outlined !text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  Verified Partner
                </span>
                <div className="flex items-center gap-xs text-secondary-fixed">
                  <span className="material-symbols-outlined !text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="font-label-md text-label-md">4.9 (1.2k Reviews)</span>
                </div>
              </div>
              <h1 className="font-display-lg text-display-lg mb-md leading-tight">Lumina Wellness Spa</h1>
              <p className="font-body-lg text-body-lg mb-xl opacity-90">
                Where ancient healing traditions meet modern luxury. Experience curated wellness journeys tailored
                to your body's unique rhythm.
              </p>
              <div className="flex flex-wrap gap-md">
                <Link
                  to="/booking-method"
                  className="bg-secondary text-on-secondary px-xl py-md rounded-xl font-headline-md flex items-center gap-sm shadow-lg hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined">calendar_month</span>
                  Book Appointment
                </Link>
                <Link
                  to="/queue"
                  className="glass-panel text-primary px-xl py-md rounded-xl font-headline-md border border-white/30 flex items-center gap-sm hover:bg-white transition-colors"
                >
                  <span className="material-symbols-outlined">bolt</span>
                  Join Live Queue
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-xl max-w-container-max mx-auto px-md lg:px-xl" id="services">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Featured Services</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Elevate your well-being with our signature treatments.
              </p>
            </div>
            <Link to="/services" className="text-secondary font-label-md text-label-md flex items-center gap-xs hover:underline">
              View All Services <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container-low shadow-[0px_4px_20px_rgba(11,44,71,0.05)] transition-all hover:shadow-[0px_12px_32px_rgba(11,44,71,0.12)]">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Deep tissue massage therapy session"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDLKA8zYLQRPiQLEGhWWQvanSBl4_vkn6IKcC_r-GQQJ4Mr2TeV7k1XwzD8n2EJKns0lqKpmc_5GHObwV7BuitPn-93FwAp0ty5g8mTs5UDsCA-2nf20ift9wzkT8maYZHOYEioYaHv8lxx6f2VJ3OsBUPsqxlU1QPhSvAwOTAFwg4ntgNCI5TeZBKUxBHh_o2J-zhcILuyKAmlyqrvelZxKotSeOFV-erSAxd7fdrgR8eS4ByM9kT7SKdMvk9XrNEc8FwXPLTo8zk"
                  />
                </div>
                <div className="md:w-1/2 p-xl flex flex-col justify-center">
                  <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest mb-sm">
                    Best Seller
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-primary mb-base">Deep Tissue Recovery</h3>
                  <p className="text-on-surface-variant font-body-md text-body-md mb-xl">
                    Re-align your body with focused pressure on the deepest layers of muscle tissue, tendons, and
                    fascia.
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-primary font-headline-md text-headline-md">
                      $120 <span className="text-label-sm font-normal">/ 90 min</span>
                    </span>
                    <Link
                      to="/services"
                      className="bg-primary-container text-on-primary-container px-lg py-sm rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 group overflow-hidden rounded-3xl bg-surface-container-low shadow-[0px_4px_20px_rgba(11,44,71,0.05)] hover:shadow-[0px_12px_32px_rgba(11,44,71,0.12)] transition-all">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Aromatherapy oils and diffusers"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi_qeWzcXzNVxqXlPgu2c2S1UqchiXg4LMUBKDqbPZW2PJt58TcSOhZXxdOhTaSP9DQVwV058sEoy_q8la7SJknCnCg46DiPwDB7JjSDpnCSotnxYdCuYQHn-bN4OjocvYPDdTEpdWR7EvOdjzFQ7ocz5Pg_2As8FDgrHUROvAwqHL2qtHBbKIoZJL9Udxu8JWQd2r12a2_qwi7Y-1aTOHDKTMXwovqlPlcIWptlY4_1vYy-EQs6vBF-VBKPvLlvYd5zUZYqf_LY6e"
                />
              </div>
              <div className="p-xl">
                <h3 className="font-headline-md text-headline-md text-primary mb-sm">Aromatherapy Glow</h3>
                <p className="text-on-surface-variant font-body-md text-body-md mb-md">
                  Infuse your senses with organic botanical essences chosen for your mood.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-headline-md text-headline-md">$95</span>
                  <Link
                    to="/services"
                    className="p-base rounded-full border border-outline-variant text-primary hover:bg-primary-container hover:text-on-primary-container transition-all"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 bg-tertiary-container rounded-3xl p-xl flex flex-col justify-between text-on-tertiary-container">
              <div>
                <span className="material-symbols-outlined !text-[48px] mb-base">spa</span>
                <h3 className="font-headline-md text-headline-md mb-base">Wellness Package</h3>
                <p className="font-body-md text-body-md opacity-80">
                  Full day immersive experience including sauna, facial, and nutrition consult.
                </p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-base font-label-md text-label-md mt-xl">
                EXPLORE PACKAGES <span className="material-symbols-outlined">trending_flat</span>
              </Link>
            </div>
            <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container-low shadow-[0px_4px_20px_rgba(11,44,71,0.05)]">
              <div className="flex h-full items-center p-xl gap-xl">
                <div className="hidden lg:block w-1/3">
                  <div className="grid grid-cols-2 gap-base">
                    <div className="h-24 bg-surface-variant rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="Modern spa reception area"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJp7U0-ng809x5vbfIXRgcBC9Eg4DGaa9vFsyuiMEhkXqdUozzndud3fNYh4dw9dZ0QCz2n7pneuPwDq35-ryEEEw6pokqc14T4H3Xw_5dNcT-rKoWR5lFgiZ4X-CHoC_T2sV-IKLFnVbhpdcuauYgFZd9LN_KnEjMFrVY6nCqlfe2B9QZNVRkdHVkerBExTFLi3M6sIJOTPQeoaCyt7nSrJ0YIZk6xxZLZ7c_KtlLNOeUg9UcAtkmqStPPNfGCO9dELbl2mgWiXdw"
                      />
                    </div>
                    <div className="h-24 bg-surface-variant rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="Tranquil meditation room"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLQV8PxHRtGEnwEL7yy5quRxrPW6uJCEstDbl5BlTNcVfK4KIsvFt_qUABbRY1tgwaUMs2M3jNWxCsBQCiC4dJJ5Qa3YBxUgFrZRjyWyxD4WOnQX_RYpleX4ZgmJCL31PB1hWnFe1f1osX8dwMxN7wsBFEr1qUqCpy2dZUNKXwuCQrbd5kcy3-ohwDgkiKlc7R6jDDsquXDEWPXnJdDBLiz3NOySv4uth3iOmlgGm_WjfPR0lMvn3s8WbyMyqyOk7ChRHao0E4JpHv"
                      />
                    </div>
                    <div className="h-24 bg-surface-variant rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="Herbal tea being poured"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNKXMTRzGzBH8nyl-yzdaslbmLNXnK30KWZgdzHTNQ1y_y4L-5O5isep6WGnmrTckiDtSS0KsOQtqqSwUK5JcmoFyVgfgs8u2Daxhc9_gNzhNdTzhwpIVvUwXq-75_pssXkKL1O7NK9s31MAE40_0ei77IFlbPElkpylinROiNoQNm2YRnVHIupgpNJdkL_3ylp9GBJEXiXqr18J-O9bSqj_shTiMs7SinhVumlEALA1LOj8kA240q1cxmI7MCwNfB0N2ueltAYfk6"
                      />
                    </div>
                    <div className="h-24 bg-surface-variant rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        alt="Relaxing lounge chairs overlooking garden"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOlRaMdL9DlyceUDTMfGlBlbN_mMcyWjSEc65vfdjI09Ypcs1c0Etq3uyBwatPBlQh2jTyDhs7FASflvnlfso55uVIegFW6RW9oXDbYSFgqkyisvmPbLqGLnJxo1Nlf1UuLGFiRkzTzaYU4v8mdYsdsKzqSW9Z87-Eqnrg3mCRdUeHro_ID3eIB4sR8UcjYHgw9n8GJYYFyX8u7KG5qfTXujNzvlO0-575hmxxQ5zhBDciQ9NXOWrter_W5jDXmiLjsoNuHYaMuwQg"
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h3 className="font-headline-md text-headline-md text-primary mb-base">Our Sanctuary</h3>
                  <p className="text-on-surface-variant font-body-md text-body-md mb-md">
                    Step into a space designed to quiet the mind. Every corner of Lumina Wellness is engineered for
                    sensory delight and restorative peace.
                  </p>
                  <button className="bg-primary text-on-primary px-lg py-md rounded-xl font-label-md hover:opacity-90 transition-opacity">
                    Tour the Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest py-xl">
          <div className="max-w-container-max mx-auto px-md lg:px-xl grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-md">Mindful Healing since 2014</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">
                Lumina Wellness Spa was founded on the belief that true luxury is the space and time to reconnect
                with oneself. Our therapists are masters of their craft, merging clinical expertise with an
                intuitive touch to deliver treatments that transcend the ordinary.
              </p>
              <div className="flex gap-lg">
                <div className="text-center">
                  <p className="font-display-lg text-display-lg text-secondary">25+</p>
                  <p className="font-label-sm text-label-sm uppercase text-outline">Therapists</p>
                </div>
                <div className="text-center">
                  <p className="font-display-lg text-display-lg text-secondary">15k</p>
                  <p className="font-label-sm text-label-sm uppercase text-outline">Clients</p>
                </div>
              </div>
            </div>
            <div className="bg-surface p-xl rounded-3xl border border-surface-variant shadow-sm">
              <h3 className="font-headline-md text-headline-md text-primary mb-xl">Visit the Sanctuary</h3>
              <div className="space-y-lg">
                <div className="flex gap-md">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <div>
                    <p className="font-label-md text-label-md text-primary">Location</p>
                    <p className="text-on-surface-variant">124 Serenity Drive, Aspen Meadows, CO 80211</p>
                  </div>
                </div>
                <div className="flex gap-md">
                  <span className="material-symbols-outlined text-secondary">schedule</span>
                  <div>
                    <p className="font-label-md text-label-md text-primary">Hours</p>
                    <p className="text-on-surface-variant">Mon-Sun: 08:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex flex-col gap-sm pt-md">
                  <button className="w-full flex items-center justify-center gap-base py-md rounded-xl bg-[#25D366] text-white font-label-md hover:brightness-95 transition-all">
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp Us
                  </button>
                  <button className="w-full flex items-center justify-center gap-base py-md rounded-xl border border-primary text-primary font-label-md hover:bg-primary-container hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined">directions</span>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-md right-md z-50 flex flex-col items-center justify-center">
        {chatOpen && (
          <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-surface dark:bg-surface-container-low rounded-3xl shadow-[0px_12px_32px_rgba(0,105,111,0.25)] border border-tertiary-fixed-dim/30 overflow-hidden glass-panel">
            <div className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim p-md text-on-secondary">
              <p className="font-label-md text-label-md">BookMyQ AI Concierge</p>
              <p className="text-sm opacity-80">I can help you find a slot or service!</p>
            </div>
            <div className="h-64 p-md overflow-y-auto space-y-md bg-white/50">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-sm">
                  {m.from === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-secondary-container !text-[16px]">
                        smart_toy
                      </span>
                    </div>
                  )}
                  <div
                    className={`rounded-xl p-sm text-sm ${
                      m.from === "ai" ? "bg-surface-container" : "bg-secondary-container ml-auto"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-md border-t border-surface-variant flex gap-base">
              <input
                className="flex-1 bg-surface-container-low border-none rounded-xl text-sm focus:ring-1 focus:ring-secondary"
                placeholder="Type a message..."
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="bg-secondary text-on-secondary p-sm rounded-xl" onClick={sendMessage}>
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        )}
        <button
          className="bg-gradient-to-br from-secondary to-tertiary-fixed-dim w-16 h-16 rounded-full flex items-center justify-center shadow-[0px_12px_32px_rgba(0,105,111,0.25)] animate-pulse-slow active:scale-95 transition-all"
          onClick={() => setChatOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-white !text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
        </button>
      </div>
      <footer className="bg-background dark:bg-background border-t border-surface-variant dark:border-outline-variant py-md mt-xl">
        <div className="w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm">
          <div className="flex flex-col md:flex-row items-center gap-md">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
              Lumina Wellness Spa
            </span>
            <span className="hidden md:block text-outline-variant">•</span>
            <p className="text-outline dark:text-outline-variant font-label-sm text-label-sm">
              © 2024 All Rights Reserved
            </p>
          </div>
          <div className="flex gap-lg">
            <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">
              Privacy Policy
            </a>
            <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">
              Terms of Service
            </a>
            <a className="text-outline hover:text-on-background transition-colors font-label-sm text-label-sm" href="#">
              Support
            </a>
          </div>
          <div className="flex items-center gap-xs mt-md md:mt-0">
            <span className="text-outline font-label-sm text-label-sm italic opacity-80">Powered by</span>
            <span className="font-label-sm text-label-sm font-bold text-primary tracking-tight">BookMyQ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
