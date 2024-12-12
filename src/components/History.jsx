import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import DataTable from "react-data-table-component";
import { getAuth } from "firebase/auth";

export const History = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const userUid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!userUid) {
        setError("User is not logged in.");
        return;
      }

      try {
        const orderCollection = collection(db, "order");
        const q = query(orderCollection, where("uid", "==", userUid));
        const orderSnapshot = await getDocs(q);
        const orders = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setError("Failed to fetch order data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [userUid]);

  const columns = [
    {
      name: "Nomor Transaksi",
      selector: (row) => row["invoice id"],
      sortable: true,
    },
    {
      name: "Produk",
      cell: (row) => (
        <h1>
          {`${row.product["total quantity"]} ${row.product["selected item"]}`}
        </h1>
      ),
      sortable: true,
    },
    {
      name: "Tanggal",
      cell: (row) => {
        const timestamp = row.timestamp;
        return timestamp && timestamp.seconds ? (
          <span>
            {new Date(timestamp.seconds * 1000).toLocaleString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        ) : (
          <span>Invalid Date</span>
        );
      },
      sortable: true,
    },
    {
      name: "Total Amount",
      cell: (row) => {
        const totalPrice = row.product["total price"];
        const formattedPrice = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(totalPrice);
        return <span>{formattedPrice}</span>;
      },
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-md min-w-32 max-w-44 flex justify-center text-white text-sm ${
            row.status === "Dibatalkan"
              ? "bg-red-600"
              : row.status === "Belum Bayar"
              ? "bg-yellow-600"
              : row.status === "Sukses"
              ? "bg-green-600"
              : "bg-gray-400"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];
  

  console.log(orderData)

  return (
    <div className="container mx-auto   rounded-x-lg rounded- shadow">
      {isLoading ? (
        <p className="text-gray-700 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <DataTable
          title="Order History"
          columns={columns}
          data={orderData}
          pagination
          responsive
          className="data-table"
        />
      )}
    </div>
  );
};
