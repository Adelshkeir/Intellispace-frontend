import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminhome.css";
import BasicLineChart from "./linechart";

const Adminhome = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(
          process.env.REACT_APP_BACKEND_URI + "/order"
        );
        const productResponse = await axios.get(
          process.env.REACT_APP_BACKEND_URI + "/product"
        );
        const categoryResponse = await axios.get(
          process.env.REACT_APP_BACKEND_URI + "/category"
        );

        console.log(productResponse);

        setOrderCount(orderResponse.data.length);
        setProductCount(productResponse.data.length);
        setCategoryCount(categoryResponse.data.length);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Admin-display-container">
      <div className="admin-home-container">
        <div className="Admin-counters">
          <div className="product-counter">
            <h1>
              {orderCount} <br />
              Orders
            </h1>
          </div>
          <div className="order-counter">
            <h1>
              {productCount} <br /> Products
            </h1>
          </div>
          <div className="Review-counter">
            <h1>
              {categoryCount} <br /> Categories
            </h1>
          </div>
        </div>

        <BasicLineChart className="line-chart" />
      </div>
    </div>
  );
};

export default Adminhome;
