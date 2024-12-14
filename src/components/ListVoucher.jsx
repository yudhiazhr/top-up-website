import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../contexts/useContext";
import { Link } from "react-router-dom";

export const ListVoucher = () => {
  const { dataVoucher } = useContext(AllContext);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const filteredVouchers = dataVoucher.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
};
