import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/homepage/homepage";
import Contactpage from "./pages/contactpage/contactpage";
import Aboutus from "./pages/aboutpage/aboutus";
import Shoppage from "./pages/shoppage/shoppage";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
