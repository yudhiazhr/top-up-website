import { useContext } from "react";
import { AllContext } from "../contexts/useContext";
import { Link } from "react-router-dom";

export const ListGames = () => {
  const { dataProduct } = useContext(AllContext);

  return (
    <>
     <div className="flex flex-col gap-8 text-white  py-12">
        <h1 className="text-2xl font-bold">Games</h1>
        <div className="grid grid-cols-5 gap-5 justify-between items-center">
          {dataProduct.length > 0 ? (
            dataProduct.map((item, index) => (
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
        {/* Button lainnya */}
        {dataProduct.length > 9 && (
          <div className="flex items-center justify-center mx-auto w-[189px] h-14 bg-[#2b2b2b] hover:bg-[#333333] duration-300 transition-all rounded-lg">
            <a href="">Tampilkan Lainnya</a>
          </div>
        )}
        {/* Button lainnya end */}
      </div>
    </>
  );
};
