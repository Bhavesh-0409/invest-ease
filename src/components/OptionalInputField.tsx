import React from 'react'

interface OptionalInputFieldProps {
  label: string
  name: string
  type?: 'text' | 'number' | 'select'
  value: string
  onChange: (name: string, value: string) => void
  options?: string[]
  placeholder?: string
  prefix?: string
}

export const OptionalInputField: React.FC<OptionalInputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options,
  placeholder,
  prefix
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="input-field"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
              {prefix}
            </span>
          )}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder}
            className={`input-field ${prefix ? 'pl-8' : ''}`}
          />
        </div>
      )}
    </div>
  )
}
