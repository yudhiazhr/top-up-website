import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../contexts/useContext";
import { Link } from "react-router-dom";

export const ListGames = () => {
  const { dataProduct } = useContext(AllContext);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const filteredProducts = dataProduct.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 text-white py-12">
      <h1 className="text-2xl font-bold">Games</h1>
      <div className="grid grid-cols-5 gap-5 justify-between items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <div key={index}>
              <Link
                to={`/id/${item.id}`}
                className="flex flex-col gap-4 w-[250px] h-[400px] hover:bg-[#2b2b2b] p-3 rounded-2xl duration-300 transition-all"
              >
                <img src={`${item.image}`} className="w-full rounded-2xl" alt={item.name} />
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
  );
};
