import AdminDashboard from './pages/AdminDashboard'
import JoinTheExchange from './pages/JoinTheExchange'
import CreateEvent from './pages/CreateEvent'
import InviteParticipants from './pages/InviteParticipants'
import Match from './pages/Match'
import Santa from './pages/Santa'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AcceptInvite from './pages/AcceptInvite'
import Participants from './pages/Participants'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/invite" element={<ProtectedRoute><InviteParticipants /></ProtectedRoute>} />
      <Route path="/join" element={<JoinTheExchange />} />
      <Route path="/" element={<Santa />} />
      <Route path="/accept-invite" element={<AcceptInvite />} />
      <Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
      <Route path="/participants" element={<ProtectedRoute><Participants /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
