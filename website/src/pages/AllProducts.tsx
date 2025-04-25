import { Sun, Battery, Wind, Zap } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import BannerImages from '../components/BannerImages';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import NavBar from '../components/NavBar';

function AllProducts() {

    const introRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);
    const aboutRef = useRef(null);

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top
    }, [pathname]);
    // Sample data for products
    const products = [
        {
            id: 1,
            title: "Solar Panels",
            description: "High-efficiency solar panels with extended warranty and optimal energy conversion.",
            icon: <Sun size={40} className="text-yellow-500" />,
            link: "/all-products/solar-panels"
        },
        {
            id: 2,
            title: "Battery Storage",
            description: "Advanced battery storage solutions for reliable power backup and energy management.",
            icon: <Battery size={40} className="text-green-500" />,
            link: "/all-products/battery-storage"
        },
        {
            id: 3,
            title: "Smart Energy Systems",
            description: "Intelligent energy monitoring and control systems for optimal energy usage.",
            icon: <Zap size={40} className="text-blue-500" />,
            link: "/all-products/smart-energy"
        },
        {
            id: 4,
            title: "Hybrid Inverters",
            description: "Versatile inverters that work with both grid and battery power sources.",
            icon: <Wind size={40} className="text-purple-500" />,
            link: "/all-products/inverters"
        }
    ];

    return (
        <div className="absolute left-0 right-0">
            <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }} />
            <BannerImages />
            <div className="bg-gray-50 min-h-screen py-4 mx-4">
                <div className="max-w-6xl mx-auto px-4 md-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Services</h1>

                    {/* Products Section */}
                    <section className="mb-20">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-1 bg-green-500 mr-4"></div>
                            <h2 className="text-3xl font-bold text-gray-700">Products We Have</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map(product => (
                                <ServiceCard
                                    key={product.id}
                                    title={product.title}
                                    description={product.description}
                                    icon={product.icon}
                                    link={product.link}
                                />
                            ))}
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default AllProducts;