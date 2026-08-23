import { useState, useEffect } from "react";

// ── Dark mode ─────────────────────────────────────────────────────────────────
export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add("dark"); localStorage.setItem("theme", "dark"); }
    else { root.classList.remove("dark"); localStorage.setItem("theme", "light"); }
  }, [dark]);
  return [dark, setDark] as const;
}

// ── Style helpers ─────────────────────────────────────────────────────────────
export const S = {
  ground:       "bg-[var(--ground)]",
  ground2:      "bg-[var(--ground-2)]",
  surface:      "bg-[var(--surface)]",
  surface2:     "bg-[var(--surface-2)]",
  surface3:     "bg-[var(--surface-3)]",
  border:       "border-[var(--border)]",
  borderStrong: "border-[var(--border-strong)]",
  text:         "text-[var(--text-primary)]",
  textSec:      "text-[var(--text-secondary)]",
  textMuted:    "text-[var(--text-muted)]",
  accent:       "text-[var(--accent)]",
  accentBg:     "bg-[var(--accent)]",
  accentDim:    "bg-[var(--accent-dim)]",
};

// ── Smooth scroll helper ──────────────────────────────────────────────────────
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const navHeight = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// ── Section label helper ──────────────────────────────────────────────────────
export function SectionLabel({ label }: { label: string }) {
  return (
    <div>
      {/* <div className="section-line-horizontal" /> */}
      <p className="text-xs tracking-widest uppercase text-(--accent) mb-3" style={{ fontFamily: "Inter, sans-serif" }}>{label}</p>
    </div>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
export function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button onClick={toggle} aria-label="Toggle dark mode"
      className={`relative w-14 h-7 rounded-full border transition-all duration-300 flex items-center px-1 ${dark ? "bg-(--accent-dim) border-(--border-strong)" : "bg-(--surface-3) border-(--border)"}`}>
      <div className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-[10px] ${dark ? "translate-x-7 bg-(--accent)" : "translate-x-0 bg-white shadow-sm"}`}>
        {dark
          ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent-fg)" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
          : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" /></svg>
        }
      </div>
    </button>
  );
}
