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
      image: "https://i.ibb.co/wc6K7Vc/scale.webp",
    },
    {
      title: "Romantic Escapes",
      description:
        "A love story that will touch your heart and stay with you forever.",
      image:
        "https://i.ibb.co/Mkh7xmL/romantic-dining-on-the-beach-at-pacific-resort-aitutaki.jpg",
    },
    {
      title: "Action Blockbuster",
      description:
        "Explosive action sequences and breathtaking stunts await you.",
      image: "https://i.ibb.co/SB6CJFF/maxresdefault.jpg",
    },
  ];

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="rounded-lg overflow-hidden"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center "
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-10 md:p-0 lg:p-8">
                  <div className="text-white">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl mt-2">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCarousel;
