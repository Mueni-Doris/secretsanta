// src/api/dashboard.js
 
import { apiClient } from './client'
 
export const getParticipants = () => apiClient('/participants')
 
export const getStats = () => apiClient('/events/stats')
 
export const sendReminder = () =>
  apiClient('/participants/remind', { method: 'POST' })