import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Film, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";
// import MovieCard from "../components/movie/movieCard/MovieCard";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { searchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  // Fetch all movies from the server
  useEffect(() => {
    fetch(`${import.meta.env.VITE_api}/all-movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);

        // Extract unique genres and years for filters
        const uniqueGenres = [...new Set(data.map((movie) => movie.genre))];
        const uniqueYears = [
          ...new Set(data.map((movie) => movie.releaseYear)),
        ];
        setGenres(uniqueGenres);
        setYears(uniqueYears.sort((a, b) => b - a)); // Sort years in descending order
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          background: "#1f2937",
          color: "#fff",
          iconColor: "#dc2626",
          confirmButtonColor: "#dc2626",
        });
        setLoading(false);
      });
  }, []);

  // Filter and sort movies based on search term, filters, and sort option
  useEffect(() => {
    if (movies.length > 0) {
      let result = [...movies];

      // Apply search filter
      if (searchTerm) {
        result = result.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply genre filter
      if (selectedGenre !== "all") {
        result = result.filter((movie) => movie.genre === selectedGenre);
      }

      // Apply year filter
      if (selectedYear !== "all") {
        result = result.filter((movie) => movie.releaseYear === selectedYear);
      }

      // Apply sorting
      switch (sortBy) {
        case "title-asc":
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "title-desc":
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "rating-high":
          result.sort(
            (a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
          );
          break;
        case "rating-low":
          result.sort(
            (a, b) => Number.parseFloat(a.rating) - Number.parseFloat(b.rating)
          );
          break;
        case "newest":
          result.sort(
            (a, b) =>
              Number.parseInt(b.releaseYear) - Number.parseInt(a.releaseYear)
          );
          break;
        case "oldest":
          result.sort(
            (a, b) =>
              Number.parseInt(a.releaseYear) - Number.parseInt(b.releaseYear)
          );
          break;
        default:
          break;
      }

      setFilteredMovies(result);
    }
  }, [movies, searchTerm, selectedGenre, selectedYear, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedGenre("all");
    setSelectedYear("all");
    setSortBy("newest");
  };

  // Movie card component
  const MovieCard = ({ movie }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-3 right-3">
          <Badge className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
            {movie.rating} ★
          </Badge>
        </div>

        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className="bg-black/50 backdrop-blur-sm text-white border-gray-700"
          >
            {movie.genre}
          </Badge>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white"
          >
            See Details
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {movie.title}
        </h2>
        <div className="flex flex-wrap gap-2 text-sm text-gray-400">
          <div>{movie.duration} mins</div>
          <div>•</div>
          <div>{movie.releaseYear}</div>
        </div>
      </div>
    </motion.div>
  );

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  // Movie list item component (for list view)
  const MovieListItem = ({ movie }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-750"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 md:w-1/5">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-48 sm:h-full object-cover"
          />
        </div>
        <div className="p-4 sm:w-3/4 md:w-4/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">{movie.title}</h2>
              <Badge className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                {movie.rating} ★
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-sm text-gray-400">
              <Badge
                variant="outline"
                className="text-gray-300 border-gray-700"
              >
                {movie.genre}
              </Badge>
              <div>{movie.duration} mins</div>
              <div>{movie.releaseYear}</div>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="self-start mt-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white"
          >
            See Details
          </Button>
        </div>
      </div>
    </motion.div>
  );

  MovieListItem.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">All Movies</h1>
            <p className="text-gray-400">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"} found
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? (
                <div className="flex items-center text-gray-600">
                  <X className="w-4 h-4 mr-2" />
                  Hide Filters
                </div>
              ) : (
                <div className="flex items-center text-gray-600">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </div>
              )}
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-gray-300">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-300">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="rating-high">Highest Rated</SelectItem>
                <SelectItem value="rating-low">Lowest Rated</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                className={`rounded-r-none ${
                  viewMode === "grid"
                    ? "bg-[#dc2626] hover:bg-[#b91c1c]"
                    : "border-gray-700 text-gray-300"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                className={`rounded-l-none ${
                  viewMode === "list"
                    ? "bg-[#dc2626] hover:bg-[#b91c1c]"
                    : "border-gray-700 text-gray-300"
                }`}
                onClick={() => setViewMode("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-lg p-4 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Genre
                </label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Release Year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-gray-600 text-gray-600 "
              >
                Reset Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden"
                >
                  <Skeleton className="aspect-[2/3] w-full bg-gray-700" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="flex">
                    <Skeleton className="w-1/4 h-32 bg-gray-700" />
                    <div className="p-4 w-3/4">
                      <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                      <Skeleton className="h-4 w-1/2 mb-4 bg-gray-700" />
                      <Skeleton className="h-8 w-24 bg-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : filteredMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Film className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No movies found
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              We couldn&apos;t find any movies matching your search criteria.
              Try adjusting your filters or search term.
            </p>
            <Button
              onClick={resetFilters}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
            >
              Reset Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMovies.map((movie) => (
              <MovieListItem key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

AllMovies.propTypes = {
  movies: PropTypes.object.isRequired,
};
