import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { FiMenu } from "react-icons/fi";
export default function Header() {
  const { user, Logout } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { pathname } = useLocation();

  console.log(pathname);

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
    <div className="bg-gray-950 sticky top-0 z-50 backdrop-blur text-white">
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        <div className="navbar-start w-auto">
          <Link to="/" className="text-white font-bold text-xl">
            Movie Portal
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-white hover:text-red-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-movies"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-white hover:text-red-500"
                }
              >
                All Movies
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink
                    to="/add-movie"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-500 font-bold"
                        : "text-white hover:text-red-500 hover:font-bold"
                    }
                  >
                    Add Movie
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/my-favorites/${user.email}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-500 font-bold"
                        : "text-white hover:text-red-500"
                    }
                  >
                    My Favorites
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-white hover:text-red-500"
                }
              >
                About Us
              </NavLink>
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
              className={`input input-bordered hidden md:block bg-gray-800 text-white ${
                pathname === "/all-movies" ? "block" : "hidden"
              }`}
            />
          </div>
          {user ? (
            <div className="dropdown dropdown-end group">
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
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost right-0 pr-0 mr-0 lg:hidden"
            >
              <FiMenu className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-50 mt-3 w-52 p-2 -right-2  shadow"
            >
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 font-bold"
                      : "text-white hover:text-red-500"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-movies"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 font-bold"
                      : "text-white hover:text-red-500"
                  }
                >
                  All Movies
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/add-movie"
                      className={({ isActive }) =>
                        isActive
                          ? "text-red-500 font-bold"
                          : "text-white hover:text-red-500"
                      }
                    >
                      Add Movie
                    </NavLink>
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
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 font-bold"
                      : "text-white hover:text-red-500"
                  }
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
