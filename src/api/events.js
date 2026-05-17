// src/api/events.js
//
// API calls related to events
// Used by: CreateEvent.jsx

import { apiClient } from './client'

// ── POST /api/events ──────────────────────────────────────────────────────
// Called when: organizer submits the create event form
// Body:        { name, drawDate, budget, currency, rules, organizerEmail }
// Returns:     the newly created event object
// Backend:     EventController.java → eventRepo.save(event)
// DB:          INSERT INTO events
export const createEvent = (data) =>
  apiClient('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  })

// ── GET /api/events ───────────────────────────────────────────────────────
// Called when: future "My Events" page loads 
// Returns:     all events
export const getEvents = () =>
  apiClient('/events')