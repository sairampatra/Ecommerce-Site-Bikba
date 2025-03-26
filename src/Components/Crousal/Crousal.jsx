import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";

const images = [
  { src: "https://static.vecteezy.com/system/resources/previews/011/871/820/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" },
  { src: "https://static.vecteezy.com/system/resources/previews/004/299/813/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" },
  { src: "https://static.vecteezy.com/system/resources/previews/003/690/391/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-women-concept-free-vector.jpg" },
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
    <div className="mt-16 relative w-full mx-auto rounded-none h-[70vh] overflow">
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
