import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/layout/Sidebar"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function InviteParticipants() {
  const [emails, setEmails] = useState([""])
  const [sending, setSending] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const navigate = useNavigate()

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const updateEmail = (index, value) => {
    const updated = [...emails]
    updated[index] = value
    setEmails(updated)
  }

  const addEmailField = () => {
    if (emails.length < 20) setEmails([...emails, ""])
  }

  const removeEmailField = (index) => {
    setEmails(emails.filter((_, i) => i !== index))
  }

  const handlePaste = (index, e) => {
    const pasted = e.clipboardData.getData("text")
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
    setGlobalError("")

    const validEmails = emails.map(e => e.trim()).filter(Boolean)

    if (validEmails.length === 0) {
      setGlobalError("Add at least one email address.")
      return
    }

    const invalid = validEmails.filter(e => !isValidEmail(e))
    if (invalid.length > 0) {
      setGlobalError(`Invalid emails: ${invalid.join(", ")}`)
      return
    }

    try {
      setSending(true)

      const response = await fetch(`${API_BASE_URL}/invites/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: validEmails,
          eventName: "Holiday Swap 2026",
          joinLink: `${window.location.origin}/join`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send invites")
      }

      // ⛔ freeze button state ends only after success
      navigate("/thank-you")

    } catch (err) {
      setGlobalError(err.message || "Something went wrong.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f0eb] font-sans">
                  <Sidebar />

      <main className="flex-1 px-5 md:px-8 py-7 max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#c8453a] uppercase tracking-widest mb-2">
            ✦ Admin
          </p>
          <h1 className="text-2xl font-serif text-[#1a1208]">
            Invite Participants
          </h1>
        </div>

        {/* Email Inputs */}
        <div className="bg-[#fde7c7] rounded-2xl shadow-sm p-5 mb-4">
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
                  placeholder={`user${index + 1}@gmail.com`}
                  disabled={sending}
                  className="flex-1 border border-[#e0d8cc] rounded-xl px-4 py-2.5 text-sm bg-[#faf8f5] focus:outline-none focus:border-[#c8453a]"
                />

                {emails.length > 1 && (
                  <button
                    onClick={() => removeEmailField(index)}
                    disabled={sending}
                    className="text-[#8a7a65] hover:text-[#c8453a]"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addEmailField}
            disabled={sending}
            className="mt-3 text-xs text-[#c8453a] font-semibold"
          >
            + Add email
          </button>
        </div>

        {/* Error */}
        {globalError && (
          <div className="bg-[#fce8e8] border border-[#f0b8b8] rounded-xl p-3 mb-4">
            <p className="text-xs text-[#a83530]">{globalError}</p>
          </div>
        )}

        {/* SEND BUTTON (FREEZE MODE 🔥) */}
        <button
          onClick={handleSend}
          disabled={sending}
          className="w-full bg-[#c8453a] hover:bg-[#a83530] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
        >
          {sending ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Sending Invites...
            </>
          ) : (
            "Send Invites 🎄"
          )}
        </button>

        <p className="text-center text-[11px] text-[#0e0c0a] mt-3">
          Invites will be sent via email.
        </p>
      </main>
    </div>
  )
}