import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/imgs/logo.png";

export const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRef = doc(db, "order", id);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({ id: orderSnap.id, ...orderSnap.data() });
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        console.error("Error fetching order details: ", err);
        setError("Failed to fetch order details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="flex flex-col gap-8 w-[1280px] h-[582px] bg-[#2b2b2b] rounded-xl p-6">
        <div className="flex justify-between border-b pb-8">
          <div className="flex items-center gap-4">
            <img
              src={order.product.image}
              className="w-16 h-16 rounded-xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">{order.product.name}</h1>
          </div>

          <div className="">
            <h1
              className={`px-2 py-1 rounded-md text-xl ${
                order.status === "Belum Bayar"
                  ? "bg-yellow-500"
                  : order.status === "Dibatalkan"
                  ? "bg-red-500"
                  : order.status === "Sukses"
                  ? "bg-green-600"
                  : order.status === "Sedang Proses"
                  ? "bg-gray-500"
                  : "bg-gray-400"
              }`}
            >
              {order.status}
            </h1>
          </div>
        </div>

        <h1 className="text-2xl font-bold">Detail Pesanan</h1>

        <div className="flex justify-between h-full w-[90%]">
          <div className="flex flex-col justify-between  ">
            <div className="flex flex-col">
              <h1 className="text-sm">Nomor Pesanan</h1>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-yellow-600">
                  {order["invoice id"]}
                </p>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                    className="text-yellow-600 size-7"
                  >
                    <path
                      d="M14.4998 19H12.4998C9.67139 19 8.25718 19 7.3785 18.1213C6.49982 17.2426 6.49982 15.8284 6.49982 13V8C6.49982 5.17157 6.49982 3.75736 7.3785 2.87868C8.25718 2 9.67139 2 12.4998 2H13.843C14.6605 2 15.0692 2 15.4368 2.15224C15.8043 2.30448 16.0933 2.59351 16.6714 3.17157L19.3282 5.82843C19.9063 6.40648 20.1953 6.69552 20.3476 7.06306C20.4998 7.4306 20.4998 7.83935 20.4998 8.65685V13C20.4998 15.8284 20.4998 17.2426 19.6211 18.1213C18.7425 19 17.3282 19 14.4998 19Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.9998 2.5V3.5C14.9998 5.38562 14.9998 6.32843 15.5856 6.91421C16.1714 7.5 17.1142 7.5 18.9998 7.5H19.9998"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.49942 5C4.84257 5 3.49942 6.34315 3.49942 8V16C3.49942 18.8285 3.49942 20.2427 4.3781 21.1213C5.25678 22 6.67099 22 9.49942 22H14.4998C16.1566 22 17.4998 20.6568 17.4998 19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 11H14M10 15H17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <img src={logo} className="w-32 h-9" alt="" />
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col">
              <h1 className="text-sm">Tanggal Pembelian</h1>
              <p className="text-2xl font-bold">
                {new Date(order.timestamp.seconds * 1000).toLocaleDateString(
                  "en-GB"
                )}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm">Item</h1>
              <p className="text-2xl font-bold">
                {order.product["total quantity"]}{" "}
                {order.product["selected item"]}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm">Harga</h1>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(order.product["total price"])}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col">
              <h1 className="text-sm">Metode Pembayaran</h1>
              <p className="text-2xl font-bold">{order.paymentMethod}</p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm">ID User - Nickname</h1>
              <p className="text-2xl font-bold">
                {order.userID} ({order.zoneID}) <br />
                {order.orderer.name}
              </p>
            </div>

            <div className="flex flex-col w-[256px] flex-wrap">
              <h1 className="text-sm">Keterangan/No Token/No Voucher</h1>
              <p className="text-2xl font-bold "> -</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
