import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";
import Swal from "sweetalert2";
import "./singleproductpage.css";
const Singleproductpage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const isInCart =
    cartItems.filter((item) => item.id === product?.id).length > 0;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${productID}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productID]);
  console.log("this is the cart", cartItems);
  const handleAddToCart = () => {
    dispatch(addToCart(product));

    Swal.fire({
      title: "Added to cart.",
      text: "Want to view your cart?",
      icon: "success",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/cart";
      } else {
       
      }
    });
  };

  return (
    <div className="singleproductpage-main">
      {product && (
        <div className="singleproductpage-product">
          <img src={`http://localhost:8080/${product.image}`} />
          <div className="singleproductpage-product-info">
            <h1>{product.name}</h1>
            <h5>{product.price}$</h5>
            <p>{product.description}</p>
            <button disabled={isInCart} onClick={handleAddToCart}>
              {isInCart ? "Already in cart" : "Add To Cart"}
            </button>
          </div>
        </div>
      )}
      <div className="Reviews-title-line"></div>
      <h4 className="Reviews-title">Reviews</h4>
      <div className="Reviews">
        {product &&
          product.Reviews.map((review) => (
            <div key={review.id} className="review">
              <p> {review.User.username}</p>
              <p>{review.message}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Singleproductpage;
