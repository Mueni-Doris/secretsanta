// src/api/axiosClient.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
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
  (error) => Promise.reject(error)
);

// =====================
// RESPONSE INTERCEPTOR
// =====================
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;

    // 🔐 Unauthorized → logout
    if (status === 401) {
      localStorage.removeItem("ss_token");
      localStorage.removeItem("ss_user");
      window.location.href = "/login";
    }

    // 🌐 Network / backend down
    if (!error.response) {
      console.error("Backend unreachable:", error.message);
      const message = error.code === "ECONNABORTED"
        ? "Request timed out. Please try again."
        : "Backend is unreachable. Try again later.";

      return Promise.reject(
        new Error(message)
      );
    }

    // 💥 API error message cleanup
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      `Request failed with status ${status}`;

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
