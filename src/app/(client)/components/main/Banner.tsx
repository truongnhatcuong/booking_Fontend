"use client";
import React from "react";
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  return (
    <Swiper
      navigation={true}
      keyboard={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Keyboard, Autoplay]}
      className="mySwiper w-full "
    >
      <SwiperSlide>
        <div className="relative w-full h-[700px]  md:h-[800px] ">
          <video
            src="/video/video2.mp4"
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover z-10"
          />
          <div className="absolute inset-0 z-20 bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h2 className="text-2xl md:text-8xl mb-2">Discover</h2>
              <h2 className="text-2xl md:text-8xl font-bold mb-2">THE WORLD</h2>
              <p className="text-2xl md:text-6xl">With Us</p>
            </div>
          </div>
          <div className="absolute bottom-32 left-0 right-0 flex justify-center z-20">
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Start Your Journey
            </button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-[700px]  md:h-[800px] ">
          <video
            src="/video/video1.mp4"
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover z-10" // Thêm z-10 để video ở dưới overlay
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
                Explore New Horizons
              </h2>
              <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Find your perfect destination with our curated travel
                experiences
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-[700px]  md:h-[800px] ">
          <video
            src="/video/video3.mp4"
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover z-10" // Thêm z-10 để video ở dưới overlay
          />{" "}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
