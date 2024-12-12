import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Bg from "../assets/imgs/Background.png";
import { auth, db } from "../Firebase";

export const Login = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("Authenticated User:", user);

      const userDocRef = doc(db, "user", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("Fetched User Data:", userData);

        localStorage.setItem("userData", JSON.stringify(userData));

        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        setUserData(userData);
        await navigate("/");
        window.location.reload();
      } else {
        console.log("No such user document found!");
        setError("User data not found. Please contact support.");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Failed to log in. Please check your email and password.");
    }
  };

  return (
    <div className="relative text-white">
      <img src={Bg} className="z-[-1] absolute w-full" alt="Background" />
      <div className="flex px-[300px] py-32 z-50">
        <div className="flex flex-col gap-8 justify-center w-1/2 h-[670px] bg-[#2b2b2b] rounded-2xl px-8">
          <h1 className="text-5xl font-bold">Masuk</h1>
          <h2>Masuk dengan akun yang telah Kamu daftarkan.</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
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

            <div className="flex flex-col gap-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 bg-[#212121] rounded-lg"
                required
              />
            </div>

            <div className="flex w-full justify-between">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Ingat saya</label>
              </div>

              <Link
                to={`/forgot-password`}
                className="text-yellow-600 hover:underline duration-300 transition-all"
              >
                Lupa Kata Sandimu?
              </Link>
            </div>

            <div className="flex justify-center items-center bg-white rounded-xl text-black h-[74px]">
              Captcha
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 h-12 rounded-xl duration-300 transition-all"
            >
              Masuk
            </button>

            <div className="flex gap-2 justify-center items-center">
              <h1 className="">Belum memiliki akun?</h1>
              <Link
                to={`/sign-up`}
                className="text-yellow-600 hover:underline font-bold"
              >
                Daftar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
