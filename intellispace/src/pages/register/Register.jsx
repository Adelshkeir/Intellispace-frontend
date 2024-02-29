import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../Redux/autheslice";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    location: "",
  });
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      setRedirected(true);
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URI + "/user/register",
        formData
      );

      console.log(
        "Received response status from register API:",
        response.status
      );
      console.log("Received response data from register API:", response.data);

      const { data } = response;
      const { token } = data;
      console.log("Received token:", token);
      dispatch(setToken(token));
      setRedirected(true); // Set redirected state to true upon successful registration
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (redirected) {
      window.location.href = "/"; // Redirect using window.location.href
    }
  }, [redirected]);

  return (
    <section className="vh-100 vw-100 user-login-container">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg "
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <label
                  className="form-label user-login-label"
                  htmlFor="username"
                >
                  Username
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  className="form-label user-login-label"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="form-label user-login-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="location"
                  className="form-control form-control-lg"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <label
                  className="form-label user-login-label"
                  htmlFor="location"
                >
                  Location
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="phonenumber"
                  className="form-control form-control-lg"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                />
                <label
                  className="form-label user-login-label"
                  htmlFor="phonenumber"
                >
                  Phone Number
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
