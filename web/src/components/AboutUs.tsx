import axios from "axios";
import {
    ChevronLeft,
    ChevronRight,
    Quote,
    Star,
    ChevronRightCircleIcon,
    X,
    User,
    Briefcase,
    Mail,
    MessageSquare,
    Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { endpoints } from "../api";
import type { Testimonial } from "../types/Testimonial";
import type { FormErrors } from "../types/Form";

function AboutUs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slideDirection, setSlideDirection] = useState("next");
    const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(false);
    const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: '',
        company: '',
        position: '',
        email: '',
        testimonial: '',
        rating: 5
    });

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

    const [errors, setErrors] = useState<any>({});
    const [submitStatus, setSubmitStatus] = useState<any>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));

        // Clear error when typing
        if (errors[name]) {
            setErrors((prev: any) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleRatingChange = (rating: number) => {
        setFormData((prev: any) => ({
            ...prev,
            rating
        }));
    };

    const validate = () => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // if (!formData.company.trim()) {
        //     newErrors.company = 'Company name is required';
        // }

        // if (!formData.position.trim()) {
        //     newErrors.position = 'Position is required';
        // }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.testimonial.trim()) {
            newErrors.testimonial = 'Please provide your testimonial';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (validate()) {
            // Simulate form submission
            setSubmitStatus('submitting');
            console.log(formData)

            axios.post(endpoints.testimonial.submit, formData)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });

            // Mock API call
            setTimeout(() => {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    company: '',
                    position: '',
                    email: '',
                    testimonial: '',
                    rating: 5
                });

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            }, 1500);
        }
    };

    // Star Rating component
    const StarRating = () => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none p-1"
                    >
                        <Star
                            size={24}
                            className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen pt-16 md:pt-10">
            {isTestimonialFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm p-5">
                    <div className="relative w-full md:w-1/2 h-5/6 md:h-full bg-white/50 rounded-2xl shadow-lg flex flex-col">
                        {/* Close button */}
                        <button
                            onClick={() => setIsTestimonialFormOpen(!isTestimonialFormOpen)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={28} className="text-gray-800" />
                        </button>

                        <div className="text-center mt-6">
                            <h2 className="text-3xl font-bold text-gray-800 font-mono">
                                Let Us Know How You Feel
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full h-full bg-white mt-4 rounded-b-2xl p-4">
                            {/* Your form content here */}
                            <form className='w-full h-full' onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name {errors.name && <span className="mt-1 text-red-500 text-sm font-normal">- {errors.name}</span>}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={18} className="text-gray-500" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`pl-10 w-full h-10 p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="company" className="block text-gray-700 mb-2 font-medium">Company {errors.company && <span className="mt-1 text-red-500 text-sm font-normal">- {errors.company}</span>}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Briefcase size={18} className="text-gray-500" />
                                        </div>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className={`pl-10 w-full h-10 p-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Your Company"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="position" className="block text-gray-700 mb-2 font-medium">Position {errors.position && <span className="mt-1 text-red-500 text-sm font-normal">- {errors.position}</span>}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={18} className="text-gray-500" />
                                        </div>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className={`pl-10 w-full h-10 p-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Product Manager"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address {errors.email && <span className="mt-1 text-red-500 text-sm font-normal">- {errors.email}</span>}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail size={18} className="text-gray-500" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`pl-10 w-full h-10 p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="testimonial" className="block text-gray-700 mb-2 font-medium">Your Testimonial {errors.testimonial && <span className="mt-1 text-red-500 text-sm font-normal">- {errors.testimonial}</span>}</label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 pointer-events-none">
                                            <MessageSquare size={18} className="text-gray-500" />
                                        </div>
                                        <textarea
                                            id="testimonial"
                                            name="testimonial"
                                            value={formData.testimonial}
                                            onChange={handleChange}
                                            rows={3}
                                            className={`pl-10 w-full p-3 border ${errors.testimonial ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Share your experience with our product or service..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="rating" className="block text-gray-700 mb-2 font-medium">Rating</label>
                                    <StarRating />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={submitStatus === 'submitting'}
                                        className="w-32 h-10 md:w-40 md:h-10 rounded text-[#7A3EFF] border-2 border-[#7A3EFF] flex items-center justify-center normal-case"
                                    >
                                        {submitStatus === 'submitting' ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} className="mr-2" />
                                                Submit
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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
                            <button
                                onClick={() => {
                                    setIsTestimonialFormOpen(!isTestimonialFormOpen);
                                }}
                                className="w-32 h-10 md:w-40 md:h-10 rounded text-[#7A3EFF] border-2 border-[#7A3EFF] flex items-center justify-center normal-case"
                            >
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
