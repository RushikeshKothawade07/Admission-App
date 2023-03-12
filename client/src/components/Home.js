import React, { useEffect, useState } from "react";
import "./home.css";
import admimg1 from "../images/clgadm1.png";
import admimg2 from "../images/clgadm.png";
import admimg3 from "../images/clgadm3.png";
import worriedimg from "../images/worriedimg.jpg";
import clgimg2 from "../images/clgimg2.jpg";
import clgimg3 from "../images/clgimg3.jpg";
import Accordion from "./Accordion/Accordion";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [show,setShow] = useState(false);
  const callHomePage = async (req, res, next) => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      setShow(true)

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callHomePage();
  },[]);
  return (
    <>
      <div className="page ">
        <div className=" mt-1 text-center bgimg">
          <br />
          <br />
          <h4 style={{"color"  :"blueviolet"}}>WELCOME</h4>
          <h2> {userData.name} </h2>
          <h4 className="head4">{show ? 'Happy to see you back 🤩' : `Do you imagine a hustle-free admission to your Dream College ?`}</h4>
          <br/>
          <br/>
          <h2 className="mt-3" style={{"font-size":"50px"}}> 
            <u>SHIKSHA</u>
          </h2>
          <div className="username mt-1 ">
            Jankari <span style={{ color: "green","font-weight":"bold" }}>Sahi</span> Mile Yahi
          </div>
          <div className="img-fluid mx-2 row justify-content-between d-flex mt-5 container-imgs p-5 m-md-0 m-lg-auto col-xs-6 col-md-12 col-md-3 mx-2">
            <img
              className="img1"
              src={admimg1}
              style={{ height: "300px", width: "400px" }}
              alt="admimg1"
            />
            <img
              className="img1"
              src={admimg3}
              style={{ height: "300px", width: "500px" }}
              alt="admimg3"
            />
            <img
              className="img1"
              src={admimg2}
              style={{ height: "300px", width: "400px" }}
              alt="admimg2"
            />
          </div>
        </div>

        <div className="">
          <div className="row"></div>
          <div className="d-flex col-md-6 justify-content-between p-2 m-2 ">
            <img
              src={clgimg3}
              style={{
                height: "300px",
                width: "auto",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
              alt="clgimg3"
            />
            <img
              src={clgimg2}
              style={{
                height: "300px",
                width: "auto",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
              alt="clgimg2"
            />
            <img
              src={worriedimg}
              style={{
                height: "300px",
                width: "auto",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
              alt="worriedimg"
            />
          </div>
        </div>
        <div className="space">
          <br />
          <br />
          <br />
        </div>
        {/* <div className="container">
          <h3>{userData.name}, Kya aap dhund rahe ho ek sahi college ?</h3>
          <h3>{userData.name}, Kya aap confused hai ek sahi branch chunane mai ?</h3>
          <h3>{userData.name}, Kya aapko admission se related hai bohot saari queries ?</h3>
          <h3>{userData.name}, Kya aap chahte ho college list ki zhanzht se chutkaara ?</h3>
        </div> */}

        <div className=" mt-5 row container col-md-6">
          <Accordion />
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;
