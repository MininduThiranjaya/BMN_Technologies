import { S, SectionLabel } from "../utils/utils";

const partnerImages = [
  { src: "/partnership/1.jpg", alt: "Partner 1" },
  { src: "/partnership/2.jpg", alt: "Partner 2" },
  { src: "/partnership/3.jpg", alt: "Partner 3" },
  { src: "/partnership/4.jpg", alt: "Partner 4" },
  { src: "/partnership/5.jpg", alt: "Partner 5" },
  { src: "/partnership/6.jpg", alt: "Partner 6" },
  { src: "/partnership/7.jpg", alt: "Partner 7" },
  { src: "/partnership/8.jpg", alt: "Partner 8" },
];

export function Partners() {
  const logos = [...partnerImages, ...partnerImages].map((p, i) => (
    <div
      key={`${p.src}-${i}`}
      className="w-44 h-24 sm:w-52 sm:h-28 shrink-0 flex items-center justify-center"
    >
      <img
        src={p.src}
        alt={p.alt}
        className="max-w-full max-h-full object-contain rounded-xl"
        draggable={false}
      />
    </div>
  ));

  return (
    <div className={`py-24 ${S.ground} overflow-hidden`}>
      <style>{`
        @keyframes partnersMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="text-center mb-16">
          <SectionLabel label="Partners" />
          <h1
            className={`text-5xl lg:text-6xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Trusted <span className="text-(--accent)">Partners</span>
          </h1>
          <p
            className={`mt-5 ${S.textSec} max-w-2xl mx-auto text-lg`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We work with leading brands and suppliers to deliver reliable,
            high-quality solar solutions to every customer.
          </p>
        </div>
      </div>

      {/* Moving logos, right to left */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div
          className="flex gap-5 w-max"
          style={{ animation: "partnersMarquee 30s linear infinite" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {logos}
        </div>
      </div>
    </div>
  );
}
