export const DataProfile = () => {
  return (
    <>
      {/* Total Success */}
      <div className="flex flex-col justify-center  gap-6 w-full h-[166px] bg-[#2b2b2b] rounded-lg py-5 px-8 ">
        <h1>Total Belanja Sukses</h1>
        <p className="text-4xl font-bold">Rp. 1.516</p>
      </div>

      {/* Total order detail */}
      <div className="grid grid-cols-4 py-5 px-8 w-full h-[144px] bg-[#2b2b2b] rounded-lg ">
        <div className="flex flex-col gap-6 justify-center">
          <h1>Total Pesanan</h1>
          <p className="text-4xl font-bold">1</p>
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <h1>Belum Bayar</h1>
          <p className="text-4xl font-bold">0</p>
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <h1>Pending</h1>
          <p className="text-4xl font-bold">0</p>
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <h1>Sukses</h1>
          <p className="text-4xl font-bold">1</p>
        </div>
      </div>

      {/* Data Profile */}
      <div className="flex flex-col justify-center gap-8 w-full h-[306px] bg-[#2b2b2b] rounded-lg py-5 px-8 ">
        <h1 className="text-2xl font-bold">Data Profil</h1>
        <div className="w-full border-t border-[#535353] "></div>
        <form action="" className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="User"
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">No. Whatsapp</label>
              <input
                type="text"
                placeholder="08xxxxxxxxx02"
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>
          </div>

          <div className=" flex justify-end gap-5">
            <button
              type="Submit"
              className="px-5 py-3 rounded-lg  hover:bg-red-500 duration-300 transition-all"
            >
              Batal
            </button>
            <button
              type="Submit"
              className="px-5 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="flex flex-col justify-center gap-6 w-full h-[526px] bg-[#2b2b2b] rounded-lg py-5 px-8 ">
        <h1 className="text-2xl font-bold">Ganti Password</h1>
        <div className="w-full border-t border-[#535353] "></div>

        <form action="" className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="">Password Lama</label>
            <input
              type="text"
              placeholder="Password"
              className="p-3 bg-[#212121] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">Password Baru</label>
            <input
              type="text"
              placeholder="Password Baru"
              className="p-3 bg-[#212121] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">Konfirmasi Password Baru</label>
            <input
              type="text"
              placeholder="Konfirmasi Password Baru"
              className="p-3 bg-[#212121] rounded-lg"
            />
          </div>

          <div className=" flex justify-end gap-5">
            <button
              type="Submit"
              className="px-5 py-3 rounded-lg  hover:bg-red-500 duration-300 transition-all"
            >
              Batal
            </button>
            <button
              type="Submit"
              className="px-5 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
