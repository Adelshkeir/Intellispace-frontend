import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cartSlice";
import Swal from "sweetalert2";
import "./singleproductpage.css";

const Singleproductpage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const isInCart =
    cartItems.filter((item) => item.id === product?.id).length > 0;

  useEffect(() => {
    fetchProduct(productID);
  }, [productID]);

  const fetchProduct = (productId) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/product/${productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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

  const handleWriteReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewContent("");
  };

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URI + "/review",
        {
          productId: product.id,
          message: reviewContent,
          userId: "1",
        }
      );
      console.log("Review creation response:", response.data);
      handleCloseReviewModal();
      fetchProduct(productID); // Refetch product data after review creation
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="singleproductpage-main">
      {product && (
        <div className="singleproductpage-product">
          <img src={`${process.env.REACT_APP_BACKEND_URI}/${product.image}`} />
          <div className="singleproductpage-product-info">
            <h1>{product.name}</h1>

            <p>{product.description}</p>
            <h5 className="product-price">{product.price}$</h5>
            <button disabled={isInCart} onClick={handleAddToCart}>
              {isInCart ? "Already in cart" : "Add To Cart"}
            </button>
          </div>
        </div>
      )}
      <div className="Reviews-title-line"></div>
      <h2 className="Reviews-title">
        Reviews ({product && product.Reviews.length})
      </h2>
      <h5 className="Reviews-title-create" onClick={handleWriteReviewClick}>
        Write A Review
      </h5>
      <div className="Reviews">
        {product &&
          product.Reviews.map((review) => (
            <div key={review.id} className="review">
              <p> {review.User.username}</p>
              <p>{review.message}</p>
            </div>
          ))}
      </div>

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReviewContent">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your review here..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Singleproductpage;
