import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import img from "../../img/coding1.png";

const ComingSoon = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Card sx={{ maxWidth: 345, border: "none", boxShadow: "none" }}>
          <CardMedia
            component="img"
            height="auto"
            image={img}
            alt="comming soon!"
          />
          <CardContent sx={{ pt: 0, textAlign: "center" }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ m: 0, mt: 1, color: "#2704eb", fontWeight: 600 }}
            >
              We Are Coding
            </Typography>
            <Typography variant="body2" fontSize={20} color="text.secondary">
              Coming soon!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ComingSoon;
