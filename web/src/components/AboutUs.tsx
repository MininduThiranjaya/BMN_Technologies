import axios from "axios";
import {
    ChevronLeft,
    ChevronRight,
    Quote,
    Star,
    ChevronRightCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { endpoints } from "../api";
import type { Testimonial } from "../types/Testimonial";

function AboutUs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slideDirection, setSlideDirection] = useState("next");
    const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function getTestimonialData() {
            axios.get(endpoints.testimonial.get)
                .then((res) => {
                    setTestimonialData(res.data?.object || []);
                    setLoading(false);
                })
                .catch((err) => console.error(err));
        }

        getTestimonialData();
    }, []);

    // Carousel auto-play
    useEffect(() => {
        if (!isAutoPlaying || testimonialData.length === 0) {
            return;
        }
        // if (testimonialData.length === 0) return;

        const interval = setInterval(() => {
            if (testimonialData.length > 0) {
                setSlideDirection("next");
                setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialData.length);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonialData]);

    const handlePrevious = () => {
        setIsAutoPlaying(false);
        setSlideDirection("prev");
        setActiveIndex(
            (prevIndex) =>
                (prevIndex - 1 + testimonialData.length) % testimonialData.length
        );
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setSlideDirection("next");
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialData.length);
    };

    const customerRating = () => {
        let tot = 0;
        testimonialData.map((item) => {
            tot = tot + item.rating;
        });
        return tot;
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen pt-16 md:pt-10">
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex-row items-center justify-center text-white gap-4">
                {/*bg-color*/}
                <div className="flex w-full h-1/6 items-center justify-center">
                    {/*bg-color*/}
                    <h2 className="text-3xl md:text-4xl text-black font-semibold text-center md:text-center font-mono">
                        Leading The Solar Revolution Since 2009
                    </h2>
                </div>
                <div className="h-5/6 w-full text-black p-5">
                    {/*bg-color*/}
                    <p className="text-sm md:text-lg mb-4 text-center">
                        At BMN-Texhnologies, we're passionate about creating a sustainable
                        future through innovative solar energy solutions. Our team of
                        experts combines cutting-edge technology with personalized service
                        to deliver exceptional results for homes and businesses.
                    </p>
                    <div className="flex flex-col text-xs md:text-sm mx-10 space-y-1 md:mx-20 md:space-y-4 ">
                        <div className="flex flex-row gap-3">
                            <ChevronRightCircleIcon size={20} />
                            <p>Industry-leading solar technology</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <ChevronRightCircleIcon size={20} />
                            <p>Expert installation and maintenance</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <ChevronRightCircleIcon size={20} />
                            <p>Custom energy solutions</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <ChevronRightCircleIcon size={20} />
                            <p>24/7 Support service</p>
                        </div>
                    </div>
                    <div className="my-10 md:my-20">
                        <div className="flex justify-center items-center gap-3 md:flex md:justify-center md:items-center md:gap-4">
                            <div className="flex flex-col w-32 h-16 justify-center items-center md:flex md:flex-col md:w-40 md:h-20 md:justify-center md:items-center">
                                <p className="text-sm md:text-lg">{customerRating()}</p>
                                <p className="text-xs md:text-sm">Total Ratings</p>
                            </div>
                            <div className="flex flex-col w-32 h-16 justify-center items-center md:flex md:flex-col md:w-40 md:h-20 md:justify-center md:items-center">
                                <p className="text-sm md:text-lg">50MW</p>
                                <p className="text-xs md:text-sm">Energy Generated</p>
                            </div>
                            <div className="flex flex-col w-32 h-16 justify-center items-center md:flex md:flex-col md:w-40 md:h-20 md:justify-center md:items-center">
                                <p className="text-sm md:text-lg">9+</p>
                                <p className="text-xs md:text-sm">Years Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex-row items-center justify-center text-white gap-4">
                {/*bg-color*/}
                <div className="flex w-full h-1/6 items-center justify-center">
                    {/*bg-color*/}
                    <h2 className="text-3xl md:text-4xl text-black font-semibold text-center md:text-center font-mono">
                        What was our client's ideas...
                    </h2>
                </div>
                <div className="relative flex w-full h-5/6 md:h-5/6 items-start justify-center">
                    {/*bg-color*/}
                    <div className="flex flex-col items-center justify-center">
                        {/* Carousel Content */}
                        <div className="w-64 h-48 md:w-96 md:h-56">
                            {/* Carousel Navigation */}
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 md:left-24 top-1/4 md:top-28 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
                            >
                                <ChevronLeft
                                    size={24}
                                    className="text-blue-500 shrink-0 sm:w-6 sm:h-6 w-5 h-5"
                                />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 md:right-24 top-1/4 md:top-28 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
                            >
                                <ChevronRight
                                    size={24}
                                    className="text-blue-500 shrink-0 sm:w-6 sm:h-6 w-5 h-5"
                                />
                            </button>
                            <div
                                className="h-full transition-all duration-700 ease-in-out"
                                key={activeIndex}
                            >
                                <div
                                    className={`bg-white p-6 rounded-lg shadow-md flex flex-col w-full h-full
                                    transform transition-all duration-700
                                    ${slideDirection === "next"
                                            ? "animate-slideInRight"
                                            : "animate-slideInLeft"
                                        }`}
                                >
                                    {!loading && testimonialData.length > 0 ? (
                                        <>
                                            <div>
                                                <Quote
                                                    size={32}
                                                    className="text-blue-500 mb-0 md:mb-2 shrink-0 w-7 h-7 md:w-8 md:h-8"
                                                />
                                                <p className="italic text-sm md:text-lg text-gray-800">
                                                    {testimonialData[activeIndex].testimonial}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-1 md:mt-4">
                                                <div>
                                                    <p className="font-bold text-sm md:text-lg">
                                                        {testimonialData[activeIndex].name}
                                                    </p>
                                                    <p className="text-gray-600 text-xs">
                                                        {testimonialData[activeIndex].position}
                                                    </p>
                                                    <p className="text-gray-600 text-xs">
                                                        {testimonialData[activeIndex].company}
                                                    </p>
                                                </div>

                                                <div className="flex">
                                                    {[...Array(testimonialData[activeIndex].rating)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={20}
                                                                className="text-yellow-500 fill-current"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <Quote size={28} className="text-blue-500 mb-2" />
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div>
                                                    <p className="font-bold text-lg text-black">
                                                        No Comments....
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-4 md:mt-8">
                            {testimonialData.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 mx-1 rounded-full transition-all md:w-3 md:h-3 md:mx-1 md:rounded-full md:transition-all ${activeIndex === index
                                            ? "bg-blue-500 w-4 md:w-6"
                                            : "bg-gray-300"
                                        }`}
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        setSlideDirection(index > activeIndex ? "next" : "prev");
                                        setActiveIndex(index);
                                    }}
                                />
                            ))}
                        </div>
                        
                        <div className="flex flex-col items-center my-4 md:my-8 ">
                            <div className="mb-4 text-black">
                                <h2 className="text-lg md:text-xl font-mono text-center">
                                    Have something nice to say? 
                                    <br></br>
                                    We'd love to hear it from you!
                                </h2>
                            </div>
                            <button className="w-32 h-10 md:w-40 md:h-10 rounded text-[#7A3EFF] border-2 border-[#7A3EFF] flex items-center justify-center normal-case">
                                Tell Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
