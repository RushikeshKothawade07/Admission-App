import React, { useState, useContext } from "react";
// import "./signup.css";
import signinimg from "../images/signin-image.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),

    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      alert("invalid cred");
    } else {
      dispatch({ type: "USER", payload: true });
      toast("Logged In Successfully 🤩");
      console.log(state);
      navigate("/");
    }
  };

  return (
    <>
      <div className="main">
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src={signinimg} alt="" />
                </figure>
                <NavLink className="nav-link text-center" to="/signup">
                  <u>Create a new account</u>
                </NavLink>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Log In</h2>
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group">
                    <label htmlFor="your-email">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input
                      type="email"
                      name="your-email"
                      id="your-email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="your_pass">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input
                      type="password"
                      name="your_pass"
                      id="your_pass"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="agree-term"
                    />
                    <label htmlFor="remember-me" className="label-agree-term">
                      <span>
                        <span />
                      </span>
                      Remember me
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      value="Log In"
                      onClick={loginUser}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
