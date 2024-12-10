import { Link, Outlet, useNavigate } from "react-router-dom";

export const Profile = ({ userData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    window.location.reload();
    await navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col gap-8 px-[300px] py-32 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-7 items-center">
          <img
            src={`${
              userData.photoUrl ||
              `https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png`
            }`}
            className="w-32 h-32 rounded-full"
            alt=""
          />

          <h1 className="text-5xl font-bold">{userData.username}</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex gap-2 items-center justify-center py-2 px-6 bg-[#2b2b2b] hover:bg-[#333333] duration-300 transition-all rounded-lg"
        >
          <h1>Logout</h1>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
        </button>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/profile`}
          className={`flex justify-center items-center px-5 py-2 ${
            isActive("/profile") ? "bg-yellow-600" : "bg-[#2b2b2b] hover:bg-yellow-500"
          } rounded-lg duration-300 transition-all`}
        >
          Beranda
        </Link>

        <Link
          to={`/profile/history`}
          className={`flex justify-center items-center px-5 py-2 ${
            isActive("/profile/history") ? "bg-yellow-600" : "bg-[#2b2b2b] hover:bg-yellow-500"
          } rounded-lg duration-300 transition-all`}
        >
          Riwayat
        </Link>
      </div>

      <Outlet />
    </div>
  );
};
