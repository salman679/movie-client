import { useState } from "react";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";

export default function AddMovie() {
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    //reset error message
    setErrorMessage({});

    const formData = new FormData(event.target);
    const movie = {
      poster: formData.get("poster"),
      title: formData.get("title"),
      genre: formData.get("genre"),
      duration: formData.get("duration"),
      releaseYear: formData.get("releaseYear"),
      rating: rating,
      description: formData.get("description"),
    };

    //validation
    const errors = {};
    if (!movie.poster.startsWith("http")) {
      errors.poster = "Please enter a valid URL";
    } else if (!movie.title || movie.title.length < 2) {
      errors.title = "Title must be at least 2 characters!";
    } else if (!movie.genre) {
      errors.genre = "Genre is required!";
    } else if (!movie.duration || movie.duration < 60) {
      errors.duration = "Duration must be at least 60 minutes!";
    } else if (!movie.releaseYear) {
      errors.releaseYear = "Please select a release year!";
    } else if (movie.rating === 0) {
      errors.rating = "Please select a rating!";
    } else if (movie.description.length < 10) {
      errors.description = "description must be at least 10 characters!";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    //send data to server
    fetch("https://movie-server-henna.vercel.app/add-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Movie added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        event.target.reset();

        setErrorMessage({});
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  }

  console.log(errorMessage);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add a New Movie
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Poster */}
          <div>
            <label
              htmlFor="poster"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Poster (Link)
            </label>
            <input
              type="url"
              id="poster"
              name="poster"
              placeholder="Enter poster link"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {errorMessage.poster && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.poster}</p>
            )}
          </div>
          {/* Movie Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter movie title"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {errorMessage.title && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.title}</p>
            )}
          </div>
          {/* Genre */}
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a genre</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="action">Action</option>
              <option value="thriller">Thriller</option>
            </select>

            {errorMessage.genre && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.genre}</p>
            )}
          </div>
          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (in minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="60"
              placeholder="Enter duration in minutes"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errorMessage.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage.duration}
              </p>
            )}
          </div>
          {/* Release Year */}
          <div>
            <label
              htmlFor="releaseYear"
              className="block text-sm font-medium text-gray-700"
            >
              Release Year
            </label>
            <select
              id="releaseYear"
              name="releaseYear"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select release year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>

            {errorMessage.releaseYear && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage.releaseYear}
              </p>
            )}
          </div>
          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rating
            </label>
            <div className="flex items-center space-x-2">
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            {errorMessage.rating && (
              <p className="text-red-500 text-sm mt-1">{errorMessage.rating}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Write a short Description about the movie"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
            {errorMessage.description && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessage.description}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
}
