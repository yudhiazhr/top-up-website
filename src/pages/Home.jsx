import { useState, useEffect } from "react";
import BannerCarousel from "../assets/imgs/Banner-carousel.png";
import BannerCarousel2 from "../assets/imgs/Banner-carousel-2.png";
import BannerCarousel3 from "../assets/imgs/Banner-carousel-3.png";
import Banner from "../assets/imgs/Banner.png";
import { AllProduct } from "../components/AllProduct";

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [BannerCarousel, BannerCarousel2, BannerCarousel3];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="flex flex-col min-h-dvh w-full pt-24 text-white">
      <div className="flex gap-8 h-[516px] items-center justify-between px-[300px]">
        <div
          id="indicators-carousel"
          className="relative w-full flex flex-col justify-center items-center gap-3"
        >
          <div className="relative w-[896px] h-[406px] overflow-hidden rounded-lg">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={banner}
                  className="w-full h-full object-cover"
                  alt={`Banner ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`${
                  activeIndex === index ? "w-8" : "w-2"
                } h-1 rounded-full bg-yellow-600 transition-all duration-300`}
              ></button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between h-[436px]">
          <div className="relative flex flex-col gap-8 p-6 w-[360px] h-[332px] bg-[#2b2b2b] rounded-xl overflow-hidden border-t border-r border-gray-500">
            <div className="w-44 h-44 blur-3xl bg-yellow-600 absolute rounded-full -top-6 -left-12"></div>
            <div className="w-72 h-72 blur-3xl bg-yellow-600 absolute rounded-full -bottom-20 -right-20"></div>

            <h1 className="text-2xl font-bold leading-10 z-30">
              Winner Community: Discount Poll
            </h1>
            <p className="font-medium z-30">
              Dengan mengisi kode voucher kamu bisa mendapatkan diskon Top Up di
              RRQ TOP UP. Berlaku dari 1 - 30 November 2024. Follow @rrq_topup
              pada instagram untuk promo lainnya!
            </p>
          </div>
          <div className="flex gap-4">
            <img
              src={BannerCarousel2}
              className="w-[168px] h-[80px] object-cover bg-gray-400 rounded-3xl"
            />
            <img
              src={BannerCarousel}
              className="w-[168px] h-[80px] object-cover bg-gray-400 rounded-3xl"
            />
          </div>
        </div>
      </div>
      {/* Jumbotron end */}

      <AllProduct style={"px-[300px]"} />

      {/* Banner */}
      <img src={Banner} alt="Banner" />
      {/* Banner end */}
    </div>
  );
};
