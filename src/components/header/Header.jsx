import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-300">
            Movie Portal
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-blue-300">
            Home
          </a>
          <a href="/movies" className="hover:text-blue-300">
            All Movies
          </a>
          <a href="/add-movie" className="hover:text-blue-300">
            Add Movie
          </a>
          <a href="/favorites" className="hover:text-blue-300">
            My Favorites
          </a>
          <a href="/extra" className="hover:text-blue-300">
            Extra Page
          </a>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <button className="hover:text-blue-300">Login</button>
          <button className="hover:text-blue-300">Register</button>
          {/* Example User Icon */}
          <FaUserCircle
            className="text-2xl cursor-pointer"
            title="User Profile"
          />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button className="text-white hover:text-blue-300">
            {/* Mobile menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
