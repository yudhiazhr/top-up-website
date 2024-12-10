import BannerCarousel from "../assets/imgs/Banner-carousel.png";
import BannerCarousel2 from "../assets/imgs/Banner-carousel-2.png";

import Banner from "../assets/imgs/Banner.png";
import { AllProduct } from "../components/AllProduct";

export const Home = () => {  
  return (
    <div className="flex flex-col min-h-dvh w-full pt-24 text-white">
      {/* Jumbotron */}
      <div className="flex gap-8 h-[516px] items-center justify-between px-[300px]">
        <img
          src={BannerCarousel}
          className=" rounded-2xl w-[896px] h-[436px]"
          alt=""
        />

        <div className="flex flex-col justify-between h-[436px]">
          <div className="relative flex flex-col gap-8 p-6 w-[360px] h-[332px] bg-[#2b2b2b] rounded-xl overflow-hidden border-t border-r border-gray-500">
            <div className="w-44 h-44 blur-3xl bg-yellow-600 absolute rounded-full -top-6 -left-12"></div>
            <div className="w-72 h-72 blur-3xl bg-yellow-600 absolute rounded-full -bottom-20 -right-20"></div>

            <h1 className="text-2xl font-bold leading-10 z-30">Winner Community: Discount Poll</h1>
            <p className=" font-medium z-30">Dengan mengisi kode voucher kamu bisa mendapatkan diskon Top Up di RRQ TOP UP. Berlaku dari 1 - 30 November 2024. Follow @rrq_topup pada instagram untuk promo lainnya!</p>
          </div>
          <div className="flex gap-4">
            <img src={BannerCarousel2} className="w-[168px] h-[80px] object-cover bg-gray-400 rounded-3xl"/>
            <img src={BannerCarousel} className="w-[168px] h-[80px] object-cover bg-gray-400 rounded-3xl"/>
          </div>
        </div>
      </div>
      {/* Jumbotron end */}

     <AllProduct style={"px-[300px]"}/>

      {/* Banner */}
      <img src={Banner} alt="" />
      {/* Banner end */}
    </div>
  );
};
