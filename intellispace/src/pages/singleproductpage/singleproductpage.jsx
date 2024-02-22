import { useEffect, useState } from "react";
import "./singleproductpage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Singleproductpage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <div className="singleproductpage-main">
      {product && (
        <div className="singleproductpage-product">
          <img src={`http://localhost:8080/${product.image}`} />
          <div className="singleproductpage-product-info">
            <h1>{product.name}</h1>
            <h5>{product.price}$</h5>
            <p>{product.description}</p>
            <button>Add To Cart</button>
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
