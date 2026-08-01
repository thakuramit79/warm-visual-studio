import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: "AI Concierge | BookMyQ" },
      {
        name: "description",
        content: "Chat with the Lumina Assistant to book therapeutic sessions and get instant answers.",
      },
      { property: "og:title", content: "AI Concierge | BookMyQ" },
      {
        property: "og:description",
        content: "Chat with the Lumina Assistant to book therapeutic sessions and get instant answers.",
      },
    ],
  }),
  component: Concierge,
});

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  { id: 1, role: "assistant", text: "Hi! I'm your Lumina Assistant. How can I help you today?", time: "10:02 AM" },
  { id: 2, role: "user", text: "I'd like to book a therapeutic session for later this week.", time: "10:02 AM" },
];

const suggestedPrompts = [
  "Book a massage tomorrow",
  "Who is the best therapist?",
  "What are your opening hours?",
];

function Concierge() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "I'm processing that for you. One moment please!",
          time: "Just now",
        },
      ]);
    }, 1500);
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden min-h-screen">
      <header className="bg-surface/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-md lg:px-xl h-20 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-base">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">BookMyQ</h1>
          </div>
          <nav className="hidden md:flex gap-lg">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" to="/services">Services</Link>
            <Link className="font-label-md text-label-md text-primary border-b-2 border-primary font-bold pb-1" to="/concierge">AI Assistant</Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Bookings</a>
          </nav>
          <div className="flex items-center gap-md">
            <Link to="/notifications">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">notifications</span>
            </Link>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">account_circle</span>
          </div>
        </div>
      </header>
      <main className="pt-20 h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="container max-w-4xl h-[calc(100vh-140px)] mx-auto px-md md:px-lg z-10 flex flex-col">
          <div className="flex-1 glass-panel rounded-3xl shadow-[0px_12px_32px_rgba(11,44,71,0.08)] border border-surface-variant overflow-hidden flex flex-col">
            <div className="px-md py-base border-b border-surface-variant flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-tertiary-fixed-dim flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Lumina Assistant</p>
                  <p className="text-label-sm text-secondary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                    AI is Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">search</span>
                </button>
                <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                </button>
              </div>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto p-md space-y-lg flex flex-col" id="chat-messages">
              {messages.map((m) =>
                m.role === "assistant" ? (
                  <div key={m.id} className="flex items-start gap-sm max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                    </div>
                    <div className="bg-surface-container rounded-2xl rounded-tl-none p-md shadow-sm">
                      <p className="font-body-md text-body-md text-on-surface">{m.text}</p>
                      <p className="text-[10px] text-outline mt-xs">{m.time}</p>
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex items-start gap-sm max-w-[85%] self-end flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-white text-sm">person</span>
                    </div>
                    <div className="bg-primary text-white rounded-2xl rounded-tr-none p-md shadow-md">
                      <p className="font-body-md text-body-md">{m.text}</p>
                      <p className="text-[10px] opacity-70 mt-xs text-right">{m.time}</p>
                    </div>
                  </div>
                ),
              )}

              {/* Rich UI: Service Picker (static example content) */}
              <div className="flex items-start gap-sm max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="flex flex-col gap-sm w-full">
                  <div className="bg-surface-container rounded-2xl rounded-tl-none p-md shadow-sm">
                    <p className="font-body-md text-body-md text-on-surface">Absolutely. We have several options available. Which service would you prefer?</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                    <div className="bg-white border border-surface-variant p-sm rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                      <div
                        className="h-24 w-full rounded-lg mb-sm bg-cover bg-center overflow-hidden"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASPvaPZOeSMqQjhIwhBDjLoehzb6e-69scz2zGrnnhhrA5nlaOoQVqgXO8ARcthT8GOd6Bi4GyMYYjCQjgNQsd81EjWLvoyuxkv855qB_Njg6AFk1UbW2JWzukUjtdLIUqRbhP68ua1b2zatWUegW8lBaGBdwcNwnPOs1CBfSifdIUNtEhBmsTMtNYeU4Br2hLISY-Cubtjzc7p7-Uh376txriy6tno3uE_Zu2aZRCLCqMMvrjqXWCEbK3E_Zv-jJxfGAVF89nwMF-')",
                        }}
                      ></div>
                      <p className="font-label-md text-on-surface">Deep Tissue Massage</p>
                      <p className="text-label-sm text-on-surface-variant">60 mins • $120</p>
                      <button
                        className="mt-base w-full py-xs bg-secondary-container text-on-secondary-container rounded-lg font-label-sm group-hover:bg-secondary group-hover:text-white transition-colors"
                        onClick={() => sendMessage("I'd like to book the Deep Tissue Massage")}
                      >
                        Select
                      </button>
                    </div>
                    <div className="bg-white border border-surface-variant p-sm rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                      <div
                        className="h-24 w-full rounded-lg mb-sm bg-cover bg-center overflow-hidden"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBg46YzbtcLFyCEjol7AWpfNK-lpgv9qz76fnn2LcF95rxXXLw1ZR3b5ns7Zn5bXCaivYQeCziCuDy5gQdoigjBOnRX0MeeOsiQyhtX7c-i2lwQnXJeSaOgidSfRcrgGnBVVNvLPSbQ-7mlV8aapulJJL6LCAcrd7VeSN3H_342stm6znrmIqdBFvxhpSArXCs843JnF13wzm89tlhFs3aPmFK1hUkqRglwupWUTdSiZEGSiAb_UV6vFAZuN1t5wi0ZGIBkq7nPY8n')",
                        }}
                      ></div>
                      <p className="font-label-md text-on-surface">Swedish Massage</p>
                      <p className="text-label-sm text-on-surface-variant">90 mins • $150</p>
                      <button
                        className="mt-base w-full py-xs bg-secondary-container text-on-secondary-container rounded-lg font-label-sm group-hover:bg-secondary group-hover:text-white transition-colors"
                        onClick={() => sendMessage("I'd like to book the Swedish Massage")}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rich UI: Slot Picker (static example content) */}
              <div className="flex items-start gap-sm max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="flex flex-col gap-sm w-full">
                  <div className="bg-surface-container rounded-2xl rounded-tl-none p-md shadow-sm">
                    <p className="font-body-md text-body-md text-on-surface">Great choice! When would you like to come in? Here are available slots for Friday.</p>
                  </div>
                  <div className="bg-white border border-surface-variant p-md rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-base">
                      <p className="font-label-md text-on-surface">Friday, Nov 24</p>
                      <button className="text-secondary font-label-sm">Change Date</button>
                    </div>
                    <SlotPicker onSelect={(slot) => sendMessage(`I'll take the ${slot} slot`)} />
                  </div>
                </div>
              </div>

              {isTyping && (
                <div className="flex items-start gap-sm max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  </div>
                  <div className="bg-surface-container rounded-2xl rounded-tl-none p-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-outline-variant rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-outline-variant rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                      <span className="w-2 h-2 bg-outline-variant rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-md border-t border-surface-variant bg-surface-container-lowest">
              <div className="flex gap-sm overflow-x-auto pb-md no-scrollbar">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="shrink-0 px-md py-1.5 rounded-full border border-surface-variant bg-white text-on-surface-variant font-label-md hover:border-secondary hover:text-secondary transition-all"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="chat-gradient-border rounded-full">
                <div className="bg-white rounded-full flex items-center px-md py-2 gap-sm">
                  <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
                    <span className="material-symbols-outlined">add_circle</span>
                  </button>
                  <input
                    className="flex-1 border-none focus:ring-0 font-body-md text-on-surface placeholder:text-outline-variant bg-transparent"
                    placeholder="Type a message..."
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage(input);
                    }}
                  />
                  <div className="flex items-center gap-base">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-secondary" title="Voice Interaction">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                    </button>
                    <button
                      className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                      onClick={() => sendMessage(input)}
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-center gap-xs fixed bottom-md right-md z-50">
            <p className="font-label-sm text-outline-variant uppercase tracking-widest bg-surface/80 px-2 rounded backdrop-blur-sm">Concierge Mode</p>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-tertiary-fixed-dim shadow-[0px_12px_32px_rgba(0,105,111,0.25)] flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform animate-float">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full px-md flex flex-col md:flex-row justify-between items-center gap-sm mt-xl py-md border-t border-surface-variant fixed bottom-0 bg-background z-40">
        <p className="font-label-sm text-label-sm text-outline">Powered by BookMyQ • Built for SMEs</p>
        <div className="flex gap-md">
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-outline hover:text-on-background transition-colors" href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}

function SlotPicker({ onSelect }: { onSelect: (slot: string) => void }) {
  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const disabled = "10:30";
  const [selected, setSelected] = useState("15:30");

  return (
    <div className="grid grid-cols-3 gap-xs">
      {slots.map((slot) =>
        slot === disabled ? (
          <button
            key={slot}
            className="py-sm border border-outline-variant text-outline-variant rounded-lg font-label-md cursor-not-allowed bg-surface-container-low"
            disabled
          >
            {slot}
          </button>
        ) : (
          <button
            key={slot}
            className={
              selected === slot
                ? "py-sm bg-primary text-white rounded-lg font-label-md shadow-md"
                : "py-sm border border-secondary text-secondary rounded-lg font-label-md hover:bg-secondary hover:text-white transition-colors"
            }
            onClick={() => {
              setSelected(slot);
              onSelect(slot);
            }}
          >
            {slot}
          </button>
        ),
      )}
    </div>
  );
}
