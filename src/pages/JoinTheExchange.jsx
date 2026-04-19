// src/pages/JoinTheExchange.jsx

import { useState } from 'react'
import Layout from '../components/layout/Layout'
import LandingStep from '../components/exchange/LandingStep'
import JoinForm from '../components/exchange/JoinForm'
import SuccessState from '../components/exchange/SuccessState'

export default function JoinTheExchange() {
  const [step, setStep] = useState('landing') // 'landing' | 'form' | 'success'
  const [submittedForm, setSubmittedForm] = useState(null)

  const handleSuccess = (form) => {
    setSubmittedForm(form)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <Layout>
        <SuccessState form={submittedForm} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-4">
        {step === 'landing' ? (
          <LandingStep onAccept={() => setStep('form')} />
        ) : (
          <JoinForm onBack={() => setStep('landing')} onSuccess={handleSuccess} />
        )}
      </div>
    </Layout>
  )
}
