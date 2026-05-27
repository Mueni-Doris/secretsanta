import axiosClient from "./axiosClient";

// ── Get my match
export const getMyMatch = (userId, round = 2, eventId) =>
  axiosClient.get("/matches/my", {
    params: {
      userId,
      round,
      ...(eventId ? { eventId } : {}),
    },
  });

// ── Save match
export const saveMatch = (data) =>
  axiosClient.post("/matches", data);

// ── Get match status
export const getMatchStatus = (eventId) =>
  axiosClient.get("/matches/status", {
    params: eventId ? { eventId } : undefined,
  });
