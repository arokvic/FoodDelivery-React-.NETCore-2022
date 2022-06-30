const dashboardItems = [
  {
    id: 1,
    title: "Edit profile",
    redirectUrl: "/update",
    role: ["ADMIN", "CONSUMER", "DELIVERER"],
    url: "/20943830.jpg",
  },
  {
    id: 2,
    title: "New order",
    redirectUrl: "./productList",
    role: ["ADMIN", "CONSUMER"],
  },
  {
    id: 3,
    title: "Previous orders",
    redirectUrl: "./register",
    role: ["DELIVERER"],
  },
  {
    id: 4,
    title: "Cart",
    redirectUrl: "./cart",
    role: ["CONSUMER"],
  },
  {
    id: 5,
    title: "Pending orders",
    redirectUrl: "./verifyorderlist",
    role: ["DELIVERER"],
    url: "/5227.jpg",
  },
  {
    id: 6,
    title: "Current order",
    redirectUrl: "./myorder",
    role: ["DELIVERER"],
  },
  {
    id: 7,
    title: "Verify users",
    redirectUrl: "./users",
    role: ["ADMIN"],
  },

  {
    id: 10,
    title: "Login",
    redirectUrl: "./login",
    role: ["UNAUTH"],
  },
  {
    id: 11,
    title: "Register",
    redirectUrl: "./register",
    role: ["UNAUTH"],
  },
  {
    id: 12,
    title: "Order history",
    redirectUrl: "./consumerorders",
    role: ["CONSUMER"],
  },
  {
    id: 13,
    title: "Current orders",
    redirectUrl: "./currentorders",
    role: ["CONSUMER"],
  },
];

export default dashboardItems;
