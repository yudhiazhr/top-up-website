import { useLocation, useOutletContext } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AllContext } from "../contexts/useContext";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export const ListGames = () => {
  const { dataProduct } = useContext(AllContext);
  const location = useLocation();
  const context = useOutletContext() || {};
  const selected = context?.selected;

  const [filteredProducts, setFilteredProducts] = useState([]);
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

    let sortedProducts = [...dataProduct];

    if (selected === "popular") {
      sortedProducts.sort(
        (a, b) =>
          (productPopularity[b.name] || 0) - (productPopularity[a.name] || 0)
      );
    } else if (selected === "alphabet") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(
      sortedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      )
    );
  }, [location.search, dataProduct, selected, orderData]);

  return (
    <div className="flex flex-col gap-8 text-white py-12">
      <h1 className="text-2xl font-bold">Games</h1>
      <div className="grid grid-cols-5 gap-5 justify-between items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 3).map((item, index) => (
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
        {filteredProducts.slice(3).map((item, index) => (
          <div key={index}>
            <div className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all">
              <img
                src={`${item.image}`}
                className="w-full rounded-2xl"
                alt={item.name}
              />
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <p>{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
