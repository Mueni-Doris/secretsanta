// src/components/dashboard/TopBar.jsx
export default function TopBar({ event }) {
  const title = event?.name || "Holiday Swap";

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#c8453a] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
            New
          </span>
          <span className="text-[#ffffff] text-[11px] font-bold">
            Event & Program
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif text-[#fffaf1] leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}
