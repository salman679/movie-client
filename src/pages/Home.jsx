import MovieSection from "../components/movie/featured/Featured";
import MovieCarousel from "../components/slider/Slider";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section>
        <MovieCarousel />
      </section>

      {/* Featured Categories Section */}
      {/* <section className="py-8 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover Movies by Category
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our vast collection of films across various genres
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Action", icon: "🔥" },
              { name: "Comedy", icon: "😂" },
              { name: "Drama", icon: "🎭" },
              { name: "Sci-Fi", icon: "🚀" },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#dc2626]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Movie Sections */}
      <MovieSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[#dc2626]/10 mix-blend-multiply"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Explore More Movies?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join our community to discover, rate, and share your favorite
              films with movie enthusiasts around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/auth/register"
                  className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium px-6 py-3 rounded-full transition-colors"
                >
                  Sign Up Now
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/all-movies"
                  className="inline-block bg-transparent border border-white text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  Browse Movies
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
