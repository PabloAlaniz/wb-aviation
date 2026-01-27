import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Select({ children, value, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      {children({ value, onValueChange, isOpen, setIsOpen })}
    </div>
  )
}

export function SelectTrigger({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder, value, options = [] }) {
  const selectedOption = options.find(opt => opt.value === value)
  return (
    <span className={!selectedOption ? "text-gray-500" : ""}>
      {selectedOption ? selectedOption.label : placeholder}
    </span>
  )
}

export function SelectContent({ children, isOpen }) {
  if (!isOpen) return null
  
  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </div>
  )
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <div
      className="relative cursor-pointer select-none py-2 px-3 hover:bg-gray-100"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  )
}

export function SimpleSelect({ value, onValueChange, placeholder, options }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder={placeholder} value={value} options={options} />
      </SelectTrigger>
      <SelectContent isOpen={isOpen}>
        {options.map(option => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            onSelect={(val) => {
              onValueChange(val)
              setIsOpen(false)
            }}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </div>
  )
}