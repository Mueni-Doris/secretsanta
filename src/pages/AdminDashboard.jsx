// src/pages/AdminDashboard.jsx

import Layout from '../components/layout/Layout'
import TopBar from '../components/dashboard/TopBar'
import EventInfoCard from '../components/dashboard/EventInfoCard'
import StatsRow from '../components/dashboard/StatsRow'
import ParticipantTable from '../components/dashboard/ParticipantTable'
import ReminderBanner from '../components/dashboard/ReminderBanner'
import { useDashboard } from '../hooks/useDashboard'

export default function AdminDashboard() {
  const { participants, event, stats, loading, error, refresh } = useDashboard()

  return (
    <Layout>
      <TopBar event={event} />

      {error && (
        <div className="bg-[#fde7c7] border border-[#f0d8b0] text-[#000000] text-xs rounded-xl px-4 py-3 mb-4">
          ⚠ {error}
        </div>
      )}

      <EventInfoCard event={event} loading={loading} />
      <StatsRow stats={stats} />
      <ParticipantTable
        participants={participants}
        loading={loading}
        refresh={refresh}
      />
      <ReminderBanner />
    </Layout>
  )
}
