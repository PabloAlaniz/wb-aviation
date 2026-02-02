/**
 * Card container component for grouping related content
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the card
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Card container
 * 
 * @example
 * <Card>
 *   <CardHeader>...</CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 */
export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}

/**
 * Card header section containing title and description
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Header content (typically CardTitle and CardDescription)
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Card header
 */
export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Card title component for main heading
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Title text
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Card title (h3)
 */
export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  )
}

/**
 * Card description component for subtitle or additional context
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Description text
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Card description (paragraph)
 */
export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  )
}

/**
 * Card content section for main body content
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Card content container
 */
export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
}