import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f0eb] text-[#1a1208] font-sans">

      {/* HERO */}
      <section className="px-6 md:px-12 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          Organize Secret Santa <br /> without the chaos 🎄
        </h1>

        <p className="text-[#8a7a65] text-lg mb-8">
          Set your budget, invite your crew, and let the magic happen.
          No spreadsheets. No confusion. Just vibes.
        </p>

        <Link
          to="/create-event"
          className="inline-block bg-[#c8453a] hover:bg-[#a83530] text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm"
        >
          Start Your Swap 🎁
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
        <h2 className="text-center text-xl font-semibold mb-10">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Create Event</h3>
            <p className="text-sm text-[#8a7a65]">
              Set your budget and rules in seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-3xl mb-3">📩</div>
            <h3 className="font-semibold mb-2">Invite Friends</h3>
            <p className="text-sm text-[#8a7a65]">
              Send invites via email instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-semibold mb-2">Get Matched</h3>
            <p className="text-sm text-[#8a7a65]">
              We handle the secret matching magic.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-12 py-16 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-xl font-semibold mb-3">
              💰 No awkward budgets
            </h3>
            <p className="text-sm text-[#8a7a65]">
              Set a clear spending limit so everyone stays on the same page.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              🔒 Fully private
            </h3>
            <p className="text-sm text-[#8a7a65]">
              Only invited participants can join your event.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Fast & simple
            </h3>
            <p className="text-sm text-[#8a7a65]">
              No accounts needed to get started.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              🎯 Smart matching
            </h3>
            <p className="text-sm text-[#8a7a65]">
              No self-matching, no duplicates. Just clean logic.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-12 py-20 text-center">
        <h2 className="text-2xl font-serif mb-4">
          Ready to spread some joy? 🎄
        </h2>

        <Link
          to="/create-event"
          className="inline-block bg-[#c8453a] hover:bg-[#a83530] text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm"
        >
          Create Your Event 🎁
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-[#8a7a65] pb-6">
        © {new Date().getFullYear()} SecretSanta — made with 🎁
      </footer>

    </div>
  )
}