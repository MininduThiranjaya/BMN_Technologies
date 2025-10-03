import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../assets/bannerImages/banner1.jpg';
import banner2 from '../assets/bannerImages/banner2.jpg';

export default function BannerImages() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample banner images - replace with your actual image URLs
    const bannerImages = [
        banner1,
        banner2
    ];

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
    };

    // Auto-rotate slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="">
            <div className="flex flex-col w-full">
                {/* Image Carousel Banner */}
                <div className="relative w-full h-screen overflow-hidden">
                    {/* Images */}
                    <div className="flex h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {bannerImages.map((image, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0">
                                <img
                                    src={image}
                                    alt={`Banner ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    fetchPriority="high"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goToNextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {bannerImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}