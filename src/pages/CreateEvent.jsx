// src/pages/CreateEvent.jsx
//
// FLOW:
//   User fills form → handleCreate()
//     → createEvent(data) [src/api/events.js]
//       → POST /api/events [EventController.java]
//         → saves to events table in PostgreSQL
//           → success modal → navigate to /invite

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import { createEvent } from '../api'

export default function CreateEvent() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')
  const [currency, setCurrency] = useState('KES')
  const [rules, setRules] = useState('')
  const [email, setEmail] = useState('')
  const [creating, setCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async () => {
    setError('')
    if (!name || !date || !budget || !email) {
      setError('Please fill all required fields')
      return
    }

    try {
      setCreating(true)

      // Field names match Event.java: drawDate, organizerEmail
      await createEvent({
        name,
        drawDate: date,
        budget,
        currency,
        rules,
        organizerEmail: email,
      })

      setShowSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="flex min-h-screen christmas-page font-sans">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="christmas-panel rounded-2xl p-6 w-full max-w-lg">

          <p className="ribbon-label mb-1">Holiday hosting</p>
          <h1 className="text-5xl font-serif mb-1 text-[#103b2c]">Create Your Event</h1>
          {/* <p className="text-sm text-[#806f5b] mb-6">Set up your Secret Santa exchange in seconds.</p> */}

          {error && (
            <div className="bg-[#fff0f0] border border-[#f0c8c8] text-[#c8453a] text-xs rounded-xl px-4 py-3 mb-4">
              ⚠ {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">Your Email</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors" />
            <p className="text-[11px] text-[#806f5b] mt-1">You'll receive event updates and be added as a participant.</p>
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">Event Name</label>
            <input type="text" placeholder="e.g. Office Holiday Gifting" value={name}
              onChange={(e) => setName(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors" />
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">Draw Date</label>
            <input type="date" value={date}
              onChange={(e) => setDate(e.target.value)}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors" />
          </div>

          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">Budget</label>
            <div className="flex gap-2">
              <input type="number" placeholder="e.g. 1500" value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="christmas-input flex-1 p-3 border rounded-xl text-sm focus:outline-none transition-colors" />
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                className="christmas-input p-3 border rounded-xl text-sm focus:outline-none transition-colors">
                <option>KES</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Rules <span className="normal-case font-normal text-[#a09880]">(optional)</span>
            </label>
            <textarea placeholder="e.g. No gift cards, keep it fun!" value={rules}
              onChange={(e) => setRules(e.target.value)} rows={3}
              className="christmas-input w-full p-3 border rounded-xl text-sm focus:outline-none transition-colors resize-none" />
          </div>

          <button onClick={handleCreate} disabled={creating}
            className="christmas-button w-full active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold py-3.5 rounded-xl transition-all text-sm">
            {creating ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="christmas-panel rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <p className="ribbon-label mb-2">All set</p>
            <h2 className="text-4xl font-serif text-[#103b2c] mb-2">Your Secret Santa is live</h2>
            <p className="text-sm text-[#1b5725] mb-5">Check your email to activate your account</p>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/invite')}
                className="christmas-button text-white font-extrabold py-3 rounded-xl text-sm transition-all">
                Invite Participants
              </button>
              <button onClick={() => setShowSuccess(false)}
                className="text-sm text-[#8a7a65] hover:underline">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
