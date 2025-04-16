import { useRef, useState } from "react"
import AboutUs from "../components/AboutUs"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Intro from "../components/Intro"
import Services from "../components/Services"
import NavBar from "../components/NavBar"
import BannerImages from "../components/BannerImages"

function HomePage() {
    const introRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);
    const aboutRef = useRef(null);


    return (
        <>
            <div className="absolute left-0 right-0" >
                <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }} />
                <BannerImages />
                <div className="mx-4 mb-4">
                    <div ref={introRef}>
                        <Intro />
                    </div>
                    <div ref={servicesRef}>
                        <Services />
                    </div>
                    <div ref={contactRef}>
                        <ContactUs />
                    </div>
                    <div ref={aboutRef}>
                        <AboutUs />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default HomePage