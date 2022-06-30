import React from "react";
import { useGlobalContext } from "../context/AuthProvider";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import AdminService from "../APIService/AdminService";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

const OrderItem = ({
  id,
  products,
  orderAddress,
  comment,
  totalPrice,
  orderState,
  username,
  username1,
}) => {
  const navigate = useNavigate();

  return (
    <article className="cart-item">
      <img src={"/6.png"} />
      <Stack direction="row" spacing={5}>
        <div>
          {localStorage.getItem("role") === "CUSTOMER" ? (
            <h4>Delivere : {username1}</h4>
          ) : (
            <h4>Customer : {username}</h4>
          )}

          <h4>Price : {totalPrice}</h4>
          <h4>Comment : {comment}</h4>
        </div>

        <div>
          <h4>Order address : {orderAddress}</h4>
          <h4>
            Products :{" "}
            {products.map((item) => {
              return item.product.name + ",";
            })}
          </h4>
        </div>
      </Stack>
      <div>
        <Button
          onClick={() => navigate("/myorder", { state: { id: id } })}
          variant="text"
        >
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </Button>
      </div>
    </article>
  );
};

export default OrderItem;
