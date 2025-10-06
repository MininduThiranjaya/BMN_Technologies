import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import NavBar from "../components/NavBar";
import Services from "../components/Services";
import { useRef } from "react"

function Home() {
  
  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  return (
    <div className="overflow-y-scroll scrollbar-hide w-screen h-screen scroll-smooth">{/*bg-color*/}
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 w-full">
        <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }} />
      </div>
      
      <div>
      {/* First screen: Intro fills viewport */}
      <div ref={introRef} id="intro" className="h-[calc(100vh-64px)] flex flex-col">
        <Intro />
      </div>

      {/* Other sections */}
      <div ref={aboutRef} id="about" className="h-screen w-full">{/*bg-color*/}
        <AboutUs />
      </div>
      <div ref={servicesRef} id="services" className="h-screen w-full">
        <Services />
      </div>
      <div ref={contactRef} id="contact" className="h-screen">
        <ContactUs />
      </div>

      <Footer />
    </div>
      </div>
  );
}

export default Home;
