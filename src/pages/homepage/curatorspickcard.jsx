import React from "react";
import { Link } from "react-router-dom";
const Curatorspickcard = ({ product }) => {
  return (
    <figure className="snip1249">
      <div className="image">
        <img src={product.image} alt={product.name} />
        <i className="ion-ios-basketball-outline"></i>
      </div>
      <figcaption>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price">{product.price}$</div>
        <a href={`/Shop/${product.id}`} className="add-to-cart">
          View More
        </a>
      </figcaption>
    </figure>
  );
};

export default Curatorspickcard;
