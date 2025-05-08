import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState<{
    userName?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("submitting");
    try {
      const res = await axios.post("http://localhost:8080/api/login", formData);
      if (res.data.success) {
        setLoginSuccess(true);
      } else {
        setSubmitStatus("error");
        setErrors({ password: "Invalid username or password" });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setSubmitStatus("idle");
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg text-center space-y-4">
          <h2 className="text-3xl font-bold text-green-600">
            Login Successful
          </h2>
          <button
            onClick={() => setLoginSuccess(false)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className={`pl-10 w-full p-3 border ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:outline-none`}
                placeholder="Enter your username"
              />
            </div>
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 pr-10 w-full p-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-indigo-500 focus:outline-none`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitStatus === "submitting"}
            className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
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
      </div>
    </div>
  );
}
