import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "45%" }}>
        <CircularProgress color="secondary" />
      </Box>
    </>
  );
};

export default Loading;
