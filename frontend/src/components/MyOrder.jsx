import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import { menuItemUnstyledClasses } from "@mui/base";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { useGlobalContext } from "../context/AuthProvider";
import Loading from "../components/Loading";
import DelivererService from "../APIService/DelivererService";
import ConsumerService from "../APIService/ConsumerService";
import { useNavigate, useLocation } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MyOrder = () => {
  const { loading, setLoading } = useGlobalContext();
  const [seconds, setSeconds] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [order, setOrder] = useState({});
  const [delivered, setDelivered] = useState(false);
  const location = useLocation();
  const id = location.state?.id;

  const fetchOrder = () => {
    setLoading(true);
    DelivererService.GetMyOrder().then((data) => {
      console.log(data);
      setLoading(false);
      setDeliveryTime(data.deliveryTime);
      setOrder((order) => ({
        ...order,
        ...data,
      }));
      calculateTime(data.deliveryTime);
    });

    // console.log(data.deliveryTime);
    // console.log(deliveryTime);
    // if (data) {
    //   setOrder((order) => ({
    //     ...order,
    //     ...data,
    //   }));

    //   //setDeliveryTime(data.deliveryTime);
    //   calculateTime();

    //   setLoading(false);
    // } else {
    //   setOrder({});
    // }
  };

  const fetchConsumerOrder = async () => {
    setLoading(true);
    const data = await ConsumerService.GetConsumerOrder(id);

    if (data) {
      setOrder((order) => ({
        ...order,
        ...data,
      }));
      calculateTime(data.deliveryTime);
      setLoading(false);
    }
  };

  const calculateTime = (time) => {
    var dt = new Date();

    let deliveryFinishedTime = new Date(
      `${dt.getMonth() + 1} ${dt.getDate()}, ${dt.getFullYear()} ${time}:00`
    ).getTime();

    let currentTime = new Date().getTime();

    setSeconds((deliveryFinishedTime - currentTime) / 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "DELIVERER") {
      fetchOrder();
    } else if (localStorage.getItem("role") === "CONSUMER") {
      fetchConsumerOrder();
    }
  }, []);

  const onCompleteTimer = () => {
    const respp = DelivererService.PostFinishedOrder(order.id);
    setDelivered(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(order).length === 0) {
    console.log("nema ih");
    return (
      <div>
        <h2 className="section-title">No order to display</h2>
      </div>
    );
  }

  return (
    <Grid sx={{ ml: 4, mr: 4, mt: 5 }} container spacing={2}>
      <Grid item xs="5">
        <Typography variant="h3">Products</Typography>
        <hr />
        {order.products.map((item) => {
          return (
            <Card sx={{ mt: 2, mb: 2, display: "flex" }} fullWidth>
              <Box
                sx={{ width: "80%", display: "flex", flexDirection: "column" }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2">
                    Ingredients: {item.product.ingredients}
                  </Typography>
                </CardContent>
              </Box>
              <Typography
                sx={{ mr: 5 }}
                margin="auto"
                align="center"
                variant="h7"
              >
                Amount: {item.amount}
              </Typography>
            </Card>
          );
        })}
      </Grid>
      <Grid item xs="5">
        <Typography variant="h3">Order details</Typography>
        <hr />

        <Typography sx={{ mt: 3, mb: 10, ml: 2, mr: 2 }} variant="h3">
          {delivered ? (
            "Your order has been delivered"
          ) : (
            <CountdownCircleTimer
              isPlaying
              duration={seconds}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={onCompleteTimer}
              updateInterval={0}
            >
              {({ remainingTime }) =>
                `${Math.floor(remainingTime / 60)} : ${remainingTime % 60}`
              }
            </CountdownCircleTimer>
          )}
        </Typography>
        <div>
          <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
            Order Address: {order.orderAddress}
          </Typography>
        </div>
        <div>
          <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
            Order Comment: {order.comment}
          </Typography>
          <div>
            <Typography sx={{ mt: 4, mb: 4, ml: 2, mr: 2 }} variant="h5">
              Order Price: ${order.totalPrice}
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default MyOrder;
