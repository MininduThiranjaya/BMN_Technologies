import { useState } from 'react';
import { User, Briefcase, Mail, MessageSquare, Send, Star } from 'lucide-react';
import axios from 'axios';
import { endpoints } from '../api';

export default function TestimonialForm() {
    const [formData, setFormData] = useState<any>({
        name: '',
        company: '',
        position: '',
        email: '',
        testimonial: '',
        rating: 5
    });

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

    interface FormErrors {
        name?: string;
        company?: string;
        position?: string;
        email?: string;
        testimonial?: string;
        rating?: string;
    }

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
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md py-16">
            <h2 className="text-4xl font-bold text-center mb-4">Share Your Experience</h2>
            <p className="text-center text-gray-600 mb-8">We value your feedback! Please share your experience with our product or service.</p>

            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                    Thank you for your testimonial! We appreciate your feedback.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
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
                            className={`pl-10 w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="company" className="block text-gray-700 mb-2 font-medium">Company</label>
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
                            className={`pl-10 w-full p-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Your Company"
                        />
                    </div>
                    {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="position" className="block text-gray-700 mb-2 font-medium">Position</label>
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
                            className={`pl-10 w-full p-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Product Manager"
                        />
                    </div>
                    {errors.position && <p className="mt-1 text-red-500 text-sm">{errors.position}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
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
                            className={`pl-10 w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="testimonial" className="block text-gray-700 mb-2 font-medium">Your Testimonial</label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare size={18} className="text-gray-500" />
                        </div>
                        <textarea
                            id="testimonial"
                            name="testimonial"
                            value={formData.testimonial}
                            onChange={handleChange}
                            rows={4}
                            className={`pl-10 w-full p-3 border ${errors.testimonial ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Share your experience with our product or service..."
                        ></textarea>
                    </div>
                    {errors.testimonial && <p className="mt-1 text-red-500 text-sm">{errors.testimonial}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="rating" className="block text-gray-700 mb-2 font-medium">Rating</label>
                    <StarRating />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center"
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
                                Submit Testimonial
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}