import { useState } from 'react'

export default function JoinForm({ onBack, onSubmit, loading }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [eventId, setEventId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      name,
      email,
      password,
      confirmPassword,
      eventId,
    })
  }

  return (
    <div className="christmas-panel rounded-3xl p-6 md:p-8">

      <button
        onClick={onBack}
        className="text-sm text-[#8a7a65] hover:text-[#c8453a] mb-6"
      >
        ← Back
      </button>

      <div className="text-center mb-8">
        <p className="ribbon-label mb-2">Participant access</p>

        <h2 className="font-serif text-5xl text-[#103b2c]">
          Join The Exchange
        </h2>

        <p className="text-sm text-[#8a7a65] mt-2">
          Create your account and join the fun
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
            Full Name
          </label>

          <input
            type="text"
            placeholder="e.g. Diana"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none"
          />
        </div>

        {/* Event ID */}
        <div className="mb-4">
          <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
            Event ID
          </label>

          <input
            type="text"
            placeholder="e.g. 5"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
            Password
          </label>

          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="christmas-button w-full disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl transition-all text-sm"
        >
          {loading ? 'Joining...' : 'Join Exchange'}
        </button>

      </form>
    </div>
  )
}
