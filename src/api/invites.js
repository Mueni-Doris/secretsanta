import axiosClient from "./axiosClient";

// ── Send invites
export const sendInvites = (data) =>
  axiosClient.post("/invites/send", data);
