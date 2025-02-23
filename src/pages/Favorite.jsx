import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { user } = useContext(AuthContext);

  function handleDeleteFavorite(id) {
    fetch(
      `https://movie-server-henna.vercel.app/favorites/${user.email}/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "The movie has been deleted.", "success");
        }
      })
      .catch((error) => console.error("Error deleting movie:", error));
  }

  useEffect(() => {
    fetch("https://movie-server-henna.vercel.app/favorites/" + user.email)
      .then((res) => res.json())
      .then((data) => {
        setFavoriteMovies(data);
      })
      .catch((error) =>
        console.error("Error fetching favorite movies:", error)
      );
  });
  return (
    <div className="min-h-screen bg-gray-800 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Favorite Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteMovies ? (
            favoriteMovies.map((movie) => (
              <div
                key={movie._id}
                className=" bg-gray-900 shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                  <p>
                    <strong>Genre:</strong> {movie.genre}
                  </p>
                  <p>
                    <strong>Duration:</strong> {movie.duration} minutes
                  </p>
                  <p>
                    <strong>Release Year:</strong> {movie.releaseYear}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.rating}/5
                  </p>
                  <button
                    onClick={() => handleDeleteFavorite(movie._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete Favorite
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-2xl">No favorite movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
