import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-server.up.railway.app/",
  // baseURL: "http://localhost:5000",
});

export default instance;
