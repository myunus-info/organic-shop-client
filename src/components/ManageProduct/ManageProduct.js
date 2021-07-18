import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ManageProduct.css";

const ManageProduct = (props) => {
  const { name, weight, price, _id } = props.product;
  const handleDeleteProduct = (e) => {
    fetch(`https://vast-lowlands-39575.herokuapp.com/removeProduct/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => result && e.target.closest("#handle-delete").remove());
  };

  return (
    <tr id="handle-delete">
      <th scope="row">{name}</th>
      <td>{weight}kg</td>
      <td>${price}</td>
      <td className="text-danger" onClick={handleDeleteProduct}>
        <FontAwesomeIcon
          style={{ fontSize: "20px", cursor: "pointer" }}
          icon={faTrashAlt}
        />
      </td>
    </tr>
  );
};

export default ManageProduct;
