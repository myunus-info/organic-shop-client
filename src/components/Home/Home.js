import React, { useEffect, useState } from "react";
import "./Home.css";
import ShowProduct from "../ShowProduct/ShowProduct";
import spinner from "../../spinner.gif";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  useEffect(() => {
    fetch("https://vast-lowlands-39575.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingSpinner(false);
      });
  }, []);

  return (
    <div>
      <div className="container px-lg-0">
        {!loadingSpinner ? (
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="search-form mt-5 mb-5 text-center">
                <div className="input-group mb-3">
                  <input
                    id="input-field"
                    className="form-control"
                    type="text"
                    placeholder="Search product"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-success search-field"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
            {products.map((pd) => (
              <ShowProduct product={pd} key={pd._id} />
            ))}
          </div>
        ) : (
          <div className="spinner-container rounded-circle">
            <img className="img-fluid" src={spinner} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
