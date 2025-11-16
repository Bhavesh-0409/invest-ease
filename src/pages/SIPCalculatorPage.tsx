import React, { useState } from 'react'
import { Calculator } from 'lucide-react'
import { BackButton } from '../components/BackButton'
import { SIPLineGraph } from '../components/SIPLineGraph'
import { SummaryCard } from '../components/SummaryCard'

export const SIPCalculatorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    monthlyAmount: '5000',
    expectedReturn: '12',
    timePeriod: '10'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyAmount = parseFloat(formData.monthlyAmount) || 0
    const annualReturn = parseFloat(formData.expectedReturn) || 0
    const years = parseFloat(formData.timePeriod) || 0
    
    const monthlyReturn = annualReturn / 12 / 100
    const totalMonths = years * 12
    
    const futureValue = monthlyAmount * (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn))
    const totalInvested = monthlyAmount * totalMonths
    const totalReturns = futureValue - totalInvested

    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      totalReturns: Math.round(totalReturns)
    }
  }

  const results = calculateSIP()

  // Generate chart data
  const generateChartData = () => {
    const years = parseInt(formData.timePeriod) || 10
    const monthlyAmount = parseFloat(formData.monthlyAmount) || 0
    const annualReturn = parseFloat(formData.expectedReturn) || 0
    const monthlyReturn = annualReturn / 12 / 100

    const labels = []
    const invested = []
    const returns = []

    for (let year = 1; year <= years; year++) {
      labels.push(`Year ${year}`)
      
      const months = year * 12
      const totalInvested = monthlyAmount * months
      const futureValue = monthlyAmount * (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn))
      
      invested.push(Math.round(totalInvested))
      returns.push(Math.round(futureValue))
    }

    return { labels, invested, returns }
  }

  const chartData = generateChartData()

  const handleCalculate = async () => {
    try {
      const response = await fetch('https://builder.empromptu.ai/api_tools/database/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer beb20e01818d025fb8b5a8c55fd12247',
          'X-Generated-App-ID': '6b451cdd-c751-4151-bf30-5751562c9a9b',
          'X-Usage-Key': 'c42100c7fbb5e7798f2d07e0a27737a2'
        },
        body: JSON.stringify({
          query: "INSERT INTO app_6b451cddc7514151bf305751562c9a9b.calculation_history (user_id, calculation_type, input_data, result_data, created_at) VALUES ($1, $2, $3, $4, NOW())",
          params: [1, 'sip_calculation', JSON.stringify(formData), JSON.stringify(results)]
        })
      })
      
      console.log('SIP calculation saved')
    } catch (error) {
      console.error('Error saving SIP calculation:', error)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Calculator className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SIP Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate your systematic investment plan returns
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Investment Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly SIP Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={formData.monthlyAmount}
                    onChange={(e) => handleInputChange('monthlyAmount', e.target.value)}
                    className="input-field pl-8"
                    placeholder="Enter monthly amount"
                    min="500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Annual Return
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.expectedReturn}
                    onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                    className="input-field pr-8"
                    placeholder="Enter expected return"
                    min="1"
                    max="30"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Period
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.timePeriod}
                    onChange={(e) => handleInputChange('timePeriod', e.target.value)}
                    className="input-field pr-16"
                    placeholder="Enter time period"
                    min="1"
                    max="50"
                  />
                  <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">years</span>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="btn-primary w-full"
              >
                Calculate Returns
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <SummaryCard
                title="Total Investment"
                value={`₹${results.totalInvested.toLocaleString()}`}
                subtitle="Amount you will invest"
              />
              <SummaryCard
                title="Expected Returns"
                value={`₹${results.totalReturns.toLocaleString()}`}
                subtitle="Profit from investment"
                className="bg-green-50 dark:bg-green-900/20"
              />
              <SummaryCard
                title="Maturity Value"
                value={`₹${results.futureValue.toLocaleString()}`}
                subtitle="Total amount at maturity"
                className="bg-primary-50 dark:bg-primary-900/20"
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Growth Over Time
          </h2>
          <SIPLineGraph data={chartData} />
        </div>
      </div>
    </div>
  )
}
