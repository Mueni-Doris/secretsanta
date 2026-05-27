// src/context/AuthContext.jsx
//
// Stores logged-in user + eventId globally.
// eventId is saved to localStorage so it survives page navigation.

import { useState } from 'react'
import { AuthContext } from './authContext'

function getSavedSession() {
  const savedToken = localStorage.getItem('ss_token')
  const savedUser = localStorage.getItem('ss_user')

  if (!savedToken || !savedUser) {
    return { token: null, user: null }
  }

  try {
    return { token: savedToken, user: JSON.parse(savedUser) }
  } catch {
    localStorage.removeItem('ss_token')
    localStorage.removeItem('ss_user')
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getSavedSession)
  const { user, token } = session
  const loading = false

  const login = (userData, jwtToken) => {
    setSession({ user: userData, token: jwtToken })
    localStorage.setItem('ss_token', jwtToken)
    localStorage.setItem('ss_user', JSON.stringify(userData))
  }

  const logout = () => {
    setSession({ user: null, token: null })
    localStorage.removeItem('ss_token')
    localStorage.removeItem('ss_user')
  }

  // eventId always comes from the logged-in user — never from URL
  const eventId = user?.eventId ?? null

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, eventId }}>
      {children}
    </AuthContext.Provider>
  )
}
