import { useState, useEffect } from "react";
import { FolderKanban, Package, Home, Building, Factory, Sun, Battery, Wind, X } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase";
import ProductShowcase from "./ProductShowcase";

function Services() {
    const isSmallScreen = window.innerWidth < 768;
    const [current, setCurrent] = useState(0);
    const [projectIndex, setProjectIndex] = useState(0);
    const [productIndex, setProductIndex] = useState(0);
    const [load, setLoad] = useState(true)
    const [isOpen, setIsOpen] = useState(true);
    const [serviceType, setServiceType] = useState('')

    useEffect(() => {
        // Small item changes every 5s
        const projectInterval = setInterval(() => {
            setProjectIndex((prev) => (prev + 1) % projectService.length);
        }, 5000);

        const productInterval = setInterval(() => {
            setProductIndex((prev) => (prev + 1) % productService.length);
        }, 5000);

        // Big item changes every 15s (3 × 5s)
        const mainInterval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % services.length);
            setLoad((pre) => !pre)   
        }, 15000);

        // Clear all on unmount
        return () => {
            clearInterval(projectInterval);
            clearInterval(productInterval);
            clearInterval(mainInterval);
        };
    }, []);

    const getPosition = (index: number) => {
        const diff = (index - current + services.length) % services.length;
        return diff;
    };

    const services = [
        {
            icon: FolderKanban,
            title: "Projects",
            description:
                "Innovative, goal-driven projects that bring sustainable and intelligent solutions to life.",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: Package,
            title: "Products",
            description:
                "Reliable, high-quality products designed to empower businesses and enhance daily living.",
            color: "from-blue-500 to-cyan-500",
        },
    ];

    const projectService = [
        {
            id: 1,
            title: "Residential Solar",
            description: "Complete home solar installations with custom designs for optimal energy production.",
            icon: <Home size={40} className="text-blue-600 shrink-0 w-10 h-10 md:w-14 md:h-14" />,
            link: "/all-projects/residential"
        },
        {
            id: 2,
            title: "Commercial Buildings",
            description: "Large-scale solar solutions for office buildings and commercial properties.",
            icon: <Building size={40} className="text-blue-600 shrink-0 w-10 h-10 md:w-14 md:h-14" />,
            link: "/all-projects/commercial"
        },
        {
            id: 3,
            title: "Industrial Solutions",
            description: "Power solutions for factories and industrial complexes with high energy demands.",
            icon: <Factory size={40} className="text-blue-600 shrink-0 w-10 h-10 md:w-14 md:h-14" />,
            link: "/all-projects/industrial"
        }
    ];

    const productService = [
        {
            id: 1,
            title: "Solar Panels",
            description: "High-efficiency solar panels with extended warranty and optimal energy conversion.",
            icon: <Sun size={40} className="text-blue-600 shrink-0 w-10 h-10 md:w-14 md:h-14" />,
            link: "/all-products/solar-panels"
        },
        {
            id: 2,
            title: "Battery Storage",
            description: "Advanced battery storage solutions for reliable power backup and energy management.",
            icon: <Battery size={40} className="text-blue-600 shrink-0 w-10 h-10 md:w-14 md:h-14" />,
            link: "/all-products/battery-storage"
        },
        {
            id: 4,
            title: "Hybrid Inverters",
            description: "Versatile inverters that work with both grid and battery power sources.",
            icon: <Wind size={40} className="text-blue-600 shrink-0 w-10 h-10 md:w-14 md:h-14" />,
            link: "/all-products/inverters"
        }
    ];

    function projectCard() {
        return (
            <div className="w-full h-full flex items-start md:items-center justify-center">
                <div className="w-3/4 h-3/4">
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-row">

                            {
                                projectService.map((item, index) => (

                                    // <div className="flex flex-row">
                                    <div 
                                        key={index}
                                        className="flex flex-row md:h-10 w-full rounded-md justify-between p-2"
                                    >
                                        <div
                                            className={`text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 ${projectIndex === index
                                                ? "scale-100 -translate-y-1 text-black font-semibold"
                                                : "text-black"
                                                }`}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                    // </div>
                                ))
                            }
                        </div>
                        <div className="w-full h-full p-5">{/*bg-color*/}
                            {
                                <div className="w-full h-full flex md:flex flex-col md:flex-col text-black">
                                    <div className="relative flex items-center h-10 px-4 mt-4 md:mt-10">{/*bg-color*/}
                                        {/* Icon (justify-start) */}
                                        <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2">
                                            {projectService[projectIndex].icon}
                                        </div>

                                        {/* Title (justify-center) */}
                                        <p className="block text-lg md:hidden w-full text-center font-semibold">
                                            {projectService[projectIndex].title}
                                        </p>
                                    </div>

                                    <div className="mt-0 md:mt-5">
                                        <div className="hidden md:flex md:text-2xl justify-center font-semibold">
                                            {projectService[projectIndex].title}
                                        </div>
                                        <div className="flex text-center text-sm md:text-lg mt-2 md:mt-5">
                                            {projectService[projectIndex].description}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function productCard() {
        return (
            <div className="w-full h-full flex items-start md:items-center justify-center">
                <div className="w-3/4 h-3/4">
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-row">

                            {
                                productService.map((item, index) => (

                                    // <div className="flex flex-row">
                                    <div className="flex flex-row md:h-10 w-full rounded-md justify-between p-2">
                                        <div
                                            key={index}
                                            className={`text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 ${projectIndex === index
                                                ? "scale-100 -translate-y-1 text-black font-semibold"
                                                : "text-black"
                                                }`}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                    // </div>
                                ))
                            }
                        </div>
                        <div className="w-full h-full p-5">{/*bg-color*/}
                            {
                                <div className="w-full h-full flex md:flex flex-col md:flex-col text-black">
                                    <div className="relative flex items-center h-10 px-4 mt-4 md:mt-10">{/*bg-color*/}
                                        {/* Icon (justify-start) */}
                                        <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2">
                                            {productService[productIndex].icon}
                                        </div>

                                        {/* Title (justify-center) */}
                                        <p className="block text-lg md:hidden w-full text-center font-semibold">
                                            {productService[productIndex].title}
                                        </p>
                                    </div>

                                    <div className="mt-0 md:mt-5">
                                        <div className="hidden md:flex md:text-2xl justify-center font-semibold">
                                            {productService[productIndex].title}
                                        </div>
                                        <div className="flex text-center text-sm md:text-lg mt-2 md:mt-5">
                                            {productService[productIndex].description}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-screen pt-1 md:pt-6">
            <>
                {!isOpen && (
                    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center p-5">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={32} className="text-gray-800" />
                        </button>

                        <div className="h-full w-full flex flex-col">

                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-800 font-mono">{serviceType.toUpperCase()}</h2>
                            </div>

                            {/* Content */}
                            <div className="w-full h-full bg-white">
                                {
                                    serviceType === 'projects' ? ( 
                                        <ProjectShowcase/>
                                    ) : (
                                        <ProductShowcase/>
                                    )
                                }
                            </div>
                        </div>
                    </div>)}
            </>
            {/*bg-color*/}
            <div className="w-full md:w-full h-full md:h-full flex-row items-center justify-center text-white gap-4">
                {/*bg-color*/}
                <div className="flex w-full md:w-full h-1/6 md:h-1/6 items-center justify-center">
                    {/*bg-color*/}
                    <h2 className="text-3xl md:text-4xl text-black font-semibold text-center md:text-center font-mono">
                        OUR SERVICES
                    </h2>
                </div>
                <div className="w-full md:w-full h-5/6 md:h-5/6 flex md:flex flex-col md:flex-row">{/*bg-color*/}
                    <div className="w-full md:w-1/3 h-1/3 md:h-full items-start md:items-center justify-center">{/*bg-color*/}
                        {
                            load ? projectCard() : productCard()
                        }
                    </div>
                    <div className="w-full md:w-2/3 h-2/3 md:h-full flex flex-col items-center justify-center">{/*bg-color*/}
                        <div className="relative w-full md:w-full h-4/6 md:h-2/3 flex md:flex items-center md:items-center justify-cente md:justify-center perspective-1000 md:perspective-1000">{/*bg-color*/}
                            {services.map((service, index) => {
                                const position = getPosition(index);
                                const Icon = service.icon;

                                let transform = "";
                                let zIndex = 0;
                                let opacity = 0;
                                let scale = 0.9;

                                if (position === 0) {
                                    transform = isSmallScreen
                                        ? "translateX(10px) translateZ(0) rotateY(0deg)" // Center for small screens
                                        : "translateX(-100px) translateZ(0) rotateY(0deg)";
                                    zIndex = 30;
                                    opacity = 1;
                                    scale = 1;
                                } else if (position === 1) {
                                    transform = isSmallScreen
                                        ? "translateX(155px) translateZ(-50px) rotateY(-10deg)"
                                        : "translateX(280px) translateZ(-100px) rotateY(-15deg)";
                                    zIndex = 20;
                                    opacity = 0.8;
                                    scale = 0.95;
                                }
                                return (
                                    <div
                                        key={index}
                                        className="absolute transition-all duration-700 ease-out"
                                        style={{
                                            transform: `${transform} scale(${scale})`,
                                            zIndex,
                                            opacity,
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        <div
                                            className={`w-64 h-80 md:w-80 md:h-96 bg-gradient-to-br ${service.color} rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-white backdrop-blur-sm bg-opacity-90 border border-white/20`}
                                        >
                                            <div className="bg-white/20 rounded-full p-5 mb-5 md:p-6 md:mb-6 backdrop-blur-sm">
                                                <Icon className="w-7 h-7 md:w-12 md:h-12" />
                                            </div>
                                            <h3 className="text-lg md:text-2xl font-bold mb-4 text-center">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm md:text-sm text-center text-white/90 leading-relaxed">
                                                {service.description}
                                            </p>
                                            <button
                                                disabled={position !== 0}
                                                className="text-sm md:text-sm mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full font-semibold transition-colors backdrop-blur-sm border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => {
                                                    setServiceType(service.title.toLowerCase())
                                                    setIsOpen(!isOpen)
                                                }}
                                            >
                                                Let's check it out ?
                                            </button>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center mt-12 gap-3">
                            {services.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-3 rounded-full transition-all duration-300 ${current === index
                                        ? "w-6 md:w-8 bg-purple-400"
                                        : "w-3 bg-purple-600/50 hover:bg-purple-500"
                                        }`}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
