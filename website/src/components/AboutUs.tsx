import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialForm from "./TestimonialForm";
import axios from "axios";
import { endpoints } from "../api";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  email: string;
  testimonial: string;
  rating: number;
  date: Date;
}

export default function AboutUs() {
  const [visibleSections, setVisibleSections] = useState({
    heading: false,
    subheading: false,
    desc1: false,
    desc2: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState("next");
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getTestimonialData() {
      axios
        .get(endpoints.testimonial.get)
        .then((res) => {
          setTestimonialData(res.data?.object || []);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }

    getTestimonialData();
  }, []); // only run on mount

  // Text animations on mount
  useEffect(() => {
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, heading: true })),
      300
    );
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, subheading: true })),
      600
    );
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, desc1: true })),
      900
    );
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, desc2: true })),
      1200
    );
  }, []);

  // Carousel auto-play
  useEffect(() => {
    if (!isAutoPlaying || testimonialData.length === 0) {
      return;
    }
    // if (testimonialData.length === 0) return;

    const interval = setInterval(() => {
      if (testimonialData.length > 0) {
        console.log(testimonialData?.length);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section with Animated Text */}
      <div className="text-center mb-16">
        <h1
          className={`text-4xl font-bold mb-4 transition-all duration-1000 transform ${
            visibleSections.heading
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          About Our Company
        </h1>

        <h2
          className={`text-2xl text-gray-600 mb-8 transition-all duration-1000 transform ${
            visibleSections.subheading
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Crafting Digital Experiences Since 2015
        </h2>

        <div className="max-w-3xl mx-auto">
          <p
            className={`text-lg mb-4 transition-all duration-1000 delay-100 ${
              visibleSections.desc1 ? "opacity-100" : "opacity-0"
            }`}
          >
            We're a team of passionate designers, developers, and strategists
            dedicated to creating innovative digital solutions that help
            businesses thrive in today's competitive landscape.
          </p>

          <p
            className={`text-lg transition-all duration-1000 delay-200 ${
              visibleSections.desc2 ? "opacity-100" : "opacity-0"
            }`}
          >
            Our approach combines cutting-edge technology with human-centered
            design to deliver products and projects that not only meet but
            exceed our clients' expectations.
          </p>
        </div>
      </div>
      <TestimonialForm />

      {/* Single Testimonial Carousel */}
      <div className="py-12 bg-gray-50 rounded-2xl shadow-sm mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="relative px-12 max-w-2xl mx-auto">
          {/* Carousel Navigation */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronLeft size={24} className="text-blue-500" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
          >
            <ChevronRight size={24} className="text-blue-500" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden h-64">
            <div
              className="h-full transition-all duration-700 ease-in-out"
              key={activeIndex}
            >
              <div
                className={`bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-between transform transition-all duration-700 ${
                  slideDirection === "next"
                    ? "animate-slideInRight"
                    : "animate-slideInLeft"
                }`}
              >
                {!loading && testimonialData.length > 0 ? (
                  <>
                    <div>
                      <Quote size={32} className="text-blue-500 mb-4" />
                      <p className="italic text-lg text-gray-800">
                        {testimonialData[activeIndex].testimonial}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="font-bold text-lg">
                          {testimonialData[activeIndex].name}
                        </p>
                        <p className="text-gray-600">
                          {testimonialData[activeIndex].position}
                        </p>
                        <p className="text-gray-600">
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
                      <Quote size={32} className="text-blue-500 mb-4" />
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="font-bold text-lg">No Comments....</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-all ${
                  activeIndex === index ? "bg-blue-500 w-6" : "bg-gray-300"
                }`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setSlideDirection(index > activeIndex ? "next" : "prev");
                  setActiveIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
