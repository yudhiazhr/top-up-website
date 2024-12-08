export const ListVoucher = () => {
  return (
    <>
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
      </div>
    </>
  );
};
