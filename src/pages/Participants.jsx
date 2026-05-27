import Layout from '../components/layout/Layout'
import ParticipantTable from '../components/dashboard/ParticipantTable'
import { useDashboard } from '../hooks/useDashboard'

export default function Participants() {
  const { participants, loading, refresh } = useDashboard()

  return (
    <Layout>
      <ParticipantTable
        participants={participants}
        loading={loading}
        refresh={refresh}
      />
    </Layout>
  )
}
