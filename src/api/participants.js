import axiosClient from "./axiosClient";

// ── Join event/exchange
export const joinExchange = (data) =>
  axiosClient.post("/participants/join", data);

// ── Get participants
export const getParticipants = (eventId) =>
  axiosClient.get("/participants", {
    params: eventId ? { eventId } : undefined,
  });

// ── Send reminder
export const sendReminder = (eventId) =>
  axiosClient.post("/participants/remind", null, {
    params: eventId ? { eventId } : undefined,
  });
