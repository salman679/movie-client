import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = { email, password };

    if (!email) {
      setErrorMessage("Email is required");
      return;
    } else if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    signIn(user)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/home");
        e.target.reset();
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire("Success", "Login Successful", "success");
        navigate("/home");
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-800 shadow-lg rounded-lg p-8 md:p-10 pt-13 sm:pt-16 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Login to Your Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="mt-1 w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <Link className="text-sm text-red-500 hover:underline block mt-2">
              Forget Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Or login with
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="text-red-500 hover:underline ml-1"
            >
              Google
            </button>
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?
            <Link
              to="/auth/register"
              className="text-red-500 hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
