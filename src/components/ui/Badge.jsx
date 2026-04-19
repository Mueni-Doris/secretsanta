// src/components/ui/Badge.jsx

export default function Badge({ label, variant = 'gray' }) {
  const variants = {
    green: 'bg-[#e4f4e8] text-[#2a7a3a]',
    amber: 'bg-[#fef3d0] text-[#8a6000]',
    gray: 'bg-[#f0ece4] text-[#6a5e4a]',
    red: 'bg-[#fde8e8] text-[#a83530]',
  }

  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${variants[variant]}`}>
      {label}
    </span>
  )
}
