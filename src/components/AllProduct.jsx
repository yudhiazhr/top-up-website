export const AllProduct = () => {
  return (
    <>
      {/* List games */}
      <div className="flex flex-col gap-8 text-white  py-12">
        <h1 className="text-2xl font-bold">Games</h1>
        <div className="grid grid-cols-5 gap-5 justify-between items-center">
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Mobile Legends : Bang Bang</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Free Fire</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Valorant</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">Genshin Impact</h1>
            <p>Instant</p>
          </a>
          <a
            href=""
            className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
          >
            <img
              src="https://placehold.co/218x240"
              className="w-full rounded-2xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">PUBG Mobile - Indonesia</h1>
            <p>Instant</p>
          </a>
        </div>
        {/* Button lainnya */}
        <div className="flex items-center justify-center mx-auto w-[189px]  h-14 bg-[#2b2b2b] hover:bg-[#333333] duration-300 transition-all rounded-lg">
          <a href="">Tampilkan Lainnya</a>
        </div>
        {/* Button lainnya end */}
      </div>
      {/* List Games end */}

      {/* List Voucher */}
      <div className="flex flex-col gap-8 text-white  py-12">
        <h1 className="text-2xl font-bold">Voucher</h1>
        <div className="grid grid-cols-3 gap-5 items-center justify-between">
          <a
            href=""
            className="flex w-[400px] h-[152px] hover:bg-[#2b2b2b] p-3 rounded-2xl"
          >
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold">Steam Wallet Code Game</h1>
              <p>Instant</p>
            </div>

            <img
              src="https://placehold.co/218x240"
              className=" rounded-2xl"
              alt=""
            />
          </a>

          <a
            href=""
            className="flex w-[400px] h-[152px] hover:bg-[#2b2b2b] p-3 rounded-2xl"
          >
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold">
                VOUCHER: Valorant Indonesia
              </h1>
              <p>Instant</p>
            </div>

            <img
              src="https://placehold.co/218x240"
              className=" rounded-2xl"
              alt=""
            />
          </a>

          <a
            href=""
            className="flex w-[400px] h-[152px] hover:bg-[#2b2b2b] p-3 rounded-2xl"
          >
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold">VOUCHER: Google play</h1>
              <p>Instant</p>
            </div>

            <img
              src="https://placehold.co/218x240"
              className=" rounded-2xl"
              alt=""
            />
          </a>
        </div>
        {/* Button lainnya */}
        <div className="flex items-center justify-center mx-auto w-[189px]  h-14 bg-[#2b2b2b] hover:bg-[#333333] duration-300 transition-all rounded-lg">
          <a href="">Tampilkan Lainnya</a>
        </div>
        {/* Button lainnya end */}
      </div>
      {/* List Voucher end */}
    </>
  );
};
