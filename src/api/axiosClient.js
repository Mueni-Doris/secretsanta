// src/api/axiosClient.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// REQUEST INTERCEPTOR
// =====================
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ss_token");

    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    delete config.skipAuth;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================
// RESPONSE INTERCEPTOR
// =====================
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // clean return (no .data everywhere)
  },
  (error) => {
    const status = error?.response?.status;

    // 🔐 Unauthorized → force logout
    if (status === 401) {
      localStorage.removeItem("ss_token");
      localStorage.removeItem("ss_user");

      window.location.href = "/login";
    }

    // 🌐 Network / backend down
    if (!error.response) {
      console.error("Backend unreachable:", error.message);
      throw new Error("Backend is unreachable. Try again later.");
    }

    // 💥 Other API errors
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      `Request failed with status ${status}`;

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
