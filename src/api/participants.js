// src/api/participants.js
 
import { apiClient } from './client'
 
// ── POST /api/participants/join ───────────────────────────────────────────
// Used by: JoinTheExchange.jsx → handleSubmit()
export const joinExchange = (data) =>
  apiClient('/participants/join', {
    method: 'POST',
    body: JSON.stringify(data),
  })
 
// ── GET /api/matches/my?userId=X&round=2 ─────────────────────────────────
// Used by: Match.jsx → on load, checks if user already spun
// Returns their match if spun, throws 404 if not yet spun
export const getMyMatch = (userId, round = 2) =>
  apiClient(`/matches/my?userId=${userId}&round=${round}`)
 
// ── POST /api/matches ─────────────────────────────────────────────────────
// Used by: Match.jsx → revealMatch(), called when wheel stops
// Saves the match secretly to the DB
export const saveMatch = (data) =>
  apiClient('/matches', {
    method: 'POST',
    body: JSON.stringify(data),
  })
 
// ── GET /api/matches/status ───────────────────────────────────────────────
// Used by: AdminDashboard → shows how many have spun
export const getMatchStatus = () =>
  apiClient('/matches/status')
 