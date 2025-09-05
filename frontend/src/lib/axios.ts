import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend proxy
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
api.interceptors.response.use((res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status == 401 && !original._retry && !isRefreshing) {
      isRefreshing = true;
      original._retry = true;

      try {
        await api.post("/auth/refresh");
        isRefreshing = false;
        return api(original);
      } catch (e) {
        isRefreshing = false;
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;