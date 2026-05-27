import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setError('')
    setMessage('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setLoading(true)
      await forgotPassword({ email })
      setMessage('If that email is registered, password reset instructions have been sent.')
    } catch (err) {
      setError(err.message || 'Could not request a password reset. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="christmas-page min-h-screen flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="ribbon-label mb-2">Account recovery</p>
          <h1 className="font-serif text-5xl text-[#103b2c] mt-2">Reset Password</h1>
          <p className="text-sm text-[#806f5b] mt-1">
            Enter your email and we will send you a reset link.
          </p>
        </div>

        <div className="christmas-panel rounded-2xl p-6">
          {error && (
            <div className="bg-[#fff0f0] border border-[#f0c8c8] text-[#c8453a] text-xs rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-[#edf7ee] border border-[#b8d8b8] text-[#1f5a43] text-xs rounded-xl px-4 py-3 mb-4">
              {message}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="christmas-button w-full disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl transition-all text-sm"
          >
            {loading ? 'Sending reset link...' : 'Send Reset Link'}
          </button>
        </div>

        <p className="text-center text-xs text-[#8a7a65] mt-4">
          Remembered it?{' '}
          <Link to="/login" className="text-[#b92f2c] hover:underline font-bold">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
