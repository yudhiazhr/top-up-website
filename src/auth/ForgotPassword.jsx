import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import Bg from "../assets/imgs/Background.png";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  const handleCheckEmailAndSendReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const usersRef = collection(db, "user");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        await sendPasswordResetEmail(auth, email);
        setSuccess("Instruksi reset password telah dikirim ke email Anda.");
      } else {
        setError("Email tidak terdaftar.");
      }
    } catch (err) {
      console.error("Error checking email or sending reset email:", err);
      setError("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <div className="relative text-white">
      <img src={Bg} className="z-[-1] absolute w-full" alt="Background" />
      <div className="h-dvh flex flex-col px-[300px] py-32 z-50">
        <div className="flex flex-col gap-8 justify-center w-1/2 py-5 bg-[#2b2b2b] rounded-2xl px-8">
          <h1 className="text-5xl font-bold">Lupa Kata Sandi?</h1>
          <h2>Masukkan Email Anda</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleCheckEmailAndSendReset} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-3 bg-[#212121] rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 h-12 rounded-lg duration-300 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
