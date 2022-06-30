import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../context/AuthProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ProductItem({ id, price, name, ingredients }) {
  const { cart, setCart, addToCart } = useGlobalContext();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: "25%",
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
        height: 400,
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <CardHeader align-content="center" title={name} />
      </Box>
      <CardMedia
        component="img"
        height="194"
        image="/5.png"
        alt="Paella dish"
      />
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            fontSize={20}
            variant="body2"
            color="text.primary"
            sx={{ marginLeft: 0 }}
          >
            {ingredients}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={30} direction="row">
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={20}
              marginTop={2}
            >
              {`$${price}`}
            </Typography>

            <IconButton
              onClick={() => {
                if (!cart.some((e) => e.id === id)) {
                  addToCart(id, price, name, ingredients);
                }
              }}
              aria-label="add to cart"
            >
              <AddIcon sx={{ color: "blue", fontSize: 50 }} />
            </IconButton>
          </Stack>
        </Box>
      </CardActions>
    </Card>
  );
}
