import { Link, Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="flex flex-col gap-8 px-[300px] py-32 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-7 items-center">
          <img
            src="https://placehold.co/400x400"
            className="w-32 h-32 rounded-full"
            alt=""
          />

          <h1 className="text-5xl font-bold">User</h1>
        </div>

        <Link
          to={``}
          className="flex gap-2 items-center justify-center py-2 px-6 bg-[#2b2b2b] hover:bg-[#333333] duration-300 transition-all rounded-lg"
        >
          <h1>Logout</h1>
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>
        </Link>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/profile/`}
          className="flex justify-center items-cennter px-5 py-2 bg-yellow-600 rounded-lg"
        >
          Beranda
        </Link>

        <Link
          to={`/profile/history`}
          className="flex justify-center items-cennter px-5 py-2 bg-[#2b2b2b] rounded-lg"
        >
          Riwayat
        </Link>
      </div>

      <Outlet/>
    </div>
  );
};
