import React, { useEffect, useState } from "react";
import "./shoppage.css";
import Shoppageproductcard from "./shoppageproductcard";
import axios from "axios";

const Shoppage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("All");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URI + "/category")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (categoryName) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URI}/product/category/${categoryName}`
        )
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [categoryName]);

  const handleCategoryClick = (name) => {
    setCategoryName(name);
  };

  return (
    <div className="shoppage-main">
      <div className="shoppage-titles">
        <h1>Shop</h1>
        <p>Browse our favorite sale products and categories</p>
      </div>
      <div className="shoppage-products-categories-container">
        <div className="shoppage-categories-container">
          <h5>Categories</h5>
          <p onClick={() => handleCategoryClick("All")}>All</p>
          {categories.map((category, index) => (
            <p key={index} onClick={() => handleCategoryClick(category.name)}>
              {category.name}
            </p>
          ))}
        </div>

        <div className="shoppage-products-container">
          {products.map((product, index) => (
            <Shoppageproductcard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shoppage;
