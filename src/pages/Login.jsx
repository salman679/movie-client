import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";

export default function Login() {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Form validation
  const validateForm = (email, password) => {
    const errors = {
      email: "",
      password: "",
      general: "",
    };

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validateForm(email, password)) {
      return;
    }

    const user = { email, password };
    setIsLoading(true);

    try {
      await signIn(user);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "Login successful. Redirecting you now...",
        showConfirmButton: false,
        timer: 1500,
        background: "#1e293b",
        color: "#fff",
        iconColor: "#dc2626",
      });
      navigate(from, { replace: true });
      e.target.reset();
    } catch (error) {
      setFormErrors({
        ...formErrors,
        general:
          error.message || "Login failed. Please check your credentials.",
      });
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Please check your credentials and try again.",
        confirmButtonColor: "#dc2626",
        background: "#1e293b",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Login successful. Redirecting you now...",
        showConfirmButton: false,
        timer: 1500,
        background: "#1e293b",
        color: "#fff",
        iconColor: "#dc2626",
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "An error occurred with Google sign-in.",
        confirmButtonColor: "#dc2626",
        background: "#1e293b",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Background animation
  const generateStars = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
    }));
  };

  const [stars] = useState(generateStars(100));

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 pt-24 pb-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 pt-8 pb-6 sm:px-8">
            <div className="text-center mb-8">
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Sign in to continue your movie journey
              </p>
            </div>

            {formErrors.general && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500/50 flex items-start"
              >
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{formErrors.general}</p>
              </motion.div>
            )}

            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className={`block w-full pl-10 pr-3 py-3 bg-gray-700/50 border ${
                      formErrors.email ? "border-red-500" : "border-gray-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent`}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`block w-full pl-10 pr-10 py-3 bg-gray-700/50 border ${
                      formErrors.password ? "border-red-500" : "border-gray-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
                <div className="text-sm text-right mt-2">
                  <Link
                    to="/auth/forgot-password"
                    className="text-[#dc2626] hover:text-[#ef4444]"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#dc2626] hover:bg-[#b91c1c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dc2626] transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  <span className="text-white">Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-900/50 sm:px-8">
            <p className="text-sm text-center text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                state={{ from }}
                className="font-medium text-[#dc2626] hover:text-[#ef4444]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* CSS Animation for stars */}
      <style type="text/css">{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
