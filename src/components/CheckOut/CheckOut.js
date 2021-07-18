import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import "./CheckOut.css";

const CheckOut = () => {
  const [loggedInUser] = useContext(UserContext);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://vast-lowlands-39575.herokuapp.com/checkout/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handlePlaceOrder = () => {
    const productDetails = {
      ...loggedInUser,
      ...product,
      orderedAt: new Date(),
    };
    axios
      .post(
        "https://vast-lowlands-39575.herokuapp.com/addOrder",
        productDetails
      )
      .then((res) => {
        res.status && alert("Order placed successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{product.name}</th>
                <td>{product.weight}kg</td>
                <td>${product.price}</td>
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td></td>
                <td>${product.price}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handlePlaceOrder}
            style={{ marginLeft: "93%" }}
            className="btn btn-success"
          >
            Chekcout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
