import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend proxy
  timeout: 10000,
});

export default api;