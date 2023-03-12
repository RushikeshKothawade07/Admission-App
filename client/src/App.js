import React, { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Pagenotfound from "./components/Error";
import "bootstrap/dist/css/bootstrap.css";
import { initialState,reducer } from "./reducer/UseReducer";

import "./App.css";
import Logout from "./components/Logout";

  // contextAPI
  export const UserContext = createContext("");
const Routing=()=>{
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route element={<Pagenotfound />} />
    </Routes>
  )
}
const App = () => {

  const [state,dispatch] = useReducer(reducer,initialState)
  
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>

      <Navbar />
      <Routing/>
    </UserContext.Provider>
      
    </>
  );
};

export default App;
