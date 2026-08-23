// import { useState, useEffect } from "react";
// import { useDarkMode } from "../utils/utils";
// import { Navbar } from "../components/Nav";
// import { Home } from "../components/Home";
// import { Solution } from "../components/Solution";
// import { Services } from "../components/Services";
// import { Showcase } from "../components/Showcase";
// import { AboutUs } from "../components/AboutUs";
// import { Contact } from "../components/Contact";
// import { Footer } from "../components/Footer";
// import { FloatingAIChat } from "../components/FloatingAIChat";

// // ═══════════════════════════════════════════════════════════════════════════════
// // ROOT
// // ═══════════════════════════════════════════════════════════════════════════════

// export default function HomePage() {
//   const [dark, setDark] = useDarkMode();
//   const [activeSection, setActiveSection] = useState("home");

//   // Track active section via IntersectionObserver
//   useEffect(() => {
//     const sections = ["home", "solutions", "services", "showcase", "about", "contact"];
//     const observers: IntersectionObserver[] = [];

//     sections.forEach((id) => {
//       const el = document.getElementById(id);
//       if (!el) return;
//       const obs = new IntersectionObserver(
//         ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
//         { rootMargin: "-50% 0px -45% 0px", threshold: 0 }
//       );
//       obs.observe(el);
//       observers.push(obs);
//     });

//     return () => observers.forEach((o) => o.disconnect());
//   }, []);

//   return (
//     <div className="min-h-screen" style={{ background: "var(--ground)", color: "var(--text-primary)" }}>
//       <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} activeSection={activeSection} />

//       <section id="home">
//         <Home />
//       </section>

//       <section id="solutions">
//         <Solution />
//       </section>

//       <section id="services">
//         <Services />
//       </section>

//       <section id="showcase">
//         <Showcase />
//       </section>

//       <section id="about">
//         <AboutUs />
//       </section>

//       <section id="contact">
//         <Contact />
//       </section>

//       <Footer />
//       <FloatingAIChat />
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useDarkMode, scrollToSection } from "../utils/utils";
import { Navbar } from "../components/Nav";
import { Home } from "../components/Home";
import { Solution } from "../components/Solution";
import { Services } from "../components/Services";
import { Showcase } from "../components/Showcase";
import { AboutUs } from "../components/AboutUs";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { FloatingAIChat } from "../components/FloatingAIChat";

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [dark, setDark] = useDarkMode();
  const [activeSection, setActiveSection] = useState("home");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const shareTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll to the testimonials block, then reveal the submission form as an
  // overlay on that section after a short delay.
  const triggerShareExperience = (flag: number) => {
    if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current);
    scrollToSection("testimonials");
    if(flag == 0) {
      shareTimeoutRef.current = setTimeout(() => setShareModalOpen(true), 1000);
    }
    else {
      setShareModalOpen(true);
    }
  };

  useEffect(() => () => { if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current); }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ["home", "solutions", "services", "showcase", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-50% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--ground)", color: "var(--text-primary)" }}>
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} activeSection={activeSection} onShareExperience={triggerShareExperience} />

      <section id="home">
        <Home
          shareModalOpen={shareModalOpen}
          onCloseShareModal={() => setShareModalOpen(false)}
          onShareExperience={(flag) => triggerShareExperience(flag)}
        />
      </section>

      <section id="solutions">
        <Solution />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="showcase">
        <Showcase />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
      <FloatingAIChat />
    </div>
  );
}