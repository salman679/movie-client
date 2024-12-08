import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleDeleteMovie(id) {
    fetch(`https://movie-server-henna.vercel.app/movie/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "The movie has been deleted.", "success");
        }
        navigate("/my-favorites/" + user.email);
        // navigate("/all-movies");
      })
      .catch((error) => console.error("Error deleting movie:", error));
  }

  function handleFavorite(id) {
    fetch("https://movie-server-henna.vercel.app/add-favorite", {
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
          Swal.fire("Error", "Movie already exists in favorite", "error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.insertedId) {
          Swal.fire("Added!", "Movie has been added to favorite.", "success");
        }
      })
      .catch((error) =>
        console.error("Error adding movie to favorite:", error)
      );
  }

  useEffect(() => {
    fetch(`https://movie-server-henna.vercel.app/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900  rounded-lg shadow-lg p-6">
        {/* Movie Poster and Info */}
        <div className="flex items-center space-x-6">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-64 h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-4xl font-semibold text-gray-900">
              {movie.title}
            </h1>
            <div className="mt-2 text-lg text-gray-600">
              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p>
                <strong>Duration:</strong> {movie.duration}
              </p>
              <p>
                <strong>Release Year:</strong> {movie.releaseYear}
              </p>
              <p>
                <strong>Rating:</strong> {movie.rating}
              </p>
            </div>
            <p className="mt-4 text-gray-700">{movie.summary}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => handleDeleteMovie(movie._id)}
            className="btn btn-error text-white w-full md:w-auto"
          >
            Delete Movie
          </button>
          <button
            onClick={() => handleFavorite(movie._id)}
            className="btn btn-primary text-white w-full md:w-auto"
          >
            Add to Favorite
          </button>
          <button
            onClick={() => navigate(`/update-movie/${movie._id}`)}
            className="btn btn-warning text-white w-full md:w-auto"
          >
            Update Movie
          </button>
        </div>

        {/* "See All Movies" Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/movies")}
            className="btn btn-secondary text-white"
          >
            See All Movies
          </button>
        </div>
      </div>
    </div>
  );
}
