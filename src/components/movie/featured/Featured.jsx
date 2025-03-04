import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MovieCard from "../movieCard/MovieCard";
import { UpcomingMovies } from "../../upcoming/Upcoming";
import { TopDirectors } from "../../directors/TopDirectors";

const MovieSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_api}/movies`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-6">
      {/* Featured Movies */}
      <section className="my-6">
        <h2 className="text-2xl text-white font-bold mb-4">Featured Movies</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            movies.map((movie) => (
              <SwiperSlide key={movie._id}>
                <MovieCard movie={{ ...movie, rating: Number(movie.rating) }} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>

      {/* Upcoming Movies */}
      <section className="mb-8">
        <h2 className="text-2xl text-white font-bold mb-4">Upcoming Movies</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          <UpcomingMovies />
        </Swiper>
      </section>

      {/* Top Directors */}
      <section>
        <TopDirectors />
      </section>
    </div>
  );
};

export default MovieSection;
