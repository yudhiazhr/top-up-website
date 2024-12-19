import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { CheckOrder } from "./pages/CheckOrder";
import { Profile } from "./pages/Profile";
import { History } from "./components/History";
import { DataProfile } from "./components/DataProfile";
import { AllProduct } from "./components/AllProduct";
import { ListGames } from "./components/ListGames";
import { ListVoucher } from "./components/ListVoucher";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import React, { useEffect, useState } from "react";
import { ProductOrder } from "./pages/PlaceOrder";
import { ProcessingPayment } from "./pages/ProcessingPayment";
import { ConfirmationPayment } from "./pages/ConfirmationPayment";
import { DetailOrder } from "./pages/DetailOrder";
import { ForgotPassword } from "./auth/ForgotPassword";

const App = React.memo(() => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Navbar userData={userData} />
        <Routes>
          <Route index path="/" element={<Home />} />

          <Route
            path="/profile/*"
            element={isAuthenticated ? <Profile userData={userData} /> : <Navigate to="/login" />}
          >
            <Route index element={<DataProfile userData={userData} />} />
            <Route path="history" element={<History />} />
          </Route>

          <Route path="/product/*" element={<Product />}>
            <Route index element={<AllProduct />} />
            <Route path="games" element={<ListGames />} />
            <Route path="voucher" element={<ListVoucher />} />
          </Route>

          <Route path="/id/:id" element={ isAuthenticated ? <ProductOrder userData={userData}/> : <Navigate to="/login"/>}/>

          <Route
            path="/check-order/"
            element={isAuthenticated ? <CheckOrder userData={userData} /> : <Navigate to="/login" />}
          />

          <Route path="/waiting-payment/:id" element={ isAuthenticated ? <ProcessingPayment userData={userData}/> : <Navigate to="/login"/>}/>
          <Route path="/confirmation-payment/:id" element={ isAuthenticated ? <ConfirmationPayment userData={userData}/> : <Navigate to="/login"/>}/>

          <Route path="/detail-order/:id" 
          element={ isAuthenticated ? <DetailOrder userData={userData}/> : <Navigate to="/login"/>}/>

          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login setUserData={setUserData} />}
          />
          <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/forgot-password/*" element={isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />}/>

        </Routes>
        <Footer userData={userData} />
      </Router>
    </>
  );
});

export default App;
