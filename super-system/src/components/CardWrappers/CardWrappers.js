import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import bg from "../../img/bg.png";
import { deepPurple } from "@mui/material/colors";

const CardWrapper = styled("div")(() => ({
  background: `url(${bg})`,
  backgroundColor: "#004eff66",
  backgroundPosition: "bottom left",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}));

const CardWrappers = ({ text, items, icon }) => {
  return (
    <>
      <Card>
        <CardWrapper>
          <CardActionArea>
            <CardContent>
              <ListItem sx={{ p: 0 }}>
                <ListItemAvatar sx={{ mr: 2 }}>
                  <Avatar
                    sx={{ bgcolor: deepPurple[500], width: 60, height: 60 }}
                    variant="rounded"
                  >
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ mb: -0.5, color: "#FFF" }}
                  >
                    {items}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#FFF" }}>
                    {text}
                  </Typography>
                </Box>
              </ListItem>
            </CardContent>
          </CardActionArea>
        </CardWrapper>
      </Card>
    </>
  );
};

export default CardWrappers;
