import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PortalShell } from "@/components/portal-shell";

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
    <PortalShell title="AI Concierge" bare>
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-md py-md">
        <div className="flex min-h-0 flex-1 flex-col card-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-md py-sm">
            <div className="flex items-center gap-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-on-secondary">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface">Lumina Assistant</p>
                <p className="flex items-center gap-1 font-label-sm text-label-sm text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  AI is Online
                </p>
              </div>
            </div>
          </div>

          <div ref={chatRef} className="flex flex-1 flex-col gap-lg overflow-y-auto p-md">
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div key={m.id} className="flex max-w-[85%] items-start gap-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest">
                    <span className="material-symbols-outlined text-sm text-primary">smart_toy</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-surface-container p-md">
                    <p className="font-body-md text-body-md text-on-surface">{m.text}</p>
                    <p className="mt-xs text-[10px] text-outline">{m.time}</p>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex max-w-[85%] flex-row-reverse items-start gap-sm self-end">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="material-symbols-outlined text-sm text-on-primary">person</span>
                  </div>
                  <div className="rounded-2xl rounded-tr-none bg-primary p-md text-on-primary">
                    <p className="font-body-md text-body-md">{m.text}</p>
                    <p className="mt-xs text-right text-[10px] opacity-70">{m.time}</p>
                  </div>
                </div>
              ),
            )}

            <div className="flex max-w-[90%] items-start gap-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest">
                <span className="material-symbols-outlined text-sm text-primary">smart_toy</span>
              </div>
              <div className="flex w-full flex-col gap-sm">
                <div className="rounded-2xl rounded-tl-none bg-surface-container p-md">
                  <p className="font-body-md text-body-md text-on-surface">
                    Absolutely. We have several options available. Which service would you prefer?
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-sm">
                    <p className="font-label-md text-on-surface">Deep Tissue Massage</p>
                    <p className="text-label-sm text-on-surface-variant">60 mins • $120</p>
                    <button
                      className="mt-base w-full rounded-lg bg-secondary-container py-xs font-label-sm text-on-secondary-container hover:bg-secondary hover:text-on-secondary"
                      onClick={() => sendMessage("I'd like to book the Deep Tissue Massage")}
                    >
                      Select
                    </button>
                  </div>
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-sm">
                    <p className="font-label-md text-on-surface">Swedish Massage</p>
                    <p className="text-label-sm text-on-surface-variant">90 mins • $150</p>
                    <button
                      className="mt-base w-full rounded-lg bg-secondary-container py-xs font-label-sm text-on-secondary-container hover:bg-secondary hover:text-on-secondary"
                      onClick={() => sendMessage("I'd like to book the Swedish Massage")}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex max-w-[85%] items-start gap-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest">
                <span className="material-symbols-outlined text-sm text-primary">smart_toy</span>
              </div>
              <div className="flex w-full flex-col gap-sm">
                <div className="rounded-2xl rounded-tl-none bg-surface-container p-md">
                  <p className="font-body-md text-body-md text-on-surface">
                    Great choice! When would you like to come in? Here are available slots for Friday.
                  </p>
                </div>
                <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-md">
                  <div className="mb-base flex items-center justify-between">
                    <p className="font-label-md text-on-surface">Friday, Nov 24</p>
                    <button className="font-label-sm text-secondary">Change Date</button>
                  </div>
                  <SlotPicker onSelect={(slot) => sendMessage(`I'll take the ${slot} slot`)} />
                </div>
              </div>
            </div>

            {isTyping && (
              <div className="flex max-w-[85%] items-start gap-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest">
                  <span className="material-symbols-outlined text-sm text-primary">smart_toy</span>
                </div>
                <div className="rounded-2xl rounded-tl-none bg-surface-container p-md">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-outline-variant" />
                    <span className="h-2 w-2 rounded-full bg-outline-variant" />
                    <span className="h-2 w-2 rounded-full bg-outline-variant" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-outline-variant bg-surface-container-lowest p-md">
            <div className="mb-md flex gap-sm overflow-x-auto pb-xs">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="shrink-0 rounded-full border border-outline-variant bg-surface-container-lowest px-md py-1.5 font-label-md text-on-surface-variant hover:border-secondary hover:text-secondary"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-sm rounded-full border border-outline-variant bg-surface-container-lowest px-md py-2">
              <input
                className="flex-1 border-none bg-transparent font-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-0"
                placeholder="Type a message..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
              />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary hover:bg-primary-container"
                onClick={() => sendMessage(input)}
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
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
            className="cursor-not-allowed rounded-lg border border-outline-variant bg-surface-container-low py-sm font-label-md text-outline-variant"
            disabled
          >
            {slot}
          </button>
        ) : (
          <button
            key={slot}
            className={
              selected === slot
                ? "rounded-lg bg-primary py-sm font-label-md text-on-primary"
                : "rounded-lg border border-secondary py-sm font-label-md text-secondary hover:bg-secondary hover:text-on-secondary"
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
