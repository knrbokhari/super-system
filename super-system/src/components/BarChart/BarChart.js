import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { logout } from "../../Features/UserSlice";

const OrderBarChart = ({ title }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = `Bearer ${Cookies.get("token")}`;

  useEffect(() => {
    axios
      .get(`/orders/bar-chart`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        const chartData = data.reverse();
        setData(chartData);
        // console.log(data);
      })
      .catch((e) => {
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/");
        }
      });
  }, []);

  return (
    <>
      <Box className="chart">
        <Typography className="chart-title" sx={{ ml: 5, mt: 3 }}>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalOrder" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default OrderBarChart;
