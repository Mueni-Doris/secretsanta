import axiosClient from "./axiosClient";

export const getParticipants = (eventId) =>
  axiosClient.get("/participants", {
    params: eventId ? { eventId } : undefined,
  });

export const getStats = (eventId) =>
  axiosClient.get("/events/stats", {
    params: eventId ? { eventId } : undefined,
  });

export const sendReminder = (eventId) =>
  axiosClient.post("/participants/remind", null, {
    params: eventId ? { eventId } : undefined,
  });
