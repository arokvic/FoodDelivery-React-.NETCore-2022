import React from "react";
import CartItem from "./CartItem.jsx";
import { useGlobalContext } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import VerifyOrderItem from "./VerifyOrderItem.jsx";
import Loading from "./Loading";
import Alert from "@mui/material/Alert";
import DelivererService from "../APIService/DelivererService.js";

const VerifyOrderList = () => {
  const { loading, setLoading } = useGlobalContext();

  const [orders, setOrders] = useState([]);
  const [error, setError] = React.useState(false);

  const fetchOrders = async () => {
    const data = await DelivererService.GetPendingOrders();
    if (data) {
      setOrders(data);
      console.log(data);
    } else {
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <section className="cart">
        <header>
          <h4 className="empty-cart">There are no pending orders</h4>
        </header>
      </section>
    );
  }

  return (
    <div>
      {error && (
        <Alert severity="error">Cant accept more than one order !</Alert>
      )}
      <section className="cart">
        <header>
          <h2>pending orders</h2>
        </header>

        <div>
          {orders.map((item) => {
            return (
              <VerifyOrderItem key={item.id} {...item} setError={setError} />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default VerifyOrderList;
