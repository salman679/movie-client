import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, Film, Eye, Clock, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleDeleteFavorite(id) {
    Swal.fire({
      title: "Remove from favorites?",
      text: "Are you sure you want to remove this movie from your favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_api}/favorites/${user.email}/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setFavoriteMovies(
                favoriteMovies.filter((movie) => movie._id !== id)
              );
              Swal.fire({
                title: "Removed!",
                text: "The movie has been removed from your favorites.",
                icon: "success",
                confirmButtonColor: "#dc2626",
                background: "#1f2937",
                color: "#fff",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting movie:", error);
            Swal.fire({
              title: "Error",
              text: "There was a problem removing this movie.",
              icon: "error",
              confirmButtonColor: "#dc2626",
              background: "#1f2937",
              color: "#fff",
            });
          });
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_api}/favorites/` + user.email)
      .then((res) => res.json())
      .then((data) => {
        setFavoriteMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorite movies:", error);
        setLoading(false);
      });
  }, [user.email]);

  return (
    <div className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 text-[#dc2626] mr-3" />
          <h1 className="text-3xl font-bold text-white">
            Your Favorite Movies
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <Skeleton className="w-full h-64 bg-gray-700" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-1/2 mb-4 bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        ) : favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {favoriteMovies.map((movie) => (
                <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group"
                >
                  <div className="relative">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-3 right-3">
                      <Badge className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        {movie.rating}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                      <Badge
                        variant="outline"
                        className="bg-black/50 backdrop-blur-sm text-white border-gray-700"
                      >
                        {movie.genre}
                      </Badge>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-black/50 backdrop-blur-sm border-gray-700 text-white hover:bg-white/20"
                          onClick={() => navigate(`/movie/${movie._id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-black/50 backdrop-blur-sm border-gray-700 text-white hover:bg-red-500/20"
                          onClick={() => handleDeleteFavorite(movie._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {movie.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-500" />
                        {movie.duration} mins
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        {movie.releaseYear}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                      onClick={() => handleDeleteFavorite(movie._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove from Favorites
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No favorite movies yet
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              You haven&apos;t added any movies to your favorites list. Browse
              our collection and add some movies you love!
            </p>
            <Button
              onClick={() => navigate("/all-movies")}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
            >
              <Film className="w-4 h-4 mr-2" />
              Browse Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
