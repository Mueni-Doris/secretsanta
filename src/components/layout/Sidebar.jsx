import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: '⊞', path: '/dashboard' },
  { label: 'My Draw', icon: '🎰', path: '/match' },
  { label: 'Participants', icon: '👥', path: '/participants' },
  { label: 'Invite Members', icon: '➕', path: '/invite' },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Close on escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all w-full
    ${isActive
      ? 'bg-[#c8453a] text-white'
      : 'text-[#a09880] hover:bg-white/10 hover:text-[#f5f0eb]'
    }`

  const iconOnlyClass = ({ isActive }) =>
    `flex items-center justify-center w-10 h-10 rounded-lg text-base transition-all mx-auto
    ${isActive
      ? 'bg-[#c8453a] text-white'
      : 'text-[#a09880] hover:bg-white/10 hover:text-[#f5f0eb]'
    }`

  return (
    <>
      {/* ===================== */}
      {/* MOBILE topbar (< md)  */}
      {/* ===================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#1a1208] shadow-md">
        <p className="text-[#f5f0eb] font-serif text-sm">
          The North Pole{' '}
          <span className="text-[#c8453a] italic">Secret Santa</span>
        </p>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="text-[#f5f0eb] text-xl w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all focus:outline-none"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Spacer so content doesn't hide under fixed topbar on mobile */}
      <div className="md:hidden h-12" />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`
          md:hidden fixed top-0 left-0 h-full w-64 bg-[#1a1208] flex flex-col py-6 px-4 z-50
          transition-transform duration-300 ease-in-out shadow-2xl
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-2 mb-8 mt-2">
          <p className="text-[#f5f0eb] font-serif text-base leading-snug">
            The North Pole<br />
            <span className="text-[#c8453a] italic">Secret Santa</span>
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.path} end={item.path === '/'} className={navLinkClass}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

      </aside>

      {/* ========================= */}
      {/* TABLET sidebar (md → lg)  */}
      {/* icons only, no labels     */}
      {/* ========================= */}
      <aside className="hidden md:flex lg:hidden flex-col w-16 bg-[#1a1208] min-h-screen py-6 px-2 flex-shrink-0 sticky top-0">
        <div className="flex items-center justify-center mb-8">
          <span className="text-[#c8453a] text-xl">🎅</span>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              title={item.label}
              className={iconOnlyClass}
            >
              {item.icon}
            </NavLink>
          ))}


        </nav>
      </aside>


      <aside className="hidden lg:flex flex-col w-52 bg-[#1a1208] min-h-screen py-6 px-4 flex-shrink-0 sticky top-0">
        <div className="px-2 mb-8">
          <p className="text-[#f5f0eb] font-serif text-sm leading-snug">
            The North Pole<br />
            <span className="text-[#c8453a] italic">Secret Santa</span>
          </p>
        </div>

        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              className={navLinkClass}
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
              
            </NavLink>

            
          ))}

        </nav>


      </aside>
    </>
  )
}