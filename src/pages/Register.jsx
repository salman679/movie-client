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

    //reset error message
    setErrorMessage("");

    const passwordValidation = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );

    if (!passwordValidation.test(user.password)) {
      return setErrorMessage(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter and one number"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border rounded-md dark:text-white dark:bg-gray-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-md dark:text-white dark:bg-gray-800 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              Photo Url
            </label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              placeholder="Enter your Photo Url"
              className="mt-1 w-full px-4 py-2 border dark:text-white dark:bg-gray-800 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium dark:text-white text-gray-700"
            >
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              name="password"
              placeholder="Create a password"
              className="mt-1 relative w-full px-4 py-2 border dark:text-white dark:bg-gray-800 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-11 right-4 transform -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>

        {/* register with google */}
        <div className="flex items-center justify-center mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
