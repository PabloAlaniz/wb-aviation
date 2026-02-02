import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Base Select component using render props pattern
 * Provides state management for custom select implementations
 * 
 * @param {Object} props - Component props
 * @param {Function} props.children - Render prop function receiving select state
 * @param {*} props.value - Current selected value
 * @param {Function} props.onValueChange - Callback when value changes
 * @returns {JSX.Element} Select container
 * 
 * @example
 * <Select value={selected} onValueChange={setSelected}>
 *   {({ value, onValueChange, isOpen, setIsOpen }) => (
 *     // Custom select implementation
 *   )}
 * </Select>
 */
export function Select({ children, value, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      {children({ value, onValueChange, isOpen, setIsOpen })}
    </div>
  )
}

/**
 * Select trigger button that opens the dropdown
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display (typically SelectValue)
 * @param {Function} props.onClick - Click handler to toggle dropdown
 * @returns {JSX.Element} Styled button element
 */
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

/**
 * Displays the selected option label or placeholder text
 * 
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Text to show when no option is selected
 * @param {*} props.value - Currently selected value
 * @param {Array<{value: *, label: string}>} [props.options=[]] - Available options
 * @returns {JSX.Element} Span with selected label or placeholder
 */
export function SelectValue({ placeholder, value, options = [] }) {
  const selectedOption = options.find(opt => opt.value === value)
  return (
    <span className={!selectedOption ? "text-gray-500" : ""}>
      {selectedOption ? selectedOption.label : placeholder}
    </span>
  )
}

/**
 * Dropdown content container for select options
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - SelectItem components
 * @param {boolean} props.isOpen - Whether dropdown is visible
 * @returns {JSX.Element|null} Dropdown container or null if closed
 */
export function SelectContent({ children, isOpen }) {
  if (!isOpen) return null
  
  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </div>
  )
}

/**
 * Individual option item in the select dropdown
 * 
 * @param {Object} props - Component props
 * @param {*} props.value - Value of this option
 * @param {React.ReactNode} props.children - Display content
 * @param {Function} props.onSelect - Callback when item is selected
 * @returns {JSX.Element} Clickable option item
 */
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

/**
 * Complete select component with all functionality built-in
 * Simplified API for common use cases
 * 
 * @param {Object} props - Component props
 * @param {*} props.value - Currently selected value
 * @param {Function} props.onValueChange - Callback when selection changes
 * @param {string} props.placeholder - Placeholder text when no selection
 * @param {Array<{value: *, label: string}>} props.options - Available options
 * @returns {JSX.Element} Complete select component
 * 
 * @example
 * <SimpleSelect 
 *   value={aircraft}
 *   onValueChange={setAircraft}
 *   placeholder="Select aircraft"
 *   options={[
 *     { value: "king-air-90", label: "King Air 90" },
 *     { value: "cessna-172", label: "Cessna 172" }
 *   ]}
 * />
 */
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