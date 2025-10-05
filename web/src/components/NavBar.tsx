import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NavBar({ refs }: any) {

  const { introRef, servicesRef, contactRef, aboutRef } = refs;
  const [isOpen, setIsOpen] = useState(false);
  const navigate  = useNavigate()

  function scrollTo(ref: any, section: string) {
        if(location.pathname !== '/') {
            navigate(`/#${section}`); // This will update the URL with the section hash
            ref.current?.scrollIntoView();
        }
        ref.current?.scrollIntoView();
  };

  return (
    // <div className="">
      <div className="flex flex-1 flex-row w-full h-16 justify-between items-center bg-white/30 backdrop-blur-md shadow-md text-black font-serif">
        <div className="p-5">
            BMN-Technologies
        </div>

        {/* Desktom Menu */}
        <div className="hidden md:flex flex-1 flex-row w-full justify-center p-5">
          <a href="#intro" className="mx-10" onClick={() => { scrollTo(introRef, 'intro') }}>Home</a>
          <a href="#about" className="mx-10" onClick={() => { scrollTo(aboutRef, 'about') }}>About Us</a>
          <a href="#services" className="mx-10" onClick={() => { scrollTo(servicesRef, 'services') }}>Services</a>
          <a href="#contact" className="mx-10" onClick={() => { scrollTo(contactRef, 'contact') }}>Contact Us</a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0">
            <div className="px-4 pt-2 pb-3 space-y-1 bg-opacity-75 bg-gray-800 shadow-lg">
              <a
                href="#intro"
                className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center"
                onClick={() => {
                  scrollTo(introRef, 'intro')
                }}
              >
                Home
              </a>
              <a
                href="#services"
                className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center"
                onClick={() => {
                  scrollTo(servicesRef, 'services')
                }}
              >
                Services
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center"
                onClick={() => {
                  scrollTo(contactRef, 'contact')
                }}
              >
                Contact Us
              </a>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center"
                onClick={() => {
                  scrollTo(aboutRef, 'about')
                }}
              >
                About Us
              </a>
            </div>
          </div>
        )}
      </div>
    // </div>
  );
}

export default NavBar;
