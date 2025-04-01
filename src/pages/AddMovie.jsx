import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Film, Upload, Star, Info, Clock, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AddMovie() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [posterPreview, setPosterPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // watch,
    formState: { errors },
  } = useForm();

  // Watch the poster field to update preview
  // const posterUrl = watch("poster");

  // Update poster preview when URL changes
  const handlePosterChange = (e) => {
    const url = e.target.value;
    setPosterPreview(url);
  };

  // Clear poster preview
  const clearPosterPreview = () => {
    setPosterPreview("");
    setValue("poster", "");
  };

  const onSubmit = (data) => {
    // Validation for rating
    if (rating === 0) {
      return Swal.fire({
        title: "Rating Required",
        text: "Please select a rating for the movie",
        icon: "error",
        confirmButtonColor: "#dc2626",
        background: "#1f2937",
        color: "#fff",
      });
    }

    setIsSubmitting(true);

    // Combine form data with rating
    const movie = { ...data, rating };

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
        setIsSubmitting(false);
        if (result.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Movie Added Successfully",
            text: "Your movie has been added to the collection",
            confirmButtonColor: "#dc2626",
            background: "#1f2937",
            color: "#fff",
          });
          reset();
          setRating(0);
          setPosterPreview("");
          navigate("/all-movies");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          confirmButtonColor: "#dc2626",
          background: "#1f2937",
          color: "#fff",
        });
      });
  };

  // Generate years for the select dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            {/* Poster Preview Section */}
            <div className="md:w-2/5 bg-gray-900 p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <Film className="w-5 h-5 text-[#dc2626] mr-2" />
                <h2 className="text-xl font-bold text-white">Movie Poster</h2>
              </div>

              <div className="flex-1 flex items-center justify-center">
                {posterPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={posterPreview || "/placeholder.svg"}
                      alt="Movie Poster Preview"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x450?text=Invalid+Image+URL";
                      }}
                    />
                    <button
                      onClick={clearPosterPreview}
                      className="absolute top-2 right-2 p-1 bg-gray-900/80 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[300px] border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-600 mb-4" />
                    <p className="text-gray-400 mb-2">
                      Enter a URL to preview the movie poster
                    </p>
                    <p className="text-gray-500 text-sm">
                      Recommended size: 300x450 pixels
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Info className="w-5 h-5 text-[#dc2626] mr-2" />
                <h2 className="text-xl font-bold text-white">Movie Details</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Movie Poster URL */}
                <div>
                  <Label htmlFor="poster" className="text-gray-300">
                    Poster URL
                  </Label>
                  <Input
                    id="poster"
                    type="url"
                    placeholder="https://example.com/movie-poster.jpg"
                    className="bg-gray-700 border-gray-600 text-white"
                    {...register("poster", {
                      required: "Poster URL is required",
                      pattern: {
                        value: /^https?:\/\/.+$/,
                        message: "Please enter a valid URL",
                      },
                    })}
                    onChange={handlePosterChange}
                  />
                  {errors.poster && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.poster.message}
                    </p>
                  )}
                </div>

                {/* Movie Title */}
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Movie Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter movie title"
                    className="bg-gray-700 border-gray-600 text-white"
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 2,
                        message: "Title must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Genre and Duration Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Genre */}
                  <div>
                    <Label htmlFor="genre" className="text-gray-300">
                      Genre
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("genre", value)}
                      defaultValue=""
                    >
                      <SelectTrigger
                        id="genre"
                        className="bg-gray-700 border-gray-600 text-white"
                      >
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="Action">Action</SelectItem>
                        <SelectItem value="Comedy">Comedy</SelectItem>
                        <SelectItem value="Drama">Drama</SelectItem>
                        <SelectItem value="Horror">Horror</SelectItem>
                        <SelectItem value="Thriller">Thriller</SelectItem>
                        <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Animation">Animation</SelectItem>
                        <SelectItem value="Documentary">Documentary</SelectItem>
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      {...register("genre", { required: "Genre is required" })}
                    />
                    {errors.genre && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.genre.message}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <Label htmlFor="duration" className="text-gray-300">
                      Duration (minutes)
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="duration"
                        type="number"
                        placeholder="120"
                        className="bg-gray-700 border-gray-600 text-white"
                        {...register("duration", {
                          required: "Duration is required",
                          min: {
                            value: 1,
                            message: "Duration must be at least 1 minute",
                          },
                          max: {
                            value: 999,
                            message: "Duration cannot exceed 999 minutes",
                          },
                        })}
                      />
                      <Clock className="w-5 h-5 text-gray-500 ml-2" />
                    </div>
                    {errors.duration && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Release Year and Rating Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Release Year */}
                  <div>
                    <Label htmlFor="releaseYear" className="text-gray-300">
                      Release Year
                    </Label>
                    <div className="flex items-center">
                      <Select
                        onValueChange={(value) =>
                          setValue("releaseYear", value)
                        }
                        defaultValue=""
                      >
                        <SelectTrigger
                          id="releaseYear"
                          className="bg-gray-700 border-gray-600 text-white"
                        >
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[200px]">
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Calendar className="w-5 h-5 text-gray-500 ml-2" />
                    </div>
                    <input
                      type="hidden"
                      {...register("releaseYear", {
                        required: "Release year is required",
                      })}
                    />
                    {errors.releaseYear && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.releaseYear.message}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <Label htmlFor="rating" className="text-gray-300">
                      Rating
                    </Label>
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          className="mr-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              value <= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-500"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-gray-400 text-sm">
                        {rating > 0 ? `${rating} out of 5` : "Select rating"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <Label htmlFor="summary" className="text-gray-300">
                    Summary
                  </Label>
                  <Textarea
                    id="summary"
                    placeholder="Write a brief summary of the movie..."
                    className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                    {...register("summary", {
                      required: "Summary is required",
                      minLength: {
                        value: 10,
                        message: "Summary must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.summary && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.summary.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Movie...
                    </>
                  ) : (
                    <>
                      <Film className="mr-2 h-5 w-5" />
                      Add Movie
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
