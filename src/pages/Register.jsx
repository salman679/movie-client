import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { updateUser, createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoUrl = formData.get("photoUrl");
    const password = formData.get("password");

    const user = { displayName: name, email, password, photoURL: photoUrl };

    if (!user.displayName || !user.email || !user.password) {
      return Swal.fire({
        icon: "error",
        title: "All fields are required",
        showConfirmButton: true,
        timer: 1500,
      });
    }

    setErrorMessage("");

    const passwordValidation = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );

    if (!passwordValidation.test(user.password)) {
      return setErrorMessage(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"
      );
    }

    createUser(user).then(() => {
      updateUser(user).then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/home");
        event.target.reset();
      });
    });
  }

  function handleGoogleLogin() {
    signInWithGoogle()
      .then(() => {
        Swal.fire("Success", "Login Successful", "success");
        navigate("/home");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-slate-800  text-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-slate-800  text-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-white"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              placeholder="Enter your Photo URL"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-slate-800  text-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create a password"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-slate-800 text-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-4 text-lg text-gray-500 dark:text-gray-400 hover:text-gray-700"
            >
              {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </button>
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            Sign Up with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a href="/auth/login" className="text-red-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
