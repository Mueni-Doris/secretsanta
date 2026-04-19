// src/components/dashboard/StatsRow.jsx

import StatCard from '../ui/StatCard'

export default function StatsRow({ stats }) {
  const items = [
    { label: 'Participants', value: stats.total, sub: 'of 20 invited' },
    { label: 'Wishlists In', value: stats.wishlists, sub: 'submitted so far' },
    { label: 'Matches Made', value: stats.matches, sub: 'Draw not started' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
      {items.map((s) => (
        <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} />
      ))}
    </div>
  )
}
