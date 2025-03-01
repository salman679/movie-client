import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Combine form data with rating
    const movie = { ...data, rating };

    // Validation for rating
    if (rating === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a rating!",
      });
    }

    // Send data to server
    fetch(`${import.meta.env.VITE_api}/add-movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...movie, userEmail: user.email }),
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
          reset();
          setRating(0);
          navigate("/all-movies");
        }
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        })
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className=" bg-gray-900 text-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add a New Movie
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Movie Poster */}
          <div>
            <label
              htmlFor="poster"
              className="block text-sm font-medium text-white "
            >
              Movie Poster (Link)
            </label>
            <input
              type="url"
              id="poster"
              {...register("poster", {
                required: "Poster URL is required",
                pattern: {
                  value: /^https?:\/\/.+$/,
                  message: "Please enter a valid URL",
                },
              })}
              placeholder="Enter poster link"
              className="mt-1 w-full px-4 py-2 border bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.poster && (
              <p className="text-red-500 text-sm mt-1">
                {errors.poster.message}
              </p>
            )}
          </div>

          {/* Movie Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium  text-white "
            >
              Movie Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
              placeholder="Enter movie title"
              className="mt-1 w-full px-4 py-2 border bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-white "
            >
              Genre
            </label>
            <select
              id="genre"
              {...register("genre", { required: "Genre is required" })}
              className="mt-1 w-full px-4 py-2 border bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a genre</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="action">Action</option>
              <option value="thriller">Thriller</option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-white "
            >
              Duration (in minutes)
            </label>
            <input
              type="number"
              id="duration"
              {...register("duration", {
                required: "Duration is required",
                min: {
                  value: 60,
                  message: "Duration must be at least 60 minutes",
                },
              })}
              placeholder="Enter duration in minutes"
              className="mt-1 w-full px-4 py-2 border bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Release Year */}
          <div>
            <label
              htmlFor="releaseYear"
              className="block text-sm font-medium text-white "
            >
              Release Year
            </label>
            <select
              id="releaseYear"
              {...register("releaseYear", {
                required: "Release year is required",
              })}
              className="mt-1 w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select release year</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
            {errors.releaseYear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.releaseYear.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-white  mb-2"
            >
              Rating
            </label>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white  "
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows="4"
              placeholder="Write a short description about the movie"
              className="mt-1 w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
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
