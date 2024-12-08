import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  });
  return (
    <div className="container mx-auto p-4">
      <div className="movie-details">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p>Genre: {movie.genre}</p>
        <p>Duration: {movie.duration}</p>
        <p>Release Year: {movie.releaseYear}</p>
        <p>Rating: {movie.rating}</p>
        <p>{movie.summary}</p>
        <div className="flex space-x-4 mt-4">
          <button
            // onClick={handleDeleteMovie}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Movie
          </button>
          <button
            // onClick={handleAddToFavorite}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
}
