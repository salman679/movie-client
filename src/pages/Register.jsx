import { useContext, useState } from "react";
import { AuthContext } from "../context/AllContext";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Swal from "sweetalert2";

export default function Register() {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoUrl = formData.get("photoUrl");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const user = { name, email, password };

    if (!user.name || !user.email || !user.password) {
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

    if (user.password)
      if (user.password !== confirmPassword) {
        return Swal.fire({
          icon: "error",
          title: "Passwords do not match",
          showConfirmButton: true,
          timer: 1500,
        });
      }

    createUser(user).then(() => {
      const userForDB = { name, email, photoUrl };

      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userForDB),
      })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Account Created Successfully",
              showConfirmButton: true,
              timer: 1500,
            });

            setUser(userForDB);
            event.target.reset();
          }
        })
        .catch((error) => Swal.fire("Error", error.message, "error"));
    });
  }

  function handleGoogleLogin() {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);

        const userForDB = {
          name: res.user.displayName,
          email: res.user.email,
          photoUrl: res.user.photoURL,
        };

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(userForDB),
        })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Login Successful",
                showConfirmButton: true,
                timer: 1500,
              });

              setUser(res.user);
            }
          })
          .catch((error) => Swal.fire("Error", error.message, "error"));
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Photo Url
            </label>
            <input
              type="text"
              id="photoUrl"
              name="photoUrl"
              placeholder="Enter your Photo Url"
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              name="password"
              placeholder="Create a password"
              className="mt-1 relative w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="confirm-password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-11 right-4 transform -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </button>
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
