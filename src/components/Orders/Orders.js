import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import ShowOrder from "../ShowOrder/ShowOrder";
import "./Orders.css";

const Orders = () => {
  const [loggedInUser] = useContext(UserContext);
  const [productOrders, setProductOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://vast-lowlands-39575.herokuapp.com/orders?email=${loggedInUser.email}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setProductOrders(data));
  }, [loggedInUser.email]);

  return (
    <div className="container">
      <h3 className="text-center mt-3 mb-5">Products you ordered</h3>
      <div className="row">
        {productOrders.map((pd) => (
          <ShowOrder product={pd} key={pd._id} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
