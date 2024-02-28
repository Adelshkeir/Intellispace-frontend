import React, { useState, useEffect } from "react";
import {  Table } from "react-bootstrap";
import axios from "axios";
import "./adminorders.css";
import Adminordercard from "./adminorderscard";
const Adminorders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/order");
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <Table striped bordered hover className="admin-order-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>location</th>
          <th>email</th>
          <th>Phone Number</th>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>
        
      {orders.map((order, index) => (
          <Adminordercard
          key={index}
order={order}
          />
        ))}


      </tbody>
    </Table>
  );
};

export default Adminorders;
