// src/components/ui/Button.jsx

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const base =
    'text-xs font-semibold px-4 py-2 rounded-lg transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]'

  const variants = {
    primary: 'bg-[#c8453a] hover:bg-[#a83530] text-white',
    outline: 'border border-[#e0d8cc] bg-transparent text-[#1a1208] hover:bg-[#f5f0eb]',
    ghost: 'bg-transparent text-[#c8453a] hover:underline',
    dark: 'bg-[#1a1208] hover:bg-[#2a2010] text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
