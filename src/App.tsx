import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "./commonUi/NavBar";
import "react-datepicker/dist/react-datepicker.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
