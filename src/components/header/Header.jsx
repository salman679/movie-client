import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { SearchContext } from "../../context/SearchContext";

export default function Header() {
  const { user, Logout } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const { pathname } = useLocation();

  // Logout Function
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
    <div className="bg-gray-900 sticky top-0 z-50 backdrop-blur text-white">
      <div className="navbar  container mx-auto flex justify-between items-center py-4 px-6">
        <div className="navbar-start w-auto">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-white "
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
              className="menu menu-sm dropdown-content bg-gray-800 dark:text-white rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="text-white hover:text-red-500 mb-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="dark:bg-gray-700 mb-2">
                  All Movies
                </Link>
              </li>
              <li>
                <Link to="/add-movie" className="dark:bg-gray-700 mb-2">
                  Add Movie
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="dark:bg-gray-700 mb-2">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/extra" className="dark:bg-gray-700 mb-2">
                  Extra Page
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="dark:text-white font-bold text-xl">
            Movie Portal
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className=" hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-movies" className="hover:text-red-500">
                All Movies
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/add-movie" className="hover:text-red-500">
                    Add Movie
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/my-favorites/${user.email}`}
                    className="text-white hover:text-red-500"
                  >
                    My Favorites
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/about-us" className="text-white hover:text-red-500">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search By Title"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className={`input input-bordered dark:bg-gray-800 dark:text-white ${
                pathname === "/all-movies" ? "block" : "hidden"
              }`}
            />
          </div>

          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="  text-black  py-2 px-1 rounded"
          >
            {darkMode ? (
              <MdLightMode className="text-xl dark:text-gray-100 text-gray-700" />
            ) : (
              <MdDarkMode className="text-xl dark:text-gray-100 text-gray-700" />
            )}
          </button> */}
          {user ? (
            <div className="dropdown dropdown-end group">
              {/* Avatar Button */}
              <div role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={`${
                      user.photoURL ||
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }`}
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu bg-gray-700 text-white menu-sm dropdown-content  rounded-box z-50 w-52 p-2 shadow opacity-0 group-hover:opacity-100  invisible group-hover:visible transition-all duration-200"
              >
                <li className="hover:bg-gray-600 hover:rounded-lg">
                  <a className="justify-between">
                    {user.displayName || user.name}
                  </a>
                </li>
                <li className="hover:bg-gray-600 hover:rounded-lg">
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="btn bg-red-600 border-none hover:bg-red-700 text-white">
                  Login
                </button>
              </Link>

              <Link to="/auth/register">
                <button className="btn bg-red-600 border-none hover:bg-red-700 text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
