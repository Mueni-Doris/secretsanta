import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen font-sans">

      {/* Sidebar stays solid dark — no background image */}
      <Sidebar />

      {/* Main content area gets the background image */}
      <div
        className="flex-1 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Santa.jpeg')" }}
      >
        {/* Dark overlay so text stays readable over the image */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Actual page content sits above the overlay */}
        <main className="relative z-10 px-4 md:px-8 py-7 min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  )
}