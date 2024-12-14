import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AllContext } from "../contexts/useContext";
import { Link } from "react-router-dom";

export const AllProduct = React.memo(({ style }) => {
  const { dataProduct, dataVoucher } = useContext(AllContext);
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    // Filter products based on the search query
    setFilteredProducts(
      dataProduct.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      )
    );

    // Filter vouchers based on the search query
    setFilteredVouchers(
      dataVoucher.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      )
    );
  }, [location.search, dataProduct, dataVoucher]);

  return (
    <div className={style}>
      {/* List games */}
      <div className="flex flex-col gap-8 text-white pt-12">
        <h1 className="text-2xl font-bold">Games</h1>
        <div className="grid grid-cols-5 gap-5 justify-between items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div key={index}>
                <Link
                  to={`/id/${item.id}`}
                  className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
                >
                  <img
                    src={`${item.image}`}
                    className="w-full rounded-2xl"
                    alt={item.name}
                  />
                  <h1 className="text-2xl font-bold">{item.name}</h1>
                  <p>{item.type}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      {/* List vouchers */}
      <div className="flex flex-col gap-8 text-white py-12">
        <h1 className="text-2xl font-bold">Voucher</h1>
        <div className="grid grid-cols-3 gap-5 items-center justify-between">
          {filteredVouchers.length > 0 ? (
            filteredVouchers.map((item, index) => (
              <div key={index}>
                <Link
                  to={`/id/${item.id}`}
                  className="flex w-[400px] h-[152px] hover:bg-[#2b2b2b] p-3 rounded-2xl"
                >
                  <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <p>{item.type}</p>
                  </div>

                  <img src={`${item.image}`} className="rounded-2xl" alt="" />
                </Link>
              </div>
            ))
          ) : (
            <p>No vouchers available.</p>
          )}
        </div>
      </div>
    </div>
  );
});
