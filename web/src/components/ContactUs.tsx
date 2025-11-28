import { useState } from "react";
import { User, Phone, Mail, MessageSquare, Send } from "lucide-react";
import type { FormErrors } from "../types/Form";
import axios from "axios";
import { endpoints } from "../api";

function ContactUs() {
    const [formData, setFormData] = useState<any>({
        userName: "",
        phoneNumber: "",
        email: "",
        issue: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [submitStatus, setSubmitStatus] = useState<any>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when typing
        if (errors[name]) {
            setErrors((prev: any) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validate = () => {
        const newErrors: FormErrors = {};

        if (!formData.userName.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[0-9\s\-()]+$/.test(formData.phoneNumber)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.issue.trim()) {
            newErrors.issue = "Please describe your issue";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (validate()) {
            // Simulate form submission
            setSubmitStatus("submitting");
            console.log(formData);

            // Mock API call

            axios.post(endpoints.contactUs.inform, formData)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.error(err);
                });

            setTimeout(() => {
                setSubmitStatus("success");
                setFormData({
                    userName: "",
                    phoneNumber: "",
                    email: "",
                    issue: "",
                });

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen pt-1 md:pt-6">
            {/*bg-color*/}
            <div className="w-full md:w-full h-full md:h-full flex-row items-center justify-center text-black gap-4">
                {/*bg-color*/}
                <div className="flex w-full md:w-full h-1/6 md:h-1/6 items-center justify-center">
                    {/*bg-color*/}
                    <h2 className="text-3xl md:text-4xl text-black font-semibold text-center md:text-center font-mono">
                        CONTACT US
                    </h2>
                </div>
                <div className="w-full md:w-full h-5/6 md:h-5/6 flex md:flex flex-col md:flex-row">
                    
                    <div className="flex flex-col w-full md:w-1/3 h-2/6 md:h-full p-3 md:p-10  text-black">
                        <div className="mb-4 md:pt-20">
                            <h2 className="text-xl md:text-2xl font-mono text-center">
                                Got a Question or Something's Not Working?
                            </h2>
                        </div>
                        <div className="rounded border-2 p-1 md:p-5">
                            <p className="text-lg md:text-xl font-mono text-center">
                                Don't worry — we're just a message away!
                            </p>
                            <p className="text-sm md:text-sm font-mono text-center">
                                Tell us what's going on or what you'd like to know, and our team will get back to you shortly.
                                For urgent matters, please mention it in your message so we can prioritize your request.
                            </p>
                        </div>
                    </div>
                    
                    {/*bg-color*/}
                    <form
                        className="flex w-full md:w-2/3 h-4/6 md:h-full items-start md:items-center justify-center"
                        onSubmit={handleSubmit}
                    >
                        {/*bg-color*/}
                        <div className="flex flex-col w-3/4 md:w-1/2 h-5/6">
                            <div className="mb-1 md:mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 mb-2 font-bold"
                                >
                                    Full Name{" "}
                                    {errors.name && (
                                        <span className="text-red-500 text-sm font-normal">
                                            - {errors.name}
                                        </span>
                                    )}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        className={`pl-10 w-full p-3 h-9 md:h-11 border ${errors.name ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 mb-2 font-bold"
                                >
                                    Phone Number{" "}
                                    {errors.name && (
                                        <span className="text-red-500 text-sm font-normal">
                                            - {errors.phone}
                                        </span>
                                    )}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-gray-500" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`pl-10 w-full p-3 h-9 md:h-11 border ${errors.phone ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="+94 7X XXX XXXX"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 mb-2 font-bold"
                                >
                                    Email Address{" "}
                                    {errors.phone && (
                                        <span className="text-red-500 text-sm font-normal">
                                            - {errors.email}
                                        </span>
                                    )}
                                </label>
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
                                        className={`pl-10 w-full p-3 h-9 md:h-11 border ${errors.email ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="issue"
                                    className="block text-gray-700 mb-2 font-bold"
                                >
                                    Describe Your Issue{" "}
                                    {errors.issue && (
                                        <span className="text-red-500 text-sm font-normal">
                                            - {errors.issue}
                                        </span>
                                    )}
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <MessageSquare size={18} className="text-gray-500" />
                                    </div>
                                    <textarea
                                        id="issue"
                                        name="issue"
                                        value={formData.issue}
                                        onChange={handleChange}
                                        rows={3}
                                        className={`pl-10 w-full p-3 border ${errors.issue ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Please describe how we can help you..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={submitStatus === "submitting"}
                                    className="w-32 h-10 md:w-40 md:h-10 rounded text-[#7A3EFF] border-2 border-[#7A3EFF] flex items-center justify-center normal-case"
                                >
                                    {submitStatus === "submitting" ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} className="mr-2" />
                                            Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
