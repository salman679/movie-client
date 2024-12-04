import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieCarousel = () => {
  const banners = [
    {
      title: "Epic Adventures",
      description:
        "Experience the thrill of epic journeys in a world beyond imagination.",
      image: "https://via.placeholder.com/800x400?text=Movie+1",
    },
    {
      title: "Romantic Escapes",
      description:
        "A love story that will touch your heart and stay with you forever.",
      image: "https://via.placeholder.com/800x400?text=Movie+2",
    },
    {
      title: "Action Blockbuster",
      description:
        "Explosive action sequences and breathtaking stunts await you.",
      image: "https://via.placeholder.com/800x400?text=Movie+3",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg overflow-hidden"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                <h2 className="text-3xl text-white font-bold">
                  {banner.title}
                </h2>
                <p className="text-white mt-2 text-center max-w-md">
                  {banner.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
