import axiosClient from "./axiosClient";

// ── Accept invite (set password)
export const acceptInvite = (data) =>
  axiosClient.post("/auth/accept-invite", data, { skipAuth: true });

// ── Join exchange directly
export const joinExchange = (data) =>
  axiosClient.post("/auth/join-exchange", data, { skipAuth: true });

// ── Login
export const loginUser = (data) =>
  axiosClient.post("/auth/login", data, { skipAuth: true });

// ── Request password reset (no token needed)
export const forgotPassword = (data) =>
  axiosClient.post("/auth/forgot-password", data, {
    skipAuth: true,
  });

// ── Complete password reset
export const resetPassword = (data) =>
  axiosClient.post("/auth/reset-password", data, {
    skipAuth: true,
  });

// ── Get current user (JWT required)
export const getMe = () =>
  axiosClient.get("/auth/me");
