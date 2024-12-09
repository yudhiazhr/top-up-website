import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../Firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export const DataProfile = ({ userData }) => {
  const [username, setUsername] = useState(userData.username);
  const [phoneNumber, setPhoneNumber] = useState(userData["phone number"]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userDocRef = doc(db, "user", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        username: username,
        "phone number": phoneNumber,
      });

      const updatedUserData = {
        ...userData,
        username: username,
        "phone number": phoneNumber,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      alert("Profile updated successfully!");
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setError("Failed to update profile.");
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        setError("No authenticated user found.");
        setLoading(false);
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        passwordUpdated: true,
        password: newPassword,
      });

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        setError("Old password is incorrect.");
      } else if (err.code === "auth/weak-password") {
        setError("New password is too weak.");
      } else {
        setError("Failed to update password.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* Total Success */}
      <div className="flex flex-col justify-center gap-6 w-full h-[166px] bg-[#2b2b2b] rounded-lg py-5 px-8 ">
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
        <form onSubmit={handleProfileUpdate} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label htmlFor="">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">No. Whatsapp</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={() => {
                setUsername(userData.username);
                setPhoneNumber(userData["phone number"]);
              }}
              className="px-5 py-3 rounded-lg hover:bg-red-500 duration-300 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
              disabled={loading}
            >
              {loading ? "Saving..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="flex flex-col justify-center gap-6 w-full h-[526px] bg-[#2b2b2b] rounded-lg py-5 px-8">
        <h1 className="text-2xl font-bold">Ganti Password</h1>
        <div className="w-full border-t border-[#535353] "></div>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="">Password Lama</label>
            <input
              type="password"
              placeholder="Password lama"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="p-3 bg-[#212121] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">Password Baru</label>
            <input
              type="password"
              placeholder="Password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-3 bg-[#212121] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">Konfirmasi Password Baru</label>
            <input
              type="password"
              placeholder="Konfirmasi password baru"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="p-3 bg-[#212121] rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={() => {
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
              }}
              className="px-5 py-3 rounded-lg hover:bg-red-500 duration-300 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 duration-300 transition-all"
              disabled={loading}
            >
              {loading ? "Saving..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

/*   const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is authenticated.");
      }

      // Reauthenticate the user with their old password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      // Update the `user` collection in Firestore
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, {
        passwordUpdatedAt: new Date().toISOString(), // Log the time of the update
      });

      alert("Password changed successfully!");
      setLoading(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Error changing password:", err);

      if (err.code === "auth/wrong-password") {
        setError("Incorrect old password.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Failed to change password. Please check your old password.");
      }

      setLoading(false);
    }
  }; */
