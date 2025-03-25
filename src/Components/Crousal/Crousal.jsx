import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";

const images = [
  { src: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/373914b13f0b4dfb.jpg?q=20" },
  { src: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/9ced9278c127ea98.jpeg?q=20" },
  { src: "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/5dbe24535d092e63.jpg?q=20" },
];

export default function Crousal() {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // Track current slide

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2)); // Progress fills every 100ms
    }, 50);
    return () => clearInterval(interval);
  }, [activeIndex]); // Reset when active slide changes

  return (
    <div className="mt-16 relative w-full mx-auto rounded-none h-[50vh] overflow">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setProgress(0); // Reset progress when slide changes
        }}
        className="overflow-hidden h-full z-0"
        
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img src={image.src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots with Progress Effect */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row space-x-2 z-10 ">
        {images.map((_, index) => (
          <div
            key={index}
            className={`relative ${
              index === activeIndex ? "w-8 h-1 rounded-md flex flex-row items-center " : "w-3 h-2 rounded-full flex flex-row items-center"
            } bg-gray-300 transition-all duration-300`}
          >
            {index === activeIndex && (
              <div
                className="absolute top-0 left-0 h-full bg-gray-400 rounded-md"
                style={{ width: `${progress}%` }} // Fill the rectangle as slide progresses
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
