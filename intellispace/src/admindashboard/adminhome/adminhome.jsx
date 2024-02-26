import "./adminhome.css";
import BasicLineChart from "./linechart";

const Adminhome = () => {
  return (
    <div className="Admin-display-container">
      <div className="admin-home-container">
        <div className="Admin-counters">
          <div className="product-counter">
            <h1>
              1231 <br />
              Order
            </h1>
          </div>
          <div className="order-counter">
            <h1>
              322 <br /> Product
            </h1>
          </div>
          <div className="Review-counter">
            <h1>
              6177 <br /> Category
            </h1>
          </div>
        </div>

        <BasicLineChart className="line-chart" />
      </div>
    </div>
  );
};
export default Adminhome;
