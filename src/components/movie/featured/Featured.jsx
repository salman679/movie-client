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

  // Fetch movies from the API
  useEffect(() => {
    fetch("https://movie-server-henna.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="container mx-auto">
      {/* Featured Movies */}
      <section className="my-6">
        <h2 className="text-2xl dark:text-white  font-bold mb-4">
          Featured Movie
        </h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
        >
          {movies.map((movie) => (
            <div key={movie._id} className="grid grid-cols-2 md:grid-cols-4">
              <SwiperSlide key={movie._id} className="">
                <MovieCard movie={{ ...movie, rating: Number(movie.rating) }} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </section>

      {/* Upcoming Movies */}
      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-bold mb-4">
          Upcoming Movies
        </h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
        >
          <UpcomingMovies />
        </Swiper>
      </section>

      {/* Top Directors  */}
      <TopDirectors />
    </div>
  );
};

export default MovieSection;
