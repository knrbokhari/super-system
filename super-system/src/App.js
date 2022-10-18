import "./App.css";
import "./DarkMode/DarkMode.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function App() {
  const user = useSelector((state) => state?.user);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(navigate("/"), 1000);
    }
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routers />
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
