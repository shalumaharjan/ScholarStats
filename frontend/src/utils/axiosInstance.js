import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FASTAPI_API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
