import Button from '../ui/Button'

const vibeImages = [
  {
    label: 'Festive Wrapping',
    image: '/santa.jpeg',
  },
  {
    label: 'Cozy Fireplace',
    image: '/santas.jpeg',
  },
  {
    label: 'Holiday Cookies',
    image: 'santasss.jpeg',
  },
  {
    label: 'Winter Pine',
    image: 'chris.jpeg',
  },
]

export default function LandingStep({ onAccept }) {
  return (
    <div className="bg-[#fde7c7] rounded-2xl p-8 shadow-sm">
      <p className="text-xs font-semibold text-[#c8453a] uppercase tracking-widest mb-2">
        ✦ Participant Invite
      </p>
      <h1 className="text-4xl font-serif text-[#1a1208] leading-tight mb-3">
        Holiday Swap{' '}
        <span className="italic text-[#c8453a]">2024</span>
      </h1>
      <p className="text-sm text-[#131312] leading-relaxed mb-8">
        The tradition continues. Join your friends for a night of mystery-box gifting and festive cheer. Someone special has already decided to surprise you.
      </p>

      {/* Info pills */}
      <div className="flex gap-3 mb-8">
        <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex-1">
          <p className="text-[10px] text-[#8a7a65] font-semibold uppercase tracking-wide mb-0.5">Budget</p>
          <p className="text-base font-serif text-[#1a1208]">$50–99 Max</p>
        </div>
        <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex-1">
          <p className="text-[10px] text-[#8a7a65] font-semibold uppercase tracking-wide mb-0.5">Draw Date</p>
          <p className="text-base font-serif text-[#1a1208]">Dec 20</p>
        </div>
      </div>

      {/* Vibe grid */}
      {/* <p className="text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-3">The Vibe</p> */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {vibeImages.map((v) => (
          <div
            key={v.label}
            title={v.label}
            className="rounded-xl aspect-square overflow-hidden shadow-sm"
            style={{
              backgroundImage: `url('${v.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      <Button onClick={onAccept} variant="primary" className="w-full py-3.5 text-sm">
        Accept Invitation →
      </Button>
      <p className="text-center text-[11px] text-[#8a7a65] mt-4">
        By joining you agree to participate by the draw date.
      </p>
    </div>
  )
}