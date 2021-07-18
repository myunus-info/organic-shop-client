import React from "react";
import { useHistory } from "react-router-dom";
import "./ShowProduct.css";

const ShowProduct = (props) => {
  const { name, weight, price, imageURL, _id } = props.product;
  const history = useHistory();

  const handleProductOrder = () => {
    history.push(`/checkout/${_id}`);
  };

  return (
    <div className="col-xl-4 text-center">
      <div className="product-wrapper">
        <div className="img-box">
          <img
            src={imageURL}
            className="img-fluid w-100 h-100 rounded"
            alt=""
          />
        </div>
        <h3>
          {name}- {weight}kg
        </h3>
        <ul className="list-unstyled mt-4 d-flex justify-content-between">
          <li id="price">${price}</li>
          <button onClick={handleProductOrder} id="buy-now">
            Buy now
          </button>
        </ul>
      </div>
    </div>
  );
};

export default ShowProduct;
