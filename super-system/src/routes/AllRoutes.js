import MinimalLayout from "../layout/MinimalLayout/index";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout/index";
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";
import Single from "../pages/Single/Single";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import Notifications from "../pages/Notifications/Notifications";
import ComingSoon from "../pages/ComingSoon/ComingSoon";
import EditProduct from "../pages/EditProduct/EditProduct";
import NewProduct from "../pages/NewProduct/NewProduct";

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
        element: <Products />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/logs",
        element: <ComingSoon />,
      },
      {
        path: "/profile",
        element: <ComingSoon />,
      },
      {
        path: "/settings",
        element: <ComingSoon />,
      },
      {
        path: "/product/:id",
        element: <EditProduct />,
      },
      {
        path: "/product/create",
        element: <NewProduct />,
      },
    ],
  },
];

export default AllRoutes;
