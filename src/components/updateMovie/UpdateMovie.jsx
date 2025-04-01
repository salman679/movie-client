import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Film,
  Upload,
  Star,
  Info,
  Clock,
  Calendar,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [posterPreview, setPosterPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    releaseYear: "",
    rating: "",
    poster: "",
    summary: "",
  });

  // Fetch movie data
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_api}/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setRating(parseFloat(data.rating) || 0);
        setPosterPreview(data.poster || "");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load movie data. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          background: "#1f2937",
          color: "#fff",
        });
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update poster preview if poster URL changes
    if (name === "poster") {
      setPosterPreview(value);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setFormData({ ...formData, rating: value.toString() });
  };

  const clearPosterPreview = () => {
    setPosterPreview("");
    setFormData({ ...formData, poster: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.genre ||
      !formData.duration ||
      !formData.releaseYear ||
      !formData.rating ||
      !formData.poster ||
      !formData.summary
    ) {
      return Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "warning",
        confirmButtonColor: "#dc2626",
        background: "#1f2937",
        color: "#fff",
      });
    }

    setSubmitting(true);

    fetch(`${import.meta.env.VITE_api}/movie/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitting(false);
        Swal.fire({
          title: "Updated!",
          text: "The movie has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#dc2626",
          background: "#1f2937",
          color: "#fff",
        });
        navigate(`/movie/${id}`);
      })
      .catch((error) => {
        setSubmitting(false);
        console.error("Error updating movie:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to update movie. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          background: "#1f2937",
          color: "#fff",
        });
      });
  };

  // Generate years for the select dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={() => navigate(`/movie/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Movie
        </Button>

        {loading ? (
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gray-900 p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-6 w-40 bg-gray-700" />
                </div>
                <Skeleton className="h-[400px] w-full bg-gray-700 rounded-lg" />
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <Skeleton className="h-8 w-48 mb-6 bg-gray-700" />
                <div className="space-y-5">
                  <Skeleton className="h-10 w-full bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full bg-gray-700" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full bg-gray-700" />
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </div>
                  <Skeleton className="h-32 w-full bg-gray-700" />
                  <Skeleton className="h-12 w-full bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                  <h2 className="text-xl font-bold text-white">
                    Update Movie Details
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Movie Poster URL */}
                  <div>
                    <Label htmlFor="poster" className="text-gray-300">
                      Poster URL
                    </Label>
                    <Input
                      id="poster"
                      name="poster"
                      type="url"
                      value={formData.poster}
                      onChange={handleInputChange}
                      placeholder="https://example.com/movie-poster.jpg"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  {/* Movie Title */}
                  <div>
                    <Label htmlFor="title" className="text-gray-300">
                      Movie Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter movie title"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  {/* Genre and Duration Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Genre */}
                    <div>
                      <Label htmlFor="genre" className="text-gray-300">
                        Genre
                      </Label>
                      <Select
                        value={formData.genre}
                        onValueChange={(value) =>
                          handleSelectChange("genre", value)
                        }
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
                          <SelectItem value="Documentary">
                            Documentary
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Duration */}
                    <div>
                      <Label htmlFor="duration" className="text-gray-300">
                        Duration (minutes)
                      </Label>
                      <div className="flex items-center">
                        <Input
                          id="duration"
                          name="duration"
                          type="number"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="120"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Clock className="w-5 h-5 text-gray-500 ml-2" />
                      </div>
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
                          value={formData.releaseYear.toString()}
                          onValueChange={(value) =>
                            handleSelectChange("releaseYear", value)
                          }
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
                            onClick={() => handleRatingChange(value)}
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
                      name="summary"
                      value={formData.summary || ""}
                      onChange={handleInputChange}
                      placeholder="Write a brief summary of the movie..."
                      className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                      disabled={submitting}
                    >
                      {submitting ? (
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
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" />
                          Update Movie
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 text-gray-600 hover:text-white hover:bg-gray-700"
                      onClick={() => navigate(`/movie/${id}`)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
