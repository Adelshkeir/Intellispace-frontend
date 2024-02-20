import { FaFacebook, FaInstagram } from "react-icons/fa";
import "./Components.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <>
      <footer
        data-aos="fade-left"
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "transparent" }}
      >
        <section
          className="d-flex justify-content-around p-4 text-white"
          style={{ backgroundColor: "#EAEEEF" }}
        >
          <div className="me-5 text-warning1 ">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a
              href="https://www.facebook.com/p/Rayn-Look-100071182973185/"
              target="_blank"
              className="text-warning1 me-4"
            >
              <FaFacebook style={{ fontSize: "20px" }} />
            </a>
            <a
              href="https://www.instagram.com/rayn_look/?hl=en"
              target="_blank"
              className="text-warning1 me-4"
            >
              <FaInstagram style={{ fontSize: "20px" }} />
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center  text-md-start">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
                <h6 className="text-uppercase fw-bold text-warning1">
                  Intelispace
                </h6>
                <hr
                  className=" mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#EAEEEF",
                    height: "2px",
                  }}
                />
                <p>
                  <strong>Smart home solutions for your home</strong>
                </p>
                <p>
                  You can easily listen to your favorite music from anywhere in
                  your home with a touch of a button, or you can create the
                  perfect entertaining ambiance by setting the shades and lights
                  in your living area and kitchen.
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
                <h6 className="text-uppercase fw-bold text-warning1">
                  Useful links
                </h6>
                <hr
                  className="mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "black",
                    height: "2px",
                  }}
                />
                <p>
                  <Link to={"/"} className="text-dark">
                    Home
                  </Link>
                </p>
                <p>
                  <Link to={"/Shop"} className="text-dark">
                    Shop
                  </Link>
                </p>
                <p>
                  <Link to={"/About"} className="text-dark">
                    About
                  </Link>
                </p>
                <p>
                  <Link to={"/Contact"} className="text-dark">
                    Contact
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
                <h6 className="text-uppercase fw-bold text-warning1">
                  Contact
                </h6>
                <hr
                  className="mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "black",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i>Beirut, Lebanon
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  Adelshkeir12@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 961 71278708
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-3">
          <span className="text-warning1">©</span> 2024 Copyright<span>@</span>
          Intelispace
        </div>
      </footer>
    </>
  );
};

export default Footer;
