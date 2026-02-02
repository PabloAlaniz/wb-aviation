/**
 * Separator component for visual division of content
 * 
 * @param {Object} props - Component props
 * @param {string} [props.orientation="horizontal"] - Orientation of the separator (horizontal or vertical)
 * @param {string} [props.className=""] - Additional CSS classes
 * @returns {JSX.Element} Separator component
 * 
 * @example
 * <Separator />
 * <Separator orientation="vertical" />
 */
export function Separator({ orientation = "horizontal", className = "" }) {
  return (
    <div
      className={`shrink-0 bg-gray-200 ${
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
      } ${className}`}
    />
  )
}