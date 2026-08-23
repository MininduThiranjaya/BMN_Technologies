import { useState, useEffect } from "react";
import { S, scrollToSection, ThemeToggle } from "../utils/utils";

// NAVBAR

export function Navbar({
  dark,
  toggleDark,
  activeSection,
  onShareExperience,
}: {
  dark: boolean;
  toggleDark: () => void;
  activeSection: string;
  onShareExperience?: (flag: number) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const shareExperience = (flag: number) => {
    setMenuOpen(false);
    if (onShareExperience) onShareExperience(flag);
    else scrollToSection("home");
  };

  const links = [
    { label: "Home", id: "home" },
    { label: "Solutions", id: "solutions" },
    { label: "Services", id: "services" },
    { label: "Showcase", id: "showcase" },
    { label: "About Us", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl border-b ${S.border} ${scrolled ? "shadow-lg" : ""}`}
      style={{ backgroundColor: "var(--nav-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between py-4">
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3"
        >
          <span
            className="font-black text-xl tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            BMN<span className="text-(--accent)">-</span>Technology
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`text-sm font-medium transition-colors hover:text-(--accent) ${activeSection === l.id ? "text-(--accent)" : ""}`}
              style={{
                fontFamily: "Inter, sans-serif",
                color:
                  activeSection === l.id ? "var(--accent)" : "var(--nav-text)",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle dark={dark} toggle={toggleDark} />
          <button
            onClick={() => shareExperience(0)}
            className="border border-(--accent) text-(--accent) text-sm font-semibold px-4 py-2 rounded-lg hover:bg-(--accent-glow) transition-all whitespace-nowrap"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Share Your Experience
          </button>
          <button
            onClick={() => navigate("contact")}
            className="accent-gradient text-(--accent-fg) text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Get a Free Quote
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle dark={dark} toggle={toggleDark} />
          <button
            className={`${S.textSec} hover:text-(--accent) transition-colors`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`lg:hidden border-t ${S.border} ${S.surface} px-6 py-5 flex flex-col gap-4`}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`text-left text-base py-0.5 transition-colors ${activeSection === l.id ? "text-(--accent)" : "hover:text-(--accent)"}`}
              style={{
                color:
                  activeSection === l.id ? "var(--accent)" : "var(--nav-text)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {l.label}
            </button>
          ))}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={() => shareExperience(0)}
              className="border border-(--accent) text-(--accent) font-semibold px-5 py-2.5 rounded-lg text-sm w-fit"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Share Your Experience
            </button>
            <button
              onClick={() => navigate("contact")}
              className="accent-gradient text-(--accent-fg) font-semibold px-5 py-2.5 rounded-lg text-sm w-fit"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
