import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { CheckOrder } from "./pages/CheckOrder";
import { Profile } from "./pages/Profile";
import { History } from "./components/History";
import { DataProfile } from "./components/DataProfile";
import { AllProduct } from "./components/AllProduct";
import { ListGames } from "./components/ListGames";
import { ListVoucher } from "./components/ListVoucher";
import { Login } from "./auth/login";
import { SignUp } from "./auth/SignUp";
import { useState } from "react";

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <>
      <Router>
        <Navbar userData={userData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/product/*" element={<Product />}>
            <Route index element={<AllProduct />} />
            <Route path="games" element={<ListGames />} />
            <Route path="voucher" element={<ListVoucher />} />
          </Route>
          <Route path="/check-order/" element={<CheckOrder />} />
          <Route path="/profile/*" element={<Profile />}>
            <Route index element={<DataProfile />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
