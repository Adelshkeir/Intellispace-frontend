import React from "react";
import { Link } from 'react-router-dom';
const Curatorspickcard = () => {
  return (
    <Link to="#" style={{ textDecoration: 'none' }}>
    <div className="categorycardcontainer">
      <div>
        <img src="https://i.ytimg.com/vi/HCkyirkk5Xo/sddefault.jpg"/>
      </div>
      <p>This is one of the cards</p>
      <p>233$</p>
      <button className="homepage-addtocart">Add To Cart</button>
    </div>
    </Link>
  );
};

export default Curatorspickcard;