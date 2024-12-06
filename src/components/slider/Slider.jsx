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
      image: "https://i.ibb.co.com/wc6K7Vc/scale.webp",
    },
    {
      title: "Romantic Escapes",
      description:
        "A love story that will touch your heart and stay with you forever.",
      image:
        "https://i.ibb.co.com/Mkh7xmL/romantic-dining-on-the-beach-at-pacific-resort-aitutaki.jpg",
    },
    {
      title: "Action Blockbuster",
      description:
        "Explosive action sequences and breathtaking stunts await you.",
      image: "https://i.ibb.co.com/SB6CJFF/maxresdefault.jpg",
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
              className="relative h-[600px] bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="pl-24">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-7xl text-white font-bold">
                      {banner.title}
                    </h2>
                    <p className="text-white text-2xl mt-2">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
