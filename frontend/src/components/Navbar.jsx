import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useGlobalContext } from "../context/AuthProvider";
import { Co2Sharp } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import navbarItems from "../data/navbarItems";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const pages = ["Register", "Login"];
const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { amount, clearCart } = useGlobalContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {localStorage.getItem("loggedIn") ? (
                <div>
                  {navbarItems.map((item) => {
                    if (
                      item.role.find(
                        (role) => role === localStorage.getItem("role")
                      )
                    ) {
                      return (
                        <MenuItem
                          onClick={() => {
                            console.log("usao select");
                            if (item.title === "Logout") {
                              clearCart();
                              localStorage.clear();
                            }
                            navigate(item.redirectUrl);
                          }}
                        >
                          <Typography textAlign="center">
                            {item.title}
                          </Typography>
                        </MenuItem>
                      );
                    }
                  })}
                </div>
              ) : (
                <Box>
                  <MenuItem
                    key="login"
                    onClick={() => navigate("./login")}
                    sx={{ alignContent: "" }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem
                    key="register"
                    onClick={() => navigate("./register")}
                  >
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {localStorage.getItem("loggedIn") ? (
              <Stack spacing={1} direction="row">
                {navbarItems.map((item) => {
                  if (
                    item.role.find(
                      (role) => role === localStorage.getItem("role")
                    )
                  ) {
                    return (
                      <Button
                        key={item.title}
                        onClick={() => {
                          if (item.title === "Logout") {
                            clearCart();
                            localStorage.clear();
                          }
                          navigate(item.redirectUrl);
                        }}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {item.title}
                      </Button>
                    );
                  }
                })}
              </Stack>
            ) : (
              <Stack spacing={1} direction="row">
                <Button
                  key="login"
                  onClick={() => navigate("./login")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  key="register"
                  onClick={() => navigate("./register")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
              </Stack>
            )}
          </Box>

          {localStorage.getItem("loggedIn") ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="/static/images/avatar/2.jpg"
                  src={localStorage.getItem("image")}
                />
              </IconButton>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
