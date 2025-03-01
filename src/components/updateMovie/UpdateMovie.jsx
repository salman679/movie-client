import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    releaseYear: "",
    rating: "",
    poster: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_api}/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_api}/movie/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", "The movie has been updated.", "success");
        navigate(`/movie/${id}`);
      })
      .catch((error) => console.error("Error updating movie:", error));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Update Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Duration (in minutes)</label>
          <input
            type="number"
            min={60}
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full bg-gray-900 text-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Poster URL</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleInputChange}
            required
            className="input input-bordered w-full bg-gray-900 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}
