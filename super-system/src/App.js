import "./App.css";
// import Home from "./pages/Home/Home";
// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login";
// import List from "./pages/List/List";
// import Single from "./pages/Single/Single";
// import NewProduct from "./pages/NewProduct/NewProduct";
import "./DarkMode/DarkMode.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Routers from "./routes";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
        </Route>
        <Route path="products">
          <Route index element={<List />} />
          <Route path=":productId" element={<Single />} />
          <Route path="new" element={<NewProduct title="Add New Product" />} />
        </Route>
      </Routes> */}
      <Routers />
    </div>
  );
}

export default App;
