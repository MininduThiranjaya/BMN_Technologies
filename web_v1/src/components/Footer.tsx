import { Phone, Mail, MessageCircle } from "lucide-react";
import { S, scrollToSection } from "../utils/utils";

// FOOTER

export function Footer() {
  const currentYear = new Date().getFullYear();
  const cols = [
    {
      heading: "Company",
      items: [
        { l: "About Us", p: "about" },
        { l: "Showcase", p: "showcase" },
        { l: "Contact", p: "contact" },
      ],
    },
    {
      heading: "Solutions",
      items: [
        { l: "On-Grid Solar", p: "solutions" },
        { l: "Off-Grid Solar", p: "solutions" },
        { l: "Hybrid Solar", p: "solutions" },
      ],
    },
    {
      heading: "Services",
      items: [
        { l: "Consultation", p: "services" },
        { l: "Site Assessment", p: "services" },
        { l: "Installation", p: "services" },
        { l: "Maintenance", p: "services" },
      ],
    },
    {
      heading: "Support",
      items: [
        { l: "FAQ", p: "contact" },
        { l: "Warranty", p: "contact" },
        { l: "Terms & Conditions", p: "contact" },
        { l: "Privacy Policy", p: "contact" },
      ],
    },
  ];

  return (
    <footer className={`${S.ground} border-t ${S.border} pt-16 pb-8`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 w-fit"
            >
              <div className="w-8 h-8 accent-gradient rounded-sm rotate-12 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" fill="var(--accent-fg)" />
                  <path
                    d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
                    stroke="var(--accent-fg)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                className="font-black text-xl tracking-tight"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                BMN<span className="text-(--accent)">-</span>Technology
              </span>
            </button>
            <p
              className={`text-sm ${S.textSec} leading-relaxed max-w-xs`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Professional solar energy solutions for homes, businesses, and
              communities across Sri Lanka.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { icon: Phone, val: "+94 77 123 4567" },
                { icon: Mail, val: "info@bmntech.lk" },
                { icon: MessageCircle, val: "WhatsApp: +94 77 123 4567" },
              ].map((c) => (
                <div
                  key={c.val}
                  className={`flex items-center gap-2 text-xs ${S.textSec}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <c.icon size={14} className="text-(--accent)" />
                  {c.val}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {["facebook", "instagram", "youtube", "linkedin"].map((s) => (
                <div
                  key={s}
                  className={`w-9 h-9 border ${S.border} rounded-lg flex items-center justify-center ${S.textMuted} hover:text-(--accent) hover:border-(--accent) transition-all cursor-pointer`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {s === "facebook" && (
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    )}
                    {s === "instagram" && (
                      <>
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </>
                    )}
                    {s === "youtube" && (
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    )}
                    {s === "linkedin" && (
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                    )}
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h4
                className={`text-xs font-semibold tracking-widest uppercase ${S.text}`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.l}>
                    <button
                      onClick={() => scrollToSection(item.p)}
                      className={`text-sm ${S.textSec} hover:text-(--accent) transition-colors text-left`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h4
            className={`text-xs font-semibold tracking-widest uppercase ${S.text} mb-4`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Find Us
          </h4>
          <div
            className={`relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border ${S.border}`}
          >
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.55300239658345!2d79.89595413827571!3d6.908767350571309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcd55c9202bbfb%3A0x4fa99c28b9401d5b!2sB%20M%20N%20Technologies%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1744625837357!5m2!1sen!2slk"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div
          className={`border-t ${S.border} pt-6 flex items-center justify-center`}
        >
          <p
            className={`text-xs ${S.textMuted}`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            &copy; {currentYear} BMN-Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
