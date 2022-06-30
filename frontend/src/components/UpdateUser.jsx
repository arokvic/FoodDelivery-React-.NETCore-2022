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
import { useState, useEffect } from "react";
import { ConnectingAirportsOutlined, ContactMail } from "@mui/icons-material";
import { useGlobalContext } from "../context/AuthProvider";
import httpClient from "../httpClient";
import ConsumerService from "../APIService/ConsumerService";

const theme = createTheme();

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);

    const json = await ConsumerService.UpdateUserGet();

    setUser((user) => ({
      ...user,
      firstname: json.firstname,
      lastname: json.lastname,
      email: json.email,
      address: json.address,
      username: json.username,
    }));
    console.log(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataa = await ConsumerService.UpdateUserPut({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      username: user.username,
    });

    console.log({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      username: user.username,
    });
  };

  return (
    <div>
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
            <Avatar alt="Remy Sharp" src={localStorage.getItem("image")} />
            <Typography component="h1" variant="h5">
              My profile
            </Typography>
            <Box
              enctype="multipart/form-data"
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    InputLabelProps={{ shrink: true }}
                    label="First Name"
                    autoFocus
                    value={user.firstname}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        firstname: e.target.value,
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    InputLabelProps={{ shrink: true }}
                    value={user.lastname}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        lastname: e.target.value,
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    InputLabelProps={{ shrink: true }}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        email: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    InputLabelProps={{ shrink: true }}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={user.password}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        password: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    InputLabelProps={{ shrink: true }}
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={user.password}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        password: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    id="address"
                    name="address"
                    InputLabelProps={{ shrink: true }}
                    value={user.address}
                    onChange={(e) =>
                      setUser((user) => ({
                        ...user,
                        address: e.target.value,
                      }))
                    }
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="outlined"
                component="label"
                color="primary"
                sx={{ mt: 1, mb: 1 }}
              >
                {" "}
                <Add /> Upload a picture
                <input type="file" name="picture" hidden />
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                // onClick={() => handleSubmit()}
              >
                Update User
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default UpdateUser;
