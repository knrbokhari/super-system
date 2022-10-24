import React, { useEffect, useState } from "react";
import Widget from "../../components/Widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";
import TableList from "../../components/Table/TableList";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import Cookies from "js-cookie";
import { logout } from "../../Features/UserSlice";
import Loading from "../../components/Loading/Loading";

const Typographys = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  margin: "20px 0",
}));

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [pageLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = `Bearer ${Cookies.get("token")}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/dashboard/data`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setDashboardData(data);
        console.log(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/");
        }
      });
  }, []);

  if (pageLoading) {
    return <Loading />;
  }

  const data = [];
  if (!dashboardData.length) {
    dashboardData?.paiChart?.map((i) => {
      data.push({ name: i?._id, value: i?.value });
    });
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Widget
            type="user"
            amount={dashboardData?.userLength}
            link={"users"}
          />
        </Grid>
        <Grid item md={4}>
          <Widget
            type="order"
            amount={dashboardData?.orderLength}
            link={"orders"}
          />
        </Grid>
        <Grid item md={4}>
          <Widget
            type="earning"
            amount={`$${dashboardData?.totalEarnings}`}
            link={"orders"}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Featured data={data} />
          </Grid>
          <Grid item md={8}>
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typographys variant="h4">Latest Transactions</Typographys>
        <TableList />
      </Box>
    </Box>
  );
};

export default Home;
