export type Branch = {
  id: string;
  name: string;
  addressLines: string[];
  distance: string;
  waitTime: string;
  waitHighlight: boolean;
  nextSlot: string;
  hours: string;
  image: string;
  badge?: { icon: string; label: string };
};

export const branches: Branch[] = [
  {
    id: "downtown",
    name: "Downtown Branch",
    addressLines: ["124 Urban Plaza, Suite 400", "Central Business District"],
    distance: "0.8 miles",
    waitTime: "15 mins",
    waitHighlight: true,
    nextSlot: "10:30 AM",
    hours: "Mon–Sun · 08:00 AM – 10:00 PM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI0NtZXPpHnEFFBIZQJMpiYZTtP3SStE0Wa-V9YcFwAny7RVjb67GGb_Dg0qMGX_5oCcgMaV7Sx6pAH7xjKvy7YrqWmmk-texeraFiMq-XDUPS03wnUFlR1dDXuIZEnt6V6McV4RcEEQZFHUM1cV9navH12eMv-sDe2ep3QMFBBWA6JjCwxrBpKeBHjDd8IiYHwGzA4wVhGwpvORFuzbTG-A6J-013NieVu1zX3lmcLvhD9oTE83uDmffqIXIul3FbsP3pkSc5hagr",
    badge: { icon: "auto_awesome", label: "Shortest Wait" },
  },
  {
    id: "riverside",
    name: "Riverside",
    addressLines: ["45 Waterfront Drive", "River North District"],
    distance: "0.2 miles",
    waitTime: "45 mins",
    waitHighlight: false,
    nextSlot: "11:15 AM",
    hours: "Mon–Sun · 09:00 AM – 09:00 PM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoaGJJ03epYztwYwuvEhuXvbcEXNy_K-AlnMobqCpC3MHYM31-5Xa-cu9nhr4aw8siqtUzxdOorwWED43bIoLk0nMBXR1TNxSvteR6si17FiIYEpaEMC6FigSzizdiUdjvQTAkzeBWz3KTpEuQPOe2URFrRUIMJlMya2jn1KxEX-Vd755Cwqs_7v2H4Vuri_ItQwgt9Z6UrFDNpAS1aMko5ELLAfBeLs9YAATB0bzf8J01dYmMuY-efoYNrUf4gyyn1CoUZJ7DF4zQ",
    badge: { icon: "location_on", label: "Nearest Branch" },
  },
  {
    id: "westend",
    name: "West End",
    addressLines: ["892 Kensington Way", "West End Heights"],
    distance: "2.4 miles",
    waitTime: "30 mins",
    waitHighlight: false,
    nextSlot: "10:45 AM",
    hours: "Mon–Sat · 08:30 AM – 08:00 PM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEt8OYSel90bAaVBUQLiUwGNzX8UNC1JQzYe4bht7vLWKLe0kxj1RywvYRF6pC1pw1wLwOBGs1khwNbA_B8ZJ1PoL2i6vgVmFRkrw8jEORkgjWn--fSSspJ2gMXfwOKCaegC-1dnra30jNvRQML1XirQq_TEpj7r-SEViCu07pnUJQf-0SEm1wsiljLijKeDI12PukHAIlc5UMg0caBPg_rCUH2pcX_S1wCbo3DJ_WYcxB_oSUz-yfhEKoqOBjOrPmaCCUQGUM6-tB",
  },
];

const STORAGE_KEY = "bookmyq.selected-branch";

export function setSelectedBranchId(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, id);
  window.dispatchEvent(new Event("bookmyq:branch-change"));
}

export function readSelectedBranchId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function getBranch(id: string | null): Branch | undefined {
  return branches.find((b) => b.id === id);
}
