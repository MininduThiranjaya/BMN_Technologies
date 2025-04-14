import { useState, useRef } from "react";
import { Menu, X } from 'lucide-react';
import logo from '../assets/spring-boot-logo.png';

function NavBar({ refs } : any) {
    const { introRef, servicesRef, contactRef, aboutRef } = refs;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    function scrollTo(ref : any) {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="mx-4 mt-4 sticky top-0 z-50">
            <nav className="w-full bg-gray-800 text-white">
                <div className="flex justify-between items-center h-16 px-4">
                    {/* Logo */}
                    <div className="flex-shrink-0 w-32 h-auto">
                        <img src={logo} alt="Logo" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-grow justify-center">
                        <div className="flex items-center space-x-4">
                            <a href="#intro" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(introRef)}}>Home</a>
                            <a href="#services" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(servicesRef)}}>Services</a>
                            <a href="#contactUs" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(contactRef)}}>Contact Us</a>
                            <a href="#about" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(aboutRef)}}>About Us</a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute left-4 right-4 z-40">
                        <div className="px-4 pt-2 pb-3 space-y-1 bg-opacity-75 bg-gray-800 text-center">
                            <a href="#intro" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">Home</a>
                            <a href="#services" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">Services</a>
                            <a href="#contactUs" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">Contact Us</a>
                            <a href="#about" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">About Us</a>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default NavBar