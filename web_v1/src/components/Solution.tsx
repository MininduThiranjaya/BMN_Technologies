import { Zap, Mountain, RefreshCw, type LucideIcon } from "lucide-react";
import { S, scrollToSection, SectionLabel } from "../utils/utils";

// SOLUTIONS SECTION

function SolutionCard({ title, icon: Icon, color, overview, howItWorks, benefits, suitableFor, ctaLabel }: {
  title: string; icon: LucideIcon; color: string; overview: string; howItWorks: string; benefits: string[]; suitableFor: string[]; ctaLabel: string;
}) {
  return (
    <div className={`${S.surface} border ${S.border} rounded-2xl overflow-hidden`}>
      <div className={`h-1.5 ${color}`} />
      <div className="p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-glow)", border: "1px solid var(--accent)" }}
              >
                <Icon size={28} color="var(--accent)" strokeWidth={2} />
              </div>
              <div>
                <h2 className={`text-3xl font-black ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h2>
              </div>
            </div>
            <div>
              <h3 className={`text-sm font-semibold tracking-widest uppercase text-(--accent) mb-3`} style={{ fontFamily: "Inter, sans-serif" }}>Overview</h3>
              <p className={`${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>{overview}</p>
            </div>
            <div>
              <h3 className={`text-sm font-semibold tracking-widest uppercase text-(--accent) mb-3`} style={{ fontFamily: "Inter, sans-serif" }}>How It Works</h3>
              <p className={`${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>{howItWorks}</p>
            </div>
            <button onClick={() => scrollToSection("contact")}
              className="accent-gradient text-(--accent-fg) font-semibold px-7 py-3.5 rounded-lg hover:opacity-90 transition-all w-fit text-sm"
              style={{ fontFamily: "Inter, sans-serif", boxShadow: "0 6px 20px var(--accent-glow)" }}>
              {ctaLabel} →
            </button>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className={`text-sm font-semibold tracking-widest uppercase text-(--accent) mb-4`} style={{ fontFamily: "Inter, sans-serif" }}>Benefits</h3>
              <ul className="flex flex-col gap-3">
                {benefits.map((b) => (
                  <li key={b} className={`flex items-start gap-3 text-sm ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--accent-glow)", border: "1px solid var(--accent)" }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-semibold tracking-widest uppercase text-(--accent) mb-4`} style={{ fontFamily: "Inter, sans-serif" }}>Suitable For</h3>
              <div className="flex flex-wrap gap-2">
                {suitableFor.map((s) => (
                  <span key={s} className={`border ${S.border} ${S.surface2} text-xs px-3 py-1.5 rounded-full ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Solution (root export) ────────────────────────────────────────────────────
export function Solution() {
  return (
    <div className={`py-24 ${S.ground}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionLabel label="Solar Solutions" />
          <h1 className={`text-5xl lg:text-6xl font-black ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>
            Find the Right <span className="text-(--accent)">System</span> for You
          </h1>
          <p className={`mt-5 ${S.textSec} max-w-2xl mx-auto text-lg`} style={{ fontFamily: "Inter, sans-serif" }}>
            We offer three types of solar systems — each designed for a specific situation. Let us help you choose the one that fits your needs and budget.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <SolutionCard
            title="On-Grid Solar"
            icon={Zap}
            color="accent-gradient"
            overview="An on-grid (grid-tied) solar system is connected to the national electricity grid. Your solar panels generate electricity during daylight hours, which powers your home or business directly. Any excess energy is exported to the grid — and you receive a credit on your bill."
            howItWorks="Solar panels → DC electricity → Inverter converts to AC → Powers your loads → Excess exported to grid. At night or on cloudy days, you draw power from the grid as usual."
            benefits={["Dramatically reduce your electricity bill", "Generate your own clean electricity", "Feed excess energy to the grid for credit", "Lowest cost system — no battery required", "Simple and reliable technology", "Long-term energy cost savings"]}
            suitableFor={["Homes", "Businesses", "Schools", "Commercial buildings", "Any location with reliable grid supply"]}
            ctaLabel="Get an On-Grid Solar Quote"
          />
          <SolutionCard
            title="Off-Grid Solar"
            icon={Mountain}
            color="bg-gradient-to-r from-amber-500 to-orange-400"
            overview="An off-grid solar system operates completely independently from the national grid. It generates and stores solar energy in batteries, providing power 24/7 regardless of whether the sun is shining — or whether there is a grid at all."
            howItWorks="Solar panels → Charge controller → Batteries store energy → Inverter converts to AC → Powers your loads. The system automatically manages battery charging and discharging to ensure continuous power."
            benefits={["Complete energy independence", "Battery backup for round-the-clock power", "Ideal for locations with no grid or unreliable supply", "Eliminate grid electricity costs entirely", "Protection from power cuts and blackouts", "Scalable battery capacity to match your needs"]}
            suitableFor={["Remote locations", "Homes", "Farms", "Resorts", "Backup power applications", "Areas with frequent outages"]}
            ctaLabel="Get an Off-Grid Solar Quote"
          />
          <SolutionCard
            title="Hybrid Solar"
            icon={RefreshCw}
            color="bg-gradient-to-r from-emerald-500 to-teal-400"
            overview="A hybrid solar system combines solar panels, a battery bank, and grid connection into one intelligent system. During the day, solar powers your loads and charges your battery. At night, the battery takes over. The grid acts as a backup when both solar and battery are depleted."
            howItWorks="Solar panels → Hybrid inverter (manages solar + battery + grid) → Battery stores excess solar → Powers loads at night → Grid backup only when needed. Smart energy management maximises self-consumption."
            benefits={["Lower electricity costs with maximum solar self-consumption", "Battery backup during grid outages", "Intelligent energy management system", "Grid independence during peak tariff hours", "Best of on-grid and off-grid in one system", "Future-proof — expand battery capacity over time"]}
            suitableFor={["Homes", "Businesses", "Hotels", "Hospitals", "Customers requiring backup power", "Anyone wanting maximum savings and reliability"]}
            ctaLabel="Get a Hybrid Solar Quote"
          />
        </div>
      </div>
    </div>
  );
}