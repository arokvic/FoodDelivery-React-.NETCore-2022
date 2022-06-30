import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box alignItems="center" justifyContent="center" sx={{ display: "flex" }}>
      <CircularProgress size={5} />
    </Box>
  );
};
export default Loading;
