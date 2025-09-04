import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend proxy
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use((res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status == 401 && !original._retry) {
      original._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;