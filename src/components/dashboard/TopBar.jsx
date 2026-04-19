// src/components/dashboard/TopBar.jsx

const tabs = ['Overview', 'Participants', 'Invitations']

export default function TopBar({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="flex items-center justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="bg-[#c8453a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
              New
            </span>
            <span className="text-[#ffffff] text-xs">Event & Program</span>
          </div>
          <h1 className="text-2xl font-serif text-[#ffffff]">Holiday Swap 2024</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1a1208] flex items-center justify-center text-white text-xs font-bold">A</div>
          <div className="w-8 h-8 rounded-full bg-[#c8453a] flex items-center justify-center text-white text-xs font-bold">J</div>
        </div>
      </div>

      <div className="flex border-b border-[#e0d8cc] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-medium px-4 py-2.5 border-b-2 -mb-px transition-all
              ${activeTab === tab
                ? 'border-[#c8453a] text-[#ffffff]'
                : 'border-transparent text-[#d39c55] hover:text-[#ac621e]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  )
}
