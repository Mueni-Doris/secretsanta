import { Link } from 'react-router-dom'

const steps = [
  {
    icon: '📅',
    number: '01',
    title: 'Set the Invitation',
    desc: 'Define your budget and invite your loved ones through an elegantly crafted digital portal.',
    active: false,
  },
  {
    icon: '◆',
    number: '02',
    title: 'The Secret Match',
    desc: 'Our magical algorithm pairs hearts while maintaining perfect secrecy. A surprise for everyone.',
    active: true,
  },
  {
    icon: '□',
    number: '03',
    title: 'Guided Giving',
    desc: 'Integrated boutique wishlists ensure every gift is a treasure found and a wish fulfilled.',
    active: false,
  },
]

const features = [
  'Immersive celebratory animations',
  'Intuitive, beautiful wishlist browsing',
  'Secure matches with festive privacy',
]

const footerLinks = {
  Platform: ['Features', 'Wishlists', 'Security'],
  Resources: ['Gift Guides', 'Etiquette', 'Support'],
  Company: ['About Us', 'Privacy', 'Terms'],
}

export default function LandingPage() {
  return (
    <div className="christmas-page min-h-screen font-sans overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-[#fffaf1]/90 backdrop-blur sticky top-0 z-50 border-b border-[#d8c6a7]">
        <div className="flex items-center gap-2">
          <span className="text-[#b92f2c] font-serif text-xl">SS</span>
          <span className="font-serif text-[#103b2c] font-semibold text-2xl">Secret Santa</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest">
          <a href="#features" className="hover:text-[#1a1208] transition-colors">Features</a>
          <a href="#wishlists" className="hover:text-[#1a1208] transition-colors">Wishlists</a>
          <a href="#how" className="hover:text-[#1a1208] transition-colors">How It Works</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-xs font-medium text-[#1a1208] hover:text-[#c8453a] transition-colors hidden md:block">
            Log In
          </Link>
          <Link
            to="/create-event"
            className="christmas-button text-white text-xs font-extrabold px-5 py-2.5 rounded-full transition-all"
          >
            Start Exchange
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 md:px-16 pt-14 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#fffaf1] border border-[#d8c6a7] text-[#806f5b] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-7">
              Holiday Season 2026
            </div>

            <h1 className="font-serif text-6xl md:text-7xl leading-[0.95] mb-6">
              <span className="text-[#b92f2c]">The Magic of</span>
              <br />
              <em className="text-[#103b2c] not-italic">Perfect</em>
              <br />
              <span className="text-[#b92f2c]">Giving</span>
            </h1>

            <p className="text-[#6a5a48] text-base leading-relaxed mb-8 max-w-sm">
              Experience the most enchanting secret santa platform. Curated matches, magical reveals, and timeless memories.
            </p>

            <div className="flex items-center gap-5 flex-wrap">
              <Link
                to="/create-event"
                className="christmas-button active:scale-[0.98] text-white font-extrabold px-7 py-3.5 rounded-full transition-all text-sm"
              >
                Start Your Exchange
              </Link>
              <a
                href="#how"
                className="flex items-center gap-1.5 text-sm font-medium text-[#1a1208] hover:text-[#c8453a] transition-colors"
              >
                Explore the Magic <span className="text-[#c8453a] text-base">›</span>
              </a>
            </div>
          </div>

          {/* Right — hero visual */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden relative christmas-dark shadow-2xl border border-[#e8c36a]/20">
              {/* Sparkle ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-52 h-52">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: i % 3 === 0 ? '7px' : '5px',
                        height: i % 3 === 0 ? '7px' : '5px',
                        background: `hsl(${42 + (i % 5) * 6}, 85%, ${50 + (i % 4) * 8}%)`,
                        top: `${50 + 46 * Math.sin((i / 28) * 2 * Math.PI)}%`,
                        left: `${50 + 46 * Math.cos((i / 28) * 2 * Math.PI)}%`,
                        opacity: 0.6 + (i % 3) * 0.13,
                        transform: 'translate(-50%,-50%)',
                      }}
                    />
                  ))}
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={`m${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: '4px',
                        height: '4px',
                        background: `hsl(45, 75%, 60%)`,
                        top: `${50 + 30 * Math.sin((i / 18) * 2 * Math.PI + 0.5)}%`,
                        left: `${50 + 30 * Math.cos((i / 18) * 2 * Math.PI + 0.5)}%`,
                        opacity: 0.4,
                        transform: 'translate(-50%,-50%)',
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-serif text-[#d4a853] text-xl text-center leading-tight">
                      Safe<br />World
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-4 w-24 h-24 rounded-full bg-[#8a7a2a] flex items-center justify-center text-center shadow-xl z-10">
              <div>
                <span className="text-white text-base block">SS</span>
                <p className="text-white text-[9px] font-semibold leading-tight px-3 mt-0.5">The Holiday Standard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY / HOW IT WORKS ── */}
      <section id="how" className="bg-[#1a4a2a] py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">A Journey of Joy</h2>
            <p className="text-[#9ab89a] text-sm">Curated with elegance, designed for delight.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`rounded-2xl p-6 relative overflow-hidden ${
                  step.active
                    ? 'bg-[#2a5a3a] border border-[#3a7a4a]'
                    : 'bg-[#163a20] border border-[#234a2c]'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base mb-5 ${
                  step.active ? 'bg-[#c8453a]' : 'bg-[#1e4a28]'
                }`}>
                  {step.icon}
                </div>
                <h3 className={`font-semibold text-sm mb-2 ${
                  step.active ? 'text-[#c8453a]' : 'text-[#9ab89a]'
                }`}>
                  {step.title}
                </h3>
                <p className="text-[#6a8a6a] text-xs leading-relaxed mb-8">
                  {step.desc}
                </p>
                <p className="font-serif text-7xl select-none absolute bottom-3 right-4 leading-none"
                  style={{ color: 'rgba(255,255,255,0.04)' }}>
                  {step.number}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENCHANTED REVEAL ── */}
      <section id="features" className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <p className="text-[10px] font-semibold text-[#c8453a] uppercase tracking-widest mb-3">
              Unwrap the Wonder
            </p>
            <h2 className="font-serif text-4xl text-[#1a1208] leading-tight mb-5">
              The Enchanted<br />Reveal
            </h2>
            <p className="text-[#6a5a48] text-sm leading-relaxed mb-8 max-w-sm">
              We've turned a simple name draw into a theatrical event. Our digital unboxing experience uses sparkles and frosted glass to make the discovery feel like a true holiday miracle.
            </p>
            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e8e0d4] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a4a2a] text-[9px] font-bold">✓</span>
                  </div>
                  <p className="text-sm text-[#1a1208]">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — reveal card */}
          <div className="flex justify-center md:justify-end">
            <div className="christmas-panel rounded-2xl p-8 w-full max-w-xs text-center">
              <div className="w-14 h-14 rounded-full bg-[#e8d87a] flex items-center justify-center mx-auto mb-5 text-xl">
                🔒
              </div>
              <p className="text-xs text-[#8a7a65] italic mb-3">Your Secret Giftee is...</p>
              <h3 className="font-serif text-2xl text-[#1a1208] mb-6">Clara Stahlbaum</h3>
              <button className="w-full bg-[#1a4a2a] hover:bg-[#0f3a1a] text-white text-xs font-semibold py-3 rounded-full transition-all flex items-center justify-center gap-2">
                Explore Clara's Wishlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 md:px-16 pb-20">
        <div
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative min-h-[320px] flex items-end p-10"
          style={{
            backgroundImage: "url('/santa.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#1a1208]/70 rounded-3xl" />

          <div className="relative z-10 max-w-sm">
            <h2 className="font-serif text-4xl text-white leading-tight mb-3">
              Bring the<br />Magic<br />to Your Hearth
            </h2>
            <p className="text-[#c0b8a8] text-sm leading-relaxed mb-6">
              Ready to start your most memorable gift exchange? Join thousands of families and friends spreading festive cheer today.
            </p>
            <Link
              to="/create-event"
              className="inline-block bg-[#c8a832] hover:bg-[#a88a25] text-[#1a1208] font-bold px-7 py-3.5 rounded-full transition-all text-sm"
            >
              Start Now — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1208] px-6 md:px-16 py-14">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#e8c36a] font-serif text-xl">SS</span>
              <span className="font-serif text-[#f5f0eb] text-2xl font-semibold">Secret Santa</span>
            </div>
            <p className="text-[#6a5a48] text-xs leading-relaxed mb-5">
              Crafting magical moments of connection through the timeless art of festive gift giving.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2a1e10] flex items-center justify-center text-[#a09880] text-xs">SS</div>
              <div className="w-7 h-7 rounded-full bg-[#2a1e10] flex items-center justify-center text-[#a09880] text-xs">✉</div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-[10px] font-semibold text-[#6a5a48] uppercase tracking-widest mb-4">{title}</p>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a key={link} href="#" className="text-xs text-[#a09880] hover:text-[#f5f0eb] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto border-t border-[#2a1e10] mt-10 pt-6 text-center">
          <p className="text-[10px] text-[#4a3a28]">
            © {new Date().getFullYear()} The Curated Hearth. Designed with love and festive spirit.
          </p>
        </div>
      </footer>

    </div>
  )
}
