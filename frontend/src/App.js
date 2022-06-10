import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  const [test, setTest] = useState([]);

  // useEffect(() => {
  //   getTest();
  // }, []);

  // const getTest = async () => {
  //   const resp = await fetch("https://localhost:5001/api/Register");
  //   const data = await resp.json();
  //   console.log(data);
  // };

  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
