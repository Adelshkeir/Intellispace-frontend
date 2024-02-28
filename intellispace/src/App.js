import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/homepage/homepage";
import Contactpage from "./pages/contactpage/contactpage";
import Aboutus from "./pages/aboutpage/aboutus";
import Shoppage from "./pages/shoppage/shoppage";
import Cart from "./pages/cart/cart";
import UserLogin from "./pages/login/userlogin";
import Register from "./pages/register/Register";
import Singleproductpage from "./pages/singleproductpage/singleproductpage";
import AdminDashboard from "./admindashboard/admindashboardmain/admindashboard";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./admindashboard/adminlogin/adminlogin";
import { useSelector } from "react-redux";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const token = useSelector((state) => state.auth.token);
  const isAdminLoggedIn = token != null;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Contact" element={<Contactpage />} />
            <Route path="/About" element={<Aboutus />} />
            <Route path="/Shop" element={<Shoppage />} />
            <Route path="/Shop/:productID" element={<Singleproductpage />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<UserLogin />} />
            <Route path="/Register" element={<Register />} />
          </Route>

          <Route
            path="/adminlogin"
            element={
              isAdminLoggedIn ? <Navigate to={"/admin"} /> : <AdminLogin />
            }
          />

          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard />
              ) : (
                <Navigate to={"/adminlogin"} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
