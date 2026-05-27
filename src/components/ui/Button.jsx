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
    'text-xs font-extrabold px-4 py-2 rounded-lg transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]'

  const variants = {
    primary: 'christmas-button text-white',
    outline: 'border border-[#d8c6a7] bg-[#fffaf1] text-[#103b2c] hover:bg-[#f7ead7]',
    ghost: 'bg-transparent text-[#b92f2c] hover:underline',
    dark: 'bg-[#103b2c] hover:bg-[#0b261d] text-white',
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
