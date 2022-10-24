import React from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "../../Features/UserSlice";

const Sidebar = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logout());
    navigate("/");
    Cookies.remove("token");
  };

  return (
    <>
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/dashboard"
                  ? "#9c27b0"
                  : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon
                  style={{
                    color: `${
                      window.location.pathname === "/dashboard"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/users"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/users" ? "#9c27b0" : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonRoundedIcon
                  style={{
                    color: `${
                      window.location.pathname === "/users"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/products"
                  ? "#9c27b0"
                  : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <StoreIcon
                  style={{
                    color: `${
                      window.location.pathname === "/products"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/orders"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/orders" ? "#9c27b0" : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LocalShippingIcon
                  style={{
                    color: `${
                      window.location.pathname === "/orders"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/notifications"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/notifications"
                  ? "#9c27b0"
                  : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NotificationsNoneIcon
                  style={{
                    color: `${
                      window.location.pathname === "/notifications"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Notifications"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/logs"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/logs" ? "#9c27b0" : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InsertChartIcon
                  style={{
                    textDecoration: "none",
                    color: `${
                      window.location.pathname === "/logs"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Error Logs"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/profile"
                  ? "#9c27b0"
                  : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountCircleOutlinedIcon
                  style={{
                    color: `${
                      window.location.pathname === "/profile"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/settings"
            style={{
              textDecoration: "none",
              color: `${
                window.location.pathname === "/settings"
                  ? "#9c27b0"
                  : "#0000008a"
              }`,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsApplicationsIcon
                  style={{
                    color: `${
                      window.location.pathname === "/settings"
                        ? "#9c27b0"
                        : "#0000008a"
                    }`,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={handelLogout}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </>
  );
};

export default Sidebar;
