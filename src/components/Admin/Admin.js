import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import ManageProduct from "../ManageProduct/ManageProduct";

const Admin = () => {
  const [imageURL, setImageURL] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const productDetails = {
      name: data.name,
      weight: data.weight,
      price: data.price,
      imageURL,
    };

    fetch("https://vast-lowlands-39575.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productDetails),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        alert("New product added!");
      });
  };

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "267b0108f8d79fe2e720c470f002c029");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => setImageURL(res.data.data.display_url))
      .catch((err) => console.log(err));
  };

  // TABs functionalities
  const [toggleState, setToggleState] = useState(1);
  const handleToggleTabs = (index) => {
    setToggleState(index);
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://vast-lowlands-39575.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="admin-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <ul className="admin-role list-unstyled">
              <li
                className={toggleState === 1 && "active-tab"}
                onClick={() => handleToggleTabs(1)}
              >
                <FontAwesomeIcon
                  icon={faTasks}
                  style={{ marginRight: "10px" }}
                />{" "}
                Manage Product
              </li>
              <li
                className={toggleState === 2 && "active-tab"}
                onClick={() => handleToggleTabs(2)}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "10px" }}
                />{" "}
                Add Product
              </li>
              <li
                className={toggleState === 3 && "active-tab"}
                onClick={() => handleToggleTabs(3)}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginRight: "10px" }}
                />{" "}
                Edit Product
              </li>
            </ul>
          </div>
          <div className="col-lg-9">
            <div className={toggleState === 2 ? "active-content" : "content"}>
              <h2>Add Product</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="admin-form d-flex justify-content-between"
              >
                <div>
                  <p htmlFor="productName">Product Name</p>
                  <input
                    className="input-field"
                    placeholder="Enter name"
                    {...register("name")}
                  />
                  <p className="mt-4" htmlFor="weight">
                    Weight
                  </p>
                  <input
                    className="input-field"
                    placeholder="Enter weight"
                    {...register("weight")}
                    name="weight"
                  />
                </div>
                <div>
                  <p htmlFor="price">Add Price</p>
                  <input
                    className="input-field"
                    placeholder="Enter price"
                    {...register("price")}
                    name="price"
                  />
                  <p className="mt-4" htmlFor="photo">
                    Add Photo
                  </p>
                  <input
                    placeholder="Upload Photo"
                    onChange={handleImageUpload}
                    name="photo"
                    type="file"
                  />

                  <button
                    style={{
                      marginLeft: "80%",
                      padding: "7px 25px",
                      backgroundColor: "#71BA58",
                      border: "none",
                    }}
                    className="btn btn-success mt-3"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className={toggleState === 1 ? "active-content" : "content"}>
              <h2>Manage Product</h2>
              <table className="table table-striped table-hover admin-form">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((pd) => (
                    <ManageProduct product={pd} key={pd._id} />
                  ))}
                </tbody>
              </table>
            </div>

            <h2
              className={toggleState === 3 ? "active-content" : "content"}
              style={{ textAlign: "center", marginTop: "50px" }}
            >
              Oops! Edit Options are not available for the time being!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
