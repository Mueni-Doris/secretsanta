import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import JoinTheExchange from './pages/JoinTheExchange'
import ParticipantTable from './components/dashboard/ParticipantTable'
import CreateEvent from './pages/CreateEvent' 
import InviteParticipants from './pages/InviteParticipants'
import Match from './pages/Match'
import Santa from './pages/Santa'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/invite" element={<InviteParticipants />} />
        <Route path="/join" element={<JoinTheExchange />} />
        <Route path="/" element={<Santa />} />
        <Route path="/match" element={<Match />} />
        <Route path="/participants" element={<ParticipantTable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App