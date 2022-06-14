import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Add from '@mui/icons-material/Add';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useState, useContext } from 'react';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import { useGlobalContext } from '../context/AuthProvider';

const theme = createTheme();

const Login = () => {
  const { setAuth, setLoggedIn, auth, loggedIn } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //   console.log(data);
    try {
      const respp = await fetch(
        `https://localhost:${process.env.REACT_APP_PORT}/api/Auth/Login`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            password: data.get('password'),
            username: data.get('username'),
          }),
        }
      );
      if (respp.ok) {
        const jsoned = await respp.json();

        localStorage.setItem('token', jsoned);
        const token = jsoned;
        setAuth({
          username: data.get('username'),
          password: data.get('password'),
          token: token,
        });
        setLoggedIn(true);
        console.log(auth.username);
        console.log(loggedIn);

        navigate('../dashboard');
      } else if (respp.status === 401) {
        console.log('Unathorized');
      } else if (respp.status === 400) {
        console.log('bad username or password');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Sign in
              </Button>
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
