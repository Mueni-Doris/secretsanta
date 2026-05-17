
// src/api/invites.js
//
// FLOW:
//   InviteParticipants.jsx → handleSend()
//     → sendInvites(data)
//       → POST /api/invites/send
//         → InviteController.java
//           → InviteService.java → sends emails via Gmail SMTP
 
import { apiClient } from './client'
 
// ── POST /api/invites/send ────────────────────────────────────────────────
// Body: { emails, eventName, joinLink }
// Returns: { sent, total, message }
export const sendInvites = (data) =>
  apiClient('/invites/send', {
    method: 'POST',
    body: JSON.stringify(data),
  })