import React from "react";
import Widget from "../../components/Widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";
import TableList from "../../components/Table/TableList";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Typographys = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  margin: "20px 0",
}));

const Home = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Widget type="user" />
        </Grid>
        <Grid item md={4}>
          <Widget type="order" />
        </Grid>
        <Grid item md={4}>
          <Widget type="earning" />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Featured />
          </Grid>
          <Grid item md={8}>
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typographys variant="h4" sx={{}}>
          Latest Transactions
        </Typographys>
        <TableList />
      </Box>
    </Box>
  );
};

export default Home;
