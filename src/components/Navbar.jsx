import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

export const Navbar = () => {
  return (
    <>
      <nav className="w-full h-24 flex gap-12  items-center justify-between  fixed  top-0 left-0 right-0 px-[300px] z-10 ">
        <div className="flex gap-12 items-center">
          <Link to={`/`}>
            <img src={logo} className="w-32 h-9" alt="" />
          </Link>

          <form className=" w-80 ">
            <label
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
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
                className="text-white absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-yellow-600 hover:bg-yellow-500 focus:ring-yellow-400 duration-300 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          <ul className="flex gap-6 text-white">
            <li>
              <Link to={`/`}>Beranda</Link>
            </li>
            <li>
              <Link to={`/product`}>Produk</Link>
            </li>
            <li>
              <Link to={`/check-order`}>Cek Pesanan</Link>
            </li>
          </ul>
        </div>

        <Link to={`/profile`} className="flex justify-center items-center w-[156px] h-[46px] border-l text-white">
          <img
            src="https://placehold.co/48x48"
            className="rounded-sm mx-auto"
            alt=""
          />
          <h1>User</h1>
        </Link>
      </nav>
    </>
  );
};
