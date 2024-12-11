import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllContext } from "../contexts/useContext";
import Background2 from "../assets/imgs/Background-2.png";
import { db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";

export const ProductOrder = ({ userData }) => {
  const { id } = useParams();
  const { dataProduct } = useContext(AllContext);

  const product = dataProduct.find((item) => item.id.toString() === id);

  const [userID, setUserID] = useState("");
  const [zoneID, setZoneID] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddOrder = async () => {
    if (!userID || !zoneID || !selectedItem) {
      alert("Please complete all fields before proceeding.");
      return;
    }

    setIsLoading(true);

    const orderData = {
      ["invoice id"]: `INV2024121107${Math.random().toString().slice(2, 11)}`,
      uid: userData.uid,
      orderer: {
        username: userData.username,
        email: userData.email,
        ["phone number"]: userData["phone number"],
      },
      userID,
      zoneID,
      product: {
        name: product.name,
        image: product.image,
        ["selected item"]: selectedItem.name,
        ["total quantity"]: selectedItem.quantity + selectedItem.bonus || "-",
        ["total price"]: selectedItem?.price * 0.1 + selectedItem?.price,
      },
      paymentMethod,
      timestamp: new Date(),
      status: "Belum Bayar",
    };

    try {
      const docRef = await addDoc(collection(db, "order"), orderData);
      alert("Order successfully placed!");
      setUserID("");
      setZoneID("");
      setSelectedItem(null);
      await navigate(`/waiting-payment/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to place the order.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh w-full pt-32 text-white px-[300px] ">
      <div className="flex justify-between">
        <div className="flex gap-8 items-center w-[540px] py-12 ">
          <img
            src={`${product.image}`}
            className="w-[120px] h-[120px] rounded-2xl"
            alt=""
          />
          <h1 className="text-4xl font-bold">{product.name}</h1>
        </div>
        <img src={Background2} alt="" />
      </div>

      <div className="py-12 grid grid-cols-4 gap-8">
        <div className=" col-span-3 flex flex-col gap-8 w-full">
          {/* Input ID in game */}
          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Lengkapi Data</h1>
            <div className="w-full border-t border-[#535353] "></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="">User ID</label>
                <input
                  type="text"
                  placeholder="User ID"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="">Masukkan Zona ID</label>
                <input
                  type="text"
                  placeholder="Zona ID"
                  value={zoneID}
                  onChange={(e) => setZoneID(e.target.value)}
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>
            </div>
            <h1>
              Untuk mengetahui User ID Anda, silahkan klik menu profile dibagian
              kiri atas pada menu utama game. User ID akan terlihat dibagian
              bawah Nama karakter game Anda. Silahkan masukan User ID dan Server
              ID Anda untuk menyelesaikan transaksi. Contoh: 12345678(1234).
            </h1>
          </div>

          {/* input and choose diamond or something else */}
          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Pilih Nominal Layanan</h1>

            <div className="grid grid-cols-5 gap-4 border-b border-[#535353] pb-8">
              <div className=" col-span-2 flex flex-col gap-3">
                <label htmlFor="">Minimum Harga</label>
                <input
                  type="text"
                  placeholder="Minimum Harga"
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <div className="col-span-2 flex flex-col gap-3">
                <label htmlFor="">Maksimal Harga</label>
                <input
                  type="text"
                  placeholder="Maksimal Harga"
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="mt-auto h-12 p-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
              >
                Cari Layanan
              </button>
            </div>

            <h1 className="text-2xl font-bold">Special Items</h1>

            <div className=" grid grid-cols-3 gap-6">
              {product.items["special items"].map((item, index) => (
                <button
                  onClick={() => {
                    if (selectedItem?.name === item.name) {
                      setSelectedItem([]);
                    } else {
                      setSelectedItem(item);
                    }
                  }}
                  key={index}
                  className={`flex justify-between gap-8  min-h-[132px] ${
                    selectedItem?.name === item.name
                      ? "bg-yellow-600"
                      : "bg-[#363636]"
                  } p-4 items-center rounded-lg`}
                >
                  <div className="flex flex-col h-full items-start text-start justify-between">
                    <h1 className=" font-bold text-lg ">{item.name}</h1>
                    <p
                      className={`font-bold text-lg ${
                        selectedItem?.name === item.name
                          ? "text-white"
                          : "text-yellow-500"
                      }`}
                    >
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.price)}
                    </p>
                  </div>

                  <img
                    src={`${item.image}`}
                    className="w-16 h-16 object-cover "
                    alt=""
                  />
                </button>
              ))}
            </div>

            <h1 className="text-2xl font-bold">
              {product.items["regular items"][0].name}
            </h1>

            <div className=" grid grid-cols-3 gap-6">
              {product.items["regular items"].map((item, index) => (
                <button
                  onClick={() => {
                    setSelectedItem((prev) =>
                      prev?.name === item.name ? null : item
                    );
                  }}
                  key={index}
                  className={`flex justify-between gap-8  min-h-[132px] ${
                    selectedItem?.name === item.name
                      ? "bg-yellow-600"
                      : "bg-[#363636]"
                  } p-4 items-center rounded-lg`}
                >
                  <div className="flex flex-col h-full items-start text-start justify-between">
                    <h1 className=" font-bold text-lg">
                      {`${item.quantity + item.bonus}`} {item.name} (
                      {item.quantity} + {item.bonus} {item.name})
                    </h1>
                    <p
                      className={`font-bold text-lg ${
                        selectedItem?.name === item.name
                          ? "text-white"
                          : "text-yellow-500"
                      }`}
                    >
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.price)}
                    </p>
                  </div>

                  <img
                    src={`${item.image}`}
                    className="w-16 h-16 object-cover "
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          {/* choose payment */}
          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Pilih Pembayaran</h1>

            {/* QRIS */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
                <h1>QRIS</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className="text-white size-5"
                >
                  <path
                    d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div
                className="flex border-x border-b border-[#535353] rounded-b-xl p-4"
                onClick={() =>
                  setPaymentMethod(paymentMethod === "QRIS" ? "" : "QRIS")
                }
              >
                <div className="relative flex flex-col p-4 w-full rounded-lg bg-white text-black overflow-hidden">
                  {paymentMethod === "QRIS" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-20">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png"
                      className="w-full object-cover"
                      alt="QRIS Logo"
                    />
                  </div>
                  <h1 className="font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">QRIS</p>
                </div>
              </div>
            </div>

            {/* E-Wallet */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
                <h1>E-Wallet</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className="text-white size-5"
                >
                  <path
                    d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4 border-x border-b border-[#535353] rounded-b-xl p-4">
                {/* Gopay */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(paymentMethod === "Gopay" ? "" : "Gopay")
                  }
                >
                  {paymentMethod === "Gopay" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNkYCbXFJSEYn6Sr4ACJQffqAZ1CGVYzbbBmZCMHbWfT4hpu1WVCK7po71tAxQbqhbyjPMcOpS3fHKPMZFFib78LDuxkeFkZQav64iN1pteAUxN7aFUUWcY5JXvnP3lKWux3DPpigyLcP0aSQaPQAR8a5lsLXx3tzIV88HW0pmeoTzVVaF0_Zznw/w400-h131/Logo%20GoPay%20%20-%20%20(Koleksilogo.com).png"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <h1 className="font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">Gopay</p>
                </div>

                {/* Dana */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(paymentMethod === "Dana" ? "" : "Dana")
                  }
                >
                  {paymentMethod === "Dana" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <h1 className="font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">Dana</p>
                </div>

                {/* Ovo */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(paymentMethod === "OVO" ? "" : "OVO")
                  }
                >
                  {paymentMethod === "OVO" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <h1 className="font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">OVO</p>
                </div>

                {/* Link Aja */}
                <div
                  className="relative flex flex-col col-span-3 p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(
                      paymentMethod === "LinkAja" ? "" : "LinkAja"
                    )
                  }
                >
                  {paymentMethod === "LinkAja" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-8">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/LinkAja.svg/480px-LinkAja.svg.png"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <h1 className="font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">Link Aja</p>
                </div>
              </div>
            </div>

            {/* M-Banking */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
                <h1>M-Banking</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className="text-white size-5"
                >
                  <path
                    d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4 border-x border-b border-[#535353] rounded-b-xl p-4">
                {/* BCA */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(paymentMethod === "BCA VA" ? "" : "BCA VA")
                  }
                >
                  {paymentMethod === "BCA VA" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">BCA Virtual Account</p>
                </div>

                {/* MAYBANK */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(
                      paymentMethod === "Maybank VA" ? "" : "Maybank VA"
                    )
                  }
                >
                  {paymentMethod === "Maybank VA" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className=" w-[74px] h-[24px]">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yBN_VHcNN8lWfcdiulPdPCDzg_i-bb1U2g&s"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">Maybank Virtual Account</p>
                </div>

                {/* BNI */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(paymentMethod === "BNI VA" ? "" : "BNI VA")
                  }
                >
                  {paymentMethod === "BNI VA" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">BNI Virtual Account</p>
                </div>

                {/* BRI */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(paymentMethod === "BRI VA" ? "" : "BRI VA")
                  }
                >
                  {paymentMethod === "BRI VA" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_BRI.png/1200px-Logo_BRI.png"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">BRI Virtual Account</p>
                </div>

                {/* MANDIRI */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(
                      paymentMethod === "Mandiri VA" ? "" : "Mandiri VA"
                    )
                  }
                >
                  {paymentMethod === "Mandiri VA" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">Mandiri Virtual Account</p>
                </div>

                {/* PERMATA */}
                <div
                  className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                  onClick={() =>
                    setPaymentMethod(
                      paymentMethod === "Permata Bank VA"
                        ? ""
                        : "Permata Bank VA"
                    )
                  }
                >
                  {paymentMethod === "Permata Bank VA" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-[74px] h-[24px]">
                    <img
                      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYRXRn-ok9aV3B9zGFZqp3DpWXOtLu4Pf_3ErDOUhxEDQaLeHBTIbzJM_gbQ44XFXA2pEXv4yZek05MHHi0RsoQm_RIWJcgNqqpAr_fc3qP-PpgGnK5Tn7plQbNxwyPvaLW8YNwsfqjTcVm_htDWCHvi83bP2tOc4bZl9HaqU3rlzTc2GPcNu5wA/w640-h160/Bank%20Permata%20-koleksilogo.com.png"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">
                    Permata Bank Virtual Account
                  </p>
                </div>
              </div>
            </div>

            {/* Convinience Store */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
                <h1>Convinience Store</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className="text-white size-5"
                >
                  <path
                    d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="flex border-x border-b border-[#535353] rounded-b-xl p-4"
                onClick={() =>
                  setPaymentMethod(
                    paymentMethod === "Alfamart" ? "" : "Alfamart"
                  )
                }
              >
                <div className="relative flex flex-col p-4  w-full rounded-lg bg-white text-black overflow-hidden">
                  {paymentMethod === "Alfamart" && (
                    <div className="absolute flex justify-center right-[-75px] top-[-75px] pt-1 w-32 h-32 bg-yellow-600 rotate-[225deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#000000"
                        fill="none"
                        className="text-white rotate-[135deg] size-8"
                      >
                        <path
                          d="M5 14L8.5 17.5L19 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="w-20">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ALFAMART_LOGO_BARU.png/1200px-ALFAMART_LOGO_BARU.png"
                      className="w-full object-cover "
                      alt=""
                    />
                  </div>
                  <h1 className=" font-bold text-xl py-4 border-b">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      selectedItem?.price * 0.1 + selectedItem?.price || 0
                    )}
                  </h1>
                  <p className="pt-3 text-gray-400">Alfamart</p>
                </div>
              </div>
            </div>
          </div>

          {/* voucher code */}
          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Kode Voucher</h1>
            <div className="w-full border-t border-[#535353] "></div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">Kode Voucher</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Masukkan Kode Voucher"
                  required
                  className="p-3 bg-[#212121] rounded-lg w-full"
                />
                <button
                  type="submit"
                  className="mt-auto h-12 py-3 px-6 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
                >
                  Cek
                </button>
              </div>
            </div>
          </div>

          {/* confirm order */}
          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Konfirmasi Pesanan</h1>
            <div className="w-full border-t border-[#535353] "></div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">No. Whatsapp</label>
              <input
                type="text"
                placeholder="Masukkan No. Whatsapp"
                required
                className="p-3 bg-[#212121] rounded-lg "
              />
            </div>

            <h1>Dengan membeli otomatis saya menyutujui Ketentuan Layanan.</h1>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full ">
          {/* How to top up */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
              <h1>Cara Top Up</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="text-white size-5"
              >
                <path
                  d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4">
              <ol className="list-decimal pl-6">
                <li>
                  Masukkan User ID dan Zone ID Anda, Contoh, User ID : 667632423
                  Zone ID : 5246
                </li>
                <li>Pilih Nominal Diamonds yang kamu inginkan</li>
                <li>Tulis nomor WhatsApp yg benar!</li>
                <li>Selesaikan pembayaran</li>
                <li>Diamonds akan ditambahkan ke akun Mobile Legends kamu</li>
              </ol>
            </div>
          </div>

          {/* Example receive diamond or something */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
              <h1>Contoh Diamond Yang Masuk</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="text-white size-5"
              >
                <path
                  d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4">
              <h1>
                Jika kamu order 110 (100 + 10 diamond). Maka diamond yang akan
                kamu dapat total 110 Diamond.
              </h1>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
              <h1>Tentang Weekly Diamond Pass</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="text-white size-5"
              >
                <path
                  d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4">
              <ol
                className="list-decimal pl-6"
                style={{ listStyleType: "disc" }}
              >
                <li>
                  Pastikan Level Akun Mobile Legends kamu sudah mencapai level 5
                </li>
                <li>
                  Pastikan kamu Top Up di Original Server (Bukan Advanced
                  Server)
                </li>
                <li>
                  Kamu tidak bisa Top Up Weekly Diamond jika sudah 0/10 (70
                  Hari) kalian bisa check di bagian weekly diamond masing masing
                  akun
                </li>
                <li>
                  Jika masih 3/10 berarti kalian masih bisa top up 3x lagi
                </li>
              </ol>
            </div>
          </div>

          {/* Top up Original Server */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
              <h1>Top Up Original Server</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="text-white size-5"
              >
                <path
                  d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4">
              <h1>
                Hanya bisa untuk top up original server, tidak bisa untuk
                advance server
              </h1>
            </div>
          </div>

          {/* Urgent! */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center bg-[#535353] rounded-t-xl p-4">
              <h1>PENTING!</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="text-white size-5"
              >
                <path
                  d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4">
              <h1>
                Pastikan limit Weekly Diamond Pass kamu tersedia. Jika terkena
                limit, proses maksimal 5 hari kerja. 1x WDP dapat 80 diamond
              </h1>
            </div>
          </div>

          {/* Detail Order */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 p-4 bg-[#2b2b2b] rounded-xl border border-dashed ">
              <h1 className="font-medium">Detail Pembelian</h1>
              <div className="flex gap-4">
                <img
                  src={`${product.image}`}
                  className="w-14 h-14 rounded-xl"
                  alt=""
                />
                <h1 className="font-medium">
                  {product.name} <br /> {product.items["special items"][0].name}
                </h1>
              </div>
              <div className="flex justify-between">
                <h1>{product.items["regular items"][0].name}</h1>
                <p className="font-medium">
                  {(selectedItem?.quantity + selectedItem?.bonus || "") +
                    " " +
                    (selectedItem?.name || "-")}
                </p>
              </div>
              <div className="flex justify-between">
                <h1>Harga</h1>
                <p className="font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(selectedItem?.price || 0)}
                </p>
              </div>
              <div className="flex justify-between">
                <h1>Tax(10%)</h1>
                <p className="font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(selectedItem?.price * 0.1 || 0)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className=" text-xl font-medium">Total</h1>
                <p className="text-xl font-medium text-yellow-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    selectedItem?.price * 0.1 + selectedItem?.price || 0
                  )}
                </p>
              </div>
              <button
                onClick={handleAddOrder}
                disabled={
                  !userID ||
                  !zoneID ||
                  !selectedItem ||
                  !paymentMethod ||
                  isLoading
                }
                className={`w-full p-3 text-white rounded ${
                  !userID || !zoneID || !selectedItem || !paymentMethod
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-600 hover:bg-yellow-500"
                }`}
              >
                {isLoading ? "Processing..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
