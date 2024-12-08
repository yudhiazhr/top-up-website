import { Link } from "react-router-dom";
import Bg from "../assets/imgs/Background.png";

export const Login = () => {
  return (
    <div className="relative text-white">
      <img src={Bg} className="z-[-1] absolute w-full" alt="" />
      <div className="flex px-[300px] py-32 z-50">
        <div className="flex flex-col gap-8 justify-center w-1/2 h-[670px] bg-[#2b2b2b] rounded-2xl px-8">
          <h1 className="text-5xl font-bold">Masuk</h1>
          <h2>Masuk dengan akun yang telah Kamu daftarkan.</h2>

          <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            <div className="flex w-full justify-between">
              <div className="flex gap-3">Ingat saya</div>

              <Link
                to={``}
                className="text-yellow-600 hover:underline duration-300 transition-all"
              >
                Lupa Kata Sandimu?
              </Link>
            </div>

            <div className="flex justify-center items-center bg-white rounded-xl text-black h-[74px]">
              Captcha
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 h-12 rounded-xl duration-300 transition-all"
            >
              Masuk
            </button>

            <div className="flex gap-2 justify-center items-center">
              <h1 className="">Belum memiliki akun?</h1>
              <Link
                to={`/sign-up`}
                className="text-yellow-600 hover:underline font-bold"
              >
                Daftar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
