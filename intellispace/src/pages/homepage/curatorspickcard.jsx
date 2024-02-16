import React from "react";
import { Link } from "react-router-dom";
const Curatorspickcard = ({ product }) => {
  return (
    <Link to="#" style={{ textDecoration: "none" }}>
      <div className="categorycardcontainer">
        <div>
          <img src={`http://localhost:8080/${product.image}`} />
        </div>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button className="homepage-addtocart">Add To Cart</button>
      </div>
    </Link>
  );
};

export default Curatorspickcard;
