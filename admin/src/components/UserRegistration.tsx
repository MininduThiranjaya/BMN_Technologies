import { useEffect, useState } from "react";
import { User, Mail, Lock, Phone, Shield, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormData, FormErrors } from "../interfaces/User_Interface"
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../api";

interface AdminUserRegistrationProps {
  darkMode?: boolean;
}

export default function AdminUserRegistration({ darkMode = false }: AdminUserRegistrationProps) {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    try {
      const res = await axios.get(endpoints.user.dashboardUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data.success && !res.data.object.suspended == false) {
        logout();
        navigate("/");
      }
    } catch (err) {
      logout(); // Ensure to log out if fetching fails
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);


  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme tokens — mirrors the Dashboard's theme pattern so this stays in sync visually
  const theme = darkMode
    ? {
        panel: "bg-[#111827]",
        panelBorder: "border-white/10",
        innerPanel: "bg-[#0d1420]",
        innerBorder: "border-white/10",
        text: "text-white",
        textSub: "text-gray-300",
        textMuted: "text-gray-400",
        inputBg: "bg-black/20",
        inputBorder: "border-white/10",
        inputBorderError: "border-red-500",
        inputText: "text-white",
        placeholder: "placeholder-gray-500",
        iconColor: "text-gray-500",
        iconHover: "hover:text-gray-300",
        badgeBg: "bg-blue-500/10",
      }
    : {
        panel: "bg-white",
        panelBorder: "border-gray-200",
        innerPanel: "bg-white",
        innerBorder: "border-gray-200",
        text: "text-gray-800",
        textSub: "text-gray-700",
        textMuted: "text-gray-600",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputBorderError: "border-red-400",
        inputText: "text-gray-800",
        placeholder: "placeholder-gray-400",
        iconColor: "text-gray-400",
        iconHover: "hover:text-gray-600",
        badgeBg: "bg-blue-50",
      };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.role == "not_selected") {
      newErrors.role = "Role is required";
    }

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone number validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    return newErrors;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      return;
    }

    setIsSubmitting(true);

    const res = await axios.post(
      "http://localhost:8080/api/admin/auth/register",
      {
        userName: formData.username,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success) {
      toast.success("Admin user registered successfully!");
      console.log(res);
      setFormData({
        username: "",
        email: "",
        role: "not_selected",
        password: "Abcd@123",
        confirmPassword: "",
        phoneNumber: "",
      });
      setIsSubmitting(false);
    } else {
      toast.error("Failed to register admin user");
      setErrors({ username: res.data.message });
      setIsSubmitting(false)
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}>
        <div className={`p-6 border-b ${theme.panelBorder} shrink-0`}>
          <h3 className={`text-xl font-semibold ${theme.text}`}>
            Admin User Registration
          </h3>
        </div>
        <div
          className={`p-4 sm:p-8 ${theme.panel} flex flex-col items-center justify-start overflow-y-auto`}
          style={{ maxHeight: "calc(100vh - 14rem)" }}
        >
          <div
            className={`w-full max-w-2xl ${theme.innerPanel} rounded-xl shadow-lg border ${theme.innerBorder} p-6 sm:p-10`}
          >
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4`} style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-bold ${theme.text} mb-2`}>
                Admin Registration
              </h2>
              <p className={`text-sm sm:text-base ${theme.textMuted}`}>
                Create your administrator account
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className={`block text-sm font-medium ${theme.textSub} mb-2`}
                  >
                    Username
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.iconColor}`} />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 ${theme.inputBg} border ${
                        errors.username ? theme.inputBorderError : theme.inputBorder
                      } rounded-lg ${theme.inputText} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Enter username"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${theme.textSub} mb-2`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.iconColor}`} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 ${theme.inputBg} border ${
                        errors.email ? theme.inputBorderError : theme.inputBorder
                      } rounded-lg ${theme.inputText} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Enter email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className={`block text-sm font-medium ${theme.textSub} mb-2`}
                >
                  User Role
                </label>

                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full pl-4 pr-4 py-3 ${theme.inputBg} border ${
                      errors.role ? theme.inputBorderError : theme.inputBorder
                    } rounded-lg ${theme.inputText} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  >
                    <option value="not_selected">Select user role</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {errors.role && (
                  <p className="mt-1 text-sm text-red-400">{errors.role}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${theme.textSub} mb-2`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.iconColor}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 ${theme.inputBg} border ${
                        errors.password ? theme.inputBorderError : theme.inputBorder
                      } rounded-lg ${theme.inputText} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.iconColor} ${theme.iconHover} transition-colors`}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium ${theme.textSub} mb-2`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.iconColor}`} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 ${theme.inputBg} border ${
                        errors.confirmPassword
                          ? theme.inputBorderError
                          : theme.inputBorder
                      } rounded-lg ${theme.inputText} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.iconColor} ${theme.iconHover} transition-colors`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className={`block text-sm font-medium ${theme.textSub} mb-2`}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.iconColor}`} />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 ${theme.inputBg} border ${
                      errors.phoneNumber
                        ? theme.inputBorderError
                        : theme.inputBorder
                    } rounded-lg ${theme.inputText} ${theme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full text-white font-semibold py-3.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  boxShadow: "0 8px 24px rgba(59,130,246,0.25)",
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Admin Account"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}