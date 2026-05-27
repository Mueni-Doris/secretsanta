// src/components/ui/StatCard.jsx

export default function StatCard({ label, value, sub }) {
  return (
    <div className="christmas-panel rounded-xl p-4">
      <p className="text-[10px] text-[#8a7a65] font-semibold uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-3xl font-serif text-[#1a1208]">{value}</p>
      {sub && <p className="text-[11px] text-[#8a7a65] mt-0.5">{sub}</p>}
    </div>
  )
}
