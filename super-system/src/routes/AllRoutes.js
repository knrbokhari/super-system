import MinimalLayout from "../layout/MinimalLayout/index";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout/index";
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";
import Single from "../pages/Single/Single";

const AllRoutes = [
  {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/products",
        element: <Single />,
      },
    ],
  },
];

export default AllRoutes;
