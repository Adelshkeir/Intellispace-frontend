import "./admindashboard.css"
import intelispace from "../../assets/Intellispace.png"
import { HiMiniShoppingBag } from "react-icons/hi2";
import { BiNotepad } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { useState } from "react";
import Adminhome from "../adminhome/adminhome";
import Admincategories from "../admincategories/admincategories";
import Adminproducts from "../adminproducts/adminproducts";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdCategory } from "react-icons/md";

import Swal from "sweetalert2";
const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const handleSidebarClick = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <Adminhome />;
      case "Products":
        return <Adminproducts />;
      case "Orders":
        return <Adminhome />;
      case "Reviews":
        return <Adminhome />;
      case "Categories":
        return <Admincategories />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  };
  return (
    <div className="Admin-Dashboard">
      <div className="Admin-sidebar">


<img src={intelispace}alt="logo" className="admin-dashboard-logo" />

        <div
          className={`Admin-sidebar-section ${
            selectedComponent === "Dashboard" ? "selected" : ""
          }`}
          onClick={() => handleSidebarClick("Dashboard")}
        >
          <MdOutlineSpaceDashboard className="Admin-icons" />
          <h2>Dashboard</h2>
        </div>

        <div
          className={`Admin-sidebar-section ${
            selectedComponent === "Categories" ? "selected" : ""
          }`}
          onClick={() => handleSidebarClick("Categories")}
        >
          <MdCategory className="Admin-icons" />
          <h2>Categories</h2>
        </div>

        <div
          className={`Admin-sidebar-section ${
            selectedComponent === "Products" ? "selected" : ""
          }`}
          onClick={() => handleSidebarClick("Products")}
        >
          <HiMiniShoppingBag className="Admin-icons" />
          <h2>Products</h2>
        </div>

        <div
          className={`Admin-sidebar-section ${
            selectedComponent === "Orders" ? "selected" : ""
          }`}
          onClick={() => handleSidebarClick("Dashboard")}
        >
          <BiNotepad className="Admin-icons" />
          <h2>Orders</h2>
        </div>


        <div className="Admin-sidebar-section" onClick={handleLogout}>
          <CiLogout className="Admin-icons" />
          <h2>Logout</h2>
        </div>
      </div>

      <div className="Admin-Display">{renderSelectedComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
