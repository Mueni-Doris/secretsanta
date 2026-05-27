import axiosClient from "./axiosClient";

// ── Create Event
export const createEvent = (data) =>
  axiosClient.post("/events", data);

// ── Get all events
export const getEvents = () =>
  axiosClient.get("/events");

// ── Get one event
export const getEvent = (eventId) =>
  axiosClient.get(`/events/${eventId}`);

// ── Get event stats
export const getStats = (eventId) =>
  axiosClient.get("/events/stats", {
    params: eventId ? { eventId } : undefined,
  });
