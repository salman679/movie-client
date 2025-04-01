import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Menu,
  X,
  Search,
  User,
  LogOut,
  Film,
  Heart,
  Plus,
  Info,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";

export default function Header() {
  const { user, Logout } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearch(false);
  }, [pathname]);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen || showSearch
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-[#dc2626]">Movie</span> Portal
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-[#dc2626] font-medium"
                  : "text-white hover:text-[#dc2626] transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-movies"
              className={({ isActive }) =>
                isActive
                  ? "text-[#dc2626] font-medium"
                  : "text-white hover:text-[#dc2626] transition-colors"
              }
            >
              All Movies
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/add-movie"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#dc2626] font-medium"
                      : "text-white hover:text-[#dc2626] transition-colors"
                  }
                >
                  Add Movie
                </NavLink>
                <NavLink
                  to={`/my-favorites/${user.email}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#dc2626] font-medium"
                      : "text-white hover:text-[#dc2626] transition-colors"
                  }
                >
                  My Favorites
                </NavLink>
              </>
            )}
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-[#dc2626] font-medium"
                  : "text-white hover:text-[#dc2626] transition-colors"
              }
            >
              About Us
            </NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            {pathname === "/all-movies" && (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-white hover:text-[#dc2626] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#dc2626]">
                      <img
                        src={
                          user.photoURL ||
                          user.photoUrl ||
                          "/placeholder.svg?height=36&width=36"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.displayName || user.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-gray-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth/login">
                  <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register" className="hidden md:block">
                  <Button
                    variant="outline"
                    className="hover:text-white text-gray-500 border-white hover:bg-white/10"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-[#dc2626] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        <AnimatePresence>
          {showSearch && pathname === "/all-movies" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden py-4"
            >
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  variant="ghost"
                  className="ml-2 text-white hover:text-[#dc2626]"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center py-2 ${
                    isActive ? "text-[#dc2626]" : "text-white"
                  }`
                }
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </NavLink>
              <NavLink
                to="/all-movies"
                className={({ isActive }) =>
                  `flex items-center py-2 ${
                    isActive ? "text-[#dc2626]" : "text-white"
                  }`
                }
              >
                <Film className="w-5 h-5 mr-3" />
                All Movies
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/add-movie"
                    className={({ isActive }) =>
                      `flex items-center py-2 ${
                        isActive ? "text-[#dc2626]" : "text-white"
                      }`
                    }
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Add Movie
                  </NavLink>
                  <NavLink
                    to={`/my-favorites/${user.email}`}
                    className={({ isActive }) =>
                      `flex items-center py-2 ${
                        isActive ? "text-[#dc2626]" : "text-white"
                      }`
                    }
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    My Favorites
                  </NavLink>
                </>
              )}
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `flex items-center py-2 ${
                    isActive ? "text-[#dc2626]" : "text-white"
                  }`
                }
              >
                <Info className="w-5 h-5 mr-3" />
                About Us
              </NavLink>

              {!user && (
                <Link to="/auth/register" className="md:hidden mt-2">
                  <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                    Register
                  </Button>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
