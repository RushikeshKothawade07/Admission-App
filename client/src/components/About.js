import React, { useEffect,useState } from "react";
import profilepic from "../images/profilepic.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({})
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data)

      if (!res.status === 200) {
        throw new Error("user not found here ");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  },[]);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img
                src={profilepic}
                style={{ height: "200px", width: "200px" }}
                className="mb-3"
                alt="profilepic"
              />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.email}</h6>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-button"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>Social Handles </p>
                <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">
                  LinkedIn
                </a>
                <br />
                <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
                <br />
                <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">
                  Twitter
                </a>
                <br />
                <a href="https://www.google.com" rel="noopener noreferrer" target="_blank">
                  GitHub
                </a>
                <br />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
