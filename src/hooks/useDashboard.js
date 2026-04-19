// src/hooks/useDashboard.js

import { useEffect, useState } from 'react'
import { getParticipants, getStats } from '../api/dashboard'

const FALLBACK_PARTICIPANTS = [
  { id: 1, name: 'Alex Monroe', email: 'alex@email.com', status: 'Joined', wishlistStatus: 'Submitted', avatarColor: '#c8453a' },
  { id: 2, name: 'Jordan Smith', email: 'jordan@email.com', status: 'Joined', wishlistStatus: 'Pending', avatarColor: '#2a7a3a' },
  { id: 3, name: 'Casey Lee', email: 'casey@email.com', status: 'Pending', wishlistStatus: '—', avatarColor: '#7a5c1e' },
  { id: 4, name: 'Morgan Wu', email: 'morgan@email.com', status: 'Joined', wishlistStatus: 'Submitted', avatarColor: '#1a4a7a' },
  { id: 5, name: 'Frankie Soto', email: 'frankie@email.com', status: 'Joined', wishlistStatus: 'Submitted', avatarColor: '#6a2a7a' },
]

const FALLBACK_STATS = { total: 12, wishlists: 9, matches: 0 }

export const useDashboard = () => {
  const [participants, setParticipants] = useState([])
  const [stats, setStats] = useState({ total: 0, wishlists: 0, matches: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')

      const [p, s] = await Promise.all([getParticipants(), getStats()])
      setParticipants(p)
      setStats(s)
    } catch {
      setError('Server unreachable — showing sample data')
      setParticipants(FALLBACK_PARTICIPANTS)
      setStats(FALLBACK_STATS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { participants, stats, loading, error, refresh: fetchData }
}
