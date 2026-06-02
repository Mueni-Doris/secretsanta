import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { loginUser } from '../api'

export default function Login() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [cooldown, setCooldown]   = useState(0)

  const { login } = useAuth()
  const navigate  = useNavigate()
  const timerRef  = useRef(null)
  const errorTimeoutRef = useRef(null)

  const startCooldown = (seconds) => {
    setCooldown(seconds)

    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleLogin = async () => {
    if (loading) return
    if (cooldown > 0) return

    setError('')

    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }

    try {
      setLoading(true)

      const res = await loginUser({ email, password })

      login({
        userId: res.userId,
        name: res.name,
        email: res.email,
        eventId: res.eventId,
        avatarColor: res.avatarColor,
      }, res.token)

      navigate('/dashboard')

    } catch (err) {
      const message = err.message || 'Invalid email or password'

      // Handle rate limit specifically
      if (message.includes('429') || message.toLowerCase().includes('too many')) {
        setError('Too many attempts. Please wait before trying again.')
        startCooldown(15) // 🔥 15 seconds cooldown (match backend if needed)
      } else {
        setError(message)
      }

      // auto-clear error after 5s (but NOT during cooldown)
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current)

      errorTimeoutRef.current = setTimeout(() => {
        if (cooldown === 0) setError('')
      }, 5000)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="christmas-page min-h-screen flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="ribbon-label mb-2">North Pole Exchange</p>
          <h1 className="font-serif text-5xl text-[#103b2c] mt-2">Secret Santa</h1>
          <p className="text-sm text-[#806f5b] mt-1">Sign in to your account</p>
        </div>

        <div className="christmas-panel rounded-2xl p-6">

          {/* Error */}
          {error && (
            <div className="bg-[#fff0f0] border border-[#f0c8c8] text-[#c8453a] text-xs rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-3 relative">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors pr-14"
            />

            {/* show/hide toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-[38px] text-xs text-[#8a7a65] hover:text-[#b92f2c]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Forgot password */}
          <div className="mb-6 text-right">
            <Link to="/forgot-password" className="text-xs text-[#b92f2c] hover:underline font-bold">
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading || cooldown > 0}
            className="christmas-button w-full disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl transition-all text-sm"
          >
            {loading
              ? 'Signing in...'
              : cooldown > 0
                ? `Try again in ${cooldown}s`
                : 'Sign In'
            }
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#8a7a65] mt-4">
          Don't have an account?{' '}
          <Link to="/create-event" className="text-[#b92f2c] hover:underline font-bold">
            Create an event
          </Link>
        </p>

      </div>
    </div>
  )
}
