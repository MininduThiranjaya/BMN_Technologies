// import { useState } from "react";
// import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import { toast } from "react-toastify";
// import { endpoints } from "../api";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "thiranjaya2017@gmail.com", password: "Abcd@1234" });
//   const [errors, setErrors] = useState<{
//     email?: string;
//     password?: string;
//   }>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<
//     "idle" | "submitting" | "success" | "error"
//   >("idle");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name as keyof typeof errors]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validate = () => {
//     const newErrors: typeof errors = {};
//     if (!formData.email.trim()) newErrors.email = "Username is required";
//     if (!formData.password.trim()) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitStatus("submitting");
//     try {
//       const res = await axios.post(endpoints.user.login, formData);
//       if (res.data.success) {
//         login(res.data.token, res.data.user); // Assuming the token is returned in the response
//         navigate("/dashboard");
//         toast.success("Login Successful..."); // Redirect to dashboard after login
//       }
//     } catch (err) {
//       const status = (err as any)?.response?.status;
//       if (status == 403) {
//         toast.error("Your account is suspended. Please contact support.");
//         setSubmitStatus("error");
//         setErrors({ password: "Your account is suspended. Please contact support." });
//       } else {
//         toast.error("Invalid Username or Password")
//         setSubmitStatus("error");
//         setErrors({ password: "Invalid username or password" });
//       }
//     } finally {
//       setSubmitStatus("idle");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <header className="absolute top-0 text-center w-full p-4 ">
//         <h1 className="text-5xl font-bold text-gray-800">BMN Technologies Admin</h1>
//       </header>
//       <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
//         <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label
//               htmlFor="userName"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Username
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail size={18} className="text-gray-400" />
//               </div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`pl-10 w-full p-3 border ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 } rounded-md focus:ring-indigo-500 focus:outline-none`}
//                 placeholder="Enter your username"
//                 required={true}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock size={18} className="text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`pl-10 pr-10 w-full p-3 border ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 } rounded-md focus:ring-indigo-500 focus:outline-none`}
//                 placeholder="Enter your password"
//                 required={true}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={submitStatus === "submitting"}
//             className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             {submitStatus === "submitting" ? (
//               <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                 />
//               </svg>
//             ) : (
//               <LogIn size={20} className="mr-2" />
//             )}
//             Sign In
//           </button>
//         </form>
//         <div className="flex justify-center p-5">
//           <button
//             className="text-indigo-600 hover:text-indigo-700 text-sm font-medium text-center"
//             onClick={() => {
//               navigate("/forget-password");
//             }}
//           >
//             Forget Password {"->"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, Sun } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { endpoints } from "../api";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "thiranjaya2017@gmail.com", password: "Abcd@1234" });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email.trim()) newErrors.email = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("submitting");
    try {
      const res = await axios.post(endpoints.user.login, formData);
      if (res.data.success) {
        login(res.data.token, res.data.user); // Assuming the token is returned in the response
        navigate("/dashboard");
        toast.success("Login Successful..."); // Redirect to dashboard after login
      }
    } catch (err) {
      const status = (err as any)?.response?.status;
      if (status == 403) {
        toast.error("Your account is suspended. Please contact support.");
        setSubmitStatus("error");
        setErrors({ password: "Your account is suspended. Please contact support." });
      } else {
        toast.error("Invalid Username or Password")
        setSubmitStatus("error");
        setErrors({ password: "Invalid username or password" });
      }
    } finally {
      setSubmitStatus("idle");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12 sm:px-6"
      style={{ background: "#0a0e14" }}
    >
      {/* Ambient accent glows */}
      <div
        className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#3b82f6" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#3b82f6" }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div
            className="w-14 h-14 rounded-xl rotate-12 flex items-center justify-center mb-5 shrink-0"
            style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
          >
            <Sun size={26} className="-rotate-12 text-white" />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black tracking-tight text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            BMN<span style={{ color: "#3b82f6" }}>-</span>Technology
          </h1>
          <p
            className="mt-1.5 text-sm text-gray-400"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 sm:p-8 border"
          style={{ background: "#111827", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <h2
            className="text-xl sm:text-2xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-400 mb-2 tracking-wide"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-11 w-full py-3 sm:py-3.5 px-4 rounded-lg text-sm text-white bg-black/20 border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } placeholder-gray-500 focus:outline-none transition-colors`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  placeholder="Enter your username"
                  required={true}
                  onFocus={(e) => {
                    if (!errors.email) e.currentTarget.style.borderColor = "#3b82f6";
                  }}
                  onBlur={(e) => {
                    if (!errors.email) e.currentTarget.style.borderColor = "";
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-400 mb-2 tracking-wide"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-11 pr-11 w-full py-3 sm:py-3.5 px-4 rounded-lg text-sm text-white bg-black/20 border ${
                    errors.password ? "border-red-500" : "border-white/10"
                  } placeholder-gray-500 focus:outline-none transition-colors`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  placeholder="Enter your password"
                  required={true}
                  onFocus={(e) => {
                    if (!errors.password) e.currentTarget.style.borderColor = "#3b82f6";
                  }}
                  onBlur={(e) => {
                    if (!errors.password) e.currentTarget.style.borderColor = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="w-full flex justify-center items-center py-3 sm:py-3.5 px-4 rounded-lg font-semibold text-sm sm:text-base text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
              style={{
                fontFamily: "Outfit, sans-serif",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                boxShadow: "0 8px 30px rgba(59,130,246,0.25)",
              }}
            >
              {submitStatus === "submitting" ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <LogIn size={20} className="mr-2" />
              )}
              Sign In
            </button>
          </form>

          <div className="flex justify-center pt-6">
            <button
              className="text-sm font-medium transition-colors"
              style={{ fontFamily: "Inter, sans-serif", color: "#3b82f6" }}
              onClick={() => {
                navigate("/forget-password");
              }}
            >
              Forget Password {"->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}