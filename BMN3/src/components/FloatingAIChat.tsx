import { useState, useEffect, useRef } from "react";
import { S } from "../utils/utils";
import { SendHorizontal } from "lucide-react";

// FLOATING AI CHAT

const CHAT_RESPONSES: Record<string, string> = {
  default:
    "Hi! I am the BMN-Technology solar assistant. I can help you understand our solutions, estimate costs, or answer questions about solar energy. What would you like to know?",
  cost: "The cost of a solar system depends on your energy consumption, roof size, and system type. A typical 5kW residential system starts around Rs. 1.2–1.5 million. We offer a free site assessment to give you an exact quote!",
  ongrid:
    "An on-grid system connects to the national grid. Your solar panels generate electricity during the day, reducing your bill. Excess power is exported to the grid. No batteries needed — it is the most affordable option!",
  offgrid:
    "An off-grid system runs completely independently from the grid. It uses battery storage to power your home at night too. It is ideal for remote locations or areas with frequent power cuts.",
  hybrid:
    "A hybrid system gives you the best of both — solar panels, battery backup, and grid connection. You save money, stay powered during outages, and have maximum flexibility. Most popular for homes and businesses.",
  quote:
    "To get a free quote, just scroll down to our Contact section. Fill in your details and our team will get back to you within 1 business day!",
  savings:
    "Most customers reduce their electricity bill by 60–80% after going solar. With today's electricity prices, a well-designed system typically pays for itself in 5–7 years — and lasts 25+ years!",
};

export function FloatingAIChat() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 300, y: 500 });

  useEffect(() => {
    const clamp = () =>
      setPos({ x: window.innerWidth - 88, y: window.innerHeight - 88 });
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, []);

  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ mx: 0, my: 0, bx: 0, by: 0 });
  const [messages, setMessages] = useState([
    { role: "ai", text: CHAT_RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (open) return;
    moved.current = false;
    setDragging(true);
    setDragStart({ mx: e.clientX, my: e.clientY, bx: pos.x, by: pos.y });
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (open) return;
    moved.current = false;
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ mx: t.clientX, my: t.clientY, bx: pos.x, by: pos.y });
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (clientX: number, clientY: number) => {
      const dx = clientX - dragStart.mx;
      const dy = clientY - dragStart.my;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 64, dragStart.bx + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 64, dragStart.by + dy)),
      });
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    };
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, dragStart]);

  const sendMessage = () => {
    const txt = input.trim();
    if (!txt) return;
    setMessages((m) => [...m, { role: "user", text: txt }]);
    setInput("");
    const lower = txt.toLowerCase();
    let reply = CHAT_RESPONSES.default;
    if (
      lower.includes("cost") ||
      lower.includes("price") ||
      lower.includes("much")
    )
      reply = CHAT_RESPONSES.cost;
    else if (
      lower.includes("on-grid") ||
      lower.includes("ongrid") ||
      lower.includes("grid tied")
    )
      reply = CHAT_RESPONSES.ongrid;
    else if (
      lower.includes("off-grid") ||
      lower.includes("offgrid") ||
      lower.includes("remote")
    )
      reply = CHAT_RESPONSES.offgrid;
    else if (lower.includes("hybrid")) reply = CHAT_RESPONSES.hybrid;
    else if (
      lower.includes("quote") ||
      lower.includes("contact") ||
      lower.includes("assess")
    )
      reply = CHAT_RESPONSES.quote;
    else if (
      lower.includes("saving") ||
      lower.includes("bill") ||
      lower.includes("payback") ||
      lower.includes("roi")
    )
      reply = CHAT_RESPONSES.savings;
    setTimeout(
      () => setMessages((m) => [...m, { role: "ai", text: reply }]),
      600,
    );
  };

  const suggestions = [
    "How much does solar cost?",
    "What is a hybrid system?",
    "How do I get a quote?",
    "How much will I save?",
  ];

  return (
    <>
      {!open && (
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onClick={() => {
            if (!moved.current) setOpen((o) => !o);
          }}
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            zIndex: 9999,
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
          }}
          className="w-14 h-14 accent-gradient rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke="var(--accent-fg)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="10" r="1" fill="var(--accent-fg)" />
            <circle cx="12" cy="10" r="1" fill="var(--accent-fg)" />
            <circle cx="15" cy="10" r="1" fill="var(--accent-fg)" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
        </div>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: Math.max(20, window.innerHeight - pos.y - 64),
            right: Math.max(20, window.innerWidth - pos.x - 64),
            zIndex: 9998,
            width: "min(360px, calc(100vw - 32px))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
          className={`${S.surface} border ${S.border} rounded-2xl flex flex-col overflow-hidden`}
        >
          <div className="accent-gradient px-5 py-4 flex items-center gap-3 relative">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="var(--accent-fg)" />
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
                  stroke="var(--accent-fg)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div
                className="font-bold text-sm text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                BMN Solar Assistant
              </div>
              <div
                className="text-xs text-white/70 flex items-center gap-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-300 inline-block" />
                Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-72">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "accent-gradient text-(--accent-fg) rounded-br-sm"
                      : `${S.surface2} border ${S.border} ${S.text} rounded-bl-sm`
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setMessages((m) => [...m, { role: "user", text: s }]);
                    const lower = s.toLowerCase();
                    let r = CHAT_RESPONSES.default;
                    if (lower.includes("cost")) r = CHAT_RESPONSES.cost;
                    else if (lower.includes("hybrid"))
                      r = CHAT_RESPONSES.hybrid;
                    else if (lower.includes("quote")) r = CHAT_RESPONSES.quote;
                    else if (lower.includes("save")) r = CHAT_RESPONSES.savings;
                    setTimeout(
                      () => setMessages((m) => [...m, { role: "ai", text: r }]),
                      600,
                    );
                  }}
                  className={`text-xs border ${S.border} ${S.surface2} ${S.textSec} px-3 py-1.5 rounded-full hover:border-(--accent) hover:text-(--accent) transition-all`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className={`border-t ${S.border} p-3 flex gap-2`}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about solar..."
              className={`flex-1 ${S.surface2} border ${S.border} rounded-xl px-4 py-2.5 text-sm ${S.text} placeholder-(--text-muted) focus:outline-none focus:border-(--accent)`}
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
            >
              <SendHorizontal
                size={16}
                color="var(--accent-fg)"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}