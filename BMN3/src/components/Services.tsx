import {
  MessageSquare,
  Ruler,
  ClipboardList,
  Wrench,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { S, scrollToSection, SectionLabel } from "../utils/utils";

// SERVICES SECTION

export function Services() {
  const services: {
    num: string;
    title: string;
    icon: LucideIcon;
    desc: string;
    items: string[];
  }[] = [
    {
      num: "01",
      title: "Consultation",
      icon: MessageSquare,
      desc: "Our process begins with a thorough consultation to understand your situation and goals.",
      items: [
        "Understand your energy requirements and consumption patterns",
        "Analyze your electricity bills to identify savings potential",
        "Explain your system options — on-grid, off-grid, or hybrid",
        "Recommend the most suitable and cost-effective solution for your property",
      ],
    },
    {
      num: "02",
      title: "Site Assessment",
      icon: Ruler,
      desc: "A physical visit to your property to evaluate the technical feasibility of the installation.",
      items: [
        "Roof inspection — structure, orientation, condition, and shading",
        "Sun path and shading analysis to determine optimal panel placement",
        "Electrical panel and wiring assessment",
        "Measurement of available installation space",
        "Photography and documentation for system design",
      ],
    },
    {
      num: "03",
      title: "System Design",
      icon: ClipboardList,
      desc: "Based on the assessment, our engineers design a custom solar system tailored to your property.",
      items: [
        "Solar capacity calculation based on your consumption and roof area",
        "Panel selection — model, wattage, and quantity",
        "Inverter selection — string, micro, or hybrid inverter sizing",
        "Battery sizing (for hybrid or off-grid systems)",
        "Full system schematic and layout drawing",
        "Detailed cost proposal and ROI analysis",
      ],
    },
    {
      num: "04",
      title: "Installation",
      icon: Wrench,
      desc: "Professional installation by our certified technicians — clean, safe, and completed on schedule.",
      items: [
        "Mounting structure fabrication and installation",
        "Solar panel mounting and secure fastening",
        "Inverter installation and configuration",
        "All electrical connections and cable management",
        "Safety earthing and surge protection installation",
        "System testing and commissioning",
        "Grid connection and net-metering setup (for on-grid systems)",
      ],
    },
    {
      num: "05",
      title: "Maintenance & Support",
      icon: ShieldCheck,
      desc: "We stay with you long after installation — your system needs to perform for 25+ years.",
      items: [
        "Periodic system inspection and cleaning",
        "Inverter and battery performance monitoring",
        "Fault diagnosis and troubleshooting",
        "Preventive and corrective maintenance",
        "Warranty claims handling with manufacturers",
        "System performance reporting and efficiency advice",
      ],
    },
  ];

  return (
    <div className={`py-24 ${S.ground}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionLabel label="What We Do" />
          <h1
            className={`text-5xl lg:text-6xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our <span className="text-(--accent)">Services</span>
          </h1>
          <p
            className={`mt-5 ${S.textSec} max-w-2xl mx-auto text-lg`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            End-to-end solar services — from the very first conversation to
            decades of ongoing support.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className={`${S.surface} border ${S.border} rounded-2xl p-8 lg:p-10 group hover:border-(--accent) transition-all`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: "var(--accent-glow)",
                          border: "1px solid var(--accent)",
                        }}
                      >
                        <Icon size={22} color="var(--accent)" strokeWidth={2} />
                      </div>
                      <div
                        className="text-4xl font-black text-(--accent) opacity-20 group-hover:opacity-100 transition-opacity"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {svc.num}
                      </div>
                    </div>
                    <h2
                      className={`text-2xl font-black ${S.text}`}
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {svc.title}
                    </h2>
                    <p
                      className={`${S.textSec} text-sm leading-relaxed`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-3 text-sm ${S.textSec}`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          <span
                            className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{
                              background: "var(--accent-glow)",
                              border: "1px solid var(--accent)",
                            }}
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="var(--accent)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-16 ${S.ground2} border ${S.border} rounded-2xl p-10 text-center`}
        >
          <h3
            className={`text-3xl font-black ${S.text} mb-4`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Ready to Get Started?
          </h3>
          <p
            className={`${S.textSec} mb-8 max-w-xl mx-auto`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Book a free consultation with our team. We will assess your needs
            and recommend the best solar solution for your property.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="accent-gradient text-(--accent-fg) font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
            style={{
              fontFamily: "Outfit, sans-serif",
              boxShadow: "0 8px 30px var(--accent-glow)",
            }}
          >
            Book a Free Consultation
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth="2"
            >
              <path
                d="M4 9h10M10 5l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
