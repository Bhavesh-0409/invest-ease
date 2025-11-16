import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, BarChart3 } from 'lucide-react'
import { BackButton } from '../components/BackButton'
import { SummaryCard } from '../components/SummaryCard'
import { AllocationDonutChart } from '../components/AllocationDonutChart'
import { SIPLineGraph } from '../components/SIPLineGraph'

export const RecommendationPage: React.FC = () => {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<any>(null)

  useEffect(() => {
    const mandatory = localStorage.getItem('mandatoryDetails')
    const optional = localStorage.getItem('optionalDetails')
    
    if (mandatory) {
      setUserDetails({
        ...JSON.parse(mandatory),
        ...(optional ? JSON.parse(optional) : {})
      })
    } else {
      navigate('/details')
    }
  }, [navigate])

  // Dummy data based on risk preference
  const getDummyRecommendation = () => {
    if (!userDetails) return null

    const riskLevel = userDetails.riskPreference
    const amount = parseFloat(userDetails.investmentAmount)

    const recommendations = {
      Low: {
        expectedReturn: '8-10%',
        allocation: {
          labels: ['Fixed Deposits', 'Government Bonds', 'Debt Funds', 'Gold ETF'],
          values: [40, 30, 20, 10]
        },
        features: [
          'Capital protection',
          'Steady returns',
          'Low volatility',
          'Tax efficient options'
        ],
        explanation: 'This conservative portfolio is designed for investors who prioritize capital preservation over high returns. With 70% allocation to fixed-income securities (FDs and bonds), your investment is protected from market volatility. The remaining 30% in debt funds and gold ETF provides modest growth potential while maintaining stability. This approach is ideal for investors nearing retirement or those who cannot afford significant losses.'
      },
      Medium: {
        expectedReturn: '10-12%',
        allocation: {
          labels: ['Equity Funds', 'Debt Funds', 'Hybrid Funds', 'Gold ETF', 'FD'],
          values: [40, 25, 20, 10, 5]
        },
        features: [
          'Balanced growth',
          'Moderate risk',
          'Diversified portfolio',
          'Professional management'
        ],
        explanation: 'This balanced portfolio offers the best of both worlds - growth potential through equity exposure (60% in equity and hybrid funds) while maintaining stability through debt instruments (30%). This diversified approach helps smooth out market volatility while targeting inflation-beating returns. The 10% gold allocation acts as a hedge against economic uncertainty, making this suitable for investors with a 5-10 year investment horizon.'
      },
      High: {
        expectedReturn: '12-15%',
        allocation: {
          labels: ['Equity Funds', 'Small Cap Funds', 'International Funds', 'Debt Funds'],
          values: [50, 25, 15, 10]
        },
        features: [
          'High growth potential',
          'Long-term wealth creation',
          'Market-linked returns',
          'Tax benefits available'
        ],
        explanation: 'This aggressive growth portfolio is designed for long-term wealth creation with 90% equity exposure across different market segments. The large allocation to small-cap funds (25%) and international funds (15%) provides exposure to high-growth opportunities. While this portfolio carries higher volatility, it has the potential to significantly outperform inflation over 10+ years. The minimal debt allocation (10%) provides some stability during market downturns. This strategy is ideal for young investors with high risk tolerance and long investment horizons.'
      }
    }

    return recommendations[riskLevel as keyof typeof recommendations]
  }

  const recommendation = getDummyRecommendation()

  // Dummy SIP projection data
  const sipData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    invested: [12000, 24000, 36000, 48000, 60000],
    returns: [13000, 27500, 43200, 60800, 81500]
  }

  const handleDownloadPDF = async () => {
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
          params: [1, 'recommendation', JSON.stringify(userDetails), JSON.stringify(recommendation)]
        })
      })
      
      alert('PDF download feature coming soon!')
    } catch (error) {
      console.error('Error saving calculation:', error)
      alert('PDF download feature coming soon!')
    }
  }

  if (!userDetails || !recommendation) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton to="/optional" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Personalized Investment Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your {userDetails.riskPreference.toLowerCase()} risk preference and ₹{parseInt(userDetails.investmentAmount).toLocaleString()} investment
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Expected Returns"
            value={recommendation.expectedReturn}
            subtitle="Annual returns"
            icon={<BarChart3 className="h-6 w-6" />}
          />
          <SummaryCard
            title="Risk Level"
            value={userDetails.riskPreference}
            subtitle="Based on your preference"
          />
          <SummaryCard
            title="Investment Amount"
            value={`₹${parseInt(userDetails.investmentAmount).toLocaleString()}`}
            subtitle="Initial investment"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Asset Allocation */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended Asset Allocation
            </h2>
            <AllocationDonutChart data={recommendation.allocation} />
          </div>

          {/* SIP Projection */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              SIP Growth Projection
            </h2>
            <SIPLineGraph data={sipData} />
          </div>
        </div>

        {/* Investment Strategy Explanation */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Strategy Explained
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {recommendation.explanation}
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Key Benefits of This Plan:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendation.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/compare')}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Compare Plans</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>
    </div>
  )
}
