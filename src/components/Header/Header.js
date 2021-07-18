import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="d-flex justify-content-between">
              <div className="navbar-brand">Organic Shop</div>
              <ul className="d-flex list-unstyled">
                <li>
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/deals">
                    Deals
                  </Link>
                </li>

                {loggedInUser.email ? (
                  <li style={{ backgroundColor: "transparent" }}>
                    <img
                      className="img-fluid rounded-circle"
                      src={loggedInUser.photo}
                      alt=""
                    />
                  </li>
                ) : (
                  <li>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
