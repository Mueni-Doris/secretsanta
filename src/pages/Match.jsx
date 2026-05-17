// src/pages/Match.jsx
//
// FLOW:
//   On load → GET /api/participants 
//           → GET /api/matches/my?userId=X&round=2 (check if already spun)
//   On spin → POST /api/matches (save match secretly)

import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/layout/Sidebar'
import { getParticipants } from '../api/dashboard'
import { getMyMatch, saveMatch } from '../api/participants'

// ─── IMPORTANT ───────────────────────────────────────────────────────────────
// Replace this with real auth when you add login.
// For now, change this ID to match whoever is using the app.
// DB IDs: Dad=1, Mum=2, Diana=3, Dorah=4, Doris=5, Delvis=6
const CURRENT_USER = { id: 5, name: 'Doris' }
const CURRENT_ROUND = 2
// ─────────────────────────────────────────────────────────────────────────────

export default function Match() {
  const canvasRef    = useRef(null)
  const animFrameRef = useRef(null)

  const [participants, setParticipants] = useState([])
  const [loading, setLoading]           = useState(true)
  const [spinning, setSpinning]         = useState(false)
  const [angle, setAngle]               = useState(0)
  const [match, setMatch]               = useState(null)
  const [alreadySpun, setAlreadySpun]   = useState(false)
  const [saving, setSaving]             = useState(false)
  const [showReveal, setShowReveal]     = useState(false)
  const [error, setError]               = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (participants.length > 0) drawWheel(angle)
  }, [participants, angle])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')

      // Fetch real participants from DB
      const participantsData = await getParticipants()
      setParticipants(participantsData)

      // Check if current user already spun this round
      try {
        const myMatch = await getMyMatch(CURRENT_USER.id, CURRENT_ROUND)
        if (myMatch && myMatch.receiverName) {
          setMatch(myMatch)
          setAlreadySpun(true)
        }
      } catch {
        // 404 = not yet spun, that's fine
      }

    } catch (err) {
      setError('Could not load participants. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current
    if (!canvas || participants.length === 0) return
    const ctx = canvas.getContext('2d')
    const cx  = canvas.width / 2
    const cy  = canvas.height / 2
    const r   = cx - 8

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const n   = participants.length
    const arc = (2 * Math.PI) / n

    const colors = [
      '#c8453a', '#2a7a3a', '#7a5c1e',
      '#1a4a7a', '#6a2a7a', '#8a3a2a',
      '#3a6a7a', '#7a3a6a', '#4a7a3a',
    ]

    participants.forEach((p, i) => {
      const start = currentAngle + i * arc
      const end   = start + arc

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()
      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()
      ctx.strokeStyle = '#1a1208'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + arc / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#ffffff'
      ctx.font = '600 12px sans-serif'
      ctx.fillText(p.name.split(' ')[0], r - 12, 5)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI)
    ctx.fillStyle = '#1a1208'
    ctx.fill()
    ctx.strokeStyle = '#c8453a'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.fillStyle = '#f5f0eb'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🎁', cx, cy)
  }

  // Only eligible = everyone except current user
  const getEligible = () =>
    participants.filter(p => p.id !== CURRENT_USER.id)

  const spin = () => {
    if (spinning || alreadySpun) return
    const eligible = getEligible()
    if (eligible.length === 0) return

    setSpinning(true)

    const targetIndex = Math.floor(Math.random() * eligible.length)
    const fullIndex   = participants.findIndex(p => p.id === eligible[targetIndex].id)
    const n           = participants.length
    const arc         = (2 * Math.PI) / n
    const targetAngle = -(fullIndex * arc + arc / 2)
    const fullSpins   = (6 + Math.floor(Math.random() * 4)) * 2 * Math.PI
    const startAngle  = angle
    const finalAngle  = startAngle + fullSpins + targetAngle - (startAngle % (2 * Math.PI))

    const duration  = 4000
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed      = now - startTime
      const t            = Math.min(elapsed / duration, 1)
      const ease         = 1 - Math.pow(1 - t, 4)
      const currentAngle = startAngle + (finalAngle - startAngle) * ease

      setAngle(currentAngle)
      drawWheel(currentAngle)

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        setAngle(finalAngle)
        drawWheel(finalAngle)
        setSpinning(false)
        revealMatch(eligible[targetIndex])
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  const revealMatch = async (receiver) => {
    const result = {
      giverId:      CURRENT_USER.id,
      giverName:    CURRENT_USER.name,
      receiverId:   receiver.id,
      receiverName: receiver.name,
      avatarColor:  receiver.avatarColor,
    }

    setMatch(result)
    setShowReveal(true)

    try {
      setSaving(true)
      await saveMatch(result)
      setAlreadySpun(true)
    } catch (err) {
      // Still mark locally even if save fails
      setAlreadySpun(true)
      console.error('Failed to save match:', err)
    } finally {
      setSaving(false)
    }
  }

  const initials = (name) =>
    name?.split(' ').map(n => n[0]).join('') || '?'

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#1a1208] font-sans">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#a09880] text-sm animate-pulse">Loading the wheel...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#1a1208] font-sans">
      <Sidebar />

      <main className="flex-1 px-4 md:px-8 py-8 overflow-y-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold text-[#c8453a] uppercase tracking-widest mb-1">
            Holiday Swap 2024
          </p>
          <h1 className="text-3xl font-serif text-[#f5f0eb]">Your Secret Draw</h1>
          <p className="text-sm text-[#a09880] mt-2">
            Spin the wheel — only you will see your match
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto bg-[#c8453a]/20 border border-[#c8453a]/40 rounded-xl px-4 py-3 mb-6 text-center">
            <p className="text-sm text-[#f5f0eb]">⚠ {error}</p>
          </div>
        )}

        {/* Already spun state */}
        {alreadySpun && !showReveal ? (
          <div className="max-w-md mx-auto">
            <div className="bg-[#2a1e10] border border-[#3a2a18] rounded-2xl p-8 text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#c8453a]/20 flex items-center justify-center mx-auto mb-4 text-3xl">
                🎁
              </div>
              <h2 className="text-xl font-serif text-[#f5f0eb] mb-2">You've already spun!</h2>
              <p className="text-sm text-[#a09880] mb-6">
                Your match is saved. Check your profile to see who you're gifting — it's your little secret!
              </p>
              <button
                onClick={() => setShowReveal(true)}
                className="w-full bg-[#c8453a] hover:bg-[#a83530] text-white font-semibold py-3 rounded-xl text-sm transition-all"
              >
                Peek at my match again 👀
              </button>
            </div>

            {/* Show all participants (names only — no matches revealed) */}
            <div className="bg-[#2a1e10] border border-[#3a2a18] rounded-2xl p-5">
              <p className="text-[10px] font-semibold text-[#a09880] uppercase tracking-widest mb-4">
                Participants ({participants.length})
              </p>
              <div className="flex flex-col gap-2.5">
                {participants.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: p.avatarColor || '#c8453a' }}
                    >
                      {initials(p.name)}
                    </div>
                    <span className="text-sm text-[#f5f0eb]">{p.name}</span>
                    {p.id === CURRENT_USER.id && (
                      <span className="text-[10px] bg-[#c8453a]/20 text-[#c8453a] px-2 py-0.5 rounded-full ml-auto">
                        You
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

              {/* Wheel */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-0 h-0 mb-1"
                  style={{
                    borderLeft: '12px solid transparent',
                    borderRight: '12px solid transparent',
                    borderTop: '24px solid #c8453a',
                  }}
                />
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  className="rounded-full"
                  style={{ maxWidth: '100%' }}
                />
                <button
                  onClick={spin}
                  disabled={spinning || alreadySpun}
                  className="mt-6 bg-[#c8453a] hover:bg-[#a83530] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-10 py-3.5 rounded-xl transition-all text-sm"
                >
                  {spinning ? 'Spinning...' : 'Spin the Wheel 🎰'}
                </button>
                <p className="text-[11px] text-[#6a5a48] mt-3 text-center max-w-[220px]">
                  Your result will only be visible to you
                </p>
              </div>

              {/* Right panel */}
              <div className="flex-1 w-full max-w-sm mx-auto lg:mx-0">
                <div className="bg-[#2a1e10] border border-[#3a2a18] rounded-2xl p-5 mb-4">
                  <p className="text-[10px] font-semibold text-[#a09880] uppercase tracking-widest mb-4">
                    In the draw ({participants.length})
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {participants.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: p.avatarColor || '#c8453a' }}
                        >
                          {initials(p.name)}
                        </div>
                        <span className="text-sm text-[#f5f0eb]">{p.name}</span>
                        {p.id === CURRENT_USER.id && (
                          <span className="text-[10px] bg-[#c8453a]/20 text-[#c8453a] px-2 py-0.5 rounded-full ml-auto">
                            You
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#2a1e10] border border-[#3a2a18] rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-[#a09880] uppercase tracking-widest mb-3">
                    Remember
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      'Keep your match secret until gifting day',
                      'Budget: KES 1,500',
                      'No gift cards allowed',
                    ].map((rule, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#c8453a] flex-shrink-0 text-xs mt-0.5">✦</span>
                        <p className="text-xs text-[#a09880]">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Private reveal modal */}
      {showReveal && match && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setShowReveal(false)}
        >
          <div
            className="bg-[#1a1208] border border-[#3a2a18] rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-[10px] font-semibold text-[#c8453a] uppercase tracking-widest mb-4">
              Your secret match
            </p>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
              style={{ background: match.avatarColor || '#c8453a' }}
            >
              {initials(match.receiverName)}
            </div>
            <h2 className="text-3xl font-serif text-[#f5f0eb] mb-2">
              {match.receiverName}
            </h2>
            <p className="text-sm text-[#a09880] mb-6">
              You are their Secret Santa! Keep it a surprise until gifting day 🎄
            </p>
            <div className="bg-[#2a1e10] rounded-xl p-4 mb-6 text-left">
              <p className="text-[10px] text-[#a09880] uppercase tracking-widest font-semibold mb-2">
                Gift guide
              </p>
              <p className="text-xs text-[#f5f0eb]">Budget: <span className="text-[#c8453a] font-semibold">KES 1,500</span></p>
              <p className="text-xs text-[#f5f0eb] mt-1">Rules: <span className="text-[#a09880]">No gift cards</span></p>
            </div>
            {saving && (
              <p className="text-[11px] text-[#a09880] mb-3 animate-pulse">Saving your match securely...</p>
            )}
            <button
              onClick={() => setShowReveal(false)}
              className="w-full bg-[#c8453a] hover:bg-[#a83530] text-white font-semibold py-3 rounded-xl text-sm transition-all"
            >
              Got it — I'll keep it secret! 🤫
            </button>
            <p className="text-[10px] text-[#6a5a48] mt-3">
              Tap anywhere outside to close. You can see this again on your profile.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}