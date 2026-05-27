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
    'christmas-input w-full border rounded-xl px-4 py-3 text-sm text-[#23160f] placeholder-[#b8a98f] focus:outline-none transition-colors'

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
