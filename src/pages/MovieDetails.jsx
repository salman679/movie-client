import { PropTypes } from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import {
  Heart,
  Pencil,
  Trash2,
  Star,
  Clock,
  Calendar,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleDeleteMovie(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_api}/movie/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The movie has been deleted.",
                icon: "success",
                confirmButtonColor: "#dc2626",
                background: "#1f2937",
                color: "#fff",
              });
              navigate("/all-movies");
            }
          })
          .catch((error) => console.error("Error deleting movie:", error));
      }
    });
  }

  function handleFavorite(id) {
    fetch(`${import.meta.env.VITE_api}/add-favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: user.email,
        movieId: id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          Swal.fire({
            title: "Error",
            text: "Movie already exists in favorite",
            icon: "error",
            confirmButtonColor: "#dc2626",
            background: "#1f2937",
            color: "#fff",
          });
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.insertedId) {
          Swal.fire({
            title: "Added!",
            text: "Movie has been added to favorite.",
            icon: "success",
            confirmButtonColor: "#dc2626",
            background: "#1f2937",
            color: "#fff",
          });
        }
      })
      .catch((error) =>
        console.error("Error adding movie to favorite:", error)
      );
  }

  // Fetch movie details
  useEffect(() => {
    setLoading(true);

    // First fetch the current movie details
    fetch(`${import.meta.env.VITE_api}/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);

        // After getting movie details, fetch all movies and filter by genre
        setSimilarLoading(true);
        fetch(`${import.meta.env.VITE_api}/all-movies`)
          .then((res) => res.json())
          .then((allMovies) => {
            // Filter movies by the same genre and exclude current movie
            const filtered = allMovies
              .filter((m) => m.genre === data.genre && m._id !== id)
              .slice(0, 5); // Limit to 5 similar movies

            setSimilarMovies(filtered);
            setSimilarLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching all movies:", error);
            setSimilarLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [id]);

  // Similar Movie Card Component
  const SimilarMovieCard = ({ movie }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      <div className="aspect-[2/3] bg-gray-800">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-2 right-2">
          <Badge className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
            {movie.rating} <Star className="ml-1 h-3 w-3 fill-white" />
          </Badge>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white font-medium text-sm line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center text-xs text-gray-300 mt-1">
            <Clock className="w-3 h-3 mr-1" />
            <span>{movie.duration} mins</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  SimilarMovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-t-4 border-t-[#dc2626] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section with Backdrop */}
      <div
        className="relative h-[50vh] md:h-[60vh] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.poster})`,
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Movie Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="md:flex">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="md:w-1/3 p-6"
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold">
                      {movie.rating}{" "}
                      <Star className="ml-1 h-3 w-3 fill-white" />
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Details */}
              <div className="md:w-2/3 p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap gap-2 my-4">
                    <Badge
                      variant="outline"
                      className="text-gray-300 border-gray-600"
                    >
                      {movie.genre}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-gray-300 border-gray-600"
                    >
                      <Clock className="mr-1 h-3 w-3" /> {movie.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-gray-300 border-gray-600"
                    >
                      <Calendar className="mr-1 h-3 w-3" /> {movie.releaseYear}
                    </Badge>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                      Summary
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {movie.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      onClick={() => handleFavorite(movie._id)}
                      className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Favorites
                    </Button>
                    <Button
                      onClick={() => navigate(`/update-movie/${movie._id}`)}
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDeleteMovie(movie._id)}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Similar Movies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 mb-16"
          >
            <div className="flex items-center mb-6">
              <Film className="w-5 h-5 text-[#dc2626] mr-2" />
              <h2 className="text-2xl font-bold text-white">
                You Might Also Like
              </h2>
            </div>

            {similarLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse"
                  >
                    <Skeleton className="w-full h-full bg-gray-700" />
                  </div>
                ))}
              </div>
            ) : similarMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {similarMovies.map((movie) => (
                  <SimilarMovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg p-8 text-center">
                <p className="text-gray-400">
                  No similar movies found in the {movie.genre} genre.
                </p>
                <Button
                  onClick={() => navigate("/all-movies")}
                  variant="outline"
                  className="mt-4 border-gray-700 text-gray-600 hover:border-[#dc2626]"
                >
                  Browse All Movies
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
