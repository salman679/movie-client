"use client";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const upcomingMovies = [
  {
    id: 1,
    title: "The Last Frontier",
    image: "https://i.ibb.co.com/s9BPwJ1G/The-Last-Frontier-2020-film.jpg",
    releaseDate: "June 15, 2024",
    genre: "Sci-Fi",
    duration: "2h 15m",
  },
  {
    id: 2,
    title: "Eternal Shadows",
    image:
      "https://i.ibb.co.com/C3WWvzXd/MV5-BZDQy-Zm-U3-NTIt-YTg1-Yy00-YWNi-LWE1-Mjkt-ZDFk-MDBh-Nj-Q2-Njg0-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
    releaseDate: "July 22, 2024",
    genre: "Thriller",
    duration: "1h 58m",
  },
  {
    id: 3,
    title: "Whispers of the Heart",
    image:
      "https://i.ibb.co.com/RqBhw5w/MV5-BNGE2-NTc3-Y2-Yt-ZTQ5-Zi00-Nz-Zk-LWIy-NDUt-Zm-Zk-Zj-Q2-NWU0-ZTIz-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
    releaseDate: "August 10, 2024",
    genre: "Romance",
    duration: "2h 05m",
  },
  {
    id: 4,
    title: "The Forgotten Kingdom",
    image:
      "https://i.ibb.co.com/1YZt1gW7/MV5-BODM3-Ym-U4-Nz-It-ZDhi-Ny00-NDIy-LTgz-Mz-Qt-NDQz-ZDQ3-ZDJl-MTc0-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
    releaseDate: "September 5, 2024",
    genre: "Fantasy",
    duration: "2h 30m",
  },
];

export function UpcomingMovies() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {upcomingMovies.map((movie) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="bg-[#dc2626] text-white text-xs font-medium px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>

            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#dc2626]" />
                {movie.releaseDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#dc2626]" />
                {movie.duration} | {movie.genre}
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white"
              variant="secondary"
            >
              Set Reminder
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
