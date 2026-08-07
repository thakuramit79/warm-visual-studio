import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { useSelectedBranch } from "@/hooks/use-selected-branch";

export const Route = createFileRoute("/booking-method")({
  head: () => ({
    meta: [
      { title: "BookMyQ | Choose Booking Method" },
      { name: "description", content: "Choose your preferred journey: browse services yourself or book with our AI Concierge." },
      { property: "og:title", content: "BookMyQ | Choose Booking Method" },
      { property: "og:description", content: "Choose your preferred journey: browse services yourself or book with our AI Concierge." },
    ],
  }),
  component: BookingMethod,
});

function BookingMethod() {
  const branch = useSelectedBranch();

  return (
    <PortalShell
      eyebrow={branch ? `Lumina Wellness Spa · ${branch.name}` : "Lumina Wellness Spa"}
      title="How would you like to book?"
      subtitle="Choose your preferred journey to find the right service for you."
    >
      <section className="card-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-sm rounded-xl border border-outline-variant bg-surface-container-low p-md sm:flex sm:justify-between">
        <div className="flex min-w-0 items-start gap-sm">
          <span className="material-symbols-outlined shrink-0 text-secondary">where_to_vote</span>
          <div className="min-w-0">
            <p className="font-label-md text-label-md text-primary">
              {branch ? `You're checked in at ${branch.name}` : "No branch selected yet"}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {branch
                ? `${branch.waitTime} current wait · next slot ${branch.nextSlot}`
                : "Pick the location you're visiting to see accurate wait times."}
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="shrink-0 whitespace-nowrap rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2 font-label-md text-primary hover:bg-surface-container"
        >
          Change location
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <Link
          to="/services"
          className="group flex flex-col text-left card-surface bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:bg-surface-container"
        >
          <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-md group-hover:bg-primary transition-colors">
            <span className="material-symbols-outlined text-[24px] text-primary group-hover:text-on-primary">
              dashboard_customize
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-sm">Browse Services</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-md">
            Explore categories and staff at your own pace. Perfect if you know exactly what you need or want to
            discover our full range.
          </p>
          <div className="mt-auto flex items-center font-label-md text-label-md text-primary font-bold">
            Start Browsing
            <span className="material-symbols-outlined ml-xs text-[18px]">arrow_forward</span>
          </div>
        </Link>
        <Link
          to="/concierge"
          className="group flex flex-col text-left card-surface bg-primary-container border border-primary rounded-xl p-md hover:opacity-95"
        >
          <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center mb-md">
            <span
              className="material-symbols-outlined text-[24px] text-on-secondary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              smart_toy
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-primary-container mb-sm">Book with AI</h2>
          <p className="font-body-md text-body-md text-on-primary-container mb-md">
            Let our AI Concierge find the perfect slot and professional for you. Just tell us what you're looking
            for in plain English.
          </p>
          <div className="mt-auto flex items-center font-label-md text-label-md text-on-primary-container font-bold">
            Open AI Concierge
            <span className="material-symbols-outlined ml-xs text-[18px]">bolt</span>
          </div>
        </Link>
      </div>
      <div className="mt-md flex items-center gap-md">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Wellness consultant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcr9qmhGOcUxAHpTf6hXWjXmx11OqdBUFz_MupgSOqQMNQidE51OsAOF8Tx5P_VmwCk95725wSY3pwwh9M59_wN2oCSG0AqI5vrAAYWYm61ZUuSD6n7rxdtMhcbT-T_eOXdllA8eUFjYpaCSa00dZ46oADSGF5lq34w2HbA8ODae7e5egtq33QTLh85KUFj0j1vupt8fGQOrabD0zzaT35VqCfelcq-pE8jEGDll-__UVJIUf-votgEyI3xruE6BOSUPdPFsxX8tLy"
            />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Stylist"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUiD73qEen3byaFQW7NmTDK6PP5ZRqTy5MrEgZROtC3QlWsMT11EnSSUoSG2cmMSXtn4_IFAlehL9dlLSGYHNQZARZWMKVkKsIKMwb43D8WK1_TL71X7KcANsHg5f8S70-X2ztAudvfGy0zvtq6LMtKN0LSTza2kvT4mE1QAgQZywi6Tyj9yBMYovq_JhrU7rNdmNJuQiEU2DeDLg8y2bFYpqAOinWXI486CbY7YWL3XpJQmSU5n22hXR7rOSNeY_thBBoBgFFzquo"
            />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="Therapist"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajiKLREEY_YC7Q9pOttAe860MV6ia0Qih2akWTaWkpZodcITbox3XDQsGvSPm8BGQU0JhKfz8iVIOAK7g5TT7BqEPjGOnhlxyn0j-zX3QrypOvG32EMiAg5bszNchsHG7Iz_emsDaeoS4N2NON8pUzX15sjU_lw694oZC8bckHHjAPOKp9bdXHkjVyOQrM0ocBFH-D5NZBPodaPsjOZVYrii7n-pX0CEExdnij8GQFQ7_728YR1v8hDb-OVj_7gN64ZPMKzvbwEEQ"
            />
          </div>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Over 1,200 slots available today across all specialists
        </p>
      </div>
    </PortalShell>
  );
}
