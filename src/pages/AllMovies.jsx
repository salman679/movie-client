import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const { searchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  // Fetch all movies from the server
  useEffect(() => {
    fetch("http://localhost:5000/all-movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center dark:text-white mb-6">
        All Movies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Duration: {movie.duration} mins</p>
            <p>Release Year: {movie.releaseYear}</p>
            <p>Rating: {movie.rating}</p>
            <button
              onClick={() => navigate(`/movie/${movie._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          See All Movies
        </button>
      </div> */}
    </div>
  );
}
