import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

/**
 * @param {{
 *   children: (state: {
 *     value: string,
 *     onValueChange: (value: string) => void,
 *     isOpen: boolean,
 *     setIsOpen: (open: boolean) => void,
 *   }) => import("react").ReactNode,
 *   value: string,
 *   onValueChange: (value: string) => void,
 * }} props
 */
export function Select({ children, value, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false)

  return <div className="relative">{children({ value, onValueChange, isOpen, setIsOpen })}</div>
}

/**
 * @param {{
 *   children?: import("react").ReactNode,
 *   onClick?: () => void,
 *   id?: string,
 *   isOpen?: boolean,
 * }} props
 */
export function SelectTrigger({ children, onClick, id, isOpen }) {
  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
    </button>
  )
}

/**
 * @param {{
 *   placeholder?: string,
 *   value?: string,
 *   options?: import("../types").SelectOption[],
 * }} props
 */
export function SelectValue({ placeholder, value, options = [] }) {
  const selectedOption = options.find((opt) => opt.value === value)
  return (
    <span className={!selectedOption ? "text-gray-500" : ""}>
      {selectedOption ? selectedOption.label : placeholder}
    </span>
  )
}

/** @param {{ children?: import("react").ReactNode, isOpen?: boolean }} props */
export function SelectContent({ children, isOpen }) {
  if (!isOpen) return null

  return (
    <div
      role="listbox"
      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    >
      {children}
    </div>
  )
}

/**
 * @param {{
 *   value: string,
 *   children?: import("react").ReactNode,
 *   onSelect: (value: string) => void,
 *   isSelected?: boolean,
 * }} props
 */
export function SelectItem({ value, children, onSelect, isSelected }) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      className="relative cursor-pointer select-none py-2 px-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      onClick={() => onSelect(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(value)
        }
      }}
    >
      {children}
    </div>
  )
}

/**
 * @param {{
 *   id?: string,
 *   value: string,
 *   onValueChange: (value: string) => void,
 *   placeholder?: string,
 *   options: import("../types").SelectOption[],
 * }} props
 */
export function SimpleSelect({ id, value, onValueChange, placeholder, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  const close = () => setIsOpen(false)

  const handleBlur = (/** @type {import("react").FocusEvent<HTMLDivElement>} */ e) => {
    // close only when focus leaves the whole select (trigger + options)
    if (
      containerRef.current &&
      !containerRef.current.contains(/** @type {Node | null} */ (e.relatedTarget))
    ) {
      close()
    }
  }

  const handleKeyDown = (/** @type {import("react").KeyboardEvent<HTMLDivElement>} */ e) => {
    if (e.key === "Escape") close()
  }

  return (
    <div className="relative" ref={containerRef} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <SelectTrigger id={id} isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder={placeholder} value={value} options={options} />
      </SelectTrigger>
      <SelectContent isOpen={isOpen}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            isSelected={option.value === value}
            onSelect={(val) => {
              onValueChange(val)
              close()
            }}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </div>
  )
}
