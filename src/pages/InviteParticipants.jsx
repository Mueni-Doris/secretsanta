import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import { sendInvites } from '../api'
import { useAuth } from '../context/useAuth'

export default function InviteParticipants() {
  const [emails, setEmails] = useState([''])
  const [sending, setSending] = useState(false)
  const [globalError, setGlobalError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()
  const { eventId } = useAuth()

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const updateEmail = (index, value) => {
    const updated = [...emails]
    updated[index] = value
    setEmails(updated)
  }

  const addEmailField = () => {
    if (emails.length < 20) setEmails([...emails, ''])
  }

  const removeEmailField = (index) => {
    setEmails(emails.filter((_, i) => i !== index))
  }

  // Paste multiple emails at once (comma or newline separated)
  const handlePaste = (index, e) => {
    const pasted = e.clipboardData.getData('text')
    const pastedEmails = pasted
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter(Boolean)

    if (pastedEmails.length > 1) {
      e.preventDefault()
      const updated = [...emails]
      updated.splice(index, 1, ...pastedEmails)
      setEmails(updated)
    }
  }

  const handleSend = async () => {
    setGlobalError('')
    setSuccessMsg('')

    const validEmails = emails.map((e) => e.trim()).filter(Boolean)

    if (validEmails.length === 0) {
      setGlobalError('Add at least one email address.')
      return
    }

    const invalid = validEmails.filter((e) => !isValidEmail(e))
    if (invalid.length > 0) {
      setGlobalError(`Invalid emails: ${invalid.join(', ')}`)
      return
    }

    if (!eventId) {
      setGlobalError('No event found for your account. Please sign in again.')
      return
    }

    try {
      setSending(true)

      const result = await sendInvites({
        emails: validEmails,
        eventName: 'Holiday Swap',
        eventId,
        joinLink: `${window.location.origin}/accept-invite?eventId=${encodeURIComponent(eventId)}`,
      })

      setSuccessMsg(`🎉 ${result.message}`)

      // Navigate to dashboard after short delay
      setTimeout(() => navigate('/dashboard'), 2000)

    } catch (err) {
      setGlobalError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex min-h-screen christmas-page font-sans">
      <Sidebar />

      <main className="flex-1 px-5 md:px-8 py-7 max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#c8453a] uppercase tracking-widest mb-2">
            Admin
          </p>
          <h1 className="text-5xl font-serif text-[#103b2c]">
            Invite Participants
          </h1>
          <p className="text-sm text-[#806f5b] mt-1">
            Enter email addresses below. Each person will receive a link to join.
          </p>
        </div>

        {/* Email inputs */}
        <div className="christmas-panel rounded-2xl p-5 mb-4">
          <p className="text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-4">
            Email Addresses
          </p>

          <div className="flex flex-col gap-2">
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  onPaste={(e) => handlePaste(index, e)}
                  placeholder={`participant${index + 1}@gmail.com`}
                  disabled={sending}
                  className="christmas-input flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
                {emails.length > 1 && (
                  <button
                    onClick={() => removeEmailField(index)}
                    disabled={sending}
                    className="text-[#8a7a65] hover:text-[#c8453a] text-lg leading-none transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addEmailField}
            disabled={sending || emails.length >= 20}
            className="mt-3 text-xs text-[#b92f2c] font-extrabold hover:underline disabled:opacity-40"
          >
            + Add another email
          </button>
        </div>

        {/* Info box */}
        <div className="christmas-dark rounded-xl p-4 mb-4 flex items-start gap-3 border border-[#e8c36a]/20">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#e8c36a] flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[#f5f0eb] mb-0.5">
              What happens when you send?
            </p>
            <p className="text-[11px] text-[#a09880] leading-relaxed">
              Each person receives an email with a unique link to join the exchange,
              submit their wishlist, and spin the wheel on draw day.
            </p>
          </div>
        </div>

        {/* Error */}
        {globalError && (
          <div className="bg-[#fce8e8] border border-[#f0b8b8] rounded-xl p-3 mb-4">
            <p className="text-xs text-[#a83530]">⚠ {globalError}</p>
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div className="bg-[#e8f4e8] border border-[#b8d8b8] rounded-xl p-3 mb-4">
            <p className="text-xs text-[#2a7a3a]">{successMsg}</p>
          </div>
        )}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={sending}
          className="christmas-button w-full disabled:opacity-60 text-white font-extrabold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
        >
          {sending ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Sending Invites...
            </>
          ) : (
            'Send Invites'
          )}
        </button>

        <p className="text-center text-[11px] text-[#8a7a65] mt-3">
          Invites will be sent via email. You can add more people later.
        </p>
      </main>
    </div>
  )
}
