import PropTypes from "prop-types";

export default function MovieCard({ movie }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-60 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
      <p className="text-gray-500 text-sm">{movie.genre}</p>
      <p className="text-gray-500 text-sm">Duration: {movie.duration}</p>
      <p className="text-gray-500 text-sm">Release: {movie.releaseYear}</p>
      <p className="text-gray-500 text-sm">Rating: {movie.rating}</p>
      <p className="text-gray-600 mt-2 text-sm">{movie.description}</p>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
