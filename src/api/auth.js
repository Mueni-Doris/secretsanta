// src/api/auth.js

import axiosClient from "./axiosClient";

// ── Accept invite (set password)
export const acceptInvite = (data) =>
  axiosClient.post("/auth/accept-invite", data);

// ── Join exchange directly
export const joinExchange = (data) =>
  axiosClient.post("/auth/join-exchange", data);

// ── Login
export const loginUser = (data) =>
  axiosClient.post("/auth/login", data);

// ── Request password reset
export const forgotPassword = (data) =>
  axiosClient.post("/auth/forgot-password", data, { skipAuth: true });

// ── Complete password reset
export const resetPassword = (data) =>
  axiosClient.post("/auth/reset-password", data, { skipAuth: true });

// ── Get current user (token auto-attached by interceptor)
export const getMe = () =>
  axiosClient.get("/auth/me");
