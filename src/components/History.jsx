import React, { useEffect, useState } from "react";
import { db } from "../Firebase"; // Adjust the import if needed
import { collection, getDocs, query, where } from "firebase/firestore";
import DataTable from "react-data-table-component";
import { getAuth } from "firebase/auth"; // To get the current user's UID

export const History = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user UID
  const auth = getAuth();
  const userUid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!userUid) {
        setError("User is not logged in.");
        return;
      }

      try {
        // Create a query to filter orders by UID
        const orderCollection = collection(db, "order");
        const q = query(orderCollection, where("uid", "==", userUid)); // Filter orders by the user's UID
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

  // Define columns for the DataTable
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
    },
    /* {
      name: "User Name",
      selector: (row) => row.userName, // Adjust this according to your document structure
      sortable: true,
    }, */
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount, // Adjust this according to your document structure
      sortable: true,
    },
    /* {
      name: "Order Date",
      selector: (row) => new Date(row.orderDate.seconds * 1000).toLocaleString(), // Convert Firestore timestamp to Date
      sortable: true,
    }, */
  ];

  return (
    <div className="container">
      <h2>Order History</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <DataTable
          title="Order History"
          columns={columns}
          data={orderData}
          pagination
          responsive
        />
      )}
    </div>
  );
};
