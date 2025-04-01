"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ReplyAll } from "lucide-react";

export default function NotFound() {
  // Animated movie reel effect
  const generateFilmFrames = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotate: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
    }));
  };

  const [filmFrames] = useState(generateFilmFrames(20));

  // Random movie quotes for 404 page
  const movieQuotes = [
    { quote: "Houston, we have a problem.", movie: "Apollo 13" },
    { quote: "I'll be back.", movie: "The Terminator" },
    { quote: "There's no place like home.", movie: "The Wizard of Oz" },
    { quote: "We're gonna need a bigger boat.", movie: "Jaws" },
    {
      quote: "Roads? Where we're going we don't need roads.",
      movie: "Back to the Future",
    },
  ];

  const [randomQuote] = useState(
    movieQuotes[Math.floor(Math.random() * movieQuotes.length)]
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background film frames */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {filmFrames.map((frame) => (
          <motion.div
            key={frame.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              rotate: frame.rotate + 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: frame.id * 0.5,
            }}
            className="absolute w-20 h-20 rounded-md border-2 border-gray-700"
            style={{
              left: `${frame.x}%`,
              top: `${frame.y}%`,
              transform: `rotate(${frame.rotate}deg) scale(${frame.scale})`,
            }}
          >
            <div className="absolute inset-2 grid grid-cols-2 grid-rows-5 gap-0.5">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-700 rounded-sm"></div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#dc2626] font-bold text-9xl inline-block"
            >
              404
            </motion.div>
            <div className="relative">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black px-4">
                <span className="text-gray-500">SCENE MISSING</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! This page is not in our collection
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="mb-12">
            <blockquote className="italic text-gray-300 text-xl mb-2">
              &quot;{randomQuote.quote}&quot;
            </blockquote>
            <p className="text-[#dc2626]">— {randomQuote.movie}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/home"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <ReplyAll className="w-5 h-5 mr-2" />
              Go Back
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
