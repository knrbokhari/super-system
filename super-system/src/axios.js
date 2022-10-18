import axios from "axios";

const instance = axios.create({
  // baseURL: "https://calm-beach-92689.herokuapp.com/",
  baseURL: "http://localhost:5000",
});

export default instance;
