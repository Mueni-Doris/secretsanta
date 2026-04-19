// src/components/ui/InputField.jsx

export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  optional = false,
  rows,
}) {
  const inputClass =
    'w-full border border-[#e0d8cc] rounded-xl px-4 py-3 text-sm text-[#1a1208] placeholder-[#c0b8a8] focus:outline-none focus:border-[#c8453a] transition-colors bg-[#faf8f5]'

  return (
    <div className="mb-5">
      <label className="block text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-1.5">
        {label}{' '}
        {optional && (
          <span className="normal-case font-normal text-[#a09880]">(optional)</span>
        )}
      </label>
      {rows ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  )
}
