import { SwiperSlide } from "swiper/react";

const upcomingMovies = [
  {
    id: 1,
    title: "The Future Awaits",
    poster: "https://i.ibb.co.com/hHrD56R/61l-ROVykee-S-AC-UF894-1000-QL80.jpg",
    releaseYear: 2025,
  },
  {
    id: 2,
    title: "Beyond Tomorrow",
    poster: "https://i.ibb.co.com/h9TMNPX/download.jpg",
    releaseYear: 2026,
  },
  {
    id: 3,
    title: "A New Dawn",
    poster: "https://i.ibb.co.com/khQ5zdn/download.jpg",
    releaseYear: 2024,
  },
];

export function UpcomingMovies() {
  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-6">
        Upcoming Movies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {upcomingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="bg-white shadow-md rounded p-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-60 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{movie.title}</h3>
              <p>Release Year: {movie.releaseYear}</p>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </section>
  );
}
