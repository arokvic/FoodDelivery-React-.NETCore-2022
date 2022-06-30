import React from 'react';
import CartItem from './CartItem.jsx';
import { useGlobalContext } from '../context/AuthProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import UserItem from './UserItem';
import ConsumerService from '../APIService/ConsumerService.js';
import OrderItem from './OrderItem.jsx';

const ConsumerOrders = () => {
  const { loading, setLoading } = useGlobalContext();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await ConsumerService.GetOrders();

    if (data) {
      console.log(' data postoji' + data);
      setOrders(data);
      console.log(orders);
    } else {
      // setOrders([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, [JSON.stringify(orders)]);

  if (loading) {
    return <Loading />;
  }
  if (orders.length < 1) {
    return (
      <section className="cart">
        <header>
          <h2>No order history</h2>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Order history</h2>
      </header>

      <div>
        {orders.map((item) => {
          return <OrderItem key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default ConsumerOrders;
