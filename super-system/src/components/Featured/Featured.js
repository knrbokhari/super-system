import React from "react";
import "./Featured.scss";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

const Featured = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <Box className="chart">
        <Typography className="chart-title">Total Revenue</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              width={"100%"}
              data={data}
              cx="50%"
              cy="40%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </>
    // <div className="featured">
    //   <div className="top">
    //     <h1 className="title">Total Revenue</h1>
    //     <MoreVertIcon fontSize="small" />
    //   </div>
    //   <div className="bottom">
    //     <div className="featuredChart">
    //       <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
    //     </div>
    //     <p className="title">Total sales made today</p>
    //     <p className="amount">$420</p>
    //     <p className="desc">
    //       Previous transactions processing. Last payments may not be included.
    //     </p>
    // <div className="summary">
    //   <div className="item">
    //     <div className="itemTitle">Target</div>
    //     <div className="itemResult negative">
    //       <KeyboardArrowDownIcon fontSize="small" />
    //       <div className="resultAmount">$12.4k</div>
    //     </div>
    //   </div>
    //   <div className="item">
    //     <div className="itemTitle">Last Week</div>
    //     <div className="itemResult positive">
    //       <KeyboardArrowUpOutlinedIcon fontSize="small" />
    //       <div className="resultAmount">$12.4k</div>
    //     </div>
    //   </div>
    //   <div className="item">
    //     <div className="itemTitle">Last Month</div>
    //     <div className="itemResult positive">
    //       <KeyboardArrowUpOutlinedIcon fontSize="small" />
    //       <div className="resultAmount">$12.4k</div>
    //     </div>
    //   </div>
    // </div>*
    //   </div>
    // </div>
  );
};

export default Featured;
