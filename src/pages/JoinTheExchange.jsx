import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import LandingStep from '../components/exchange/LandingStep'
import JoinForm from '../components/exchange/JoinForm'

import { useAuth } from '../context/useAuth'
import { joinExchange } from '../api'

export default function JoinTheExchange() {
  const [step, setStep] = useState('landing')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleJoin = async (formData) => {
    setError('')

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }


    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const res = await joinExchange({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        eventId: formData.eventId,
      })

      login(
        {
          userId: res.userId,
          name: res.name,
          email: res.email,
          eventId: res.eventId,
          avatarColor: res.avatarColor,
        },
        res.token
      )

      navigate('/dashboard')

    } catch (err) {
      setError(err.message || 'Failed to join exchange')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-4">

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {step === 'landing' ? (
          <LandingStep onAccept={() => setStep('form')} />
        ) : (
          <JoinForm
            onBack={() => setStep('landing')}
            onSubmit={handleJoin}
            loading={loading}
          />
        )}
      </div>
    </Layout>
  )
}
