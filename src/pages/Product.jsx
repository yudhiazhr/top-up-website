import { Link, Outlet } from "react-router-dom";

export const Product = () => {
  return (
    <div className="flex flex-col min-h-dvh w-full pt-36 text-white px-[300px]">
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <Link
            to={`/product/`}
            className="flex justify-center items-cennter px-5 py-2 bg-yellow-600 rounded-lg"
          >
            Semua produk
          </Link>

          <Link
            to={`/product/games`}
            className="flex justify-center items-cennter px-5 py-2 bg-[#2b2b2b] rounded-lg"
          >
            Games
          </Link>
          <Link
            to={`/product/voucher`}
            className="flex justify-center items-cennter px-5 py-2 bg-[#2b2b2b] rounded-lg"
          >
            Voucher
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <form className=" w-[360px] ">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2b2b2b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cari sesuatu..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-400 duration-300 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex gap-4 items-center">
            <h1 className="text-base ">Urutkan Berdasarkan</h1>
            <a
              href=""
              className="flex justify-center items-cennter px-5 py-2 bg-[#2b2b2b] rounded-lg"
            >
              Paling Sesuai
            </a>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
