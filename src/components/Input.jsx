/**
 * Styled input component with consistent styling and focus states
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {Object} props - All other standard input props (type, value, onChange, placeholder, etc.)
 * @returns {JSX.Element} Styled input element
 * 
 * @example
 * <Input type="number" placeholder="Enter weight" value={weight} onChange={handleChange} />
 */
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

/**
 * Label component for form inputs with consistent styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Label text
 * @param {string} [props.htmlFor] - ID of the associated input element
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Label element
 * 
 * @example
 * <Label htmlFor="pilot-weight">Pilot Weight (lbs)</Label>
 */
export function Label({ children, htmlFor, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  )
}