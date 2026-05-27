import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../api'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setError('')
    setMessage('')

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.')
      return
    }

    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      await resetPassword({ token, password })
      setMessage('Your password has been reset. Redirecting you to login...')
      setTimeout(() => navigate('/login'), 1800)
    } catch (err) {
      setError(err.message || 'Could not reset your password. Please request a new link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="christmas-page min-h-screen flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="ribbon-label mb-2">Account recovery</p>
          <h1 className="font-serif text-5xl text-[#103b2c] mt-2">New Password</h1>
          <p className="text-sm text-[#806f5b] mt-1">
            Choose a new password for your Secret Santa account.
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

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              New Password
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
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="christmas-button w-full disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl transition-all text-sm"
          >
            {loading ? 'Resetting password...' : 'Reset Password'}
          </button>
        </div>

        <p className="text-center text-xs text-[#8a7a65] mt-4">
          Need a fresh link?{' '}
          <Link to="/forgot-password" className="text-[#b92f2c] hover:underline font-bold">
            Request another
          </Link>
        </p>
      </div>
    </div>
  )
}
