import { Link } from "react-router-dom";
import Bg from "../assets/imgs/Background.png";

export const SignUp = () => {
  return (
    <div className="relative text-white">
      <img src={Bg} className="z-[-1] absolute w-full" alt="" />
      <div className="flex px-[300px] py-32 z-50">
        <div className="flex flex-col gap-8 justify-center w-1/2 py-6 bg-[#2b2b2b] rounded-2xl px-8">
          <h1 className="text-5xl font-bold">Daftar</h1>
          <h2>Silahkan isi form untuk membuat akun</h2>

          <form action="" className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="">No. Whatsapp</label>
                <input
                  type="text"
                  placeholder="No. Whatsapp"
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">Konfirmasi Password</label>
              <input
                type="password"
                placeholder="Konfirmasi Password"
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            

            <div className="flex justify-center items-center bg-white rounded-xl text-black h-[74px]">
              Captcha
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 h-12 rounded-xl duration-300 transition-all"
            >
              Daftar
            </button>

            <div className="flex gap-2 justify-center items-center">
              <h1 className="">Sudah memiliki akun?</h1>
              <Link
                to={`/login`}
                className="text-yellow-600 hover:underline font-bold"
              >
                Masuk
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
