import React from 'react'
import { Check } from 'lucide-react'

interface PlanCardProps {
  title: string
  risk: string
  expectedReturn: string
  features: string[]
  recommended?: boolean
  onClick?: () => void
}

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  risk,
  expectedReturn,
  features,
  recommended = false,
  onClick
}) => {
  return (
    <div
      className={`card cursor-pointer transition-all duration-200 hover:shadow-md ${
        recommended ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
      }`}
      onClick={onClick}
    >
      {recommended && (
        <div className="bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
          Recommended
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level</p>
        <p className="font-semibold text-gray-900 dark:text-white">{risk}</p>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">Expected Return</p>
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {expectedReturn}
        </p>
      </div>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
