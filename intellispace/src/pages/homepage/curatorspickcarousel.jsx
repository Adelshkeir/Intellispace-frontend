import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";
import Curatorspickcard from "./curatorspickcard";

const Curatorspickcarousel = () => {
  const [products, setProducts] = useState([]);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/curators_pick")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 500ms ease-in-out"
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass={`carousel-item-padding-40-px`}
    >
      {products.map((product, index) => (
        <Curatorspickcard key={index} product={product} />
      ))}
    </Carousel>
  );
};

export default Curatorspickcarousel;
