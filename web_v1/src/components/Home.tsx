import { useState, useEffect, useRef } from "react";
import { S, scrollToSection, SectionLabel } from "../utils/utils";
import {
  Zap,
  Leaf,
  TrendingUp,
  BatteryCharging,
  Award,
  HardHat,
  GraduationCap,
  Settings,
  ShieldCheck,
  X,
  Check,
  Star,
  Loader2
} from "lucide-react";
import { endpoints } from "../api";
import type { Testimonial } from "../interfaces/Testimonial";
import axios from "axios";
import type { FormTestimonialErrors } from "../interfaces/Form";

// Hero section
function HeroSection() {
  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden ${S.ground}`}
    >
      <div
        className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--accent-glow)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="flex flex-col gap-7">
            <div
              className={`inline-flex items-center gap-2 border ${S.border} ${S.surface} rounded-full px-4 py-2 w-fit`}
            >
              <span className="w-2 h-2 rounded-full animate-pulse bg-(--accent)" />
              <span
                className={`text-xs ${S.textSec} tracking-widest uppercase`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Clean Energy Solutions
              </span>
            </div>

            <h1
              className={`text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tight ${S.text}`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Powering
              <br />
              The <span className="text-(--accent)">Future</span> With
              <br />
              Solar Energy
            </h1>

            <p
              className={`text-lg ${S.textSec} leading-relaxed max-w-lg`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              BMN-Technology engineers precision solar solutions from
              individual rooftops to commercial installations. We design,
              supply, and commission systems built for maximum yield and lasting
              performance.
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <button
                onClick={() => scrollToSection("contact")}
                className="accent-gradient text-(--accent-fg) font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-all shadow-lg"
                style={{
                  fontFamily: "Inter, sans-serif",
                  boxShadow: "0 8px 30px var(--accent-glow)",
                }}
              >
                Get a Free Quote
              </button>
              <button
                onClick={() => scrollToSection("solutions")}
                className={`border ${S.border} ${S.text} px-8 py-3.5 rounded-lg hover:border-(--accent) hover:text-(--accent) transition-all`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Explore Solutions
              </button>
            </div>

            <div className={`grid grid-cols-3 gap-6 pt-4 border-t ${S.border}`}>
              {[
                { val: "500+", label: "Projects Done" },
                { val: "10MW+", label: "Capacity Installed" },
                { val: "98%", label: "Client Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-black text-(--accent)"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {s.val}
                  </div>
                  <div
                    className={`text-xs ${S.textMuted} mt-1 tracking-wide`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className={`relative rounded-2xl overflow-hidden border ${S.border} accent-glow-box`}
            >
              <img
                src="https://images.unsplash.com/photo-1724041875334-0a6397111c7e?w=700&h=900&fit=crop&auto=format"
                alt="Professional solar panel installation by BMN-Technology"
                className="w-full h-140 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--surface)/50 via-transparent to-transparent" />
              <div
                className={`absolute bottom-5 left-5 ${S.surface} backdrop-blur border ${S.border} rounded-xl p-4 flex items-center gap-4`}
              >
                <div className="w-10 h-10 accent-gradient rounded-lg flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      stroke="var(--accent-fg)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    className={`text-sm font-semibold ${S.text}`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Clean & Renewable Energy
                  </div>
                  <div
                    className={`text-xs ${S.textSec}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Reduce bills from day one
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 w-24 h-24 border rounded-2xl pointer-events-none opacity-30"
              style={{ borderColor: "var(--accent)" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-14 h-14 border rounded-xl pointer-events-none opacity-20"
              style={{ borderColor: "var(--accent)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Why solar
function WhySolarSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Reduce Electricity Costs",
      desc: "Cut your monthly electricity bill by up to 80% and protect yourself from rising utility tariffs.",
    },
    {
      icon: Leaf,
      title: "Clean & Renewable Energy",
      desc: "Generate electricity from sunlight — zero emissions, zero fuel, and no pollution.",
    },
    {
      icon: TrendingUp,
      title: "Long-Term Savings",
      desc: "Solar systems last 25+ years. After payback, your electricity is virtually free for decades.",
    },
    {
      icon: BatteryCharging,
      title: "Energy Independence",
      desc: "Reduce dependence on the national grid. With battery backup, stay powered during outages.",
    },
  ];
  return (
    <section className={`py-24 ${S.ground2} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <SectionLabel label="The Case for Solar" />
          <h2
            className={`text-4xl lg:text-5xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Why Switch to <span className="text-(--accent)">Solar Energy?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className={`${S.surface} border ${S.border} rounded-2xl p-7 hover:border-(--accent) transition-all group`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--accent-glow)" }}
              >
                <b.icon size={22} className="text-(--accent)" />
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${S.text} group-hover:text-(--accent) transition-colors`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {b.title}
              </h3>
              <p
                className={`text-sm ${S.textSec} leading-relaxed`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why choose us
function WhyChooseUsSection() {
  const reasons = [
    {
      title: "Quality Products",
      desc: "We source only Tier-1 certified panels, inverters, and batteries from globally trusted manufacturers.",
      icon: Award,
    },
    {
      title: "Professional Installation",
      desc: "Certified engineers and trained technicians handle every installation to the highest standards.",
      icon: HardHat,
    },
    {
      title: "Experienced Team",
      desc: "Years of hands-on experience across residential, commercial, and industrial projects.",
      icon: GraduationCap,
    },
    {
      title: "Reliable Systems",
      desc: "Every system is designed and commissioned for maximum uptime and long-term durability.",
      icon: Settings,
    },
    {
      title: "Warranty & After-Sales",
      desc: "Comprehensive product warranties backed by our own after-sales support and maintenance team.",
      icon: ShieldCheck,
    },
  ];
  return (
    <section className={`py-24 ${S.ground2} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel label="Our Difference" />
            <h2
              className={`text-4xl lg:text-5xl font-black ${S.text} mb-6`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Why Choose{" "}
              <span className="text-(--accent)">BMN-Technology?</span>
            </h2>
            <p
              className={`${S.textSec} leading-relaxed mb-8`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We are not just solar installers. We are your long-term energy
              partner — from the first consultation to decades of after-sales
              support.
            </p>
            <div className="relative rounded-2xl overflow-hidden border border-(--border)">
              <img
                src="https://images.unsplash.com/photo-1658298775754-5839ffd434cc?w=600&h=380&fit=crop&auto=format"
                alt="Professional solar installation team"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--surface)/60 to-transparent" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className={`${S.surface} border ${S.border} rounded-xl p-5 flex items-start gap-4 hover:border-(--accent) transition-all`}
              >
                <r.icon size={22} className="text-(--accent) mt-0.5 shrink-0" />
                <div>
                  <h4
                    className={`font-bold ${S.text} mb-1`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {r.title}
                  </h4>
                  <p
                    className={`text-sm ${S.textSec} leading-relaxed`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {r.desc}
                  </p>
                </div>
                <div
                  className="ml-auto shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-(--accent)"
                  style={{
                    background: "var(--accent-glow)",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Processing section
function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "We understand your energy needs, analyze your electricity consumption, and recommend the most suitable solution.",
    },
    {
      num: "02",
      title: "Site Assessment",
      desc: "Our engineers inspect your roof, assess sun exposure and shading, evaluate electrical capacity, and determine the best installation layout.",
    },
    {
      num: "03",
      title: "System Design",
      desc: "We calculate solar capacity, select the right panels, inverter, and battery (if needed), and provide a detailed system proposal.",
    },
    {
      num: "04",
      title: "Installation",
      desc: "Professional mounting, panel installation, inverter wiring, electrical connections, and full system commissioning.",
    },
    {
      num: "05",
      title: "Support",
      desc: "Ongoing monitoring, maintenance, troubleshooting, and warranty support to keep your system performing for years.",
    },
  ];
  return (
    <section className={`py-24 ${S.ground}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <SectionLabel label="How It Works" />
          <h2
            className={`text-4xl lg:text-5xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our <span className="text-(--accent)">Process</span>
          </h2>
          <p
            className={`mt-4 ${S.textSec} max-w-xl mx-auto`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            From first call to commissioned system — a clear, professional
            process every step of the way.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`${S.surface} border ${S.border} rounded-2xl p-6 relative group hover:border-(--accent) transition-all`}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
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
                </div>
              )}
              <div
                className="text-3xl font-black text-(--accent) mb-4 opacity-30 group-hover:opacity-100 transition-opacity"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {s.num}
              </div>
              <h3
                className={`font-bold ${S.text} mb-2`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {s.title}
              </h3>
              <p
                className={`text-xs ${S.textSec} leading-relaxed`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials
function TestimonialsSection({
  modalOpen,
  onCloseModal,
  onShareExperience,
}: {
  modalOpen: boolean;
  onCloseModal: () => void;
  onShareExperience: (flag: number) => void;
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  function getInitials(name?: string): string {
    if (!name) return "";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return "";
  }

  useEffect(() => {
    function getTestimonialData() {
      axios
        .get(endpoints.testimonial.get)
        .then((res: any) => {
          setTestimonials(res.data?.object || []);
          setIsLoading(false);
        })
        .catch((err: String) => {
          console.error(err);
          setHasError(true);
          setIsLoading(false);
        });
    }

    getTestimonialData();
  }, []);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasTestimonials = testimonials.length > 0;
  const canAutoAdvance = testimonials.length > 1;

  const start = () => {
    if (!canAutoAdvance) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActive((p) => (p + 1) % testimonials.length);
      setAnimKey((k) => k + 1);
    }, 4500);
  };

  useEffect(() => {
    if (canAutoAdvance) start();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const nav = (dir: number) => {
    if (!hasTestimonials) return;
    clearInterval(intervalRef.current!);
    setDirection(dir as 1 | -1);
    setActive((p) => (p + dir + testimonials.length) % testimonials.length);
    setAnimKey((k) => k + 1);
    start();
  };

  const goTo = (i: number) => {
    if (!hasTestimonials) return;
    clearInterval(intervalRef.current!);
    setDirection(i > active ? 1 : -1);
    setActive(i);
    setAnimKey((k) => k + 1);
    start();
  };

  const t = testimonials[active];

  // ── Submission form state ──
  const [form, setForm] = useState({
    name: "",
    company: "",
    position: "",
    email: "",
    testimonial: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormTestimonialErrors>({});

  // Banner shown on the testimonials section itself, after the modal closes.
  const [sectionNotice, setSectionNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const noticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSectionNotice = (type: "success" | "error", message: string) => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setSectionNotice({ type, message });
    noticeTimeoutRef.current = setTimeout(() => setSectionNotice(null), 6000);
  };

  useEffect(() => () => { if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current); }, []);

  const resetForm = () => {
    setForm({ name: "", company: "", position: "", email: "", testimonial: "", rating: 0 });
    setHoverRating(0);
    setErrors({});
  };

  const handleClose = () => {
    onCloseModal();
    setTimeout(() => {
      setSubmitted(false);
      resetForm();
    }, 300);
  };

  const validate = (): boolean => {
    const newErrors: FormTestimonialErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.testimonial.trim()) {
      newErrors.testimonial = "Please provide your testimonial";
    }

    if (!form.rating) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    axios
      .post(endpoints.testimonial.submit, form)
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
          showSectionNotice("success", "Thank you! Your testimonial has been submitted and will appear here soon.");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        handleClose();
        showSectionNotice("error", "Something went wrong submitting your testimonial. Please try again.");
      });
  };

  return (
    <section id="testimonials" className={`py-24 ${S.ground} relative`}>
      <style>{`
        @keyframes cardSlideInFromRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardSlideInFromLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPopIn {
          from { transform: scale(0.95) translateY(8px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes noticeFadeIn {
          from { transform: translateY(-6px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .testimonial-card-next { animation: cardSlideInFromRight 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .testimonial-card-prev { animation: cardSlideInFromLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .share-overlay { animation: overlayFadeIn 0.25s ease-out; }
        .share-modal { animation: modalPopIn 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .section-notice { animation: noticeFadeIn 0.3s ease-out; }
      `}</style>
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Heading row */}
        <div className="text-center mb-8">
          <SectionLabel label="Customer Stories" />
          <h2
            className={`text-4xl lg:text-5xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            What Our <span className="text-(--accent)">Customers Say</span>
          </h2>
        </div>

        {/* ── Success / error notice for the submission, shown on the section itself ── */}
        {sectionNotice && (
          <div
            className={`section-notice mb-8 mx-auto max-w-xl rounded-xl border px-5 py-3.5 flex items-start gap-3 ${
              sectionNotice.type === "success"
                ? "border-(--accent)"
                : "border-red-400"
            }`}
            style={{ background: sectionNotice.type === "success" ? "var(--accent-glow)" : "rgba(239,68,68,0.08)" }}
          >
            {sectionNotice.type === "success" ? (
              <Check size={18} className="text-(--accent) shrink-0 mt-0.5" />
            ) : (
              <X size={18} className="text-red-500 shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${sectionNotice.type === "success" ? "text-(--accent)" : "text-red-500"}`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {sectionNotice.message}
            </p>
          </div>
        )}

        {/* ── Loading state ── */}
        {isLoading && (
          <div className={`${S.surface} border ${S.border} rounded-2xl p-16 flex flex-col items-center justify-center gap-4`}>
            <Loader2 size={32} className="text-(--accent) animate-spin" />
            <p className={`text-sm ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>
              Loading testimonials...
            </p>
          </div>
        )}

        {/* ── Error / empty state ── */}
        {!isLoading && (hasError || !hasTestimonials) && (
          <div className={`${S.surface} border ${S.border} rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-2`}>
            <p className={`text-base font-semibold ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>
              {hasError ? "Couldn't load testimonials" : "No testimonials yet"}
            </p>
            <p className={`text-sm ${S.textSec} max-w-sm`} style={{ fontFamily: "Inter, sans-serif" }}>
              {hasError
                ? "Something went wrong while fetching customer stories. Please check back shortly."
                : "Be the first to share your experience with BMN-Technology."}
            </p>
          </div>
        )}

        {/* ── Card + side nav buttons wrapper (only when testimonials are loaded) ── */}
        {!isLoading && !hasError && hasTestimonials && (
          <div className="relative px-12 sm:px-14 lg:px-16">
            {canAutoAdvance && (
              <button
                onClick={() => nav(-1)}
                aria-label="Previous testimonial"
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 ${S.surface} border ${S.border} rounded-full flex items-center justify-center ${S.textSec} hover:text-(--accent) hover:border-(--accent) transition-all shadow-sm`}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 12l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {canAutoAdvance && (
              <button
                onClick={() => nav(1)}
                aria-label="Next testimonial"
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 ${S.surface} border ${S.border} rounded-full flex items-center justify-center ${S.textSec} hover:text-(--accent) hover:border-(--accent) transition-all shadow-sm`}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <div className="overflow-hidden">
              <div
                key={animKey}
                className={`${S.surface} border ${S.border} rounded-2xl p-8 lg:p-12 relative overflow-hidden ${
                  direction === 1 ? "testimonial-card-next" : "testimonial-card-prev"
                }`}
              >
                <div
                  className="absolute top-4 right-8 text-9xl font-black select-none opacity-5 text-(--accent)"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  "
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {t.rating && [...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill="var(--accent)"
                      />
                    </svg>
                  ))}
                </div>
                <p className={`${S.text} text-xl lg:text-2xl leading-relaxed mb-8 italic`} style={{ fontFamily: "Inter, sans-serif" }}>
                  "{t.testimonial}"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 accent-gradient rounded-full flex items-center justify-center text-(--accent-fg) font-black shrink-0"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className={`font-bold ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>{t.name}</div>
                    <div className={`text-sm ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>{t.position}</div>
                    {t.company && (
                      <div className={`text-xs text-(--accent) mt-0.5`} style={{ fontFamily: "Inter, sans-serif" }}>{t.company}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !hasError && canAutoAdvance && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  background: i === active ? "var(--accent)" : "var(--border-strong)",
                }}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => hasTestimonials && !hasError && onShareExperience(1)}
            disabled={isLoading || hasError || !hasTestimonials}
            aria-disabled={isLoading || hasError || !hasTestimonials}
            className="inline-flex items-center gap-1.5 text-sm font-medium border border-(--accent) text-(--accent) px-5 py-2.5 rounded-lg hover:bg-(--accent-glow) transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Share Your Experience
          </button>
        </div>
      </div>

      {/* Overlay confined to this section — dims and covers only the testimonials block */}
      {modalOpen && (
        <div
          onClick={handleClose}
          className="share-overlay absolute inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`share-modal ${S.surface} border ${S.border} rounded-2xl p-8 max-w-md w-full relative`}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className={`absolute top-4 right-4 ${S.textMuted} hover:text-(--accent) transition-colors`}
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 accent-gradient rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={26} className="text-(--accent-fg)" />
                </div>
                <h3 className={`text-xl font-black mb-2 ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>Thank You!</h3>
                <p className={`text-sm ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>
                  Your experience has been submitted. We appreciate you sharing it with us.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-1">
                <h3 className={`text-xl font-black ${S.text}`} style={{ fontFamily: "Outfit, sans-serif" }}>Share Your Experience</h3>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-medium ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>Your Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className={`${S.surface2} border ${errors.name ? "border-red-500" : S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>{errors.name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-medium ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                    placeholder="Your company name"
                    className={`${S.surface2} border ${S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-medium ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>Position</label>
                  <input
                    value={form.position}
                    onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))}
                    placeholder="e.g. Homeowner, Facility Manager"
                    className={`${S.surface2} border ${S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-medium ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className={`${S.surface2} border ${errors.email ? "border-red-500" : S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-medium ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>Rating *</label>
                  <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onClick={() => setForm((p) => ({ ...p, rating: star }))}
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          fill={(hoverRating || form.rating) >= star ? "var(--accent)" : "none"}
                          stroke={(hoverRating || form.rating) >= star ? "var(--accent)" : "var(--border-strong)"}
                          strokeWidth={2}
                        />
                      </button>
                    ))}
                    {form.rating > 0 && (
                      <span className={`text-xs ml-2 ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>{form.rating} / 5</span>
                    )}
                  </div>
                  {errors.rating && (
                    <span className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>{errors.rating}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-medium ${S.textSec}`} style={{ fontFamily: "Inter, sans-serif" }}>Your Experience *</label>
                  <textarea
                    rows={4}
                    value={form.testimonial}
                    onChange={(e) => setForm((p) => ({ ...p, testimonial: e.target.value }))}
                    placeholder="Tell us about your solar installation experience..."
                    className={`${S.surface2} border ${errors.testimonial ? "border-red-500" : S.border} rounded-lg px-4 py-2.5 text-sm ${S.text} focus:outline-none resize-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                  {errors.testimonial && (
                    <span className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>{errors.testimonial}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="accent-gradient text-(--accent-fg) font-semibold py-3 rounded-lg hover:opacity-90 transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Your Review"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// CAT section
function FinalCTASection() {
  return (
    <section className={`py-28 ${S.ground2} relative overflow-hidden`}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--accent-glow)" }}
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <div className="w-16 h-16 accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="var(--accent-fg)" />
            <path
              d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
              stroke="var(--accent-fg)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2
          className={`text-4xl lg:text-5xl font-black ${S.text} mb-5`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Ready to Switch to <span className="text-(--accent)">Solar?</span>
        </h2>
        <p
          className={`${S.textSec} text-lg leading-relaxed mb-10`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Join hundreds of satisfied customers who have cut their electricity
          bills and gained energy independence with BMN-Technology.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="accent-gradient text-(--accent-fg) font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-all text-lg"
            style={{
              fontFamily: "Outfit, sans-serif",
              boxShadow: "0 8px 40px var(--accent-glow)",
            }}
          >
            Get a Free Quote
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`border-2 border-(--accent) text-(--accent) font-semibold px-10 py-4 rounded-xl hover:bg-(--accent-glow) transition-all text-lg`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

// Home SECTION

export function Home({
  shareModalOpen,
  onCloseShareModal,
  onShareExperience,
}: {
  shareModalOpen: boolean;
  onCloseShareModal: () => void;
  onShareExperience: (flag: number) => void;
}) {
  return (
    <>
      <HeroSection />
      <WhySolarSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TestimonialsSection
        modalOpen={shareModalOpen}
        onCloseModal={onCloseShareModal}
        onShareExperience={onShareExperience}
      />
      <FinalCTASection />
    </>
  );
}
