// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { S, SectionLabel } from "../utils/utils";
// import { Phone, MessageCircle, Mail, MapPin, Clock, Loader2 } from "lucide-react";
// import { endpoints } from "../api/index"; // adjust path if different
// import type { FormContactErrors } from "../interfaces/Form";
// import type { SolarAssessmentForm } from "../interfaces/SolarAssessmentForm";

// // CONTACT SECTION

// const initialForm = {
//   userName: "",
//   phoneNumber: "",
//   email: "",
//   location: "",
//   propertyType: "residential",
//   monthlyElectricityBill: null,
//   interestedSolution: "not_sure",
//   message: "",
// };

// export function Contact() {
//   const [form, setForm] = useState<SolarAssessmentForm>(initialForm);
//   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<FormContactErrors>({});
//   const revertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const resetToForm = () => {
//     if (revertTimeoutRef.current) clearTimeout(revertTimeoutRef.current);
//     setStatus("idle");
//     setForm(initialForm);
//     setErrors({});
//   };

//   // Auto-revert back to the form 5s after a success or error result
//   useEffect(() => {
//     if (status === "success" || status === "error") {
//       revertTimeoutRef.current = setTimeout(() => {
//         resetToForm();
//       }, 5000);
//     }
//     return () => {
//       if (revertTimeoutRef.current) clearTimeout(revertTimeoutRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [status]);

//   const validate = (): boolean => {
//     const newErrors: FormContactErrors = {};

//     if (!form.userName.trim()) {
//       newErrors.userName = "Name is required";
//     }

//     if (!form.phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required";
//     }

//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!form.location.trim()) {
//       newErrors.location = "Location is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);

//     axios
//       .post(endpoints.solarAssessment.submit, form)
//       .then(() => {
//         setIsSubmitting(false);
//         setStatus("success");
//       })
//       .catch((err) => {
//         console.error(err);
//         setIsSubmitting(false);
//         setStatus("error");
//       });
//   };

//   return (
//     <div className={`py-24 ${S.ground} relative overflow-hidden`}>
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px"
//         style={{
//           background:
//             "linear-gradient(to right, transparent, var(--accent), transparent)",
//         }}
//       />
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         <div className="text-center mb-14">
//           <SectionLabel label="Get in Touch" />
//           <h1
//             className={`text-5xl lg:text-6xl font-black ${S.text}`}
//             style={{ fontFamily: "Outfit, sans-serif" }}
//           >
//             Get Your Free{" "}
//             <span className="text-(--accent)">Solar Assessment</span>
//           </h1>
//           <p
//             className={`mt-5 ${S.textSec} max-w-2xl mx-auto text-lg`}
//             style={{ fontFamily: "Inter, sans-serif" }}
//           >
//             Fill in the form below and our team will contact you to arrange a
//             free consultation and site assessment.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           <div className="flex flex-col gap-6">
//             <div className={`${S.surface} border ${S.border} rounded-2xl p-7`}>
//               <h3
//                 className={`text-lg font-bold ${S.text} mb-6`}
//                 style={{ fontFamily: "Outfit, sans-serif" }}
//               >
//                 Contact Information
//               </h3>
//               <div className="flex flex-col gap-5">
//                 {[
//                   { icon: Phone, label: "Phone", val: "+94 76 233 9108" },
//                   {
//                     icon: MessageCircle,
//                     label: "WhatsApp",
//                     val: "+94 76 233 9108",
//                   },
//                   { icon: Mail, label: "Email", val: "technologiesbmn@gmail.com" },
//                   {
//                     icon: MapPin,
//                     label: "Office",
//                     val: "No 78/B , Malwaththa road, Vidyala junction , Hokandara, Sri Lanka",
//                   },
//                   {
//                     icon: Clock,
//                     label: "Business Hours",
//                     val: "Mon-Fri 8am-6pm, Sat 8am-2pm",
//                   },
//                 ].map((c) => (
//                   <div key={c.label} className="flex items-start gap-3">
//                     <c.icon
//                       size={18}
//                       className="text-(--accent) mt-0.5 shrink-0"
//                     />
//                     <div>
//                       <div
//                         className={`text-xs ${S.textMuted} mb-0.5`}
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                       >
//                         {c.label}
//                       </div>
//                       <div
//                         className={`text-sm font-medium ${S.text}`}
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                       >
//                         {c.val}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className={`${S.surface} border ${S.border} rounded-2xl p-7`}>
//               <h3
//                 className={`text-sm font-bold ${S.text} mb-4`}
//                 style={{ fontFamily: "Outfit, sans-serif" }}
//               >
//                 Follow Us
//               </h3>
//               <div className="flex gap-3">
//                 {["facebook", "linkedin"].map((s) => (
//                   <div
//                     key={s}
//                     className={`w-10 h-10 border ${S.border} rounded-lg flex items-center justify-center ${S.textMuted} hover:text-(--accent) hover:border-(--accent) transition-all cursor-pointer`}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       {s === "facebook" && (
//                         <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
//                       )}
//                       {s === "linkedin" && (
//                         <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
//                       )}
//                     </svg>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             {status === "success" || status === "error" ? (
//               <div
//                 className={`${S.surface} border rounded-2xl p-14 text-center h-full flex flex-col items-center justify-center`}
//                 style={{ borderColor: status === "success" ? "var(--accent)" : "#ef4444" }}
//               >
//                 <div
//                   className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
//                     status === "success" ? "accent-gradient" : ""
//                   }`}
//                   style={status === "error" ? { background: "#ef4444" } : undefined}
//                 >
//                   {status === "success" ? (
//                     <svg
//                       width="28"
//                       height="28"
//                       fill="none"
//                       stroke="var(--accent-fg)"
//                       strokeWidth="2.5"
//                     >
//                       <path
//                         d="M5 13l5 5L19 7"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       width="28"
//                       height="28"
//                       fill="none"
//                       stroke="#fff"
//                       strokeWidth="2.5"
//                     >
//                       <path
//                         d="M6 6l16 16M22 6L6 22"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   )}
//                 </div>
//                 <h3
//                   className={`text-2xl font-black mb-3 ${S.text}`}
//                   style={{ fontFamily: "Outfit, sans-serif" }}
//                 >
//                   {status === "success" ? "Request Received!" : "Submission Failed"}
//                 </h3>
//                 <p
//                   className={`${S.textSec} max-w-sm`}
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                 >
//                   {status === "success"
//                     ? "Thank you! Our team will contact you within one business day to arrange your free consultation and site assessment."
//                     : "Something went wrong while submitting your request. Please try again in a moment."}
//                 </p>
//                 <button
//                   onClick={resetToForm}
//                   className={`mt-8 border ${S.border} ${S.textSec} px-6 py-2.5 rounded-lg text-sm hover:border-(--accent) hover:text-(--accent) transition-all`}
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                 >
//                   {status === "success" ? "Submit Another" : "Try Again"}
//                 </button>
//               </div>
//             ) : (
//               <form
//                 onSubmit={handleSubmit}
//                 className={`${S.surface} border ${S.border} rounded-2xl p-8 flex flex-col gap-6`}
//               >
//                 <h3
//                   className={`text-xl font-bold ${S.text}`}
//                   style={{ fontFamily: "Outfit, sans-serif" }}
//                 >
//                   Free Solar Assessment Request
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   {[
//                     {
//                       id: "userName",
//                       label: "Full Name *",
//                       placeholder: "Your full name",
//                       type: "text",
//                     },
//                     {
//                       id: "phoneNumber",
//                       label: "Phone Number *",
//                       placeholder: "+94 77 xxx xxxx",
//                       type: "tel",
//                     },
//                     {
//                       id: "email",
//                       label: "Email Address *",
//                       placeholder: "your@email.com",
//                       type: "email",
//                     },
//                     {
//                       id: "location",
//                       label: "Location / Area *",
//                       placeholder: "e.g. Jaffna, Colombo, Kandy",
//                       type: "text",
//                     },
//                   ].map((f) => (
//                     <div key={f.id} className="flex flex-col gap-2">
//                       <label
//                         htmlFor={f.id}
//                         className={`text-xs font-medium ${S.textSec} tracking-wide`}
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                       >
//                         {f.label}
//                       </label>
//                       <input
//                         id={f.id}
//                         type={f.type}
//                         placeholder={f.placeholder}
//                         value={form[f.id as keyof typeof form]!}
//                         onChange={(e) =>
//                           setForm((p) => ({ ...p, [f.id]: e.target.value }))
//                         }
//                         className={`${S.surface2} border ${
//                           errors[f.id as keyof FormContactErrors] ? "border-red-500" : S.border
//                         } rounded-lg px-4 py-3 text-sm ${S.text} placeholder-(--text-muted) focus:outline-none`}
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                         onFocus={(e) => {
//                           if (!errors[f.id as keyof FormContactErrors]) {
//                             e.currentTarget.style.borderColor = "var(--accent)";
//                           }
//                         }}
//                         onBlur={(e) => (e.currentTarget.style.borderColor = "")}
//                       />
//                       {errors[f.id as keyof FormContactErrors] && (
//                         <span className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
//                           {errors[f.id as keyof FormContactErrors]}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div className="flex flex-col gap-2">
//                     <label
//                       className={`text-xs font-medium ${S.textSec} tracking-wide`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     >
//                       Property Type
//                     </label>
//                     <select
//                       value={form.propertyType}
//                       onChange={(e) =>
//                         setForm((p) => ({ ...p, propertyType: e.target.value }))
//                       }
//                       className={`${S.surface2} border ${S.border} rounded-lg px-4 py-3 text-sm ${S.text} focus:outline-none`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                       onFocus={(e) =>
//                         (e.currentTarget.style.borderColor = "var(--accent)")
//                       }
//                       onBlur={(e) => (e.currentTarget.style.borderColor = "")}
//                     >
//                       <option value="residential">Residential Home</option>
//                       <option value="commercial">Commercial Building</option>
//                       <option value="industrial">Industrial / Factory</option>
//                       <option value="agricultural">Agricultural / Farm</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <label
//                       className={`text-xs font-medium ${S.textSec} tracking-wide`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     >
//                       Monthly Electricity Bill
//                     </label>
//                     <select
//                       value={form.monthlyElectricityBill!}
//                       onChange={(e) =>
//                         setForm((p) => ({ ...p, monthlyElectricityBill: e.target.value }))
//                       }
//                       className={`${S.surface2} border ${S.border} rounded-lg px-4 py-3 text-sm ${S.text} focus:outline-none`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                       onFocus={(e) =>
//                         (e.currentTarget.style.borderColor = "var(--accent)")
//                       }
//                       onBlur={(e) => (e.currentTarget.style.borderColor = "")}
//                     >
//                       <option value="">Select range</option>
//                       <option value="under_10000">Under Rs. 10,000</option>
//                       <option value="range_10000_30000">Rs. 10,000 - 30,000</option>
//                       <option value="range_30000_60000">Rs. 30,000 - 60,000</option>
//                       <option value="range_60000_100000">Rs. 60,000 - 100,000</option>
//                       <option value="over_100000">Over Rs. 100,000</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label
//                     className={`text-xs font-medium ${S.textSec} tracking-wide`}
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     Interested Solution
//                   </label>
//                   <div className="flex flex-wrap gap-3">
//                     {[
//                       { v: "on_grid", l: "On-Grid" },
//                       { v: "off_grid", l: "Off-Grid" },
//                       { v: "hybrid", l: "Hybrid" },
//                       { v: "not_sure", l: "Not Sure Yet" },
//                     ].map((o) => (
//                       <button
//                         key={o.v}
//                         type="button"
//                         onClick={() =>
//                           setForm((p) => ({ ...p, interestedSolution: o.v }))
//                         }
//                         className="px-4 py-2 rounded-lg text-xs font-medium transition-all border"
//                         style={{
//                           borderColor:
//                             form.interestedSolution === o.v
//                               ? "var(--accent)"
//                               : "var(--border)",
//                           color:
//                             form.interestedSolution === o.v
//                               ? "var(--accent)"
//                               : "var(--text-secondary)",
//                           background:
//                             form.interestedSolution === o.v
//                               ? "var(--accent-glow)"
//                               : "transparent",
//                           fontFamily: "Inter, sans-serif",
//                         }}
//                       >
//                         {o.l}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="message"
//                     className={`text-xs font-medium ${S.textSec} tracking-wide`}
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     Message / Additional Details
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     placeholder="Tell us about your property, energy needs, or any questions you have..."
//                     value={form.message}
//                     onChange={(e) =>
//                       setForm((p) => ({ ...p, message: e.target.value }))
//                     }
//                     className={`${S.surface2} border ${S.border} rounded-lg px-4 py-3 text-sm ${S.text} placeholder-(--text-muted) focus:outline-none resize-none`}
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                     onFocus={(e) =>
//                       (e.currentTarget.style.borderColor = "var(--accent)")
//                     }
//                     onBlur={(e) => (e.currentTarget.style.borderColor = "")}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="accent-gradient text-(--accent-fg) font-bold py-4 rounded-xl hover:opacity-90 transition-all text-base inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                   style={{
//                     fontFamily: "Outfit, sans-serif",
//                     boxShadow: "0 8px 30px var(--accent-glow)",
//                   }}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Get Your Free Solar Assessment
//                       <svg
//                         width="18"
//                         height="18"
//                         fill="none"
//                         stroke="var(--border-strong)"
//                         strokeWidth="2"
//                       >
//                         <path
//                           d="M4 9h10M10 5l4 4-4 4"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </>
//                   )}
//                 </button>
//                 <p
//                   className={`text-center text-xs ${S.textMuted}`}
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                 >
//                   We respond within 1 business day · All information is kept
//                   confidential
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { S, SectionLabel } from "../utils/utils";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import { endpoints } from "../api/index"; // adjust path if different
import type { FormContactErrors } from "../interfaces/Form";
import type { SolarAssessmentForm } from "../interfaces/SolarAssessmentForm";

// CONTACT SECTION

const initialForm = {
  userName: "",
  phoneNumber: "",
  email: "",
  location: "",
  propertyType: "residential",
  monthlyElectricityBill: null,
  interestedSolution: "not_sure",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<SolarAssessmentForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormContactErrors>({});
  // Separate local state for the bill field's error since it's not part of FormContactErrors
  const [billError, setBillError] = useState<string>("");
  const revertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetToForm = () => {
    if (revertTimeoutRef.current) clearTimeout(revertTimeoutRef.current);
    setStatus("idle");
    setForm(initialForm);
    setErrors({});
    setBillError("");
  };

  // Auto-revert back to the form 5s after a success or error result
  useEffect(() => {
    if (status === "success" || status === "error") {
      revertTimeoutRef.current = setTimeout(() => {
        resetToForm();
      }, 5000);
    }
    return () => {
      if (revertTimeoutRef.current) clearTimeout(revertTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const validate = (): boolean => {
    const newErrors: FormContactErrors = {};

    if (!form.userName.trim()) {
      newErrors.userName = "Name is required";
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }

    // Monthly electricity bill is optional, but if provided it must be a number
    let billValid = true;
    const billValue = form.monthlyElectricityBill;
    if (
      billValue !== null &&
      billValue !== undefined &&
      String(billValue).trim() !== ""
    ) {
      if (!/^\d+$/.test(String(billValue).trim())) {
        setBillError("Only numbers are allowed");
        billValid = false;
      } else {
        setBillError("");
      }
    } else {
      setBillError("");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && billValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    axios
      .post(endpoints.solarAssessment.submit, form)
      .then(() => {
        setIsSubmitting(false);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        setStatus("error");
      });
  };

  return (
    <div className={`py-24 ${S.ground} relative overflow-hidden`}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <SectionLabel label="Get in Touch" />
          <h1
            className={`text-5xl lg:text-6xl font-black ${S.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Get Your Free{" "}
            <span className="text-(--accent)">Solar Assessment</span>
          </h1>
          <p
            className={`mt-5 ${S.textSec} max-w-2xl mx-auto text-lg`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Fill in the form below and our team will contact you to arrange a
            free consultation and site assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-6">
            <div className={`${S.surface} border ${S.border} rounded-2xl p-7`}>
              <h3
                className={`text-lg font-bold ${S.text} mb-6`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Contact Information
              </h3>

              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    val: "+94 76 233 9108",
                    href: "tel:+94762339108",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    val: "+94 76 233 9108",
                    href: "https://wa.me/94762339108",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    val: "technologiesbmn@gmail.com",
                    href: "mailto:technologiesbmn@gmail.com",
                  },
                  {
                    icon: MapPin,
                    label: "Office",
                    val: "No 78/B, Malwaththa Road, Vidyala Junction, Hokandara, Sri Lanka",
                  },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    val: "Mon-Fri 8am-6pm, Sat 8am-2pm",
                  },
                ].map((c) => {
                  const content = (
                    <>
                      <c.icon
                        size={18}
                        className="text-(--accent) mt-0.5 shrink-0"
                      />
                      <div>
                        <div
                          className={`text-xs ${S.textMuted} mb-0.5`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {c.label}
                        </div>
                        <div
                          className={`text-sm font-medium ${S.text}`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {c.val}
                        </div>
                      </div>
                    </>
                  );

                  return c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target={
                        c.href.startsWith("https://") ? "_blank" : undefined
                      }
                      rel={
                        c.href.startsWith("https://")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-start gap-3 group"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={c.label} className="flex items-start gap-3">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${S.surface} border ${S.border} rounded-2xl p-7`}>
              <h3
                className={`text-sm font-bold ${S.text} mb-4`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Follow Us
              </h3>
              <div className="flex gap-3">
                {["facebook", "linkedin"].map((s) => (
                  <div
                    key={s}
                    className={`w-10 h-10 border ${S.border} rounded-lg flex items-center justify-center ${S.textMuted} hover:text-(--accent) hover:border-(--accent) transition-all cursor-pointer`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      {s === "facebook" && (
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      )}
                      {s === "linkedin" && (
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                      )}
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {status === "success" || status === "error" ? (
              <div
                className={`${S.surface} border rounded-2xl p-14 text-center h-full flex flex-col items-center justify-center`}
                style={{
                  borderColor:
                    status === "success" ? "var(--accent)" : "#ef4444",
                }}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    status === "success" ? "accent-gradient" : ""
                  }`}
                  style={
                    status === "error" ? { background: "#ef4444" } : undefined
                  }
                >
                  {status === "success" ? (
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="var(--accent-fg)"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 13l5 5L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M6 6l16 16M22 6L6 22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <h3
                  className={`text-2xl font-black mb-3 ${S.text}`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {status === "success"
                    ? "Request Received!"
                    : "Submission Failed"}
                </h3>
                <p
                  className={`${S.textSec} max-w-sm`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {status === "success"
                    ? "Thank you! Our team will contact you within one business day to arrange your free consultation and site assessment."
                    : "Something went wrong while submitting your request. Please try again in a moment."}
                </p>
                <button
                  onClick={resetToForm}
                  className={`mt-8 border ${S.border} ${S.textSec} px-6 py-2.5 rounded-lg text-sm hover:border-(--accent) hover:text-(--accent) transition-all`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {status === "success" ? "Submit Another" : "Try Again"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`${S.surface} border ${S.border} rounded-2xl p-8 flex flex-col gap-6`}
              >
                <h3
                  className={`text-xl font-bold ${S.text}`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Free Solar Assessment Request
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      id: "userName",
                      label: "Full Name *",
                      placeholder: "Your full name",
                      type: "text",
                    },
                    {
                      id: "phoneNumber",
                      label: "Phone Number *",
                      placeholder: "+94 77 xxx xxxx",
                      type: "tel",
                    },
                    {
                      id: "email",
                      label: "Email Address *",
                      placeholder: "your@email.com",
                      type: "email",
                    },
                    {
                      id: "location",
                      label: "Location / Area *",
                      placeholder: "e.g. Jaffna, Colombo, Kandy",
                      type: "text",
                    },
                  ].map((f) => (
                    <div key={f.id} className="flex flex-col gap-2">
                      <label
                        htmlFor={f.id}
                        className={`text-xs font-medium ${S.textSec} tracking-wide`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id as keyof typeof form]!}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [f.id]: e.target.value }))
                        }
                        className={`${S.surface2} border ${
                          errors[f.id as keyof FormContactErrors]
                            ? "border-red-500"
                            : S.border
                        } rounded-lg px-4 py-3 text-sm ${S.text} placeholder-(--text-muted) focus:outline-none`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                        onFocus={(e) => {
                          if (!errors[f.id as keyof FormContactErrors]) {
                            e.currentTarget.style.borderColor = "var(--accent)";
                          }
                        }}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                      />
                      {errors[f.id as keyof FormContactErrors] && (
                        <span
                          className="text-xs text-red-500"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {errors[f.id as keyof FormContactErrors]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className={`text-xs font-medium ${S.textSec} tracking-wide`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Property Type
                    </label>
                    <select
                      value={form.propertyType}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, propertyType: e.target.value }))
                      }
                      className={`${S.surface2} border ${S.border} rounded-lg px-4 py-3 text-sm ${S.text} focus:outline-none`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                    >
                      <option value="residential">Residential Home</option>
                      <option value="commercial">Commercial Building</option>
                      <option value="industrial">Industrial / Factory</option>
                      <option value="agricultural">Agricultural / Farm</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="monthlyElectricityBill"
                      className={`text-xs font-medium ${S.textSec} tracking-wide`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Monthly Electricity Bill (Rs.)
                    </label>
                    <input
                      id="monthlyElectricityBill"
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 25000"
                      value={form.monthlyElectricityBill ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;

                        // Allow clearing the field (null is a valid state)
                        if (val.trim() === "") {
                          setForm((p) => ({
                            ...p,
                            monthlyElectricityBill: null,
                          }));
                          setBillError("");
                          return;
                        }

                        // Only allow digits
                        if (!/^\d*$/.test(val)) {
                          setBillError("Only numbers are allowed");
                          return;
                        }

                        setBillError("");
                        setForm((p) => ({ ...p, monthlyElectricityBill: val }));
                      }}
                      className={`${S.surface2} border ${
                        billError ? "border-red-500" : S.border
                      } rounded-lg px-4 py-3 text-sm ${S.text} placeholder-(--text-muted) focus:outline-none`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                      onFocus={(e) => {
                        if (!billError) {
                          e.currentTarget.style.borderColor = "var(--accent)";
                        }
                      }}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                    />
                    {billError && (
                      <span
                        className="text-xs text-red-500"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {billError}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className={`text-xs font-medium ${S.textSec} tracking-wide`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Interested Solution
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { v: "on_grid", l: "On-Grid" },
                      { v: "off_grid", l: "Off-Grid" },
                      { v: "hybrid", l: "Hybrid" },
                      { v: "not_sure", l: "Not Sure Yet" },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() =>
                          setForm((p) => ({ ...p, interestedSolution: o.v }))
                        }
                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all border"
                        style={{
                          borderColor:
                            form.interestedSolution === o.v
                              ? "var(--accent)"
                              : "var(--border)",
                          color:
                            form.interestedSolution === o.v
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                          background:
                            form.interestedSolution === o.v
                              ? "var(--accent-glow)"
                              : "transparent",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className={`text-xs font-medium ${S.textSec} tracking-wide`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Message / Additional Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your property, energy needs, or any questions you have..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className={`${S.surface2} border ${S.border} rounded-lg px-4 py-3 text-sm ${S.text} placeholder-(--text-muted) focus:outline-none resize-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="accent-gradient text-(--accent-fg) font-bold py-4 rounded-xl hover:opacity-90 transition-all text-base inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    boxShadow: "0 8px 30px var(--accent-glow)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Your Free Solar Assessment
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="var(--border-strong)"
                        strokeWidth="2"
                      >
                        <path
                          d="M4 9h10M10 5l4 4-4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
                <p
                  className={`text-center text-xs ${S.textMuted}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  We respond within 1 business day · All information is kept
                  confidential
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
