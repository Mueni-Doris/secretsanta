// src/hooks/useDashboard.js
//
// Gets eventId from AuthContext (logged-in user) — not from URL.
// This means data stays scoped to the right event even after navigation.

import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { getParticipants, getStats } from '../api/dashboard'
import { getEvent } from '../api/events'

export const useDashboard = () => {
  const { eventId } = useAuth()

  const [participants, setParticipants] = useState([])
  const [event, setEvent]                 = useState(null)
  const [stats, setStats]               = useState({ total: 0, wishlists: 0, matches: 0 })
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')

  const fetchData = useCallback(async () => {
    if (!eventId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')

      const [p, s, e] = await Promise.all([
        getParticipants(eventId),
        getStats(eventId),
        getEvent(eventId),
      ])

      setParticipants(p)
      setStats(s)
      setEvent(e)
    } catch {
      setError('Could not connect to server. Make sure the backend is running.')
      setParticipants([])
      setEvent(null)
      setStats({ total: 0, wishlists: 0, matches: 0 })
    } finally {
      setLoading(false)
    }
  }, [eventId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { participants, event, stats, loading, error, refresh: fetchData, eventId }
}
