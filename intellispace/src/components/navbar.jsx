import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import i20 from "../assets/Intellispace.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWindowScroll } from "react-use";
import Swal from "sweetalert2";

const Navigation = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
    AOS.init({ duration: 500 });
  }, []);

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
        setIsLoggedIn(false); 
        window.location.href = "/login";
      }
    });
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const { y } = useWindowScroll();

  useEffect(() => {
    if (y > 0) {
      AOS.refresh();
    }
  }, [y]);

  return (
    <div className="w-75 m-auto" data-aos="fade-right">
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand as={Link} to="/" className="d-flex justify-content-baseline">
          <img
            src={i20}
            alt=""
            className="custom-logo-class"
            onClick={handleNavigate}
            style={{ maxHeight: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="justify-self-end" />
        <Navbar.Collapse id="responsive-navbar-nav " className="justify-content-end">
          <Nav className="mr-auto">
            <NavLink
              as={Link}
              to="/"
              className="nav-link text-warning1 px-3"
              style={{ fontSize: "1.1rem" }}
            >
              Home
            </NavLink>
            <NavLink
              as={Link}
              to="/Shop"
              className="nav-link text-warning1 px-3"
              style={{ fontSize: "1.1rem" }}
            >
              Shop
            </NavLink>
            <NavLink
              as={Link}
              to="/About"
              className="nav-link text-warning1 px-3"
              style={{ fontSize: "1.1rem" }}
            >
              About
            </NavLink>
            <NavLink
              as={Link}
              to="/Contact"
              className="nav-link text-warning1 px-3"
              style={{ fontSize: "1.1rem" }}
            >
              Contact
            </NavLink>
            {isLoggedIn ? ( 
              <NavLink className="nav-link" onClick={handleLogout} style={{ fontSize: "1.1rem" }}>
                Logout
              </NavLink>
            ) : ( 
              <NavLink
                as={Link}
                to="/login"
                className="nav-link text-warning1 px-3"
                style={{ fontSize: "1.1rem" }}
              >
                Login
              </NavLink>
            )}
            <NavLink as={Link} to="/cart" className="nav-link " style={{ fontSize: "1.1rem" }}>
              <FaShoppingCart className="text-warning3" />
              <span
                className="cart-counter w-100"
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#2a74ed",
                  padding: "0.2em 0.5em",
                  margin: "0.2em",
                  fontSize: "1rem",
                }}
              >
                0
              </span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
