import { useRoutes } from "react-router-dom";
import AllRoutes from "./AllRoutes";

const config = {
  basename: "",
  defaultPath: "/",
};

export default function Routers() {
  return useRoutes(AllRoutes, config.basename);
}
