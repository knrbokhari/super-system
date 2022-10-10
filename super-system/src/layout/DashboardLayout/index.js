import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
