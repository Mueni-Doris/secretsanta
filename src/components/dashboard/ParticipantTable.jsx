// src/components/dashboard/ParticipantTable.jsx

import Badge from '../ui/Badge'

function getStatusVariant(status) {
  if (status === 'Joined') return 'green'
  if (status === 'Pending') return 'amber'
  return 'gray'
}

function getWishlistVariant(wishlistStatus) {
  if (wishlistStatus === 'Submitted') return 'green'
  if (wishlistStatus === 'Pending') return 'amber'
  return 'gray'
}

function Avatar({ name, color }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
      style={{ background: color || '#c8453a' }}
    >
      {initials}
    </div>
  )
}

export default function ParticipantTable({ participants, loading, refresh }) {
  return (
    <div className="bg-[#fde7c7] rounded-2xl shadow-sm overflow-hidden mb-4">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#8a7a65] uppercase tracking-widest">
          Participant Status
        </p>
        <button
          onClick={refresh}
          className="text-[10px] text-[#c8453a] hover:underline font-medium"
        >
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div className="px-5 py-10 text-center text-sm text-[#8a7a65] animate-pulse">
          Loading participants...
        </div>
      ) : participants.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-[#8a7a65]">
          No participants yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0ece4]">
                <th className="text-left text-[10px] font-semibold text-[#8a7a65] uppercase tracking-wide px-5 py-2">Name</th>
                <th className="text-left text-[10px] font-semibold text-[#8a7a65] uppercase tracking-wide px-3 py-2">Status</th>
                <th className="text-left text-[10px] font-semibold text-[#8a7a65] uppercase tracking-wide px-3 py-2 hidden sm:table-cell">Wishlist</th>
                <th className="text-left text-[10px] font-semibold text-[#8a7a65] uppercase tracking-wide px-3 py-2 hidden sm:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#f7f4ef] last:border-0 hover:bg-[#faf8f5] transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={p.name} color={p.avatarColor} />
                      <div>
                        <p className="text-xs font-medium text-[#1a1208]">{p.name}</p>
                        <p className="text-[10px] text-[#8a7a65]">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge label={p.status} variant={getStatusVariant(p.status)} />
                  </td>
                  <td className="px-3 py-3 hidden sm:table-cell">
                    <Badge label={p.wishlistStatus} variant={getWishlistVariant(p.wishlistStatus)} />
                  </td>
                  <td className="px-3 py-3 text-[11px] text-[#8a7a65] hidden sm:table-cell">
                    {p.status === 'Joined' ? 'Today' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
