// import { useState, useRef } from "react";
// import { Menu, X } from 'lucide-react';
// import logo from '../assets/spring-boot-logo.png';

// function NavBar({ refs } : any) {
//     const { introRef, servicesRef, contactRef, aboutRef } = refs;
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     function scrollTo(ref : any) {
//         ref.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     return (
//         <div className="mx-4 mt-4 sticky top-0 z-50">
//             <nav className="w-full bg-gray-800 text-white">
//                 <div className="flex justify-between items-center h-16 px-4">
//                     {/* Logo */}
//                     <div className="flex-shrink-0 w-32 h-auto">
//                         <img src={logo} alt="Logo" />
//                     </div>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:flex flex-grow justify-center">
//                         <div className="flex items-center space-x-4">
//                             <a href="#intro" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(introRef)}}>Home</a>
//                             <a href="#services" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(servicesRef)}}>Services</a>
//                             <a href="#contactUs" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(contactRef)}}>Contact Us</a>
//                             <a href="#about" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => {scrollTo(aboutRef)}}>About Us</a>
//                         </div>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden flex items-center">
//                         <button
//                             onClick={toggleMenu}
//                             className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
//                         >
//                             {isOpen ? <X size={24} /> : <Menu size={24} />}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {isOpen && (
//                     <div className="md:hidden absolute left-4 right-4 z-40">
//                         <div className="px-4 pt-2 pb-3 space-y-1 bg-opacity-75 bg-gray-800 text-center">
//                             <a href="#intro" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">Home</a>
//                             <a href="#services" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">Services</a>
//                             <a href="#contactUs" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">Contact Us</a>
//                             <a href="#about" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg">About Us</a>
//                         </div>
//                     </div>
//                 )}
//             </nav>
//         </div>
//     )
// }

// export default NavBar

// function Header() {
//     return (
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-blue-600">Showcase</h1>
//             </div>

//             {/* Navigation */}
//             <nav className="hidden md:flex space-x-8">
//               <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">Categories</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
//               <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
//             </nav>

//             {/* Icons */}
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-700 hover:text-blue-600">
//                 <Search size={20} />
//               </button>
//               <button className="text-gray-700 hover:text-blue-600">
//                 <User size={20} />
//               </button>
//               <button className="text-gray-700 hover:text-blue-600 relative">
//                 <ShoppingCart size={20} />
//                 <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
//               </button>
//               <button className="md:hidden text-gray-700 hover:text-blue-600">
//                 <Menu size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header
//     );
//   }

import { useState } from "react";
import { Menu, X } from 'lucide-react';
import logo from '../assets/spring-boot-logo.png';
import CartButton from '../components/CartButoon'; // Import the CartButton component
import CartOverlay from '../components/Cart'; // Import the CartOverlay component
import { useLocation, useNavigate } from "react-router-dom";

function NavBar({ refs }: any) {
    const { introRef, servicesRef, contactRef, aboutRef } = refs;
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    const navigate  = useNavigate()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    function scrollTo(ref: any, section: string) {
        if(location.pathname !== '/') {
            navigate(`/#${section}`); // This will update the URL with the section hash
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="mx-4 mt-4 sticky top-0 z-50">
            <nav className="w-full bg-gray-800 text-white">
                <div className="flex justify-between items-center h-16 px-4">
                    {/* Logo - Centered on mobile */}
                    <div className="flex-shrink-0 w-32 h-auto text-center md:text-left">
                        <img src={logo} alt="Logo" className="mx-auto md:mx-0" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-grow justify-center">
                        <div className="flex items-center space-x-4 justify-center">
                            <a href="#intro" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => { scrollTo(introRef, 'intro') }}>Home</a>
                            <a href="#services" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => { scrollTo(servicesRef, 'services') }}>Services</a>
                            <a href="#contactUs" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => { scrollTo(contactRef, 'contactUs') }}>Contact Us</a>
                            <a href="#about" className="px-3 py-2 rounded-md hover:bg-gray-700 text-xl" onClick={() => { scrollTo(aboutRef, 'about') }}>About Us</a>
                        </div>
                    </div>

                    {/* Mobile Controls Group - Cart Button & Menu Button */}
                    <div className="flex items-center">
                        {/* Cart Button - No margin between cart and menu on mobile */}
                        <div className="md:mr-4">
                            <CartButton />
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden ml-2">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                                aria-expanded={isOpen}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute left-0 right-0 z-40">
                        <div className="px-4 pt-2 pb-3 space-y-1 bg-opacity-75 bg-gray-800 shadow-lg">
                            <a href="#intro" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center" onClick={() => {scrollTo(introRef, 'intro'); setIsOpen(false);}}>Home</a>
                            <a href="#services" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center" onClick={() => {scrollTo(servicesRef, 'services'); setIsOpen(false);}}>Services</a>
                            <a href="#contactUs" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center" onClick={() => {scrollTo(contactRef, 'contactUs'); setIsOpen(false);}}>Contact Us</a>
                            <a href="#about" className="block px-3 py-2 rounded-md hover:bg-gray-700 text-lg text-center" onClick={() => {scrollTo(aboutRef, 'about'); setIsOpen(false);}}>About Us</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Cart Overlay */}
            <CartOverlay />
        </div>
    )
}

export default NavBar;