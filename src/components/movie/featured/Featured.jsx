import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "../Movie";
import { UpcomingMovies } from "../../upcoming/Upcoming";
import { TopDirectors } from "../../directors/TopDirectors";

export default function MovieSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    <div className="bg-gradient-to-b from-gray-900 to-black py-1">
      <div className="container mx-auto px-6">
        {/* Featured Movies */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
              <p className="text-gray-400 mt-1">
                Watch the latest and greatest films
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                ref={prevRef}
                variant="outline"
                size="icon"
                className="rounded-full border-gray-700 text-black hover:bg-gray-800 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                ref={nextRef}
                variant="outline"
                size="icon"
                className="rounded-full border-gray-700 text-black hover:bg-gray-800 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[2/3] rounded-xl bg-gray-800 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              modules={[Navigation]}
              onInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 },
              }}
              className="movie-swiper"
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie._id}>
                  <MovieCard
                    movie={{ ...movie, rating: Number(movie.rating) }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

        {/* Upcoming Movies */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
              <p className="text-gray-400 mt-1">
                The most anticipated releases
              </p>
            </div>
          </div>
          <UpcomingMovies />
        </section>

        {/* Top Directors */}
        <section className="mb-16">
          <TopDirectors />
        </section>
      </div>
    </div>
  );
}
