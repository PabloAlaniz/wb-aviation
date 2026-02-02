/**
 * Badge component for displaying small labels or status indicators
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the badge
 * @param {string} [props.variant="default"] - Visual variant (default, destructive, outline, secondary)
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Badge component
 * 
 * @example
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="secondary">Info</Badge>
 */
export function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/80",
    destructive: "bg-red-500 text-gray-50 hover:bg-red-500/80",
    outline: "text-gray-950 border border-gray-200",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
  }
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}