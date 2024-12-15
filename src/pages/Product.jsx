import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AllContext } from "../contexts/useContext";

export const Product = () => {
  const { dataProduct, dataVoucher } = useContext(AllContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("suitable");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (key) => {
    setSelected(key);
  };

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      navigate("/product");
    } else {
      const matchedProduct = dataProduct.find((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchedVoucher = dataVoucher.find((voucher) =>
        voucher.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedProduct) {
        navigate(`/product/games?search=${searchQuery}`);
      } else if (matchedVoucher) {
        navigate(`/product/voucher?search=${searchQuery}`);
      } else {
        navigate(`/product?search=${searchQuery}`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-dvh w-full pt-36 text-white px-[300px]">
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <Link
            to={`/product`}
            className={`flex justify-center items-center px-5 py-2 ${
              isActive("/product")
                ? "bg-yellow-600"
                : "bg-[#2b2b2b] hover:bg-yellow-500"
            } rounded-lg duration-300 transition-all`}
          >
            Semua produk
          </Link>

          <Link
            to={`/product/games`}
            className={`flex justify-center items-center px-5 py-2 ${
              isActive("/product/games")
                ? "bg-yellow-600"
                : "bg-[#2b2b2b] hover:bg-yellow-500"
            } rounded-lg duration-300 transition-all`}
          >
            Games
          </Link>
          <Link
            to={`/product/voucher`}
            className={`flex justify-center items-center px-5 py-2 ${
              isActive("/product/voucher")
                ? "bg-yellow-600"
                : "bg-[#2b2b2b] hover:bg-yellow-500"
            } rounded-lg duration-300 transition-all`}
          >
            Voucher
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <form onSubmit={handleSearch} className="w-[360px]">
            <div className="relative">
              <input
                type="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2b2b2b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cari sesuatu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-500 duration-300 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          <div className="relative flex gap-4 items-center">
            <h1 className="text-base">Urutkan Berdasarkan</h1>
            <div
              className="flex justify-between items-center min-w-44 gap-5 px-5 py-2 bg-[#2b2b2b] rounded-lg cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <h1>
                {selected === "popular"
                  ? "Paling Populer"
                  : selected === "suitable"
                  ? "Paling Sesuai"
                  : "Sesuai Abjad A-Z"}
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={`text-white size-5 transition-all duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute flex flex-col justify-between bg-[#2b2b2b] w-44 min-h-32 right-0 top-12 rounded-lg z-10">
                <div className="flex gap-3 p-3">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={selected === "popular"}
                    onChange={() => handleCheckboxChange("popular")}
                  />
                  <label htmlFor="popular">Paling Populer</label>
                </div>
                <div className="flex gap-3 p-3">
                  <input
                    type="checkbox"
                    id="suitable"
                    checked={selected === "suitable"}
                    onChange={() => handleCheckboxChange("suitable")}
                  />
                  <label htmlFor="suitable">Paling Sesuai</label>
                </div>
                <div className="flex gap-3 p-3">
                  <input
                    type="checkbox"
                    id="alphabet"
                    checked={selected === "alphabet"}
                    onChange={() => handleCheckboxChange("alphabet")}
                  />
                  <label htmlFor="alphabet">Sesuai Abjad A-Z</label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Outlet context={{ selected }} />
    </div>
  );
};
