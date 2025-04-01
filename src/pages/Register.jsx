import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  LinkIcon,
  Lock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function Register() {
  const { updateUser, createUser, signInWithGoogle } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
    general: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 25;
    // Lowercase letters check
    if (/[a-z]/.test(password)) strength += 25;
    // Uppercase letters check
    if (/[A-Z]/.test(password)) strength += 25;
    // Numbers check
    if (/[0-9]/.test(password)) strength += 25;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getStrengthLabel = (strength) => {
    if (strength === 0) return { label: "None", color: "gray" };
    if (strength <= 25) return { label: "Weak", color: "red" };
    if (strength <= 50) return { label: "Fair", color: "orange" };
    if (strength <= 75) return { label: "Good", color: "yellow" };
    return { label: "Strong", color: "green" };
  };

  const strengthInfo = getStrengthLabel(passwordStrength);

  // Form validation
  const validateForm = (name, email, photoUrl, password) => {
    const errors = {
      name: "",
      email: "",
      photoUrl: "",
      password: "",
      general: "",
    };

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!photoUrl) {
      errors.photoUrl = "Photo URL is required";
    } else {
      try {
        new URL(photoUrl);
      } catch {
        errors.photoUrl = "Please enter a valid URL";
      }
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
      errors.password =
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number";
    }

    setFormErrors(errors);
    return (
      !errors.name && !errors.email && !errors.photoUrl && !errors.password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoUrl = formData.get("photoUrl");
    const password = formData.get("password");

    if (!validateForm(name, email, photoUrl, password)) {
      return;
    }

    const user = { displayName: name, email, password, photoURL: photoUrl };
    setIsLoading(true);

    try {
      await createUser(user);
      await updateUser(user);

      Swal.fire({
        icon: "success",
        title: "Welcome to Movie Portal!",
        text: "Your account has been created successfully.",
        showConfirmButton: false,
        timer: 2000,
        background: "#1e293b",
        color: "#fff",
        iconColor: "#dc2626",
      });

      navigate(from, { replace: true });
      e.target.reset();
    } catch (error) {
      setFormErrors({
        ...formErrors,
        general: error.message || "Registration failed. Please try again.",
      });

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Please check your information and try again.",
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
        text: "Registration successful. Redirecting you now...",
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
        title: "Sign Up Failed",
        text: error.message || "An error occurred with Google sign-in.",
        confirmButtonColor: "#dc2626",
        background: "#1e293b",
        color: "#fff",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate floating popcorn elements
  const generatePopcorn = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 10,
      x: Math.random() * 100,
      y: Math.random() * 25 + 75, // Start from bottom
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));
  };

  const [popcorn] = useState(generatePopcorn(15));

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4 pt-24 pb-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated popcorn background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {popcorn.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-yellow-100/30 filter blur-sm"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              bottom: `-${p.size}px`,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 pt-8 pb-6 sm:px-8">
            <div className="text-center mb-8">
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Join our community of movie enthusiasts
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

            <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    className={`block w-full pl-10 pr-3 py-3 bg-gray-700/50 border ${
                      formErrors.name ? "border-red-500" : "border-gray-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent`}
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

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
                    placeholder="your.email@example.com"
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
                  htmlFor="photoUrl"
                  className="block text-sm font-medium text-gray-300"
                >
                  Profile Photo URL
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="photoUrl"
                    name="photoUrl"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    className={`block w-full pl-10 pr-3 py-3 bg-gray-700/50 border ${
                      formErrors.photoUrl ? "border-red-500" : "border-gray-600"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent`}
                  />
                </div>
                {formErrors.photoUrl && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.photoUrl}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  {password && (
                    <span
                      className={`text-xs font-medium text-${strengthInfo.color}-500`}
                    >
                      {strengthInfo.label}
                    </span>
                  )}
                </div>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          passwordStrength <= 25
                            ? "bg-red-500"
                            : passwordStrength <= 50
                            ? "bg-orange-500"
                            : passwordStrength <= 75
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center">
                        <span className="text-xs mr-2">
                          {/[a-z]/.test(password) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-gray-500" />
                          )}
                        </span>
                        <span className="text-xs text-gray-400">
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">
                          {/[A-Z]/.test(password) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-gray-500" />
                          )}
                        </span>
                        <span className="text-xs text-gray-400">
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">
                          {/[0-9]/.test(password) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-gray-500" />
                          )}
                        </span>
                        <span className="text-xs text-gray-400">Number</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">
                          {password.length >= 6 ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-gray-500" />
                          )}
                        </span>
                        <span className="text-xs text-gray-400">
                          At least 6 characters
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {formErrors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
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
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
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
                    Or sign up with
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
                  <span className="text-white">Sign up with Google</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-900/50 sm:px-8">
            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-[#dc2626] hover:text-[#ef4444]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* CSS Animation for floating popcorn */}
      <style type="text/css">{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
