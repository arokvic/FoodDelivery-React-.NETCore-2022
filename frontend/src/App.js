import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CardItem from "./components/CardItem";
import UpdateUser from "./components/UpdateUser";
import ProductItem from "./components/ProductItem";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import CartContainer from "./components/CartContainer";
import Users from "./components/Users";
import UserItem from "./components/UserItem";
import VerifyOrderItem from "./components/VerifyOrderItem";
import VerifyOrderList from "./components/VerifyOrderList";
import MyOrder from "./components/MyOrder";
import RequireAuth from "./context/RequireAuth";
import Unathorized from "./components/Unauthorized";
import ConsumerOrders from "./components/ConsumerOrders";
import CurrentOrders from "./components/CurrentOrders";

function App() {
  const [test, setTest] = useState([]);

  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={["CONSUMER"]} />}>
            <Route path="/cart" element={<CartContainer />} />
            <Route path="/consumerorders" element={<ConsumerOrders />} />
            <Route path="/currentorders" element={<CurrentOrders />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["DELIVERER"]} />}>
            <Route path="/verifyorderitem" element={<VerifyOrderItem />} />

            <Route path="/verifyorderlist" element={<VerifyOrderList />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/users" element={<Users />} />

            <Route path="/userItem" element={<UserItem />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={["ADMIN", "CONSUMER", "DELIVERER"]} />
            }
          >
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/dashboard" element={<CardItem />} />

            <Route path="/update" element={<UpdateUser />} />

            <Route path="/productItem" element={<ProductItem />} />

            <Route path="/productList" element={<ProductList />} />

            <Route path="/unauthorized" element={<Unathorized />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
