import { useEffect, useState } from 'react'

export default function ElfReveal({ name, onClose }) {
  const [displayed, setDisplayed] = useState('')
  const [startTyping, setStartTyping] = useState(false)

  // Delay before typing starts (gives presence)
  useEffect(() => {
    const delay = setTimeout(() => setStartTyping(true), 800)
    return () => clearTimeout(delay)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!startTyping) return

    let i = 0
    const interval = setInterval(() => {
      setDisplayed(name.slice(0, i + 1))
      i++
      if (i === name.length) clearInterval(interval)
    }, 70)

    return () => clearInterval(interval)
  }, [startTyping, name])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0907] via-[#1a1208] to-black" />

      {/* Snow */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        {/* REAL ELF IMAGE */}
        <div className="mb-6 animate-elfEnter">
          <img
            src="santac.jpeg"
            alt="Elf messenger"
            className="w-44 mx-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Subtle line */}
        <p className="text-[#c8453a] text-xs tracking-widest uppercase mb-3 opacity-80">
          Message from the North Pole
        </p>

        {/* Typing Name */}
        <h1 className="text-4xl md:text-5xl font-serif text-white relative min-h-[60px]">
          {displayed}
          <span className="cursor" />

          {/* Glow */}
          <span className="absolute inset-0 blur-xl opacity-50 text-[#c8453a]">
            {displayed}
          </span>
        </h1>

        {/* Footer */}
        <p className="text-[#a09880] text-sm mt-4 opacity-80">
          You’ve been assigned your recipient
        </p>

        <button
          onClick={onClose}
          className="mt-8 bg-[#c8453a] hover:bg-[#a83530] px-6 py-3 rounded-xl text-white font-semibold transition-all"
        >
          Keep it secret
        </button>
      </div>

      {/* Styles */}
      <style>
        {`
          .snow {
            position: absolute;
            top: -10px;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            opacity: 0.6;
            animation: fall linear infinite;
          }

          @keyframes fall {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }

          .cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: white;
            margin-left: 4px;
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }

          .animate-elfEnter {
            animation: elfEnter 0.9s ease-out;
          }

          @keyframes elfEnter {
            from {
              transform: translateY(50px) scale(0.96);
              opacity: 0;
            }
            to {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}