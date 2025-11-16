import React, { useState } from 'react'
import { BackButton } from '../components/BackButton'
import { ComparePlansToggle } from '../components/ComparePlansToggle'
import { ComparePlansTable } from '../components/ComparePlansTable'
import { PlanCard } from '../components/PlanCard'
import { SIPLineGraph } from '../components/SIPLineGraph'

export const ComparePlansPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'table' | 'card' | 'graph'>('card')

  const plans = [
    {
      name: 'Safe Growth Plan',
      risk: 'Low',
      expectedReturn: '8-10%',
      minInvestment: '₹1,000',
      lockIn: 'None',
      taxBenefit: 'Yes',
      features: [
        'Capital protection',
        'Steady returns',
        'Low volatility',
        'Tax efficient'
      ]
    },
    {
      name: 'Balanced Growth Plan',
      risk: 'Medium',
      expectedReturn: '10-12%',
      minInvestment: '₹1,000',
      lockIn: '3 years',
      taxBenefit: 'Yes',
      features: [
        'Balanced growth',
        'Moderate risk',
        'Diversified portfolio',
        'Professional management'
      ]
    },
    {
      name: 'Aggressive Growth Plan',
      risk: 'High',
      expectedReturn: '12-15%',
      minInvestment: '₹1,000',
      lockIn: '5 years',
      taxBenefit: 'Yes',
      features: [
        'High growth potential',
        'Long-term wealth creation',
        'Market-linked returns',
        'Tax benefits'
      ]
    }
  ]

  // Dummy comparison graph data
  const comparisonData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    invested: [12000, 24000, 36000, 48000, 60000],
    returns: [13000, 27500, 43200, 60800, 81500]
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton to="/recommendation" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Compare Investment Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose the plan that best fits your investment goals
          </p>
        </div>

        <div className="mb-6">
          <ComparePlansToggle
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>

        {activeView === 'card' && (
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                title={plan.name}
                risk={plan.risk}
                expectedReturn={plan.expectedReturn}
                features={plan.features}
                recommended={index === 1}
              />
            ))}
          </div>
        )}

        {activeView === 'table' && (
          <div className="card">
            <ComparePlansTable plans={plans} />
          </div>
        )}

        {activeView === 'graph' && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Growth Comparison (5 Years)
            </h2>
            <SIPLineGraph data={comparisonData} />
          </div>
        )}
      </div>
    </div>
  )
}
