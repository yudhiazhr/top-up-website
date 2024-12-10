import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../Firebase";

export const AllContext = createContext();

 const ContextProvider = ({ children }) => {
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const fetchedDataProduct = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataProduct(fetchedDataProduct);
      } catch (error) {
        console.error("Error fetching data product: ", error);
      }
    };

    fetchDataProduct();
  }, []);

  return (
    <AllContext.Provider value={{ dataProduct }}>
      {children}
    </AllContext.Provider>
  );
};

export default ContextProvider;
