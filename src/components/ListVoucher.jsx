import { useLocation, useOutletContext } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AllContext } from "../contexts/useContext";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export const ListVoucher = () => {
  const { dataVoucher } = useContext(AllContext);
  const location = useLocation();
  const context = useOutletContext() || {};
  const selected = context?.selected;

  const [filteredVoucher, setFilteredVoucher] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [productFrequency, setProductFrequency] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersSnapshot = await getDocs(collection(db, "order"));
      const orders = ordersSnapshot.docs.map((doc) => doc.data());
      setOrderData(orders);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const productPopularity = {};

    orderData.forEach((order) => {
      const productName = order.product?.name;
      if (productName) {
        productPopularity[productName] =
          (productPopularity[productName] || 0) + 1;
      }
    });

    const filteredFrequency = {};

    setProductFrequency(filteredFrequency);

    let sortedProducts = [...dataVoucher];

    if (selected === "popular") {
      sortedProducts.sort(
        (a, b) =>
          (productPopularity[b.name] || 0) - (productPopularity[a.name] || 0)
      );
    } else if (selected === "alphabet") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredVoucher(
      sortedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      )
    );
  }, [location.search, dataVoucher, selected, orderData]);

  return (
    <div className="flex flex-col gap-8 text-white py-12">
      <h1 className="text-2xl font-bold">Voucher</h1>
      <div className="grid grid-cols-3 gap-5 items-center justify-between">
        {filteredVoucher.length > 0 ? (
          filteredVoucher.slice(0, 3).map((item, index) => (
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
        {filteredVoucher.slice(3).map((item, index) => (
          <div key={index}>
            <div className="flex w-[400px] h-[152px] hover:bg-[#2b2b2b] p-3 rounded-2xl">
              <div className="flex flex-col gap-4 w-full">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <p>{item.type}</p>
              </div>
              <img src={`${item.image}`} className="rounded-2xl" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
