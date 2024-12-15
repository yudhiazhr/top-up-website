import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const History = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uid, setUid] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const userUid = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

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

    if (userUid) {
      fetchOrderData();
    }
  }, [userUid]);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
    return "Invalid Date";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDateToYYYYMMDD = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp.seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const totalItems = orderData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);

  const filteredOrders = currentItems.filter((order) => {
    const matchesSearchQuery = order.product["selected item"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const orderDate = order.timestamp?.seconds
      ? formatDateToYYYYMMDD(order.timestamp)
      : null;

    const matchesDate = !selectedDate || orderDate === selectedDate;

    return matchesSearchQuery && matchesDate;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getShowingText = () => {
    const start = indexOfFirstItem + 1;
    const end = Math.min(indexOfLastItem, totalItems);
    return `Showing ${start}-${end} of ${totalItems}`;
  };

  const handleRowClick = (orderId) => {
    navigate(`/detail-order/${orderId}`);
    return;
  };

  return (
    <div className="container mx-auto rounded-xl shadow-lg bg-[#2b2b2b]">
      {isLoading ? (
        <p className="text-gray-700 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="flex flex-col">
          <div className="flex gap-4 p-3 bg-[#2b2b2b] rounded-t-lg">
            <form className="w-[70%]">
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <div className="flex w-full">
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-[#414141] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cari sesuatu..."
                    required
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchQuery(value);
                    }}
                  />
                </div>
              </div>
            </form>

            <div className="relative flex w-[30%]">
              <input
                type="date"
                className="w-full px-3 bg-[#414141] rounded-lg "
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <button
                  type="button"
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white hover:text-[#9b9b9b]"
                  onClick={() => setSelectedDate("")}
                  aria-label="Clear date"
                >
                  X
                </button>
              )}
            </div>
          </div>

          <table className="min-w-full table-auto text-white">
            <thead>
              <tr className="bg-[#535353]">
                <th className="px-4 py-2 text-left">Nomor Transaksi</th>
                <th className="px-4 py-2 text-left">Produk</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Total Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row.id)}
                    className="bg-[#2c2c2c] hover:bg-[#414141] cursor-pointer"
                  >
                    <td className="px-4 py-2">{row["invoice id"]}</td>
                    <td className="px-4 py-2">
                      {row.product["total quantity"] &&
                      row.product["selected item"]
                        ? `${row.product["total quantity"]} ${row.product["selected item"]}`
                        : <div div className="flex flex-col">
                          <h2>{row.product.name}</h2> 
                          <h1> {row.product["selected item"]}</h1>
                          </div>}
                    </td>
                    <td className="px-4 py-2">{formatDate(row.timestamp)}</td>
                    <td className="px-4 py-2">
                      {formatPrice(row.product["total price"])}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-md min-w-32 max-w-44 flex justify-center text-sm ${
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-2">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between p-4 border-t-[1px] border-[#424242]">
            <h1 className="">{getShowingText()}</h1>
            <div className="flex items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#414141] text-white rounded-l-lg"
              >
                {" "}
                {`<`}
              </button>
              <h1 className="px-4 py-2 bg-[#535353]">{` ${currentPage}`}</h1>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#414141] text-white rounded-r-lg"
              >
                {" "}
                {`>`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
