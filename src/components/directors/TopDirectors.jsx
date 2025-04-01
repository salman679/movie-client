"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

const topDirectors = [
  {
    name: "Christopher Nolan",
    image:
      "https://i.ibb.co.com/PG44PSXr/Christopher-Nolan-Movie-film-director-Oppenheimer-UK-premiere-2023.webp",
    movies: ["Inception", "Interstellar", "Dunkirk"],
  },
  {
    name: "Steven Spielberg",
    image:
      "https://i.ibb.co.com/zT2fvGzF/MKr25402-Steven-Spielberg-Berlinale-2023.jpg",
    movies: ["Jurassic Park", "E.T.", "Saving Private Ryan"],
  },
  {
    name: "Greta Gerwig",
    image:
      "https://i.ibb.co.com/Mk88LW9T/American-actress-director-screenwriter-Greta-Gerwig-2019.webp",
    movies: ["Lady Bird", "Little Women", "Barbie"],
  },
];

export function TopDirectors() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Top Directors</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The visionary filmmakers behind some of the greatest movies of our
          time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topDirectors.map((director, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#dc2626]">
                <img
                  src={director.image || "/placeholder.svg"}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {director.name}
              </h3>

              <div className="w-12 h-0.5 bg-[#dc2626] mb-4"></div>

              <ul className="space-y-2 w-full">
                {director.movies.map((movie, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 flex items-center justify-center"
                  >
                    <Film className="w-4 h-4 mr-2 text-[#dc2626]" />
                    {movie}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
