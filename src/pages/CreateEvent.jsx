import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'

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

  const handleCreate = async () => {
    if (!name || !date || !budget || !email) {
      alert('Please fill all required fields')
      return
    }

    try {
      setCreating(true)

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, budget, currency, rules, email }),
      })

      if (!res.ok) throw new Error('Failed to create event')

      setShowSuccess(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f0eb] font-sans">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-lg">

          <h1 className="text-2xl font-serif mb-1 text-[#1a1208]">
            Create Your Event 
          </h1>
          <p className="text-sm text-[#8a7a65] mb-6">
            Set up your Secret Santa exchange in seconds.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Your Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#c8453a] bg-[#faf8f5] transition-colors"
            />
            <p className="text-[11px] text-[#8a7a65] mt-1">
              You'll receive event updates and be added as a participant 
            </p>
          </div>

          {/* Event name */}
          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Event Name
            </label>
            <input
              type="text"
              placeholder="e.g. Office Holiday Swap 2024"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#c8453a] bg-[#faf8f5] transition-colors"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Draw Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#c8453a] bg-[#faf8f5] transition-colors"
            />
          </div>

          {/* Budget + currency */}
          <div className="mb-4">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Budget
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="e.g. 1500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="flex-1 p-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#c8453a] bg-[#faf8f5] transition-colors"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#c8453a] bg-[#faf8f5] transition-colors"
              >
                <option>KES</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>

          {/* Rules */}
          <div className="mb-6">
            <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
              Rules <span className="normal-case font-normal text-[#a09880]">(optional)</span>
            </label>
            <textarea
              placeholder="e.g. No gift cards, keep it fun!"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              rows={3}
              className="w-full p-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#c8453a] bg-[#faf8f5] transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full bg-[#c8453a] hover:bg-[#a83530] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all text-sm"
          >
            {creating ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </main>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <div className="text-5xl mb-3 animate-bounce">🎉</div>
            <h2 className="text-xl font-serif text-[#1a1208] mb-2">
              Your Secret Santa is live!
            </h2>
            <p className="text-sm text-[#8a7a65] mb-5">
              Now invite your crew and let the magic begin ✨
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/invite')}
                className="bg-[#c8453a] hover:bg-[#a83530] text-white font-semibold py-3 rounded-xl text-sm transition-all"
              >
                Invite Participants 🎄
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-sm text-[#8a7a65] hover:underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}