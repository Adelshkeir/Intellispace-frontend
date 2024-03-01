const Shoppageproductcard = ({ product }) => {
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    } else {
      return description;
    }
  };
  return (
    <figure className="snip1249">
      <div className="image">
        <img
          src={`${process.env.REACT_APP_BACKEND_URI}/${product.image}`}
          alt={product.name}
        />
        <i className="ion-ios-basketball-outline"></i>
      </div>
      <figcaption>
        <h3>{product.name}</h3>
        <p>{truncateDescription(product.description)}</p>
        <div className="price">{product.price}$</div>
        <a href={`/Shop/${product.id}`} className="add-to-cart">
          View More
        </a>
      </figcaption>
    </figure>
  );
};

export default Shoppageproductcard;
