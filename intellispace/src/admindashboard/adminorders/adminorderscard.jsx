import React, { useState, useEffect } from "react";
import axios from "axios";

const Adminordercard = ({ order }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/orderitem/${order.id}`);
      setOrderItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  return (
    <tr>
      <td>{order.User.username}</td>
      <td>{order.User.location}</td>
      <td>{order.User.email}</td>
      <td>{order.User.phonenumber}</td>
      <td >
        {orderItems.map((item, index) => (
            <div key={index} >
  {item.Product.name}   {item.quantity}x 
</div>
        ))}
      </td>
    </tr>
  ); 
};

export default Adminordercard;