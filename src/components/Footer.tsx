import React from 'react'
import { TrendingUp } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <TrendingUp className="h-6 w-6 text-primary-600" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              InvestEase
            </span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 InvestEase. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
