import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const banners = [
  {
    title: "Epic Adventures",
    description:
      "Experience the thrill of epic journeys in a world beyond imagination.",
    image: "https://i.ibb.co/wc6K7Vc/scale.webp",
    genre: "Fantasy",
    rating: "8.7",
  },
  {
    title: "Romantic Escapes",
    description:
      "A love story that will touch your heart and stay with you forever.",
    image:
      "https://i.ibb.co/Mkh7xmL/romantic-dining-on-the-beach-at-pacific-resort-aitutaki.jpg",
    genre: "Romance",
    rating: "7.9",
  },
  {
    title: "Action Blockbuster",
    description:
      "Explosive action sequences and breathtaking stunts await you.",
    image: "https://i.ibb.co/SB6CJFF/maxresdefault.jpg",
    genre: "Action",
    rating: "8.2",
  },
];

export default function HeroCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 bg-white/50 hover:bg-white"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        speed={1000}
        className="h-full w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="relative h-full pt-24">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=""
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="bg-[#dc2626] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {banner.genre}
                  </span>
                  <span className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    ★ {banner.rating}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl text-center font-bold text-white mb-4 drop-shadow-lg">
                  {banner.title}
                </h1>

                <p className="text-lg md:text-xl text-center text-gray-200 mb-8  drop-shadow-md">
                  {banner.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-full px-6">
                    <Play className="mr-2 h-4 w-4 fill-current" /> Watch Now
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:text-white text-gray-500 border-white hover:bg-white/20 rounded-full px-6"
                  >
                    <Info className="mr-2 h-4 w-4" /> More Info
                  </Button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
