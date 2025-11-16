import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../components/BackButton'

export const MandatoryDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    age: '',
    investmentAmount: '',
    riskPreference: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
  }, [navigate])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age between 18 and 100'
    }

    if (!formData.investmentAmount || parseFloat(formData.investmentAmount) < 1000) {
      newErrors.investmentAmount = 'Minimum investment amount is ₹1,000'
    }

    if (!formData.riskPreference) {
      newErrors.riskPreference = 'Please select your risk preference'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Store data in localStorage for demo purposes
      localStorage.setItem('mandatoryDetails', JSON.stringify(formData))
      navigate('/optional')
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton to="/" />
        </div>

        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Let's Get Started
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Tell us a few basic details to create your personalized investment plan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Age *
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={`input-field ${errors.age ? 'border-red-500' : ''}`}
                placeholder="Enter your age"
                min="18"
                max="100"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Investment Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">₹</span>
                <input
                  type="number"
                  value={formData.investmentAmount}
                  onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                  className={`input-field pl-8 ${errors.investmentAmount ? 'border-red-500' : ''}`}
                  placeholder="Enter amount to invest"
                  min="1000"
                />
              </div>
              {errors.investmentAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.investmentAmount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Risk Preference *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'Low', label: 'Low Risk', desc: 'Stable returns, minimal risk' },
                  { value: 'Medium', label: 'Medium Risk', desc: 'Balanced growth potential' },
                  { value: 'High', label: 'High Risk', desc: 'Maximum growth potential' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer border-2 rounded-lg p-4 transition-colors ${
                      formData.riskPreference === option.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="riskPreference"
                      value={option.value}
                      checked={formData.riskPreference === option.value}
                      onChange={(e) => handleInputChange('riskPreference', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {option.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.riskPreference && (
                <p className="mt-1 text-sm text-red-600">{errors.riskPreference}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/optional')}
                className="btn-secondary flex-1"
              >
                Skip Optional Details
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
