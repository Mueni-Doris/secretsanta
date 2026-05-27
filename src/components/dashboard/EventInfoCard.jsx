// src/components/dashboard/EventInfoCard.jsx

function formatDate(dateStr) {
  if (!dateStr) return 'Not set'

  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatBudget(event) {
  if (!event?.budget) return 'Not set'

  const currency = event.currency || 'KES'
  return `${currency} ${Number(event.budget).toLocaleString()}`
}

export default function EventInfoCard({ event, loading }) {
  const rules = event?.rules?.trim() || 'No special rules set'

  return (
    <div className="christmas-panel rounded-2xl p-5 mb-4">
      <p className="ribbon-label mb-1">
        Event Details
      </p>
      <p className="text-sm text-[#3a2e1e] leading-relaxed mb-4">
        {loading
          ? 'Loading event details...'
          : 'Organise the magic. Set your budget, invite the crew, and let the gifting begin once everyone is signed up.'}
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="text-[10px] text-[#8a7a65] font-medium uppercase tracking-wide mb-0.5">Budget Cap</p>
          <p className="text-lg font-serif text-[#1a1208]">{formatBudget(event)}</p>
        </div>
        <div className="w-px h-8 bg-[#e0d8cc]" />
        <div>
          <p className="text-[10px] text-[#8a7a65] font-medium uppercase tracking-wide mb-0.5">Rule Note</p>
          <p className="text-xs text-[#3a2e1e]">{rules}</p>
        </div>
        <div className="w-px h-8 bg-[#e0d8cc]" />
        <div>
          <p className="text-[10px] text-[#8a7a65] font-medium uppercase tracking-wide mb-0.5">Draw Date</p>
          <p className="text-xs text-[#3a2e1e]">{formatDate(event?.drawDate)}</p>
        </div>
      </div>
    </div>
  )
}
