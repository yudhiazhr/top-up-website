import logo from "../assets/imgs/logo.png";

export const Footer = () => {
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

        <div className="flex flex-col gap-6 min-w-2">
          <h1>Peta Situs</h1>
          <ul>
            <li>
              <a href="">Beranda</a>
            </li>
            <li>
              <a href="">Cek Pesanan</a>
            </li>
            <li>
              <a href="">Masuk</a>
            </li>
            <li>
              <a href="">Daftar</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 min-w-2">
          <h1>Top Up Lainnya</h1>
          <ul>
            <li>
              <a href="">Mobile Legends</a>
            </li>
            <li>
              <a href="">PUBG</a>
            </li>
            <li>
              <a href="">Free Fire</a>
            </li>
            <li>
              <a href="">Genshin Impact</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 min-w-2">
          <h1>Media Sosial</h1>
          <div className="flex gap-3">
            <a href="" className="p-2 rounded-full bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                color="#000000"
                fill="none"
                className=" size-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="" className="p-2 rounded-full bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
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
            <a href="" className="p-2 rounded-full bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z"
                  stroke="currentColor"
                 strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118"
                  stroke="currentColor"
                 strokeWidth="1.5"
                />
              </svg>
            </a>
            <a href="" className="p-2 rounded-full bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                  stroke="currentColor"
                 strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full border-t"></div>

      <h1 className="text-sm">© 2023 TokoMotor. All Rights Reserved.</h1>
    </div>
  );
};
