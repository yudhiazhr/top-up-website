import { Link } from "react-router-dom";
import Bg from "../assets/imgs/Background.png";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    "phone number": "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, "phone number": phoneNumber } = form;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Use the uid as the document ID
      const userDocRef = doc(db, "user", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        username: username,
        email: email,
        "phone number": phoneNumber,
        password: password, // Avoid storing plaintext passwords in production
      });

      alert("Account created successfully!");
      setForm({
        username: "",
        email: "",
        "phone number": "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative text-white">
      <img src={Bg} className="z-[-1] absolute w-full" alt="" />
      <div className="flex px-[300px] py-32 z-50">
        <div className="flex flex-col gap-8 justify-center w-1/2 py-6 bg-[#2b2b2b] rounded-2xl px-8">
          <h1 className="text-5xl font-bold">Daftar</h1>
          <h2>Silahkan isi form untuk membuat akun</h2>

          {error && <div className="text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={form.username}
                  onChange={handleInputChange}
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="">No. Whatsapp</label>
                <input
                  type="text"
                  placeholder="No. Whatsapp"
                  name="phone number"
                  value={form["phone number"]}
                  onChange={handleInputChange}
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
                className="p-3 bg-[#212121] rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="">Konfirmasi Password</label>
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="p-3 bg-[#212121] rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-center items-center bg-white rounded-xl text-black h-[74px]">
              Captcha
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 h-12 rounded-xl duration-300 transition-all"
            >
              Daftar
            </button>

            <div className="flex gap-2 justify-center items-center">
              <h1 className="">Sudah memiliki akun?</h1>
              <Link
                to={`/login`}
                className="text-yellow-600 hover:underline font-bold"
              >
                Masuk
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
