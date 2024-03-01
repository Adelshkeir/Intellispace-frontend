import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { removeFromCart, updateQuantity } from "../../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/cartSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { MdRemove, MdAdd } from "react-icons/md"; // Importing the MdRemove and MdAdd icons from React Icons
import "./cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const [, payloadBase64] = token.split(".");
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      const userId = payload.id;
      console.log("User ID:", userId);
    } else {
      console.log("Token not found in localStorage.");
    }
  }, []);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleIncrementQuantity = (item) => {
    dispatch(
      updateQuantity({ productId: item.id, quantity: item.quantity + 1 })
    );
  };

  const handleDecrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ productId: item.id, quantity: item.quantity - 1 })
      );
    }
  };

  const handleQuantityChange = (e, item) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    dispatch(updateQuantity({ productId: item.id, quantity: newQuantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in localStorage.");
        window.location.href = "/login"; 
        return; 
      }

      const [, payloadBase64] = token.split(".");
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      const userId = payload.id;

      const orderData = {
        userId: userId,
        totalAmount: totalPrice,
        products: cartItems,
      };
      console.log("Request sent to backend:", orderData);
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to proceed to checkout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed to checkout!",
      });

      if (confirmation.isConfirmed) {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_URI + "/order",
          orderData
        );
        console.log(response.data);
        dispatch(clearCart());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your order has been successfully placed!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error occurred while processing order:", error);
    }
  };

  return (
    <div className="m-5">
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-warning2">Shopping Cart</h3>
              </div>
              {cartItems.map((item, index) => (
                <div key={index} className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URI}/${item.image}`}
                          className="img-fluid rounded-3"
                          alt={item.name}
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{item.name}</p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          className="btn btn-link px-2 cart-arrows"
                          onClick={() => handleDecrementQuantity(item)}
                        >
                          <MdRemove /> {/* Using MdRemove icon for decrease */}
                        </button>
                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          value={item.quantity}
                          type="number"
                          className="form-control form-control-sm"
                          onChange={(e) => handleQuantityChange(e, item)}
                        />
                        <button
                          className="btn btn-link px-2 cart-arrows"
                          onClick={() => handleIncrementQuantity(item)}
                        >
                          <MdAdd /> {/* Using MdAdd icon for increase */}
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">${item.price}</h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a
                          href="#!"
                          className="text-danger"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <i className="fas fa-trash fa-lg">
                            <FaTimes />
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="card">
                <div className="card-body text-center">
                  <button
                    type="button"
                    className="btn bg-warning1 btn-block btn-lg w-100"
                    onClick={handleClick}
                  >
                    Proceed to Checkout with a total of ${totalPrice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
