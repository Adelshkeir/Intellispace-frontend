import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../Redux/autheslice";
import axios from "axios";
import "./adminlogin.css";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const [redirected, setRedirected] = useState(false);

  const handleLogin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("handleLogin function called with username:", username);

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URI + "/admin/login",
        {
          username,
          password,
        }
      );

      console.log("Received response status from login API:", response.status);
      console.log("Received response data from login API:", response.data);

      const { data } = response;
      const { token } = data;
      console.log("Received token:", token);
      dispatch(setToken(token));
      setRedirected(true);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(JSON.parse(token)));
      setRedirected(true);
    } else {
      console.log("No token found");
    }
  }, []);

  useEffect(() => {
    if (redirected) {
      setRedirected(false);
      window.location.href = "/admin";
    }
  }, [redirected]);

  return (
    <section className="vh-100 vw-100 admin-login-container">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid admin-image"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg "
                />
                <label
                  className="form-label admin-login-label"
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
                />
                <label
                  className="form-label admin-login-label"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
