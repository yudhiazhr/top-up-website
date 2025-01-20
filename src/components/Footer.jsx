import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import { useEffect, useState } from "react";

export const Footer = ({ userData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  return (
    <div className="flex flex-col gap-16 py-14 text-white bg-[#2b2b2b] px-[300px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6 w-1/2">
          <img src={logo} className=" w-44 h-12" alt="" />
          <h1>
            Nikmati layanan top up game online instan di RRQ TOPUP. Dapatkan
            penawaran <br /> terbaik untuk semua game populer seperti Mobile
            Legends, Free Fire, dan <br />
            banyak lagi. Transaksi mudah, aman dan terpercaya.
          </h1>

          <h1 className="cp">
            Kamu punya pertanyaan lebih lanjut? Silahkan hubungi kontak kami di{" "}
            <br />
            WhatsApp (Chat only) <br />
            <br />
            <a
              href="https://wa.me/6281112544413"
              className="text-white underline hover:text-yellow-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              +62 811-1254-4413
            </a>
          </h1>

          <p>
            PT QEON INTERACTIVE GEDUNG <br /> MIDPLAZA2, LT.24, JL. JEND.
            SUDIRMAN KAV. 10-11. Desa/Kelurahan <br /> Karet Tengsin,
            <br /> Kec. Tanah Abang, Kota Adm. Jakarta Pusat, Provinsi DKI
            Jakarta,
            <br />
            Kode Pos: 10220
          </p>
        </div>

        <div className="flex flex-col gap-6 min-w-32">
          <h1 className="px-4">Peta Situs</h1>
          <ul>
            <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
              <Link to={"/"}>Beranda</Link>
            </li>
            <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
              <Link to={"/check-order/"}>Cek Pesanan</Link>
            </li>

            {isLoggedIn ? (
              <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
                <Link to={"/profile"}>Profile</Link>
              </li>
            ) : (
              <div className="flex flex-col ">
                <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
                  <Link to={`/login`}>Masuk</Link>
                </li>
                <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
                  <Link to={`/sign-up`}>Daftar</Link>
                </li>
              </div>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-6 min-w-2">
          <h1 className="px-4">Top Up Lainnya</h1>
          <ul>
            <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
              <Link to={`/product/games`}>Mobile Legends</Link>
            </li>
            <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
              <Link to={`/product/games`}>PUBG</Link>
            </li>
            <li className=" hover:bg-white hover:text-black duration-300 transition-all px-4 py-1">
              <Link to={`/product/games`}>Free Fire</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 min-w-2">
          <h1>Media Sosial</h1>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/rrq_topup"
              target="_blank"
              className="p-2 rounded-full bg-white text-black group hover:bg-yellow-600 duration-300 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className=" group-hover:text-white duration-300 transition-all"
              >
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5078 6.5L17.4988 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full border-t"></div>

      <h1 className="text-sm">© 2023 RRQ Top Up. All Rights Reserved.</h1>
    </div>
  );
};
