import dateFns from "date-fns";
import React from "react";

const ShowOrder = (props) => {
  const { name, weight, price, imageURL, _id, orderedAt } = props.product;
  const orderTime = dateFns.distanceInWordsToNow(orderedAt, {
    addSuffix: true,
  });
  // console.log(_id);
  const handleDeleteOrder = (e) => {
    fetch(`https://vast-lowlands-39575.herokuapp.com/removeOrder/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        result && e.target.closest("#remove-product").remove();
        // console.log(e.target.closest("#remove-product"));
      });
  };

  return (
    <div className="col-xl-4 text-center">
      <div className="product-wrapper" id="remove-product">
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
          <button onClick={handleDeleteOrder} id="buy-now">
            Remove Order
          </button>
        </ul>
        <span style={{ textAlign: "left" }}>
          Order placed <strong>{orderTime}</strong>
        </span>
      </div>
    </div>
  );
};

export default ShowOrder;
