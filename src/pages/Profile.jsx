import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
        const userDoc = await getDoc(doc(db, "user", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserUid(user);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("userData");
    window.location.reload()
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handlePhotoChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    const file = e.target.files[0];
    if (!file) return;

    setNewPhoto(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_API_UPLOAD_PRESET_CLOUDINARY);
    formData.append("cloud_name", import.meta.env.VITE_API_CLOUD_NAME_CLOUDINARY);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_API_CLOUD_NAME_CLOUDINARY}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        const photoURL = data.secure_url;

        const userRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(userRef, { photoUrl: photoURL });

        const updatedUserData = {
          ...userData,
          photoUrl: photoURL,
        };

        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        window.location.reload();
        setIsModalOpen(false);
      } else {
        console.error("No secure URL in response:", data);
      }
    } catch (error) {
      console.error("Error uploading photo to Cloudinary:", error);
    }
  };

  const handlePhotoDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRef = doc(db, "user", auth.currentUser.uid);
      await updateDoc(userRef, { photoUrl: "" });

      const updatedUserData = {
        ...userData,
        photoUrl: "",
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 px-[300px] py-32 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-7 items-center">
          <div
            onClick={toggleModal}
            className="relative flex justify-center items-center group cursor-pointer"
          >
            <img
              src={`${
                userData.photoUrl ||
                `https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png`
              }`}
              className="w-32 h-32 rounded-full group-hover:filter group-hover:brightness-50 transition-all duration-200 object-cover"
              alt="Profile"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
              className="absolute size-12 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <path
                d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M13 4L20 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-5xl font-bold">{userData.username}</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex gap-2 items-center justify-center py-2 px-6 bg-[#2b2b2b] hover:bg-[#333333] duration-300 transition-all rounded-lg"
        >
          <h1>Logout</h1>
        </button>
      </div>

      <div className="flex gap-3">
        <Link
          to={`/profile`}
          className={`flex justify-center items-center px-5 py-2 ${
            isActive("/profile")
              ? "bg-yellow-600"
              : "bg-[#2b2b2b] hover:bg-yellow-500"
          } rounded-lg duration-300 transition-all`}
        >
          Beranda
        </Link>

        <Link
          to={`/profile/history`}
          className={`flex justify-center items-center px-5 py-2 ${
            isActive("/profile/history")
              ? "bg-yellow-600"
              : "bg-[#2b2b2b] hover:bg-yellow-500"
          } rounded-lg duration-300 transition-all`}
        >
          Riwayat
        </Link>
      </div>

      <Outlet />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-[#1a1a1a] p-8 rounded-lg max-w-xl w-full flex flex-col justify-center items-center gap-7">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-white font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="text-white hover:text-gray-400"
              >
                <path
                  d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-xl font-medium">Change Photo Profile</h1>
            <img
              src={`${
                userData.photoUrl ||
                `https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png`
              }`}
              className="w-32 h-32 rounded-full group-hover:filter group-hover:brightness-50 transition-all duration-200 object-cover"
              alt="Profile"
            />
            <div className="flex gap-3">
              <button
                onClick={() => document.getElementById("photoPicker").click()}
                className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-500 duration-300 transition-all"
              >
                Change Photo
              </button>
              <input
                type="file"
                id="photoPicker"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
              <button
                onClick={handlePhotoDelete}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 duration-300 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
