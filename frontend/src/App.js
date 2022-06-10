import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";

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
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
