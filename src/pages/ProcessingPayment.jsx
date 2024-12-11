import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import QRCode from "react-qr-code";

export const ProcessingPayment = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "order", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrderData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching order data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);


  console.log(orderData)

  useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    if (storedCountdown) {
      setCountdown(parseInt(storedCountdown, 10));
      setCountdown(10)
    }
  }, []);

  useEffect(() => {
    if (orderData?.status === "Sukses") {
      setCountdown(0);
      localStorage.removeItem("countdown");
      return;
    }

    if (orderData?.status === "Dibatalkan") {
      setCountdown(0);
      localStorage.removeItem("countdown");
      return;
    }

    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          localStorage.setItem("countdown", newCountdown);
          return newCountdown;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      handleCancelOrder();
    }
  }, [countdown, orderData]);


  const handleCancelOrder = async () => {
    try {
      const docRef = doc(db, "order", id);
      await updateDoc(docRef, { status: "Dibatalkan" });
      setOrderData((prev) => ({ ...prev, status: "Dibatalkan" }));
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const handleQRScan = async () => {
    try {
      const docRef = doc(db, "order", id);
      await updateDoc(docRef, { status: "Sedang Proses" });
      setOrderData((prev) => ({ ...prev, status: "Sedang Proses" }));
      navigate(`/confirmation-payment/${id}`);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!orderData) {
    return <div className="text-white">No order found with the given ID.</div>;
  }

  return (
    <div className="flex flex-col px-[300px] py-32 text-white">
      <div className="flex flex-col gap-8 w-[1280px] min-h-32 bg-[#2b2b2b] rounded-xl p-8 ">
        <div className="flex justify-between border-b pb-8">
          <div className="flex items-center gap-4">
            <img
              src={`${orderData.product.image}`}
              className="w-16 h-16 rounded-xl"
              alt=""
            />
            <h1 className="text-2xl font-bold">{orderData.product.name}</h1>
          </div>

          <div>
            <h1
              className={`px-2 py-1 rounded-md text-xl ${
                orderData.status === "Belum Bayar"
                  ? "bg-yellow-500"
                  : orderData.status === "Dibatalkan"
                  ? "bg-red-500"
                  : orderData.status === "Sukses"
                  ? "bg-green-600"
                  : orderData.status === "Sedang Proses"
                  ? "bg-gray-500"
                  : "bg-gray-400"
              }`}
            >
              {orderData.status}
            </h1>
          </div>
        </div>

        <h1 className="text-2xl font-bold">Detail Pesanan</h1>

        <div className=" grid grid-cols-4 gap-10 ">
          <div className="flex col-span-2  flex-col gap-6 justify-between ">
            <div className="flex flex-col ">
              <h1 className="text-sm">Nomor Pesanan</h1>

              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-yellow-600">
                  {orderData["invoice id"]}
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

              <div className=" grid grid-cols-2 mt-4  ">
                <div className="flex flex-col gap-4 text-center justify-center items-center ">
                  <h1 className="">SCAN QR CODE dibawah ini</h1>

                  <button onClick={handleQRScan}>proses</button>

                  {orderData.status === "Belum Bayar" && countdown > 0 ? (
                    <QRCode
                      value={``}
                      size={256}
                      fgColor="#000000"
                      className="p-6 bg-white rounded-lg"
                    />
                  ) : (
                    <p className="flex justify-center items-center w-64 h-64 rounded-lg bg-white text-black">
                      QR Code tidak tersedia
                    </p>
                  )}
                  <p>
                    Selesaikan Pembayaran Sebelum Waktu Habis Agar Pesanan Kamu
                    Tidak Expired
                  </p>
                </div>
                <div className="flex flex-col text-center gap-6 ">
                  <div className="flex gap-4">
                    <h1 className="jam p-6 w-20 h-20 bg-yellow-600 justify-center items-center flex text-2xl rounded-xl font-bold">
                      {formatTime(countdown).split(":")[0]}
                    </h1>
                    <h1 className="menit p-6 w-20 h-20 bg-yellow-600 justify-center items-center flex text-2xl rounded-xl font-bold">
                      {formatTime(countdown).split(":")[1]}
                    </h1>
                    <h1 className="detik p-6 w-20 h-20 bg-yellow-600 justify-center items-center flex text-2xl rounded-xl font-bold">
                      {formatTime(countdown).split(":")[2]}
                    </h1>
                  </div>
                  <h1>Informasi Cara Pembayaran</h1>
                  <ol className="list-decimal pl-6 text-start text-sm">
                    <li>Screenshot QR code pembayaran</li>
                    <li>Buka e-wallet (OVO/GoPay/DANA/Shopee/Link Aja)</li>
                    <li>Tekan tombol scan</li>
                    <li>Pilih upload gambar atau ambil gambar dari gallery</li>
                    <li>Lalu pilih gambar yang tadi di screenshot</li>
                    <li>Lakukan pembayaran</li>
                    <li>Diamond akan langsung masuk di game</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12 ">
            <div className="flex flex-col">
              <h1 className="text-sm">Tanggal Pembelian</h1>
              <p className="text-2xl font-bold">
                {new Date(orderData.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm">Item</h1>
              <p className="text-2xl font-bold">
                {orderData.product["total quantity"]}{" "}
                {orderData.product["selected item"]}
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
                }).format(orderData.product["total price"])}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12 ">
            <div className="flex flex-col">
              <h1 className="text-sm">Metode Pembayaran</h1>
              <p className="text-2xl font-bold">{orderData.paymentMethod}</p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-sm">ID User - Nickname</h1>
              <p className="text-2xl font-bold">
                {orderData.userID} ({orderData.zoneID}) <br />
                {orderData.orderer.username}
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


