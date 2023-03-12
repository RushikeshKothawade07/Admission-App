import React from "react";
import { NavLink } from "react-router-dom";

import "./Error.css";

const Pagenotfound = () => {
  return (
    <div className="">
      <NavLink to="/" target="">
        <header className="top-header"></header>
        {/*dust particel*/}
        <div>
          <div className="starsec" />
          <div className="starthird" />
          <div className="starfourth" />
          <div className="starfifth" />
        </div>
        {/*Dust particle end-*/}
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable" />
            <div className="cover" />
            <div className="in-cover">
              <div className="bulb" />
            </div>
            <div className="light" />
          </div>
        </div>
        {/* END Lamp */}
      </NavLink>
      <section className="error">
        <NavLink to="/" target="">
          {/* Content */}
        </NavLink>
        <div className="error__content">
          <NavLink to="/" target="">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <h3 style={{"color":"red"}}>ERROR 404</h3>
              <p className="message__text">
                We're sorry, the page you were looking for isn't found here. The
                link you followed may either be broken or no longer exists.
                Please try again, or take a look at our.
              </p>
            </div>
          </NavLink>
          <div className="error__nav e-nav">
            <NavLink to="/" target=""></NavLink>
            <NavLink to="/" target="" className="e-nav__link" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pagenotfound;
