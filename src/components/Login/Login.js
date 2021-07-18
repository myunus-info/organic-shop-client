import React, { useContext, useState } from "react";
import "./Login.css";
import googleIcon from "../../Group 573.png";
import { UserContext } from "../../App";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../loginManager";
import { useHistory, useLocation } from "react-router-dom";
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
    success: false,
  });
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          name: displayName,
          email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        storeIdToken();
        history.replace(from);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const storeIdToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        sessionStorage.setItem("token", idToken);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="login-area">
              <h1>Login</h1>
              <div
                onClick={googleSignIn}
                className="image-box d-flex justify-content-between align-items-center mt-5 mb-5"
              >
                <img src={googleIcon} alt="" />
                <span>Sign in with google</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
