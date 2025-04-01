import { useState } from "react";
import { Heart, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-xl">
        <img
          src={movie.poster || "/placeholder.svg?height=450&width=300"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-[#dc2626] text-white rounded-full px-2 py-1 text-xs font-bold flex items-center">
          <Star className="w-3 h-3 mr-1 fill-white" />
          {movie.rating.toFixed(1)}
        </div>

        {/* Favorite Button */}
        <button
          className="absolute top-2 left-2 bg-black/40 hover:bg-[#dc2626] text-white rounded-full p-1.5 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add favorite logic here
          }}
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg line-clamp-1 group-hover:line-clamp-none transition-all">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 mt-1 text-gray-300 text-sm">
            <span className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
              {movie.genre}
            </span>
            {movie.duration && (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {movie.duration}
              </span>
            )}
          </div>

          {/* View Details Button - Only visible on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <Link
              to={`/movie/${movie._id}`}
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-medium py-1.5 px-3 rounded-full inline-block transition-colors"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

import PropTypes from "prop-types";

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
