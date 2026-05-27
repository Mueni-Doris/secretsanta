// src/pages/AcceptInvite.jsx
//
// Participant lands here from invite email link:
// /accept-invite?eventId=5&email=xxx@gmail.com
//
// They enter their name + set a password
// Then get logged in automatically

import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { acceptInvite } from '../api'

export default function AcceptInvite() {
  const [searchParams] = useSearchParams()
  const eventId  = searchParams.get('eventId')
  const emailParam = searchParams.get('email') || ''

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState(emailParam)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleAccept = async () => {
    setError('')

    if (!name || !email || !password || !confirm) {
      setError('Please fill all fields')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (!eventId) {
      setError('Invalid invite link — missing event ID')
      return
    }

    try {
      setLoading(true)
      const res = await acceptInvite({ name, email, password, eventId })

      // Log them in automatically
      login({
        userId:      res.userId,
        name:        res.name,
        email:       res.email,
        eventId:     res.eventId,
        avatarColor: res.avatarColor,
      }, res.token)

      // AuthContext stores the eventId, so keep it out of the URL.
      navigate('/dashboard')

    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="christmas-page min-h-screen flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#103b2c] border-4 border-[#e8c36a] flex items-center justify-center mx-auto mb-4">
            <span className="font-serif text-[#fffaf1] text-2xl">SS</span>
          </div>
          <p className="ribbon-label mb-1">A festive invitation</p>
          <h1 className="font-serif text-5xl text-[#103b2c]">You're Invited</h1>
          <p className="text-sm text-[#806f5b] mt-1">
            Set up your account to join the Secret Santa exchange
          </p>
        </div>

        <div className="christmas-panel rounded-2xl p-6">

          {error && (
            <div className="bg-[#fff0f0] border border-[#f0c8c8] text-[#c8453a] text-xs rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Diana"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Set Password
            </label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleAccept}
            disabled={loading}
            className="christmas-button w-full disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl transition-all text-sm"
          >
            {loading ? 'Setting up...' : 'Accept Invite & Join'}
          </button>
        </div>

        <p className="text-center text-xs text-[#8a7a65] mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-[#b92f2c] hover:underline font-bold">
            Sign in
          </a>
        </p>

      </div>
    </div>
  )
}
