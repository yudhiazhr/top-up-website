import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AllContext } from "../contexts/useContext";
import Background2 from "../assets/imgs/Background-2.png";

export const ProductOrder = () => {
  const { id } = useParams();
  const { dataProduct } = useContext(AllContext);

  const product = dataProduct.find((item) => item.id.toString() === id);

  console.log(product);

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
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="">Masukkan Zona ID</label>
                <input
                  type="text"
                  placeholder="Zona ID"
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
              <div className="flex justify-between gap-8 bg-[#363636] min-h-[132px]  p-4 items-center rounded-lg">
                <div className="flex flex-col h-full justify-between">
                  <h1 className=" font-bold text-lg">
                    {product.items["special items"][0].name}
                  </h1>
                  <p className="font-bold text-lg text-yellow-500">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.items["special items"][0].price)}
                  </p>
                </div>

                <img
                  src={`${product.items["special items"][0].image}`}
                  className="w-16 h-16 object-cover "
                  alt=""
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold">
              {product.items["regular items"][0].name}
            </h1>

            <div className=" grid grid-cols-3 gap-6">
              <div className="flex justify-between gap-8 bg-[#363636] min-h-[132px]  p-4 items-center rounded-lg">
                <div className="flex flex-col h-full justify-between">
                  <h1 className=" font-bold text-lg">
                    {product.items["regular items"][0].quantity +
                      product.items["regular items"][0].bonus}{" "}
                    {product.items["regular items"][0].name} (
                    {product.items["regular items"][0].quantity} +{" "}
                    {product.items["regular items"][0].bonus} Bonus)
                  </h1>
                  <p className="font-bold text-lg text-yellow-500">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.items["regular items"][0].price)}
                  </p>
                </div>

                <img
                  src={`${product.items["regular items"][0].image}`}
                  className="w-16 h-16 object-cover "
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* choose payment */}
          <div className="bg-[#2b2b2b] rounded-2xl gap-8 p-8 flex flex-col justify-center-center">
            <h1 className="text-2xl font-bold">Pilih Pembayaran</h1>
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  {product.items["special items"][0].name}
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
                  }).format(product.items["special items"][0].price)}
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
                  }).format(product.items["special items"][0].price * 0.1)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className=" text-xl font-medium">Total</h1>
                <p className="text-xl  font-medium text-yellow-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(
                    product.items["special items"][0].price * 0.1 +
                      product.items["special items"][0].price
                  )}
                </p>
              </div>

              <button className="ml-auto text-xl px-4 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg duration-300 transition-all">
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
