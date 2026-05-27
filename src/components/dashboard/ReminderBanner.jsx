// src/components/dashboard/ReminderBanner.jsx

import { useState } from 'react'
import Button from '../ui/Button'
import { sendReminder } from '../../api/dashboard'

export default function ReminderBanner() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    try {
      setSending(true)
      await sendReminder()
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    } catch {
      alert('Failed to send reminders. Try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-[#fff8f0] border border-[#d7b86a] rounded-xl p-4 flex flex-wrap items-start justify-between gap-3 shadow-sm">
      <div>
        <p className="text-xs font-semibold text-[#7a5c1e] mb-0.5">Wishlist reminder</p>
        <p className="text-[11px] text-[#8a7a65]">
          Some participants haven't submitted their wishlist yet. Send a reminder before the draw date.
        </p>
      </div>
      <Button onClick={handleSend} disabled={sending} variant="primary">
        {sending ? 'Sending...' : sent ? 'Sent! ✓' : 'Send Reminder'}
      </Button>
    </div>
  )
}
