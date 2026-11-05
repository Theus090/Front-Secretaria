import axios, { AxiosInstance } from "axios";
//https://intera-sesi-mobile.onrender.com
const api: AxiosInstance = axios.create({
  baseURL: "https://intera-sesi-mobile.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
