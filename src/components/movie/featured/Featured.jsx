import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MovieCard from "../movieCard/MovieCard";

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
    <div className="container mx-auto px-4">
      {/* Featured Movies */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Movie</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* New Arrival */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">New Arrival</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Exclusive Videos */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Exclusive Videos</h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
        >
          {movies.slice(0, 3).map((movie) => (
            <SwiperSlide key={movie._id}>
              <div className="p-4 bg-white shadow-md rounded-md">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">
                  {movie.title} Trailer
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Casts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Casts</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
        >
          {[
            "Keanu Reeves",
            "Ryan Reynolds",
            "Timothée Chalamet",
            "Chloë Grace Moretz",
          ].map((cast, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 bg-white shadow-md rounded-md text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 mb-4"></div>
                <h3 className="text-lg font-bold">{cast}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default MovieSection;
