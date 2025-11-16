import React from 'react'
import { BarChart3, Table, TrendingUp } from 'lucide-react'

interface ComparePlansToggleProps {
  activeView: 'table' | 'card' | 'graph'
  onViewChange: (view: 'table' | 'card' | 'graph') => void
}

export const ComparePlansToggle: React.FC<ComparePlansToggleProps> = ({
  activeView,
  onViewChange
}) => {
  const views = [
    { key: 'table' as const, label: 'Table', icon: Table },
    { key: 'card' as const, label: 'Cards', icon: BarChart3 },
    { key: 'graph' as const, label: 'Graph', icon: TrendingUp },
  ]

  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {views.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === key
              ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
