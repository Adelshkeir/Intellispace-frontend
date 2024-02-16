const Shoppageproductcard = ({ product }) => {
  return (
    <div className="productcardcontainer">
      <div>
        <img src="https://i.ytimg.com/vi/HCkyirkk5Xo/sddefault.jpg" />
      </div>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button className="homepage-addtocart">View More</button>
    </div>
  );
};

export default Shoppageproductcard;
