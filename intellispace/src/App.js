import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/homepage/homepage";
import Contactpage from "./pages/contactpage/contactpage";
import Aboutus from "./pages/aboutpage/aboutus";
import Shoppage from "./pages/shoppage/shoppage";
import Cart from "./pages/cart/cart";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Singleproductpage from "./pages/singleproductpage/singleproductpage";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
