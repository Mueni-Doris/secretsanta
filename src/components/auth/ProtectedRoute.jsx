// src/components/auth/ProtectedRoute.jsx
//
// Wrap any page that requires login with this component.
// If not logged in, redirects to /login.

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
        <p className="text-[#8a7a65] text-sm animate-pulse">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
