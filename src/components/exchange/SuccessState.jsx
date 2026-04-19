// src/components/exchange/SuccessState.jsx

export default function SuccessState({ form }) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-[#e4f4e8] flex items-center justify-center text-4xl mx-auto mb-6">
          🎉
        </div>
        <h2 className="text-2xl font-serif text-[#1a1208] mb-2">You're in!</h2>
        <p className="text-sm text-[#8a7a65] mb-6">
          Your secret match will be revealed on Dec 20. Watch your inbox!
        </p>

        <div className="bg-white rounded-2xl p-5 shadow-sm text-left">
          <p className="text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest mb-3">
            Your details
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#c8453a] flex items-center justify-center text-white text-sm font-bold">
              {form.name[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1208]">{form.name}</p>
              <p className="text-[11px] text-[#8a7a65]">{form.email}</p>
            </div>
          </div>
          {form.wishlist && (
            <div className="border-t border-[#f0ece4] pt-3">
              <p className="text-[10px] text-[#8a7a65] uppercase tracking-wide font-semibold mb-1">
                Wishlist note
              </p>
              <p className="text-xs text-[#3a2e1e]">{form.wishlist}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
