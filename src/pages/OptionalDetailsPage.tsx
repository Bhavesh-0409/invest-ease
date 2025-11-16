import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { OptionalInputField } from '../components/OptionalInputField'

export const OptionalDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    savings: '',
    timeHorizon: '',
    investmentExperience: '',
    financialGoals: '',
    monthlyExpenses: ''
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store optional data
    localStorage.setItem('optionalDetails', JSON.stringify(formData))
    navigate('/recommendation')
  }

  const handleSkip = () => {
    navigate('/recommendation')
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton to="/details" />
        </div>

        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Additional Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Help us create a more personalized recommendation (optional)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <OptionalInputField
                label="Monthly Income"
                name="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                placeholder="Enter monthly income"
                prefix="₹"
              />

              <OptionalInputField
                label="Current Savings"
                name="savings"
                type="number"
                value={formData.savings}
                onChange={handleInputChange}
                placeholder="Enter current savings"
                prefix="₹"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <OptionalInputField
                label="Investment Time Horizon"
                name="timeHorizon"
                type="select"
                value={formData.timeHorizon}
                onChange={handleInputChange}
                options={['1-3 years', '3-5 years', '5-10 years', '10+ years']}
              />

              <OptionalInputField
                label="Investment Experience"
                name="investmentExperience"
                type="select"
                value={formData.investmentExperience}
                onChange={handleInputChange}
                options={['Beginner', 'Intermediate', 'Advanced']}
              />
            </div>

            <OptionalInputField
              label="Primary Financial Goal"
              name="financialGoals"
              type="select"
              value={formData.financialGoals}
              onChange={handleInputChange}
              options={[
                'Retirement Planning',
                'Wealth Creation',
                'Child Education',
                'Home Purchase',
                'Emergency Fund',
                'Tax Saving'
              ]}
            />

            <OptionalInputField
              label="Monthly Expenses"
              name="monthlyExpenses"
              type="number"
              value={formData.monthlyExpenses}
              onChange={handleInputChange}
              placeholder="Enter monthly expenses"
              prefix="₹"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleSkip}
                className="btn-secondary flex-1"
              >
                Skip & Continue
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Get Recommendations
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
