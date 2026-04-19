// src/components/dashboard/EventInfoCard.jsx

import { useState } from 'react'
import Button from '../ui/Button'

const INVITE_LINK = 'holidayswap.app/join/north-pole-2024'

export default function EventInfoCard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INVITE_LINK)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#fde7c7]  rounded-2xl p-5 mb-4 shadow-sm">
      <p className="text-[10px] font-semibold text-[#f8f4f0] uppercase tracking-widest mb-1">
        Event Description
      </p>
      <p className="text-sm text-[#3a2e1e] leading-relaxed mb-4">
        Organise the magic. Set your budget, invite the crew, and let the gifting begin once everyone is signed up.
      </p>

      <div className="flex items-center gap-6 mb-4">
        <div>
          <p className="text-[10px] text-[#8a7a65] font-medium uppercase tracking-wide mb-0.5">Budget Cap</p>
          <p className="text-lg font-serif text-[#1a1208]">$50.00</p>
        </div>
        <div className="w-px h-8 bg-[#e0d8cc]" />
        <div>
          <p className="text-[10px] text-[#8a7a65] font-medium uppercase tracking-wide mb-0.5">Rule Note</p>
          <p className="text-xs text-[#3a2e1e]">No gift cards allowed</p>
        </div>
        <div className="w-px h-8 bg-[#e0d8cc]" />
        <div>
          <p className="text-[10px] text-[#8a7a65] font-medium uppercase tracking-wide mb-0.5">Draw Date</p>
          <p className="text-xs text-[#3a2e1e]">Dec 20, 2024</p>
        </div>
      </div>

      {/* Invite bar */}
      <div className="bg-[#1a1208] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-[#a09880] font-medium mb-1">Invite Participants</p>
          <p className="text-xs text-[#f5f0eb] font-mono truncate">{INVITE_LINK}</p>
        </div>

        {/* QR placeholder */}
        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="10" height="10" rx="1.5" fill="#1a1208"/>
            <rect x="4" y="4" width="6" height="6" fill="white"/>
            <rect x="16" y="2" width="10" height="10" rx="1.5" fill="#1a1208"/>
            <rect x="18" y="4" width="6" height="6" fill="white"/>
            <rect x="2" y="16" width="10" height="10" rx="1.5" fill="#1a1208"/>
            <rect x="4" y="18" width="6" height="6" fill="white"/>
            <rect x="16" y="16" width="4" height="4" fill="#1a1208"/>
            <rect x="22" y="16" width="4" height="4" fill="#1a1208"/>
            <rect x="16" y="22" width="4" height="4" fill="#1a1208"/>
            <rect x="22" y="22" width="4" height="4" fill="#1a1208"/>
          </svg>
        </div>

        <Button onClick={handleCopy} variant="primary">
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  )
}
