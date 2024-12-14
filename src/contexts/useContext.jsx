import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../Firebase";

export const AllContext = createContext();

const ContextProvider = React.memo(({ children }) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataVoucher, setDataVoucher] = useState([]);

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

    const fetchDataVoucher = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "voucher"));
        const fetchDataVoucher = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataVoucher(fetchDataVoucher);
      } catch (error) {
        console.error("Error fetching data voucher: ", error);
      }
    };

    fetchDataVoucher();
  }, []);

  return (
    <AllContext.Provider value={{ dataProduct, dataVoucher }}>
      {children}
    </AllContext.Provider>
  );
});

export default ContextProvider;
