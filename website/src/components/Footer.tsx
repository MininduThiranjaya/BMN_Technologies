import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 w-full">
            <div className="w-[80%] mx-auto px-4">
                <div className="flex flex-wrap">

                    {/* Column 1: Contact & Social */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-6">
                        <h3 className="text-xl font-bold mb-4">B M N Technologies (Pvt) Ltd</h3>
                        <div className="mb-6">
                            <div className="flex items-start mb-2">
                                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                                <span>123 Business Avenue, City, Country</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Phone size={18} className="mr-2 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <Mail size={18} className="mr-2 flex-shrink-0" />
                                <span>contact@yourcompany.com</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" aria-label='facebook' className="hover:text-blue-400 transition-colors"><Facebook size={24} /></a>
                                <a href="#" aria-label='twitter' className="hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
                                <a href="#" aria-label='instergram' className="hover:text-pink-400 transition-colors"><Instagram size={24} /></a>
                                <a href="#" aria-label='linkedin' className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-6">
                        <div>
                            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <a href="#intro" className="hover:text-blue-300 transition-colors">Home</a>
                                <a href="#services" className="hover:text-blue-300 transition-colors">Services</a>
                                <a href="#contactUs" className="hover:text-blue-300 transition-colors">Contact Us</a>
                                <a href="#about" className="hover:text-blue-300 transition-colors">About Us</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Map */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-bold mb-4">Find Us</h3>
                        <div className="h-64 bg-gray-200 relative rounded-lg overflow-hidden">
                            <iframe
                                title='map'
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
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    <p>© {new Date().getFullYear()} B M N Technologies (Pvt) Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
