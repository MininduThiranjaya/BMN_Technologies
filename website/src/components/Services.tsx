import { useState } from "react";
import { Package, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
    const [hoveredService, setHoveredService] = useState<string | null>(null);
    const navigation = useNavigate();

    const services = [
        {
            id: "product",
            title: "Product",
            description: "Custom software product development from concept to launch. We build scalable solutions tailored to your business needs.",
            icon: Package,
            navigate:'all-products'
        },
        {
            id: "project",
            title: "Project",
            description: "End-to-end project management and execution. We handle the timeline, resources, and delivery to bring your vision to life.",
            icon: Briefcase,
            navigate:'all-projects'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>

            <div className="grid md:grid-cols-2 gap-32">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <div
                            key={service.id}
                            className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ease-in-out cursor-pointer"
                            style={{
                                transform: hoveredService === service.id ? 'scale(1.05)' : 'scale(1)',
                                height: hoveredService === service.id ? '320px' : '240px',
                            }}
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-full w-full p-8 text-white transition-all duration-500">
                                <div className="flex items-center mb-6 transition-all duration-500"
                                    style={{
                                        transform: hoveredService === service.id ? 'translateY(-8px)' : 'translateY(0)',
                                    }}
                                >
                                    <Icon size={36} className="mr-4" />
                                    <h3 className="text-2xl font-bold">{service.title}</h3>
                                </div>

                                <div className="transition-all duration-500 opacity-0 transform translate-y-8"
                                    style={{
                                        opacity: hoveredService === service.id ? 1 : 0,
                                        transform: hoveredService === service.id ? 'translateY(0)' : 'translateY(20px)',
                                    }}
                                >
                                    <p className="text-lg leading-relaxed">{service.description}</p>
                                    <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-medium rounded-full hover:bg-gray-100 transition-colors" onClick={() => {navigation(`/${service.navigate}`)}}>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}