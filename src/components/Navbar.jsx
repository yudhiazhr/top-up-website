import { Link, useLocation } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import { useState, useEffect } from "react";

export const Navbar = ({ userData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full h-24 flex gap-12 items-center justify-between fixed top-0 left-0 right-0 px-[300px]  bg-[#212121] z-50">
      <div className="flex gap-12 items-center">
        <Link to={`/`}>
          <img src={logo} className="w-32 h-9" alt="Logo" />
        </Link>

        <form className="w-80">
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
              className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-yellow-600 hover:bg-yellow-500 focus:ring-yellow-400 duration-300 transition-all"
            >
              Search
            </button>
          </div>
        </form>

        <ul className="flex gap-6 text-white">
          <li>
            <Link
              to={`/`}
              className={`px-4 py-2 rounded-lg ${
                isActive("/") ? "text-yellow-600" : "hover:text-yellow-500"
              } transition-all`}
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className={`px-4 py-2 rounded-lg ${
                location.pathname.startsWith("/product")
                  ? "text-yellow-600"
                  : "hover:text-yellow-500"
              } transition-all`}
            >
              Produk
            </Link>
          </li>
          <li>
            <Link
              to={`/check-order`}
              className={`px-4 py-2 rounded-lg ${
                isActive("/check-order")
                  ? "text-yellow-600"
                  : "hover:text-yellow-500"
              } transition-all`}
            >
              Cek Pesanan
            </Link>
          </li>
        </ul>
      </div>

      {isLoggedIn ? (
        <Link
          to={`/profile`}
          className="flex justify-center items-center w-[156px] h-[46px] border-l text-white"
        >
          <img
            src={`${
              userData.photoUrl ||
              `https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png`
            }`}
            className="rounded-sm mx-auto w-12 h-12"
            alt="User Profile"
          />
          <h1>{userData.username}</h1>
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link
            to={`/login`}
            className=" hover:bg-yellow-600 py-2 px-5 rounded-xl duration-300 transition-all text-white"
          >
            Login
          </Link>
          <Link
            to={`/login`}
            className="bg-yellow-600 hover:bg-yellow-500 py-2 px-5 rounded-xl duration-300 transition-all text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};
