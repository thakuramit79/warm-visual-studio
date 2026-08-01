import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Booking Confirmed | BookMyQ" },
      {
        name: "description",
        content: "Your BookMyQ booking is confirmed. View your receipt, QR ticket, and next steps.",
      },
      { property: "og:title", content: "Booking Confirmed | BookMyQ" },
      {
        property: "og:description",
        content: "Your BookMyQ booking is confirmed. View your receipt, QR ticket, and next steps.",
      },
    ],
  }),
  component: Confirmation,
});

interface Piece {
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  gravity: number;
  opacity: number;
}

function Confirmation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let pieces: Piece[] = [];
    const colors = ["#00696f", "#006e74", "#8deff8", "#00172b"];
    let raf = 0;

    function setupCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function makePiece(): Piece {
      return {
        x: canvas!.width / 2,
        y: canvas!.height / 2,
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 10 + 5,
        angle: Math.random() * Math.PI * 2,
        gravity: 0.2,
        opacity: 1,
      };
    }

    function updatePiece(p: Piece) {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed + p.gravity;
      p.speed *= 0.98;
      p.gravity += 0.1;
      p.rotation += 10;
      p.opacity -= 0.01;
    }

    function drawPiece(p: Piece) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces = pieces.filter((p) => p.opacity > 0);
      pieces.forEach((p) => {
        updatePiece(p);
        drawPiece(p);
      });
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", setupCanvas);
    setupCanvas();
    for (let i = 0; i < 50; i++) pieces.push(makePiece());
    animate();

    const burst = () => {
      for (let i = 0; i < 30; i++) pieces.push(makePiece());
    };
    const h1 = h1Ref.current;
    h1?.addEventListener("click", burst);

    return () => {
      window.removeEventListener("resize", setupCanvas);
      h1?.removeEventListener("click", burst);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container">
      <style>{`
        .check-draw { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
      `}</style>
      <main className="min-h-screen flex flex-col items-center justify-start pt-xl pb-xl px-md relative overflow-hidden">
        <div className="mb-md flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative w-32 h-32 flex items-center justify-center bg-secondary-container rounded-full mb-base">
            <svg className="w-20 h-20 text-on-secondary-container" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
              <path className="check-draw" d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <div className="absolute inset-0 rounded-full animate-ping bg-secondary-container opacity-20"></div>
          </div>
          <h1 ref={h1Ref} className="font-display-lg text-display-lg text-center text-primary mb-xs cursor-pointer">
            Your booking is confirmed!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-lg">
            We've sent the details to your email and WhatsApp.
          </p>
        </div>
        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-12 gap-base mt-lg animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl shadow-[0px_12px_32px_rgba(11,44,71,0.08)] overflow-hidden border border-surface-variant flex flex-col">
            <div className="p-md border-b border-dashed border-outline-variant relative">
              <div className="flex justify-between items-start mb-base">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-xs block">Service Details</span>
                  <h2 className="font-headline-md text-headline-md text-primary">Premium Spa &amp; Wellness</h2>
                </div>
                <div className="bg-secondary-container/30 px-sm py-xs rounded-full">
                  <span className="font-label-sm text-label-sm text-on-secondary-container font-bold">#BMQ-98210</span>
                </div>
              </div>
              <div className="space-y-sm">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">calendar_today</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline">Date &amp; Time</p>
                    <p className="font-body-md text-body-md font-bold">Friday, Oct 24 • 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">person_pin</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline">Professional</p>
                    <p className="font-body-md text-body-md font-bold">Sarah Jenkins</p>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline">Location</p>
                    <p className="font-body-md text-body-md font-bold">Elite Branch, Downtown HQ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-md bg-surface-container-low flex justify-between items-center">
              <div>
                <p className="font-label-sm text-label-sm text-outline">Total Paid</p>
                <p className="font-headline-md text-headline-md text-primary">$120.00</p>
              </div>
              <div className="text-right">
                <p className="font-label-sm text-label-sm text-outline">Status</p>
                <p className="font-label-md text-label-md text-secondary font-bold">SECURED</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 bg-primary text-on-primary rounded-xl shadow-[0px_12px_32px_rgba(11,44,71,0.12)] p-md flex flex-col items-center justify-center text-center">
            <div className="bg-white p-base rounded-lg mb-base w-full max-w-[160px] aspect-square flex items-center justify-center">
              <img
                className="w-full h-full object-contain"
                alt="A clean, minimalist QR code centered on a white background."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlzx_RAiH3N3qSD4CPOoIEo6zGKSInD0cUAI4bt5Wtmh9qajghHqkdD01Y9LcLodZw65tBnW37kfKNnUDX-VlndjvVTl412XnKQEuCk6IsXGohAPFoDbU2C_qePC_IpXUdACwess9ddwD4Wj2NUEavZLtfYQqjmfEyEFwxySiYr_ovfPIh3ehZkpo0hWo2lSxriCvAXDfZgBrEy4h8Doi8WbsrdE6hApPt7CNTLppthFSLDtQrk79aN9v4SEJ3RFKv6IIpLeEo3nxy"
              />
            </div>
            <p className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest mb-xs">Digital Ticket</p>
            <p className="font-body-md text-body-md">Show this at the entrance</p>
          </div>
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-sm mt-base">
            <button className="flex items-center justify-center gap-sm bg-surface-container-lowest hover:bg-surface-container border border-outline-variant py-sm rounded-xl transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">event</span>
              <span className="font-label-md text-label-md text-primary">Add to Calendar</span>
            </button>
            <button className="flex items-center justify-center gap-sm bg-surface-container-lowest hover:bg-surface-container border border-outline-variant py-sm rounded-xl transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">chat</span>
              <span className="font-label-md text-label-md text-primary">WhatsApp Confirmation</span>
            </button>
            <button className="flex items-center justify-center gap-sm bg-surface-container-lowest hover:bg-surface-container border border-outline-variant py-sm rounded-xl transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">directions</span>
              <span className="font-label-md text-label-md text-primary">Get Directions</span>
            </button>
          </div>
          <div className="md:col-span-12 mt-lg bg-gradient-to-r from-secondary to-on-secondary-container rounded-2xl p-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[120px]">loyalty</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-md">
              <div className="max-w-md">
                <h3 className="font-headline-md text-headline-md text-on-primary mb-xs">Save more on every visit</h3>
                <p className="font-body-md text-body-md text-secondary-fixed/90">
                  Join Membership for 20% off next time and unlock priority booking for all services.
                </p>
              </div>
              <button className="bg-secondary-container text-on-secondary-container px-lg py-sm rounded-full font-label-md text-label-md font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0">
                Join Membership
              </button>
            </div>
          </div>
        </div>
        <div className="mt-xl flex gap-lg opacity-60">
          <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Booking Policy</a>
          <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Manage Booking</a>
          <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full p-md bg-gradient-to-t from-background via-background/90 to-transparent flex justify-center md:hidden">
        <Link
          to="/"
          className="w-full max-w-sm bg-primary text-on-primary py-md rounded-full font-label-md text-label-md font-bold shadow-2xl flex items-center justify-center gap-sm"
        >
          <span className="material-symbols-outlined">home</span>
          Go to Home
        </Link>
      </footer>
      <canvas ref={canvasRef} className="confetti-canvas" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 100 }} />
      <header className="bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md shadow-sm shadow-[0px_4px_20px_rgba(11,44,71,0.05)] flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto fixed top-0 left-0 right-0 z-50">
        <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BookMyQ</div>
        <nav className="hidden md:flex gap-lg items-center">
          <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/">Home</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/services">Services</Link>
          <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary font-bold pb-1 font-label-md text-label-md" to="/bookings">Bookings</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant font-medium font-label-md text-label-md hover:text-primary transition-colors" to="/offers">Offers</Link>
        </nav>
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt="A close-up portrait of a professional business owner."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK5j_T6Dds1dDFKsd9ASdCs2Kv-Yl_U2Btx9tJTyiq10nNINou-G6e0i2MXj7gFyuCDbShE4_i_2DEfDn6WbRcKtqoN5EZ7LScET_UEYgWIXxBStbjfr1aQ9ksMola_vZGI4l6gLjf4NwQc6h2-AP5fFWSf1ADLvlLmhvlB_lum5ao-NX0TX1bxcbSuSe3nLwni6kPQvm8B1MxGImXhKNDmLJNTgXvV_fNljX7OaFFw6Le3CppRMSGht7HsBXgv-qIp9UF2xPOro-t"
            />
          </div>
        </div>
      </header>
    </div>
  );
}
