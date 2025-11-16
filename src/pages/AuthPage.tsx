import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, Shield } from 'lucide-react'
import { BackButton } from '../components/BackButton'

export const AuthPage: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!validatePhoneNumber(phoneNumber)) {
      setErrors({ phone: 'Please enter a valid 10-digit mobile number' })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
      // In a real app, you would send OTP via SMS API
      console.log(`OTP sent to ${phoneNumber}`)
    }, 1500)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' })
      return
    }

    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      if (otp === '123456') { // Dummy OTP for demo
        // Store auth state
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userPhone', phoneNumber)
        navigate('/details')
      } else {
        setErrors({ otp: 'Invalid OTP. Please try again.' })
      }
    }, 1000)
  }

  const handleResendOTP = () => {
    // Simulate resend OTP
    console.log(`OTP resent to ${phoneNumber}`)
    setErrors({})
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton to="/" />
        </div>

        <div className="card">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {step === 'phone' ? (
                <Phone className="h-12 w-12 text-primary-600" />
              ) : (
                <Shield className="h-12 w-12 text-primary-600" />
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {step === 'phone' ? 'Welcome to InvestEase' : 'Verify Your Number'}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400">
              {step === 'phone' 
                ? 'Enter your mobile number to get started'
                : `We've sent a 6-digit OTP to ${phoneNumber}`
              }
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`input-field pl-12 ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || phoneNumber.length !== 10}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`input-field text-center text-2xl tracking-widest ${errors.otp ? 'border-red-500' : ''}`}
                  placeholder="000000"
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Didn't receive OTP? Resend
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-gray-600 hover:text-gray-700 text-sm"
                >
                  Change mobile number
                </button>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Demo OTP:</strong> Use <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">123456</code> to continue
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
