import "./App.css";
import "./DarkMode/DarkMode.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  if (user) navigate("/dashboard");

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routers />
      <ToastContainer />
    </div>
  );
}

export default App;
