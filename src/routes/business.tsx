import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { useSelectedBranch } from "@/hooks/use-selected-branch";

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
  const branch = useSelectedBranch();

  const actions = (
    <div className="flex flex-wrap gap-sm">
      <Link
        to="/booking-method"
        className="bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container flex items-center gap-xs"
      >
        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
        Book Appointment
      </Link>
      <Link
        to="/queue"
        className="border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container flex items-center gap-xs"
      >
        <span className="material-symbols-outlined text-[18px]">bolt</span>
        Join Live Queue
      </Link>
    </div>
  );

  return (
    <PortalShell
      eyebrow={branch ? `Lumina Wellness Spa · ${branch.name}` : "Lumina Wellness Spa"}
      title="Where ancient healing meets modern luxury"
      subtitle="Curated wellness journeys tailored to your body's unique rhythm. 4.9 rating from 1.2k reviews."
      actions={actions}
    >
      <section className="card-surface flex flex-col gap-sm rounded-xl border border-outline-variant bg-surface-container-low p-md md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-sm">
          <span className="material-symbols-outlined text-secondary">where_to_vote</span>
          <div>
            <p className="font-label-md text-label-md text-primary">
              {branch ? `You're checked in at ${branch.name}` : "No branch selected yet"}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {branch
                ? `${branch.addressLines.join(", ")} · ${branch.hours} · ${branch.waitTime} current wait`
                : "Pick the location you're visiting to see accurate wait times and slots."}
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="self-start rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2 font-label-md text-primary hover:bg-surface-container"
        >
          Change location
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-end mb-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-xs">Featured Services</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Elevate your well-being with our signature treatments.
            </p>
          </div>
          <Link to="/services" className="text-secondary font-label-md text-label-md flex items-center gap-xs hover:underline">
            View All Services <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
          <div className="md:col-span-8 card-surface bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 h-40 md:h-auto overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Deep tissue massage therapy session"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDLKA8zYLQRPiQLEGhWWQvanSBl4_vkn6IKcC_r-GQQJ4Mr2TeV7k1XwzD8n2EJKns0lqKpmc_5GHObwV7BuitPn-93FwAp0ty5g8mTs5UDsCA-2nf20ift9wzkT8maYZHOYEioYaHv8lxx6f2VJ3OsBUPsqxlU1QPhSvAwOTAFwg4ntgNCI5TeZBKUxBHh_o2J-zhcILuyKAmlyqrvelZxKotSeOFV-erSAxd7fdrgR8eS4ByM9kT7SKdMvk9XrNEc8FwXPLTo8zk"
                />
              </div>
              <div className="md:w-1/2 p-md flex flex-col justify-center">
                <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest mb-sm">
                  Best Seller
                </span>
                <h3 className="font-headline-md text-headline-md text-primary mb-sm">Deep Tissue Recovery</h3>
                <p className="text-on-surface-variant font-body-md text-body-md mb-md">
                  Re-align your body with focused pressure on the deepest layers of muscle tissue, tendons, and
                  fascia.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-primary font-headline-md text-headline-md">
                    $120 <span className="text-label-sm font-normal">/ 90 min</span>
                  </span>
                  <Link
                    to="/services"
                    className="bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 card-surface bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="h-36 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Aromatherapy oils and diffusers"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi_qeWzcXzNVxqXlPgu2c2S1UqchiXg4LMUBKDqbPZW2PJt58TcSOhZXxdOhTaSP9DQVwV058sEoy_q8la7SJknCnCg46DiPwDB7JjSDpnCSotnxYdCuYQHn-bN4OjocvYPDdTEpdWR7EvOdjzFQ7ocz5Pg_2As8FDgrHUROvAwqHL2qtHBbKIoZJL9Udxu8JWQd2r12a2_qwi7Y-1aTOHDKTMXwovqlPlcIWptlY4_1vYy-EQs6vBF-VBKPvLlvYd5zUZYqf_LY6e"
              />
            </div>
            <div className="p-md">
              <h3 className="font-headline-md text-headline-md text-primary mb-sm">Aromatherapy Glow</h3>
              <p className="text-on-surface-variant font-body-md text-body-md mb-md">
                Infuse your senses with organic botanical essences chosen for your mood.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-headline-md text-headline-md">$95</span>
                <Link
                  to="/services"
                  className="border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-sm py-2 font-label-md hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 card-surface bg-tertiary-container rounded-xl p-md flex flex-col justify-between text-on-tertiary-container">
            <div>
              <span className="material-symbols-outlined !text-[36px] mb-sm">spa</span>
              <h3 className="font-headline-md text-headline-md mb-sm">Wellness Package</h3>
              <p className="font-body-md text-body-md opacity-80">
                Full day immersive experience including sauna, facial, and nutrition consult.
              </p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-sm font-label-md text-label-md mt-md">
              Explore Packages <span className="material-symbols-outlined text-[18px]">trending_flat</span>
            </Link>
          </div>
          <div className="md:col-span-8 card-surface bg-surface-container-lowest border border-outline-variant rounded-xl">
            <div className="flex h-full items-center p-md gap-md">
              <div className="hidden lg:block w-1/3">
                <div className="grid grid-cols-2 gap-sm">
                  <div className="h-20 bg-surface-container rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Modern spa reception area"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJp7U0-ng809x5vbfIXRgcBC9Eg4DGaa9vFsyuiMEhkXqdUozzndud3fNYh4dw9dZ0QCz2n7pneuPwDq35-ryEEEw6pokqc14T4H3Xw_5dNcT-rKoWR5lFgiZ4X-CHoC_T2sV-IKLFnVbhpdcuauYgFZd9LN_KnEjMFrVY6nCqlfe2B9QZNVRkdHVkerBExTFLi3M6sIJOTPQeoaCyt7nSrJ0YIZk6xxZLZ7c_KtlLNOeUg9UcAtkmqStPPNfGCO9dELbl2mgWiXdw"
                    />
                  </div>
                  <div className="h-20 bg-surface-container rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Tranquil meditation room"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLQV8PxHRtGEnwEL7yy5quRxrPW6uJCEstDbl5BlTNcVfK4KIsvFt_qUABbRY1tgwaUMs2M3jNWxCsBQCiC4dJJ5Qa3YBxUgFrZRjyWyxD4WOnQX_RYpleX4ZgmJCL31PB1hWnFe1f1osX8dwMxN7wsBFEr1qUqCpy2dZUNKXwuCQrbd5kcy3-ohwDgkiKlc7R6jDDsquXDEWPXnJdDBLiz3NOySv4uth3iOmlgGm_WjfPR0lMvn3s8WbyMyqyOk7ChRHao0E4JpHv"
                    />
                  </div>
                  <div className="h-20 bg-surface-container rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Herbal tea being poured"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNKXMTRzGzBH8nyl-yzdaslbmLNXnK30KWZgdzHTNQ1y_y4L-5O5isep6WGnmrTckiDtSS0KsOQtqqSwUK5JcmoFyVgfgs8u2Daxhc9_gNzhNdTzhwpIVvUwXq-75_pssXkKL1O7NK9s31MAE40_0ei77IFlbPElkpylinROiNoQNm2YRnVHIupgpNJdkL_3ylp9GBJEXiXqr18J-O9bSqj_shTiMs7SinhVumlEALA1LOj8kA240q1cxmI7MCwNfB0N2ueltAYfk6"
                    />
                  </div>
                  <div className="h-20 bg-surface-container rounded-lg overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Relaxing lounge chairs overlooking garden"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOlRaMdL9DlyceUDTMfGlBlbN_mMcyWjSEc65vfdjI09Ypcs1c0Etq3uyBwatPBlQh2jTyDhs7FASflvnlfso55uVIegFW6RW9oXDbYSFgqkyisvmPbLqGLnJxo1Nlf1UuLGFiRkzTzaYU4v8mdYsdsKzqSW9Z87-Eqnrg3mCRdUeHro_ID3eIB4sR8UcjYHgw9n8GJYYFyX8u7KG5qfTXujNzvlO0-575hmxxQ5zhBDciQ9NXOWrter_W5jDXmiLjsoNuHYaMuwQg"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h3 className="font-headline-md text-headline-md text-primary mb-sm">Our Sanctuary</h3>
                <p className="text-on-surface-variant font-body-md text-body-md mb-md">
                  Step into a space designed to quiet the mind. Every corner of Lumina Wellness is engineered for
                  sensory delight and restorative peace.
                </p>
                <button className="bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container">
                  Tour the Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="card-surface bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md items-center">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-sm">Mindful Healing since 2014</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
              Lumina Wellness Spa was founded on the belief that true luxury is the space and time to reconnect
              with oneself. Our therapists are masters of their craft, merging clinical expertise with an
              intuitive touch to deliver treatments that transcend the ordinary.
            </p>
            <div className="flex gap-lg">
              <div className="text-center">
                <p className="font-headline-lg text-headline-lg text-secondary">25+</p>
                <p className="font-label-sm text-label-sm uppercase text-outline">Therapists</p>
              </div>
              <div className="text-center">
                <p className="font-headline-lg text-headline-lg text-secondary">15k</p>
                <p className="font-label-sm text-label-sm uppercase text-outline">Clients</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant">
            <h3 className="font-headline-md text-headline-md text-primary mb-md">Visit the Sanctuary</h3>
            <div className="space-y-md">
              <div className="flex gap-sm">
                <span className="material-symbols-outlined text-secondary">location_on</span>
                <div>
                  <p className="font-label-md text-label-md text-primary">Location</p>
                  <p className="text-on-surface-variant">124 Serenity Drive, Aspen Meadows, CO 80211</p>
                </div>
              </div>
              <div className="flex gap-sm">
                <span className="material-symbols-outlined text-secondary">schedule</span>
                <div>
                  <p className="font-label-md text-label-md text-primary">Hours</p>
                  <p className="text-on-surface-variant">Mon-Sun: 08:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex flex-col gap-sm pt-sm">
                <button className="w-full flex items-center justify-center gap-sm bg-primary text-on-primary rounded-lg px-md py-2.5 font-label-md hover:bg-primary-container">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Message Us
                </button>
                <button className="w-full flex items-center justify-center gap-sm border border-outline-variant bg-surface-container-lowest text-primary rounded-lg px-md py-2.5 font-label-md hover:bg-surface-container">
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
