import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/layout/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import ElfReveal from '../components/match/ElfReveal'

const SAMPLE_PARTICIPANTS = [
  { id: 1, name: 'Alex Monroe', avatarColor: '#c8453a' },
  { id: 2, name: 'Jordan Smith', avatarColor: '#2a7a3a' },
  { id: 3, name: 'Casey Lee', avatarColor: '#7a5c1e' },
  { id: 4, name: 'Morgan Wu', avatarColor: '#1a4a7a' },
  { id: 5, name: 'Frankie Soto', avatarColor: '#6a2a7a' },
  { id: 6, name: 'Riley Park', avatarColor: '#8a3a2a' },
]

const CURRENT_USER = { id: 1, name: 'Alex Monroe' }

export default function Match() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)

  const [spinning, setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)
  const [match, setMatch] = useState(null)
  const [alreadySpun, setAlreadySpun] = useState(false)

  const [phase, setPhase] = useState('idle')
  const [showReveal, setShowReveal] = useState(false)

  useEffect(() => {
    setParticipants(SAMPLE_PARTICIPANTS)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (participants.length) drawWheel(angle)
  }, [participants, angle])

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = cx - 10

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const n = participants.length
    const arc = (2 * Math.PI) / n

    const colors = ['#c8453a','#2a7a3a','#7a5c1e','#1a4a7a','#6a2a7a','#8a3a2a']

    participants.forEach((p, i) => {
      const start = currentAngle + i * arc
      const end = start + arc

      // 🎨 realistic gradient slice
      const gradient = ctx.createRadialGradient(cx, cy, 20, cx, cy, r)
      gradient.addColorStop(0, colors[i % colors.length])
      gradient.addColorStop(1, '#1a1208')

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = '#0b0907'
      ctx.lineWidth = 2
      ctx.stroke()

      // text
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + arc / 2)
      ctx.fillStyle = '#fff'
      ctx.font = '12px serif'
      ctx.textAlign = 'right'
      ctx.fillText(p.name.split(' ')[0], r - 12, 4)
      ctx.restore()
    })

    // center hub
    ctx.beginPath()
    ctx.arc(cx, cy, 10, 0, Math.PI * 2)
    ctx.fillStyle = '#0b0907'
    ctx.fill()
  }

  const getEligible = () =>
    participants.filter(p => p.id !== CURRENT_USER.id)

  const spin = () => {
    if (spinning || alreadySpun) return

    const eligible = getEligible()
    if (!eligible.length) return

    setSpinning(true)

    const target = eligible[Math.floor(Math.random() * eligible.length)]
    const index = participants.findIndex(p => p.id === target.id)

    const arc = (2 * Math.PI) / participants.length
    const targetAngle = -(index * arc + arc / 2)

    const finalAngle = angle + 8 * Math.PI + targetAngle
    const startTime = performance.now()
    const duration = 4200

    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 4)

      const current = angle + (finalAngle - angle) * ease
      setAngle(current)
      drawWheel(current)

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        setSpinning(false)
        revealMatch(target)
      }
    }

    requestAnimationFrame(animate)
  }

  const revealMatch = (receiver) => {
    setMatch({
      receiverName: receiver.name,
      avatarColor: receiver.avatarColor,
    })

    setPhase('enter')

    setTimeout(() => setPhase('whisper'), 700)
    setTimeout(() => setPhase('name'), 1500)
    setTimeout(() => {
      setPhase('done')
      setShowReveal(true)
      setAlreadySpun(true)
    }, 2600)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div
      className="min-h-screen flex relative bg-cover bg-center"
      style={{ backgroundImage: "url('/Santa.jpeg')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <Sidebar />

      <main className="relative flex-1 flex flex-col items-center justify-center">

        {/* 🎯 Wheel Wrapper */}
        <div className="relative mt-6">

          {/* pointer */}
          <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 text-[#c8453a] text-2xl z-10">
            ▼
          </div>

          {/* glow ring */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(200,69,58,0.25)]" />

          {/* canvas */}
          <motion.div
            animate={spinning ? { scale: 1.03 } : { scale: 1 }}
            className={spinning ? 'blur-[0.5px]' : ''}
          >
            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              className="rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* center hub */}
          <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#0b0907] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg" />
        </div>

        {/* spin button */}
        <button
          onClick={spin}
          className="mt-6 bg-[#c8453a] px-6 py-3 rounded-xl text-white font-semibold"
        >
          Spin 🎰
        </button>
      </main>

      {/* reveal overlay */}
      <AnimatePresence>
        {phase !== 'idle' && phase !== 'done' && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="text-center text-white">
              <div className="text-6xl mb-4">🎅</div>

              {phase === 'whisper' && (
                <p className="text-lg">A secret has been chosen...</p>
              )}

              {phase === 'name' && (
                <h2 className="text-3xl mt-4 font-serif">
                  {match?.receiverName}
                </h2>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* final reveal */}
      {showReveal && match && (
        <ElfReveal
          name={match.receiverName}
          onClose={() => setShowReveal(false)}
        />
      )}
    </div>
  )
}