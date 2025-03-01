import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  const images = [
    "/images/slider1.jpg",
    "/images/slider2.jpg",
    "/images/slider3.jpg",
  ];

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      speed={1000}
      modules={[Navigation, Pagination, Autoplay]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-[400px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
