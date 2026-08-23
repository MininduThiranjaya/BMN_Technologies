import { Award, Handshake, Search, Smile, Leaf, Target, Sparkles } from "lucide-react";
import { S, scrollToSection, SectionLabel } from "../utils/utils";

// ABOUT SECTION

export function AboutUs() {
  const values = [
    { icon: Award, title: "Quality", desc: "We use only certified, Tier-1 products and maintain the highest installation standards." },
    { icon: Handshake, title: "Reliability", desc: "We stand behind every system we install — with responsive support for the lifetime of your installation." },
    { icon: Search, title: "Transparency", desc: "Clear pricing, honest assessments, and no hidden costs. You know exactly what you are getting." },
    { icon: Smile, title: "Customer Satisfaction", desc: "Your satisfaction is our measure of success. We do not close a job until you are fully satisfied." },
    { icon: Leaf, title: "Sustainability", desc: "Every system we install reduces carbon emissions and helps build a cleaner future for our communities." },
  ];
  return (
    <div className={`py-24 ${S.ground}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex flex-col gap-6">
            <SectionLabel label="About BMN-Technology" />
            <h1 className={`text-5xl lg:text-6xl font-black ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>
              Who <span className="text-(--accent)">We Are</span>
            </h1>
            <p className={`${S.textSec} leading-relaxed text-lg`} style={{ fontFamily: "Inter, sans-serif" }}>
              BMN-Technology is a solar energy company specializing in the design, supply, and installation of on-grid, off-grid, and hybrid solar systems for residential, commercial, and industrial customers.
            </p>
            <p className={`${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>
              We combine technical expertise with genuine commitment to customer satisfaction. Our experienced team has completed hundreds of installations across the country, from small rooftop systems for family homes to large commercial arrays for businesses and institutions.
            </p>
            <p className={`${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>
              We serve customers in Jaffna, Colombo, Kandy, Mannar, Trincomalee, Vavuniya, and across the island — bringing reliable, affordable solar energy to every corner of the country.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-(--border) accent-glow-box">
              <img src="https://images.unsplash.com/photo-1629726797843-618688139f5a?w=700&h=500&fit=crop&auto=format" alt="BMN-Technology solar installation team" className="w-full h-96 object-cover" />
            </div>
            <div className={`absolute -bottom-6 -right-6 ${S.surface} border ${S.border} rounded-2xl p-5 hidden lg:block`}>
              <div className="text-3xl font-black text-(--accent)" style={{ fontFamily: "Outfit, sans-serif" }}>500+</div>
              <div className={`text-xs ${S.textSec} mt-1`} style={{ fontFamily: "Inter, sans-serif" }}>Projects Completed</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div className={`${S.surface} border ${S.border} rounded-2xl p-8 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-1 h-full accent-gradient" />
            <div className="pl-5">
              <Target size={30} className="text-(--accent) mb-4" />
              <h2 className={`text-2xl font-black ${S.text} mb-4`} style={{ fontFamily: "Outfit, sans-serif" }}>Our Mission</h2>
              <p className={`${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>
                To make reliable, high-quality solar energy accessible to every home, business, and community — reducing electricity costs, empowering energy independence, and contributing to a sustainable future for Sri Lanka.
              </p>
            </div>
          </div>
          <div className={`${S.surface} border ${S.border} rounded-2xl p-8 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-emerald-400 to-teal-500" />
            <div className="pl-5">
              <Sparkles size={30} className="text-emerald-500 mb-4" />
              <h2 className={`text-2xl font-black ${S.text} mb-4`} style={{ fontFamily: "Outfit, sans-serif" }}>Our Vision</h2>
              <p className={`${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>
                To be the most trusted solar energy company in Sri Lanka — known for quality installations, honest service, and long-term partnerships with our customers as we move together toward a clean, renewable energy future.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <SectionLabel label="What Drives Us" />
            <h2 className={`text-4xl font-black ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>
              Our <span className="text-(--accent)">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div key={v.title} className={`${S.surface} border ${S.border} rounded-2xl p-6 text-center hover:border-(--accent) transition-all`}>
                <v.icon size={30} className="text-(--accent) mb-4 mx-auto" />
                <h3 className={`font-bold ${S.text} mb-2`} style={{ fontFamily: "Outfit, sans-serif" }}>{v.title}</h3>
                <p className={`text-xs ${S.textSec} leading-relaxed`} style={{ fontFamily: "Inter, sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${S.ground2} border ${S.border} rounded-2xl p-10 text-center`}>
          <h3 className={`text-3xl font-black ${S.text} mb-4`} style={{ fontFamily: "Outfit, sans-serif" }}>Work With Us</h3>
          <p className={`${S.textSec} mb-8 max-w-xl mx-auto`} style={{ fontFamily: "Inter, sans-serif" }}>Have a project in mind? Let us arrange a free consultation and site assessment for you.</p>
          <button
  onClick={() => scrollToSection("contact")}
  className="accent-gradient text-(--accent-fg) font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
  style={{ fontFamily: "Outfit, sans-serif", boxShadow: "0 8px 30px var(--accent-glow)" }}
>
  Get a Free Quote
  <svg width="18" height="18" fill="none" stroke="var(--border-strong)" strokeWidth="2">
    <path d="M4 9h10M10 5l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</button>
        </div>
      </div>
    </div>
  );
}