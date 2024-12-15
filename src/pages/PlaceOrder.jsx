import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllContext } from "../contexts/useContext";
import Background2 from "../assets/imgs/Background-2.png";
import { db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";

export const ProductOrder = ({ userData }) => {
  const { id } = useParams();
  const { dataProduct, dataVoucher } = useContext(AllContext);

  const product = dataProduct.find((item) => item.id.toString() === id);
  const voucher = dataVoucher.find((item) => item.id.toString() === id);

  const itemsSource = product || voucher;
  const isVoucher = itemsSource === voucher;

  const [userID, setUserID] = useState("");
  const [zoneID, setZoneID] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({
    topUp: false,
    exampleDiamond: false,
    weeklyDiamond: false,
    originalServer: false,
    important: false,
    qris: false,
    eWallet: false,
    mBanking: false,
    convinienceStore: false,
  });

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
      product: product
        ? {
            name: product.name,
            image: product.image,
            ["selected item"]: selectedItem.name,
            ["total quantity"]:
              selectedItem.quantity + selectedItem.bonus || "",
            ["total price"]: selectedItem?.price * 0.1 + selectedItem?.price,
          }
        : {
            name: voucher.name,
            image: voucher.image,
            ["selected item"]: selectedItem.name,
            
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

  if (!product && !voucher) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const toggleDropdown = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleFilterItems = () => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

    const allItems = [
      ...(product?.items?.["special items"] ||
        voucher?.items?.["special items"]),
      ...(product?.items?.["regular items"] ||
        voucher?.items?.["regular items"]),
    ];

    const filtered = allItems.filter(
      (item) => item.price >= min && item.price <= max
    );

    if (filtered.length > 0) {
      setFilteredItems(filtered);
      setIsNotFound(false);
    } else {
      setFilteredItems([]);
      setIsNotFound(true);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh w-full pt-24 text-white px-[300px] ">
      <div className="flex justify-between">
        <div className="flex gap-8 items-center w-[540px] py-12 ">
          <img
            src={`${product?.image || voucher?.image}`}
            className="w-[120px] h-[120px] rounded-2xl"
            alt=""
          />
          <h1 className="text-4xl font-bold">
            {product?.name || voucher?.name}
          </h1>
        </div>
        <img src={Background2} alt="" />
      </div>

      <div className=" py-12 grid grid-cols-4 gap-8">
        <div className=" col-span-3 flex flex-col gap-8 w-full">
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

          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Pilih Nominal Layanan</h1>
            <div className="grid grid-cols-5 gap-4 border-b border-[#535353] pb-8">
              <div className=" col-span-2 flex flex-col gap-3">
                <label htmlFor="">Minimum Harga</label>
                <input
                  type="number"
                  placeholder="Minimum Harga"
                  value={minPrice}
                  min="0"
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <div className="col-span-2 flex flex-col gap-3">
                <label htmlFor="">Maksimal Harga</label>
                <input
                  type="number"
                  placeholder="Maksimal Harga"
                  value={maxPrice}
                  min="0"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <button
                onClick={handleFilterItems}
                className="mt-auto h-12 p-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
              >
                Cari Layanan
              </button>
            </div>

            {itemsSource.items["special items"].filter(
              (item) =>
                item.price >= (minPrice || 0) &&
                item.price <= (maxPrice || Infinity)
            ).length > 0 && (
              <>
                <h1 className="text-2xl font-bold">Special Items</h1>
                <div className="grid grid-cols-3 gap-6">
                  {itemsSource.items["special items"]
                    .filter(
                      (item) =>
                        item.price >= (minPrice || 0) &&
                        item.price <= (maxPrice || Infinity)
                    )
                    .map((item, index) => (
                      <button
                        onClick={() => {
                          if (selectedItem?.name === item.name) {
                            setSelectedItem(null);
                          } else {
                            setSelectedItem(item);
                          }
                        }}
                        key={index}
                        className={`flex justify-between gap-8 min-h-[132px] ${
                          selectedItem?.price === item.price
                            ? "bg-yellow-600"
                            : "bg-[#363636]"
                        } p-4 items-center rounded-lg`}
                      >
                        <div className="flex flex-col h-full items-start text-start justify-between">
                          <h1 className="font-bold text-lg">{item.name}</h1>
                          <p
                            className={`font-bold text-lg ${
                              selectedItem?.price === item.price
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
                          className="w-16 h-16 object-cover"
                          alt=""
                        />
                      </button>
                    ))}
                </div>
              </>
            )}

            {!isVoucher &&
              itemsSource.items["regular items"].filter(
                (item) =>
                  item.price >= (minPrice || 0) &&
                  item.price <= (maxPrice || Infinity)
              ).length > 0 && (
                <>
                  <h1 className="text-2xl font-bold">Regular Items</h1>
                  <div className="grid grid-cols-3 gap-6">
                    {itemsSource.items["regular items"]
                      .filter(
                        (item) =>
                          item.price >= (minPrice || 0) &&
                          item.price <= (maxPrice || Infinity)
                      )
                      .map((item, index) => (
                        <button
                          onClick={() => {
                            if (selectedItem?.name === item.name) {
                              setSelectedItem(null);
                            } else {
                              setSelectedItem(item);
                            }
                          }}
                          key={index}
                          className={`flex justify-between gap-8 min-h-[132px] ${
                            selectedItem?.price === item.price
                              ? "bg-yellow-600"
                              : "bg-[#363636]"
                          } p-4 items-center rounded-lg`}
                        >
                          <div className="flex flex-col h-full items-start text-start justify-between">
                            <h1 className="font-bold text-lg">
                              {`${item.quantity + item.bonus}`} {item.name} (
                              {item.quantity} + {item.bonus} {item.name})
                            </h1>
                            <p
                              className={`font-bold text-lg ${
                                selectedItem?.price === item.price
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
                            className="w-16 h-16 object-cover"
                            alt=""
                          />
                        </button>
                      ))}
                  </div>
                </>
              )}

            {itemsSource.items["special items"].filter(
              (item) =>
                item.price >= (minPrice || 0) &&
                item.price <= (maxPrice || Infinity)
            ).length === 0 &&
            !isVoucher &&
            itemsSource.items["regular items"].filter(
              (item) =>
                item.price >= (minPrice || 0) &&
                item.price <= (maxPrice || Infinity)
            ).length === 0 ? (
              <div className="text-center flex flex-col justify-center items-center text-red-500">
                <h1 className="gap-4 text-center text-xl font-medium text-red-500">
                  Maaf, tidak ada hasil sesuai filter anda. <br /> silahkan ubah
                  filter untuk melihat banyak
                </h1>
                <img
                  src={`${itemsSource.items["regular items"][0]?.image || ""}`}
                  className="w-32 h-32 object-cover"
                  alt=""
                />
              </div>
            ) : null}
          </div>

          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Pilih Pembayaran</h1>

            {/* QRIS */}
            <div className="flex flex-col">
              <div
                onClick={() => toggleDropdown("qris")}
                className={`trigger flex justify-between items-center bg-[#535353] ${
                  isOpen.qris ? "rounded-t-xl" : "rounded-xl"
                } duration-300 transition-all p-4 cursor-pointer`}
              >
                <h1>QRIS</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className={`text-white size-5 ${
                    isOpen.qris ? "rotate-0" : "rotate-180"
                  } duration-300 transition-all`}
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

              {isOpen.qris ? (
                <div
                  className={`flex border-x border-b border-[#535353] rounded-b-xl ${
                    isOpen.qris
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 "
                  }  p-4 transition-all duration-300`}
                >
                  <div
                    className="relative flex flex-col p-4 w-full rounded-lg bg-white text-black overflow-hidden cursor-pointer"
                    onClick={() =>
                      setPaymentMethod(paymentMethod === "QRIS" ? "" : "QRIS")
                    }
                  >
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
              ) : (
                ""
              )}
            </div>

            {/* E-Wallet */}
            <div className="flex flex-col">
              <div
                onClick={() => toggleDropdown("eWallet")}
                className={`trigger flex justify-between items-center bg-[#535353] ${
                  isOpen.eWallet ? "rounded-t-xl" : "rounded-xl"
                } duration-300 transition-all p-4 cursor-pointer`}
              >
                <h1>E-Wallet</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className={`text-white size-5 ${
                    isOpen.eWallet ? "rotate-0" : "rotate-180"
                  } duration-300 transition-all`}
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

              {isOpen.eWallet ? (
                <div
                  className={`grid grid-cols-3 gap-4 border-x border-b border-[#535353] rounded-b-xl p-4 ${
                    isOpen.eWallet
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 "
                  }  p-4 transition-all duration-300`}
                >
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
              ) : (
                ""
              )}
            </div>

            {/* M-Banking */}
            <div className="flex flex-col">
              <div
                onClick={() => toggleDropdown("mBanking")}
                className={`trigger flex justify-between items-center bg-[#535353] ${
                  isOpen.mBanking ? "rounded-t-xl" : "rounded-xl"
                } duration-300 transition-all p-4 cursor-pointer`}
              >
                <h1>M-Banking</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className={`text-white size-5 ${
                    isOpen.mBanking ? "rotate-0" : "rotate-180"
                  } duration-300 transition-all`}
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

              {isOpen.mBanking ? (
                <div
                  className={`grid grid-cols-3 gap-4 border-x border-b border-[#535353] rounded-b-xl p-4 ${
                    isOpen.mBanking
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 "
                  }  p-4 transition-all duration-300`}
                >
                  {/* BCA */}
                  <div
                    className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                    onClick={() =>
                      setPaymentMethod(
                        paymentMethod === "BCA VA" ? "" : "BCA VA"
                      )
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
                    <p className="pt-3 text-gray-400">
                      Maybank Virtual Account
                    </p>
                  </div>

                  {/* BNI */}
                  <div
                    className="relative flex flex-col p-4 w-full justify-between rounded-lg bg-white text-black overflow-hidden"
                    onClick={() =>
                      setPaymentMethod(
                        paymentMethod === "BNI VA" ? "" : "BNI VA"
                      )
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
                      setPaymentMethod(
                        paymentMethod === "BRI VA" ? "" : "BRI VA"
                      )
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
                    <p className="pt-3 text-gray-400">
                      Mandiri Virtual Account
                    </p>
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
              ) : (
                ""
              )}
            </div>

            {/* Convinience Store */}
            <div className="flex flex-col">
              <div
                onClick={() => toggleDropdown("convinienceStore")}
                className={`trigger flex justify-between items-center bg-[#535353] ${
                  isOpen.convinienceStore ? "rounded-t-xl" : "rounded-xl"
                } duration-300 transition-all p-4 cursor-pointer`}
              >
                <h1>Convinience Store</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                  className={`text-white size-5 ${
                    isOpen.convinienceStore ? "rotate-0" : "rotate-180"
                  } duration-300 transition-all`}
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
              {isOpen.convinienceStore ? (
                <div
                  className={`flex border-x border-b border-[#535353] rounded-b-xl ${
                    isOpen.convinienceStore
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 "
                  }  p-4 transition-all duration-300`}
                >
                  <div
                    className="relative flex flex-col p-4  w-full rounded-lg bg-white text-black overflow-hidden"
                    onClick={() =>
                      setPaymentMethod(
                        paymentMethod === "Alfamart" ? "" : "Alfamart"
                      )
                    }
                  >
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
              ) : (
                ""
              )}
            </div>
          </div>

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

          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Konfirmasi Pesanan</h1>
            <div className="w-full border-t border-[#535353] "></div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">No. Whatsapp</label>
              <input
                type="text"
                placeholder={`${
                  userData["phone number"] || "Masukkan No. Whatsapp"
                }`}
                value={userData["phone number"]}
                required
                className="p-3 bg-[#212121] rounded-lg "
              />
            </div>

            <h1>Dengan membeli otomatis saya menyutujui Ketentuan Layanan.</h1>
          </div>
        </div>

        <div className={`flex flex-col gap-4 w-full `}>
          <div className="flex flex-col ">
            <div
              onClick={() => toggleDropdown("topUp")}
              className={`trigger flex justify-between items-center bg-[#535353] ${
                isOpen.topUp ? "rounded-t-xl" : "rounded-xl"
              } duration-300 transition-all p-4 cursor-pointer`}
            >
              <h1>Cara Top Up</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className={`text-white size-5 ${
                  isOpen.topUp ? "rotate-0" : "rotate-180"
                } duration-300 transition-all`}
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
              className={`flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4 overflow-hidden transition-all duration-300 ${
                isOpen.topUp ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ol className="list-decimal pl-6">
                <li>
                  Masukkan User ID dan Zone ID Anda, Contoh, User ID: 667632423
                  Zone ID: 5246
                </li>
                <li>Pilih Nominal Diamonds yang kamu inginkan</li>
                <li>Tulis nomor WhatsApp yg benar!</li>
                <li>Selesaikan pembayaran</li>
                <li>Diamonds akan ditambahkan ke akun Mobile Legends kamu</li>
              </ol>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              onClick={() => toggleDropdown("exampleDiamond")}
              className={`trigger flex justify-between items-center bg-[#535353] ${
                isOpen.exampleDiamond ? "rounded-t-xl" : "rounded-xl"
              } duration-300 transition-all p-4 cursor-pointer`}
            >
              <h1>Contoh Diamond Yang Masuk</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className={`text-white size-5 ${
                  isOpen.exampleDiamond ? "rotate-0" : "rotate-180"
                } duration-300 transition-all`}
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
              className={`flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4 overflow-hidden transition-all duration-300 ${
                isOpen.exampleDiamond
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <h1>
                Jika kamu order 110 (100 + 10 diamond). Maka diamond yang akan
                kamu dapat total 110 Diamond.
              </h1>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              onClick={() => toggleDropdown("weeklyDiamond")}
              className={`trigger flex justify-between items-center bg-[#535353] ${
                isOpen.weeklyDiamond ? "rounded-t-xl" : "rounded-xl"
              } duration-300 transition-all p-4 cursor-pointer`}
            >
              <h1>Tentang Weekly Diamond Pass</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className={`text-white size-5 ${
                  isOpen.weeklyDiamond ? "rotate-0" : "rotate-180"
                } duration-300 transition-all`}
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
              className={`flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4 overflow-hidden transition-all duration-300 ${
                isOpen.weeklyDiamond
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ol className="list-decimal pl-6">
                <li>
                  Pastikan Level Akun Mobile Legends kamu sudah mencapai level 5
                </li>
                <li>
                  Pastikan kamu Top Up di Original Server (Bukan Advanced
                  Server)
                </li>
                <li>
                  Kamu tidak bisa Top Up Weekly Diamond jika sudah 0/10 (70
                  Hari) kalian bisa check di bagian weekly diamond masing masing
                  akun
                </li>
                <li>
                  Jika masih 3/10 berarti kalian masih bisa top up 3x lagi
                </li>
              </ol>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              onClick={() => toggleDropdown("originalServer")}
              className={`trigger flex justify-between items-center bg-[#535353] ${
                isOpen.originalServer ? "rounded-t-xl" : "rounded-xl"
              } duration-300 transition-all p-4 cursor-pointer`}
            >
              <h1>Top Up Original Server</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className={`text-white size-5 ${
                  isOpen.originalServer ? "rotate-0" : "rotate-180"
                } duration-300 transition-all`}
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
              className={`flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4 overflow-hidden transition-all duration-300 ${
                isOpen.originalServer
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <h1>
                Hanya bisa untuk top up original server, tidak bisa untuk
                advance server
              </h1>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              onClick={() => toggleDropdown("important")}
              className={`trigger flex justify-between items-center bg-[#535353] ${
                isOpen.important ? "rounded-t-xl" : "rounded-xl"
              } duration-300 transition-all p-4 cursor-pointer`}
            >
              <h1>PENTING!</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className={`text-white size-5 ${
                  isOpen.important ? "rotate-0" : "rotate-180"
                } duration-300 transition-all`}
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
              className={`flex flex-col justify-between bg-[#2b2b2b] rounded-b-xl p-4 overflow-hidden transition-all duration-300 ${
                isOpen.important
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <h1>
                Pastikan limit Weekly Diamond Pass kamu tersedia. Jika terkena
                limit, proses maksimal 5 hari kerja. 1x WDP dapat 80 diamond
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 p-4 bg-[#2b2b2b] rounded-xl border border-dashed">
              <h1 className="font-medium">Detail Pembelian</h1>
              <div className="flex gap-4">
                <img
                  src={`${itemsSource.image}`}
                  className="w-14 h-14 rounded-xl"
                  alt=""
                />
                <h1 className="font-medium">
                  {itemsSource.name} <br />
                  {itemsSource.items["special items"][0]?.name || "-"}
                </h1>
              </div>

              {isVoucher ? (
                <div className="flex justify-between">
                  <h1>Voucher</h1>
                  <p className="font-medium">
                    {(selectedItem?.quantity + selectedItem?.bonus || "") +
                      " " +
                      (selectedItem?.name || "-")}
                  </p>
                </div>
              ) : (
                <div className="flex justify-between">
                  <h1>{product.items["regular items"][0].name}</h1>
                  <p className="font-medium">
                    {(selectedItem?.quantity + selectedItem?.bonus || "") +
                      " " +
                      (selectedItem?.name || "-")}
                  </p>
                </div>
              )}

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
                  }).format((selectedItem?.price || 0) * 0.1)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium">Total</h1>
                <p className="text-xl font-medium text-yellow-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format((selectedItem?.price || 0) * 1.1)}
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
