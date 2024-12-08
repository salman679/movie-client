import { AuthContext } from "../../context/AllContext";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, Logout } = useContext(AuthContext);

  // // Logout Function
  function handleLogout() {
    Logout()
      .then(() => {
        return Swal.fire({
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  }

  return (
    <>
      <div className="navbar bg-base-100 container mx-auto flex justify-between items-center py-4 px-6">
        <div className="navbar-start w-auto">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-blue-300">
                  All Movies
                </Link>
              </li>
              <li>
                <Link to="/add-movie" className="hover:text-blue-300">
                  Add Movie
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-blue-300">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/extra" className="hover:text-blue-300">
                  Extra Page
                </Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Movie Portal</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="">
                All Movies
              </Link>
            </li>
            <li>
              <Link to="/add-movie" className="">
                Add Movie
              </Link>
            </li>
            <li>
              <Link to="/my-favorites" className="">
                My Favorites
              </Link>
            </li>
            <li>
              <Link to="/extra" className="">
                Extra Page
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered "
            />
          </div>

          {user ? (
            <div className="dropdown dropdown-end group">
              {/* Avatar Button */}
              <div role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={`${
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }`}
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 w-52 p-2 shadow opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200"
              >
                <li>
                  <a className="justify-between">{user.displayName}</a>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="btn">Login</button>
              </Link>

              <Link to="/auth/register">
                <button className="btn">Register </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
