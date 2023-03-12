import { React, useState } from "react";
import "./signup.css";
import signupimg from "../images/signup-image.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
    city: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    //Object Destructuring
    const { name, email, phone, interests, city, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        interests,
        city,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      alert("invalid cred");
    } else  {
      alert("Success");
      navigate("/login");
    }
  
  };

  return (
    <>
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={user.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email" />
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-phone" />
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      value={user.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="interests">
                      <i className="zmdi zmdi-playstation" />{" "}
                    </label>
                    <input
                      type="text"
                      name="interests"
                      id="interests"
                      value={user.interests}
                      onChange={handleInputs}
                      placeholder="Your Interests"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">
                      <i className="zmdi zmdi-pin" />{" "}
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={user.city}
                      onChange={handleInputs}
                      placeholder="Your City"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={user.password}
                      onChange={handleInputs}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <i className="zmdi zmdi-lock-outline" />
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      value={user.cpassword}
                      onChange={handleInputs}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="agree-term"
                      id="agree-term"
                      className="agree-term"
                    />
                    <label htmlFor="agree-term" className="label-agree-term">
                      <span>
                        <span />
                      </span>
                      I agree all statements in
                      <NavLink className="nav-link" to="/policy">
                        Terms and Services
                      </NavLink>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                      onClick={PostData}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src={signupimg} alt="description" />
                </figure>
                <NavLink className="nav-link text-center" to="/login">
                  <u>I'm already registered</u>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
