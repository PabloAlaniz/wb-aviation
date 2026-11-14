import { messages as defaultMessages } from "../i18n"
import { formatFactor, fuelConversionTable } from "../utils/fuelConversions"

/** @typedef {import("../utils/fuelConversions").FuelUnit} FuelUnit */

const BOX = { width: 128, height: 46 }

/** Box centers in the 600 x 360 drawing: volumes left and top, weights right. */
const NODES = /** @type {Record<FuelUnit, { x: number, y: number }>} */ ({
  l: { x: 300, y: 48 },
  usGal: { x: 84, y: 150 },
  impGal: { x: 84, y: 310 },
  lb: { x: 516, y: 150 },
  kg: { x: 516, y: 310 },
})

/**
 * Arrows: following one multiplies by its factor (`from` -> `to`), against it
 * divides. `at` places the factor along the arrow so crossing ones don't
 * overlap. Volume <-> weight factors depend on the fuel density.
 * @type {{ from: FuelUnit, to: FuelUnit, at: number }[]}
 */
const EDGES = [
  { from: "usGal", to: "l", at: 0.5 },
  { from: "impGal", to: "l", at: 0.3 },
  { from: "impGal", to: "usGal", at: 0.5 },
  { from: "l", to: "lb", at: 0.5 },
  { from: "l", to: "kg", at: 0.62 },
  { from: "usGal", to: "lb", at: 0.5 },
  { from: "usGal", to: "kg", at: 0.3 },
  { from: "impGal", to: "lb", at: 0.7 },
  { from: "impGal", to: "kg", at: 0.5 },
  { from: "kg", to: "lb", at: 0.5 },
]

const WEIGHTS = new Set(["lb", "kg"])

/** True when the factor between two units depends on the fuel density. */
const dependsOnFuel = (/** @type {FuelUnit} */ a, /** @type {FuelUnit} */ b) =>
  WEIGHTS.has(a) !== WEIGHTS.has(b)

/**
 * Point where the segment from the center of box `a` toward `b` leaves box `a`.
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @param {number} gap - extra distance outside the box (room for the arrowhead)
 */
function boxEdge(a, b, gap) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const scale = Math.min(
    dx === 0 ? Infinity : BOX.width / 2 / Math.abs(dx),
    dy === 0 ? Infinity : BOX.height / 2 / Math.abs(dy)
  )
  const length = Math.hypot(dx, dy)
  const t = scale + gap / length
  return { x: a.x + dx * t, y: a.y + dy * t }
}

/**
 * Quick fuel conversion diagram, like the classic AVGAS chart: unit boxes
 * joined by arrows carrying the factor (follow the arrow: multiply; against
 * it: divide). Plain SVG, so it renders on the server and prints in black and
 * white; factors that depend on the fuel are highlighted.
 * @param {{
 *   fuelType?: import("../types").FuelType,
 *   messages?: typeof defaultMessages,
 *   decimalSeparator?: string,
 *   printable?: boolean,
 *   className?: string,
 * }} props
 */
export function FuelConversionDiagram({
  fuelType,
  messages = defaultMessages,
  decimalSeparator = ".",
  printable = false,
  className = "",
}) {
  const fc = messages.fuelConversions
  const table = fuelConversionTable(fuelType)
  const fuel = fuelType === "jet-a" ? "Jet A" : "AVGAS"
  const accent = printable ? "#000" : "#1d4ed8"
  const ink = printable ? "#000" : "#374151"
  const markerId = `fuel-arrow-${printable ? "print" : "screen"}-${fuelType ?? "avgas"}`

  return (
    <figure className={className} data-testid="fuel-conversions">
      <svg
        viewBox="0 0 600 372"
        role="img"
        aria-label={`${fc.title} (${fuel})`}
        className="h-auto w-full"
        fontFamily="inherit"
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={ink} />
          </marker>
        </defs>

        {EDGES.map(({ from, to, at }) => {
          const a = NODES[from]
          const b = NODES[to]
          const start = boxEdge(a, b, 2)
          const end = boxEdge(b, a, 4)
          const label = {
            x: start.x + (end.x - start.x) * at,
            y: start.y + (end.y - start.y) * at,
          }
          const fuelDependent = dependsOnFuel(from, to)
          return (
            <g key={`${from}-${to}`} data-testid={`fuel-edge-${from}-${to}`}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={ink}
                strokeWidth="1.6"
                markerEnd={`url(#${markerId})`}
              />
              <rect
                x={label.x - 30}
                y={label.y - 14}
                width="60"
                height="28"
                rx="14"
                fill="#fff"
                stroke={fuelDependent ? accent : ink}
                strokeWidth={fuelDependent ? 2.4 : 1.2}
              />
              <text
                x={label.x}
                y={label.y + 6}
                textAnchor="middle"
                fontSize="17"
                fontWeight={fuelDependent ? 700 : 500}
                fill={fuelDependent ? accent : ink}
              >
                {formatFactor(table[from][to], decimalSeparator)}
              </text>
            </g>
          )
        })}

        {Object.entries(NODES).map(([unit, { x, y }]) => (
          <g key={unit}>
            <rect
              x={x - BOX.width / 2}
              y={y - BOX.height / 2}
              width={BOX.width}
              height={BOX.height}
              rx="6"
              fill="#fff"
              stroke={ink}
              strokeWidth="2"
            />
            <text x={x} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="700" fill={ink}>
              {fc.boxes[/** @type {FuelUnit} */ (unit)]}
            </text>
          </g>
        ))}

        <text x="300" y="362" textAnchor="middle" fontSize="15" fill={ink}>
          {fc.diagramNote(fuel, formatFactor(table.l.kg, decimalSeparator))}
        </text>
      </svg>
    </figure>
  )
}
