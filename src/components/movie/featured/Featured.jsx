import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Film, TrendingUp, Award, Search, Filter, Grid, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { UpcomingMovies } from "../../upcoming/Upcoming";
import { TopDirectors } from "../../directors/TopDirectors";
import MovieCard from "../movieCard/MovieCard";

const MovieSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const navigate = useNavigate();

  // Categories with icons and colors
  const categories = [
    { name: "Action", icon: "🔥", color: "from-red-600/20 to-orange-600/20" },
    { name: "Comedy", icon: "😂", color: "from-yellow-600/20 to-amber-600/20" },
    { name: "Drama", icon: "🎭", color: "from-blue-600/20 to-indigo-600/20" },
    { name: "Sci-Fi", icon: "🚀", color: "from-purple-600/20 to-pink-600/20" },
    { name: "Horror", icon: "👻", color: "from-gray-600/20 to-slate-600/20" },
    { name: "Romance", icon: "❤️", color: "from-pink-600/20 to-rose-600/20" },
    {
      name: "Fantasy",
      icon: "🧙",
      color: "from-emerald-600/20 to-teal-600/20",
    },
    { name: "Thriller", icon: "🔍", color: "from-cyan-600/20 to-sky-600/20" },
  ];

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_api}/movies`);
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on category and search query
  useEffect(() => {
    let result = [...movies];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((movie) => movie.genre === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.genre.toLowerCase().includes(query)
      );
    }

    setFilteredMovies(result);
  }, [selectedCategory, searchQuery, movies]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category);
      setShowAllMovies(true); // Show all movies when a category is selected
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setShowAllMovies(false);
  };

  // Section header component
  const SectionHeader = ({ icon, title, description }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          {icon}
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-gray-400 max-w-2xl">{description}</p>
      </div>
    </div>
  );

  SectionHeader.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Category Section */}
        <section className="mb-20 py-8 bg-gradient-to-b from-black to-gray-900 rounded-xl">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Discover Movies by Category
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our vast collection of films across various genres
              </p>
            </motion.div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search movies by title or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
                />
              </div>

              {(selectedCategory || searchQuery) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-gray-700 text-gray-600 hover:text-white hover:bg-[#dc2626] hover:border-[#dc2626] hover:shadow-lg hover:shadow-[#dc2626]/20 transition-all duration-300"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`bg-gradient-to-br ${
                    category.color
                  } rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#dc2626]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    selectedCategory === category.name
                      ? "ring-2 ring-[#dc2626] shadow-lg shadow-[#dc2626]/20"
                      : ""
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filtered Movies Section (shows when a category is selected or search is active) */}
        {(showAllMovies || searchQuery) && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Filter className="w-6 h-6 text-[#dc2626]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedCategory
                      ? `${selectedCategory} Movies`
                      : "Search Results"}
                  </h2>
                </div>
                <p className="text-gray-400">
                  {filteredMovies.length}{" "}
                  {filteredMovies.length === 1 ? "movie" : "movies"} found
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate("/all-movies")}
                className="border-gray-700 text-gray-600 hover:text-white hover:bg-[#dc2626] hover:border-[#dc2626] hover:shadow-lg hover:shadow-[#dc2626]/20 transition-all duration-300"
              >
                <Grid className="mr-2 h-4 w-4" />
                View All Movies
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-[350px] rounded-xl bg-gray-800 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {filteredMovies.slice(0, 10).map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={{ ...movie, rating: Number(movie.rating) }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No movies found
                </h3>
                <p className="text-gray-400 mb-6">
                  We couldn&apos;t find any movies matching your criteria.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {filteredMovies.length > 10 && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => navigate("/all-movies")}
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                >
                  View All {filteredMovies.length} Movies
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Featured Movies */}
        <section className="mb-20">
          <SectionHeader
            icon={<Film className="w-6 h-6 text-[#dc2626]" />}
            title="Featured Movies"
            description="Explore our handpicked selection of must-watch films that have captivated audiences worldwide."
          />

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-[350px] rounded-xl bg-gray-800 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                nextEl: ".featured-next",
                prevEl: ".featured-prev",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 },
              }}
              modules={[Navigation, Pagination]}
              className="movie-swiper"
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie._id}>
                  <MovieCard
                    movie={{ ...movie, rating: Number(movie.rating) }}
                  />
                </SwiperSlide>
              ))}

              <div className="flex justify-end space-x-2 mt-6">
                <button className="featured-prev p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="featured-next p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </Swiper>
          )}
        </section>

        {/* Upcoming Movies */}
        <section className="mb-20">
          <SectionHeader
            icon={<TrendingUp className="w-6 h-6 text-[#dc2626]" />}
            title="Upcoming Movies"
            description="Get a sneak peek at the most anticipated films coming soon to theaters."
          />

          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            navigation={{
              nextEl: ".upcoming-next",
              prevEl: ".upcoming-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            modules={[Navigation]}
            className="upcoming-swiper"
          >
            <UpcomingMovies />

            <div className="flex justify-end space-x-2 mt-6">
              <button className="upcoming-prev p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="upcoming-next p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </Swiper>
        </section>

        {/* Top Directors */}
        <section>
          <SectionHeader
            icon={<Award className="w-6 h-6 text-[#dc2626]" />}
            title="Top Directors"
            description="Discover the visionary filmmakers behind some of cinema's greatest masterpieces."
          />

          <TopDirectors />
        </section>
      </div>
    </div>
  );
};

export default MovieSection;
