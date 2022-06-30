import React from "react";
import CartItem from "./CartItem.jsx";
import { useGlobalContext } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ConsumerService from "../APIService/ConsumerService.js";
const CartContainer = () => {
  const { cart, setCart, total, clearCart } = useGlobalContext();
  const [comment, setComment] = React.useState("");
  const [address, setAddress] = React.useState("");
  const navigate = useNavigate();
  /*if (cartItems.length === 0) {
    return (
      <section className="cart">
        {/* cart header }
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  */
  const confirmOrder = async () => {
    //   const ids = cart.map((item) => {
    //    return item.idl;
    //    });
    //    console.log(ids);
    const proba = JSON.stringify({
      products: cart,
      orderAddress: address,
      comment: comment,
      totalPrice: total + 5,
    });
    console.log(proba);

    const dataa = await ConsumerService.PostOrder({
      // name: "aa",
      products: cart,
      orderAddress: address,
      comment: comment,
      totalPrice: total + 5,
    });
    clearCart();
    navigate("../dashboard");
  };

  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />

        <div id="container" className="cart-total">
          <div>
            <h4>Product price :${total}</h4>

            <h4>Delivery price :${5}</h4>
            <h4>Final price :${total + 5}</h4>
          </div>
          <div>
            <button className="btn clear-btn" onClick={clearCart}>
              clear cart
            </button>
          </div>
        </div>

        <box sx={{ width: 50 }}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id="standard-multiline-flexible"
            label="Comment"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
          />
        </box>
        <div id="container" className="cart-total">
          <div>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="standard-multiline-flexible"
              label="Address"
              multiline
              variant="standard"
              sx={{ mt: 2 }}
            />
          </div>
          <div>
            <button className="btn order-btn" onClick={() => confirmOrder()}>
              Complete order
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
