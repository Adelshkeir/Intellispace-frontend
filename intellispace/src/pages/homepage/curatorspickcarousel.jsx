import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import Curatorspickcard from "./curatorspickcard";

const Curatorspickcarousel = () => {


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

<Curatorspickcard />
<Curatorspickcard />
<Curatorspickcard />
<Curatorspickcard />
<Curatorspickcard />
<Curatorspickcard />
<Curatorspickcard />

    </Carousel>
  );
};

export default Curatorspickcarousel;