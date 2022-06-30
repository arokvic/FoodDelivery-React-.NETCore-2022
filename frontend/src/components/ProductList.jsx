import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/AuthProvider";
import ProductItem from "./ProductItem";
import Box from "@mui/material/Box";
import AddProduct from "./AddProduct";
import Loading from "./Loading";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import ConsumerService from "../APIService/ConsumerService";
export default function CocktailList() {
  const { loading, setLoading } = useGlobalContext();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await ConsumerService.GetProducts();
    console.log(data);

    if (data) {
      setProducts(data);
      console.log(products);
    } else {
      setProducts([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(products)]);

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return (
      <div>
        <h2 className="section-title">No products to display</h2>
        <AddProduct setProducts={setProducts}></AddProduct>
      </div>
    );
  }

  return (
    <Box>
      {localStorage.getItem("role") === "ADMIN" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          marginBottom={5}
        >
          <Button variant="outlined">
            <AddProduct setProducts={setProducts}></AddProduct>
          </Button>
        </Box>
      ) : null}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minWidth: 300,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((item) => {
          return <ProductItem key={item.id} {...item} />;
        })}
      </Box>
    </Box>
  );
}
