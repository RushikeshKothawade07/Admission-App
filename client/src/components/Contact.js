import React, {useState,useEffect} from "react";
// import './signup.css'
import './contact.css'

import contactus from "../images/contactus.jpg";
const Contact = () => {
  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});
  const userContact = async () => {
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
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone});

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  },[]);

  const handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value  })

    
  }

  const handleSend=async(e)=>{
    e.preventDefault();
    const {name,email,phone,message} = userData;
    const res = await fetch("/contact", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,email,phone,message
      }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      alert("Message not sent");
    } else {
      alert("Message sent");
      setUserData({...userData,message:""})
    
    }
  };
  return (
    <>
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Contact Us</h2>
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
                      placeholder="Your Name"
                      value={userData.name}
                      onChange={handleInput}
                      autoComplete="off"
               
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
                      placeholder="Your Email"
                      autoComplete="off"
                      value={userData.email}
                      onChange={handleInput}
        
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
                      placeholder="Your Phone"
                      autoComplete="off"
                      value={userData.phone}
                      onChange={handleInput}
         
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">
                      <i className="zmdi zmdi-message material-icons"></i>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Message. . . "
                      rows="5"
                      columns="40"
                      value={userData.message}
                      onChange={handleInput}
                    >                      
                    </textarea>
                  </div>

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Send"
                      onClick={handleSend}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src={contactus} alt="signupimg" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
