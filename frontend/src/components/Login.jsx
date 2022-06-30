import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Add from "@mui/icons-material/Add";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState, useContext } from "react";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import httpClient from "../httpClient";
import { useGlobalContext } from "../context/AuthProvider";
import Alert from "@mui/material/Alert";
import ConsumerService from "../APIService/ConsumerService";
import FacebookLogin from "react-facebook-login";
const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [error, setError] = React.useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const responseFacebook = async (resp) => {
    /* const respp = await ConsumerService.LogInUserFb({
      name: resp.name,
      email: resp.email,
    });
    const jsoned = await respp.json();
    if (respp.ok) {
      localStorage.setItem("token", jsoned);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("image", resp.picture.data.url);
      navigate("/update");
      } */
  };

  const componentClicked = (data) => {
    console.log(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //   console.log(data);

    try {
      const respp = await ConsumerService.LogInUser({
        password: data.get("password"),
        username: data.get("username"),
      });
      const jsoned = await respp.json();
      if (respp.ok) {
        setLoggedIn(true);
        localStorage.setItem("token", jsoned.token);
        localStorage.setItem("role", jsoned.role);
        localStorage.setItem("loggedIn", true);

        const token = jsoned;

        const userImgBlob = await ConsumerService.GetUserImage();
        localStorage.setItem("image", URL.createObjectURL(userImgBlob));

        navigate("../dashboard");
      } else if (respp.status === 401) {
        console.log("Unathorized");
      } else if (respp.status === 400) {
        //console.log("bad username or password");
      } else if (respp.status === 404) {
        setError(true);
        console.log("bad username or password");
        setErrMsg(jsoned);
      }
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{errMsg} !</Alert>}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 6, width: 400, height: 400 }}
            >
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item sx={{ mt: 2, mb: 2 }} xs={3}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type={"password"}
                />
              </Grid>
              <Box sx={{ mt: 3, mb: 1 }}>
                <Button type="submit" fullWidth variant="contained">
                  Sign in
                </Button>
                <Button fullWidth>
                  {" "}
                  <FacebookLogin
                    cssClass="fb-btn"
                    appId="785808059074600"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    icon={<i className="fa fa-facebook" />}
                  />
                </Button>
              </Box>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
