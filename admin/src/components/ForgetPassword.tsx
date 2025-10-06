import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Key } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { endpoints } from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: verification, 3: new password
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendCode = (e: any) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address");
      return;
    } else {
      setIsLoading(true);
      const emailMessage = {
        to: email,
        subject: "Verifing User - For Password Changing",
        body: "",
      };
      axios
        .post(endpoints.user.fogetPasswordSendEmail, emailMessage)
        .then((res) => {
          console.log(res);
          toast.success("Send verification email successfully...");
          setIsLoading(false);
          setStep(2);
        })
        .catch((error) => {
          toast.error("Send verification email not successfull...");
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  const handleVerifyCode = (e: any) => {
    e.preventDefault();
    if (!verificationCode) {
      setMessage("Invalid verification code. Please try again.");
      return;
    } else {
      const verifyCode = {
        email: email,
        code: verificationCode,
      };
      axios
        .post(endpoints.user.verifyCode, verifyCode)
        .then((res) => {
          console.log(res);
          toast.success("Code verified...");
          setIsLoading(false);
          setStep(3);
        })
        .catch((error) => {
          toast.success("Failed code verification...");
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    const changePassword = {
      email: email,
      newPassword: newPassword,
    };
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      setMessage("Password must contain uppercase, lowercase, and number");
      return;
    }
    setIsLoading(true);
    axios
      .put(endpoints.user.forgetPassword_changePassword, changePassword)
      .then((res) => {
        console.log(res);
        toast.success(
          "Password reset successfully! You can now sign in with your new password..."
        );
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        toast.success("Failed resetting password...");
        setIsLoading(false);
        setStep(1);
        console.log(error);
      });

    setEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const resetToStep1 = () => {
    setStep(1);
    setVerificationCode("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Success notification */}
      <div className="absolute top-4 right-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm">Ready to reset password...</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify Code"}
            {step === 3 && "Reset Password"}
          </h1>
          <p className="text-gray-600 text-sm">
            {step === 1 && "Enter your email to receive a verification code"}
            {step === 2 && "Enter the 5-digit code sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@gmail.com"
                  required={true}
                />
              </div>
            </div>

            <button
              onClick={handleSendCode}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Code...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Verification Code
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Verification */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(
                      e.target.value.replace(/\D/g, "").slice(0, 5)
                    )
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-lg font-mono tracking-widest"
                  placeholder="12345"
                  maxLength={5}
                  required={true}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter the 5-digit code sent to {email}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetToStep1}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleVerifyCode}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Verify Code
              </button>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required={true}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required={true}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Reset Password
                </>
              )}
            </button>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes("successfully") || message.includes("verified")
                ? "bg-green-50 text-green-700 border border-green-200"
                : message.includes("Invalid") || message.includes("not match")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Back to Sign In */}
        {step === 1 && (
          <div className="mt-6 text-center">
            <button
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              onClick={() => {
                navigate(-1);
              }}
            >
              ← Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
